import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {buildAssemblyDocument} from '../public/assembly/document-model.js';
import {attachmentReferences} from '../public/assembly/mating.js';
import {analyzeCollisions} from '../public/assembly/collision.js';
import {defaultKitProfile,kitReport} from '../public/assembly/kit-policy.js';
import {markOriginalGOCables} from '../public/assembly/cad-cables.js';
const catalog=JSON.parse(await fs.readFile('public/assembly/parts.json','utf8')),refs=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const empty={version:1,platform:'vexgo',title:'Đế – chốt – trục – bánh',parts:[],groups:[],steps:[],hideCables:true,kit:defaultKitProfile(catalog,'vexgo')};
const loader=new GLTFLoader(),cache=new Map();
async function model(sku){if(!cache.has(sku)){const raw=await fs.readFile(`public/assembly/parts/${sku}/model.glb`);const scene=(await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'')).scene;markOriginalGOCables(scene,sku,refs);cache.set(sku,scene);}return cache.get(sku).clone(true);}
async function fit(document){const objects=new Map();for(const p of document.parts){const object=await model(p.sku);object.position.fromArray(p.position.map(n=>n/1000));object.rotation.set(...p.rotation.map(THREE.MathUtils.degToRad));objects.set(p.id,object);}return analyzeCollisions(document.parts,objects,{references:refs});}
let example=null,checked=0;
outer:for(const base of ['228-2500-035','228-2500-042','228-2500-043']){
 const holes=attachmentReferences(refs[base]).filter(r=>r.kind==='hole'&&!r.profile),pinRefs=attachmentReferences(refs['228-2500-2260']).filter(r=>r.kind==='pin'&&!r.profile);
 for(const hp of holes)for(const hs of holes){if(hp.id===hs.id||new THREE.Vector3(...hp.point).distanceTo(new THREE.Vector3(...hs.point))<25)continue;
  for(const shaft of ['228-2500-124','228-2500-2234','228-2500-2238'])for(const sr of attachmentReferences(refs[shaft]).filter(r=>r.kind==='pin'&&r.profile==='square-drive'))for(const wh of refs['228-2500-1383'].filter(r=>r.kind==='hole'&&r.profile==='square-drive')){
   const input={version:1,platform:'vexgo',title:empty.title,parts:[{id:'base',partId:base,position:[0,40,0],rotation:[0,0,0]},{id:'pin',partId:'228-2500-2260',attachTo:{targetId:'base',sourceRef:pinRefs[0].id,targetRef:hp.id}},{id:'shaft',partId:shaft,attachTo:{targetId:'base',sourceRef:sr.id,targetRef:hs.id}},{id:'wheel',partId:'228-2500-1383',attachTo:{targetId:'shaft',sourceRef:wh.id,targetRef:sr.id}}]};
   try{const result=buildAssemblyDocument(empty,input,{platform:'vexgo',catalog,references:refs}),report=await fit(result.document);checked++;if(report.issues.some(i=>i.kind==='penetration'))continue;assert.ok(!kitReport(result.document.parts,catalog,result.document.kit).some(r=>r.remaining<0));example=input;break outer;}catch{}
  }
 }
}
if(!example)throw Error('No collision-free four-part few-shot found; do not publish invented geometry.');
await fs.mkdir('public/assembly/examples',{recursive:true});await fs.writeFile('public/assembly/examples/go-plate-pin-shaft-wheel.json',JSON.stringify(example,null,2),'utf8');
const carParts=JSON.parse(await fs.readFile('public/assembly/original-car-project.json','utf8')).parts;
const carIds=new Map(carParts.map((p,i)=>[p.id,'car-'+(i+1)]));for(const p of carParts){p.id=carIds.get(p.id);if(p.mate)p.mate.target=carIds.get(p.mate.target);}
const car=buildAssemblyDocument(empty,{version:1,platform:'vexgo',title:'VEX GO · Xe mẫu 2 motor',parts:carParts,groups:[]},{platform:'vexgo',catalog,references:refs}).document;
const carFit=await fit(car);assert.ok(!carFit.issues.some(i=>i.kind==='penetration'),JSON.stringify(carFit.issues));assert.equal(car.parts.filter(p=>p.sku==='269-6690-000').length,2);assert.equal(car.parts.filter(p=>['228-2500-1383','228-2500-1384'].includes(p.sku)).length,4);assert.equal(car.parts.filter(p=>p.sku==='269-6685-000').length,1);assert.equal(car.parts.filter(p=>p.sku==='269-6686-000').length,1);assert.ok(!kitReport(car.parts,catalog,car.kit).some(r=>r.remaining<0));
await fs.writeFile('public/assembly/examples/go-car-two-motors.json',JSON.stringify(car,null,2),'utf8');
await fs.mkdir('artifacts/headless-assembly',{recursive:true});await fs.writeFile('artifacts/headless-assembly/example-audit.json',JSON.stringify({fewShot:example.parts.map(p=>p.partId),candidatesChecked:checked,carParts:car.parts.length,carDetectedPenetrations:0,carStockShortages:0,physicallyTested:false},null,2),'utf8');
for(const [platform,file,base,pin] of [['vexiq','iq-beam-pin.json','228-2500-026','228-2500-060'],['lego','lego-beam-pin.json','32524','2780']]){
 const dir=platform==='vexiq'?'iq':'lego',references=JSON.parse(await fs.readFile(`public/assembly/${dir}/connectors.json`,'utf8')).parts;const {compatibleReferences}=await import('../public/assembly/connector-policy.js');
 let pair;for(const a of attachmentReferences(references[pin]).filter(r=>r.kind==='pin'))for(const b of references[base].filter(r=>r.kind==='hole'))if(!pair&&compatibleReferences(a,b,pin,base))pair=[a,b];if(!pair)throw Error('No example ports for '+platform);
 const input={version:1,platform,title:platform.toUpperCase()+' · Dầm và chốt',parts:[{id:'base',partId:base,position:[0,40,0]},{id:'pin',partId:pin,attachTo:{targetId:'base',sourceRef:pair[0].id,targetRef:pair[1].id}}]};await fs.writeFile('public/assembly/examples/'+file,JSON.stringify(input,null,2),'utf8');
}
console.log('PASS: actual CAD-checked four-part few-shot and',car.parts.length,'part / 2 motor / 4 wheel car, one GO kit, no detected body penetrations. Physical build not tested.');
