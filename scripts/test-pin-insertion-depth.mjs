import assert from 'node:assert/strict';
import fs from 'node:fs';
import {insertionLimit,recommendedInsertionDepth} from '../public/assembly/connector-policy.js';
import {matingPose,nearestMate,normalizeMatedJoints,worldReference} from '../public/assembly/mating.js';

const refs=JSON.parse(fs.readFileSync('public/assembly/connectors.json','utf8')).parts;
const beam={id:'beam',sku:'228-2500-003',position:[0,0,0],rotation:[0,0,0]};
const hole=refs[beam.sku].find(r=>r.kind==='hole');
const standoffSku='228-2500-2271';
const standoffEnd=refs[standoffSku].find(r=>r.id==='1');
const holeDepth=hole.depth, pegDepth=standoffEnd.depth;

assert.equal(holeDepth,4.572);
assert.equal(pegDepth,2.2);
assert.equal(insertionLimit(standoffEnd,hole),pegDepth,'A short standoff end must not be inserted beyond its physical seating land.');
assert.equal(recommendedInsertionDepth(standoffEnd,hole),pegDepth,'The default must seat the shorter connector end without making it protrude.');

const standoff={id:'standoff',sku:standoffSku,position:[0,0,0],rotation:[0,0,0]};
const mate=nearestMate(standoff,[standoff,beam],refs,{distance:100});
assert.ok(mate);
assert.equal(mate.depth,pegDepth,'Auto-snap depth should use the shorter mating feature.');
const pose=matingPose(standoff,standoffEnd,beam,hole,{depth:holeDepth});
const snapped=worldReference({...standoff,...pose},standoffEnd).point;
const target=worldReference(beam,hole);
assert.ok(Math.abs(-snapped.clone().sub(target.point).dot(target.normal)-pegDepth)<1e-8,'Even a stale/deep requested depth must be clamped before preview or save.');

const legacyPose={...standoff,...matingPose(standoff,standoffEnd,beam,hole,{depth:pegDepth})};
legacyPose.position=legacyPose.position.map((value,index)=>value-target.normal.toArray()[index]*(holeDepth-pegDepth));
const legacy={...legacyPose,mate:{target:'beam',sourceRef:standoffEnd.id,targetRef:hole.id,depth:holeDepth}};
normalizeMatedJoints([beam,legacy],refs);
assert.equal(legacy.mate.depth,pegDepth,'Saved assemblies from the old default are repaired when opened.');
const repaired=worldReference(legacy,standoffEnd).point;
assert.ok(Math.abs(-repaired.clone().sub(target.point).dot(target.normal)-pegDepth)<1e-8);

const pinSku='228-2500-2260',pin=refs[pinSku].find(r=>r.depth>4);
assert.equal(insertionLimit(pin,hole),pin.depth,'A regular 1x1 connector pin may use its full pin section.');
assert.equal(recommendedInsertionDepth(pin,hole),holeDepth,'A regular pin defaults to the depth needed to seat through one beam.');
console.log('PASS: standoff ends stop at their physical seating land; normal connector pins still seat through the beam.');
