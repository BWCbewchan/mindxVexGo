import {guidePartPriority,isGuideElectronic} from './guide-priority.js';
import {seatedConnections,jointMetrics} from './assembly-review.js';
import {worldReference} from './mating.js';
import {analyzeIQInsertionPaths} from './iq-insertion-paths.js';

// IQ mounting parts have integral pins and several simultaneous contacts. The
// single editing mate is not an assembly dependency (and may point either way).
export function generateIQGuide(input,{references={},nameFor=p=>p.label||p.sku,isElectronic=()=>false,inferConnections=false,objects=null,insertionPaths=null,platformName='VEX IQ',rootId=null,prioritizeMountedElectronics=false}={}){
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
 if(mechanical.length!==1)blockers.push(mechanical.length?'Connect the separate mechanical assemblies before exporting.':'Add mechanical parts before exporting.');
 if(blockers.length)return {ready:false,steps:[],blockers:[...new Set(blockers)],notes};
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
 const root=(rootId?members.find(p=>p.id===rootId):null)||[...(roots.length?roots:members)].sort((a,b)=>area(b)*(1+degree(b)*.05)-area(a)*(1+degree(a)*.05)||compare(a,b))[0];
 // Only snapshots are re-rooted. The document and all authored CAD poses stay intact.
 for(const p of parts)delete p.mate;
 const included=new Set([root.id]),emitted=new Set(),steps=[];
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
 function mountable(part,contact,built){
  if(!built.has(contact.target))return false;
  if(!pathAudit&&isShaftMount(part,contact)&&preferredShaftEnd(part,contact.target)!==contact.targetRef)return false;
  return innerShaftParts(part,contact).every(id=>built.has(id));
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
 let planned=null;
 if(pathAudit&&core.size>1){
  const failed=new Set();let searches=0;
  const clear=(route,built)=>route.blockedBy.every(id=>!built.has(id));
  const options=(p,built)=>(pathAudit.get(p.id)||[]).filter(r=>clear(r,built)&&r.contacts.some(c=>mountable(p,c,built)));
  function search(built,recent){
   if(built.size===core.size)return [];
   const key=members.map(p=>built.has(p.id)?'1':'0').join('');if(failed.has(key)||++searches>10000)return null;
   const candidates=members.filter(p=>!built.has(p.id)&&!waiting(p,built)&&options(p,built).length).sort((a,b)=>priority(a,recent)-priority(b,recent)||area(a)-area(b)||builtLinks(b,built).length-builtLinks(a,built).length||compare(a,b));
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
  planned=search(new Set([root.id]),new Set([root.id]));
  if(!planned)return {ready:false,steps:[],blockers:['Chưa tìm được đường lắp từng chi tiết mà không xuyên khung. Cần chuẩn bị cụm riêng trước khi đóng khung; không xuất thứ tự lắp chưa được kiểm tra.'],notes,pathSearch:{rootId:root.id,states:searches,budget:10000,budgetExceeded:searches>10000}};
 }
 function append(added,joint,requires,title,note){
  for(const p of added){included.add(p.id);emitted.add(p.id);}
  steps.push({title,note,type:'assembly',requires:[...new Set(requires)].filter(id=>!added.some(p=>p.id===id)),added:added.map(p=>({id:p.id,sku:p.sku,name:nameFor(p)})),joint,
   overviewDirection:[1,.8,1],parts:parts.filter(p=>emitted.has(p.id)).sort(compare).map(p=>structuredClone(p))});
 }
 while(emitted.size<core.size){
  const recent=prioritizeMountedElectronics?new Set(steps.at(-1)?.added.map(p=>p.id)):null;
  const rank=p=>recent?priority(p,recent):priorities.get(p.id);
  const available=members.filter(p=>!included.has(p.id)&&builtLinks(p).some(c=>mountable(p,c,included))&&!waiting(p)).sort((a,b)=>rank(a)-rank(b)||area(a)-area(b)||builtLinks(b).length-builtLinks(a).length||compare(a,b));
  if(!available.length){if(core.size===1){append([root],null,[],`Đặt ${nameFor(root)} theo hình`,'Đặt chi tiết trên mặt phẳng theo hướng trong hình.');break;}return {ready:false,steps:[],blockers:[`Không tìm được bước lắp ${platformName} có chi tiết đỡ hợp lệ. Kiểm tra các khớp và thứ tự cụm trên trục.`],notes};}
  const action=planned?.shift(),part=action?byId.get(action.ids[0]):available[0],route=action?.routes.get(part.id),edge=primary(part,included,route),parent=byId.get(edge.target),targetRef=ref(parent,edge.targetRef);
  let batch=[part];
  if(action)batch=action.ids.map(id=>byId.get(id));
  else if(part.kind==='pin')batch=available.filter(p=>{
   if(p.sku!==part.sku||p.kind!=='pin')return false;const c=primary(p);if(c.target!==parent.id)return false;
   const n=worldReference(parent,ref(parent,c.targetRef)).normal,axis=worldReference(parent,targetRef).normal;
   return n.dot(axis)>.999;
  });
  const requires=[];
  for(const p of batch){const c=primary(p,included,action?.routes.get(p.id));
   // A shaft needs its first support, not every secondary bore along its length.
   // Later closing beams can be slid onto the supported shaft. Keep all mounting
   // prerequisites for bodies/pins and the audited blocked-path constraints.
   requires.push(...(p.kind==='shaft'?[c.target]:builtLinks(p).map(c=>c.target)),...innerShaftParts(p,c));
   p.mate={target:c.target,sourceRef:c.sourceRef,targetRef:c.targetRef,depth:c.depth,twist:0,flip:false};}
  const first=emitted.size===0;if(first)batch.unshift(root);
  const support=parent.kind==='pin'?byId.get(parent.mate?.target)||parent:parent;
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
  }
 }
 if(pathAudit){const owners=new Map(steps.flatMap((s,i)=>s.added.map(p=>[p.id,i])));for(const [i,s] of steps.entries())for(const id of s.insertion?.blockedBy||[]){const after=owners.get(id);if(after>i)steps[after].requires=[...new Set([...steps[after].requires,...s.added.map(p=>p.id)])];}}
 if(loose.length){notes.push('Electronics without modeled mounting joints are shown separately at the end.');append(loose,null,[],`Kiểm tra vị trí ${loose.map(nameFor).join(', ')}`,'CAD chưa xác định khớp gá; cần kiểm tra cách cố định thiết bị trước khi lắp thực tế.');steps.at(-1).type='electronics';}
 return {ready:true,steps,blockers:[],notes,pathCheck:pathAudit?{method:'sampled-cad-path',incrementMM:1,physicalTested:false}:null};
}
