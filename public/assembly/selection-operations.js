import {groupAncestors,groupMembers,layerLocked,dissolveGroup} from './assembly-review.js';

function selectedParts(project,ids){
 const selected=new Set(ids),parts=project.parts.filter(part=>selected.has(part.id));
 if(!parts.length||parts.length!==selected.size)throw Error('Choose existing parts to edit.');
 if(parts.some(part=>layerLocked(project,part)))throw Error('Unlock selected layers before editing their group.');
 return parts;
}

// Prepare first, then let the editor stage and commit the entire copy as one edit.
export function copySelection(project,ids,{groupId,idFactory=()=>crypto.randomUUID()}={}){
 const parts=selectedParts(project,ids),selected=new Set(parts.map(part=>part.id));
 if(project.parts.length+parts.length>250)throw Error('Maximum 250 parts. Not enough room for this selection.');
 const groups=project.groups.filter(group=>{
  if(!groupId&&parts.length===1)return false;
  if(groupId&&group.id!==groupId&&!groupAncestors(project,group).some(parent=>parent.id===groupId))return false;
  const members=groupMembers(project,group.id);
  return members.length&&members.every(part=>selected.has(part.id));
 });
 const partIds=new Map(parts.map(part=>[part.id,idFactory()])),groupIds=new Map(groups.map(group=>[group.id,idFactory()]));
 const usedNames=new Set(project.groups.map(group=>group.name));
 const copiedGroups=groups.map(group=>{
  const next=structuredClone(group);next.id=groupIds.get(group.id);
  if(groupIds.has(group.parentId))next.parentId=groupIds.get(group.parentId);
  else{
   delete next.parentId;let number=1,name;
   do{name=group.name.slice(0,105)+' copy'+(number===1?'':` ${number}`);number++;}while(usedNames.has(name));
   next.name=name;usedNames.add(name);
  }
  return next;
 });
 const copiedParts=parts.map(part=>{
  const next=structuredClone(part);next.id=partIds.get(part.id);delete next.snapBlocked;
  if(groupIds.has(part.groupId))next.groupId=groupIds.get(part.groupId);else delete next.groupId;
  if(partIds.has(part.mate?.target))next.mate.target=partIds.get(part.mate.target);else delete next.mate;
  if(partIds.has(part.wiring?.brain))next.wiring.brain=partIds.get(part.wiring.brain);else delete next.wiring;
  return next;
 });
 return {parts:copiedParts,groups:copiedGroups,ids:copiedParts.map(part=>part.id),groupId:groupIds.get(groupId)||null};
}

export function ungroupSelection(project,ids,groupId){
 const parts=selectedParts(project,ids),selected=new Set(parts.map(part=>part.id));
 if(groupId&&!project.groups.some(group=>group.id===groupId&&groupMembers(project,group.id).length&&groupMembers(project,group.id).every(part=>selected.has(part.id))))throw Error('Selection does not match the chosen group.');
 const complete=project.groups.filter(group=>{
  if(groupId)return group.id===groupId;
  const members=groupMembers(project,group.id);
  return members.length&&members.every(part=>selected.has(part.id));
 });
 if(complete.some(group=>layerLocked(project,group)))throw Error('Unlock selected groups before ungrouping.');
 const completeIds=new Set(complete.map(group=>group.id));
 const roots=complete.filter(group=>!groupAncestors(project,group).some(parent=>completeIds.has(parent.id)));
 const covered=new Set(roots.flatMap(group=>groupMembers(project,group.id).map(part=>part.id)));
 for(const group of roots)dissolveGroup(project,group.id);
 for(const part of parts){
  if(covered.has(part.id)||!part.groupId)continue;
  const parent=project.groups.find(group=>group.id===part.groupId)?.parentId;
  if(parent)part.groupId=parent;else delete part.groupId;
 }
 return {groupIds:roots.map(group=>group.id),ids:parts.map(part=>part.id)};
}
