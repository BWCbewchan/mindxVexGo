import {compatibleReferences,insertionLimit,recommendedInsertionDepth} from './connector-policy.js?v=deep-seat-49';
import * as THREE from './vendor/three.module.js';
const vector=a=>new THREE.Vector3().fromArray(a);
export const SNAP_DISTANCE_MM=8;
// Cylinder extraction includes the shoulder as well as the insertion tip.
// Only the furthest point facing out along each pin axis is an attachable end.
export function attachmentReferences(rows=[]){
 return rows.filter(r=>r.kind==='hole'||r.kind==='pin'&&(r.profile==='iq-balloon-rim'||r.radius<=2.6)&&!rows.some(other=>other!==r&&other.kind==='pin'&&vector(other.normal).dot(vector(r.normal))>.999&&vector(other.point).sub(vector(r.point)).cross(vector(r.normal)).length()<.15&&vector(other.point).sub(vector(r.point)).dot(vector(r.normal))>.15));
}
export function worldReference(part,ref){
 const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
 return {point:vector(ref.point).applyQuaternion(q).add(vector(part.position)),normal:vector(ref.normal).applyQuaternion(q).normalize()};
}
export function insideSnapReleaseZone(part,sourceRef,target,targetRef){
 const a=worldReference(part,sourceRef),b=worldReference(target,targetRef),delta=a.point.sub(b.point),axial=delta.dot(b.normal),lateral=delta.addScaledVector(b.normal,-axial).length();
 return lateral<=SNAP_DISTANCE_MM&&Math.abs(axial)<=insertionLimit(sourceRef,targetRef)+SNAP_DISTANCE_MM;
}
const keyedProfile=ref=>['square-drive','lego-cross'].includes(ref?.profile)&&Array.isArray(ref.key);
// A keyed hub mated through an incidental round face (hub chamfer, bearing
// ring) still sits on the same square/cross bore. Use that coaxial keyed bore
// for the roll so the part cannot be saved at an impossible angle on a shaft.
export function keyedTwin(rows,ref,profile){
 if(!ref||keyedProfile(ref)&&(!profile||ref.profile===profile))return ref;
 const normal=vector(ref.normal),point=vector(ref.point);
 return (rows||[]).find(row=>keyedProfile(row)&&(!profile||row.profile===profile)&&row.kind===ref.kind&&Math.abs(vector(row.normal).dot(normal))>.999&&vector(row.point).sub(point).cross(normal).length()<.25)||null;
}
export function matingPose(source,sourceRef,target,targetRef,{depth=0,twist=0,flip=false,references=null}={}){
 const from=worldReference(source,sourceRef),to=worldReference(target,targetRef);
 const axis=to.normal.clone().multiplyScalar(flip&&!sourceRef.profile&&!targetRef.profile?1:-1);
 const oldQ=new THREE.Quaternion().setFromEuler(new THREE.Euler(...source.rotation.map(THREE.MathUtils.degToRad)));
 const align=new THREE.Quaternion().setFromUnitVectors(from.normal,axis);
 const roll=new THREE.Quaternion().setFromAxisAngle(to.normal,THREE.MathUtils.degToRad(twist));
 const q=roll.multiply(align).multiply(oldQ).normalize();
 let sourceKey=sourceRef,targetKey=targetRef;
 if(references&&!(keyedProfile(sourceRef)&&keyedProfile(targetRef))){
  const profile=keyedProfile(sourceRef)?sourceRef.profile:keyedProfile(targetRef)?targetRef.profile:null;
  if(profile){sourceKey=keyedTwin(references[source.sku],sourceRef,profile);targetKey=keyedTwin(references[target.sku],targetRef,profile);}
 }
 if(keyedProfile(sourceKey)&&keyedProfile(targetKey)&&sourceKey.profile===targetKey.profile){
 const sk=vector(sourceKey.key).applyQuaternion(q),tk=vector(targetKey.key).applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(...target.rotation.map(THREE.MathUtils.degToRad))));
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
// Compute a part's world connector points once per search, including the
// stationary targets shared by every candidate pose in that search.
export function referenceRows(part,refs){
 if(!refs.length)return [];
 const rotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
 const origin=vector(part.position);
 return refs.map(ref=>({ref,point:vector(ref.point).applyQuaternion(rotation).add(origin),normal:vector(ref.normal).applyQuaternion(rotation).normalize()}));
}
function pinIndex(movingId,parts,getRefs,tolerance){
 const cellSize=8,cells=new Map(),unindexed=[];
 const cell=value=>Math.floor(value/cellSize),key=(x,y,z)=>x+','+y+','+z;
 let order=0;
 for(const target of parts){
  if(target.id===movingId)continue;
  const refs=getRefs(target.sku).filter(ref=>ref.kind==='pin'&&!ref.profile);
  for(const row of referenceRows(target,refs)){
   const {ref,point,normal}=row,entry={...row,target,order:order++};
   const depth=ref.maxDepth??ref.depth;
   if(!Number.isFinite(ref.depth)||ref.depth<0||!Number.isFinite(depth)||depth<0){unindexed.push(entry);continue;}
   // Index the whole usable pin, not only its exposed end. The padding
   // covers the existing positional tolerance and small depth margins.
   const start=point.clone().addScaledVector(normal,.15);
   const end=point.clone().addScaledVector(normal,-depth-.15),padding=tolerance+.001;
   const min=start.clone().min(end).addScalar(-padding),max=start.clone().max(end).addScalar(padding);
   const lo=min.toArray().map(cell),hi=max.toArray().map(cell);
   if((hi[0]-lo[0]+1)*(hi[1]-lo[1]+1)*(hi[2]-lo[2]+1)>128){unindexed.push(entry);continue;}
   for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){
    const name=key(x,y,z);
    if(!cells.has(name))cells.set(name,[]);
    cells.get(name).push(entry);
   }
  }
 }
 return point=>[...(cells.get(key(cell(point.x),cell(point.y),cell(point.z)))||[]),...unindexed];
}
function indexedPinMatches(moving,holes,findPins,tolerance){
 const matches=new Map(),delta=new THREE.Vector3();
 for(const hole of referenceRows(moving,holes)){
  for(const pin of findPins(hole.point)){
   if(matches.has(pin.order)||hole.normal.dot(pin.normal)>=-.999)continue;
   delta.copy(hole.point).sub(pin.point);
   const depth=-delta.dot(pin.normal);
   if(depth<-.15||depth>insertionLimit(hole.ref,pin.ref)+.15||delta.addScaledVector(pin.normal,depth).length()>tolerance||!compatibleReferences(hole.ref,pin.ref,moving.sku,pin.target.sku))continue;
   matches.set(pin.order,{target:pin.target.id,sourceRef:hole.ref.id,targetRef:pin.ref.id,depth});
  }
 }
 // Preserve target/pin order and the first fitting hole for each pin.
 return [...matches].sort(([a],[b])=>a-b).map(([,match])=>match);
}
function refsBySku(references){
 const cache=new Map();
 return sku=>{
  if(!cache.has(sku))cache.set(sku,attachmentReferences(references[sku]));
  return cache.get(sku);
 };
}

// Count independently seated pins, not both analytic faces of one hole.
export function seatedPinMatches(moving,parts,references,tolerance=1){
 const getRefs=refsBySku(references),holes=getRefs(moving.sku).filter(ref=>ref.kind==='hole'&&!ref.profile);
 return holes.length?indexedPinMatches(moving,holes,pinIndex(moving.id,parts,getRefs,tolerance),tolerance):[];
}
const radiusCache=new WeakMap();
function refRadius(rows){let r=radiusCache.get(rows);if(r===undefined){r=0;for(const ref of rows)r=Math.max(r,Math.hypot(...ref.point));radiusCache.set(rows,r);}return r;}
export function nearestMate(moving,parts,references,{distance=SNAP_DISTANCE_MM,excluded=[],excludedMates=[],preferred=null}={}){
 const getRefs=refsBySku(references),candidates=getRefs(moving.sku);
 if(!candidates.length)return null;
 const fromRows=referenceRows(moving,candidates),holes=candidates.filter(ref=>ref.kind==='hole'&&!ref.profile);
 const keyed=ref=>ref.profile==='square-drive'||ref.profile==='lego-cross';
 const coaxial=(a,b)=>a&&b&&Math.abs(vector(a.normal).dot(vector(b.normal)))>.99&&vector(a.point).sub(vector(b.point)).cross(vector(b.normal)).length()<.15;
 const seatPoint=new THREE.Vector3();
 let best=null,findPins;
 // Broad phase: connector points lie within a per-SKU radius of the part origin;
 // a mate needs the two spheres within snap distance plus a pin's reach.
 const movingRadius=refRadius(candidates),origin=vector(moving.position),skip=new Set(excluded);
 for(const target of parts){
  if(target.id===moving.id||skip.has(target.id))continue;
  const targets=getRefs(target.sku);
  if(!targets.length||origin.distanceTo(vector(target.position))>movingRadius+refRadius(targets)+distance+35)continue;
  const toRows=referenceRows(target,targets);
  const blockedRefs=excludedMates.filter(block=>block.target===target.id).map(block=>({
   source:references[moving.sku]?.find(ref=>ref.id===block.sourceRef),
   target:references[target.sku]?.find(ref=>ref.id===block.targetRef)
  }));
  const usedTarget=moving.mate?.target===target.id?references[target.sku]?.find(ref=>ref.id===moving.mate.targetRef):null;
  const usedSource=target.mate?.target===moving.id?references[moving.sku]?.find(ref=>ref.id===target.mate.targetRef):null;
  for(const from of fromRows)for(const to of toRows){
   const {ref:sourceRef}=from,{ref:targetRef}=to;
   if(sourceRef.kind===targetRef.kind)continue;
   const maxReach=distance+insertionLimit(sourceRef,targetRef),distanceSquared=from.point.distanceToSquared(to.point);
   if(distanceSquared>maxReach*maxReach||!compatibleReferences(sourceRef,targetRef,moving.sku,target.sku))continue;
   // Keyed hubs use their drive socket rather than an incidental round hole.
   if(keyed(sourceRef)&&!targetRef.profile&&targets.some(ref=>ref.profile===sourceRef.profile&&compatibleReferences(sourceRef,ref,moving.sku,target.sku)))continue;
   if(keyed(targetRef)&&!sourceRef.profile&&candidates.some(ref=>ref.profile===targetRef.profile&&compatibleReferences(ref,targetRef,moving.sku,target.sku)))continue;
   if(blockedRefs.some(block=>coaxial(sourceRef,block.source)&&coaxial(targetRef,block.target))||coaxial(targetRef,usedTarget)||coaxial(sourceRef,usedSource))continue;
   let depth=recommendedInsertionDepth(sourceRef,targetRef,moving.sku,target.sku);
   // Seated poses use a tighter corridor to avoid jumping to a nearby hole.
   let gap=Math.min(Math.sqrt(distanceSquared),from.point.distanceTo(seatPoint.copy(to.point).addScaledVector(to.normal,-depth))/.85);
   const shaft=keyed(sourceRef)&&sourceRef.kind==='pin'?sourceRef:keyed(targetRef)&&targetRef.kind==='pin'?targetRef:null;
   const bore=shaft===sourceRef?targetRef:sourceRef;
   if(shaft&&bore.kind==='hole'&&bore.id!=='motor-output'){
    const axial=-seatPoint.copy(from.point).sub(to.point).dot(to.normal);
    const clamped=Math.max(0,Math.min(insertionLimit(sourceRef,targetRef),axial));
    const segmentGap=from.point.distanceTo(seatPoint.copy(to.point).addScaledVector(to.normal,-clamped));
    if(segmentGap<=gap){gap=segmentGap;depth=clamped;}
   }
   if(gap>distance)continue;
   const score=gap+(1+from.normal.dot(to.normal))*distance*.35;
   const rankScore=score-(preferred?.target?.id===target.id&&preferred.sourceRef?.id===sourceRef.id&&preferred.targetRef?.id===targetRef.id?1.25:0);
   const canSeatPins=sourceRef.kind==='hole'&&!sourceRef.profile;
   if(best&&!canSeatPins&&(best.support>0||rankScore>=best.rankScore))continue;
   const pose=matingPose(moving,sourceRef,target,targetRef,{depth,references});
   const matches=canSeatPins?indexedPinMatches({...moving,...pose},holes,findPins??=pinIndex(moving.id,parts,getRefs,1),1):[];
   const support=matches.length;
   if(best&&(support<best.support||support===best.support&&rankScore>=best.rankScore))continue;
   best={target,sourceRef,targetRef,gap,score,rankScore,depth,pose,support,matches};
  }
 }
 return best;
}

// Degrees by which a keyed hub/shaft pair is turned off its square/cross flats.
export function keyedRollError(part,sourceRef,target,targetRef,references){
 const profile=keyedProfile(sourceRef)?sourceRef.profile:keyedProfile(targetRef)?targetRef.profile:null;
 if(!profile)return 0;
 const a=keyedTwin(references?.[part.sku],sourceRef,profile),b=keyedTwin(references?.[target.sku],targetRef,profile);
 if(!keyedProfile(a)||!keyedProfile(b))return 0;
 const qa=new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad))),qb=new THREE.Quaternion().setFromEuler(new THREE.Euler(...target.rotation.map(THREE.MathUtils.degToRad)));
 const axis=vector(b.normal).applyQuaternion(qb).normalize(),ka=vector(a.key).applyQuaternion(qa),kb=vector(b.key).applyQuaternion(qb);
 ka.addScaledVector(axis,-ka.dot(axis));kb.addScaledVector(axis,-kb.dot(axis));
 if(ka.lengthSq()<1e-8||kb.lengthSq()<1e-8)return 0;
 const angle=THREE.MathUtils.radToDeg(Math.atan2(axis.dot(ka.clone().cross(kb)),ka.dot(kb)));
 const rest=((angle%90)+90)%90;return Math.min(rest,90-rest);
}
export function normalizeMatedJoints(parts,references){
 const byId=new Map(parts.map(part=>[part.id,part]));
 for(const part of parts){
  const mate=part.mate,target=byId.get(mate?.target);
  if(!target)continue;
  const sourceRef=references[part.sku]?.find(ref=>ref.id===mate.sourceRef),targetRef=references[target.sku]?.find(ref=>ref.id===mate.targetRef);
  if(!compatibleReferences(sourceRef,targetRef,part.sku,target.sku))continue;
  const limit=insertionLimit(sourceRef,targetRef),requested=Number.isFinite(mate.depth)?mate.depth:limit,depth=Math.max(0,Math.min(limit,requested));
  if(Math.abs(depth-requested)<1e-6){
   const a=worldReference(part,sourceRef),b=worldReference(target,targetRef),offset=a.point.sub(b.point).addScaledVector(b.normal,depth);
   // A saved mate is not evidence of attachment when its actual pose disagrees.
   // Preserve the authored placement and release stale metadata rather than teleporting it.
   if(offset.length()>.2||Math.abs(a.normal.dot(b.normal))<.999)delete part.mate;
   else if(keyedRollError(part,sourceRef,target,targetRef,references)>1){
    // A square hub cannot turn on a square shaft. Older files (free angle
    // input) saved such hubs off the flats; snap only the roll about the axis.
    Object.assign(part,matingPose(part,sourceRef,target,targetRef,{depth,twist:mate.twist||0,flip:!!mate.flip,references}));
    part.mate={...mate,twist:Math.round((mate.twist||0)/90)*90%360};
   }
   continue;
  }
  Object.assign(part,matingPose(part,sourceRef,target,targetRef,{depth,twist:mate.twist||0,flip:!!mate.flip,references}));
  part.mate={...mate,depth};
 }
 return parts;
}
