import assert from 'node:assert/strict';
import fs from 'node:fs';
import {compatibleReferences,insertionLimit,recommendedInsertionDepth} from '../public/assembly/connector-policy.js';
import {matingPose,worldReference} from '../public/assembly/mating.js';
import {constrainJoints} from '../public/assembly/joint-constraints.js';
const refs=JSON.parse(fs.readFileSync('public/assembly/connectors.json','utf8')).parts;
const socket=refs['269-6690-000'].find(r=>r.id==='motor-output'),tip=refs['228-2500-2234'][0];
assert.ok(compatibleReferences(tip,socket,'228-2500-2234','269-6690-000'));
assert.equal(compatibleReferences(socket,{kind:'pin',radius:1.6}),false);
for(const shaftSku of ['228-2500-2234','228-2500-2238']){
 const short=refs[shaftSku].find(r=>r.id==='short-drive-end'),long=refs[shaftSku].find(r=>r.id==='square-long-shaft-end');
 assert.equal(compatibleReferences(long,socket,shaftSku,'269-6690-000'),false);
 for(const wheelSku of ['228-2500-1383','228-2500-1384']){
  const hole=refs[wheelSku].find(r=>r.kind==='hole'&&compatibleReferences(long,r,shaftSku,wheelSku));assert.ok(hole);
  assert.equal(compatibleReferences(short,hole,shaftSku,wheelSku),false);
  assert.equal(compatibleReferences(hole,short,wheelSku,shaftSku),false);
  assert.equal(compatibleReferences(long,hole,shaftSku,wheelSku),true);
  assert.equal(compatibleReferences(hole,long,wheelSku,shaftSku),true);
 }
}
assert.equal(refs['228-2500-2234'].filter(ref=>compatibleReferences(ref,socket,'228-2500-2234','269-6690-000')).length,1,'Only the short square end can attach to the motor; the long end is reserved for square sockets/round bearings.');
for(const rotation of [[0,0,0],[27,61,13]]){
 const motor={id:'m',sku:'269-6690-000',position:[10,30,20],rotation};
 const shaft={id:'s',sku:'228-2500-2234',position:[0,0,0],rotation:[39,16,53]};
 Object.assign(shaft,matingPose(shaft,tip,motor,socket,{depth:50,twist:31}));
 const a=worldReference(shaft,tip),b=worldReference(motor,socket),d=a.point.clone().sub(b.point);
 assert.ok(d.clone().addScaledVector(b.normal,-d.dot(b.normal)).length()<1e-8);
 assert.ok(Math.abs(-d.dot(b.normal)-5.461)<1e-8,'Collar cannot enter socket');
 assert.ok(a.normal.dot(b.normal)<-.999999);
 shaft.mate={target:'m',sourceRef:tip.id,targetRef:socket.id,depth:5.461};
 const before=[motor,structuredClone(shaft)],parts=structuredClone(before);parts[1].position[0]+=15;
 assert.ok(constrainJoints(parts,before,refs).ok);
 const corrected=worldReference(parts[1],tip).point.sub(worldReference(parts[0],socket).point);
 assert.ok(corrected.clone().addScaledVector(b.normal,-corrected.dot(b.normal)).length()<1e-8);
 assert.deepEqual(parts[0],motor);
}
console.log('PASS motor square socket: short end, rotated axes, collar depth, lateral correction, round-pin rejection.');
const collarRef=refs['228-2500-143'].find(r=>r.id==='square-hole-front');
const shaftRef=refs['228-2500-2234'].find(r=>r.id==='square-long-shaft-end');
assert.equal(insertionLimit(collarRef,shaftRef),24.511);
assert.equal(recommendedInsertionDepth(collarRef,shaftRef),6.35);
const shaft={id:'shaft',sku:'228-2500-2234',position:[10,25,30],rotation:[24,37,16]};
const collar={id:'collar',sku:'228-2500-143',position:[0,0,0],rotation:[0,0,0]};
Object.assign(collar,matingPose(collar,collarRef,shaft,shaftRef,{depth:15}));
collar.mate={target:shaft.id,sourceRef:collarRef.id,targetRef:shaftRef.id,depth:15};
const prior=[shaft,structuredClone(collar)],current=structuredClone(prior);
assert.equal(constrainJoints(current,prior,refs).ok,true);
const gap=worldReference(current[1],collarRef).point.sub(worldReference(shaft,shaftRef).point);
assert.ok(Math.abs(-gap.dot(worldReference(shaft,shaftRef).normal)-15)<1e-8);
assert.deepEqual(current[0],shaft);
console.log('PASS: collar slides 15 mm along the shaft without moving the shaft or clamping to bore thickness.');
