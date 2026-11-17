import {guideCamera,orbitGuideCamera} from './guide-camera.js';
import {stepKey} from './guide-editing.js';
import {partPreviewSrc} from './part-preview.js';
import {croppedPartThumbnail} from './part-thumbnail.js';

// All instruction cards stay in document order. A single live canvas is reused
// only when orbiting; idle cards use cached images, never one WebGL context each.
export function installGuideWorkbench(api){
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const root=el('section');root.id='guide-workbench';root.className='guide-live-editor guide-vertical-feed';root.setAttribute('aria-label','Các trang hướng dẫn lắp');
 const rows=new Map(),queue=new Map(),cache=new Map(),poseKeys=new WeakMap();let guide=null,appearance,blocked=false,visible=false,disposed=false,backgroundTimer=0,backgroundBusy=false,epoch=0,currentIndex=0,active=null,session=null,activation=null,camera=null,autoCamera=null,drag=null,raf=0,wheelTimer=0;
 const suspended=()=>document.hidden||!!api.suspended?.(),frame=step=>step?.page?.frames?.detail||{};
 function geometryKey(step){
  let pose=poseKeys.get(step.parts);
  if(!pose){
   const added=step.type==='group'?new Set(step.added.map(p=>p.id)):null;
   pose=JSON.stringify(step.parts.filter(p=>!added||added.has(p.id)).map(p=>[p.id,p.sku,p.position,p.rotation,p.ldrawColorHex,p.legoKitId]));poseKeys.set(step.parts,pose);
  }
  const detail=frame(step);
  return pose+'|'+JSON.stringify([step.added.map(p=>p.id),step.joint,step.insertion,step.insertionBlocked,step.reviewRequired,!!step.closingNote,step.guideSupport,detail.explodeMM,detail.redOutline,detail.redOutlineOpacity,appearance]);
 }
 const preferred=step=>guideCamera(frame(step).camera)||(step.view==='custom'?guideCamera(step.camera):null)||autoCamera;
 function remember(key,value){cache.set(key,value);if(cache.size>90)cache.delete(cache.keys().next().value);}
 function snapshot(){
  if(!active||!session)return;
  try{const src=session.canvas.toDataURL('image/png');active.img.src=src;remember(active.imageKey,src);queue.delete(active.imageKey);}catch{}
 }
 function deactivate(save=true){
  ++epoch;if(raf)cancelAnimationFrame(raf);raf=0;clearTimeout(wheelTimer);wheelTimer=0;
  if(save)snapshot();
  if(active?.img.getAttribute('src'))active.img.hidden=false;
  session?.canvas.remove();session=null;activation=null;active=null;camera=null;drag=null;
 }
 function schedule(){
  clearTimeout(backgroundTimer);
  if(!disposed&&visible&&!blocked&&!backgroundBusy&&!activation&&!drag&&!wheelTimer&&!suspended()&&[...queue.values()].some(job=>job.row.inView))backgroundTimer=setTimeout(renderNext,35);
 }
 async function renderNext(){
  backgroundTimer=0;if(disposed||!visible||blocked||activation||drag||wheelTimer||suspended())return;
  let job;
  for(const candidate of queue.values())if(candidate.row.inView&&(!job||Math.abs(candidate.row.index-currentIndex)<Math.abs(job.row.index-currentIndex)))job=candidate;
  if(!job)return;
  queue.delete(job.key);backgroundBusy=true;
  const current=()=>!disposed&&job.row.imageKey===job.key&&rows.get(job.row.key)===job.row;
  const alive=()=>current()&&visible&&job.row.inView&&!blocked&&!activation&&!drag&&!wheelTimer&&!suspended();
  try{
   const src=await api.render(job.row.step,{frame:'detail',kitId:appearance,alive});
   if(src&&current()){remember(job.key,src);job.row.img.src=src;job.row.img.hidden=active===job.row&&!!session;job.row.pending.hidden=true;job.row.stage.dataset.ready='true';job.row.stage.dataset.frame='detail';}
   else if(!alive()&&current())queue.set(job.key,job);
  }catch(error){if(current()){job.row.pending.textContent='Chưa dựng được ảnh: '+error.message;job.row.pending.hidden=false;}}
  finally{backgroundBusy=false;schedule();}
 }
 function fillParts(row){
  row.pli.replaceChildren();const quantities=new Map();for(const p of row.step.added){const q=quantities.get(p.sku)||{...p,count:0};q.count++;quantities.set(p.sku,q);}
  for(const p of quantities.values()){
   const tile=el('figure'),img=el('img'),qty=el('b',`×${p.count}`),name=el('figcaption',p.name),code=el('code',p.sku.replace(/^(vexgo|vexiq)__/,''));tile.title=`${p.name} · ${code.textContent}`;tile.setAttribute('aria-label',`${p.count} × ${p.name}`);img.alt='';img.loading='lazy';img.onload=async()=>{img.onload=null;const src=img.src,clean=await croppedPartThumbnail(img);if(img.isConnected&&img.src===src)img.src=clean;};img.src=partPreviewSrc(api.platform,p.sku,row.step.parts.find(p2=>p2.id===p.id)?.legoKitId||api.appearance());tile.append(img,qty,name,code);row.pli.append(tile);
  }
 }
 function note(row){row.note.textContent=row.error||row.step.note||'';row.note.classList.toggle('guide-card-error',!!row.error);row.note.hidden=!row.note.textContent;}
 function move(row){
  if(disposed||blocked||rows.get(row.key)!==row)return;
  const to=Number(row.number.value)-1;if(!Number.isInteger(to)||to<0||to>=guide.steps.length){row.error=`Nhập số bước từ 1 đến ${guide.steps.length}.`;row.number.value=String(row.index+1);row.number.setAttribute('aria-invalid','true');note(row);return;}
  if(to===row.index)return;
  const result=api.reorder?.(row.index,to);
  if(result===false||result?.ok===false){row.error=result?.error||'Chờ hướng dẫn cập nhật rồi thử đổi số lại.';row.number.value=String(row.index+1);row.number.setAttribute('aria-invalid','true');note(row);return;}
  row.error='';note(row);row.number.value=String(row.index+1);row.number.setAttribute('aria-invalid','false');currentIndex=row.index;row.article.scrollIntoView({block:'nearest',behavior:'smooth'});
 }
 function size(row){const width=Math.max(240,Math.min(drag?420:720,Math.round((row.stage.clientWidth||320)*(drag?1:Math.min(devicePixelRatio||1,2)))));return {width,height:Math.round(width*(row.stage.clientHeight||width*.75)/(row.stage.clientWidth||width))};}
 function draw(){if(raf)cancelAnimationFrame(raf);raf=0;if(!active||!session||!camera||!visible||suspended())return false;const s=size(active),start=performance.now();session.draw(camera,s.width,s.height);active.pending.hidden=true;active.stage.dataset.ready='true';active.stage.dataset.frame='detail';active.stage.dispatchEvent(new CustomEvent('guide-view-rendered',{detail:{duration:performance.now()-start,step:active.index,camera}}));return true;}
 function scheduleFrame(){if(!raf&&active&&session&&!suspended())raf=requestAnimationFrame(draw);}
 async function activate(row){
  currentIndex=row.index;if(active===row&&(session||activation))return activation;
  deactivate();active=row;const ticket=++epoch,key=row.geometryKey;row.pending.textContent='Đang mở góc 3D…';row.pending.hidden=false;
  try{
   activation=api.prepareLive(row.step,appearance,()=>!disposed&&!suspended()&&active===row&&ticket===epoch&&row.geometryKey===key);
   const result=await activation;
   if(!result||active!==row||ticket!==epoch||disposed)return;session=result;autoCamera=guideCamera(result.framing);camera=preferred(row.step)||autoCamera;result.canvas.id='guide-workbench-image';result.canvas.dataset.guideFrame='detail';result.canvas.setAttribute('aria-label',row.step.title);row.stage.prepend(result.canvas);row.img.hidden=true;row.pending.hidden=true;
   if(drag?.row===row&&!drag.camera)drag.camera=structuredClone(camera);draw();
  }catch(error){if(active===row){row.pending.textContent='Chưa mở được góc 3D: '+error.message;row.pending.hidden=false;}}
  finally{if(ticket===epoch){activation=null;schedule();}}
 }
 function commit(){if(!active||!camera||blocked)return false;const row=active,config=guideCamera(camera);if(!config||api.camera(row.key,config,false)===false)return false;camera=config;if(draw())snapshot();return true;}
 function finishWheel(){if(!wheelTimer)return;clearTimeout(wheelTimer);wheelTimer=0;commit();schedule();}
 const cardVisibility=new IntersectionObserver(entries=>{
  for(const entry of entries){const row=rows.get(entry.target.dataset.stepKey);if(row)row.inView=entry.isIntersecting;}
  const candidates=[...rows.values()].filter(r=>r.inView);if(!drag&&candidates.length)currentIndex=candidates.sort((a,b)=>Math.abs(a.article.getBoundingClientRect().top-170)-Math.abs(b.article.getBoundingClientRect().top-170))[0].index;
  schedule();
 },{rootMargin:'180px 0px'});
 function create(step,index){
  const key=stepKey(step),article=el('article');article.className='guide-live-card';article.dataset.stepKey=key;const header=el('div');header.className='guide-live-card-header';const number=el('input');number.type='number';number.inputMode='numeric';number.min='1';number.step='1';number.className='guide-step-order';number.setAttribute('aria-label','Thứ tự bước lắp');number.title='Nhập vị trí mới rồi nhấn Enter';const title=el('span'),counter=el('small');counter.className='guide-page-counter';header.append(number,title,counter);
  const stage=el('div');stage.className='guide-live-stage';stage.tabIndex=0;stage.setAttribute('aria-label','Hướng lắp · kéo để xoay, Ctrl + lăn chuột để phóng');const img=el('img');img.className='guide-live-preview';img.alt='';img.draggable=false;img.hidden=true;const pending=el('span','Đang chuẩn bị hướng lắp…');pending.className='guide-live-placeholder';stage.append(img,pending);
  const pli=el('div');pli.className='guide-live-pli';pli.setAttribute('aria-label','Linh kiện thêm ở bước này');const description=el('p');description.className='guide-live-note';description.setAttribute('role','status');article.append(header,stage,pli,description);
  const row={key,article,header,number,title,counter,stage,img,pending,pli,note:description,step,index,inView:false,error:'',imageKey:'',geometryKey:''};
  number.onfocus=()=>{currentIndex=row.index;};
  number.oninput=()=>{row.error='';number.removeAttribute('aria-invalid');note(row);};
  number.onblur=()=>move(row);
  number.onkeydown=e=>{
   if(e.key==='Enter'&&!e.isComposing){e.preventDefault();move(row);number.blur();}
   if(e.key==='Escape'){e.preventDefault();e.stopPropagation();number.value=String(row.index+1);number.blur();}
  };
  stage.addEventListener('pointerdown',e=>{if(e.button!==0||blocked||!api.enabled)return;e.preventDefault();finishWheel();const already=active===row&&session;if(!already&&active!==row)deactivate();drag={row,id:e.pointerId,x:e.clientX,y:e.clientY,camera:already?structuredClone(camera):null};stage.setPointerCapture(e.pointerId);stage.focus({preventScroll:true});if(!already){const gesture=drag;activate(row).then(()=>{if(!drag&&gesture.id===e.pointerId)draw();});drag=gesture;}});
  stage.addEventListener('pointermove',e=>{if(drag?.row!==row||e.pointerId!==drag.id||!drag.camera)return;camera=orbitGuideCamera(drag.camera,{yaw:(e.clientX-drag.x)*.4,elevation:-(e.clientY-drag.y)*.3});scheduleFrame();});
  stage.addEventListener('pointerup',e=>{if(drag?.row!==row||e.pointerId!==drag.id)return;stage.releasePointerCapture?.(e.pointerId);const changed=camera&&drag.camera&&JSON.stringify(camera)!==JSON.stringify(drag.camera);drag=null;if(!changed||!commit()){draw();snapshot();}schedule();});
  stage.addEventListener('pointercancel',()=>{if(drag?.row!==row)return;camera=drag.camera||camera;drag=null;draw();schedule();});
  stage.addEventListener('wheel',e=>{
   if(!e.ctrlKey||blocked||drag)return;
   e.preventDefault();e.stopPropagation();
   if(active!==row)finishWheel();
   const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?300:1);
   activate(row).then(()=>{
    if(!camera||active!==row)return;
    camera=orbitGuideCamera(camera,{zoom:(camera.zoom??1)*Math.exp(-Math.max(-300,Math.min(300,delta))*.002)});
    scheduleFrame();clearTimeout(wheelTimer);wheelTimer=setTimeout(finishWheel,180);
   }).catch(()=>{});
  },{passive:false});
  stage.addEventListener('keydown',e=>{const action={ArrowLeft:{yaw:-15},ArrowRight:{yaw:15},ArrowUp:{elevation:10},ArrowDown:{elevation:-10}}[e.key];if(action){e.preventDefault();e.stopPropagation();finishWheel();activate(row).then(()=>{if(camera&&active===row){camera=orbitGuideCamera(camera,action);commit();}}).catch(()=>{});}});
  rows.set(key,row);cardVisibility.observe(article);return row;
 }
 function update(next,{busy=false}={}){
  const kit=api.appearance(),presentationChanged=guide!==next||appearance!==kit;
  if(!presentationChanged&&blocked===busy)return;
  guide=next;appearance=kit;blocked=busy;
  if(!presentationChanged&&next.steps.length){for(const row of rows.values())row.number.disabled=busy;schedule();return;}
  const scroll=document.querySelector('.inspector-body'),oldCount=rows.size,follow=oldCount>0&&document.body.classList.contains('guide-active')&&scroll&&scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<80;
  const wanted=new Set(next.steps.map(stepKey));for(const [key,row] of rows)if(!wanted.has(key)){if(active===row)deactivate();cardVisibility.unobserve(row.article);row.article.remove();rows.delete(key);}
  root.querySelector('.guide-empty-card')?.remove();
  for(const [index,step] of next.steps.entries()){
   const row=rows.get(stepKey(step))||create(step,index),previousGeometry=row.geometryKey,previousImage=row.imageKey;row.step=step;row.index=index;row.article.dataset.index=String(index);row.number.max=String(next.steps.length);row.number.disabled=busy;if(document.activeElement!==row.number)row.number.value=String(index+1);row.title.textContent=step.title;row.title.title=step.title;row.counter.textContent=`${index+1} / ${next.steps.length}`;note(row);
   row.geometryKey=geometryKey(step);
   const key=row.geometryKey+'|'+JSON.stringify(frame(step).camera||step.camera||step.view);
   const partsKey=JSON.stringify([step.added,step.added.map(p=>step.parts.find(item=>item.id===p.id)?.legoKitId),appearance]);
   if(partsKey!==row.partsKey){row.partsKey=partsKey;fillParts(row);}
   if(row.imageKey!==key){row.imageKey=key;const cached=cache.get(key);if(cached){row.img.src=cached;row.img.hidden=active===row&&!!session;row.pending.hidden=true;row.stage.dataset.ready='true';}else{row.pending.textContent='Đang chuẩn bị hướng lắp…';row.pending.hidden=false;row.stage.dataset.ready='false';queue.set(key,{row,key});}}
   if(active===row){if(previousGeometry&&previousGeometry!==row.geometryKey)deactivate(false);else if(!drag&&!wheelTimer&&previousImage!==key){camera=preferred(step)||camera;scheduleFrame();}}
   if(root.children[index]!==row.article)root.insertBefore(row.article,root.children[index]||null);
  }
  if(!next.steps.length){const empty=el('article');empty.className='guide-live-card guide-empty-card';const message=el('p',busy?'Đang tự sửa liên kết và tạo bước…':next.blockers?.join(' ')||'Thêm và nối chi tiết để tạo hướng dẫn.');message.className='guide-live-note';if(!busy&&api.suggest&&/separate mechanical|separate .*assembl|starting part/i.test(next.blockers?.join(' ')||'')){const help=el('button','Xem gợi ý chi tiết cần lắp');help.type='button';help.className='guide-connection-help';help.onclick=()=>api.suggest();message.tabIndex=0;message.setAttribute('role','button');message.setAttribute('aria-label','Xem gợi ý ghép các cụm rời');message.onclick=()=>api.suggest();message.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();api.suggest();}};empty.append(message,help);}else empty.append(message);root.append(empty);}
  for(const [key,job] of queue)if(!rows.has(job.row.key)||job.row.imageKey!==key)queue.delete(key);
  if(follow&&next.steps.length>oldCount)requestAnimationFrame(()=>scroll.scrollTo({top:scroll.scrollHeight,behavior:'smooth'}));schedule();
 }
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{clearTimeout(backgroundTimer);snapshot();}},{rootMargin:'0px'});visibility.observe(root);
 const resize=new ResizeObserver(scheduleFrame);resize.observe(root);const onVisibility=()=>{if(!suspended()){schedule();scheduleFrame();}};document.addEventListener('visibilitychange',onVisibility);
 return {
  element:root,update,
  releaseLive(){finishWheel();deactivate(false);},
  clear(){deactivate(false);clearTimeout(backgroundTimer);queue.clear();cache.clear();for(const row of rows.values())cardVisibility.unobserve(row.article);rows.clear();root.replaceChildren();guide=null;},
  currentIndex:()=>Math.min(currentIndex,Math.max(0,(guide?.steps.length||1)-1)),
  open(){if(document.getElementById('panel-toggle')?.getAttribute('aria-expanded')==='false')document.getElementById('panel-toggle').click();document.getElementById('inspector-tab-2')?.click();schedule();},
  resume(redraw=true){schedule();if(redraw)scheduleFrame();},
  dispose(){disposed=true;deactivate(false);clearTimeout(backgroundTimer);visibility.disconnect();cardVisibility.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',onVisibility);queue.clear();cache.clear();root.remove();}
 };
}
