import assert from 'node:assert/strict';

globalThis.location = {href:'http://localhost/assembly/iq/editor.html'};
const {editGuide,stepKey} = await import('../public/assembly/guide-editing.js');

function fixture(transform = value => value){
 const rows = [
  ['root',100,null,null],
  ['shaft',102,'root',[1,0,0]],
  ['outside-positive',154,'root',[1,0,0]],
  ['outside-negative',46,'root',[-1,0,0]],
  ['support-y',137,'root',[0,1,0]],
  ['support-z',137,'support-y',[0,0,-1]],
  ['inside-positive',110,'support-z',[1,0,0]],
  ['inside-negative',90,'root',[-1,0,0]],
 ];
 const parts = [],steps = [],paths = new Map();
 for(const [id,x,target,axis] of rows){
  const part = {id,sku:id,kind:id==='shaft'?'shaft':'body',position:transform([x,0,0]),rotation:[0,0,0]};
  const joint = target?{part:id,target,sourceRef:'plug',targetRef:'socket',depth:2}:null;
  parts.push(part);
  steps.push({added:[{id,sku:id,name:id}],joint,requires:target?[target]:[],parts:[...parts]});
  if(joint)paths.set(id,[{axis:transform(axis),contacts:[joint],blockedBy:[],clearanceByPart:{}}]);
 }
 return {guide:{ready:true,steps},paths};
}

const {guide,paths} = fixture();
const output = editGuide(guide,{},paths);
const order = output.steps.map(stepKey);
assert.equal(output.assemblyAxis,'X');
assert.ok(order.indexOf('support-y')<order.indexOf('support-z'));
assert.ok(order.indexOf('support-z')<order.indexOf('inside-positive'));
for(const inner of ['inside-positive','inside-negative'])for(const outer of ['outside-positive','outside-negative']){
 assert.ok(order.indexOf(inner)<order.indexOf(outer),'Finish the inner layers on both sides before the outer layer');
}
assert.deepEqual(output.steps[order.indexOf('support-y')].insertion.axis,[0,1,0]);
assert.deepEqual(output.steps[order.indexOf('support-z')].insertion.axis,[0,0,-1]);
assert.ok(!output.steps.some(step=>step.insertionBlocked));
const rotated = fixture(([x,y,z])=>[y,x,z]);
const rotatedGuide = editGuide(rotated.guide,{},rotated.paths);
assert.equal(rotatedGuide.assemblyAxis,'Y');
assert.deepEqual(rotatedGuide.steps.map(stepKey),order);
const saved = guide.steps.map(stepKey);
assert.deepEqual(editGuide(guide,{order:saved},paths).steps.map(stepKey),saved);
console.log('PASS: both sides expand out from the datum, Y/Z supports stay with their axial step, rotated models use the rotated axis, and manual order is preserved.');
