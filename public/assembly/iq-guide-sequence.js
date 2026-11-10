import {guidePartPriority,isGuideElectronic} from './guide-priority.js';
import {seatedConnections,jointMetrics} from './assembly-review.js';
import {worldReference} from './mating.js';
import {analyzeIQInsertionPaths} from './iq-insertion-paths.js';

// IQ mounting parts have integral pins and several simultaneous contacts. The
// single editing mate is not an assembly dependency (and may point either way).
export function generateIQGuide(input,{references={},nameFor=p=>p.label||p.sku,isElectronic=()=>false,inferConnections=false,objects=null,insertionPaths=null,platformName='VEX IQ',rootId=null,prioritizeMountedElectronics=false,prebuilt=null}={}){
 const parts=structuredClone(input),byId=new Map(parts.map(p=>[p.id,p])),links=new Map(parts.map(p=>[p.id,[]])),notes=[],blockers=[];
 if(!parts.length)return {ready:false,steps:[],blockers:['Add the parts for the model first.'],notes};
 const compare=(a,b)=>a.sku.localeCompare(b.sku)||a.position.reduce((n,v,i)=>n||v-b.position[i],0)||a.rotation.reduce((n,v,i)=>n||v-b.rotation[i],0)||a.id.localeCompare(b.id);
 const ref=(p,id)=>references[p?.sku]?.find(r=>r.id===id);
 const contacts=inferConnections?seatedConnections(parts,references):[];
 for(const p of parts){
  if(!p.mate)continue;
  const target=byId.get(p.mate.target),a=ref(p,p.mate.sourceRef),b=ref(target,p.mate.targetRef);
  const metrics=a&&b&&target?jointMetrics(p,target,a,b):null;
  if(!metrics?.valid){if(!inferConnections)blockers.push(`${nameFor(p)} has an invalid assembly connection.`);continue;}
  contacts.push({part:p.id,target:target.id,sourceRef:a.id,targetRef:b.id,depth:metrics.depth,gap:metrics.gap});
 }
 const seen=new Set();
 for(const c of contacts){
  if(c.part===c.target)continue;
  const key=[`${c.part}:${c.sourceRef}`,`${c.target}:${c.targetRef}`].sort().join('|');if(seen.has(key))continue;seen.add(key);
  links.get(c.part)?.push({...c});links.get(c.target)?.push({...c,part:c.target,target:c.part,sourceRef:c.targetRef,targetRef:c.sourceRef});
 }
 const components=[],visited=new Set();
 for(const p of [...parts].sort(compare)){if(visited.has(p.id))continue;const ids=new Set([p.id]),queue=[p.id];visited.add(p.id);while(queue.length){for(const c of links.get(queue.shift()))if(!visited.has(c.target)){visited.add(c.target);ids.add(c.target);queue.push(c.target);}}components.push(ids);}
 const mechanical=components.filter(ids=>[...ids].some(id=>!isElectronic(byId.get(id).sku)));
 let detached=[];
 if(mechanical.length>1){
  // Name the smaller islands (often a spare pin dropped in the workspace) so
  // the author can find and delete or attach them instead of guessing.
  const islands=[...mechanical].sort((a,b)=>b.size-a.size).slice(1);
  detached=islands.map(ids=>[...ids]);
  const label=ids=>{const rows=[...ids].map(id=>byId.get(id));return rows.length===1?nameFor(rows[0]):`${nameFor(rows.sort(compare)[0])} (+${rows.length-1})`;};
  blockers.push(`Connect the separate mechanical assemblies before exporting: ${islands.slice(0,6).map(label).join(', ')}${islands.length>6?` …(+${islands.length-6})`:''}.`);
 }else if(!mechanical.length)blockers.push('Add mechanical parts before exporting.');
 if(blockers.length)return {ready:false,steps:[],blockers:[...new Set(blockers)],notes,...(detached.length?{detached}:{})};
 const core=mechanical[0],loose=parts.filter(p=>!core.has(p.id)),members=parts.filter(p=>core.has(p.id));
 const span=p=>{const rows=references[p.sku]||[];return [0,1,2].map(i=>rows.length?Math.max(...rows.map(r=>r.point[i]))-Math.min(...rows.map(r=>r.point[i])):0).sort((a,b)=>b-a);};
 const areas=new Map(members.map(p=>{const s=span(p);return [p.id,s[0]*Math.max(s[1],1)];}));
 const area=p=>areas.get(p.id);
 const degree=p=>new Set(links.get(p.id).map(c=>c.target)).size;
 const bodies=members.filter(p=>p.kind==='body');
 const motors=members.filter(p=>p.kind==='motor'),shafts=members.filter(p=>p.kind==='shaft');
 const pathAudit=insertionPaths||(objects&&members.every(p=>objects.has(p.id))?analyzeIQInsertionPaths(parts,references,links,objects):null);
 const shaftFirst=prioritizeMountedElectronics||!!pathAudit;
 const driveShafts=new Map(motors.map(motor=>[motor.id,links.get(motor.id).filter(c=>c.sourceRef==='motor-output'&&byId.get(c.target)?.kind==='shaft').map(c=>c.target)]));
 const driven=new Set([...driveShafts.values()].flat());
 const supportedDriveShafts=new Set(shafts.filter(shaft=>driven.has(shaft.id)&&links.get(shaft.id).some(c=>{
  const target=byId.get(c.target);
  return target?.kind==='body'&&ref(target,c.targetRef)?.kind==='hole';
 })).map(shaft=>shaft.id));
 const driveRoots=shaftFirst?shafts.filter(shaft=>driven.has(shaft.id)):[];
 const roots=bodies.length?bodies:driveRoots.length?driveRoots:motors.length?motors:shafts.length?shafts:members.filter(p=>p.kind!=='retainer');
 if(rootId&&!members.some(p=>p.id===rootId))return {ready:false,steps:[],blockers:['Chi tiết gốc không thuộc cụm lắp ráp.'],notes};
 // Official VEX IQ manuals build by region, bottom-up: the frame that rests on
 // the table first, then bearings and drive, towers, mechanisms on top, and the
 // Brain module late (docs/assembly-guide-rules.md, rules A1/A9). Heights come
 // from the connector rows in world space; +Y is up in the editor.
 const heights=new Map(members.map(p=>{
  const ys=(references[p.sku]||[]).filter(r=>Array.isArray(r.point)).map(r=>worldReference(p,r).point.y);
  if(!ys.length)ys.push(p.position[1]);
  const low=Math.min(...ys),high=Math.max(...ys);return [p.id,{low,mid:(low+high)/2}];
 }));
 const lateKind=p=>p.kind==='electronic'||p.kind==='sensor'||p.kind==='brain'||p.kind==='battery';
 const floor=Math.min(...members.filter(p=>!lateKind(p)).map(p=>heights.get(p.id).low));
 const BAND=25.4;
 const regionOf=p=>lateKind(p)?90:Math.max(0,Math.floor((heights.get(p.id).mid-floor)/BAND));
 const regions=new Map(members.map(p=>[p.id,regionOf(p)]));
 const region=p=>regions.get(p.id);
 // Start from the longest body lying on the table, not the largest plate in
 // the middle of the model.
 const grounded=(roots.length?roots:members).filter(p=>!lateKind(p)&&heights.get(p.id).low<=floor+6.35);
 const root=(rootId?members.find(p=>p.id===rootId):null)||[...(grounded.length?grounded:roots.length?roots:members)].sort((a,b)=>span(b)[0]-span(a)[0]||area(b)*(1+degree(b)*.05)-area(a)*(1+degree(a)*.05)||compare(a,b))[0];
 // Rules A2-A4: mirrored halves are built side by side ("2X"), the Brain module
 // is prepared on the table and mounted late. Each phase is planned on its own
 // part set with the same CAD routes, then the phases are concatenated.
 const options=arguments[1]||{};
 if(!options.phase&&!rootId&&!prebuilt){
  const modular=modularPlan();
  if(modular)return modular;
 }
 // Only snapshots are re-rooted. The document and all authored CAD poses stay intact.
 for(const p of parts)delete p.mate;
 const included=new Set(prebuilt?[...prebuilt].filter(id=>core.has(id)):[root.id]),emitted=new Set(prebuilt?[...prebuilt].filter(id=>core.has(id)):[]),steps=[];
 // Step part entries; pins and shafts carry their true length for the 1:1
 // ruler that VEX manuals print next to them.
 function entry(p){const row={id:p.id,sku:p.sku,name:nameFor(p)};if(p.kind==='pin'||p.kind==='shaft'){const length=span(p)[0];if(length>0&&length<230)row.lengthMM=Math.round(length*10)/10;}return row;}
 function modularPlan(){
  const sizeOf=p=>span(p)[0];
  // E3: Brain module = Brain + parts held only by it (its pins, the small
  // connectors on those pins) — the mounting brackets stay in the module.
  const brain=members.find(p=>lateKind(p)&&/brain/i.test(nameFor(p)));
  const moduleIds=new Set();
  if(brain){
   moduleIds.add(brain.id);
   for(const c of links.get(brain.id)){const p=byId.get(c.target);if(p?.kind==='pin')moduleIds.add(p.id);}
   for(const id of [...moduleIds])for(const c of links.get(id)){const p=byId.get(c.target);if(p&&!moduleIds.has(p.id)&&p.kind==='body'&&sizeOf(p)<=26&&links.get(p.id).some(l=>moduleIds.has(l.target)&&byId.get(l.target).kind==='pin'))moduleIds.add(p.id);}
   if(moduleIds.size<2||moduleIds.size>members.length*.3)moduleIds.clear();
  }
  // A battery sitting against the Brain (no modeled joint) goes in first, as
  // in every VEX manual, instead of a loose "check position" page at the end.
  const battery=moduleIds.size?loose.find(p=>/battery/i.test(nameFor(p))&&Math.hypot(...p.position.map((v,i)=>v-brain.position[i]))<90):null;
  if(battery)moduleIds.add(battery.id);
  // E4: two identical sides built at once ("2X"). VEX uses it for mirror
  // images and for translated copies; try mirror planes X/Z and the offset
  // between identical grounded frame members.
  const rest=members.filter(p=>!moduleIds.has(p.id)&&!lateKind(p));
  // A twin is the same SKU at the same place in the cross-section, on the other
  // side of the mid plane (mirror image or translated copy alike).
  const transforms=[0,2].map(axis=>{const values=rest.map(p=>p.position[axis]),mid=(Math.min(...values)+Math.max(...values))/2;return {kind:'side',axis,mid,onPlane:p=>Math.abs(p.position[axis]-mid)<1,side:p=>p.position[axis]<mid-1};});
  let halves=null;
  for(const t of transforms){
   const partner=new Map(),taken=new Set();
   const others=[0,1,2].filter(i=>i!==t.axis);
   for(const p of [...rest].sort(compare)){
    if(t.onPlane(p)||!t.side(p))continue;
    const mirror=2*t.mid-p.position[t.axis];
    const twin=rest.filter(q=>!taken.has(q.id)&&q.sku===p.sku&&q.position[t.axis]>t.mid+1&&others.every(i=>Math.abs(q.position[i]-p.position[i])<1.5))
     .sort((a,b)=>Math.abs(a.position[t.axis]-mirror)-Math.abs(b.position[t.axis]-mirror)||compare(a,b))[0];
    if(twin){partner.set(p.id,twin.id);taken.add(twin.id);}
   }
   if(partner.size<rest.length*.3)continue;
   const images=new Set(partner.values()),inA=p=>partner.has(p.id)&&!images.has(p.id);
   const seed=rest.filter(p=>inA(p)&&heights.get(p.id).low<=floor+6.35).sort((a,b)=>sizeOf(b)-sizeOf(a)||compare(a,b))[0];
   if(!seed)continue;
   const half=new Set([seed.id]),queue=[seed.id];
   while(queue.length)for(const c of links.get(queue.shift())){const p=byId.get(c.target);if(p&&!half.has(p.id)&&inA(p))half.add(p.id),queue.push(p.id);}
   const twin=new Set([...half].map(id=>partner.get(id)));
   // The twin side must itself be one connected piece.
   const tq=[[...twin][0]],tseen=new Set(tq);while(tq.length)for(const c of links.get(tq.shift()))if(twin.has(c.target)&&!tseen.has(c.target))tseen.add(c.target),tq.push(c.target);
   if(half.size<4||half.size>rest.length*.45||tseen.size!==twin.size||[...twin].some(id=>half.has(id)))continue;
   if(!halves||half.size>halves.half.size)halves={kind:t.kind,half,twin,partner};
  }
  if(!halves&&!moduleIds.size)return null;
  const sub=(rows,extra={})=>generateIQGuide(rows,{...options,...extra,phase:true});
  const phases=[];let reviewRequired=false,pathCheck=null,pathSearch=null;
  const take=(guide,phase,decorate)=>{
   if(!guide.ready)return false;
   reviewRequired||=!!guide.reviewRequired;pathCheck||=guide.pathCheck;pathSearch||=guide.pathSearch;notes.push(...guide.notes.filter(n=>!notes.includes(n)));
   for(const step of guide.steps){if(step.type==='electronics'){step.added=step.added.filter(p=>!moduleIds.has(p.id));if(!step.added.length)continue;}if(step.type!=='electronics'||phase>=1)phases.push({...decorate?.(step)||step,phase:step.type==='electronics'?3:phase});}
   return true;
  };
  if(halves){
   const halfRows=parts.filter(p=>halves.half.has(p.id)),plan=sub(halfRows);
   const ok=take(plan,0,step=>{
    const twins=step.added.map(item=>halves.partner.get(item.id)).filter(Boolean).map(id=>byId.get(id));
    return {...step,added:[...step.added,...twins.map(entry)],
     title:step.title+' · làm 2 bên',note:step.note+(' Lắp tương tự cho bên còn lại (đối diện).'),mirrored:true,verifiedInModule:true,grouped:true,
     moduleIds:[...halves.half,...halves.twin]};
   });
   if(!ok)return null;
  }
  const builtHalves=halves?new Set([...halves.half,...halves.twin]):null;
  const mainRows=parts.filter(p=>!moduleIds.has(p.id));
  if(!take(sub(mainRows,builtHalves?{prebuilt:builtHalves}:{}),1))return null;
  if(moduleIds.size){
   // A battery sitting against the Brain (no modeled joint) goes in first, as
   // in every VEX manual, instead of a loose "check position" page at the end.
   const moduleRows=parts.filter(p=>moduleIds.has(p.id)&&p.id!==battery?.id),plan=sub(moduleRows,{rootId:brain.id});
   if(battery&&plan.ready&&plan.steps.length){const first=plan.steps[0];first.added=[...first.added,entry(battery)];first.title='Lắp pin vào Robot Brain, '+first.title.charAt(0).toLowerCase()+first.title.slice(1);first.note='Đẩy pin vào khe dưới Robot Brain cho đến khi khớp. '+first.note;}
   const ok=take(plan,2,(step,i)=>({...step,verifiedInModule:true,moduleIds:[...moduleIds],
    title:(phases.some(s=>s.phase===2)?'':'Chuẩn bị module Brain trên bàn: ')+step.title}));
   if(!ok)return null;
   const last=phases.filter(s=>s.phase===2).at(-1);
   if(last){last.attachModule=true;last.note+=' Sau đó đặt cả module Brain lên khung, canh các chốt của góc nối vào lỗ trên khung và ấn đều.';}
  }
  phases.sort((a,b)=>a.phase-b.phase);
  // Rebuild cumulative snapshots across phases; give mirrored twins a support.
  const included=new Set(),steps=[];
  for(const step of phases){
   step.added.forEach(p=>included.add(p.id));
   const snapshot=parts.filter(p=>included.has(p.id)).sort(compare).map(p=>structuredClone(p));
   for(const row of snapshot){if(!step.added.some(a=>a.id===row.id))continue;const prior=step.parts?.find(p=>p.id===row.id);if(prior?.mate)row.mate=prior.mate;else if(!row.mate){const c=links.get(row.id).find(l=>included.has(l.target));if(c)row.mate={target:c.target,sourceRef:c.sourceRef,targetRef:c.targetRef,depth:c.depth,twist:0,flip:false};}}
   // Earlier steps' parts keep the joint chosen when they were added.
   for(const row of snapshot){const owner=steps.find(s=>s.parts.find(p=>p.id===row.id&&s.added.some(a=>a.id===row.id)));const prev=owner?.parts.find(p=>p.id===row.id);if(prev?.mate&&!step.added.some(a=>a.id===row.id))row.mate=prev.mate;}
   steps.push({...step,parts:snapshot,requires:(step.requires||[]).filter(id=>included.has(id)&&!step.added.some(a=>a.id===id))});
  }
  const modules=[halves&&`hai nửa đối xứng làm song song (${halves.half.size} chi tiết mỗi bên)`,moduleIds.size&&`module Brain làm trên bàn (${moduleIds.size} chi tiết)`].filter(Boolean);
  notes.push('Thứ tự theo hướng dẫn VEX IQ: '+modules.join('; ')+'.');
  return {ready:true,steps,blockers:[],notes,pathSearch,...(reviewRequired?{reviewRequired:true}:{}),pathCheck,modules:{twinSides:halves?halves.kind:null,mirroredParts:halves?halves.half.size*2:0,brainModule:[...moduleIds]}};
 }
 const builtLinks=(p,built=included)=>links.get(p.id).filter(c=>built.has(c.target));
 const isShaftMount=(part,contact)=>byId.get(contact.target)?.kind==='shaft'&&
  ref(byId.get(contact.target),contact.targetRef)?.kind==='pin'&&ref(part,contact.sourceRef)?.kind==='hole';
 // Through bores can match either tip. The nearer tip is the default entry
 // so that parts on opposite ends do not become prerequisites of each other.
 const shaftEnds=new Map(parts.map(part=>{
  const ends=new Map();
  for(const contact of links.get(part.id)){
   if(!isShaftMount(part,contact))continue;
   const current=ends.get(contact.target);
   if(!current||contact.depth<current.depth||contact.depth===current.depth&&contact.targetRef<current.targetRef)ends.set(contact.target,contact);
  }
  return [part.id,ends];
 }));
 const preferredShaftEnd=(part,shaftId)=>shaftEnds.get(part.id)?.get(shaftId)?.targetRef;

 function innerShaftParts(part,contact){
  const shaft=byId.get(contact.target);
  if(!isShaftMount(part,contact))return [];
  return links.get(shaft.id).filter(other=>{
   if(other.target===part.id||other.sourceRef!==contact.targetRef)return false;
   const inner=byId.get(other.target);
   if(ref(inner,other.targetRef)?.kind!=='hole'||preferredShaftEnd(inner,shaft.id)!==contact.targetRef)return false;
   if(part.kind==='retainer'&&inner.kind!=='retainer')return true;
   if(part.kind!=='retainer'&&inner.kind==='retainer')return false;
   return other.depth>contact.depth+.15;
  }).map(other=>other.target);
 }
 // With a CAD path audit every hub may enter from either shaft end; the sampled
 // sweep (not the nearest-tip depth heuristic) decides which hubs go first.
 const stackedOnShaft=(part,contact)=>pathAudit&&part.kind!=='retainer'?[]:innerShaftParts(part,contact);
 function mountable(part,contact,built){
  if(!built.has(contact.target))return false;
  if(!pathAudit&&isShaftMount(part,contact)&&preferredShaftEnd(part,contact.target)!==contact.targetRef)return false;
  return stackedOnShaft(part,contact).every(id=>built.has(id));
 }

 const supportedElsewhere=(p,except,built=included)=>links.get(p.id).some(c=>c.target!==except&&built.has(c.target));
 function waiting(p,built=included){
  if(shaftFirst&&driveShafts.get(p.id)?.some(id=>supportedDriveShafts.has(id)&&!built.has(id)))return true;
  for(const c of links.get(p.id)){
   const target=byId.get(c.target),a=ref(p,c.sourceRef),b=ref(target,c.targetRef);
   if(built.has(target.id))continue;
   // A pin can be inserted into its first support; the next plate must wait.
   // Integral connector pegs follow the same rule as loose mounting pins.
   if(p.kind!=='pin'&&a.kind==='hole'&&b.kind==='pin'&&!b.profile&&['pin','body'].includes(target.kind)&&supportedElsewhere(target,p.id,built))return true;
   if(p.kind==='shaft'&&b.id==='motor-output'&&!pathAudit&&!(shaftFirst&&supportedDriveShafts.has(p.id)))return true;
   if(p.kind==='retainer'&&target.kind==='shaft')return true;
  }
  return false;
 }
 // Keep an unaudited shaft anchored to its earliest installed support rather
 // than re-parenting it to a later closing beam with the same bore geometry.
 const primary=(p,built=included,route=null)=>{const supportOrder=p.kind==='shaft'&&!route?new Map([...built].map((id,i)=>[id,i])):null;return [...((route?route.contacts:builtLinks(p,built)).filter(c=>mountable(p,c,built)))].sort((a,b)=>{
  const ta=byId.get(a.target),tb=byId.get(b.target);
  const driveSocket=c=>Number(p.kind==='motor'&&c.sourceRef==='motor-output'&&byId.get(c.target)?.kind==='shaft');
  const motorScore=c=>ref(byId.get(c.target),c.targetRef)?.id==='motor-output'?1:0;
  return (shaftFirst?driveSocket(b)-driveSocket(a):0)||(p.kind==='shaft'&&route?b.depth-a.depth:0)||(p.kind==='shaft'?motorScore(b)-motorScore(a):0)||Number(tb.kind==='body')-Number(ta.kind==='body')||(supportOrder?supportOrder.get(a.target)-supportOrder.get(b.target):0)||degree(tb)-degree(ta)||compare(ta,tb)||a.sourceRef.localeCompare(b.sourceRef,undefined,{numeric:true});
 })[0];};
 const electronics=new Set(members.filter(p=>isElectronic(p.sku)||isGuideElectronic(p,nameFor(p))).map(p=>p.id));
 const priorities=new Map(members.map(p=>[p.id,prioritizeMountedElectronics&&electronics.has(p.id)?2.5:guidePartPriority(p,nameFor(p))]));
 const priority=(part,recent)=>electronics.has(part.id)&&links.get(part.id).some(c=>recent.has(c.target))?-1:priorities.get(part.id);
 // Search whole-model consequences, not just the next available contact. Adding
 // the motor first traps its flanged shaft between the housing and frame.
 let planned=null,pathSearch=null;
 if(pathAudit&&core.size>1){
  const failed=new Set();let searches=0;
  const clear=(route,built)=>route.blockedBy.every(id=>!built.has(id));
  const options=(p,built)=>(pathAudit.get(p.id)||[]).filter(r=>clear(r,built)&&r.contacts.some(c=>mountable(p,c,built)));
  function search(built,recent){
   if(built.size===core.size)return [];
   const key=members.map(p=>built.has(p.id)?'1':'0').join('');if(failed.has(key)||++searches>10000)return null;
   const candidates=members.filter(p=>!built.has(p.id)&&!waiting(p,built)&&options(p,built).length).sort((a,b)=>region(a)-region(b)||priority(a,recent)-priority(b,recent)||area(a)-area(b)||builtLinks(b,built).length-builtLinks(a,built).length||compare(a,b));
   for(const p of candidates)for(const route of options(p,built)){
    const parent=primary(p,built,route).target,axis=route.axis;
    const cohort=p.kind==='pin'?candidates.filter(other=>other.kind==='pin'&&other.sku===p.sku&&options(other,built).some(r=>r.axis.every((v,i)=>Math.abs(v-axis[i])<.001)&&primary(other,built,r).target===parent)):[p];
    const batches=cohort.length>1?[cohort,[p]]:[[p]];
    for(const batch of batches){
     const next=new Set([...built,...batch.map(p=>p.id)]);
     if(members.some(other=>!next.has(other.id)&&!(pathAudit.get(other.id)||[]).some(r=>clear(r,next))))continue;
     const tail=search(next,new Set(batch.map(p=>p.id)));if(!tail)continue;
     return [{ids:batch.map(p=>p.id),routes:new Map(batch.map(other=>[other.id,options(other,built).find(r=>r.axis.every((v,i)=>Math.abs(v-axis[i])<.001)&&primary(other,built,r).target===parent)||route]))},...tail];
    }
   }
   failed.add(key);return null;
  }
  planned=search(new Set(included),new Set(included));
  pathSearch={rootId:root.id,states:searches,budget:10000,budgetExceeded:searches>10000};
  // No sequence of single rigid insertions exists (braced triangles, a part
  // sandwiched between two others, CAD overlaps). Keep every checked route,
  // pair mutually locking parts into one simultaneous step, and flag only the
  // insertions that still cross an installed part.
  if(!planned){planned=bestEffortPlan(clear,options);if(planned)pathSearch.bestEffort=true;}
  if(!planned)return {ready:false,steps:[],blockers:['Chưa tìm được đường lắp từng chi tiết mà không xuyên khung. Cần chuẩn bị cụm riêng trước khi đóng khung; không xuất thứ tự lắp chưa được kiểm tra.'],notes,pathSearch};
 }
 // Official VEX IQ instructions show one coherent action per step, not one
 // piece per page: pins travel with the part that uses them, a whole shaft
 // stack goes on together, and repeated small parts on one base share a step.
 // Only adjacent, already-valid steps are merged, so the checked order holds.
 function consolidateSteps(list){
  const kind=id=>byId.get(id)?.kind,small=new Set(['pin','retainer']);
  const mergeable=step=>step&&step.type==='assembly'&&!step.pathConflict&&step.joint&&!step.added.some(p=>['shaft','motor'].includes(kind(p.id)));
  const nameOf=id=>nameFor(byId.get(id));
  const merge=(a,b,joint,insertion,title,note)=>{
   const added=[...a.added,...b.added],ids=new Set(added.map(p=>p.id));
   return {...b,title,note,added,joint,insertion,grouped:true,region:Math.max(a.region??0,b.region??0)>=90?90:Math.min(a.region??0,b.region??0),requires:[...new Set([...a.requires,...b.requires])].filter(id=>!ids.has(id))};
  };
  const pinsInto=(step,partId)=>step.added.every(p=>kind(p.id)==='pin'&&links.get(partId).some(c=>c.target===p.id));
  for(let i=0;i+1<list.length;){
   const a=list[i],b=list[i+1];let next=null;
   if(mergeable(a)&&mergeable(b)){
    const main=b.joint.part,count=a.added.length;
    // 1. Pins, then the part that is pushed onto exactly those pins.
    if(a.added.every(p=>kind(p.id)==='pin')&&b.added.length===1&&kind(main)!=='pin'&&pinsInto(a,main)&&(a.joint.target===b.joint.target||a.added.some(p=>p.id===b.joint.target)))
     next=merge(a,b,b.joint,b.insertion,`Lắp ${nameOf(main)} vào ${nameOf(a.joint.target)} bằng ${count} chốt`,
      `Cắm ${count} chốt vào các lỗ được đánh dấu trên ${nameOf(a.joint.target)}, rồi ấn ${nameOf(main)} lên các chốt theo hướng mũi tên cho đến khi khớp.`);
    // 2. Everything that slides onto one shaft, inner to outer.
    else if(kind(a.joint.target)==='shaft'&&a.joint.target===b.joint.target&&a.added.length+b.added.length<=6){
     const names=[...new Set([...a.added,...b.added].map(p=>p.name))];
     next=merge(a,b,a.joint,a.insertion,`Luồn ${names.join(', ')} vào ${nameOf(a.joint.target)}`,
      `Luồn lần lượt từng chi tiết vào ${nameOf(a.joint.target)} theo thứ tự trong hình (trong ra ngoài). Giữ đúng khoảng cách; vòng chặn lắp sau cùng.`);
    }
    // 3. Small parts on the same base from the same side: identical
    // connectors/beams (up to 4), or mixed pins (up to 3 kinds, 12 pieces).
    else{
     const support=id=>kind(id)==='pin'?byId.get(id)?.mate?.target||id:id,members=[...a.added,...b.added],skus=new Set(members.map(p=>p.sku));
     // Without a CAD sweep, the socket face of the joint gives the insertion side.
     const side=step=>step.insertion?.axis||(()=>{const t=byId.get(step.joint.target),r=ref(t,step.joint.targetRef);return r?worldReference(t,r).normal.toArray():null;})();
     const sa=side(a),sb=side(b),sameSide=!!sa&&!!sb&&sa.every((v,k)=>Math.abs(v-sb[k])<.001);
     const pins=members.every(p=>kind(p.id)==='pin')&&skus.size<=3&&members.length<=12;
     const twins=skus.size===1&&members.length<=4&&members.every(p=>kind(p.id)==='body'||small.has(kind(p.id)));
     if(sameSide&&support(a.joint.target)===support(b.joint.target)&&(pins||twins)){
      const base=nameOf(support(a.joint.target)),label=skus.size===1?`${members.length} ${b.added[0].name}`:`${members.length} chốt`;
      next=merge(a,b,a.joint,a.insertion,`Lắp ${label} vào ${base}`,`Lắp ${label} vào các vị trí được đánh dấu trên ${base}, cùng một hướng theo mũi tên.`);
     }
    }
   }
   if(next){list.splice(i,2,next);continue;}
   i++;
  }
  return list;
 }
 function bestEffortPlan(clear,options){
  const plan=[],built=new Set(included),routesOf=p=>pathAudit.get(p.id)||[];
  const blockSets=new Map(members.map(p=>[p.id,routesOf(p).map(r=>new Set(r.blockedBy))]));
  const sameAxis=(a,b)=>a.every((v,i)=>Math.abs(v-b[i])<.001);
  let guard=0;
  while(built.size<core.size&&guard++<core.size*2){
   const remaining=members.filter(p=>!built.has(p.id));
   const alive=new Map(remaining.map(p=>[p.id,blockSets.get(p.id).filter(set=>{for(const id of set)if(built.has(id))return false;return true;})]));
   const kills=p=>remaining.filter(o=>o!==p&&alive.get(o.id).length&&alive.get(o.id).every(set=>set.has(p.id))).map(o=>o.id);
   const recent=new Set(plan.at(-1)?.ids||[root.id]);
   const candidates=remaining.filter(p=>!waiting(p,built)&&options(p,built).length).map(p=>({p,kills:kills(p)}))
    .sort((a,b)=>a.kills.length-b.kills.length||region(a.p)-region(b.p)||priority(a.p,recent)-priority(b.p,recent)||area(a.p)-area(b.p)||compare(a.p,b.p));
   if(candidates.length){
    const best=candidates[0],route=options(best.p,built)[0];
    let batch=[best.p],routes=new Map([[best.p.id,route]]),mode=null;
    // Hubs carried only by this shaft and with no free approach of their own
    // are held between the supports while the shaft is threaded through them.
    const riders=best.p.kind==='shaft'?remaining.filter(o=>o!==best.p&&!o.kind.match(/^(shaft|pin|retainer)$/)&&links.get(o.id).length&&links.get(o.id).every(c=>c.target===best.p.id)&&!alive.get(o.id).some(set=>!set.has(best.p.id))):[];
    if(riders.length){batch.push(...riders);for(const o of riders)routes.set(o.id,routesOf(o).find(r=>r.contacts.some(c=>c.target===best.p.id))||route);mode='threaded';}
    else if(best.kills.length){
     const partner=candidates.find(c=>c!==best&&best.kills.includes(c.p.id)&&c.kills.includes(best.p.id));
     if(partner){batch.push(partner.p);routes.set(partner.p.id,options(partner.p,built)[0]);mode='together';}
     else mode='closes';
    }else if(best.p.kind==='pin'){
     const parent=primary(best.p,built,route)?.target;
     for(const c of candidates){
      if(c===best||c.kills.length||c.p.kind!=='pin'||c.p.sku!==best.p.sku)continue;
      const match=options(c.p,built).find(r=>sameAxis(r.axis,route.axis)&&primary(c.p,built,r)?.target===parent);
      if(match){batch.push(c.p);routes.set(c.p.id,match);}
     }
    }
    plan.push({ids:batch.map(p=>p.id),routes,mode,closes:mode==='closes'?best.kills:[]});
    for(const p of batch)built.add(p.id);
    continue;
   }
   // Every remaining approach crosses an installed part: take the insertion
   // with the fewest collisions and tell the builder which parts are in the way.
   const forced=remaining.filter(p=>!waiting(p,built)||remaining.every(o=>waiting(o,built))).flatMap(p=>routesOf(p)
    .filter(r=>r.contacts.some(c=>built.has(c.target)))
    .map(r=>({p,r,hits:r.blockedBy.filter(id=>built.has(id))})))
    .sort((a,b)=>a.hits.length-b.hits.length||priorities.get(a.p.id)-priorities.get(b.p.id)||compare(a.p,b.p))[0];
   if(!forced)return null;
   plan.push({ids:[forced.p.id],routes:new Map([[forced.p.id,forced.r]]),mode:forced.hits.length?'forced':null,hits:forced.hits});
   built.add(forced.p.id);
  }
  return built.size===core.size?plan:null;
 }
 function append(added,joint,requires,title,note){
  for(const p of added){included.add(p.id);emitted.add(p.id);}
  steps.push({title,note,type:'assembly',requires:[...new Set(requires)].filter(id=>!added.some(p=>p.id===id)),added:added.map(entry),joint,
   // A step carrying the Brain/electronics belongs to the late module region.
   region:added.some(p=>lateKind(p))?90:Math.min(...added.filter(p=>p.id!==root.id||added.length===1).map(p=>regions.get(p.id)??0)),overviewDirection:[1,.8,1],parts:parts.filter(p=>emitted.has(p.id)).sort(compare).map(p=>structuredClone(p))});
 }
 while(emitted.size<core.size){
  const recent=prioritizeMountedElectronics?new Set(steps.at(-1)?.added.map(p=>p.id)):null;
  const rank=p=>recent?priority(p,recent):priorities.get(p.id);
  const available=members.filter(p=>!included.has(p.id)&&builtLinks(p).some(c=>mountable(p,c,included))&&!waiting(p)).sort((a,b)=>region(a)-region(b)||rank(a)-rank(b)||area(a)-area(b)||builtLinks(b).length-builtLinks(a).length||compare(a,b));
  if(!available.length&&!planned?.length){if(core.size===1){append([root],null,[],`Đặt ${nameFor(root)} theo hình`,'Đặt chi tiết trên mặt phẳng theo hướng trong hình.');break;}return {ready:false,steps:[],blockers:[`Không tìm được bước lắp ${platformName} có chi tiết đỡ hợp lệ. Kiểm tra các khớp và thứ tự cụm trên trục.`],notes};}
  const action=planned?.shift(),part=action?byId.get(action.ids[0]):available[0],route=action?.routes.get(part.id),edge=primary(part,included,route)||route?.contacts.find(c=>included.has(c.target))||builtLinks(part)[0],parent=byId.get(edge.target),targetRef=ref(parent,edge.targetRef);
  let batch=[part];
  if(action)batch=action.ids.map(id=>byId.get(id));
  else if(part.kind==='pin')batch=available.filter(p=>{
   if(p.sku!==part.sku||p.kind!=='pin')return false;const c=primary(p);if(c.target!==parent.id)return false;
   const n=worldReference(parent,ref(parent,c.targetRef)).normal,axis=worldReference(parent,targetRef).normal;
   return n.dot(axis)>.999;
  });
  const requires=[];
  for(const p of batch){const c=primary(p,included,action?.routes.get(p.id))||action?.routes.get(p.id)?.contacts.find(c=>included.has(c.target)||batch.some(b=>b.id===c.target))||builtLinks(p)[0];
   // A shaft needs its first support, not every secondary bore along its length.
   // Later closing beams can be slid onto the supported shaft. Keep all mounting
   // prerequisites for bodies/pins and the audited blocked-path constraints.
   requires.push(...(p.kind==='shaft'?[c.target]:builtLinks(p).map(c=>c.target)),...stackedOnShaft(p,c));
   p.mate={target:c.target,sourceRef:c.sourceRef,targetRef:c.targetRef,depth:c.depth,twist:0,flip:false};}
  const first=emitted.size===0;if(first)batch.unshift(root);
  // A prebuilt pin (from an earlier phase) has no snapshot mate; name the body it sits in.
  const support=parent.kind==='pin'?byId.get(parent.mate?.target)||links.get(parent.id).map(c=>byId.get(c.target)).find(p=>p&&p.kind!=='pin'&&included.has(p.id))||parent:parent;
  const count=batch.filter(p=>p.kind==='pin').length;
  const title=part.kind==='motor'&&parent.kind==='shaft'?`Lắp ${nameFor(part)} vào cụm trục và chốt gá`:count?`Lắp ${count>1?count+' ':''}${nameFor(part)} vào ${nameFor(support)}`:`Lắp ${nameFor(part)} vào ${nameFor(support)}`;
  let note=part.kind==='pin'?`Cắm ${count} chốt vào các lỗ được đánh dấu trên ${nameFor(parent)}, theo cùng một hướng. Lắp từng chốt vào chi tiết đỡ trước khi ghép mảnh tiếp theo.`:
   part.kind==='shaft'?`Canh đầu trục với các lỗ đỡ${targetRef.id==='motor-output'?' và lỗ truyền động của motor':''}, rồi luồn trục theo hướng mũi tên. Chưa lắp vòng chặn ngoài ở bước này.`:
   part.kind==='retainer'?`${/spacer/i.test(nameFor(part))?'Luồn vòng đệm':'Lắp vòng chặn'} vào trục sau các chi tiết phía trong. Giữ đúng vị trí trong hình; chừa khe cho cụm quay tự do.`:
   parent.kind==='shaft'&&ref(part,edge.sourceRef)?.kind==='hole'?`Luồn lỗ của ${nameFor(part)} vào ${nameFor(parent)} theo mũi tên. Đẩy đến vị trí trong hình bên phải.`:
   `Canh các lỗ và chốt đã lắp trên ${nameFor(support)}, rồi ghép ${nameFor(part)} theo hướng mũi tên. Giữ cụm để các chốt không tuột.`;
  const joint={part:part.id,...part.mate};append(batch,joint,requires,title,note);
  if(route){const step=steps.at(-1),prior=new Set(step.parts.filter(p=>!batch.some(a=>a.id===p.id)).map(p=>p.id));if(first)prior.add(root.id);step.insertion={axis:route.axis,clearance:Math.max(5,...[...prior].map(id=>route.clearanceByPart[id]||0)),blockedBy:[...new Set(batch.flatMap(p=>action.routes.get(p.id)?.blockedBy||[]))],method:'sampled-cad-path'};
   if(part.kind==='shaft')step.note=`Đưa đầu trục vào lỗ đầu tiên trên ${nameFor(parent)}, từ phía mũi tên. Luồn tiếp qua các lỗ thẳng hàng; không đưa đầu có gờ/chặn xuyên qua lỗ. Giữ trục bằng tay cho đến khi có chi tiết đỡ tiếp theo.`;
   if(part.kind==='motor'&&parent.kind==='shaft')step.note=`Canh đồng thời lỗ truyền động với đầu trục và các lỗ gá với ${new Set(builtLinks(part).filter(c=>byId.get(c.target).kind==='pin').map(c=>c.target)).size} chốt trên khung. Đưa motor thẳng theo mũi tên; giữ trục để không đẩy trục tuột khỏi lỗ đỡ.`;
   if(action.mode==='threaded'){
    const hubs=batch.filter(p=>p.id!==part.id&&p.id!==root.id).map(nameFor);
    step.title=`Luồn ${nameFor(part)} qua ${hubs.join(', ')}`;
    step.note=`Giữ ${hubs.join(', ')} thẳng hàng giữa các lỗ đỡ như hình, rồi luồn ${nameFor(part)} qua lần lượt từng chi tiết theo mũi tên. Đầu có nắp/gờ của trục phải ở phía ngoài.`;
   }else if(action.mode==='together'){
    const names=batch.filter(p=>p.id!==root.id).map(nameFor);
    step.title=`Lắp đồng thời ${names.join(' và ')}`;
    step.note=`Hai chi tiết này khoá lẫn nhau: lắp riêng từng chiếc thì chiếc sau không còn đường vào. Đưa cả hai vào cùng lúc, canh các chốt rồi ấn đều cho đến khi khớp như hình.`;
    step.pathConflict='together';
   }else if(action.mode==='forced'){
    const names=[...new Set(action.hits.map(id=>nameFor(byId.get(id))))].slice(0,3);
    step.pathConflict='forced';step.insertion.blockedBy=[...action.hits];
    step.note=`CAD cho thấy ${nameFor(part)} chạm ${names.join(', ')} khi lắp thẳng theo mũi tên. Nới nhẹ ${names.length>1?'các chi tiết này':'chi tiết này'} hoặc lắp ${nameFor(part)} trước khi đóng chúng; kiểm tra lại mô hình nếu chi tiết không thể vào.`;
   }
  }
 }
 consolidateSteps(steps);
 if(pathAudit){const owners=new Map(steps.flatMap((s,i)=>s.added.map(p=>[p.id,i])));for(const [i,s] of steps.entries())for(const id of s.insertion?.blockedBy||[]){const after=owners.get(id);if(after>i)steps[after].requires=[...new Set([...steps[after].requires,...s.added.map(p=>p.id)])];}}
 if(loose.length){notes.push('Electronics without modeled mounting joints are shown separately at the end.');append(loose,null,[],`Kiểm tra vị trí ${loose.map(nameFor).join(', ')}`,'CAD chưa xác định khớp gá; cần kiểm tra cách cố định thiết bị trước khi lắp thực tế.');steps.at(-1).type='electronics';}
 const conflicts=steps.filter(step=>step.pathConflict).length;
 if(pathSearch?.bestEffort)notes.push(`Không có thứ tự lắp từng chi tiết hoàn toàn thông thoáng theo CAD. ${conflicts} bước cần lắp đồng thời hoặc nới chi tiết đã lắp; các bước này được đánh dấu.`);
 const overlaps=pathAudit?[...new Set([...pathAudit].flatMap(([id,routes])=>core.has(id)?routes.flatMap(route=>(route.interference||[]).filter(other=>core.has(other)).map(other=>[id,other].sort().join('|'))):[]))]:[];
 if(overlaps.length)notes.push(`${overlaps.length} cặp chi tiết đang chồng lấn trong mô hình CAD (thường do thanh chéo lệch lưới). Đường lắp giữa các cặp này không được kiểm tra; xem mục Kiểm tra khớp.`);
 return {ready:true,steps,blockers:[],notes,pathSearch,...(pathSearch?.bestEffort?{reviewRequired:true}:{}),pathCheck:pathAudit?{method:'sampled-cad-path',incrementMM:1,physicalTested:false,...(pathSearch?.bestEffort?{bestEffort:true,conflicts}:{}),...(overlaps.length?{interference:overlaps.length}:{})}:null};
}
