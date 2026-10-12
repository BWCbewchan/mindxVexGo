import assert from 'node:assert/strict';
import * as THREE from 'three';
import {stagingPosition} from '../public/assembly/staging-position.js';

const existing=new THREE.Mesh(new THREE.BoxGeometry(.1,.02,.02));existing.position.set(-.05,.04,0);existing.updateMatrixWorld(true);
const incoming=new THREE.Mesh(new THREE.BoxGeometry(.18,.02,.02));
const position=stagingPosition(incoming,new Map([['existing',existing]]));
incoming.position.set(position[0]/1000,position[1]/1000,position[2]/1000);incoming.updateMatrixWorld(true);
const occupied=new THREE.Box3().setFromObject(existing),placed=new THREE.Box3().setFromObject(incoming);
assert.ok(placed.min.x-occupied.max.x>=.0249,'new piece keeps the intended 25 mm staging gap');
assert.equal(occupied.intersectsBox(placed),false,'long pieces stage clear of existing geometry');
assert.deepEqual(stagingPosition(new THREE.Mesh(new THREE.BoxGeometry(.02,.02,.02)),new Map()),[0,40,0],'first part starts at the normal origin');
console.log('Assembly staging tests passed: empty workspace, measured CAD bounds and clear separation for long parts.');
