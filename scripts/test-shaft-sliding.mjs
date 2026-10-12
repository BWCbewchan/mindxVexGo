import assert from 'node:assert/strict';
import {nearestMate,matingPose,worldReference} from '../public/assembly/mating.js';
import {insertionLimit} from '../public/assembly/connector-policy.js';
import {constrainJoints} from '../public/assembly/joint-constraints.js';
const shaftRef={id:'long-end',kind:'pin',profile:'square-drive',point:[0,0,0],normal:[0,0,1],key:[1,0,0],radius:1.5875,width:3.175,depth:50,maxDepth:50};
const round={id:'bearing',kind:'hole',point:[0,0,0],normal:[0,0,-1],radius:2.1,depth:4};
const square={...round,id:'square-bore',profile:'square-drive',width:3.175,key:[1,0,0]};
for(const bore of [round,square]){
 const refs={shaft:[shaftRef],beam:[bore]};
 const shaft={id:'shaft',sku:'shaft',position:[10,20,30],rotation:[25,31,42],mate:{target:'motor',sourceRef:'short-end',targetRef:'motor-output'}};
 const moving={id:'beam',sku:'beam',position:[0,0,0],rotation:[0,0,0]};
 Object.assign(moving,matingPose(moving,bore,shaft,shaftRef,{depth:30}));
 assert.equal(insertionLimit(bore,shaftRef),50);
 const found=nearestMate(moving,[shaft,moving],refs);assert.ok(found,'Detect bore at shaft midsection even with motor connection');
 assert.ok(Math.abs(found.depth-30)<1e-8,'Do not return to shaft tip');
 moving.mate={target:shaft.id,sourceRef:bore.id,targetRef:shaftRef.id,depth:30};
 const before=[structuredClone(shaft),structuredClone(moving)];
 Object.assign(moving,matingPose(moving,bore,shaft,shaftRef,{depth:40}));
 const parts=[shaft,moving];assert.equal(constrainJoints(parts,before,refs,{autoAttach:false}).ok,true);
 assert.deepEqual(shaft,before[0]);
 const gap=worldReference(moving,bore).point.sub(worldReference(shaft,shaftRef).point);
 assert.ok(Math.abs(-gap.dot(worldReference(shaft,shaftRef).normal)-40)<1e-8);
}
console.log('PASS: round and square bores acquire shaft midsection, slide beyond thickness, preserve fixed shaft.');
