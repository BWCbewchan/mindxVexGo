import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
globalThis.location={href:'http://localhost/assembly/lego/editor.html?platform=lego'};
const {compatibleReferences,recommendedInsertionDepth}=await import('../public/assembly/connector-policy.js');
const {matingPose,worldReference}=await import('../public/assembly/mating.js');
const {analyzeCollisions}=await import('../public/assembly/collision.js');
const {defaultKitProfile,validateKitProfile,assertKitChange}=await import('../public/assembly/kit-policy.js');
const {platformValid,validateProjectFile}=await import('../public/assembly/project-store.js');
const root='public/assembly/lego/',catalog=JSON.parse(await fs.readFile(root+'parts.json','utf8')),references=JSON.parse(await fs.readFile(root+'connectors.json','utf8')).parts;
const {LEGO_KITS}=await import('../public/assembly/lego/kit-presets.js');
assert.equal(catalog.length,329);assert.equal(LEGO_KITS.length,7);assert.ok(platformValid('lego'));
const loader=new GLTFLoader(),models=new Map();
for(const p of catalog){
 const raw=await fs.readFile(root+`parts/${p.id}/model.glb`);const loaded=await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');
 const bounds=new THREE.Box3().setFromObject(loaded.scene);assert.ok(!bounds.isEmpty(),p.id);assert.ok(bounds.getSize(new THREE.Vector3()).length()<1,p.id+' must use meters');
 for(const code of Object.keys(p.colors))assert.ok((await fs.stat(root+`parts/${p.id}/preview-${code}.png`)).size>100,p.id+' preview');
 models.set(p.id,loaded.scene);
}
for(const kit of LEGO_KITS){const p=defaultKitProfile(catalog,'lego',kit.id);assert.equal(p.kitId,kit.id);assert.equal(Object.values(p.items).reduce((a,b)=>a+b,0),kit.sourceQuantity);assert.equal(validateKitProfile(p,catalog,'lego').kitId,kit.id);}
const part=(id,sku)=>({id,sku,label:catalog.find(p=>p.id===sku).name,kind:catalog.find(p=>p.id===sku).kind,position:[0,0,0],rotation:[0,0,0]});
const beam=part('beam','32524'),pin=part('pin','2780'),hole=references[beam.sku].find(r=>r.normal[1]>.99&&Math.abs(r.point[2])<.1),tip=references[pin.sku].find(r=>r.normal[0]>.99);
assert.ok(hole&&tip);assert.ok(compatibleReferences(tip,hole,pin.sku,beam.sku));assert.ok(Math.abs(hole.point[1]-4)<.01,'8 mm beam entrance must be on its surface');assert.ok(Math.abs(tip.point[0]-8)<.01,'Pin endpoint must be converted from its segment center');
function attach(moving,a,fixed,b){const depth=recommendedInsertionDepth(a,b,moving.sku,fixed.sku);Object.assign(moving,matingPose(moving,a,fixed,b,{depth}));moving.mate={target:fixed.id,sourceRef:a.id,targetRef:b.id,depth,twist:0,flip:false};const w=worldReference(moving,a),t=worldReference(fixed,b);assert.ok(w.point.addScaledVector(t.normal,depth).distanceTo(t.point)<1e-6);}
attach(pin,tip,beam,hole);
const outer=references[pin.sku].find(r=>r.normal[0]<-.99),beam2=part('beam2','32524'),secondHole=references[beam.sku].find(r=>r.normal[1]<-.99&&Math.abs(r.point[2])<.1);attach(beam2,secondHole,pin,outer);
const placed=[beam,pin,beam2];
const objects=new Map(placed.map(p=>{const o=models.get(p.sku).clone(true);o.position.fromArray(p.position.map(n=>n/1000));o.rotation.set(...p.rotation.map(THREE.MathUtils.degToRad));o.updateMatrixWorld(true);return [p.id,o];}));
const fit=analyzeCollisions(placed,objects,{references});assert.ok(!fit.issues.some(i=>i.kind==='penetration'),JSON.stringify(fit));
const brick=part('brick','3004'),brick2=part('brick2','3004'),stud=references['3004'].find(r=>r.profile==='lego-stud'&&r.kind==='pin'),socket=references['3004'].find(r=>r.profile==='lego-stud'&&r.kind==='hole'&&Math.abs(r.point[0]-stud.point[0])<.01);attach(brick2,socket,brick,stud);assert.ok(!compatibleReferences(stud,hole,'3004','32524'),'A stud is not a Technic mounting pin');
const shaft=references['3705'].find(r=>r.kind==='pin'),gear=references['3648b'].find(r=>r.profile==='lego-cross');assert.ok(compatibleReferences(shaft,gear,'3705','3648b'));assert.ok(!compatibleReferences(tip,gear,'2780','3648b'),'Round pin must not enter cross socket');assert.ok(compatibleReferences(shaft,hole,'3705','32524'),'Axle may pass through a round bearing');
const profile=defaultKitProfile(catalog,'lego');assert.throws(()=>assertKitChange([],Array.from({length:profile.items['2780']+1},()=>({sku:'2780'})),catalog,profile),/Vượt giới hạn/);
const doc=validateProjectFile({version:1,platform:'lego',title:'LEGO fixture',parts:placed,groups:[],steps:[],kit:profile},'lego',catalog);assert.equal(doc.parts.length,3);assert.equal(doc.kit.kitId,'45544-1');assert.throws(()=>validateProjectFile(doc,'vexiq',catalog));
console.log('PASS: 329 actual GLBs / 481 color previews; seven kit quotas; real beam–pin–beam CAD; stud and cross-axle profiles; project validation and platform isolation.');
