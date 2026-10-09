import {compatibleReferences,insertionLimit} from './connector-policy.js';
import * as THREE from 'three';
const vector=a=>new THREE.Vector3().fromArray(a);
export const SNAP_DISTANCE_MM=8;
export function worldReference(part,ref){
 const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
 return {point:vector(ref.point).applyQuaternion(q).add(vector(part.position)),normal:vector(ref.normal).applyQuaternion(q).normalize()};
}
export function matingPose(source,sourceRef,target,targetRef,{depth=0,twist=0,flip=false}={}){
 const from=worldReference(source,sourceRef),to=worldReference(target,targetRef);
 const axis=to.normal.clone().multiplyScalar(flip&&!sourceRef.profile&&!targetRef.profile?1:-1);
 const oldQ=new THREE.Quaternion().setFromEuler(new THREE.Euler(...source.rotation.map(THREE.MathUtils.degToRad)));
 const align=new THREE.Quaternion().setFromUnitVectors(from.normal,axis);
 const roll=new THREE.Quaternion().setFromAxisAngle(to.normal,THREE.MathUtils.degToRad(twist));
 const q=roll.multiply(align).multiply(oldQ).normalize();
 if(sourceRef.profile&&targetRef.profile){
 const sk=vector(sourceRef.key).applyQuaternion(q),tk=vector(targetRef.key).applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(...target.rotation.map(THREE.MathUtils.degToRad))));
 const angle=Math.atan2(axis.dot(sk.clone().cross(tk)),sk.dot(tk));
 q.premultiply(new THREE.Quaternion().setFromAxisAngle(axis,angle+THREE.MathUtils.degToRad(Math.round(twist/90)*90)));
 depth=Math.max(0,Math.min(insertionLimit(sourceRef,targetRef),depth));
 }
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
 const candidates=(references[moving.sku]||[]).filter(r=>r.kind==='hole'||r.radius<=2.6);
 let best=null;
 for(const target of parts){if(target.id===moving.id||excluded.includes(target.id))continue;
 for(const sourceRef of candidates){
  if(sourceRef.kind==='pin'&&candidates.some(r=>r.kind==='pin'&&vector(r.normal).dot(vector(sourceRef.normal))>.999&&vector(r.point).sub(vector(sourceRef.point)).cross(vector(sourceRef.normal)).length()<.15&&vector(r.point).sub(vector(sourceRef.point)).dot(vector(sourceRef.normal))>.15))continue;
  const from=worldReference(moving,sourceRef);
  for(const targetRef of references[target.sku]||[]){if(!compatibleReferences(sourceRef,targetRef))continue;
   const coaxial=(a,b)=>a&&b&&Math.abs(vector(a.normal).dot(vector(b.normal)))>.99&&vector(a.point).sub(vector(b.point)).cross(vector(b.normal)).length()<.15;
   if(excludedMates.some(block=>block.target===target.id&&coaxial(sourceRef,(references[moving.sku]||[]).find(r=>r.id===block.sourceRef))&&coaxial(targetRef,(references[target.sku]||[]).find(r=>r.id===block.targetRef))))continue;
   if(moving.mate?.target===target.id&&coaxial(targetRef,(references[target.sku]||[]).find(r=>r.id===moving.mate.targetRef)))continue;
   if(target.mate?.target===moving.id&&coaxial(sourceRef,(references[moving.sku]||[]).find(r=>r.id===target.mate.targetRef)))continue;
   const to=worldReference(target,targetRef),gap=from.point.distanceTo(to.point);if(gap>distance||best&&gap>=best.gap)continue;
   const depth=sourceRef.kind==='hole'?sourceRef.depth:targetRef.depth;
   best={target,sourceRef,targetRef,gap,depth,pose:matingPose(moving,sourceRef,target,targetRef,{depth})};
  }
 }}return best;
}
