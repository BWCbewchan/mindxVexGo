import * as THREE from 'three';
import {nearestMate,worldReference} from './mating.js?v=compatibility-27';
import {compatibleReferences} from './connector-policy.js';

// Repair connection metadata first; only nudge already aligned components by <=2 mm.
export function repairAssemblyLinks(input,references,{isLocked=()=>false,maxDistance=2}={}){
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
 for(let pass=0;pass<parts.length;pass++){
  let best=null;
  for(const p of parts){const members=component(p.id);if([...members].some(id=>isLocked(byId.get(id))))continue;
   const moving={...p};delete moving.mate;
   const match=nearestMate(moving,parts,references,{distance:maxDistance,excluded:[...members]});if(!match)continue;
   const a=worldReference(p,match.sourceRef),b=worldReference(match.target,match.targetRef);if(a.normal.dot(b.normal)>-.9999)continue;
   if(match.sourceRef.key&&match.targetRef.key){
    const key=(part,ref)=>new THREE.Vector3().fromArray(ref.key).applyEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad)));
    const angle=THREE.MathUtils.radToDeg(key(p,match.sourceRef).angleTo(key(match.target,match.targetRef)));if(Math.abs(angle-Math.round(angle/90)*90)>1)continue;
   }
   const delta=b.point.clone().addScaledVector(b.normal,-match.depth).sub(a.point);if(delta.length()>maxDistance)continue;
   if(!best||delta.length()<best.delta.length())best={part:p,match,members,delta};
  }
  if(!best)break;
  const {part,match,members,delta}=best,g=graph(),records=new Map(parts.filter(p=>p.mate).map(p=>[p.id,{...p.mate}]));
  // Re-root this component so adding a link cannot overwrite an existing internal joint.
  const seen=new Set([part.id]),queue=[part.id];delete part.mate;
  while(queue.length){const parent=queue.shift();for(const id of g.get(parent)||[]){if(seen.has(id))continue;seen.add(id);queue.push(id);const child=byId.get(id),saved=records.get(id)?.target===parent?records.get(id):records.get(parent);child.mate=records.get(id)?.target===parent?{...saved}:{...saved,target:parent,sourceRef:saved.targetRef,targetRef:saved.sourceRef,twist:-(saved.twist||0)};}}
  if(delta.length()>.0001){for(const id of members){const p=byId.get(id);p.position=p.position.map((v,i)=>v+delta.getComponent(i));}moved++;}
  part.mate={target:match.target.id,sourceRef:match.sourceRef.id,targetRef:match.targetRef.id,depth:match.depth,twist:0,flip:false};recovered++;
 }
 const seen=new Set(),components=[];for(const p of parts)if(!seen.has(p.id)){const c=component(p.id);for(const id of c)seen.add(id);components.push([...c]);}
 return {parts,recovered,removed,moved,components};
}
