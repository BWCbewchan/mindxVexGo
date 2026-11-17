import {groupAncestors,validGroupTree} from './assembly-review.js';

export function generateGroupGuide(project,{nameFor=part=>part.label||part.sku}={}){
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
 const ordered=[...buckets].sort(([a],[b])=>(rootOrder.get(a)??groups.length)-(rootOrder.get(b)??groups.length));
 const included=new Set(),steps=[];
 for(const [,bucket] of ordered){
  const {group,parts:added}=bucket;
  added.forEach(part=>included.add(part.id));
  steps.push({type:'group',groupId:group?.id||null,groupName:group?.name||null,
   title:group?`Lắp cụm ${group.name}`:`Lắp ${nameFor(added[0])}`,
   note:group?`Chuẩn bị ${added.length} chi tiết của cụm ${group.name} theo hình bên trái. Hình bên phải thể hiện cụm trong mô hình sau bước này.`:'Lắp chi tiết theo vị trí trong mô hình sau bước này.',
   added:added.map(part=>({id:part.id,sku:part.sku,name:nameFor(part)})),
   parts:parts.filter(part=>included.has(part.id)),requires:[],joint:null,reviewRequired:true});
 }
 return {ready:true,steps,blockers:[],notes:[],orderMode:'groups',reviewRequired:true};
}
