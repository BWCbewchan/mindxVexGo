import {attachmentReferences,worldReference} from './mating.js';
import {compatibleReferences} from './connector-policy.js';

// Confirmed contacts and alternative connector ends are different suggestions.
export function attachmentTargets(candidate,movingParts,references,occupied=new Set(),{includeSource=false}={}){
 const targets=new Map(),byId=new Map(candidate.parts?.map(part=>[part.id,part])||[]);
 byId.set(candidate.target.id,candidate.target);
 const moving=new Set(movingParts.map(part=>part.id));
 const add=(part,ref,matched=false,primary=false,depth)=>{
  if(!part||!ref)return;
  const key=part.id+'|'+ref.id,previous=targets.get(key);
  if(previous){previous.matched||=matched;previous.primary||=primary;return;}
  if(!matched&&occupied.has(key))return;
  const world=worldReference(part,ref);
  if(matched&&ref.kind==='pin'&&Number.isFinite(depth))world.point.addScaledVector(world.normal,-depth);
  targets.set(key,{partId:part.id,refId:ref.id,point:world.point.multiplyScalar(.001),matched,primary});
 };
 add(candidate.target,candidate.targetRef,true,true,candidate.depth);
 for(const contact of candidate.contacts||candidate.matches||[]){
  const fixedId=moving.has(contact.part)?contact.target:contact.part||contact.target;
  const part=byId.get(fixedId),refId=moving.has(contact.part)||!contact.part?contact.targetRef:contact.sourceRef;
  add(part,references[part?.sku]?.find(ref=>ref.id===refId),true,false,contact.depth);
 }
 const ports=movingParts.flatMap(part=>attachmentReferences(references[part.sku]||[]).map(ref=>({part,ref})));
 for(const ref of attachmentReferences(references[candidate.target.sku]||[])){
  if(ports.some(source=>compatibleReferences(source.ref,ref,source.part.sku,candidate.target.sku)))add(candidate.target,ref);
 }
 if(includeSource){
  const fixedPorts=attachmentReferences(references[candidate.target.sku]||[]);
  const contacts=candidate.contacts||candidate.matches||[];
  for(const {part,ref} of ports){
   if(!fixedPorts.some(target=>compatibleReferences(ref,target,part.sku,candidate.target.sku)))continue;
   const preview=byId.get(part.id)||part;
   const pose=!candidate.parts&&candidate.pose?{...preview,...candidate.pose}:preview;
   const sourceId=candidate.source?.id||(movingParts.length===1?movingParts[0].id:null);
   const matched=part.id===sourceId&&ref.id===candidate.sourceRef?.id||contacts.some(contact=>
    (contact.part===part.id||!contact.part&&part.id===sourceId)&&contact.sourceRef===ref.id||contact.target===part.id&&contact.targetRef===ref.id);
   add(pose,ref,matched);
  }
 }
 return [...targets.values()];
}

// Limit presentation only. The mate solver still evaluates all compatible ends
// and keeps every contact when the user releases the part.
export function focusedAttachmentTargets(targets,{maxVisible=8,radiusMM=30,minSeparationMM=.6,project=null,minPixels=12}={}){
 const primary=targets.find(target=>target.primary)||targets.find(target=>target.matched)||targets[0];
 if(!primary)return [];
 const distance=target=>target.point.distanceToSquared(primary.point);
 const ordered=[...targets].sort((a,b)=>Number(b.primary)-Number(a.primary)||Number(b.matched)-Number(a.matched)||distance(a)-distance(b));
 const shown=[],locations=[];
 for(const target of ordered){
  if(!target.matched&&distance(target)>(radiusMM/1000)**2)continue;
  const pixel=project?.(target.point);
  if(project&&!pixel)continue;
  if(shown.some((other,i)=>other.point.distanceToSquared(target.point)<(minSeparationMM/1000)**2||
   pixel&&locations[i]&&(pixel.x-locations[i].x)**2+(pixel.y-locations[i].y)**2<minPixels**2))continue;
  shown.push(target);locations.push(pixel);
  if(shown.length>=maxVisible)break;
 }
 return shown;
}
