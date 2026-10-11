import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {nearestMate,worldReference} from '../public/assembly/mating.js';
const refs=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const fixture={version:1,title:'Direct assembly check',parts:[{id:'beam',sku:'228-2500-001',label:'Beam',position:[0,40,0],rotation:[0,0,0]},{id:'pin',sku:'228-2500-2271',label:'Pin',position:[5.65,70.775,-12],rotation:[0,0,0]}],steps:[]};
const near=structuredClone(fixture.parts[1]);near.position=[-6.35,70.775,0];const match=nearestMate(near,fixture.parts,refs);assert.ok(match);assert.equal(match.targetRef.id,'2');assert.equal(nearestMate({...near,position:[300,400,500]},fixture.parts,refs),null);
await fs.writeFile('artifacts/assembly-tests/direct-project.json',JSON.stringify(fixture));
const bounds=new THREE.Box3(),loader=new GLTFLoader();for(const part of fixture.parts){const b=await fs.readFile(`public/assembly/parts/${part.sku}/model.glb`);const g=await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');g.scene.position.fromArray(part.position.map(v=>v/1000));g.scene.updateMatrixWorld(true);bounds.expandByObject(g.scene);}
const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3()),radius=Math.max(size.length()/2,.0125);
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://localhost:3120/assembly');const f=page.frameLocator('iframe');await f.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();await f.locator('#open').setInputFiles('artifacts/assembly-tests/direct-project.json');await f.locator('#status').filter({hasText:'2 parts'}).waitFor();await f.getByRole('tab',{name:'Layers',exact:true}).click();await f.locator('#objects .part-layer-select').nth(1).click();await f.locator('#fit').click();let frame=page.frames().find(f=>f.url().includes('editor.html'));
 const rect=await f.locator('#viewport').boundingBox(),camera=new THREE.PerspectiveCamera(40,rect.width/rect.height,.001,100);const vertical=THREE.MathUtils.degToRad(camera.fov/2),horizontal=Math.atan(Math.tan(vertical)*camera.aspect),distance=radius/Math.sin(Math.min(vertical,horizontal))*1.15;camera.position.copy(center).add(new THREE.Vector3(1,.7,1).normalize().multiplyScalar(distance));camera.lookAt(center);camera.updateMatrixWorld(true);
 const project=p=>{const n=new THREE.Vector3().fromArray(p).multiplyScalar(.001).project(camera);return [rect.x+(n.x+1)/2*rect.width,rect.y+(-n.y+1)/2*rect.height];};
 const start=project([5.65,48,-12]);
 const saved=()=>frame.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')));
 const destination=project([-6.35,48,0]);
 await page.keyboard.down('Alt');await page.mouse.move(...start);await page.mouse.down();await page.mouse.move(...destination,{steps:24});
 await f.locator('#status').filter({hasText:'Release to attach'}).waitFor();await page.mouse.up();await page.keyboard.up('Alt');
 await frame.waitForFunction(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts.length===3);
 const result=await saved();assert.deepEqual(result.parts.slice(0,2),fixture.parts);assert.equal(result.parts[2].mate.target,'beam');
 await f.locator('#undo').click();await frame.waitForFunction(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts.length===2);assert.deepEqual((await saved()).parts,fixture.parts);
 assert.deepEqual(errors,[]);console.log('PASS: Alt drag duplicates and snaps while Alt stays held; originals unchanged; Undo restores fixture.');
}finally{await browser.close();}
