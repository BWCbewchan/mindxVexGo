import * as THREE from 'three';
import {worldReference,matingPose,nearestMate,SNAP_DISTANCE_MM} from './mating.js?v=drive-joints-6';

const v=a=>new THREE.Vector3().fromArray(a);
const lateralGap=(part,sourceRef,target,targetRef)=>{const a=worldReference(part,sourceRef),b=worldReference(target,targetRef),d=a.point.sub(b.point);return d.addScaledVector(b.normal,-d.dot(b.normal)).length();};
export {compatibleReferences} from './connector-policy.js';
import {compatibleReferences,insertionLimit} from './connector-policy.js';
// An established joint keeps its axis. Sliding is allowed only within its original
// insertion interval; moving sideways can choose another real hole on the same part.
export function constrainJoints(parts,before,references){
 const prior=new Map(before.map(p=>[p.id,p])),changed=new Set(parts.filter(p=>prior.has(p.id)&&JSON.stringify([p.position,p.rotation])!==JSON.stringify([prior.get(p.id).position,prior.get(p.id).rotation])).map(p=>p.id));
 const corrections=[];
 for(const part of parts){
  const mate=part.mate;if(!mate||!changed.has(part.id)&&!changed.has(mate.target))continue;
  const target=parts.find(p=>p.id===mate.target),old=prior.get(part.id),oldTarget=prior.get(mate.target);
  const sourceRef=references[part.sku]?.find(r=>r.id===mate.sourceRef),targetRef=references[target?.sku]?.find(r=>r.id===mate.targetRef);
  if(!old||!oldTarget||!compatibleReferences(sourceRef,targetRef))return {ok:false,reason:'This joint has no compatible mounting reference. Unlink it before repositioning.'};
  const a=worldReference(part,sourceRef),b=worldReference(target,targetRef),delta=a.point.clone().sub(b.point),lateral=delta.clone().addScaledVector(b.normal,-delta.dot(b.normal)).length();
  const oldA=worldReference(old,sourceRef),oldB=worldReference(oldTarget,targetRef),oldDepth=-oldA.point.sub(oldB.point).dot(oldB.normal);
  if(changed.has(target.id)&&!changed.has(part.id)){
   const slots=(references[target.sku]||[]).filter(r=>compatibleReferences(sourceRef,r)&&v(r.normal).dot(v(targetRef.normal))>.99);
   const slot=slots.sort((x,y)=>worldReference(target,x).point.distanceTo(a.point)-worldReference(target,y).point.distanceTo(a.point))[0]||targetRef;
   const current=worldReference(target,slot),depth=Math.max(0,Math.min(insertionLimit(sourceRef,slot,Math.abs(oldDepth)),current.point.clone().sub(a.point).dot(current.normal)));
   Object.assign(target,matingPose(target,slot,part,sourceRef,{depth,flip:mate.flip||false}));part.mate={...mate,targetRef:slot.id,depth};corrections.push(target.id);continue;
  }
  let chosen=targetRef;
  if(lateral>.15&&changed.has(part.id)&&!changed.has(target.id)){
   const holes=(references[target.sku]||[]).filter(r=>compatibleReferences(sourceRef,r)&&v(r.normal).dot(v(targetRef.normal))>.99);
   chosen=holes.sort((x,y)=>worldReference(target,x).point.distanceTo(a.point)-worldReference(target,y).point.distanceTo(a.point))[0]||targetRef;
  }
  const span=insertionLimit(sourceRef,targetRef,Math.abs(oldDepth));
  const depth=Math.max(0,Math.min(span,-a.point.clone().sub(worldReference(target,chosen).point).dot(b.normal)));
  const pose=matingPose(part,sourceRef,target,chosen,{depth,flip:mate.flip||false});
  if(JSON.stringify(pose)!==JSON.stringify({position:part.position,rotation:part.rotation}))corrections.push(part.id);
  Object.assign(part,pose);part.mate={...mate,targetRef:chosen.id,depth};
 }
 // Check all affected edges again: a part with multiple linked pieces must not
 // silently repair one edge by breaking another.
 for(const part of parts){const m=part.mate;if(!m||!changed.has(part.id)&&!changed.has(m.target))continue;
  const target=parts.find(p=>p.id===m.target),s=references[part.sku]?.find(r=>r.id===m.sourceRef),t=references[target?.sku]?.find(r=>r.id===m.targetRef);
  if(!compatibleReferences(s,t))return {ok:false,reason:'Missing compatible joint reference.'};
  const a=worldReference(part,s),b=worldReference(target,t),d=a.point.sub(b.point);
  if(d.clone().addScaledVector(b.normal,-d.dot(b.normal)).length()>.15||Math.abs(a.normal.dot(b.normal))<.999)return {ok:false,reason:'Moving this piece would break another joint. Unlink it first.'};
 }
 // Loose pieces remain movable for staging. Near a connector, release snaps to
 // a detected compatible feature rather than leaving an almost-aligned joint.
 for(const part of parts)if(changed.has(part.id)&&!part.mate&&!parts.some(p=>p.mate?.target===part.id)){
  part.snapBlocked=(Array.isArray(part.snapBlocked)?part.snapBlocked:[]).filter(block=>{
   const target=parts.find(p=>p.id===block.target),sourceRef=references[part.sku]?.find(r=>r.id===block.sourceRef),targetRef=references[target?.sku]?.find(r=>r.id===block.targetRef);
   return target&&sourceRef&&targetRef&&lateralGap(part,sourceRef,target,targetRef)<=SNAP_DISTANCE_MM;
  });
  if(!part.snapBlocked.length)delete part.snapBlocked;
  const next=nearestMate(part,parts,references,{distance:SNAP_DISTANCE_MM,excludedMates:part.snapBlocked||[]});if(next&&compatibleReferences(next.sourceRef,next.targetRef)){
   Object.assign(part,next.pose);part.mate={target:next.target.id,sourceRef:next.sourceRef.id,targetRef:next.targetRef.id,depth:next.depth,twist:0,flip:false};corrections.push(part.id);
   delete part.snapBlocked;
  }
 }
 return {ok:true,corrections};
}
