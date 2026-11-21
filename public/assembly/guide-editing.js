export const stepKey=step=>(step.groupPhase==='join'?'join:':'')+step.added.map(p=>p.id).sort().join('|');
import {guidePage} from './guide-page-settings.js';
import {guideCamera} from './guide-camera.js';
import {isGuideElectronic} from './guide-priority.js';
import {guideSpatialOrder} from './guide-spatial-order.js';
// A step can keep its joint but use a different clear axis after reordering.
function clearInsertion(step,built,byId,paths,obstacles=null,allowGhost=false){
 const joint=step.joint,added=new Set(step.added.map(p=>p.id));
 const routes=paths.get(joint.part)||[];
 const sameContact=(a,b)=>a.target===b.target&&a.sourceRef===b.sourceRef&&a.targetRef===b.targetRef;
 // Prefer the original mounting point. If a different point is already
 // installed, it can provide a clear approach without reopening the assembly.
 const candidates=routes.flatMap(route=>route.contacts.filter(contact=>built.has(contact.target)||
  (allowGhost||added.has(contact.target))&&sameContact(contact,joint)).map(contact=>({route,contact})));
 const motor=byId.get(joint.part)?.kind==='motor';
 const driveTargets=new Set(motor?routes.flatMap(route=>route.contacts).filter(contact=>contact.sourceRef==='motor-output'&&
  byId.get(contact.target)?.kind==='shaft'&&(built.has(contact.target)||added.has(contact.target))).map(contact=>contact.target):[]);
 const priority=({route,contact})=>Number(motor&&contact.sourceRef==='motor-output'&&byId.get(contact.target)?.kind==='shaft')*4+
  Number(sameContact(contact,joint))*2+Number(!!step.insertion&&sameAxis(route.axis,step.insertion.axis));
 candidates.sort((a,b)=>priority(b)-priority(a));
 for(const {route,contact} of candidates){
  if([...driveTargets].some(id=>!route.contacts.some(mate=>mate.sourceRef==='motor-output'&&mate.target===id)))continue;
  const fixed=new Set([...built,contact.target]);
  const clear=option=>!option.blockedBy.some(id=>fixed.has(id));
  if(!clear(route)){
   if(obstacles)for(const id of route.blockedBy)if(fixed.has(id))obstacles.add(id);
   continue;
  }
  const others=[];
  for(const item of step.added){
   if(item.id===joint.part)continue;
   const mate=byId.get(item.id)?.mate;
   if(!mate||added.has(mate.target)||!fixed.has(mate.target))continue;
   // Pin batches share one axis. A simultaneous pair, or a grouped VEX-style
   // step (pins + part, a shaft stack), may follow each member's clear approach.
   const own=(paths.get(item.id)||[]).filter(option=>clear(option)&&option.contacts.some(c=>sameContact(c,mate)));
   others.push(own.find(option=>sameAxis(route.axis,option.axis))||(step.pathConflict==='together'||step.grouped?own[0]:undefined));
  }
  if(others.some(option=>!option))continue;
  const sweep=[route,...others];
  const clearance=Math.max(5,...sweep.flatMap(option=>[...fixed].map(id=>option.clearanceByPart[id]||0)));
  const contacts=sweep.flatMap(option=>option.contacts.filter(mate=>fixed.has(mate.target)));
  return {joint:{...joint,target:contact.target,sourceRef:contact.sourceRef,targetRef:contact.targetRef,depth:contact.depth},insertion:{axis:route.axis,clearance,contacts,method:'sampled-cad-path'}};
 }
 return null;
}
const sameAxis=(a,b)=>a.every((v,i)=>Math.abs(v-b[i])<.001);

function trappedDriveShaft(step,built,byId,paths){
 if(byId.get(step.joint.part)?.kind!=='motor')return null;
 const after=new Set([...built,...step.added.map(part=>part.id)]);
 for(const route of paths.get(step.joint.part)||[])for(const contact of route.contacts){
  if(contact.sourceRef!=='motor-output'||byId.get(contact.target)?.kind!=='shaft'||after.has(contact.target))continue;
  const shaftRoutes=paths.get(contact.target)||[];
  const couldStartNow=shaftRoutes.some(path=>path.blockedBy.includes(step.joint.part)&&path.blockedBy.every(id=>!built.has(id))&&path.contacts.some(mate=>built.has(mate.target)));
  const couldFitLater=shaftRoutes.some(path=>path.blockedBy.every(id=>!after.has(id)));
  if(couldStartNow&&!couldFitLater)return contact.target;
 }
 return null;
}

function driveInstructions(step,byId,paths,references,names){
 const joint=step.joint,part=byId.get(joint.part),target=byId.get(joint.target);
 if(part?.kind==='motor'&&joint.sourceRef==='motor-output'&&target?.kind==='shaft'){
  const tip=references[target.sku]?.find(ref=>ref.id===joint.targetRef);
  const shaftEnd=tip?.driveRole==='short'?'đầu ngắn của trục':'đầu trục hướng về motor';
  const pins=new Set(step.insertion.contacts.filter(contact=>byId.get(contact.target)?.kind==='pin').map(contact=>contact.target));
  step.title=`Lắp ${names.get(part.id)} vào trục đã luồn`;
  step.note=`Canh lỗ vuông của motor với ${shaftEnd}${pins.size?`, đồng thời canh ${pins.size} lỗ gá với ${pins.size} chốt trên khung`:''}. Giữ trục ở đúng vị trí rồi đẩy motor thẳng theo mũi tên.`;
 }else if(part?.kind==='shaft'&&target&&joint.targetRef!=='motor-output'){
  const drivesMotor=(paths.get(part.id)||[]).some(route=>route.contacts.some(contact=>contact.targetRef==='motor-output'&&byId.get(contact.target)?.kind==='motor'));
  if(!drivesMotor)return;
  const tip=references[part.sku]?.find(ref=>ref.id===joint.sourceRef);
  const entry=tip?.driveRole==='long'?'đầu dài của trục':'đầu trục';
  const exposed=tip?.driveRole==='long'?'đầu ngắn của trục':'đầu trục phía motor';
  step.note=`Luồn ${entry} qua lỗ được đánh dấu trên ${names.get(target.id)} theo mũi tên. Giữ ${exposed} lộ ra ở phía sẽ gắn motor.`;
 }
}

function orderOpenSteps(steps,byId,paths,spatial=null){
 const owner=new Map(steps.flatMap(step=>step.added.map(part=>[part.id,step])));
 const requirements=new Map(steps.map(step=>[step,new Set([...(step.requires||[]),step.joint?.target].filter(id=>id&&owner.get(id)!==step))]));
 const closedAfter=new Map();
 const needsProtectedAccess=(step,part)=>{
  const row=byId.get(part.id),support=byId.get(step.joint?.target);
  return support?.kind==='shaft'||row?.kind==='shaft'||!!row&&isGuideElectronic(row,part.name);
 };
 const dependsOn=(step,dependency)=>{
  const pending=[step],visited=new Set(pending);
  for(const current of pending)for(const id of requirements.get(current)||[]){
   const parent=owner.get(id);
   if(parent===dependency)return true;
   if(parent&&!visited.has(parent)){visited.add(parent);pending.push(parent);}
  }
  return false;
 };
 // Preserve at least one access route until the part is installed. A blocker
 // common to every approach belongs after the part it would enclose.
 const access=steps.flatMap(step=>step.added.map(part=>({step,part,routes:paths.get(part.id)||[]}))).filter(row=>row.routes.length);
 access.sort((a,b)=>Number(needsProtectedAccess(b.step,b.part))-Number(needsProtectedAccess(a.step,a.part))||a.routes.length-b.routes.length);
 for(const {step,part,routes} of access){
  for(const id of routes[0].blockedBy){
   const closing=owner.get(id);
   if(!closing||closing===step||!routes.every(route=>route.blockedBy.includes(id))||dependsOn(step,closing))continue;
   requirements.get(closing).add(part.id);
   if(!closedAfter.has(closing))closedAfter.set(closing,new Map());
   closedAfter.get(closing).set(part.id,part.name);
  }
 }
 const pending=[...steps],ordered=[],built=new Set(),originalIndex=new Map(steps.map((step,i)=>[step,i]));
 // Jointless electronics steps (no modeled mount) have no insertion route to
 // score. Keep them after every step that preceded them, otherwise a loose
 // battery check jumps into the middle of the frame build.
 const ready=step=>{
  const added=new Set(step.added.map(p=>p.id));
  // A chain/belt wrap only needs its sprockets (its requires); it follows them.
  if(!step.joint&&step.type!=='chain-drive'&&pending.some(other=>other!==step&&originalIndex.get(other)<originalIndex.get(step)))return false;
  return (!step.joint||built.has(step.joint.target)||added.has(step.joint.target))&&
   [...requirements.get(step)].every(id=>built.has(id)||added.has(id));
 };
 while(pending.length){
  const recent=new Set(ordered.at(-1)?.added.map(p=>p.id));
  const readySteps=pending.filter(ready);
  // Region (bottom-up, Brain late) comes before the read-out axis: a VEX
  // manual never jumps to the top mechanism while the base is unfinished.
  readySteps.sort((a,b)=>(a.phase??1)-(b.phase??1)||(a.region??0)-(b.region??0)||(spatial?(spatial.ranks.get(a)??Infinity)-(spatial.ranks.get(b)??Infinity):0));
  // Twin sides and the Brain module were checked on the table (their own part set).
  const clear=step=>!step.joint||step.verifiedInModule||step.pathConflict||clearInsertion(step,built,byId,paths);
  const mountsNow=step=>step.joint&&step.added.some(part=>isGuideElectronic(byId.get(part.id),part.name))&&
   (recent.has(step.joint.target)||[...requirements.get(step)].some(id=>recent.has(id)));
  // A cover can close the last remaining approach even when it was not a
  // blocker on every route in the original model.
  const open=access.filter(({part})=>!built.has(part.id)).map(row=>({
   ...row,routes:row.routes.filter(route=>!route.blockedBy.some(id=>built.has(id)))
  })).filter(row=>row.routes.length);
  let step=null,best=Infinity;
  for(const candidate of readySteps){
   if(!clear(candidate))continue;
   const added=new Set(candidate.added.map(p=>p.id));
   const traps=open.filter(row=>row.step!==candidate&&row.routes.every(route=>route.blockedBy.some(id=>added.has(id)))&&!dependsOn(row.step,candidate)).length;
   // Never close off another part first; then build region by region (base
   // before towers, Brain module late); only then prefer mounting electronics
   // right after their support.
   const late=(candidate.region??0)>=90&&readySteps.some(other=>(other.region??0)<90&&clear(other));
   const score=(late?1e9:0)+(candidate.phase??1)*1e8+(traps?1e6+traps*1e3:0)+(candidate.region??0)*10+Number(!mountsNow(candidate));
   if(score<best){step=candidate;best=score;}
  }
  // An earlier phase never waits behind a later one (the Brain module stays
  // last even when a structural step has no clear path: it only gets worse).
  const earlier=step&&readySteps.find(candidate=>(candidate.phase??1)<(step.phase??1));
  if(earlier)step=earlier;
  step||=readySteps[0]||pending.find(candidate=>candidate.joint)||pending[0];
  pending.splice(pending.indexOf(step),1);
  step.requires=[...requirements.get(step)];
  const closedParts=closedAfter.get(step),cover=step.added.find(part=>/\b(plate|panel|cover)\b/i.test(part.name));
  if(closedParts?.size&&cover){
   const center=byId.get(cover.id).position;
   const distance=id=>Math.hypot(...byId.get(id).position.map((n,i)=>n-center[i]));
   const nearest=[...closedParts].sort(([a],[b])=>distance(a)-distance(b))[0][1];
   step.closingNote='Gắn tấm sau khi đã lắp '+nearest+'.';
  }
  ordered.push(step);step.added.forEach(p=>built.add(p.id));
 }
 return ordered;
}

function unresolvedSteps(steps,byId,paths){
 const built=new Set(),unresolved=new Set();
 for(const step of steps){
  if(step.joint&&!step.verifiedInModule&&(trappedDriveShaft(step,built,byId,paths)||!clearInsertion(step,built,byId,paths)))unresolved.add(stepKey(step));
  step.added.forEach(part=>built.add(part.id));
 }
 return unresolved;
}

// Rebuild snapshots from actions. Never reorder previously captured cumulative images.
function prepareGuideOrder(guide,order,paths,references){
 if(guide.groupPhases){
  // Each preparation has its own local frame; the join pages carry assembly frames.
  if(!order.length)return {...guide,editError:null};
  const rank=new Map(order.map((key,i)=>[key,i]));
  const keys=new Set(guide.steps.map(stepKey));
  if(order.some(key=>!keys.has(key)))return {...guide,editError:null};
  const steps=[];
  for(let i=0;i<guide.steps.length;){
   const first=guide.steps[i];
   if(first.groupPhase!=='prepare'){steps.push(first);i++;continue;}
   let end=i+1;
   while(end<guide.steps.length&&guide.steps[end].groupPhase==='prepare'&&guide.steps[end].groupId===first.groupId)end++;
   const batch=guide.steps.slice(i,end);
   const sorted=[...batch].sort((a,b)=>(rank.get(stepKey(a))??Infinity)-(rank.get(stepKey(b))??Infinity));
   if(sorted.every((step,n)=>step===batch[n]))steps.push(...batch);
   else steps.push(...prepareGuideOrder({steps:batch},sorted.map(stepKey),paths,references).steps);
   i=end;
  }
  return {...guide,steps,editError:null};
 }
 if(guide.orderMode==='groups'){
  paths=null;
  const keys=new Set(guide.steps.map(stepKey));
  if(order.some(key=>!keys.has(key)))order=[];
 }
 const full=structuredClone(guide.steps.at(-1).parts),byId=new Map(full.map(p=>[p.id,p]));
 let steps=guide.steps.map(({parts,...step})=>structuredClone(step));
 const position=new Map(order.map((id,i)=>[id,i]));
 steps.sort((a,b)=>(position.get(stepKey(a))??1e6)-(position.get(stepKey(b))??1e6));
 let assemblyAxis=null;
 if(paths&&!order.length){
  const spatial=guideSpatialOrder(steps,byId,paths,references);
  if(!spatial){
   if(!guide.pathCheck)steps=orderOpenSteps(steps,byId,paths);
  }else{
   const original=structuredClone(steps),candidate=orderOpenSteps(steps,byId,paths,spatial);
   const baseline=guide.pathCheck?original:orderOpenSteps(original,byId,paths);
   const unresolved=unresolvedSteps(baseline,byId,paths);
   if([...unresolvedSteps(candidate,byId,paths)].every(key=>unresolved.has(key))){steps=candidate;assemblyAxis=spatial.axis;}
   else steps=baseline;
  }
 }
 const included=new Set();
 const names=new Map(steps.flatMap(step=>step.added.map(p=>[p.id,p.name])));
 for(const step of steps){
  if(paths&&step.joint&&!step.verifiedInModule&&!step.pathConflict){
   const obstacles=new Set();
   const trappedShaft=trappedDriveShaft(step,included,byId,paths);
   const approach=trappedShaft?null:clearInsertion(step,included,byId,paths,obstacles,order.length>0);
   if(approach){
    if(approach.joint.target!==step.joint.target){
     step.title='Lắp '+(names.get(step.joint.part)||'chi tiết mới')+' vào '+(names.get(approach.joint.target)||'cụm đã chuẩn bị');
     step.note='Canh chi tiết mới với điểm ghép được đánh dấu rồi đưa vào theo hướng mũi tên.';
    }
    step.joint=approach.joint;
    step.insertion=approach.insertion;
    driveInstructions(step,byId,paths,references,names);
   }else{
    delete step.insertion;
    step.insertionBlocked=true;
    const labels=[...new Set([...obstacles].map(id=>names.get(id)).filter(Boolean))].slice(0,3);
    step.insertionNote=labels.length?'Chưa tìm được đường lắp. Chuẩn bị cụm này trước khi lắp chi tiết chắn như '+labels.join(', ')+'.':
     'Chưa tìm được đường lắp với thứ tự này. Hãy chuẩn bị cụm riêng trước khi đóng khung.';
    if(trappedShaft)step.insertionNote=`Chưa tìm được đường lắp với thứ tự này. Luồn ${names.get(trappedShaft)} qua lỗ đỡ trước khi gắn motor.`;
    step.note=step.insertionNote;
   }
  }
  if(step.closingNote&&!step.insertionBlocked)step.note=step.closingNote+' '+(step.note||'');
  step.added.forEach(p=>included.add(p.id));
  step.parts=full.filter(p=>included.has(p.id));
  // A module prepared on the table (VEX rule A4) is drawn on its own; its last
  // step shows it mounted on the machine.
  if(step.phase===2&&step.moduleIds&&!step.attachModule){const own=new Set(step.moduleIds);step.parts=step.parts.filter(p=>own.has(p.id));step.onTable=true;}
  // A "2X" step is drawn once, as in VEX manuals: one half, counts for one copy.
  if(step.mirrored&&step.twinIds?.length){const twin=new Set(step.twinIds);step.parts=step.parts.filter(p=>!twin.has(p.id));}
  // The support is reference geometry for the close-up, never a cumulative part.
  if(order.length&&step.joint&&!included.has(step.joint.target)){
   step.guideSupport=byId.get(step.joint.target);
   if(step.guideSupport&&!step.insertionBlocked)step.note='Chuẩn bị chi tiết mới. Hình mờ chỉ vị trí ghép với chi tiết ở bước sau.';
  }
 }
 return {...guide,steps,assemblyAxis,reviewRequired:guide.reviewRequired||steps.some(step=>step.insertionBlocked),editError:null};
}

const orderOf=preferences=>Array.isArray(preferences.order)?preferences.order:[];
const emptyReferences={};

function presentGuide(plan,preferences){
 const defaultCamera=guideCamera(preferences.defaultCamera);
 const steps=plan.steps.map(base=>{
  const step={...base};
  const edit=preferences.steps?.[stepKey(step)];
  if(edit?.page)step.page=guidePage(edit.page);
  else delete step.page;
  if(defaultCamera&&!edit?.view){step.view='custom';step.camera=defaultCamera;}
  if(!edit)return step;
  if(typeof edit.title==='string'&&edit.title.trim())step.title=edit.title.slice(0,160);
  if(typeof edit.note==='string')step.note=edit.note.slice(0,1200);
  if(['auto','front','rear','left','right','top','bottom'].includes(edit.view))step.view=edit.view;
  const camera=guideCamera(edit.camera);
  if(edit.view==='custom'&&camera){step.view='custom';step.camera=camera;}
  else if(edit.view)delete step.camera;
  return step;
 });
 return {...plan,steps};
}

export function editGuide(guide,preferences={},paths=null,references=emptyReferences){
 return guide.ready?presentGuide(prepareGuideOrder(guide,orderOf(preferences),paths,references),preferences):guide;
}

// The editor replaces its immutable CAD guide/path inputs when the model changes.
// Reuse the computed order and snapshots across edits to text, framing, and camera.
export function createGuideEditor(){
 let cached;
 return (guide,preferences={},paths=null,references=emptyReferences)=>{
  if(!guide.ready){cached=null;return guide;}
  const order=orderOf(preferences);
  if(cached?.guide!==guide||cached.paths!==paths||cached.references!==references||
   cached.order.length!==order.length||cached.order.some((key,i)=>key!==order[i])){
   cached={guide,paths,references,order:[...order],plan:prepareGuideOrder(guide,order,paths,references)};
  }
  return presentGuide(cached.plan,preferences);
 };
}
