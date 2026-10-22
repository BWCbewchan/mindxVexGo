import assert from 'node:assert/strict';
import {copySelection,ungroupSelection} from '../public/assembly/selection-operations.js';

const fixture=()=>({parts:[
 {id:'beam',sku:'beam',label:'Beam',position:[10,20,30],rotation:[0,90,0],groupId:'inner'},
 {id:'pin',sku:'pin',label:'Pin',position:[20,20,30],rotation:[0,90,0],groupId:'inner',mate:{target:'beam',sourceRef:'p',targetRef:'h',depth:2}},
 {id:'motor',sku:'motor',label:'Motor',position:[30,20,30],rotation:[0,0,0],groupId:'outer',mate:{target:'outside'},wiring:{brain:'outside',port:'1'}},
 {id:'outside',sku:'brain',position:[100,20,30],rotation:[0,0,0]}
],groups:[{id:'inner',name:'Inner',parentId:'outer',visible:true},{id:'outer',name:'Outer',visible:true}]});
let serial=0;const idFactory=()=>`new-${++serial}`;
{
 const p=fixture(),before=structuredClone(p),result=copySelection(p,['beam','pin','motor'],{groupId:'outer',idFactory});
 assert.deepEqual(p,before,'Preparing a copy must not mutate the original');
 assert.equal(result.parts.length,3);assert.equal(result.groups.length,2);
 assert.equal(result.parts[1].mate.target,result.parts[0].id,'Internal mate must point at the copied part');
 assert.equal(result.parts[2].mate,undefined,'External mate must be detached');
 assert.equal(result.parts[2].wiring,undefined,'A duplicate must not occupy the original external Brain port');
 const inner=result.groups.find(g=>g.name==='Inner'),outer=result.groups.find(g=>g.id===result.groupId);
 assert.equal(inner.parentId,outer.id);assert.equal(outer.parentId,undefined);
 assert.equal(result.parts[0].groupId,inner.id);
 assert.deepEqual(result.parts.map(p=>p.position),before.parts.slice(0,3).map(p=>p.position));
 assert.deepEqual(result.parts.map(p=>p.rotation),before.parts.slice(0,3).map(p=>p.rotation));
}
{
 const p=fixture();p.parts=p.parts.filter(p=>p.id!=='motor');
 const result=copySelection(p,['beam','pin'],{groupId:'inner',idFactory});
 assert.equal(result.groups.length,1,'Copying a child folder must not copy its equal-membership parent');
 assert.equal(result.groups[0].parentId,undefined);
 assert.equal(result.groupId,result.groups[0].id);
 ungroupSelection(p,['beam','pin'],'inner');
 assert.deepEqual(p.groups.map(g=>g.id),['outer']);
 assert.ok(p.parts.filter(p=>p.id!=='outside').every(p=>p.groupId==='outer'));
}
{
 const p=fixture(),result=copySelection(p,['pin'],{idFactory});
 assert.equal(result.groups.length,0);assert.equal(result.parts[0].groupId,undefined);assert.equal(result.parts[0].mate,undefined);
 ungroupSelection(p,['pin']);assert.equal(p.parts.find(p=>p.id==='pin').groupId,'outer','A member leaves just one folder level');
}
{
 const p=fixture();p.parts[3].groupId='other';p.groups.push({id:'other',name:'Other'});
 ungroupSelection(p,p.parts.map(p=>p.id));
 assert.deepEqual(p.groups.map(g=>g.id),['inner'],'Ungroup several complete roots but preserve nested folders');
 assert.equal(p.parts.find(p=>p.id==='beam').groupId,'inner');
 assert.equal(p.parts.find(p=>p.id==='motor').groupId,undefined);
}
{
 const p=fixture();p.groups.find(g=>g.id==='outer').locked=true;const before=structuredClone(p);
 assert.throws(()=>copySelection(p,['beam'],{idFactory}),/lock/i);
 assert.throws(()=>ungroupSelection(p,['beam']),/lock/i);assert.deepEqual(p,before);
}
{
 const p=fixture();p.parts.push(...Array.from({length:246},(_,i)=>({id:`extra-${i}`,sku:'beam'})));
 assert.throws(()=>copySelection(p,['beam'],{idFactory}),/250/);
}
{
 const p=fixture();p.parts[2].wiring={brain:'outside',port:'1'};
 const result=copySelection(p,['motor','outside'],{idFactory});
 assert.equal(result.parts[0].wiring.brain,result.parts[1].id,'Internal wiring must be remapped');
}
console.log('PASS: nested selection, copied hierarchy, mate/wiring remapping, partial/multiple ungroup, locks and capacity.');
