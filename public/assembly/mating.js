import {compatibleReferences,insertionLimit,recommendedInsertionDepth} from './connector-policy.js?v=compatibility-27';
import * as THREE from 'three';
const vector=a=>new THREE.Vector3().fromArray(a);
export const SNAP_DISTANCE_MM=8;
// Cylinder extraction includes the shoulder as well as the insertion tip.
// Only the furthest point facing out along each pin axis is an attachable end.
export function attachmentReferences(rows=[]){
 return rows.filter(r=>r.kind==='hole'||r.kind==='pin'&&r.radius<=2.6&&!rows.some(other=>other!==r&&other.kind==='pin'&&vector(other.normal).dot(vector(r.normal))>.999&&vector(other.point).sub(vector(r.point)).cross(vector(r.normal)).length()<.15&&vector(other.point).sub(vector(r.point)).dot(vector(r.normal))>.15));
}
export function worldReference(part,ref){
 const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
 return {point:vector(ref.point).applyQuaternion(q).add(vector(part.position)),normal:vector(ref.normal).applyQuaternion(q).normalize()};
}
export function insideSnapReleaseZone(part,sourceRef,target,targetRef){
 const a=worldReference(part,sourceRef),b=worldReference(target,targetRef),delta=a.point.sub(b.point),axial=delta.dot(b.normal),lateral=delta.addScaledVector(b.normal,-axial).length();
 return lateral<=SNAP_DISTANCE_MM&&Math.abs(axial)<=insertionLimit(sourceRef,targetRef)+SNAP_DISTANCE_MM;
}
export function matingPose(source,sourceRef,target,targetRef,{depth=0,twist=0,flip=false}={}){
 const from=worldReference(source,sourceRef),to=worldReference(target,targetRef);
 const axis=to.normal.clone().multiplyScalar(flip&&!sourceRef.profile&&!targetRef.profile?1:-1);
 const oldQ=new THREE.Quaternion().setFromEuler(new THREE.Euler(...source.rotation.map(THREE.MathUtils.degToRad)));
 const align=new THREE.Quaternion().setFromUnitVectors(from.normal,axis);
 const roll=new THREE.Quaternion().setFromAxisAngle(to.normal,THREE.MathUtils.degToRad(twist));
 const q=roll.multiply(align).multiply(oldQ).normalize();
 if(sourceRef.profile==='square-drive'&&targetRef.profile==='square-drive'){
 const sk=vector(sourceRef.key).applyQuaternion(q),tk=vector(targetRef.key).applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(...target.rotation.map(THREE.MathUtils.degToRad))));
 const angle=Math.atan2(axis.dot(sk.clone().cross(tk)),sk.dot(tk));
 q.premultiply(new THREE.Quaternion().setFromAxisAngle(axis,angle+THREE.MathUtils.degToRad(Math.round(twist/90)*90)));
 }
 if(compatibleReferences(sourceRef,targetRef,source.sku,target.sku))depth=Math.max(0,Math.min(insertionLimit(sourceRef,targetRef),Number.isFinite(depth)?depth:0));
 const position=to.point.clone().addScaledVector(to.normal,-depth).sub(vector(sourceRef.point).applyQuaternion(q));
 const euler=new THREE.Euler().setFromQuaternion(q,'XYZ');
 return {position:position.toArray(),rotation:[euler.x,euler.y,euler.z].map(THREE.MathUtils.radToDeg)};
}
export function linkedPoses(parts,id,newPose,selection=[]){
 const old=parts.find(p=>p.id===id);if(!old)return new Map();
 const links=new Map(parts.map(p=>[p.id,new Set()]));
 for(const p of parts)if(links.has(p.mate?.target)&&p.mate.target!==p.id){links.get(p.id).add(p.mate.target);links.get(p.mate.target).add(p.id);}
 for(const other of selection)if(other!==id&&links.has(other)){links.get(id).add(other);links.get(other).add(id);}
 const group=new Set([id]),queue=[id];while(queue.length){for(const next of links.get(queue.shift()))if(!group.has(next)){group.add(next);queue.push(next);}}
 const q=p=>new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(THREE.MathUtils.degToRad)));
 const delta=q(newPose).multiply(q(old).invert()),result=new Map();
 for(const part of parts)if(group.has(part.id)&&part.id!==id){const position=vector(part.position).sub(vector(old.position)).applyQuaternion(delta).add(vector(newPose.position));const rotation=new THREE.Euler().setFromQuaternion(delta.clone().multiply(q(part)),'XYZ');result.set(part.id,{position:position.toArray(),rotation:[rotation.x,rotation.y,rotation.z].map(THREE.MathUtils.radToDeg)});}
 return result;
}
export function nearestMate(moving,parts,references,{distance=SNAP_DISTANCE_MM,excluded=[],excludedMates=[]}={}){
 const candidates=attachmentReferences(references[moving.sku]);
 let best=null;
 for(const target of parts){if(target.id===moving.id||excluded.includes(target.id))continue;
 for(const sourceRef of candidates){
  const from=worldReference(moving,sourceRef);
  const targets=attachmentReferences(references[target.sku]);
  for(const targetRef of targets){if(!compatibleReferences(sourceRef,targetRef,moving.sku,target.sku))continue;
   // A keyed hub must use its drive socket, rather than an incidental round hole.
   if(sourceRef.profile==='square-drive'&&!targetRef.profile&&targets.some(r=>r.profile==='square-drive'&&compatibleReferences(sourceRef,r,moving.sku,target.sku)))continue;
   if(targetRef.profile==='square-drive'&&!sourceRef.profile&&candidates.some(r=>r.profile==='square-drive'&&compatibleReferences(r,targetRef,moving.sku,target.sku)))continue;
   const coaxial=(a,b)=>a&&b&&Math.abs(vector(a.normal).dot(vector(b.normal)))>.99&&vector(a.point).sub(vector(b.point)).cross(vector(b.normal)).length()<.15;
   if(excludedMates.some(block=>block.target===target.id&&coaxial(sourceRef,(references[moving.sku]||[]).find(r=>r.id===block.sourceRef))&&coaxial(targetRef,(references[target.sku]||[]).find(r=>r.id===block.targetRef))))continue;
   if(moving.mate?.target===target.id&&coaxial(targetRef,(references[target.sku]||[]).find(r=>r.id===moving.mate.targetRef)))continue;
   if(target.mate?.target===moving.id&&coaxial(sourceRef,(references[moving.sku]||[]).find(r=>r.id===target.mate.targetRef)))continue;
   let depth=recommendedInsertionDepth(sourceRef,targetRef);
   const to=worldReference(target,targetRef),endGap=from.point.distanceTo(to.point),seatedGap=from.point.distanceTo(to.point.clone().addScaledVector(to.normal,-depth)),// Seated poses use a tighter corridor to avoid pulling a released piece into a neighbouring hole.
    initialGap=Math.min(endGap,seatedGap/.85);
   let gap=initialGap;
   const shaft=sourceRef.profile==='square-drive'&&sourceRef.kind==='pin'?sourceRef:targetRef.profile==='square-drive'&&targetRef.kind==='pin'?targetRef:null;
   const bore=shaft===sourceRef?targetRef:sourceRef;
   if(shaft&&bore.kind==='hole'&&bore.id!=='motor-output'){
    // Acquire the whole shaft segment, not only its tip. Preserve the user's
    // axial placement when a bore is brought alongside an exposed shaft.
    const offset=from.point.clone().sub(to.point),limit=insertionLimit(sourceRef,targetRef);
    const axial=-offset.dot(to.normal),clamped=Math.max(0,Math.min(limit,axial));
    const segmentGap=from.point.distanceTo(to.point.clone().addScaledVector(to.normal,-clamped));
    if(segmentGap<=gap){gap=segmentGap;depth=clamped;}
   }
   if(gap>distance)continue;
   const alignment=from.normal.dot(to.normal),score=gap+(1+alignment)*distance*.35;
   if(best&&score>=best.score)continue;
   best={target,sourceRef,targetRef,gap,score,depth,pose:matingPose(moving,sourceRef,target,targetRef,{depth})};
  }
 }}return best;
}

export function normalizeMatedJoints(parts,references){
 const byId=new Map(parts.map(part=>[part.id,part]));
 for(const part of parts){
  const mate=part.mate,target=byId.get(mate?.target);
  if(!target)continue;
  const sourceRef=references[part.sku]?.find(ref=>ref.id===mate.sourceRef),targetRef=references[target.sku]?.find(ref=>ref.id===mate.targetRef);
  if(!compatibleReferences(sourceRef,targetRef,part.sku,target.sku))continue;
  const limit=insertionLimit(sourceRef,targetRef),requested=Number.isFinite(mate.depth)?mate.depth:limit,depth=Math.max(0,Math.min(limit,requested));
  if(Math.abs(depth-requested)<1e-6)continue;
  Object.assign(part,matingPose(part,sourceRef,target,targetRef,{depth,twist:mate.twist||0,flip:!!mate.flip}));
  part.mate={...mate,depth};
 }
 return parts;
}
