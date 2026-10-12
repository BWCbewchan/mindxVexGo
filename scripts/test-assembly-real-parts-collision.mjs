import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {collisionMesh,meshContact} from '../public/assembly/collision.js';

const loader=new GLTFLoader();
async function load(sku){const bytes=await fs.readFile(`public/assembly/parts/${sku}/model.glb`);const buffer=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);return (await loader.parseAsync(buffer,'')).scene;}
const green=await load('228-2500-002'),yellow=await load('228-2500-003');
green.updateMatrixWorld(true);yellow.updateMatrixWorld(true);
let contact=meshContact(collisionMesh(green),collisionMesh(yellow));
assert.equal(contact,'penetration','real green and yellow beam CAD overlap at the same location');
yellow.rotation.z=THREE.MathUtils.degToRad(35);yellow.updateMatrixWorld(true);
contact=meshContact(collisionMesh(green),collisionMesh(yellow));
assert.equal(contact,'penetration','real crossed VEX GO beams are detected when rotated');
yellow.position.x=.2;yellow.updateMatrixWorld(true);
contact=meshContact(collisionMesh(green),collisionMesh(yellow));
assert.equal(contact,null,'separated real beams do not report collision');
console.log('Real-part collision test passed: VEX GO beam CAD overlap is detected and separated beams stay clear.');
