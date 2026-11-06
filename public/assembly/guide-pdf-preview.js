import {stepKey} from './guide-editing.js';
import {guidePage,frameSettings,markerPoint} from './guide-page-settings.js';
import {orbitGuideCamera} from './guide-camera.js';
import {stepPaper,prepPaper,finishedPaper,applyPaperFrame,readyPaperImages} from './guide-paper.js?v=guide-routes-95';
const clone=value=>structuredClone(value),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function installPDFPreview(api){
 const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const dialog=node('dialog');dialog.id='guide-pdf-preview';dialog.setAttribute('aria-labelledby','pdf-preview-title');
 const top=node('div');top.className='pdf-top';const heading=node('h2','Xem trước & chỉnh trang PDF');heading.id='pdf-preview-title';const print=node('button','Xuất PDF'),close=node('button','Đóng');print.id='pdf-preview-print';print.className='pdf-primary';close.id='pdf-preview-close';top.append(heading,print,close);
 const toolbar=node('div');toolbar.className='pdf-toolbar';const modeButtons={};let mode='image';for(const [key,label] of [['orbit','Kéo xoay 3D'],['image','Kéo ảnh'],['frame','Chỉnh khung'],['markers','Chấm tím']]){const b=node('button',label);b.id='pdf-mode-'+key;b.onclick=()=>{mode=key;syncTools();prepareOrbit();};modeButtons[key]=b;toolbar.append(b);}const undo=node('button','Hoàn tác'),redo=node('button','Làm lại'),fit=node('button','Vừa trang');undo.id='pdf-preview-undo';redo.id='pdf-preview-redo';fit.onclick=fitPaper;undo.onclick=()=>history(false);redo.onclick=()=>history(true);const viewLabel=node('label','Trang '),viewZoom=node('select');viewZoom.id='pdf-preview-scale';viewZoom.setAttribute('aria-label','Phóng trang xem trước');for(const [value,text] of [['fit','Vừa trang'],['0.5','50%'],['0.75','75%'],['1','100%'],['1.25','125%']]){const o=node('option',text);o.value=value;viewZoom.append(o);}viewLabel.append(viewZoom);viewZoom.onchange=fitPaper;fit.onclick=()=>{viewZoom.value='fit';fitPaper();};toolbar.append(undo,redo,fit,viewLabel);
 const stepOrderForm=node('form');
 stepOrderForm.className='pdf-step-order-form';
 stepOrderForm.noValidate=true;
 const stepOrderLabel=node('label','Chuyển bước đến');
 const stepOrder=node('input');
 stepOrder.id='pdf-step-order';
 stepOrder.type='number';
 stepOrder.inputMode='numeric';
 stepOrder.min='1';
 stepOrder.step='1';
 stepOrderLabel.htmlFor=stepOrder.id;
 stepOrderLabel.append(stepOrder);
 const stepOrderSubmit=node('button','Chuyển');
 stepOrderSubmit.type='submit';
 stepOrderForm.append(stepOrderLabel,stepOrderSubmit);
 toolbar.insertBefore(stepOrderForm,viewLabel);
 const body=node('div');body.className='pdf-body';const pages=node('div');pages.className='pdf-pages';pages.setAttribute('aria-label','Các trang PDF');const workspace=node('div');workspace.className='pdf-workspace';const holder=node('div');holder.className='pdf-paper-holder';workspace.append(holder);const inspector=node('div');inspector.className='pdf-controls';
 let orbitSession=null,orbitTicket=0,orbitRAF=0;
 function stopOrbitDraw(){
  if(orbitRAF)cancelAnimationFrame(orbitRAF);
  orbitRAF=0;
 }
 function mountOrbit(){
  if(!orbitSession||!step()||orbitSession.key!==stepKey(step())||orbitSession.owner!==selected||mode!=='orbit')return false;
  const viewport=figure()?.querySelector('.guide-image-viewport');
  if(!viewport)return false;
  if(orbitSession.canvas.parentElement!==viewport)viewport.append(orbitSession.canvas);
  positionOrbitCanvas();
  return true;
 }
 function positionOrbitCanvas(){
  const frame=figure(),canvas=orbitSession?.canvas;
  if(!canvas||canvas.parentElement!==frame?.querySelector('.guide-image-viewport'))return;
  const {svg,width,height}=frame._paperFrame,{x,y,zoom}=config().image;
  const scale=Math.min(svg.clientWidth/width,svg.clientHeight/height);
  canvas.style.transform='translate('+(x*width*scale)+'px,'+(y*height*scale)+'px) scale('+zoom+')';
 }
 function orbitGeometry(source,name){
  const frame=source.page?.frames?.[name];
  return JSON.stringify([source.parts.map(p=>p.id),source.guideSupport?.id,source.insertion,source.insertionBlocked,!!source.closingNote,frame?.redOutline,frame?.redOutlineOpacity,name==='detail'?frame?.explodeMM:undefined]);
 }
 async function prepareOrbit(source=step(),isCurrent=()=>true){
  const ticket=++orbitTicket,owner=selected,key=source&&stepKey(source);
  stopOrbitDraw();
  if(mode!=='orbit'||orbitSession?.owner!==owner||orbitSession?.key!==key){
   orbitSession?.canvas.remove();
   orbitSession=null;
  }
  if(mode!=='orbit'||!canEdit()||!api.prepareLive)return;
  const alive=()=>ticket===orbitTicket&&selected===owner&&dialog.open&&mode==='orbit'&&canEdit()&&isCurrent();
  try{
   const result=await api.prepareLive(source,owner,alive);
   if(!result||!alive())return;
   orbitSession={...result,owner,key,geometry:orbitGeometry(source,owner)};
   const canvas=result.canvas;
   canvas.className='pdf-orbit-canvas';
   Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%',pointerEvents:'none',objectFit:'contain'});
   if(mountOrbit())drawOrbit(config().camera||figure()._paperFrame.camera);
  }catch(error){if(alive())message('Không mở được khung xoay: '+error.message);}
 }
 function drawOrbit(camera){
  const {width,height}=figure()._paperFrame;
  orbitSession.draw(camera,480,Math.round(480*height/width));
 }
 const frameLabel=node('label','Khung đang chỉnh'),frameSelect=node('select');frameSelect.id='pdf-frame-select';for(const [value,label] of [['detail','Bên trái · Hướng lắp'],['assembled','Bên phải · Tổng thể']]){const opt=node('option',label);opt.value=value;frameSelect.append(opt);}frameLabel.append(frameSelect);
 const hint=node('p');hint.className='pdf-hint';
 const zoomLabel=node('label','Phóng ảnh'),zoom=node('input');zoom.type='range';zoom.min=25;zoom.max=300;zoom.step=5;zoom.id='pdf-image-zoom';zoomLabel.append(zoom);const zoomValue=node('output');zoomLabel.append(zoomValue);
 const cameraRow=node('div');cameraRow.className='pdf-camera-tools';for(const [id,text,delta] of [['left','↶',{yaw:-15}],['right','↷',{yaw:15}],['up','↑',{elevation:10}],['down','↓',{elevation:-10}]]){const b=node('button');b.id='pdf-camera-'+id;const names={left:['rotate-ccw','Xoay trái'],right:['rotate-cw','Xoay phải'],up:['chevron-up','Nhìn cao hơn'],down:['chevron-down','Nhìn thấp hơn']},i=node('i');i.dataset.lucide=names[id][0];b.append(i);b.title=names[id][1];b.setAttribute('aria-label',names[id][1]);b.onclick=()=>rotate(delta);cameraRow.append(b);}const cameraLabel=node('p','Góc 3D riêng cho khung này');cameraLabel.className='pdf-hint';
 const outlineLabel=node('label','Viền đỏ chi tiết mới '),outline=node('input');outline.type='checkbox';outline.id='pdf-red-outline';outlineLabel.append(outline);outline.onchange=async()=>{row().redOutline=outline.checked;await commit();await showPage();};
 const outlineStrengthLabel=node('label','Độ đậm viền đỏ'),outlineStrength=node('input'),outlineStrengthValue=node('output');outlineStrength.type='range';outlineStrength.min=0;outlineStrength.max=100;outlineStrength.step=5;outlineStrength.id='pdf-red-outline-strength';outlineStrengthLabel.append(outlineStrength,outlineStrengthValue);outlineStrength.oninput=()=>{
  if(!canEdit())return;
  outlineStrengthValue.textContent=outlineStrength.value+'%';
  queueFrameDraft(selected,{redOutlineOpacity:outlineStrength.valueAsNumber/100});
 };
 outlineStrength.onchange=async()=>{
  if(!canEdit())return;
  cancelFrameDraft();
  row().redOutlineOpacity=outlineStrength.valueAsNumber/100;
  if(await commit())await showPage();
 };
 const gapLabel=node('label','Khoảng cách tách chi tiết (mm)'),gap=node('input'),gapValue=node('output');gap.type='range';gap.min=0;gap.max=120;gap.step=1;gap.id='pdf-explode-distance';gapLabel.append(gap,gapValue);gap.oninput=()=>{
  if(!canEdit())return;
  gapValue.textContent=gap.value+' mm';
  queueFrameDraft('detail',{explodeMM:gap.valueAsNumber});
 };const gapScopeLabel=node('label','Áp dụng khoảng cách'),gapScope=node('select');
 gapScope.id='pdf-explode-scope';
 for(const [value,title] of [['page','Chỉ trang này'],['all','Tất cả các bước lắp']]){
  const option=node('option',title);
  option.value=value;
  gapScope.append(option);
 }
 gapScopeLabel.append(gapScope);
 gapScope.onchange=syncTools;
 gap.onchange=async()=>{
  if(!canEdit())return;
  cancelFrameDraft();
  state.frames||={};
  state.frames.detail={...state.frames.detail,explodeMM:gap.valueAsNumber};
  const allSteps=gapScope.value==='all';
  if(!await commit({allExplode:allSteps}))return;
  if(allSteps)rebuildPages();
  await showPage();
  if(allSteps&&!failed)message('Đã áp dụng khoảng cách tách cho tất cả các bước lắp.');
 };
 const resetImage=node('button','Đặt lại ảnh'),resetFrame=node('button','Đặt lại khung'),automatic=node('button','Khôi phục chấm tự động'),remove=node('button','Xóa chấm đã chọn'),clear=node('button','Xóa hết chấm');resetImage.id='pdf-image-reset';resetFrame.id='pdf-frame-reset';automatic.id='pdf-markers-auto';remove.id='pdf-marker-delete';clear.id='pdf-markers-clear';const radiusLabel=node('label','Độ lớn chấm'),radius=node('input');radius.type='range';radius.min=3;radius.max=40;radius.step=1;radius.id='pdf-marker-radius';radiusLabel.append(radius);const coordinates=node('p');coordinates.className='pdf-coordinates';inspector.append(frameLabel,hint,outlineLabel,outlineStrengthLabel,gapLabel,gapScopeLabel,zoomLabel,cameraLabel,cameraRow,resetImage,resetFrame,radiusLabel,remove,clear,automatic,coordinates);body.append(pages,workspace,inspector);
 const footer=node('div');footer.className='pdf-footer';const status=node('span','Kéo để căn ảnh. Chọn Chỉnh khung để di chuyển và đổi kích thước.');status.id='pdf-preview-status';status.setAttribute('role','status');footer.append(status,node('small','16:9 · 16 × 9 inch · Cùng mẫu trang với PDF'));dialog.append(top,toolbar,body,footer);document.body.append(dialog);globalThis.lucide?.createIcons({root:dialog});
 let guide=null,project=null,index=0,state={},selected='assembled',selectedMarker=null,paper=null,shots=null,drag=null,token=0,loading=false,printing=false,failed=false,scale=1,settingsTimer=0,undoCount=0,redoCount=0;const cache=new Map();
 const step=()=>guide?.steps[index],figure=()=>paper?.querySelector(`[data-paper-frame="${selected}"]`),config=()=>frameSettings(state,selected),canEdit=()=>!loading&&!printing&&!failed&&!!step()&&!!figure();
 function message(text){status.textContent=text;}
 function fitPaper(){if(!paper)return;scale=viewZoom.value==='fit'?Math.max(.15,Math.min(1.3,(workspace.clientWidth-44)/1536,(workspace.clientHeight-36)/864)):Number(viewZoom.value);holder.style.width=1536*scale+'px';holder.style.height=864*scale+'px';paper.style.transform=`scale(${scale})`;paper.style.transformOrigin='top left';paper.style.setProperty('--paper-scale',scale);}
 const resize=new ResizeObserver(fitPaper);resize.observe(workspace);
 function syncTools(){print.textContent=guide?.reviewRequired?'Xuất PDF nháp':'Xuất PDF';heading.textContent=guide?.reviewRequired?'Preview hướng dẫn nháp · cần rà soát đường lắp':'Xem trước & chỉnh trang PDF';dialog.dataset.loading=String(loading);dialog.dataset.mode=mode;for(const [name,b] of Object.entries(modeButtons))b.setAttribute('aria-pressed',String(name===mode));frameSelect.value=selected;const enabled=canEdit();stepOrderForm.hidden=!step();stepOrder.disabled=stepOrderSubmit.disabled=loading||printing;for(const input of pages.querySelectorAll('.pdf-page-number-input'))input.disabled=loading||printing;gapScopeLabel.hidden=gapLabel.hidden=!step();for(const el of inspector.querySelectorAll('input,button,select'))el.disabled=!enabled;print.disabled=loading||printing||failed;undo.disabled=loading||printing||undoCount===0;redo.disabled=loading||printing||redoCount===0;for(const b of pages.querySelectorAll('button'))b.setAttribute('aria-current',String(Number(b.dataset.page)===index));hint.textContent=mode==='orbit'?'Kéo để xoay · Ctrl + lăn chuột để thu/phóng. Thả chuột để lưu góc và cập nhật ảnh PDF.':mode==='image'?'Kéo ảnh trong từng khung. Thu/phóng và góc 3D chỉ áp dụng cho khung đang chọn.':mode==='frame'?'Kéo khung để đổi vị trí. Kéo tay nắm ở góc dưới phải để đổi kích thước.':'Bấm lên ảnh để thêm chấm. Kéo chấm để đổi vị trí; Delete để xóa chấm đã chọn.';frameSelect.disabled=loading||printing||!step();const detailOption=frameSelect.querySelector('[value=detail]');detailOption.disabled=!paper?.querySelector('[data-paper-frame=detail]');gap.disabled=!enabled||(detailOption.disabled||step()?.insertionBlocked)&&gapScope.value==='page';gap.title=gap.disabled&&enabled?'Bước này không có hình tách theo đường lắp.':'';if(!enabled){coordinates.textContent='Trang này dùng bố cục tự động.';return;}const value=config();outline.checked=value.redOutline!==false;outlineStrength.disabled=!outline.checked;outlineStrength.value=Math.round((value.redOutlineOpacity??.85)*100);outlineStrengthValue.textContent=outlineStrength.value+'%';const distance=frameSettings(state,'detail').explodeMM;gap.value=distance??20;gapValue.textContent=distance===undefined?'Tự động':distance+' mm';zoom.value=value.image.zoom*100;zoomValue.textContent=Math.round(value.image.zoom*100)+'%';const list=value.markers??figure()._paperFrame.autoMarkers;remove.disabled=selectedMarker===null||!list[selectedMarker];radius.disabled=remove.disabled;radius.value=(list[selectedMarker]?.r??.012)*1000;coordinates.textContent=`${selected==='detail'?'Hướng lắp':'Tổng thể'} · ${list.length} chấm · kéo ảnh ${Math.round(value.image.x*100)}%, ${Math.round(value.image.y*100)}%`;for(const f of paper.querySelectorAll('[data-paper-frame]')){f.classList.toggle('pdf-selected-frame',f.dataset.paperFrame===selected);for(const c of f.querySelectorAll('[data-marker-index]'))c.classList.toggle('pdf-selected-dot',f.dataset.paperFrame===selected&&Number(c.dataset.markerIndex)===selectedMarker);}}
 function apply(){if(!paper)return;for(const f of paper.querySelectorAll('[data-paper-frame]'))applyPaperFrame(f,frameSettings(state,f.dataset.paperFrame));positionOrbitCanvas();syncTools();}
 let frameDraft=null,draftTimer=0,draftRunning=false;
 function queueFrameDraft(name,patch){
  const frame=paper?.querySelector(`[data-paper-frame="${name}"]`);
  if(!frame)return;
  frameDraft={frame,paper,step:step(),name,patch};
  scheduleFrameDraft();
 }
 function scheduleFrameDraft(){
  if(!draftRunning&&!draftTimer)draftTimer=setTimeout(renderFrameDraft,70);
 }
 function cancelFrameDraft(){
  frameDraft=null;
  clearTimeout(draftTimer);
  draftTimer=0;
 }
 async function renderFrameDraft(){
  draftTimer=0;
  const draft=frameDraft;
  if(!draft||draft.paper!==paper||!canEdit())return;
  draftRunning=true;
  const frames={...state.frames,[draft.name]:{...state.frames?.[draft.name],...draft.patch}};
  try{
   const source={...draft.step,page:{frames}};
   const alive=()=>dialog.open&&draft.paper===paper&&frameDraft?.frame===draft.frame&&canEdit();
   if(mode==='orbit'&&selected===draft.name){
    await prepareOrbit(source,alive);
    return;
   }
   const shot=await api.render(source,{quick:true});
   if(!alive())return;
   const image=shot[draft.name];
   if(!image)return;
   draft.frame.querySelector('.guide-frame-svg image').setAttribute('href',image);
   if(draft.name==='detail')draft.frame._paperFrame.autoMarkers=shot.detailFrame?.markers||[];
   applyPaperFrame(draft.frame,frameSettings(state,draft.name));
  }catch{/* The full-quality render on release reports errors. */}
  finally{
   draftRunning=false;
   if(frameDraft&&frameDraft!==draft)scheduleFrameDraft();
  }
 }
 function row(){state.frames||={};return state.frames[selected]||=(clone(config()));}
 function markers(){const r=row();r.markers??=clone(figure()._paperFrame.autoMarkers);return r.markers;}
 async function commit({allExplode=false}={}){
  if(!step())return false;
  try{
   state=guidePage(state);
   const saved=allExplode?api.saveExplodeForAll(state.frames.detail.explodeMM):api.save(stepKey(step()),clone(state));
   if(saved===false)throw Error('Không lưu được thiết lập trang.');
   undoCount=Math.min(undoCount+1,api.undoDepth?.()??undoCount+1);
   redoCount=0;
   guide=api.guide();
   project=api.project();
   syncTools();
   message('Đã lưu cách trình bày trang.');
   updatePageLabels();
   return true;
  }catch(error){message(error.message);return false;}
 }
 let thumbEpoch=0,thumbTimer=0,thumbRunning=false;const thumbQueue=new Set();
 const thumbObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting&&!e.target.dataset.thumbReady)thumbQueue.add(Number(e.target.dataset.page));scheduleThumbs();},{root:pages,rootMargin:'100px'});
 function paintThumbnail(i,source){const button=pages.querySelector(`[data-page="${i}"]`);if(!button)return;const host=button.querySelector('.pdf-page-mini'),copy=source.cloneNode(true);copy.removeAttribute('id');copy.querySelectorAll('[data-paper-frame]').forEach(el=>el.removeAttribute('data-paper-frame'));copy.querySelectorAll('.pdf-frame-badge,.pdf-frame-resize,canvas').forEach(el=>el.remove());for(const el of copy.querySelectorAll('[id]')){const old=el.id,newId='thumb-'+i+'-'+old;el.id=newId;for(const clipped of copy.querySelectorAll('[clip-path]'))if(clipped.getAttribute('clip-path')==='url(#'+old+')')clipped.setAttribute('clip-path','url(#'+newId+')');}copy.style.transform='scale('+((host.clientWidth||150)/1536)+')';host.replaceChildren(copy);button.dataset.thumbReady='true';thumbQueue.delete(i);}
 function scheduleThumbs(){clearTimeout(thumbTimer);if(dialog.open&&thumbQueue.size)thumbTimer=setTimeout(renderThumb,300);}
 async function renderThumb(){
  if(thumbRunning)return;
  if(loading||printing||drag||draftRunning){scheduleThumbs();return;}
  const epoch=thumbEpoch,i=thumbQueue.values().next().value;
  if(i===undefined||!dialog.open)return;
  thumbQueue.delete(i);thumbRunning=true;
  let interrupted=false;
  const alive=()=>epoch===thumbEpoch&&dialog.open&&!loading&&!printing&&!drag&&!draftRunning;
  try{
   let miniature;
   if(i<0)miniature=prepPaper(project,api.catalog(),api.platform);
   else if(i>=guide.steps.length){
    const image=await api.completed({thumbnail:true,alive});
    if(!image){interrupted=true;return;}
    miniature=finishedPaper(project,image);
   }else{
    const s=guide.steps[i],shot=await api.render(s,{thumbnail:true,alive});
    if(!shot){interrupted=true;return;}
    miniature=stepPaper(s,i,guide.steps.length,shot,api.platform,project.kit?.kitId);
   }
   await readyPaperImages(miniature);
   if(alive())paintThumbnail(i,miniature);
   else interrupted=true;
  }catch{}finally{
   if(epoch===thumbEpoch&&dialog.open&&interrupted&&!pages.querySelector('[data-page="'+i+'"]')?.dataset.thumbReady)thumbQueue.add(i);
   thumbRunning=false;scheduleThumbs();
  }
 }
 function rebuildPages(){
  ++thumbEpoch;
  thumbObserver.disconnect();
  thumbQueue.clear();
  pages.replaceChildren();
  for(let i=-1;i<=guide.steps.length;i++){
   const isStep=i>=0&&i<guide.steps.length;
   const title=i<0?'Chuẩn bị linh kiện':isStep?`${i+1}. ${guide.steps[i].title}`:'Sản phẩm hoàn chỉnh';
   const tile=node('div'),button=node('button'),mini=node('div');
   tile.className='pdf-page-tile';
   button.type='button';
   button.title=title;
   button.setAttribute('aria-label',title);
   button.dataset.page=i;
   button.draggable=isStep;
   button.onclick=()=>navigate(i);
   mini.className='pdf-page-mini';
   const number=String(i+1).padStart(2,'0');
   const label=node('span',i<0?'Chuẩn bị':isStep?number:'Hoàn thành');
   label.className='pdf-page-thumb-number';
   button.append(mini,label);
   tile.append(button);
   if(isStep){
    label.setAttribute('aria-hidden','true');
    const input=node('input');
    input.className='pdf-page-number-input';
    input.type='number';
    input.inputMode='numeric';
    input.min='1';
    input.max=String(guide.steps.length);
    input.step='1';
    input.value=number;
    input.setAttribute('aria-label',`Chuyển bước ${i+1} đến`);
    input.title='Nhập vị trí mới rồi nhấn Enter';
    input.onfocus=()=>input.select();
    input.oninput=()=>input.removeAttribute('aria-invalid');
    input.onblur=()=>{input.value=number;input.removeAttribute('aria-invalid');};
    input.onkeydown=async e=>{
     if(e.isComposing)return;
     if(e.key==='Escape'){
      e.preventDefault();
      e.stopPropagation();
      input.value=number;
      input.removeAttribute('aria-invalid');
      return;
     }
     if(e.key!=='Enter')return;
     e.preventDefault();
     if(await applyOrderInput(input,i)){
      pages.querySelector(`button[data-page="${index}"]`)?.nextElementSibling?.focus({preventScroll:true});
     }
    };
    tile.append(input);
   }
   pages.append(tile);
   thumbObserver.observe(button);
  }
  updatePageLabels();
 }
 function updatePageLabels(){for(const b of pages.querySelectorAll('button[data-page]')){const i=Number(b.dataset.page);b.classList.toggle('pdf-page-edited',!!guide.steps[i]?.page?.frames&&Object.keys(guide.steps[i].page.frames).length>0);}}
 function decorate(){for(const f of paper.querySelectorAll('[data-paper-frame]')){f.tabIndex=0;const badge=node('span',f.dataset.paperFrame==='detail'?'Hướng lắp':'Tổng thể');badge.className='pdf-frame-badge';const handle=node('button');handle.type='button';handle.className='pdf-frame-resize';handle.setAttribute('aria-label','Đổi kích thước khung '+f.dataset.paperFrame);f.append(badge,handle);}}
 let draggedPage=null;
 function clearPageDrag(){
  for(const button of pages.querySelectorAll('button[data-page]'))button.classList.remove('pdf-page-dragging','pdf-page-drop');
 }
 pages.addEventListener('dragstart',e=>{const b=e.target.closest('button[data-page]'),i=Number(b?.dataset.page);if(loading||printing||!b||i<0||i>=guide.steps.length){e.preventDefault();return;}flushKeyboard();draggedPage=i;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('application/x-guide-page',String(i));b.classList.add('pdf-page-dragging');});
 pages.addEventListener('dragover',e=>{const b=e.target.closest('.pdf-page-tile')?.firstElementChild,i=Number(b?.dataset.page);if(draggedPage===null||!b||i<0||i>=guide.steps.length)return;e.preventDefault();e.dataTransfer.dropEffect='move';for(const button of pages.querySelectorAll('button[data-page]'))button.classList.toggle('pdf-page-drop',button===b);});
 pages.addEventListener('dragend',()=>{draggedPage=null;clearPageDrag();});
 async function reorderPages(from,to){
  if(from===to||loading||printing)return false;
  flushKeyboard();
  cancelGesture();
  try{
   if(api.reorder(from,to)!==true)return false;
   undoCount=Math.min(undoCount+1,api.undoDepth?.()??undoCount+1);
   redoCount=0;
   guide=api.guide();
   project=api.project();
   index=to;
   selectedMarker=null;
   cache.clear();
   rebuildPages();
   pages.querySelector(`button[data-page="${to}"]`)?.scrollIntoView({block:'nearest',inline:'nearest'});
   await showPage();
   if(!failed)message('Đã đổi thứ tự và dựng lại các bước sau. Ctrl+Z để hoàn tác.');
   return true;
  }catch(error){message(error.message);return false;}
 }
 pages.addEventListener('drop',e=>{
  const button=e.target.closest('.pdf-page-tile')?.firstElementChild;
  const to=Number(button?.dataset.page),from=draggedPage;
  if(from===null||!button||to<0||to>=guide.steps.length)return;
  e.preventDefault();
  draggedPage=null;
  clearPageDrag();
  void reorderPages(from,to);
 });
 stepOrder.oninput=()=>stepOrder.removeAttribute('aria-invalid');
 async function applyOrderInput(input,from){
  if(loading||printing)return false;
  const to=input.valueAsNumber-1;
  if(!Number.isInteger(to)||to<0||to>=guide.steps.length){
   input.setAttribute('aria-invalid','true');
   message(`Nhập số bước từ 1 đến ${guide.steps.length}.`);
   return false;
  }
  if(to===from)return false;
  const moved=await reorderPages(from,to);
  if(!moved)input.setAttribute('aria-invalid','true');
  return moved;
 }
 stepOrderForm.onsubmit=e=>{
  e.preventDefault();
  if(step())void applyOrderInput(stepOrder,index);
 };
 stepOrder.onkeydown=e=>{
  if(e.key!=='Escape')return;
  e.preventDefault();
  e.stopPropagation();
  stepOrder.value=String(index+1);
  stepOrder.removeAttribute('aria-invalid');
 };
 function navigate(i){if(printing)return;flushKeyboard();cancelGesture();index=i;selectedMarker=null;showPage();}
 async function showPage({keepOrbit=false}={}){cancelFrameDraft();const ticket=++token,alive=()=>ticket===token&&dialog.open;loading=true;failed=false;stepOrder.value=step()?String(index+1):'';stepOrder.max=String(guide.steps.length);stepOrder.removeAttribute('aria-invalid');syncTools();message('Đang dựng trang xem trước…');try{let next;
   if(index<0)next=prepPaper(project,api.catalog(),api.platform);
   else if(index>=guide.steps.length){const key='finished|'+JSON.stringify([project.parts,project.kit]);let src=cache.get(key);if(!src){src=await api.completed({alive});if(!alive()||!src)return;cache.set(key,src);}next=finishedPaper(project,src);}
   else{const s=step(),key=JSON.stringify([s.parts,s.joint,s.insertion,s.insertionBlocked,!!s.closingNote,s.guideSupport,s.view,s.camera,s.page?.frames?.assembled?.camera,s.page?.frames?.detail?.camera,s.page?.frames?.detail?.explodeMM,s.page?.frames?.detail?.redOutline,s.page?.frames?.assembled?.redOutline,s.page?.frames?.detail?.redOutlineOpacity,s.page?.frames?.assembled?.redOutlineOpacity,project.kit]);shots=cache.get(key);if(!shots){shots=await api.render(s,{alive});if(!alive()||!shots)return;cache.set(key,shots);if(cache.size>12)cache.delete(cache.keys().next().value);}next=stepPaper(s,index,guide.steps.length,shots,api.platform,project.kit?.kitId);}
   if(ticket!==token||!dialog.open)return;await readyPaperImages(next);if(ticket!==token||!dialog.open)return;paper=next;paper.id='pdf-preview-paper';holder.replaceChildren(paper);state=guidePage(step()?.page);if(!paper.querySelector(`[data-paper-frame="${selected}"]`))selected='assembled';decorate();apply();fitPaper();mountOrbit();paintThumbnail(index,paper);scheduleThumbs();message(index<0?'Trang chuẩn bị · cùng bố cục với PDF.':index>=guide.steps.length?'Trang sản phẩm hoàn chỉnh · cùng bố cục với PDF.':'Trang xem trước đúng bố cục PDF. Chọn khung để căn chỉnh.');
  }catch(error){if(alive()){failed=true;message('Không dựng được trang: '+error.message);}}finally{if(ticket===token){loading=false;syncTools();if(!keepOrbit||!mountOrbit()||orbitSession.geometry!==orbitGeometry(step(),selected))prepareOrbit();}}}
 async function rotate(delta){if(!canEdit())return;const base=config().camera||figure()._paperFrame.camera;if(!base)return;row().camera=orbitGuideCamera(base,delta);await commit();await showPage();if(config().markers)message('Đã đổi góc khung. Chấm tự chỉnh giữ vị trí; kéo lại chấm hoặc khôi phục tự động nếu cần.');}
 async function history(redo=false){if(loading||printing)return;flushKeyboard();if(redo?redoCount===0:undoCount===0)return;cancelGesture();loading=true;syncTools();await api.undo(redo);if(redo){redoCount--;undoCount++;}else{undoCount--;redoCount++;}guide=api.guide();project=api.project();index=clamp(index,-1,guide.steps.length);selectedMarker=null;rebuildPages();await showPage();}
 function point(e,f){const meta=f._paperFrame,p=new DOMPoint(e.clientX,e.clientY).matrixTransform(meta.svg.getScreenCTM().inverse());return {x:p.x/meta.width,y:p.y/meta.height};}
 function frameBox(f){const parent=paper.querySelector('.guide-step-content').getBoundingClientRect(),r=f.getBoundingClientRect();return {x:clamp((r.x-parent.x)/parent.width,0,1),y:clamp((r.y-parent.y)/parent.height,0,1),width:clamp(r.width/parent.width,.1,1),height:clamp(r.height/parent.height,.1,1)};}
 function cancelGesture(){
  if(!drag)return;
  const {before,kind,camera}=drag;
  state=before;drag=null;apply();
  if(kind==='orbit'&&orbitSession){stopOrbitDraw();drawOrbit(camera);}
 }
 function updateOrbitDrag(e){
  row().camera=orbitGuideCamera(drag.camera,{yaw:(e.clientX-drag.x)*.4,elevation:-(e.clientY-drag.y)*.3});
 }
 holder.addEventListener('pointerdown',e=>{const f=e.target.closest('[data-paper-frame]');if(!f||loading||printing||e.button!==0)return;flushKeyboard();const switched=selected!==f.dataset.paperFrame;selected=f.dataset.paperFrame;selectedMarker=null;if(switched)prepareOrbit();syncTools();const initial=point(e,f),circle=e.target.closest('[data-marker-index]'),kind=e.target.closest('.pdf-frame-resize')?'resize':mode==='frame'?'frame':mode==='markers'?(circle?'marker':'add'):mode==='orbit'?'orbit':'image';e.preventDefault();e.stopPropagation();const before=clone(state);
  if(kind==='marker')selectedMarker=Number(circle.dataset.markerIndex);
  if(kind==='add'){if(selected==='assembled'){message('Khung Tổng thể không hiển thị chấm tím. Chọn khung Hướng lắp để chỉnh chấm.');return;}if(!e.target.closest('.guide-frame-svg'))return;const p=markerPoint(initial,config().image);if(markers().length>=64){message('Mỗi khung hỗ trợ tối đa 64 chấm.');return;}markers().push({...p,r:.012});selectedMarker=markers().length-1;apply();commit();return;}
  if(kind==='frame'||kind==='resize'){const box=frameBox(f);box.width=Math.min(box.width,1-box.x);box.height=Math.min(box.height,1-box.y);row().layout=box;}
  if(kind==='marker')markers();drag={pointer:e.pointerId,kind,before,start:initial,x:e.clientX,y:e.clientY,camera:config().camera||f._paperFrame.camera,image:clone(config().image),box:clone(row().layout),moved:false};holder.setPointerCapture(e.pointerId);syncTools();
 });
 holder.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.pointer)return;
  drag.moved||=Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>1;
  if(drag.kind==='orbit'){
   updateOrbitDrag(e);
   if(orbitSession&&!orbitRAF)orbitRAF=requestAnimationFrame(()=>{orbitRAF=0;if(drag&&orbitSession)drawOrbit(config().camera);});
   return;
  }
  const f=figure(),p=point(e,f),r=row();
  if(drag.kind==='image')r.image={...drag.image,x:clamp(drag.image.x+p.x-drag.start.x,-1,1),y:clamp(drag.image.y+p.y-drag.start.y,-1,1)};
  else if(drag.kind==='marker'){const q=markerPoint(p,r.image);Object.assign(r.markers[selectedMarker],q);}
  else{const parent=paper.querySelector('.guide-step-content').getBoundingClientRect(),dx=(e.clientX-drag.x)/parent.width,dy=(e.clientY-drag.y)/parent.height,b=drag.box;r.layout=drag.kind==='resize'?{...b,width:clamp(b.width+dx,.1,1-b.x),height:clamp(b.height+dy,.1,1-b.y)}:{...b,x:clamp(b.x+dx,0,1-b.width),y:clamp(b.y+dy,0,1-b.height)};}apply();
 });
 holder.addEventListener('pointerup',async e=>{
  if(!drag||drag.pointer!==e.pointerId)return;
  const orbit=drag.kind==='orbit',before=drag.before;
  const changed=drag.moved||orbit&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>1;
  if(changed&&orbit){
   updateOrbitDrag(e);
   stopOrbitDraw();
   if(orbitSession)drawOrbit(config().camera);
  }
  drag=null;
  holder.releasePointerCapture(e.pointerId);
  if(changed){
   const saved=await commit();
   if(orbit&&saved)await showPage({keepOrbit:true});
  }else{state=before;apply();}
 });holder.addEventListener('pointercancel',cancelGesture);holder.addEventListener('lostpointercapture',()=>{if(drag)cancelGesture();});
 holder.addEventListener('wheel',e=>{const f=e.target.closest('[data-paper-frame]');if(mode!=='orbit'||!e.ctrlKey||!f)return;e.preventDefault();e.stopPropagation();if(!canEdit()||drag)return;if(selected!==f.dataset.paperFrame){flushKeyboard();selected=f.dataset.paperFrame;selectedMarker=null;prepareOrbit();}const base=config().camera||f._paperFrame.camera;if(!base)return;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?300:1);row().camera=orbitGuideCamera(base,{zoom:(base.zoom??1)*Math.exp(-Math.max(-300,Math.min(300,delta))*.0015)});syncTools();if(orbitSession&&!orbitRAF)orbitRAF=requestAnimationFrame(()=>{orbitRAF=0;if(orbitSession)drawOrbit(config().camera);});message('Thu/phóng góc 3D '+Math.round(row().camera.zoom*100)+'%');clearTimeout(settingsTimer);settingsTimer=setTimeout(()=>{settingsTimer=0;commit().then(saved=>{if(saved)showPage({keepOrbit:true});});},250);},{passive:false});
 frameSelect.onchange=()=>{flushKeyboard();selected=frameSelect.value;selectedMarker=null;syncTools();prepareOrbit();};
 let sliderBefore=null;function slider(input,edit){input.addEventListener('input',()=>{if(!canEdit())return;sliderBefore??=clone(state);edit();apply();});input.addEventListener('change',()=>{if(sliderBefore){sliderBefore=null;commit();}});}
 slider(zoom,()=>{row().image.zoom=Number(zoom.value)/100;});slider(radius,()=>{if(selectedMarker!==null)markers()[selectedMarker].r=Number(radius.value)/1000;});
 resetImage.onclick=()=>{row().image={x:0,y:0,zoom:1};delete row().camera;apply();commit();showPage();};resetFrame.onclick=()=>{delete row().layout;apply();commit();};automatic.onclick=()=>{delete row().markers;selectedMarker=null;apply();commit();};clear.onclick=()=>{row().markers=[];selectedMarker=null;apply();commit();};function deleteMarker(){if(selectedMarker===null||!canEdit())return;markers().splice(selectedMarker,1);selectedMarker=null;apply();commit();}remove.onclick=deleteMarker;
 async function printPDF(){if(loading||printing||failed)return;flushKeyboard();cancelGesture();printing=true;syncTools();try{await api.export();message('Bản in đã được dựng theo các chỉnh sửa. Chọn Save as PDF.');}catch(error){message(error.message);}finally{printing=false;syncTools();}}print.onclick=printPDF;
 function flushKeyboard(){if(settingsTimer){clearTimeout(settingsTimer);settingsTimer=0;commit();}}
 function shut(){cancelFrameDraft();++thumbEpoch;clearTimeout(thumbTimer);thumbQueue.clear();++orbitTicket;stopOrbitDraw();orbitSession?.canvas.remove();orbitSession=null;flushKeyboard();cancelGesture();++token;dialog.close();api.focus?.();}close.onclick=shut;dialog.addEventListener('cancel',e=>{e.preventDefault();shut();});dialog.addEventListener('keydown',e=>{e.stopPropagation();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='p'){e.preventDefault();printPDF();return;}if(e.target===stepOrder||e.target.classList.contains('pdf-page-number-input'))return;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();history(e.shiftKey);return;}if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();deleteMarker();}if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)&&canEdit()){e.preventDefault();const delta=e.shiftKey?.01:.002,dx=e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0,dy=e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0;if(selectedMarker!==null){const m=markers()[selectedMarker];m.x=clamp(m.x+dx,0,1);m.y=clamp(m.y+dy,0,1);}else{row().image.x=clamp(config().image.x+dx,-1,1);row().image.y=clamp(config().image.y+dy,-1,1);}apply();clearTimeout(settingsTimer);settingsTimer=setTimeout(()=>{settingsTimer=0;commit();},180);}});
 return {active:()=>dialog.open,async open(start=0,check){
  if(dialog.open)return;
  undoCount=0;redoCount=0;gapScope.value='page';
  guide=api.guide();project=api.project();
  if(!guide.ready||!guide.steps.length)return;
  const ticket=++token;
  loading=!!check;failed=false;
  paper=null;pages.replaceChildren();holder.replaceChildren();
  dialog.showModal();
  if(check){
   syncTools();message('Đang kiểm tra đường lắp 3D…');
   const checked=await check();
   if(!dialog.open||ticket!==token)return;
   guide=api.guide();project=api.project();
   if(!checked||!guide.ready){
    guide={...guide,steps:[]};loading=false;failed=true;syncTools();
    message('Chưa kiểm tra được đường lắp. Đóng Preview rồi thử lại.');
    return;
   }
  }
  index=clamp(start,0,guide.steps.length-1);rebuildPages();
  await showPage();
 },dispose(){cancelFrameDraft();++orbitTicket;stopOrbitDraw();thumbObserver.disconnect();clearTimeout(thumbTimer);++thumbEpoch;++token;clearTimeout(settingsTimer);resize.disconnect();dialog.remove();cache.clear();}};
}
