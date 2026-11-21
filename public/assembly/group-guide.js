import {generateStudentGuide} from './guide-sequence.js?v=guide-drive-100';
import {groupAncestors,validGroupTree,seatedConnections} from './assembly-review.js';

export function generateGroupGuide(project,{nameFor=part=>part.label||part.sku,references={}}={}){
 const parts=structuredClone(project.parts),groups=project.groups||[];
 const empty={ready:false,steps:[],notes:[],blockers:[]};
 if(!parts.length)return {...empty,blockers:['Thêm chi tiết vào mô hình để xuất hướng dẫn.']};
 if(!validGroupTree(groups)||new Set(groups.map(group=>group.id)).size!==groups.length)return {...empty,blockers:['Cấu trúc group không hợp lệ. Kiểm tra group cha trong Layers.']};
 const byId=new Map(groups.map(group=>[group.id,group])),buckets=new Map();
 for(const part of parts){
  const own=byId.get(part.groupId),ancestors=groupAncestors(project,part);
  const group=ancestors.at(-1)||own,key=group?'group:'+group.id:'part:'+part.id;
  if(!buckets.has(key))buckets.set(key,{group,parts:[]});
  buckets.get(key).parts.push(part);
 }
 const rootOrder=new Map(groups.filter(group=>!group.parentId).map((group,i)=>['group:'+group.id,i]));
 const priority=unit=>(unit.group||unit.parts[0]).layerPriority??Infinity;
 const ordered=[...buckets].sort(([a,left],[b,right])=>priority(left)-priority(right)||(rootOrder.get(a)??groups.length)-(rootOrder.get(b)??groups.length));
 const options={nameFor,references,inferConnections:true,prioritizeMountedElectronics:true};
 if(!ordered.some(([,bucket])=>bucket.group))return generateStudentGuide(parts,options);
 const steps=[],notes=[],entry=p=>({id:p.id,sku:p.sku,name:nameFor(p)});
 const units=ordered.map(([,bucket])=>({...bucket,ids:new Set(bucket.parts.map(p=>p.id))}));
 const contacts=[...seatedConnections(parts,references),...parts.filter(p=>p.mate).map(p=>({part:p.id,...p.mate}))];
 // A layer folder can contain pieces that only meet through another folder.
 // Carry those pieces as independent subassemblies until a support is present.
 const neighbors=new Map(parts.map(p=>[p.id,[]]));
 for(const c of contacts){
  if(!neighbors.has(c.part)||!neighbors.has(c.target))continue;
  neighbors.get(c.part).push(c.target);neighbors.get(c.target).push(c.part);
 }
 function connectedUnits(unit){
  if(!unit.group)return [unit];
  const remaining=new Set(unit.ids),pieces=[];
  for(const row of unit.parts){
   if(!remaining.delete(row.id))continue;
   const ids=new Set([row.id]);
   for(const id of ids)for(const neighbor of neighbors.get(id)){
    if(remaining.delete(neighbor))ids.add(neighbor);
   }
   pieces.push({group:unit.group,ids,parts:unit.parts.filter(p=>ids.has(p.id))});
  }
  return pieces;
 }
 function prepare(unit){
  if(!unit.group)return;
  const children=groups.filter(g=>g.parentId===unit.group.id).sort((a,b)=>(a.layerPriority??Infinity)-(b.layerPriority??Infinity)).map(group=>{
   const members=unit.parts.filter(p=>groupAncestors(project,p).some(ancestor=>ancestor.id===group.id));
   return {group,parts:members,ids:new Set(members.map(p=>p.id))};
  }).filter(child=>child.parts.length).flatMap(connectedUnits);
  const rows=structuredClone(unit.parts);
  for(const row of rows)if(row.mate&&!unit.ids.has(row.mate.target))delete row.mate;
  const plan=rows.length>1?generateStudentGuide(rows,options):null;
  if(children.length){
   for(const child of children){const failure=prepare(child);if(failure)return failure;}
   const rank=new Map((plan?.steps||[]).flatMap(s=>s.added).map((p,i)=>[p.id,i]));
   const direct=unit.parts.filter(p=>p.groupId===unit.group.id).sort((a,b)=>(rank.get(a.id)??Infinity)-(rank.get(b.id)??Infinity));
   return assemble([...children,...direct.map(p=>({parts:[p],ids:new Set([p.id])}))].sort((a,b)=>priority(a)-priority(b)),unit.group);
  }
  if(plan&&!plan.ready){
   const first=rows.find(row=>!row.mate)||rows[0];
   steps.push({title:unit.group.name+' · Chuẩn bị '+nameFor(first),groupId:unit.group.id,groupName:unit.group.name,groupPhase:'prepare',added:[entry(first)],parts:[first],note:'Đặt chi tiết đỡ lên bàn.'});
   return assemble([first,...rows.filter(row=>row.id!==first.id)].map(p=>({parts:[p],ids:new Set([p.id])})),unit.group);
  }
  const actions=plan?.steps||[{title:'Chuẩn bị '+nameFor(rows[0]),added:rows.map(entry),parts:rows,note:'Đặt chi tiết lên bàn.'}];
  for(const action of actions)steps.push({...action,title:unit.group.name+' · '+action.title,groupId:unit.group.id,groupName:unit.group.name,groupPhase:'prepare'});
  notes.push(...(plan?.notes||[]));
 }
 function assemble(units,parent){
 const built=new Set(units[0].ids),pending=units.slice(1);
 function jointFor(unit){
  for(const c of contacts){
   if(unit.ids.has(c.part)&&built.has(c.target))return c;
   if(unit.ids.has(c.target)&&built.has(c.part))return {...c,part:c.target,target:c.part,sourceRef:c.targetRef,targetRef:c.sourceRef};
  }
 }
 while(pending.length){
  const index=pending.findIndex(unit=>jointFor(unit));
  if(index<0){
   const scope=new Set(units.flatMap(u=>[...u.ids]));
   const issues=pending.map(u=>{
    const name=u.group?.name||nameFor(u.parts[0]);
    const external=parent&&contacts.find(c=>u.ids.has(c.part)&&!scope.has(c.target)||u.ids.has(c.target)&&!scope.has(c.part));
    const message=external?name+' có khớp với chi tiết ngoài nhóm '+parent.name+'. Kiểm tra thứ tự ghép nhóm.':'Chưa có khớp nối giữa các cụm: '+name;
    return {message,ids:external?[external.part,external.target]:[...u.ids]};
   });
   return {...empty,blockers:issues.map(i=>i.message),focusIssues:issues};
  }
  const [unit]=pending.splice(index,1),joint=jointFor(unit);
  const members=[...unit.parts],pinJoints=[joint];
  const pin=unit.parts[0];
  const isPin=p=>p.kind==='pin'||['228-2500-2258','228-2500-2260','228-2500-2261','228-2500-328'].includes(p.sku);
  if(parent&&!unit.group&&members.length===1&&isPin(pin)){
   const holes=new Set([joint.targetRef]);
   for(let k=0;k<pending.length;){
    const next=pending[k],candidate=next.parts[0];
    const connection=!next.group&&next.parts.length===1&&candidate.sku===pin.sku&&jointFor(next);
    if(connection?.target!==joint.target||holes.has(connection.targetRef)){k++;continue;}
    holes.add(connection.targetRef);members.push(candidate);pinJoints.push(connection);pending.splice(k,1);
   }
  }
  for(const member of members)built.add(member.id);
  if(pinJoints.length>1){
   const support=parts.find(p=>p.id===joint.target);
   steps.push({type:'assembly',groupPhase:'join',groupId:parent.id,groupName:parent.name,joint,pinJoints,added:members.map(entry),parts:parts.filter(p=>built.has(p.id)),title:parent.name+' · Lắp '+members.length+' '+nameFor(pin)+' vào '+nameFor(support),note:'Cắm mỗi chốt vào một lỗ được đánh dấu trên '+nameFor(support)+'.',reviewRequired:true});
   continue;
  }
  const support=parts.find(p=>p.id===joint.target);
  steps.push({type:'assembly',groupPhase:'join',groupId:parent?.id||unit.group?.id,groupName:parent?.name,joiningGroup:unit.group?.name,joint,added:unit.parts.map(entry),parts:parts.filter(p=>built.has(p.id)),title:(parent?parent.name+' · ':'')+'Ghép '+(unit.group?.name||nameFor(unit.parts[0]))+' vào '+nameFor(support),note:unit.group?'Đưa cả cụm “'+unit.group.name+'” đã lắp tới '+nameFor(support)+', canh các điểm đánh dấu rồi ghép cụm vào khung.':'Canh '+nameFor(unit.parts[0])+' với '+nameFor(support)+' rồi lắp theo đường chỉ dẫn.',reviewRequired:true});
 }
 }
 const prepared=units.flatMap(connectedUnits);
 for(const unit of prepared){const failure=prepare(unit);if(failure)return failure;}
 const failedJoin=assemble(prepared,null);if(failedJoin)return failedJoin;
 return {ready:true,steps,notes,blockers:[],orderMode:'groups',groupPhases:true,reviewRequired:true};
}
