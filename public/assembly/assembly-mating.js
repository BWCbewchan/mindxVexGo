import {chainDriveContacts} from './chain-route.js';
import * as THREE from 'three';
import {attachmentReferences,referenceRows,matingPose,insideSnapReleaseZone} from './mating.js';
import {compatibleReferences,insertionLimit,recommendedInsertionDepth} from './connector-policy.js';
import {seatedConnections,jointMetrics} from './assembly-review.js';
import {connectorNeighborhood} from './connector-neighborhood.js';

const clone=value=>structuredClone(value),cache=new WeakMap();
const quaternion=part=>new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
export function worldRows(parts,references){
 const rows=[],bySku=new Map();
 for(const part of parts){
  if(!bySku.has(part.sku))bySku.set(part.sku,attachmentReferences(references[part.sku]));
  for(const row of referenceRows(part,bySku.get(part.sku)))rows.push({part,...row});
 }
 return rows;
}
function edgeKey(edge){return [edge.part,edge.sourceRef,edge.target,edge.targetRef].join('|');}
// Capture at gesture start: topology stays unchanged while a component moves rigidly.
export function assemblyMatingContext(parts,references){
 const stamp=JSON.stringify(parts.map(p=>[p.id,p.sku,p.position,p.rotation,p.mate])),previous=cache.get(parts);if(previous?.stamp===stamp&&previous.references===references)return previous;
 const byId=new Map(parts.map(p=>[p.id,p])),edges=[],keys=new Set(),links=new Map(parts.map(p=>[p.id,[]]));
 const add=edge=>{const key=edgeKey(edge);if(keys.has(key)||keys.has(edgeKey({part:edge.target,target:edge.part,sourceRef:edge.targetRef,targetRef:edge.sourceRef})))return;keys.add(key);edges.push(edge);links.get(edge.part)?.push(edge);links.get(edge.target)?.push(edge);};
 for(const p of parts){const m=p.mate,target=byId.get(m?.target),a=references[p.sku]?.find(r=>r.id===m?.sourceRef),b=references[target?.sku]?.find(r=>r.id===m?.targetRef);if(m&&target&&jointMetrics(p,target,a,b).valid)add({part:p.id,target:target.id,sourceRef:a.id,targetRef:b.id,depth:m.depth,saved:clone(m)});}
 const contacts=seatedConnections(parts,references);for(const c of contacts)add({...c});for(const c of chainDriveContacts(parts))add(c);
 // Preserve every acyclic authored edge before using geometric contacts to bridge
 // metadata fragments. A breadth-first walk of all contacts can discard good mates.
 const parent=new Map(parts.map(p=>[p.id,p.id])),treeLinks=new Map(parts.map(p=>[p.id,[]]));const find=id=>{let next=id;while(parent.get(next)!==next)next=parent.get(next);return next;};for(const edge of edges){const a=find(edge.part),b=find(edge.target);if(a===b)continue;parent.set(a,b);treeLinks.get(edge.part).push(edge);treeLinks.get(edge.target).push(edge);}
 const result={stamp,references,byId,links,treeLinks,edges,contacts};cache.set(parts,result);return result;
}
export function movingAssemblyIds(parts,references,id,selection=[],context=assemblyMatingContext(parts,references)){
 if(!context.byId.has(id))return [];const included=new Set([id,...selection.filter(next=>context.byId.has(next))]),queue=[...included];for(const current of queue)for(const edge of context.links.get(current)||[]){const other=edge.part===current?edge.target:edge.part;if(!included.has(other)){included.add(other);queue.push(other);}}return parts.filter(p=>included.has(p.id)).map(p=>p.id);
}
// A hole already filled by a connector cannot accept a second connector. A long
// shaft tip remains available when it projects through the receiving member.
export function occupiedAssemblyReferences(context,references=context.references){
 if(context.occupiedReferences&&context.references===references)return context.occupiedReferences;const result=new Set();
 for(const contact of context.contacts){const holePart=context.byId.get(contact.part),pinPart=context.byId.get(contact.target),hole=references[holePart?.sku]?.find(r=>r.id===contact.sourceRef),pin=references[pinPart?.sku]?.find(r=>r.id===contact.targetRef);if(!hole||!pin)continue;result.add(holePart.id+'|'+hole.id);
  const normal=new THREE.Vector3(...hole.normal),point=new THREE.Vector3(...hole.point);for(const other of references[holePart.sku]||[]){if(other.kind!=='hole'||other.profile!==hole.profile||Math.abs((other.radius||0)-(hole.radius||0))>.25||Math.abs(normal.dot(new THREE.Vector3(...other.normal)))<.999)continue;const delta=new THREE.Vector3(...other.point).sub(point),axial=delta.dot(normal);if(delta.addScaledVector(normal,-axial).length()<=.15&&Math.abs(axial)<=(hole.depth||0)+(other.depth||0)+.25)result.add(holePart.id+'|'+other.id);}
  if(!pin.profile&&contact.depth<=(hole.depth||0)+.15)result.add(pinPart.id+'|'+pin.id);
 }if(context.references===references)context.occupiedReferences=result;return result;
}
function transformedParts(parts,source,pose,moving){const delta=quaternion(pose).multiply(quaternion(source).invert()),origin=new THREE.Vector3(...source.position),destination=new THREE.Vector3(...pose.position);return {delta,origin,destination,parts:parts.map(p=>{const out=clone(p);if(!moving.has(p.id))return out;if(p.id===source.id){Object.assign(out,pose);return out;}out.position=new THREE.Vector3(...p.position).sub(origin).applyQuaternion(delta).add(destination).toArray();const r=new THREE.Euler().setFromQuaternion(delta.clone().multiply(quaternion(p)),'XYZ');out.rotation=[r.x,r.y,r.z].map(THREE.MathUtils.radToDeg);return out;})};}
function crossContacts(rows,moving){
 const holes=rows.filter(r=>r.ref.kind==='hole'),pins=rows.filter(r=>r.ref.kind==='pin'),found=[],cell=6,index=new Map(),key=(x,y,z)=>(x*73856093)^(y*19349663)^(z*83492791);
 for(const hole of holes){const p=hole.point,k=key(Math.floor(p.x/cell),Math.floor(p.y/cell),Math.floor(p.z/cell));if(!index.has(k))index.set(k,[]);index.get(k).push(hole);}
 for(const b of pins){const length=b.ref.maxDepth??b.ref.depth;let candidates;
  if(!Number.isFinite(length)||length<0)candidates=holes;
  else{const seen=new Set(),count=Math.ceil(length/(cell/2));for(let i=0;i<=count;i++){const depth=Math.min(length,i*cell/2),x=Math.floor((b.point.x-b.normal.x*depth)/cell),y=Math.floor((b.point.y-b.normal.y*depth)/cell),z=Math.floor((b.point.z-b.normal.z*depth)/cell);for(let xx=x-1;xx<=x+1;xx++)for(let yy=y-1;yy<=y+1;yy++)for(let zz=z-1;zz<=z+1;zz++)for(const a of index.get(key(xx,yy,zz))||[])seen.add(a);}candidates=seen;}
  for(const a of candidates){if(moving.has(a.part.id)===moving.has(b.part.id)||a.normal.dot(b.normal)>-.999||!compatibleReferences(a.ref,b.ref,a.part.sku,b.part.sku))continue;const dx=a.point.x-b.point.x,dy=a.point.y-b.point.y,dz=a.point.z-b.point.z,n=b.normal,depth=-(dx*n.x+dy*n.y+dz*n.z),x=dx+n.x*depth,y=dy+n.y*depth,z=dz+n.z*depth,gap2=x*x+y*y+z*z;if(gap2>.25*.25||depth<.1||depth>insertionLimit(a.ref,b.ref)+.15)continue;found.push({part:a.part.id,target:b.part.id,sourceRef:a.ref.id,targetRef:b.ref.id,depth,gap:Math.sqrt(gap2),profile:b.ref.profile||'round'});}
 }return found;
}
function transformedRows(rows,source,pose,moving){const delta=quaternion(pose).multiply(quaternion(source).invert()),origin=new THREE.Vector3(...source.position),destination=new THREE.Vector3(...pose.position);return rows.map(row=>moving.has(row.part.id)?{...row,point:row.point.clone().sub(origin).applyQuaternion(delta).add(destination),normal:row.normal.clone().applyQuaternion(delta)}:row);}
function reroot(parts,references,ids,root,context){
 const byId=new Map(parts.map(p=>[p.id,p])),visited=new Set();
 for(const start of [root,...ids]){if(visited.has(start))continue;const queue=[start];visited.add(start);const anchor=byId.get(start);if(anchor.mate&&ids.has(anchor.mate.target))delete anchor.mate;
  for(const current of queue)for(const edge of context.treeLinks.get(current)||[]){const next=edge.part===current?edge.target:edge.part;if(!ids.has(next)||visited.has(next))continue;const child=byId.get(next),parent=byId.get(current),forward=edge.part===next,aId=forward?edge.sourceRef:edge.targetRef,bId=forward?edge.targetRef:edge.sourceRef,a=references[child.sku]?.find(r=>r.id===aId),b=references[parent.sku]?.find(r=>r.id===bId),metrics=jointMetrics(child,parent,a,b);if(!metrics.valid)continue;child.mate=forward&&edge.saved?{...clone(edge.saved)}:{target:current,sourceRef:aId,targetRef:bId,depth:Math.max(0,metrics.depth),twist:0,flip:false};visited.add(next);queue.push(next);}
 }
}
export function previewAssemblyConnection(parts,references,{sourceId,targetId,sourceRef,targetRef,depth,twist=0,flip=false,movingIds,context=assemblyMatingContext(parts,references),world}={}){
 const source=parts.find(p=>p.id===sourceId),target=parts.find(p=>p.id===targetId);if(!source||!target)throw Error('Không tìm thấy chi tiết cần nối.');const a=typeof sourceRef==='string'?references[source.sku]?.find(r=>r.id===sourceRef):sourceRef,b=typeof targetRef==='string'?references[target.sku]?.find(r=>r.id===targetRef):targetRef;if(!compatibleReferences(a,b,source.sku,target.sku))throw Error('Hai điểm nối không tương thích.');
 const moving=new Set(movingIds||movingAssemblyIds(parts,references,sourceId,[],context));moving.add(sourceId);if(moving.has(targetId))throw Error('Điểm đích nằm trong cùng cụm đang di chuyển.');const chosen=depth??recommendedInsertionDepth(a,b,source.sku,target.sku);if(!Number.isFinite(chosen)||chosen<0||chosen>insertionLimit(a,b)+1e-6||!Number.isFinite(twist))throw Error('Độ sâu hoặc góc nối không hợp lệ.');
 const pose=matingPose(source,a,target,b,{depth:chosen,twist,flip,references}),transformed=transformedParts(parts,source,pose,moving),result=transformed.parts;reroot(result,references,moving,sourceId,context);const moved=result.find(p=>p.id===sourceId);moved.mate={target:targetId,sourceRef:a.id,targetRef:b.id,depth:chosen,twist,flip};delete moved.snapBlocked;
 const rows=transformedRows(world??worldRows(parts,references),source,pose,moving),contacts=crossContacts(rows,moving);return {parts:result,movingIds:[...moving],source:moved,target:result.find(p=>p.id===targetId),sourceRef:a,targetRef:b,depth:chosen,pose,support:contacts.length,contacts};
}
function samePort(a,b){
 if(!b)return false;
 const normal=new THREE.Vector3(...a.normal),delta=new THREE.Vector3(...a.point).sub(new THREE.Vector3(...b.point)),axial=delta.dot(normal);
 return Math.abs(normal.dot(new THREE.Vector3(...b.normal)))>.999&&delta.addScaledVector(normal,-axial).length()<.25&&Math.abs(axial)<=(a.depth||0)+(b.depth||0)+.25;
}
function blockedPort(part,other,sourceRef,targetRef,references){
 return (part.snapBlocked||[]).some(block=>{
  if(block.target!==other.id)return false;
  const a=references[part.sku]?.find(ref=>ref.id===block.sourceRef),b=references[other.sku]?.find(ref=>ref.id===block.targetRef);
  return samePort(sourceRef,a)&&samePort(targetRef,b)&&insideSnapReleaseZone(part,a,other,b);
 });
}
function sameSideOccupancy(context,moving,references){
 const key=JSON.stringify([...moving].sort());
 if(context.references===references&&context.dragOccupancy?.key===key)return context.dragOccupancy.occupied;
 const contacts=context.contacts.filter(contact=>moving.has(contact.part)===moving.has(contact.target));
 const occupied=occupiedAssemblyReferences({...context,occupiedReferences:null,contacts},references);
 if(context.references===references)context.dragOccupancy={key,occupied};
 return occupied;
}
export function nearestAssemblyMate(parts,references,movingIds,{distance=8,excludedMates=[],context,preferred=null}={}){
 context||=assemblyMatingContext(parts,references);
 const moving=new Set(movingIds),byId=new Map(parts.map(part=>[part.id,part]));
 for(const part of parts){
  if(!part.snapBlocked?.length)continue;
  part.snapBlocked=part.snapBlocked.filter(block=>{
   const target=byId.get(block.target),a=references[part.sku]?.find(ref=>ref.id===block.sourceRef),b=references[target?.sku]?.find(ref=>ref.id===block.targetRef);
   return target&&a&&b&&insideSnapReleaseZone(part,a,target,b);
  });
  if(!part.snapBlocked.length)delete part.snapBlocked;
 }
 const occupied=sameSideOccupancy(context,moving,references);
 const stationary=parts.filter(part=>!moving.has(part.id));
 const staticStamp=JSON.stringify(stationary.map(p=>[p.id,p.sku,p.position,p.rotation]));
 const movingKey=JSON.stringify([...moving].sort());
 let search=context.dragSearch;
 if(!search||search.references!==references||search.staticStamp!==staticStamp||search.movingKey!==movingKey){
  const rows=worldRows(stationary,references),free=rows.filter(row=>!occupied.has(row.part.id+'|'+row.ref.id));
  search={references,staticStamp,movingKey,rows,index:{hole:connectorNeighborhood(free.filter(row=>row.ref.kind==='hole')),pin:connectorNeighborhood(free.filter(row=>row.ref.kind==='pin'))}};
  context.dragSearch=search;
 }
 const movingRows=worldRows(parts.filter(part=>moving.has(part.id)),references),world=[...movingRows,...search.rows];
 const from=[],keyed=new Map(),candidates=[];
 for(const row of world){
  const {part,ref}=row;
  if(ref.profile==='square-drive'||ref.profile==='lego-cross'){
   if(!keyed.has(part.id))keyed.set(part.id,new Set());
   keyed.get(part.id).add(ref.profile);
  }
  if(occupied.has(part.id+'|'+ref.id))continue;
  if(moving.has(part.id))from.push(row);
 }
 const seat=new THREE.Vector3();
 for(const a of from)for(const b of search.index[a.ref.kind==='pin'?'hole':'pin'].near(a.point,distance+(a.ref.kind==='pin'?(a.ref.maxDepth??a.ref.depth??Infinity):search.index.pin.maxPinSpan))){
  const pin=a.ref.kind==='pin'?a.ref:b.ref,span=pin.maxDepth??pin.depth??Math.max(a.ref.depth||0,b.ref.depth||0),reach=distance+span;
  const distanceSquared=a.point.distanceToSquared(b.point);
  if(distanceSquared>reach*reach||!compatibleReferences(a.ref,b.ref,a.part.sku,b.part.sku))continue;
  if(blockedPort(a.part,b.part,a.ref,b.ref,references)||blockedPort(b.part,a.part,b.ref,a.ref,references))continue;
  if(excludedMates.some(block=>(!block.source||block.source===a.part.id)&&block.target===b.part.id&&block.sourceRef===a.ref.id&&block.targetRef===b.ref.id))continue;
  if(a.ref.profile&&!b.ref.profile&&keyed.get(b.part.id)?.has(a.ref.profile)||b.ref.profile&&!a.ref.profile&&keyed.get(a.part.id)?.has(b.ref.profile))continue;
  const depth=recommendedInsertionDepth(a.ref,b.ref,a.part.sku,b.part.sku);
  let gap=Math.min(Math.sqrt(distanceSquared),a.point.distanceTo(seat.copy(b.point).addScaledVector(b.normal,-depth))/.85),chosen=depth;
  const shaft=(pin.profile==='square-drive'||pin.profile==='lego-cross')?pin:null;
  if(shaft){
   const bore=shaft===a.ref?b.ref:a.ref;
   if(bore.id!=='motor-output'){
    const axial=-seat.copy(a.point).sub(b.point).dot(b.normal),clamped=Math.max(0,Math.min(insertionLimit(a.ref,b.ref),axial));
    const segment=a.point.distanceTo(seat.copy(b.point).addScaledVector(b.normal,-clamped));
    if(segment<=gap){gap=segment;chosen=clamped;}
   }
  }
  if(gap>distance)continue;
  const score=gap+(1+a.normal.dot(b.normal))*distance*.35;
  const rankScore=score-(preferred?.source?.id===a.part.id&&preferred.target?.id===b.part.id&&preferred.sourceRef?.id===a.ref.id&&preferred.targetRef?.id===b.ref.id?1.25:0);
  candidates.push({sourceId:a.part.id,targetId:b.part.id,sourceRef:a.ref,targetRef:b.ref,depth:chosen,gap,score,rankScore});
 }
 candidates.sort((a,b)=>a.rankScore-b.rankScore);
 let best=null;
 const supportCache=new Map();
 for(const candidate of candidates.slice(0,12)){
  const source=byId.get(candidate.sourceId),target=byId.get(candidate.targetId);
  const pose=matingPose(source,candidate.sourceRef,target,candidate.targetRef,{depth:candidate.depth,references});
  const delta=quaternion(pose).multiply(quaternion(source).invert()),translation=new THREE.Vector3(...pose.position).sub(new THREE.Vector3(...source.position).applyQuaternion(delta)),sign=delta.w<0?-1:1;
  const key=[...delta.toArray().map(v=>Math.round(v*sign*1e6)),...translation.toArray().map(v=>Math.round(v*1e4))].join('|');
  let support=supportCache.get(key);
  if(support===undefined){support=crossContacts(transformedRows(world,source,pose,moving),moving).length;supportCache.set(key,support);}
  if(!best||support>best.support||support===best.support&&candidate.rankScore<best.rankScore)best={...candidate,support};
 }
 if(!best)return null;
 const result=previewAssemblyConnection(parts,references,{...best,movingIds,context,world});
 return {...result,gap:best.gap,score:best.score};
}

// Moving a selected group releases only its boundary; internal mates stay intact.
export function releaseAssemblyBoundary(parts,references,ids){
 const moving=new Set(ids),context=assemblyMatingContext(parts,references),attached=parts.some(p=>p.mate&&moving.has(p.id)!==moving.has(p.mate.target));
 for(const part of parts){part.snapBlocked=(part.snapBlocked||[]).filter(b=>moving.has(part.id)===moving.has(b.target));if(!part.snapBlocked.length)delete part.snapBlocked;}
 const block=(part,target,sourceRef,targetRef)=>{part.snapBlocked||=[];if(!part.snapBlocked.some(b=>b.target===target&&b.sourceRef===sourceRef&&b.targetRef===targetRef))part.snapBlocked.push({target,sourceRef,targetRef});};
 for(const edge of context.edges)if(attached&&moving.has(edge.part)!==moving.has(edge.target)){block(context.byId.get(edge.part),edge.target,edge.sourceRef,edge.targetRef);block(context.byId.get(edge.target),edge.part,edge.targetRef,edge.sourceRef);}
 for(const part of parts)if(part.mate&&moving.has(part.id)!==moving.has(part.mate.target))delete part.mate;
}
