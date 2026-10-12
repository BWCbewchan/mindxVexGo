import {attachmentReferences,worldReference} from './mating.js';
import {compatibleReferences,insertionLimit} from './connector-policy.js';
import {PLATFORM} from './platform.js';

// Derived contacts complement the editing tree; they never teleport or certify parts.
export function seatedConnections(parts,references,tolerance=.25){
 const pins=[],holes=[],result=[];
 for(const part of parts)for(const ref of attachmentReferences(references[part.sku]||[])){
  const item={part,ref,...worldReference(part,ref)};(ref.kind==='pin'?pins:holes).push(item);
 }
 for(const a of holes)for(const b of pins){
  if(a.part.id===b.part.id||!compatibleReferences(a.ref,b.ref,a.part.sku,b.part.sku)||a.normal.dot(b.normal)>-.999)continue;
  const offset=a.point.clone().sub(b.point),depth=-offset.dot(b.normal),gap=offset.addScaledVector(b.normal,depth).length();
  if(gap>tolerance||depth<.1||depth>insertionLimit(a.ref,b.ref)+.15)continue;
  // A through bore has two analytic faces. Keep the entry face facing the pin tip.
  result.push({part:a.part.id,target:b.part.id,sourceRef:a.ref.id,targetRef:b.ref.id,depth,gap,profile:b.ref.profile||'round'});
 }
 return result;
}
export function jointMetrics(part,target,a,b){
 if(!target||!compatibleReferences(a,b,part.sku,target.sku))return {valid:false,reason:'Khớp thiếu hoặc không tương thích.'};
 const from=worldReference(part,a),to=worldReference(target,b),offset=from.point.sub(to.point),depth=-offset.dot(to.normal),gap=offset.addScaledVector(to.normal,depth).length();
 const valid=gap<=.25&&Math.abs(from.normal.dot(to.normal))>=.999&&depth>=-.15&&depth<=insertionLimit(a,b)+.15;
 return {valid,depth,gap,reason:valid?'Đúng trục khớp CAD.':`Lệch tâm ${gap.toFixed(2)} mm hoặc sai hướng/độ sâu. Đưa về đúng lỗ trước khi nối.`};
}
export function reviewMechanics(parts,references,connections=seatedConnections(parts,references)){
 const issues=[],byId=new Map(parts.map(p=>[p.id,p]));
 for(const part of parts)if(part.mate){const target=byId.get(part.mate.target),a=references[part.sku]?.find(r=>r.id===part.mate.sourceRef),b=references[target?.sku]?.find(r=>r.id===part.mate.targetRef),metrics=jointMetrics(part,target,a,b);if(!metrics.valid)issues.push({kind:'joint',ids:[part.id,target?.id].filter(Boolean),message:metrics.reason});}
 const wheel=p=>PLATFORM.id==='vexiq'?p?.kind==='wheel':['228-2500-1383','228-2500-1384'].includes(p?.sku),retainer=p=>PLATFORM.id==='vexiq'?p?.kind==='retainer':['228-2500-143','228-2500-154'].includes(p?.sku);
 for(const part of parts.filter(p=>PLATFORM.electronics.includes(p.sku))){const mounts=connections.filter(c=>c.profile==='round'&&(c.part===part.id||c.target===part.id));if(mounts.length<2)issues.push({kind:'mount',ids:[part.id],message:mounts.length?'Thiết bị mới được giữ bằng một chốt. Thêm điểm giữ để hạn chế xoay.':'Thiết bị chưa có chốt giữ vào khung theo CAD. Lắp cụm đỡ trước khi vận hành.'});}
 const links=new Map(parts.map(p=>[p.id,new Set()]));for(const c of connections){links.get(c.part)?.add(c.target);links.get(c.target)?.add(c.part);}const seen=new Set(),components=[];for(const p of parts){if(seen.has(p.id))continue;const component=[],queue=[p.id];seen.add(p.id);while(queue.length){const id=queue.shift();component.push(id);for(const next of links.get(id)||[])if(!seen.has(next)){seen.add(next);queue.push(next);}}components.push(component);}if(components.length>1){components.sort((a,b)=>b.length-a.length);for(const component of components.slice(1))issues.push({kind:'disconnected',ids:component,message:`Cụm ${component.length} chi tiết chưa khớp hình học với cụm chính. Chọn để kiểm tra điểm nối.`});}
 for(const part of parts.filter(wheel)){
  const contact=connections.find(c=>c.part===part.id),axle=byId.get(contact?.target);
  if(!contact||!axle){issues.push({kind:'support',ids:[part.id],message:'Bánh chưa có trục/chốt khớp hình học. Chọn lỗ giữa bánh để lắp.'});continue;}
  const outer=connections.find(c=>c.target===axle.id&&c.targetRef===contact.targetRef&&retainer(byId.get(c.part))&&c.depth<contact.depth);
  if(!outer)issues.push({kind:'retention',ids:[part.id,axle.id],message:'Chưa tìm thấy vòng chặn ngoài bánh trên cùng đầu trục. Kiểm tra Shaft Collar / Spacer để giữ bánh.'});
  if(contact.depth<1)issues.push({kind:'engagement',ids:[part.id,axle.id],message:'Bánh ăn vào đầu trục dưới 1 mm theo CAD. Kiểm tra lại chiều dài và vị trí bánh.'});
 }
 return issues;
}
export function groupAncestors(project,item){
 const rows=[],seen=new Set();let id=item?.sku?item.groupId:item?.parentId;
 while(id&&!seen.has(id)){seen.add(id);const group=project.groups.find(g=>g.id===id);if(!group)break;rows.push(group);id=group.parentId;}return rows;
}
export function layerLocked(project,item){return !!item?.locked||groupAncestors(project,item).some(g=>g.locked);}
export function layerVisible(project,item){return item?.visible!==false&&groupAncestors(project,item).every(g=>g.visible!==false);}
export function groupMembers(project,id){return project.parts.filter(p=>p.groupId===id||groupAncestors(project,p).some(g=>g.id===id));}
export function validGroupTree(groups){
 const map=new Map(groups.map(g=>[g.id,g]));
 return groups.every(g=>{const seen=new Set([g.id]);let id=g.parentId;while(id){if(seen.has(id)||!map.has(id))return false;seen.add(id);id=map.get(id).parentId;}return true;});
}
export function groupSelection(project,ids,group){
 const selected=new Set(ids),complete=project.groups.filter(g=>{const members=groupMembers(project,g.id);return members.length&&members.every(p=>selected.has(p.id));});
 const completeIds=new Set(complete.map(g=>g.id)),roots=complete.filter(g=>!groupAncestors(project,g).some(a=>completeIds.has(a.id)));
 const covered=new Set(roots.flatMap(g=>groupMembers(project,g.id).map(p=>p.id)));
 project.groups.push(group);for(const g of roots)g.parentId=group.id;for(const p of project.parts)if(selected.has(p.id)&&!covered.has(p.id))p.groupId=group.id;
 return group.id;
}
export function dissolveGroup(project,id){
 const group=project.groups.find(g=>g.id===id);if(!group)return;
 for(const p of project.parts)if(p.groupId===id){if(group.parentId)p.groupId=group.parentId;else delete p.groupId;}
 for(const g of project.groups)if(g.parentId===id){if(group.parentId)g.parentId=group.parentId;else delete g.parentId;}
 project.groups=project.groups.filter(g=>g.id!==id);
}
