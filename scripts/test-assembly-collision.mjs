import assert from 'node:assert/strict';
import * as THREE from 'three';
import {meshContact,analyzeCollisions} from '../public/assembly/collision.js';
function box(size,pos){const m=new THREE.Mesh(new THREE.BoxGeometry(...size));m.position.set(...pos);m.updateMatrixWorld(true);return m;}
const a=box([.02,.02,.02],[0,0,0]);
assert.equal(meshContact(a,box([.02,.02,.02],[.04,0,0])),null,'separated');
assert.equal(meshContact(a,box([.02,.02,.02],[.02,0,0])),null,'face contact is not penetration');
assert.equal(meshContact(a,box([.02,.02,.02],[.012,0,0])),'penetration','crossing solids');
assert.equal(meshContact(a,box([.005,.005,.005],[0,0,0])),'penetration','contained solid');
const ring=new THREE.Mesh(new THREE.TorusGeometry(.02,.003,12,32));ring.updateMatrixWorld(true);
assert.equal(meshContact(ring,box([.002,.002,.002],[0,0,0])),null,'part in a real opening is not containment');
const rotated=box([.02,.02,.02],[.015,0,0]);rotated.rotation.z=Math.PI/4;rotated.updateMatrixWorld(true);
assert.equal(meshContact(a,rotated),'penetration','rotated solid');
const parts=[{id:'a',sku:'269-6690-000'},{id:'b',sku:'228-2500-025'}],objects=new Map([['a',a],['b',rotated]]);
assert.equal(analyzeCollisions(parts,objects).issues[0].kind,'penetration');
parts[1].sku='228-2500-2260';assert.equal(analyzeCollisions(parts,objects).issues[0].kind,'penetration','an unlinked connector must not hide body penetration');
parts[1].mate={target:'a',sourceRef:'1',targetRef:'1'};assert.equal(analyzeCollisions(parts,objects).issues[0].kind,'joint','a recorded connector mate remains reviewable, never certified');
const crossedBeamA=box([.12,.018,.006],[0,0,0]),crossedBeamB=box([.12,.018,.006],[0,0,0]);crossedBeamB.rotation.z=Math.PI/2;crossedBeamB.updateMatrixWorld(true);
assert.equal(meshContact(crossedBeamA,crossedBeamB),'penetration','crossing beam bodies are detected even when connector parts are elsewhere');
console.log('Collision tests passed: touching, separated, containment, rotated and crossing solids, plus explicit connector-mate classification.');

// A long chain can fill the joint-contact display limit before a later collision.
const denseParts=[{id:'p0',sku:'228-2500-2260',mate:{target:'p1'}},{id:'p1',sku:'228-2500-001'},{id:'p2',sku:'228-2500-001'},{id:'p3',sku:'269-6690-000'}];
const denseObjects=new Map([['p0',box([.02,.02,.02],[0,0,0])],['p1',box([.02,.02,.02],[.01,0,0])],['p2',box([.02,.02,.02],[.1,0,0])],['p3',box([.02,.02,.02],[.11,0,0])]]);
assert.ok(analyzeCollisions(denseParts,denseObjects,{limit:1}).issues.some(i=>i.kind==='penetration'),'Valid joints must not hide later unrelated body penetration');
