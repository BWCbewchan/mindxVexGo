import {croppedPartThumbnail} from './part-thumbnail.js';
import {partPreviewSrc} from './part-preview.js';
import {inventoryPages} from './guide-inventory.js';
import {frameSettings} from './guide-page-settings.js';
const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
const ns='http://www.w3.org/2000/svg';let serial=0;
const svgNode=(tag,attrs={})=>{const n=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))n.setAttribute(key,String(value));return n;};
export function guideHeader(label){const row=node('div');row.className='guide-document-header';const heading=node('div');heading.className='guide-document-title';const icon=node('span');icon.className='guide-document-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 32 32"><path d="M13 3h6l1 4 3 1 3-2 4 5-2 3v4l2 3-4 5-3-2-3 1-1 4h-6l-1-4-3-1-3 2-4-5 2-3v-4l-2-3 4-5 3 2 3-1z" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';heading.append(icon,node('span',label));const logo=node('img');logo.className='guide-document-logo';logo.src='/mindx-logo-color-mark.png';logo.alt='mindX Tech & AI School';row.append(heading,logo);const rule=node('div');rule.className='guide-document-rule';rule.append(node('span'));return [row,rule];}
function page(label,kind){const p=node('article');p.className='guide-page guide-paper '+kind;p.append(...guideHeader(label));return p;}
export function prepPaper(project,catalog,platform){const p=page('CHUẨN BỊ','guide-prep');p.append(node('h1',project.title));const counts=new Map();for(const part of project.parts)counts.set(part.sku,(counts.get(part.sku)||0)+1);const groups=inventoryPages(counts,catalog)[0]||[],items=groups.flatMap(g=>g.items.map(part=>({...part,categoryTitle:g.title}))),inventory=node('div');inventory.className='guide-droplet-inventory';const columns=Math.min(8,Math.max(3,Math.ceil(items.length/3))),rows=Math.max(1,Math.ceil(items.length/columns));inventory.style.setProperty('--droplet-columns',columns);inventory.style.setProperty('--droplet-image-height',Math.min(38,Math.max(16,142/rows-12))+'mm');for(let offset=0;offset<items.length;offset+=columns){const row=node('div');row.className='guide-droplet-row';for(const part of items.slice(offset,offset+columns)){const card=node('div');card.className='guide-droplet-part';const img=node('img');img.src=partPreviewSrc(platform.id,part.id,project.parts.find(p=>p.sku===part.id)?.legoKitId||project.kit?.kitId);img.alt=part.name;img.dataset.partThumb='true';const quantity=node('strong',`${part.count}×`);quantity.className='droplet-quantity';card.append(img,quantity,node('span',part.name),node('small',part.categoryTitle));row.append(card);}inventory.append(row);}p.append(inventory,node('p','Xếp linh kiện theo nhóm trước khi lắp.'));return p;}
function setSVGAttribute(node,name,value){if(node.getAttribute(name)!==value)node.setAttribute(name,value);}
export function applyPaperFrame(figure,settings={}){
 const meta=figure._paperFrame;
 if(!meta)return;
 const {width,height,group,markers,autoMarkers}=meta,{x=0,y=0,zoom=1}=settings.image||{};
 setSVGAttribute(group,'transform',`translate(${x*width+width/2} ${y*height+height/2}) scale(${zoom}) translate(${-width/2} ${-height/2})`);
 const dots=meta.name==='assembled'?[]:settings.markers??[];
 for(const [index,p] of dots.entries()){
  let dot=markers.children[index];
  if(!dot){dot=svgNode('circle',{fill:'#a855f7','data-marker-index':index,class:'guide-hole-dot'});markers.append(dot);}
  setSVGAttribute(dot,'cx',String(p.x*width));
  setSVGAttribute(dot,'cy',String(p.y*height));
  setSVGAttribute(dot,'r',String(p.r*width));
 }
 while(markers.children.length>dots.length)markers.lastElementChild.remove();
 if(settings.layout){
  const r=settings.layout;
  if(figure.dataset.frameLayout!=='custom')figure.dataset.frameLayout='custom';
  for(const [name,value] of [['left',r.x],['top',r.y],['width',r.width],['height',r.height]]){
   const percent=value*100+'%';
   if(figure.style[name]!==percent)figure.style[name]=percent;
  }
 }else if(figure.dataset.frameLayout){
  delete figure.dataset.frameLayout;
  for(const name of ['left','top','width','height'])figure.style.removeProperty(name);
 }
}
function illustration(name,image,meta,settings,caption){const figure=node('figure');figure.className=name==='assembled'?'guide-main-figure':'guide-detail-figure';figure.dataset.paperFrame=name;const viewport=node('div');viewport.className='guide-image-viewport';const width=meta?.width||1400,height=meta?.height||1400,svg=svgNode('svg',{xmlns:ns,viewBox:`0 0 ${width} ${height}`,preserveAspectRatio:'xMidYMid meet',class:'guide-frame-svg','aria-label':name==='assembled'?'Mô hình sau khi lắp':'Hướng lắp chi tiết'}),defs=svgNode('defs'),clip=svgNode('clipPath',{id:'guide-image-clip-'+(++serial)});clip.append(svgNode('rect',{width,height}));defs.append(clip);const cropped=svgNode('g',{'clip-path':`url(#${clip.id})`}),group=svgNode('g'),picture=svgNode('image',{href:image,x:0,y:0,width,height}),markers=svgNode('g',{class:'guide-hole-markers'});group.append(picture,markers);cropped.append(group);svg.append(defs,cropped);viewport.append(svg);figure.append(viewport,node('figcaption',caption));figure._paperFrame={name,width,height,svg,group,markers,autoMarkers:name==='assembled'?[]:meta?.markers||[],camera:meta?.camera};applyPaperFrame(figure,settings);return figure;}
// VEX manuals print pins and shafts at 1:1 next to a pitch scale so students
// can lay the part on the page. Lengths are physical millimetres (CSS mm).
function ruler(length){const box=node('span');box.className='guide-ruler';box.title=`Đặt chi tiết lên vạch để so độ dài (${length} mm)`;const bar=node('span');bar.className='guide-ruler-bar';bar.style.width=Math.min(length,120)+'mm';const label=node('small',length>120?`${Math.round(length)} mm`:'1:1');box.append(bar,label);return box;}
export function stepPaper(step,index,total,shots,platform,kitId){const p=page('LẮP RÁP','guide-assembly-step');const content=node('div');content.className='guide-step-content';
// VEX IQ manual cues: a step-number starburst, a big multiplier for twin sides
// and a framed label for modules prepared on the table.
const badges=node('div');badges.className='guide-step-badges';const number=node('span',String(index+1));number.className='guide-step-number';number.setAttribute('aria-label',`Bước ${index+1}`);badges.append(number);
if(step.mirrored){const twin=node('span','2X');twin.className='guide-step-multiplier';twin.title='Làm 2 bên giống nhau';badges.append(twin);}
if(step.onTable||step.attachModule){const tag=node('span',step.attachModule?'Gắn cụm vào robot':'Cụm lắp riêng trên bàn');tag.className='guide-step-module';badges.append(tag);}
if(step.pathConflict==='together'){const tag=node('span','Lắp đồng thời');tag.className='guide-step-module guide-step-together';badges.append(tag);}
content.append(badges);if(step.onTable)p.classList.add('guide-on-table');
content.append(illustration('assembled',shots.assembled,shots.assembledFrame,frameSettings(step.page,'assembled'),step.page?.frames?.assembled?.redOutline===false?'Sau khi lắp':'Sau khi lắp · viền đỏ là chi tiết mới'));const side=node('div');side.className='guide-step-side';const needed=node('div');needed.className='guide-needed';needed.append(node('h3',index===0?'Chuẩn bị các chi tiết':'Thêm ở bước này'));const counts=new Map(),twins=new Set(step.twinIds||[]);for(const part of step.added){if(twins.has(part.id))continue;const row=counts.get(part.sku)||{...part,count:0};row.count++;counts.set(part.sku,row);}for(const part of counts.values()){const card=node('div');card.className='guide-needed-part';const thumb=node('img');thumb.src=partPreviewSrc(platform.id,part.sku,step.parts.find(p=>p.id===part.id)?.legoKitId||kitId);thumb.alt='';thumb.dataset.partThumb='true';const name=node('span',part.name),quantity=node('strong',`× ${part.count}`);name.className='guide-needed-name';quantity.className='guide-needed-quantity';card.setAttribute('aria-label',`${part.count} × ${part.name}`);card.append(thumb,quantity,name);if(part.lengthMM)card.append(ruler(part.lengthMM));needed.append(card);}const preparation=node('section');preparation.className='guide-preparation-box';preparation.setAttribute('aria-label','Linh kiện chuẩn bị cho bước này');preparation.append(needed,p.querySelector('.guide-document-logo'));p.querySelector('.guide-document-header').append(preparation);if(shots.detail)side.append(illustration('detail',shots.detail,shots.detailFrame,frameSettings(step.page,'detail'),step.insertionBlocked?'Vị trí sau khi lắp · cần chuẩn bị cụm trước':shots.seatedDetail?'Cận cảnh · sau khi lắp':step.guideSupport?'Hướng lắp · chi tiết ở bước sau được làm mờ':'Hướng lắp · hình tách chi tiết'));content.append(side);p.append(content);const instruction=node('p',step.insertionBlocked?step.insertionNote:shots.seatedDetail?'Hình cận cảnh vị trí sau khi lắp; giữ cụm như hình.':step.note);instruction.className='guide-step-instruction';const footer=node('div');footer.className='guide-page-number';footer.setAttribute('aria-label',`Trang ${index+1} trên ${total}`);const current=node('strong',String(index+1).padStart(2,'0')),divider=node('span','/'),count=node('span',String(total).padStart(2,'0'));divider.setAttribute('aria-hidden','true');footer.append(current,divider,count);p.append(instruction,footer);return p;}
// Two small steps side by side on one page, as VEX IQ manuals lay them out.
// Each half keeps the parts callout, step badge, exploded view (with a small
// "after" inset) and instruction of the single-step page.
export function stepPairPaper(entries,total,platform,kitId){
 const p=page('LẮP RÁP','guide-assembly-pair'),grid=node('div');grid.className='guide-pair-grid';
 for(const {step,index,shots} of entries){
  const single=stepPaper(step,index,total,shots,platform,kitId),panel=node('section');
  panel.className='guide-assembly-step guide-pair-panel';panel.setAttribute('aria-label',`Bước ${index+1}`);
  const box=single.querySelector('.guide-preparation-box');box?.querySelector('.guide-document-logo')?.remove();
  for(const part of [box,single.querySelector('.guide-step-content'),single.querySelector('.guide-step-instruction')])if(part)panel.append(part);
  if(single.classList.contains('guide-on-table'))panel.classList.add('guide-on-table');
  grid.append(panel);
 }
 const first=entries[0].index+1,last=entries.at(-1).index+1,footer=node('div');footer.className='guide-page-number';footer.setAttribute('aria-label',`Bước ${first}–${last} trên ${total}`);
 const current=node('strong',`${String(first).padStart(2,'0')}–${String(last).padStart(2,'0')}`),divider=node('span','/'),count=node('span',String(total).padStart(2,'0'));divider.setAttribute('aria-hidden','true');footer.append(current,divider,count);
 p.append(grid,footer);return p;
}
// Small, unedited assembly steps are paired; anything with its own page edits,
// a flagged path, a chain wrap or many parts keeps a full page.
export function pairableStep(step){
 return step?.type==='assembly'&&!step.page&&!step.insertionBlocked&&!step.pathConflict&&step.added.length-(step.twinIds?.length||0)<=6&&new Set(step.added.map(p=>p.sku)).size<=3;
}
export function finishedPaper(project,image){const p=page('HOÀN THÀNH','guide-finished');p.append(node('h2',project.title));const hero=node('img');hero.className='guide-finished-image';hero.src=image;hero.alt='Sản phẩm đã lắp hoàn chỉnh';p.append(hero);return p;}
export async function rasterizePaperImages(container){for(const svg of [...container.querySelectorAll('.guide-frame-svg')]){const box=svg.viewBox.baseVal,source=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));try{const image=new Image();image.src=source;await image.decode();const canvas=document.createElement('canvas');canvas.width=box.width;canvas.height=box.height;const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0);const result=node('img');result.src=canvas.toDataURL('image/png');result.className=svg.closest('[data-paper-frame]').dataset.paperFrame==='assembled'?'guide-step-image':'guide-detail-image';result.alt=svg.getAttribute('aria-label');svg.replaceWith(result);}finally{URL.revokeObjectURL(source);}}}
export async function readyPaperImages(container){await Promise.all([...container.querySelectorAll('img')].map(async img=>{await img.decode();if(img.dataset.partThumb){const src=await croppedPartThumbnail(img);if(src!==img.src){img.src=src;await img.decode();}}}));await Promise.all([...container.querySelectorAll('svg image')].map(async image=>{const img=new Image();img.src=image.getAttribute('href');await img.decode();}));}
