import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {snapPosition,snapPreset} from '../public/assembly/snap-settings.js';
import {parseLDraw,exportLDraw,ldrawColors} from '../public/assembly/ldraw-model.js';
import {guideCamera} from '../public/assembly/guide-camera.js';
import {editGuide,stepKey} from '../public/assembly/guide-editing.js';
import {zipStore,crc32} from '../public/assembly/zip-store.js';
import * as THREE from 'three';
const catalog=JSON.parse(await fs.readFile('public/assembly/lego/parts.json','utf8')),colors=ldrawColors(await fs.readFile('public/assembly/lego/ldraw/ldconfig.ldr','utf8'));
assert.equal(snapPreset({},'lego'),'stud');assert.equal(snapPreset({},'vexgo'),'mm');assert.deepEqual(snapPosition([13,5,-11],'stud'),[16,6.4,-8]);assert.deepEqual(snapPosition([13,5,-11],'half'),[12,6.4,-12]);assert.deepEqual(snapPosition([3.1,6.3,9.5],'plate'),[3.2,6.4,9.6]);assert.deepEqual(snapPosition([1,2,3],'stud',false),[1,2,3]);
assert.deepEqual(snapPosition([19,40,-12],'stud',true,[13,40,-11]),[21,40,-11],'Snap drag increments must not shift an unmoved axis or an off-grid starting point');
assert.equal(guideCamera({direction:[0,1,0],up:[0,2,0]}),null);assert.equal(guideCamera({direction:[NaN,0,1],up:[0,1,0]}),null);assert.deepEqual(guideCamera({direction:[0,0,-2],up:[0,1,0]}),{direction:[0,0,-1],up:[0,1,0]});
for(const [index,row] of catalog.entries()){
 const p={id:'part',sku:row.id,label:row.name,position:[13.5,-6.4,index*.2],rotation:[index%179-90,index%91-45,index%357-178]};const project={version:1,platform:'lego',title:'Round trip',parts:[p],groups:[]};
 const ldr=exportLDraw(project,catalog),next=parseLDraw(ldr,catalog,{colors}).parts[0];assert.equal(next.sku,p.sku);assert.ok(p.position.every((n,i)=>Math.abs(n-next.position[i])<1e-6));
 const matrix=v=>new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...v.map(THREE.MathUtils.degToRad)));
 assert.ok(matrix(p.rotation).elements.every((n,i)=>Math.abs(n-matrix(next.rotation).elements[i])<1e-6),row.id);
}
const beam=catalog.find(p=>p.id==='32524'),model=(matrix='1 0 0 0 1 0 0 0 1',file='32524.dat')=>`0 Fixture\n1 4 20 -8 40 ${matrix} ${file}\n`;
const parsed=parseLDraw(model(),catalog,{colors});assert.deepEqual(parsed.parts[0].position,[8,3.2,-16]);assert.equal(parsed.parts[0].ldrawColor,4);
const mpd=`0 FILE main.ldr\n1 16 20 0 0 1 0 0 0 1 0 0 0 1 child.ldr\n0 FILE child.ldr\n${model()}`;assert.equal(parseLDraw(mpd,catalog,{colors}).parts[0].position[0],16);
assert.throws(()=>parseLDraw(model('-1 0 0 0 1 0 0 0 1'),catalog,{colors}),/scale|shear/);assert.throws(()=>parseLDraw(model('1 0 0 0 1 0 0 0 1','no-such-part.dat'),catalog,{colors}),/chưa có CAD/);assert.throws(()=>parseLDraw(model('1 0 0 0 1 0 0 0 1','../part.dat'),catalog,{colors}),/đường dẫn/);assert.throws(()=>parseLDraw('3 4 0 0 0 1 1 1 2 2 2',catalog),/type 3/);assert.throws(()=>parseLDraw('0 FILE x.ldr\n1 16 0 0 0 1 0 0 0 1 0 0 0 1 x.ldr',catalog),/vòng lặp/);
const guide={ready:true,steps:[{title:'Base',added:[{id:'b'}],parts:[{id:'b',sku:beam.id}]}]},camera={direction:[1,2,3],up:[0,1,0]},key=stepKey(guide.steps[0]);assert.equal(editGuide(guide,{steps:{[key]:{view:'custom',camera}}}).steps[0].view,'custom');assert.equal(editGuide(guide,{steps:{[key]:{view:'custom',camera:{direction:[0,0,0],up:[0,1,0]}}}}).steps[0].camera,undefined);
assert.equal(crc32(new TextEncoder().encode('123456789')),0xcbf43926);assert.throws(()=>zipStore([{name:'../bad',data:'bad'}]));
await fs.mkdir('artifacts/guide-tools',{recursive:true});await fs.writeFile('artifacts/guide-tools/round-trip.zip',zipStore([{name:'ảnh.txt',data:'Lắp mô hình – LEGO'},{name:'bytes.bin',data:new Uint8Array([0,1,2,255])}]));
execFileSync('python',['-c',"import zipfile; z=zipfile.ZipFile('artifacts/guide-tools/round-trip.zip'); assert z.testzip() is None; assert z.read('bytes.bin') == bytes([0,1,2,255]); assert len(z.namelist()) == 2"]);
console.log('PASS: LEGO grid presets, 329 real part matrix/color round trips, nested MPD, invalid/unknown/reflective inputs, custom camera validation and independent ZIP CRC reader.');
