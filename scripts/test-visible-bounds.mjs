import assert from 'node:assert/strict';
import * as THREE from 'three';
import {visibleBounds,VisibleBoxHelper} from '../public/assembly/visible-bounds.js';
const device=new THREE.Group(),body=new THREE.Mesh(new THREE.BoxGeometry(2,2,2)),wire=new THREE.Mesh(new THREE.BoxGeometry(1,20,1));wire.position.y=11;device.add(body,wire);
const helper=new VisibleBoxHelper(device,0xff0000);assert.equal(helper.box.max.y,21);
wire.visible=false;helper.update();assert.equal(helper.box.max.y,1);assert.equal(visibleBounds(device).max.y,1);
device.position.x=5;helper.update();assert.equal(helper.box.min.x,4);
wire.visible=true;helper.update();assert.equal(helper.box.max.y,21);
console.log('PASS: hidden cables excluded; restored cables and movement update selection bounds.');
