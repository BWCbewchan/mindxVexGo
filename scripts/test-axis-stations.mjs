import assert from 'node:assert/strict';
import * as THREE from 'three';
import {axialInterval,freeStations,describeReference} from '../public/assembly/axis-stations.js';

// Axis along -Y from a tip at y = 62.6 mm (a 125 mm shaft standing up).
const tip=new THREE.Vector3(0,.0626,0),dir=new THREE.Vector3(0,-1,0);
const slab=(top,bottom)=>new THREE.Box3(new THREE.Vector3(-.02,bottom/1000,-.006),new THREE.Vector3(.02,top/1000,.006));
assert.deepEqual(axialInterval(slab(62.6,58),tip,dir).map(v=>+v.toFixed(2)),[0,4.6]);

// A 4.6 mm beam seated flush at the tip (depth 4.57) on an empty shaft: stacked positions every thickness.
const beam=[0,4.6];
const empty=freeStations({start:4.57,limit:125,candidate:beam});
assert.equal(empty[0],4.57);assert.ok(empty.length>=20,'Many positions along an empty 125 mm shaft');
assert.ok(Math.abs(empty[1]-empty[0]-4.6)<.01,'Positions stack flush');

// The tip is already taken by a beam and a gear sits lower down: the first free slot is below the beam.
const occupied=[axialInterval(slab(62.6,58),tip,dir),[30,36]];
const busy=freeStations({start:4.57,limit:125,candidate:beam,occupied});
assert.ok(busy[0]>=8.8&&busy[0]<9.6,`First free position after the occupied tip, got ${busy[0]}`);
assert.ok(busy.every(d=>d+beam[1]-4.57<=30.3||d-4.57>=35.7),'No position overlaps the gear');

// A full shaft offers nothing.
assert.deepEqual(freeStations({start:4.57,limit:10,candidate:beam,occupied:[[0,10]]}),[]);

assert.match(describeReference({kind:'pin',profile:'square-drive'},125.2),/Trục vuông · dài 125 mm/);
assert.match(describeReference({kind:'hole'},4.5),/Lỗ tròn/);
console.log('PASS: axial intervals, flush stacking along an empty shaft, occupied tip skipped, no overlap with parts already on the shaft, full shaft offers nothing.');
