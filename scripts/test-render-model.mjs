import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {optimizeStaticModel} from '../public/assembly/render-model.js';
const bytes=await fs.readFile('public/assembly/parts/269-6690-000/model.glb');
const original=(await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene;
function stats(root){let triangles=0,meshes=0;root.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;}});return {meshes,triangles,bounds:new THREE.Box3().setFromObject(root)};}
const before=stats(original),optimized=optimizeStaticModel(original),after=stats(optimized);
assert.equal(after.triangles,before.triangles);assert.ok(after.meshes<before.meshes/2);assert.ok(after.bounds.min.distanceTo(before.bounds.min)<1e-8);assert.ok(after.bounds.max.distanceTo(before.bounds.max)<1e-8);
console.log('PASS motor rendering:',before.meshes,'→',after.meshes,'draw meshes;',after.triangles,'triangles, bounds preserved.');
