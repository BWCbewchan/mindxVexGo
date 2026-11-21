import {partPreviewSrc} from './part-preview.js?v=library-color-75';
import {assetUrl,PLATFORM} from './platform.js';
import {groupAncestors,groupMembers,layerLocked,validGroupTree} from './assembly-review.js';
let filter='',tree=null;
function siblingsOf(project,parent){
 return [...project.groups.filter(g=>(g.parentId||null)===(parent||null)),...project.parts.filter(p=>(p.groupId||null)===(parent||null))]
  .sort((a,b)=>(a.layerPriority??Infinity)-(b.layerPriority??Infinity));
}
function selectionOrder(project,groupId,selection){
 const item=project.groups.find(g=>g.id===groupId)||(selection.size===1&&project.parts.find(p=>selection.has(p.id)));
 const siblings=siblingsOf(project,item?.parentId||item?.groupId);
 return {item,siblings,index:siblings.indexOf(item)};
}
function syncSelection(root,api,project,selection){
 const selected=project.parts.filter(part=>selection.has(part.id));
 const disabled=api.disabled(),editable=selected.length>0&&!selected.some(api.locked),groupId=api.selectedGroup?.();
 const buttons=root.querySelectorAll('.layers-tools button');
 const {siblings,index}=selectionOrder(project,groupId,selection);
 const states=[!editable||selection.size<2,!editable||!selected.some(part=>part.groupId),!editable,!editable,!editable||(!groupId&&selection.size!==1),!editable||index<=0,!editable||index<0||index>=siblings.length-1];
 buttons.forEach((button,i)=>{button.disabled=disabled||states[i];});
 const changedIds=new Set([...tree.selection,...selection]);
 for(const id of changedIds){
  const row=tree.rows.get(id);
  if(row&&tree.selection.has(id)!==selection.has(id)){
   row.classList.toggle('is-selected',selection.has(id));
   row.querySelector('.part-layer-select').setAttribute('aria-pressed',String(selection.has(id)));
  }
 }
 if(tree.groupId!==groupId)for(const id of [tree.groupId,groupId]){
  const row=tree.groupRows.get(id);
  if(row){row.classList.toggle('is-selected',id===groupId);row.querySelector('.group-layer-select').setAttribute('aria-pressed',String(id===groupId));}
 }
 tree.selection=new Set(selection);tree.groupId=groupId;
}
export function renderLayers(api){
 const root=document.getElementById('objects'),project=api.project(),selection=api.selection();
 const shape=JSON.stringify([filter,api.disabled(),project.groups,project.parts.map(p=>[p.id,p.sku,p.label,p.groupId,p.locked,p.visible,p.layerPriority]),api.labelVersion?.()]);
 if(tree?.root===root&&tree.project===project&&tree.shape===shape&&tree.parts.every((part,i)=>part===project.parts[i])){
  syncSelection(root,api,project,selection);return;
 }
 root.replaceChildren();root.classList.add('ps-layers');
 document.getElementById('groups').replaceChildren();document.getElementById('group-count').textContent=project.groups.length;document.getElementById('layer-panel').hidden=true;root.previousElementSibling.hidden=true;
 const make=(tag,cls)=>{const el=document.createElement(tag);el.className=cls;return el;},icon=name=>{const el=make('i','');el.dataset.lucide=name;return el;};
 function button(name,label,action){const b=make('button','layer-icon');b.title=label;b.setAttribute('aria-label',label);b.append(icon(name));b.onclick=action;b.disabled=api.disabled();return b;}
 function commit(fn){if(api.disabled())return;api.checkpoint();fn();api.clean();api.refresh();api.save(false);}
 function followLayersOrder(){
  if(project.guidePreferences?.mode!=='connections'&&project.guidePreferences?.order){project.guidePreferences={...project.guidePreferences};delete project.guidePreferences.order;}
 }
 const selectedParts=project.parts.filter(part=>selection.has(part.id)),editable=selectedParts.length>0&&!selectedParts.some(api.locked);
 const toolbar=make('div','layers-tools'),groupButton=button('folder-plus','Group selection · Ctrl+G',()=>api.group()),ungroupButton=button('folder-minus','Ungroup selection · Ctrl+Shift+G',()=>api.ungroup()),duplicateButton=button('copy','Duplicate · Ctrl+J',()=>document.getElementById('duplicate').click()),deleteButton=button('trash-2','Delete selection',()=>document.getElementById('delete').click());
 groupButton.disabled||=!editable||selection.size<2;ungroupButton.disabled||=!editable||!selectedParts.some(part=>part.groupId);duplicateButton.disabled||=!editable;deleteButton.disabled||=!editable;toolbar.append(groupButton,ungroupButton,duplicateButton,deleteButton);
 const renameButton=button('pencil','Rename selected layer',()=>{const current=api.selection(),item=project.groups.find(group=>group.id===api.selectedGroup?.())||(current.size===1?project.parts.find(part=>current.has(part.id)):null);if(!item)return;const row=tree.rows.get(item.id)||tree.groupRows.get(item.id);if(row)rename(row.querySelector('.layer-name'),item);});renameButton.disabled||=!editable||(!api.selectedGroup?.()&&selection.size!==1);toolbar.append(renameButton);root.append(toolbar);
 function moveLayer(direction){
  const {item,siblings,index}=selectionOrder(project,api.selectedGroup?.(),api.selection());
  if(!item||api.locked(item)||!siblings[index+direction])return;
  commit(()=>{siblings.splice(index,1);siblings.splice(index+direction,0,item);siblings.forEach((v,i)=>v.layerPriority=i);followLayersOrder();});
 }
 const up=button('arrow-up','Đưa layer lên',()=>moveLayer(-1)),down=button('arrow-down','Đưa layer xuống',()=>moveLayer(1));
 const {siblings,index}=selectionOrder(project,api.selectedGroup?.(),selection);
 up.disabled||=!editable||index<=0;down.disabled||=!editable||index<0||index>=siblings.length-1;toolbar.append(up,down);
 const search=make('input','layer-search');search.type='search';search.placeholder='Tìm trong mô hình…';search.setAttribute('aria-label','Tìm Layers');search.value=filter;root.append(search);search.oninput=()=>{filter=search.value;api.refresh();root.querySelector('.layer-search').focus();};
 const help=make('p','layers-help');help.textContent='Ctrl: chọn nhiều · Shift: chọn dải · Kéo tới mép trên hoặc dưới để đổi thứ tự, kéo giữa để lồng nhóm';root.append(help);
 const visibleParts=project.parts.filter(p=>(api.name(p)+' '+p.sku+' '+groupAncestors(project,p).map(g=>g.name).join(' ')).toLowerCase().includes(filter.toLowerCase()));const visibleIds=new Set(visibleParts.map(p=>p.id)),rendered=[];
 function rename(label,item){if(api.disabled()||api.locked(item))return;const input=make('input','layer-rename');input.value=item.name||item.label||api.name(item);input.maxLength=120;label.replaceWith(input);input.focus();input.select();let done=false;const finish=accept=>{if(done)return;done=true;if(accept&&input.value.trim())commit(()=>{if(item.sku)item.label=input.value.trim();else item.name=input.value.trim();});else api.refresh();};input.onblur=()=>finish(true);input.onkeydown=e=>{e.stopPropagation();if(e.key==='Enter')finish(true);if(e.key==='Escape')finish(false);};}
 function drag(row,payload){row.draggable=!api.disabled();row.ondragstart=e=>{e.dataTransfer.setData('application/x-vex-layers',JSON.stringify(payload()));e.dataTransfer.effectAllowed='move';};}
 function drop(row,groupId,partId){
  const target=partId?project.parts.find(p=>p.id===partId):project.groups.find(g=>g.id===groupId);
  function zone(e){
   if(!target)return 'inside';
   const rect=row.getBoundingClientRect(),y=(e.clientY-rect.top)/rect.height;
   return y<(partId?.5:.3)?'before':y>(partId?.5:.7)?'after':'inside';
  }
  row.ondragover=e=>{if(!e.dataTransfer.types.includes('application/x-vex-layers'))return;e.preventDefault();row.dataset.drop=zone(e);};
  row.ondragleave=()=>delete row.dataset.drop;
  row.ondrop=e=>{
   delete row.dataset.drop;e.preventDefault();e.stopPropagation();
   let payload;try{payload=JSON.parse(e.dataTransfer.getData('application/x-vex-layers'));}catch{return;}
   const position=zone(e),parent=position==='inside'?groupId:target.parentId||target.groupId;
   const moving=payload.group?project.groups.filter(g=>g.id===payload.group):project.parts.filter(p=>(payload.parts||[]).includes(p.id)).sort((a,b)=>(a.layerPriority??Infinity)-(b.layerPriority??Infinity));
   if(!moving.length||moving.includes(target)||moving.some(api.locked)||layerLocked(project,project.groups.find(g=>g.id===parent)))return;
   if(payload.group&&!validGroupTree(project.groups.map(g=>moving.includes(g)?{...g,parentId:parent}:g)))return;
   const siblings=siblingsOf(project,parent).filter(v=>!moving.includes(v));
   const index=position==='inside'?siblings.length:siblings.indexOf(target)+(position==='after'?1:0);
   commit(()=>{
    for(const item of moving){const key=payload.group?'parentId':'groupId';if(parent)item[key]=parent;else delete item[key];}
    siblings.splice(index,0,...moving);siblings.forEach((item,i)=>item.layerPriority=i);followLayersOrder();
   });
  };
 }
 function partRow(part,depth){rendered.push(part.id);const row=make('div','part-layer-row ps-layer');row.style.paddingLeft=depth*14+'px';row.dataset.partId=part.id;row.classList.toggle('is-selected',selection.has(part.id));drag(row,()=>{const current=api.selection();return {parts:current.has(part.id)?[...current]:[part.id]};});if(api.locked(part))row.draggable=false;
  row.append(button(part.visible===false?'eye-off':'eye',`${part.visible===false?'Show':'Hide'} part ${api.name(part)}`,()=>commit(()=>{part.visible=part.visible===false;})));
  const choose=make('button','part-layer-select');choose.setAttribute('aria-pressed',String(selection.has(part.id)));choose.disabled=api.disabled();const thumb=make('img','part-layer-thumb');thumb.src=partPreviewSrc(PLATFORM.id,part.sku);thumb.alt='';thumb.draggable=false;const label=make('span','layer-name');label.textContent=api.name(part);choose.append(thumb,label);choose.onclick=e=>{const anchor=api.anchor();if(e.shiftKey&&anchor&&rendered.includes(anchor)){const a=rendered.indexOf(anchor),b=rendered.indexOf(part.id);api.selectRange(rendered.slice(Math.min(a,b),Math.max(a,b)+1));}else{api.setAnchor(part.id);api.select(part.id,e.ctrlKey||e.metaKey);}};label.ondblclick=e=>{e.stopPropagation();rename(label,part);};row.append(choose,button(api.locked(part)?'lock-keyhole':'lock-keyhole-open',`${api.locked(part)?'Unlock':'Lock'} part ${api.name(part)}`,()=>{if(groupAncestors(project,part).some(g=>g.locked))return;commit(()=>{part.locked=!part.locked;});}));drop(row,part.groupId,part.id);root.append(row);
 }
 function branch(parentId,depth){for(const group of siblingsOf(project,parentId)){
  if(group.sku){if(visibleIds.has(group.id))partRow(group,depth);continue;}
  const members=groupMembers(project,group.id);if(filter&&!members.some(p=>visibleIds.has(p.id)))continue;const row=make('div','ps-group ps-layer');row.style.paddingLeft=depth*14+'px';row.dataset.groupId=group.id;drag(row,()=>({group:group.id}));if(api.locked(group))row.draggable=false;
  row.classList.toggle('is-selected',api.selectedGroup?.()===group.id);
  row.append(button(group.visible===false?'eye-off':'eye',`${group.visible===false?'Show':'Hide'} group ${group.name}`,()=>commit(()=>{group.visible=group.visible===false;})),button(group.collapsed?'chevron-right':'chevron-down',`Toggle group ${group.name}`,()=>{group.collapsed=!group.collapsed;api.refresh();api.save(false);}));const select=make('button','group-layer-select');select.setAttribute('aria-pressed',String(api.selectedGroup?.()===group.id));select.append(icon('folder'));const label=make('span','layer-name');label.textContent=group.name+' · '+members.length;select.append(label);select.disabled=api.disabled();select.onclick=()=>api.selectGroup(group.id);label.ondblclick=e=>{e.stopPropagation();rename(label,group);};row.append(select,button(api.locked(group)?'lock-keyhole':'lock-keyhole-open',`${api.locked(group)?'Unlock':'Lock'} group ${group.name}`,()=>{if(groupAncestors(project,group).some(g=>g.locked))return;commit(()=>{group.locked=!group.locked;});}));drop(row,group.id);root.append(row);if(!group.collapsed||filter)branch(group.id,depth+1);
 }}
 branch(undefined,0);if(!visibleParts.length){const empty=make('p','layers-help');empty.textContent='Không tìm thấy chi tiết.';root.append(empty);}const outside=make('div','layers-ungroup-drop');outside.textContent='Kéo vào đây để đưa ra khỏi nhóm';drop(outside,undefined);root.append(outside);globalThis.lucide?.createIcons({root});
 tree={root,project,shape,parts:[...project.parts],selection:new Set(selection),groupId:api.selectedGroup?.(),
  rows:new Map([...root.querySelectorAll('[data-part-id]')].map(row=>[row.dataset.partId,row])),
  groupRows:new Map([...root.querySelectorAll('[data-group-id]')].map(row=>[row.dataset.groupId,row]))};
}
