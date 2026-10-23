import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from 'three';
import '../public/training-engine.js';
import {robotDevices,defaultDrive,validateDrive,validateDriveSettings} from '../public/simulation/config.js';
const project=JSON.parse(await fs.readFile(process.argv[2]||'C:/Users/admin/Downloads/VEXGO-assembly (9).json','utf8'));
project.platform='vexgo';project.parts=project.parts.filter(p=>p.sku!=='269-6685-000');
const devices=robotDevices(project),drive={...defaultDrive(devices),yaw:90};
assert.equal(validateDriveSettings(drive,devices).yaw,90);assert.throws(()=>validateDrive(drive,devices),/Brain/);
for(const heading of [0,90,180,270]){
 const e=globalThis.createTrainingEngine({width:3000,height:3000,start:{x:1500,y:1500,heading},goal:{x:2500,y:2500,radius:50},walls:[],robot:{radius:100}});
 e.command('drive',100,100);for(let i=0;i<110;i++)e.tick(.01);
 const actual=new THREE.Vector3(e.state.x-1500,0,e.state.y-1500).normalize();
 const front=new THREE.Vector3(1,0,0).applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2-heading*Math.PI/180);
 assert.ok(front.dot(actual)>.9999,'CAD front must match actual forward motion at '+heading+' degrees');
}
console.log('PASS: calibrated +X CAD faces actual forward motion at all four headings; hardware requirements remain enforced');
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1050}}),key='mindx-assembly-project-v1:vexgo:facing-test',errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/simulation/viewer.js*',async route=>{const response=await route.fetch();await route.fulfill({response,body:await response.text()+`\nwindow.__facingTest=()=>{robot.updateMatrixWorld(true);const front=new THREE.Vector3(1,0,0).applyQuaternion(body.getWorldQuaternion(new THREE.Quaternion())),direction=new THREE.Vector3(0,0,-1).applyQuaternion(robot.getWorldQuaternion(new THREE.Quaternion()));return {dot:front.dot(direction),yaw:body.rotation.y,heading:pose?.heading};};`});});
 await page.addInitScript(({project,key})=>{if(window!==top)return;localStorage.setItem(key,JSON.stringify(project));localStorage.setItem('mindx-assembly-projects-v1',JSON.stringify([{id:'facing-test',platform:'vexgo',title:'Facing regression',partCount:project.parts.length,createdAt:1,updatedAt:1}]));localStorage.setItem('mindx-vr-last-source','vexgo:facing-test');},{project,key});
 await page.goto('http://localhost:3120/simulation',{waitUntil:'domcontentloaded'});
 const adjust=page.getByRole('button',{name:'Chỉnh mũi xe',exact:true});await page.waitForFunction(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Chỉnh mũi xe'));return b&&!b.disabled;},{},{timeout:90000});
 const viewer=page.frames().find(f=>f.url().includes('/simulation/viewer.html'));await viewer.waitForFunction(()=>window.__facingTest&&window.__facingTest().heading===90);
 const before=await viewer.evaluate(()=>window.__facingTest());assert.ok(Math.abs(before.dot)<.001,'Reproduce the sideways model before calibration');
 assert.equal(await page.getByRole('button',{name:'Chạy',exact:true}).isDisabled(),true);
 await adjust.click();await viewer.waitForFunction(()=>window.__facingTest().dot>.9999);
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('mindx-vr-config:vexgo:facing-test')).drive.yaw===90);
 assert.equal(await page.getByRole('button',{name:'Chạy',exact:true}).isDisabled(),true,'Calibration must not bypass missing Brain');
 await page.getByRole('combobox',{name:'Góc nhìn sân ảo',exact:true}).selectOption('top');const rect=await viewer.locator('canvas').boundingBox(),scale=rect.height/(2*Math.tan(21*Math.PI/180)*3.72),cx=rect.x+rect.width/2,cy=rect.y+rect.height/2;await page.mouse.move(cx,cy);await page.mouse.down({button:'right'});await page.mouse.move(cx+.8*scale,cy-.4*scale,{steps:12});await page.mouse.up({button:'right'});await page.mouse.wheel(0,-600);await page.mouse.move(20,20);await page.waitForTimeout(500);await fs.mkdir('artifacts/simulation',{recursive:true});await page.screenshot({path:'artifacts/simulation/facing-fixed.png'});
 const original=await page.evaluate(key=>localStorage.getItem(key),key);await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Chỉnh mũi xe'));return b&&!b.disabled;},{},{timeout:90000});
 const reloaded=page.frames().find(f=>f.url().includes('/simulation/viewer.html'));await reloaded.waitForFunction(()=>window.__facingTest?.().dot>.9999);
 assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),original,'Facing correction never changes the source Assembly');
 assert.deepEqual(errors,[]);console.log('PASS: actual CAD reproduced sideways, one-click calibration aligns body/arrow, persists despite missing Brain and leaves Assembly unchanged');
}finally{await browser.close();}
