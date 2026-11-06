import {worldReference} from './mating.js';
import {PLATFORM_ID} from './platform.js';

function cardinalAxis(direction){
 const index=direction?.findIndex(value=>Math.abs(value)>.97)??-1;
 return index<0?null:index;
}

// The axis used to read the model is separate from a part's insertion axis.
export function guideSpatialOrder(steps,byId,paths,references){
 const votes=[0,0,0];
 for(const part of byId.values()){
  if(part.kind!=='shaft')continue;
  const routes=paths.get(part.id)||[];
  const tip=references[part.sku]?.find(ref=>ref.kind==='pin'&&['square-drive','lego-cross'].includes(ref.profile));
  const axis=cardinalAxis(tip?worldReference(part,tip).normal.toArray():routes[0]?.axis);
  if(axis===null)continue;
  const driven=routes.some(route=>route.contacts.some(contact=>contact.targetRef==='motor-output'&&byId.get(contact.target)?.kind==='motor'));
  votes[axis]+=driven?4:1;
 }
 const strongest=Math.max(...votes),axis=votes.indexOf(strongest);
 if(!strongest||votes.lastIndexOf(strongest)!==axis)return null;
 const root=byId.get(steps[0]?.joint?.target||steps[0]?.added[0]?.id);
 if(!root)return null;
 const origin=root.position[axis];
 const pitch=PLATFORM_ID==='lego'?8:12.7;
 const axes=new Map(),owner=new Map(),ranks=new Map();
 for(const step of steps){
  const joint=step.joint,part=byId.get(joint?.part||step.added[0]?.id);
  if(!part)continue;
  const ref=references[part.sku]?.find(row=>row.id===joint?.sourceRef);
  const route=(paths.get(part.id)||[]).find(row=>row.contacts.some(contact=>contact.target===joint?.target&&contact.sourceRef===joint.sourceRef&&contact.targetRef===joint.targetRef));
  axes.set(step,cardinalAxis(route?.axis||(ref?worldReference(part,ref).normal.toArray():null)));
  // Read both sides as successive bands measured from the bearing plane.
  ranks.set(step,Math.floor((Math.abs(part.position[axis]-origin)+.05)/pitch));
  step.added.forEach(item=>owner.set(item.id,step));
 }
 // A transverse bracket/pin that carries an axial step belongs to that step's
 // band. Follow earlier requirements so its own supports come along too.
 const demand=new Map();
 for(const step of [...steps].reverse()){
  const band=Math.min(axes.get(step)===axis?ranks.get(step):Infinity,demand.get(step)??Infinity);
  if(!Number.isFinite(band))continue;
  for(const id of new Set([...(step.requires||[]),step.joint?.target])){
   const support=owner.get(id);
   if(!support||support===step)continue;
   demand.set(support,Math.min(band,demand.get(support)??Infinity));
   const mount=axes.get(support);
   if(mount!=null&&mount!==axis)ranks.set(support,Math.min(band,ranks.get(support)));
  }
 }
 ranks.set(steps[0],-Infinity);
 return {axis:'XYZ'[axis],origin,ranks};
}
