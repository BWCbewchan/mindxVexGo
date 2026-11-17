import * as THREE from 'three';
import {nearestMate,worldReference} from './mating.js?v=fit-tolerance-36';
import {compatibleReferences,insertionLimit} from './connector-policy.js';
import {seatedConnections,jointMetrics} from './assembly-review.js';

// Background recovery records joints already seated in CAD. It never searches
// for a new pose, moves a component, or needs a blocking full-model fit audit.
export function recoverSeatedAssemblyLinks(input,references,{isLocked=()=>false}={}){
 const parts=structuredClone(input),byId=new Map(parts.map(p=>[p.id,p])),parent=new Map(parts.map(p=>[p.id,p.id])),links=new Map(parts.map(p=>[p.id,[]]));
 const root=id=>{while(parent.get(id)!==id)id=parent.get(id);return id;};
 const union=(a,b)=>parent.set(root(a),root(b));
 const edge=(a,b)=>{links.get(a).push(b);links.get(b).push(a);};
 let recovered=0,removed=0;
 for(const p of parts){
  const m=p.mate;if(!m)continue;
  const target=byId.get(m.target),a=references[p.sku]?.find(r=>r.id===m.sourceRef),b=references[target?.sku]?.find(r=>r.id===m.targetRef);
  if(!target||!a||!b||root(p.id)===root(target.id)||!jointMetrics(p,target,a,b).valid){if(!isLocked(p)){delete p.mate;removed++;}continue;}
  union(p.id,target.id);edge(p.id,target.id);
 }
 const reroot=id=>{
  const records=new Map(parts.filter(p=>p.mate).map(p=>[p.id,{...p.mate}])),seen=new Set([id]),queue=[id];delete byId.get(id).mate;
  for(const current of queue)for(const next of links.get(current)){
   if(seen.has(next))continue;seen.add(next);queue.push(next);
   const own=records.get(next),other=records.get(current);
   byId.get(next).mate=own?.target===current?own:{...other,target:current,sourceRef:other.targetRef,targetRef:other.sourceRef,twist:-(other.twist||0)};
  }
 };
 for(const contact of seatedConnections(parts,references)){
  const a=root(contact.part),b=root(contact.target);if(a===b)continue;
  if(parts.some(p=>(root(p.id)===a||root(p.id)===b)&&isLocked(p)))continue;
  if(parts.some(p=>(p.snapBlocked||[]).some(block=>byId.has(block.target)&&((root(p.id)===a&&root(block.target)===b)||(root(p.id)===b&&root(block.target)===a)))))continue;
  reroot(contact.part);byId.get(contact.part).mate={target:contact.target,sourceRef:contact.sourceRef,targetRef:contact.targetRef,depth:contact.depth,twist:0,flip:false};
  union(contact.part,contact.target);edge(contact.part,contact.target);recovered++;
 }
 return {parts,recovered,removed,moved:0};
}

// Repair connection metadata first; only nudge already aligned components by <=2 mm.
export function repairAssemblyLinks(input,references,{isLocked=()=>false,maxDistance=2,respectReleased=false}={}){
 const parts=structuredClone(input),byId=new Map(parts.map(p=>[p.id,p]));
 let removed=0,recovered=0,moved=0;
 const graph=()=>{const g=new Map(parts.map(p=>[p.id,[]]));for(const p of parts)if(byId.has(p.mate?.target)){g.get(p.id).push(p.mate.target);g.get(p.mate.target).push(p.id);}return g;};
 const component=(id,g=graph())=>{const seen=new Set([id]),queue=[id];while(queue.length)for(const n of g.get(queue.shift())||[])if(!seen.has(n)){seen.add(n);queue.push(n);}return seen;};
 // Keep a valid forest. Remove dangling/invalid/cyclic records only on unlocked parts.
 const accepted=new Map(parts.map(p=>[p.id,new Set()]));
 const reaches=(a,b)=>{const seen=new Set([a]),queue=[a];while(queue.length){const id=queue.shift();if(id===b)return true;for(const n of accepted.get(id)||[])if(!seen.has(n)){seen.add(n);queue.push(n);}}return false;};
 for(const p of parts){if(!p.mate)continue;const t=byId.get(p.mate.target),a=references[p.sku]?.find(r=>r.id===p.mate.sourceRef),b=references[t?.sku]?.find(r=>r.id===p.mate.targetRef);
  if(!t||!a||!b||!compatibleReferences(a,b,p.sku,t.sku)||reaches(p.id,t.id)){if(!isLocked(p)){delete p.mate;removed++;}continue;}
  accepted.get(p.id).add(t.id);accepted.get(t.id).add(p.id);
 }
 // Ref-point bounds per part: a mate is only possible between parts whose
 // connector spheres come within a pin's reach (shaft travel stays inside its span).
 const bounds=part=>{const rows=(references[part.sku]||[]).map(ref=>worldReference(part,ref).point);if(!rows.length)return null;const c=rows.reduce((a,v)=>a.add(v),new THREE.Vector3()).divideScalar(rows.length);return {c,r:Math.max(...rows.map(v=>v.distanceTo(c)))};};
 for(let pass=0;pass<parts.length;pass++){
  let best=null;
  const g=graph(),componentOf=new Map();for(const p of parts)if(!componentOf.has(p.id)){const c=component(p.id,g);for(const id of c)componentOf.set(id,c);}
  const sphere=new Map(parts.map(p=>[p.id,bounds(p)]));
  for(const p of parts){const members=componentOf.get(p.id);if([...members].some(id=>isLocked(byId.get(id))))continue;
   const moving={...p};delete moving.mate;
   const own=sphere.get(p.id);if(!own)continue;
   // Far parts are excluded as targets; the full list still feeds pin-support counting.
   const far=[];let reachable=false;for(const o of parts){if(members.has(o.id))continue;const b=sphere.get(o.id);if(b&&b.c.distanceTo(own.c)<=b.r+own.r+maxDistance+35)reachable=true;else far.push(o.id);}
   if(!reachable)continue;
   const released=[];
   if(respectReleased)for(const other of parts){
    if(members.has(other.id))for(const block of other.snapBlocked||[])if(byId.has(block.target))released.push(...componentOf.get(block.target));
    if(other.snapBlocked?.some(block=>members.has(block.target)))released.push(...componentOf.get(other.id));
   }
   const match=nearestMate(moving,parts,references,{distance:maxDistance,excluded:[...members,...released,...far]});if(!match)continue;
   const a=worldReference(p,match.sourceRef),b=worldReference(match.target,match.targetRef);if(a.normal.dot(b.normal)>-.9999)continue;
   if(match.sourceRef.key&&match.targetRef.key){
    const key=(part,ref)=>new THREE.Vector3().fromArray(ref.key).applyEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
    const angle=THREE.MathUtils.radToDeg(key(p,match.sourceRef).angleTo(key(match.target,match.targetRef)));if(Math.abs(angle-Math.round(angle/90)*90)>1)continue;
   }
   const offset=a.point.clone().sub(b.point),actualDepth=-offset.dot(b.normal),lateral=offset.clone().addScaledVector(b.normal,actualDepth).length();
   const seated=actualDepth>=-1&&actualDepth<=insertionLimit(match.sourceRef,match.targetRef)+1&&lateral<=1;
   // Recover already seated, tolerance-valid joints without forcing every pin
   // back to its nominal depth and moving the whole chassis into another body.
   const delta=seated?new THREE.Vector3():b.point.clone().addScaledVector(b.normal,-match.depth).sub(a.point);
   if(seated)match.depth=Math.max(0,actualDepth);
   if(delta.length()>maxDistance)continue;
   if(!best||delta.length()<best.delta.length())best={part:p,match,members,delta};
  }
  if(!best)break;
  const {part,match,members,delta}=best,links=graph(),records=new Map(parts.filter(p=>p.mate).map(p=>[p.id,{...p.mate}]));
  // Re-root this component so adding a link cannot overwrite an existing internal joint.
  const seen=new Set([part.id]),queue=[part.id];delete part.mate;
  while(queue.length){const parent=queue.shift();for(const id of links.get(parent)||[]){if(seen.has(id))continue;seen.add(id);queue.push(id);const child=byId.get(id),saved=records.get(id)?.target===parent?records.get(id):records.get(parent);child.mate=records.get(id)?.target===parent?{...saved}:{...saved,target:parent,sourceRef:saved.targetRef,targetRef:saved.sourceRef,twist:-(saved.twist||0)};}}
  if(delta.length()>.0001){for(const id of members){const p=byId.get(id);p.position=p.position.map((v,i)=>v+delta.getComponent(i));}moved++;}
  part.mate={target:match.target.id,sourceRef:match.sourceRef.id,targetRef:match.targetRef.id,depth:match.depth,twist:0,flip:false};recovered++;
 }
 const seen=new Set(),components=[];for(const p of parts)if(!seen.has(p.id)){const c=component(p.id);for(const id of c)seen.add(id);components.push([...c]);}
 return {parts,recovered,removed,moved,components};
}
