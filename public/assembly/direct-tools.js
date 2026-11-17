import {assemblyMatingContext,movingAssemblyIds,nearestAssemblyMate,releaseAssemblyBoundary,occupiedAssemblyReferences} from './assembly-mating.js?v=physical-snap-112';
import {attachmentTargets,focusedAttachmentTargets} from './attachment-targets.js?v=focused-targets-110';
import {assetUrl} from './platform.js';
import {cachedVisibleBounds,VisibleBoxHelper} from './visible-bounds.js';
import {compatibleReferences} from './connector-policy.js?v=compatibility-27';
import {markerWorldSize,screenPoint as projectMarker} from './attachment-indicator.js?v=attach-points-103';
import * as THREE from 'three';
import {nearestMate,worldReference,matingPose,linkedPoses,insideSnapReleaseZone,SNAP_DISTANCE_MM} from './mating.js?v=physical-snap-112';
export async function installDirectTools(api){
 const refs=api.references||(await(await fetch(assetUrl('connectors.json?v=compatibility-27'), {cache:'no-store'})).json()).parts,$=id=>document.getElementById(id);
 let drag=null,pendingMove=null,candidate=null,ghost=null,transformIds=null,transformContext=null,lastPreview=0;
 const selectionBoxes=new Map(),ghostParts=new Map(),targetPoints=[];
 const targetGeometry=new THREE.SphereGeometry(.0018,12,8);
 let fixedTargets=null;
 const fitCache=new Map();
 function clearTargetPoints(){for(const point of targetPoints){api.scene.remove(point);point.material.dispose();}targetPoints.length=0;}
 const pointerRay=new THREE.Raycaster(),pointer=new THREE.Vector2(),dragPoint=new THREE.Vector3(),screenPoint=new THREE.Vector3();
 const bar=document.createElement('div');bar.className='part-actions';bar.hidden=true;bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','Selected part actions');
 for(const [id,label,tip] of [['turn','↻ 90°','Rotate selected part 90 degrees'],['flip','⇅','Reverse selected connector end'],['copy','⧉','Duplicate selected part'],['detach','Unlink','Detach selected part'],['remove','×','Remove selected part']]){const b=document.createElement('button');b.textContent=label;b.title=tip;b.setAttribute('aria-label',tip);b.dataset.action=id;b.onclick=()=>action(id);bar.append(b);}
 api.canvas.parentNode.append(bar);
 const handle=document.createElement('button');handle.className='depth-handle';handle.textContent='↕ Depth';handle.setAttribute('aria-label','Drag insertion depth');handle.hidden=true;api.canvas.parentNode.append(handle);
 const hint=document.createElement('div');hint.className='assembly-gesture-hint';hint.textContent='Alt + drag to duplicate · Drop near a compatible hole or pin to snap';api.canvas.parentNode.append(hint);
 function clearPreview(){if(ghost){api.scene.remove(ghost);ghost.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});ghost=null;ghostParts.clear();}clearTargetPoints();candidate=null;}
 function blockForMate(mate){return {target:mate.target,sourceRef:mate.sourceRef,targetRef:mate.targetRef};}
 function blockReversedForMate(child){return {target:child.id,sourceRef:child.mate.targetRef,targetRef:child.mate.sourceRef};}
 function appendSnapBlock(part,block){const blocks=Array.isArray(part.snapBlocked)?part.snapBlocked:[];blocks.push(block);const unique=new Map(blocks.map(item=>[`${item.target}:${item.sourceRef}:${item.targetRef}`,item]));part.snapBlocked=[...unique.values()];}
 function detachTouched(part){
  if(part.mate){appendSnapBlock(part,blockForMate(part.mate));delete part.mate;}
  for(const child of api.project().parts)if(child.mate?.target===part.id){appendSnapBlock(part,blockReversedForMate(child));appendSnapBlock(child,blockForMate(child.mate));delete child.mate;}
 }
 function activeSnapBlocks(part){
  const blocks=[];
  for(const block of Array.isArray(part.snapBlocked)?part.snapBlocked:[]){const target=api.project().parts.find(p=>p.id===block.target),sourceRef=refs[part.sku]?.find(r=>r.id===block.sourceRef),targetRef=refs[target?.sku]?.find(r=>r.id===block.targetRef);if(!target||!sourceRef||!targetRef)continue;if(insideSnapReleaseZone(part,sourceRef,target,targetRef))blocks.push(block);}
  part.snapBlocked=blocks;if(!blocks.length)delete part.snapBlocked;return blocks;
 }
 function restore(){if(!drag?.started)return;if(drag.duplicateId){const obj=api.objects.get(drag.duplicateId);if(obj)api.scene.remove(obj);api.objects.delete(drag.duplicateId);}Object.assign(api.project(),structuredClone(drag.before));for(const part of api.project().parts){const obj=api.objects.get(part.id);if(obj)api.transform(obj,part);}api.discardCheckpoint(drag.redo);if(drag.duplicateId)api.select(drag.sourceId);}
 async function end(cancel=false){
  if(!drag)return;pendingMove=null;if(!cancel&&drag.started&&drag.kind==='surface'&&!drag.free)previewMate(api.project().parts.find(p=>p.id===drag.id),false,true);const current=drag,id=current.id,detached=!!current.detached,attached=!!candidate&&!cancel,support=candidate?.support||0;
  if(cancel)restore();else if(current.started&&candidate){applyCandidate();}
  drag=null;clearPreview();api.orbit.enabled=true;
  const kept=cancel||!current.started||await api.save(true,{autoAttach:false});
  api.warnings();api.refreshSelection();if(!kept)return;if(!cancel&&!current.started&&!current.duplicate&&current.kind==='surface'&&api.openPinAt?.(id,current.point))return;
  api.status(cancel?'Movement cancelled.':current.duplicateId?'Part duplicated · Ctrl+Z to undo.':attached?(support>1?`Attached to ${support} aligned pins · Undo restores the previous position.`:'Attached on release · Undo restores the previous position.'):detached?'Joint released · Drop near another highlighted point to attach.':'Drag a part or use its context tools.');
 }
 function rayAt(event){const rect=api.canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);pointerRay.setFromCamera(pointer,api.camera);return pointerRay;}
 function hitsTransformHandle(event){const rect=api.canvas.getBoundingClientRect();if(!rect.width||!rect.height||!api.controls.object)return false;const pointer=new THREE.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);api.controls.pointerHover(pointer);return api.controls.axis!==null;}
 function applyCandidate(){if(!candidate)return;if(candidate.parts){const moving=new Set(candidate.movingIds);api.project().parts=structuredClone(candidate.parts);for(const p of api.project().parts){const obj=api.objects.get(p.id);if(obj&&moving.has(p.id))api.transform(obj,p);}}else{const p=api.project().parts.find(p=>p.id===api.selected());Object.assign(p,candidate.pose);p.mate={target:candidate.target.id,sourceRef:candidate.sourceRef.id,targetRef:candidate.targetRef.id,depth:candidate.depth,twist:0,flip:false};delete p.snapBlocked;api.transform(api.objects.get(p.id),p);}}
 function previewMate(part,alt,force=false){
  if(!part)return;
  if(alt||!$('magnet').checked){clearPreview();return;}
  const now=performance.now();if(!force&&now-lastPreview<45)return;lastPreview=now;
  const ids=drag?.movingIds||transformIds;
  let blockedFit=null;
  const acceptCandidate=proposal=>{
   if(!api.checkSnap)return true;
   const parts=proposal.parts||api.project().parts.map(row=>row.id===part.id?{...row,...proposal.pose}:row);
   const moving=new Set(ids||[part.id]),key=JSON.stringify(parts.filter(p=>moving.has(p.id)).map(p=>[p.id,p.position.map(v=>Math.round(v*1e6)),p.rotation.map(v=>Math.round(v*1e6))]));
   let report=fitCache.get(key);if(!report){report=api.checkSnap(parts,[...moving]);if(fitCache.size>=48)fitCache.delete(fitCache.keys().next().value);fitCache.set(key,report);}if(!report.ok)blockedFit=report;
   return report.ok;
  };
  if(ids?.length>1){
   const context=drag?(drag.context??=assemblyMatingContext(drag.before.parts,refs)):transformContext;
   candidate=nearestAssemblyMate(api.project().parts,refs,ids,{distance:SNAP_DISTANCE_MM,context,preferred:candidate,acceptCandidate});
  }else candidate=nearestMate(part,api.project().parts,refs,{distance:SNAP_DISTANCE_MM,preferred:candidate,acceptCandidate,excluded:$('move-joined').checked?[...linkedPoses(api.project().parts,part.id,part).keys()]:[],excludedMates:activeSnapBlocks(part)});
  if(!candidate){clearPreview();if(blockedFit)api.status('Không thể ghép tại đây: thân chi tiết sẽ xuyên vào mô hình. Thử mặt lắp hoặc lỗ khác.');return;}
  if(!ghost){ghost=new THREE.Group();api.scene.add(ghost);}
  for(const copy of ghostParts.values())copy.visible=false;
  for(const row of candidate.parts?candidate.parts.filter(row=>ids.includes(row.id)):[{...part,...candidate.pose}]){
   let copy=ghostParts.get(row.id);
   if(!copy){
    const original=api.objects.get(row.id);if(!original)continue;
    copy=original.clone(true);
    copy.traverse(node=>{if(!node.isMesh)return;const tint=material=>{const next=material.clone();next.transparent=true;next.opacity=.35;next.depthWrite=false;return next;};node.material=Array.isArray(node.material)?node.material.map(tint):tint(node.material);});
    ghost.add(copy);ghostParts.set(row.id,copy);
   }
   copy.visible=api.objects.get(row.id)?.visible!==false;api.transform(copy,row);
  }
  const movingIds=new Set(ids||[part.id]);
  if(!fixedTargets){const stationary=api.project().parts.filter(row=>!movingIds.has(row.id));fixedTargets=occupiedAssemblyReferences(assemblyMatingContext(stationary,refs));}
  const fullCandidate={...candidate,parts:candidate.parts||api.project().parts.map(row=>row.id===part.id?{...row,...candidate.pose}:row)};
  const targets=focusedAttachmentTargets(attachmentTargets(fullCandidate,api.project().parts.filter(row=>movingIds.has(row.id)),refs,fixedTargets,{includeSource:true}),{
   project:point=>projectMarker(point,api.camera,api.canvas.clientWidth,api.canvas.clientHeight)
  });
  for(let i=0;i<targets.length;i++){
   const target=targets[i];let point=targetPoints[i];
   if(!point){point=new THREE.Mesh(targetGeometry,new THREE.MeshBasicMaterial({depthTest:false,depthWrite:false,transparent:true}));api.scene.add(point);targetPoints.push(point);}
   point.position.copy(target.point);point.visible=true;
   point.material.color.setHex(target.primary?0x16a968:target.matched?0x23ca7b:0x85e6b6);
   point.material.opacity=target.matched?1:.45;point.renderOrder=target.matched?32:30;
   point.userData.attachmentTarget=target;
   point.scale.setScalar(markerWorldSize(point.position,api.camera,api.canvas.clientHeight,target.primary?14:target.matched?11:9)/.0036);
  }
  for(let i=targets.length;i<targetPoints.length;i++)targetPoints[i].visible=false;
  api.status(`Thả để ghép ${ids?.length>1?ids.length+' chi tiết thành cụm':'chi tiết'} · ${candidate.support||1} điểm khớp · đích ${candidate.target.label||candidate.target.sku}${candidate.targetRef.profile&&candidate.targetRef.kind==='pin'?` · cách đầu trục ${candidate.depth.toFixed(1)} mm (kéo dọc trục để đổi vị trí)`:''}.`);
 }

 function startSurface(e){
  if(drag||e.button!==0||api.busy()||api.preview()||api.connectActive()||api.quickActive()||e.ctrlKey||e.metaKey||e.shiftKey||hitsTransformHandle(e))return;
  fixedTargets=null;
  fitCache.clear();
  const hit=rayAt(e).intersectObjects([...api.objects.values()].filter(obj=>obj.visible),true).find(h=>h.object.isMesh);if(!hit)return;
  let root=hit.object;while(root&&!root.userData.instance)root=root.parent;
  const id=root?.userData.instance;if(!id||api.isLocked?.(id))return;
  e.preventDefault();e.stopImmediatePropagation();
  if(e.altKey){
   if(api.project().parts.length>=250){api.status('The project limit is 250 parts.');return;}
   try{api.assertAdditions?.([api.project().parts.find(part=>part.id===id)]);}catch(error){api.status(error.message);return;}
   api.select(id);
  }else if(!api.selection().has(id)&&!api.selectGroup?.(id))api.select(id);
  const joined=!e.altKey&&$('move-joined').checked,parts=api.project().parts;
  const context=joined?assemblyMatingContext(parts,refs):null;
  const movingIds=e.altKey?[id]:joined?[...movingAssemblyIds(parts,refs,id,[...api.selection()],context)]:[...api.selection()];
  if(movingIds.some(id=>api.isLocked?.(id))){api.status('Cụm có layer bị khóa. Mở khóa trước khi di chuyển.');return;}
  api.controls.detach();api.orbit.enabled=false;
  const plane=new THREE.Plane().setFromNormalAndCoplanarPoint(api.camera.getWorldDirection(new THREE.Vector3()),hit.point);
  drag={id,sourceId:id,duplicate:e.altKey,kind:'surface',pointer:e.pointerId,start:[e.clientX,e.clientY],point:hit.point.clone(),plane,joined,context,movingIds};
  api.canvas.setPointerCapture(e.pointerId);
 }
 function startDepth(e){
  if(drag||api.busy()||api.preview())return;
  const part=api.project().parts.find(p=>p.id===api.selected()),link=depthLink(part);if(!link||api.isLocked?.(part.id))return;
  e.preventDefault();e.stopPropagation();api.controls.detach();api.orbit.enabled=false;
  drag={id:part.id,kind:'depth',pointer:e.pointerId,start:[e.clientX,e.clientY],axis:link.normal,point:link.point,startParameter:lineParameter(rayAt(e).ray,link.point,link.normal),startDepth:link.depth};
  handle.setPointerCapture(e.pointerId);
 }
 function lineParameter(ray,point,normal){const w=dragPoint.copy(point).sub(ray.origin),a=normal.dot(ray.direction),den=1-a*a;return den<.005?null:(a*ray.direction.dot(w)-normal.dot(w))/den;}
 function beginMove(){
  drag.before=structuredClone(api.project());
  drag.redo=api.checkpoint();drag.started=true;
  drag.startPart=drag.before.parts.find(part=>part.id===drag.id);
  if(drag.duplicate){
   const part=structuredClone(drag.startPart);part.id=crypto.randomUUID();delete part.mate;delete part.groupId;delete part.snapBlocked;
   const obj=api.objects.get(drag.sourceId).clone(true);obj.userData.instance=part.id;
   api.project().parts.push(part);api.objects.set(part.id,obj);api.scene.add(obj);
   drag.id=drag.duplicateId=part.id;api.select(part.id);api.controls.detach();
  }
  drag.part=api.project().parts.find(part=>part.id===drag.id);
  if(drag.kind==='depth'||drag.duplicate)return;
  if(!drag.joined){
   if(drag.movingIds.length>1)releaseAssemblyBoundary(api.project().parts,refs,drag.movingIds);
   else{
    drag.detached=!!drag.part.mate||api.project().parts.some(part=>part.mate?.target===drag.id);
    detachTouched(drag.part);
   }
  }
  if(drag.movingIds.length>1){
   const startingParts=new Map(drag.before.parts.map(part=>[part.id,part]));
   drag.peers=api.project().parts.filter(part=>part.id!==drag.id&&drag.movingIds.includes(part.id)).map(part=>({part,position:startingParts.get(part.id).position}));
  }
 }
 function move(e){
  if(!drag.started){if(Math.hypot(e.clientX-drag.start[0],e.clientY-drag.start[1])<4)return;beginMove();}
  const {part,startPart}=drag;
  if(drag.kind==='surface'){
   const point=rayAt(e).ray.intersectPlane(drag.plane,dragPoint);if(!point)return;
   const delta=point.sub(drag.point).multiplyScalar(1000);
   let position=startPart.position.map((value,i)=>value+delta.getComponent(i));
   if(api.snapPosition)position=api.snapPosition(position,startPart.position);
   const free=(e.altKey&&!drag.duplicate)||!$('magnet').checked;
   if(free===drag.free&&position.every((value,i)=>value===part.position[i]))return;
   part.position=position;api.transform(api.objects.get(part.id),part);
   if(drag.peers){
    delta.set(...position.map((value,i)=>value-startPart.position[i]));
    for(const peer of drag.peers){peer.part.position=peer.position.map((value,i)=>value+delta.getComponent(i));api.transform(api.objects.get(peer.part.id),peer.part);}
   }
   drag.free=free;previewMate(part,free);
  }else{
   const parameter=lineParameter(rayAt(e).ray,drag.point,drag.axis);
   if(parameter===null||drag.startParameter===null){api.status('Rotate the view slightly to drag along this axis.');return;}
   const offset=(parameter-drag.startParameter)*1000;
   part.position=startPart.position.map((value,i)=>value+drag.axis.getComponent(i)*offset);
   part.mate.depth=drag.startDepth-offset;api.transform(api.objects.get(part.id),part);
   api.status(`Insertion: ${part.mate.depth.toFixed(1)} mm · Only this part moves`);
  }
 }
 function queueMove(e){
  if(!drag||e.pointerId!==drag.pointer)return;
  pendingMove=e;
  if(api.invalidate)api.invalidate();else flushMove();
 }
 function flushMove(){
  const e=pendingMove;pendingMove=null;
  if(e&&drag&&e.pointerId===drag.pointer)move(e);
 }
 function finishPointer(e){
  if(!drag||e.pointerId!==drag.pointer)return;
  e.stopImmediatePropagation();flushMove();
  if(drag.kind==='surface'){
   drag.free=(e.altKey&&!drag.duplicate)||!$('magnet').checked;
   if(drag.free)clearPreview();
  }
  end();
 }
 function cancelPointer(e){if(drag?.pointer===e.pointerId)end(true);}
 api.canvas.addEventListener('pointerdown',startSurface,true);
 api.canvas.addEventListener('pointermove',queueMove,true);
 api.canvas.addEventListener('pointerup',finishPointer,true);
 api.canvas.addEventListener('pointercancel',cancelPointer);
 handle.addEventListener('pointerdown',startDepth);
 handle.addEventListener('pointermove',queueMove);
 handle.addEventListener('pointerup',finishPointer);
 handle.addEventListener('pointercancel',cancelPointer);
 document.addEventListener('keydown',e=>{if(drag&&(e.key==='Escape'||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'))){e.preventDefault();e.stopImmediatePropagation();end(true);}else if(drag&&['v','r','delete','backspace'].includes(e.key.toLowerCase())){e.preventDefault();e.stopImmediatePropagation();}},true);
 function depthLink(part){const mate=part?.mate,target=api.project().parts.find(p=>p.id===mate?.target),s=refs[part?.sku]?.find(r=>r.id===mate?.sourceRef),t=refs[target?.sku]?.find(r=>r.id===mate?.targetRef);if(!s||!t)return null;const a=worldReference(part,s),b=worldReference(target,t);return {point:a.point.multiplyScalar(.001),normal:b.normal,depth:-worldReference(part,s).point.sub(b.point).dot(b.normal)};}
 async function action(name){if(drag||api.busy()||api.preview())return;api.closePreviews();const part=api.project().parts.find(p=>p.id===api.selected());if(!part)return;if(name==='copy'){ $('duplicate').click();return;}if(name==='remove'){$('delete').click();return;}api.checkpoint();const before=structuredClone(api.project().parts);if(name==='detach'){detachTouched(part);}else{const mate=part.mate,target=api.project().parts.find(p=>p.id===mate?.target),sourceRef=refs[part.sku]?.find(r=>r.id===mate?.sourceRef),targetRef=refs[target?.sku]?.find(r=>r.id===mate?.targetRef);
 if(name==='flip'&&sourceRef&&targetRef){const alternatives=(refs[part.sku]||[]).filter(r=>r.kind===sourceRef.kind&&!r.profile&&!sourceRef.profile&&Math.abs(r.radius-sourceRef.radius)<.25&&new THREE.Vector3().fromArray(r.normal).dot(new THREE.Vector3().fromArray(sourceRef.normal))<-.99);const next=alternatives.sort((a,b)=>new THREE.Vector3().fromArray(b.point).distanceTo(new THREE.Vector3().fromArray(sourceRef.point))-new THREE.Vector3().fromArray(a.point).distanceTo(new THREE.Vector3().fromArray(sourceRef.point)))[0];if(next){const link=depthLink(part);Object.assign(part,matingPose(part,next,target,targetRef,{depth:link.depth,twist:mate.twist||0,flip:mate.flip||false}));part.mate.sourceRef=next.id;}}
 else{const oldQ=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad))),axis=sourceRef&&name==='turn'?new THREE.Vector3().fromArray(sourceRef.normal).applyQuaternion(oldQ):new THREE.Vector3(name==='flip'?1:0,name==='flip'?0:1,0).applyQuaternion(oldQ),q=new THREE.Quaternion().setFromAxisAngle(axis,THREE.MathUtils.degToRad(name==='flip'?180:90)).multiply(oldQ);if(sourceRef){const anchor=worldReference(part,sourceRef).point;part.position=anchor.sub(new THREE.Vector3().fromArray(sourceRef.point).applyQuaternion(q)).toArray();}const e=new THREE.Euler().setFromQuaternion(q);part.rotation=[e.x,e.y,e.z].map(THREE.MathUtils.radToDeg);if(mate)mate.twist=((mate.twist||0)+(name==='flip'?180:90))%360;}
 api.transform(api.objects.get(part.id),part);if(name!=='flip')api.moveOthers(before,part.id);}
 await api.save();api.warnings();api.refreshSelection();}
 function update(){
  const ids=api.selection(),active=api.selected(),available=!api.busy()&&!api.preview();
  const multiple=available&&ids.size>1;
  for(const [id,row] of selectionBoxes){
   if(multiple&&ids.has(id)&&id!==active&&api.objects.get(id)===row.obj)continue;
   api.scene.remove(row.helper);row.helper.geometry.dispose();row.helper.material.dispose();selectionBoxes.delete(id);
  }
  if(multiple)for(const id of ids){
   if(id===active)continue;
   const obj=api.objects.get(id);if(!obj)continue;
   const row=selectionBoxes.get(id);
   if(row)row.helper.update();
   else{const helper=new VisibleBoxHelper(obj,0x429bd5);api.scene.add(helper);selectionBoxes.set(id,{obj,helper});}
  }
  if(bar.dataset.count!==String(ids.size))bar.dataset.count=String(ids.size);
  const obj=api.objects.get(active);
  const hidden=!obj||!available||api.quickActive()||api.connectActive()||!!drag;
  if(bar.hidden!==hidden)bar.hidden=hidden;
  if(hidden){handle.hidden=drag?.kind!=='depth';return;}
  const bounds=cachedVisibleBounds(obj);
  if(bounds.isEmpty()){bar.hidden=true;handle.hidden=true;return;}
  const rect=api.canvas.getBoundingClientRect(),width=bar.offsetWidth,height=bar.offsetHeight;
  const center=bounds.getCenter(screenPoint).project(api.camera),x=(center.x+1)/2*rect.width;
  let top=Infinity,bottom=-Infinity;
  for(const xx of [bounds.min.x,bounds.max.x])for(const yy of [bounds.min.y,bounds.max.y])for(const zz of [bounds.min.z,bounds.max.z]){
   const y=(-screenPoint.set(xx,yy,zz).project(api.camera).y+1)/2*rect.height;
   top=Math.min(top,y);bottom=Math.max(bottom,y);
  }
  const y=top>height+20?top-height-14:bottom+14;
  const link=depthLink(api.project().parts.find(part=>part.id===active));
  bar.style.left=Math.round(Math.max(8,Math.min(rect.width-width-8,x-width/2)))+'px';
  bar.style.top=Math.round(Math.max(8,Math.min(rect.height-48,y)))+'px';
  const hideHandle=!link;if(handle.hidden!==hideHandle)handle.hidden=hideHandle;
  if(link){
   const p=screenPoint.copy(link.point).addScaledVector(link.normal,.012).project(api.camera);
   handle.style.left=Math.round(Math.max(12,Math.min(rect.width-100,(p.x+1)/2*rect.width)))+'px';
   handle.style.top=Math.round(Math.max(12,Math.min(rect.height-45,(-p.y+1)/2*rect.height)))+'px';
   const title=`Insertion ${link.depth.toFixed(1)} mm`;if(handle.title!==title)handle.title=title;
  }
 }
 return {
  previewTransform(ids,context){if(!transformIds){fixedTargets=null;fitCache.clear();}if(!transformIds&&ids.length>1)transformContext=context||assemblyMatingContext(api.project().parts,refs);transformIds=ids;previewMate(api.project().parts.find(part=>part.id===api.selected()),false);},
  finishTransform(){previewMate(api.project().parts.find(part=>part.id===api.selected()),false,true);applyCandidate();clearPreview();transformIds=null;transformContext=null;fixedTargets=null;},
  releasePart:detachTouched,releaseGroup:ids=>releaseAssemblyBoundary(api.project().parts,refs,ids),
  active:()=>!!drag||!!transformIds,flushMove,update,
 };
}
