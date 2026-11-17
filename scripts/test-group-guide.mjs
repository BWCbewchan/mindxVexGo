import assert from 'node:assert/strict';
import {generateGroupGuide} from '../public/assembly/group-guide.js';
import {editGuide,stepKey} from '../public/assembly/guide-editing.js';

const project={groups:[{id:'a',name:'Cụm A'},{id:'b',name:'Cụm B'},{id:'child',name:'Con',parentId:'a'}],parts:[
 {id:'loose',sku:'x',position:[0,0,0],rotation:[0,0,0]},
 {id:'b1',sku:'x',groupId:'b',position:[0,0,0],rotation:[0,0,0]},
 {id:'a1',sku:'x',groupId:'a',position:[0,0,0],rotation:[0,0,0]},
 {id:'a2',sku:'x',groupId:'child',position:[0,0,0],rotation:[0,0,0]},
]};
const original=structuredClone(project),guide=generateGroupGuide(project);
assert.ok(guide.ready);assert.equal(guide.steps.length,3);
assert.deepEqual(guide.steps.map(step=>step.groupId),['a','b',null]);
assert.deepEqual(guide.steps[0].added.map(part=>part.id),['a1','a2']);
assert.deepEqual(guide.steps.at(-1).parts,project.parts);
const reversed=guide.steps.map(stepKey).reverse();
const reordered=editGuide(guide,{order:reversed},new Map());
assert.deepEqual(reordered.steps.map(stepKey),reversed);
assert.equal(new Set(reordered.steps.flatMap(step=>step.added.map(part=>part.id))).size,4);
assert.equal(reordered.steps.at(-1).parts.length,4);
assert.deepEqual(editGuide(guide,{order:['stale',stepKey(guide.steps[1])]},new Map()).steps.map(stepKey),guide.steps.map(stepKey));
assert.deepEqual(project,original);
assert.equal(generateGroupGuide({parts:[],groups:[]}).ready,false);
assert.equal(generateGroupGuide({...project,groups:[{id:'cycle',parentId:'cycle'}]}).ready,false);
console.log('PASS: Layers group order, nested groups, ungrouped parts, manual reorder, stale orders, cumulative frames, immutable data and invalid trees.');
