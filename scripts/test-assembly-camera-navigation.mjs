import assert from 'node:assert/strict';
import * as THREE from 'three';
import {installCameraNavigation} from '../public/assembly/camera-navigation.js';
globalThis.document=new EventTarget();globalThis.window=new EventTarget();
const canvas=new EventTarget(),camera=new THREE.PerspectiveCamera();
camera.position.set(0,0,1);camera.lookAt(0,0,0);
const orbit={target:new THREE.Vector3(),enabled:true,enableDamping:true,update(){}};
const nav=installCameraNavigation({canvas,camera,orbit});
const emit=(target,type,props)=>{const e=new Event(type,{cancelable:true});Object.assign(e,props);target.dispatchEvent(e);return e;};
const key=(code,down=true)=>emit(document,down?'keydown':'keyup',{code});
emit(canvas,'pointerenter',{});assert.equal(orbit.enabled,true);
nav.update(0);key('KeyW');nav.update(50);key('KeyW',false);
assert.ok(camera.position.z<1);assert.ok(Math.abs(camera.position.z-orbit.target.z-1)<1e-9);
for(const [code,axis,sign] of [['KeyS','z',1],['KeyA','x',-1],['KeyD','x',1],['KeyQ','y',-1],['KeyE','y',1]]){
 const before=camera.position[axis];key(code);nav.update(100);nav.update(150);key(code,false);assert.ok((camera.position[axis]-before)*sign>0,code);
}
emit(canvas,'pointerdown',{button:2,pointerId:1});assert.equal(orbit.enabled,false);
const oldDirection=camera.getWorldDirection(new THREE.Vector3());
emit(canvas,'pointermove',{buttons:2,movementX:20,movementY:10});
assert.ok(camera.getWorldDirection(new THREE.Vector3()).distanceTo(oldDirection)>.01);
key('KeyW');emit(window,'blur',{});const stopped=camera.position.clone();nav.update(200);
assert.deepEqual(camera.position,stopped);assert.equal(orbit.enabled,true);assert.equal(orbit.enableDamping,true);
emit(canvas,'pointerleave',{});
assert.equal(key('KeyE').defaultPrevented,false,'Tool keys remain available outside navigation');
console.log('PASS: six camera directions without mouse hold, right mouse look, blur cleanup and tool shortcuts.');
