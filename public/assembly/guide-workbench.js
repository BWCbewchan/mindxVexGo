import {guideCamera,orbitGuideCamera} from './guide-camera.js';
import {stepKey} from './guide-editing.js';
import {partPreviewSrc} from './part-preview.js';
import {croppedPartThumbnail} from './part-thumbnail.js';

// All instruction cards stay in document order. A single live canvas is reused
// only when orbiting; idle cards use cached images, never one WebGL context each.
export function installGuideWorkbench(api){
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const root=el('section');root.id='guide-workbench';root.className='guide-live-editor guide-vertical-feed';root.setAttribute('aria-label','Các trang hướng dẫn lắp');
 const rows=new Map(),queue=new Map(),cache=new Map();let guide=null,blocked=false,visible=false,disposed=false,backgroundTimer=0,backgroundBusy=false,epoch=0,currentIndex=0,active=null,session=null,camera=null,autoCamera=null,drag=null,raf=0;
 const suspended=()=>document.hidden||!!api.suspended?.(),frame=step=>step?.page?.frames?.detail||{};
 const geometryKey=step=>JSON.stringify([step.parts.map(p=>[p.id,p.sku,p.position,p.rotation,p.ldrawColorHex,p.legoKitId]),step.added.map(p=>p.id),step.joint,step.insertion,step.insertionBlocked,!!step.closingNote,step.guideSupport,frame(step).explodeMM,frame(step).redOutline,frame(step).redOutlineOpacity,api.appearance()]);
 const imageKey=step=>geometryKey(step)+'|'+JSON.stringify(frame(step).camera||step.camera||step.view);
 const preferred=step=>guideCamera(frame(step).camera)||(step.view==='custom'?guideCamera(step.camera):null)||autoCamera;
 function remember(key,value){cache.set(key,value);if(cache.size>90)cache.delete(cache.keys().next().value);}
 function snapshot(){if(!active||!session)return;try{const src=session.canvas.toDataURL('image/png');active.img.src=src;active.img.hidden=false;remember(active.imageKey,src);}catch{}}
 function deactivate(save=true){++epoch;if(raf)cancelAnimationFrame(raf);raf=0;if(save)snapshot();session?.canvas.remove();session=null;active=null;camera=null;drag=null;}
 function schedule(){clearTimeout(backgroundTimer);if(!disposed&&visible&&!blocked&&!backgroundBusy&&!drag&&!suspended()&&queue.size)backgroundTimer=setTimeout(renderNext,[...queue.values()].some(job=>job.row.inView)?35:450);}
 async function renderNext(){
  backgroundTimer=0;if(disposed||!visible||blocked||drag||suspended())return;
  const job=[...queue.values()].sort((a,b)=>Number(b.row.inView)-Number(a.row.inView)||a.row.index-b.row.index)[0];if(!job)return;queue.delete(job.key);backgroundBusy=true;
  try{
   const src=await api.render(job.row.step,{frame:'detail',kitId:api.appearance(),alive:()=>!disposed&&!suspended()&&job.row.imageKey===job.key&&rows.get(job.row.key)===job.row});
   if(src&&!disposed&&job.row.imageKey===job.key&&rows.get(job.row.key)===job.row){remember(job.key,src);job.row.img.src=src;job.row.img.hidden=active===job.row&&!!session;job.row.pending.hidden=true;job.row.stage.dataset.ready='true';job.row.stage.dataset.frame='detail';}
  }catch(error){if(job.row.imageKey===job.key){job.row.pending.textContent='Chưa dựng được ảnh: '+error.message;job.row.pending.hidden=false;}}
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
 function draw(){raf=0;if(!active||!session||!camera||!visible||suspended())return;const s=size(active),start=performance.now();session.draw(camera,s.width,s.height);active.pending.hidden=true;active.stage.dataset.ready='true';active.stage.dataset.frame='detail';active.stage.dispatchEvent(new CustomEvent('guide-view-rendered',{detail:{duration:performance.now()-start,step:active.index,camera}}));}
 function scheduleFrame(){if(!raf&&active&&session&&!suspended())raf=requestAnimationFrame(draw);}
 async function activate(row){
  currentIndex=row.index;if(active===row&&session){camera=preferred(row.step)||camera;return;}
  deactivate();active=row;const ticket=++epoch,key=row.geometryKey;row.pending.textContent='Đang mở góc 3D…';row.pending.hidden=false;
  try{
   const result=await api.prepareLive(row.step,api.appearance(),()=>!disposed&&!suspended()&&active===row&&ticket===epoch&&row.geometryKey===key);
   if(!result||active!==row||ticket!==epoch||disposed)return;session=result;autoCamera=guideCamera(result.framing);camera=preferred(row.step)||autoCamera;result.canvas.id='guide-workbench-image';result.canvas.dataset.guideFrame='detail';result.canvas.setAttribute('aria-label',row.step.title);row.stage.prepend(result.canvas);row.img.hidden=true;row.pending.hidden=true;
   if(drag?.row===row&&!drag.camera)drag.camera=structuredClone(camera);draw();
  }catch(error){if(active===row){row.pending.textContent='Chưa mở được góc 3D: '+error.message;row.pending.hidden=false;}}
 }
 function commit(){if(!active||!camera||blocked)return;const row=active,config=guideCamera(camera);if(config&&api.camera(row.key,config,false)!==false){camera=config;draw();snapshot();}}
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
  stage.addEventListener('pointerdown',e=>{if(e.button!==0||blocked||!api.enabled)return;e.preventDefault();const already=active===row&&session;if(!already)deactivate();drag={row,id:e.pointerId,x:e.clientX,y:e.clientY,camera:already?structuredClone(camera):null};stage.setPointerCapture(e.pointerId);stage.focus({preventScroll:true});if(!already){const gesture=drag;activate(row).then(()=>{if(!drag&&gesture.id===e.pointerId)draw();});drag=gesture;}});
  stage.addEventListener('pointermove',e=>{if(drag?.row!==row||e.pointerId!==drag.id||!drag.camera)return;camera=orbitGuideCamera(drag.camera,{yaw:(e.clientX-drag.x)*.4,elevation:-(e.clientY-drag.y)*.3});scheduleFrame();});
  stage.addEventListener('pointerup',e=>{if(drag?.row!==row||e.pointerId!==drag.id)return;stage.releasePointerCapture?.(e.pointerId);const changed=camera&&drag.camera&&JSON.stringify(camera)!==JSON.stringify(drag.camera);drag=null;if(changed)commit();else draw();snapshot();schedule();});
  stage.addEventListener('pointercancel',()=>{if(drag?.row!==row)return;camera=drag.camera||camera;drag=null;draw();schedule();});
  stage.addEventListener('wheel',e=>{if(!e.ctrlKey||blocked)return;e.preventDefault();e.stopPropagation();activate(row).then(()=>{if(camera&&active===row){camera=orbitGuideCamera(camera,{zoom:(camera.zoom??1)*Math.exp(-e.deltaY*.002)});draw();commit();}});},{passive:false});
  stage.addEventListener('keydown',e=>{const action={ArrowLeft:{yaw:-15},ArrowRight:{yaw:15},ArrowUp:{elevation:10},ArrowDown:{elevation:-10}}[e.key];if(action){e.preventDefault();e.stopPropagation();activate(row).then(()=>{if(camera&&active===row){camera=orbitGuideCamera(camera,action);draw();commit();}});}});
  rows.set(key,row);cardVisibility.observe(article);return row;
 }
 function update(next,{busy=false}={}){
  guide=next;blocked=busy;const scroll=document.querySelector('.inspector-body'),oldCount=rows.size,follow=oldCount>0&&document.body.classList.contains('guide-active')&&scroll&&scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<80;
  const wanted=new Set(next.steps.map(stepKey));for(const [key,row] of rows)if(!wanted.has(key)){if(active===row)deactivate();cardVisibility.unobserve(row.article);row.article.remove();rows.delete(key);}
  root.querySelector('.guide-empty-card')?.remove();
  for(const [index,step] of next.steps.entries()){
   const row=rows.get(stepKey(step))||create(step,index),previousGeometry=row.geometryKey;row.step=step;row.index=index;row.article.dataset.index=String(index);row.number.max=String(next.steps.length);row.number.disabled=busy;if(document.activeElement!==row.number)row.number.value=String(index+1);row.title.textContent=step.title;row.title.title=step.title;row.counter.textContent=`${index+1} / ${next.steps.length}`;note(row);
   const key=imageKey(step);row.geometryKey=geometryKey(step);
   if(row.imageKey!==key){row.imageKey=key;fillParts(row);const cached=cache.get(key);if(cached){row.img.src=cached;row.img.hidden=active===row&&!!session;row.pending.hidden=true;row.stage.dataset.ready='true';}else{row.pending.textContent='Đang chuẩn bị hướng lắp…';row.pending.hidden=false;row.stage.dataset.ready='false';queue.set(key,{row,key});}}
   if(active===row){if(previousGeometry&&previousGeometry!==row.geometryKey)deactivate(false);else if(!drag){camera=preferred(step)||camera;scheduleFrame();}}
   if(root.children[index]!==row.article)root.insertBefore(row.article,root.children[index]||null);
  }
  if(!next.steps.length){const empty=el('article');empty.className='guide-live-card guide-empty-card';const message=el('p',busy?'Đang tự sửa liên kết và tạo bước…':next.blockers?.join(' ')||'Thêm và nối chi tiết để tạo hướng dẫn.');message.className='guide-live-note';if(!busy&&api.suggest&&/separate mechanical|separate .*assembl|starting part/i.test(next.blockers?.join(' ')||'')){const help=el('button','Xem gợi ý chi tiết cần lắp');help.type='button';help.className='guide-connection-help';help.onclick=()=>api.suggest();message.tabIndex=0;message.setAttribute('role','button');message.setAttribute('aria-label','Xem gợi ý ghép các cụm rời');message.onclick=()=>api.suggest();message.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();api.suggest();}};empty.append(message,help);}else empty.append(message);root.append(empty);}
  for(const [key,job] of queue)if(!rows.has(job.row.key)||job.row.imageKey!==key)queue.delete(key);
  if(follow&&next.steps.length>oldCount)requestAnimationFrame(()=>scroll.scrollTo({top:scroll.scrollHeight,behavior:'smooth'}));schedule();
 }
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{clearTimeout(backgroundTimer);snapshot();}},{rootMargin:'0px'});visibility.observe(root);
 const resize=new ResizeObserver(scheduleFrame);resize.observe(root);const onVisibility=()=>{if(!suspended()){schedule();scheduleFrame();}};document.addEventListener('visibilitychange',onVisibility);
 return {element:root,update,currentIndex:()=>Math.min(currentIndex,Math.max(0,(guide?.steps.length||1)-1)),open(){if(document.getElementById('panel-toggle')?.getAttribute('aria-expanded')==='false')document.getElementById('panel-toggle').click();document.getElementById('inspector-tab-2')?.click();schedule();},resume(){schedule();scheduleFrame();},dispose(){disposed=true;deactivate();clearTimeout(backgroundTimer);visibility.disconnect();cardVisibility.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',onVisibility);queue.clear();cache.clear();root.remove();}};
}
