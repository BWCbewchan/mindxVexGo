import fs from 'node:fs/promises';import * as THREE from 'three';import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
globalThis.location={href:'http://localhost/assembly/iq/editor.html'};
const {meshContact,collisionMesh}=await import('../public/assembly/collision.js');
const project=JSON.parse(await fs.readFile('scripts/fixtures/iq-guide-codebase.json','utf8'));
const original=JSON.stringify(project.parts);
const loader=new GLTFLoader(),cache=new Map(),objects=new Map();
for(const p of project.parts){if(!cache.has(p.sku)){const raw=await fs.readFile(`public/assembly/iq/parts/${p.sku}/model.glb`);const gltf=await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');cache.set(p.sku,gltf.scene);}const obj=cache.get(p.sku).clone(true);obj.position.fromArray(p.position.map(v=>v/1000));obj.rotation.set(...p.rotation.map(THREE.MathUtils.degToRad));obj.updateMatrixWorld(true);objects.set(p.id,obj);}


const {seatedConnections}=await import('../public/assembly/assembly-review.js');
const {analyzeIQInsertionPaths}=await import('../public/assembly/iq-insertion-paths.js');
const refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts,links=new Map(project.parts.map(p=>[p.id,[]]));
for(const c of seatedConnections(project.parts,refs)){links.get(c.part).push(c);links.get(c.target).push({...c,part:c.target,target:c.part,sourceRef:c.targetRef,targetRef:c.sourceRef});}
const start=performance.now(),audit=analyzeIQInsertionPaths(project.parts,refs,links,objects);
console.log('Audit ms',Math.round(performance.now()-start));
await fs.writeFile('artifacts/iq-insertion-routes.json',JSON.stringify([...audit],null,2));

const {generateStudentGuide}=await import('../public/assembly/guide-sequence.js');
const guide=generateStudentGuide(project.parts,{references:refs,inferConnections:true,insertionPaths:audit});

const assert=(await import('node:assert/strict')).default;
assert.equal(guide.ready,true,JSON.stringify(guide.blockers));
assert.equal(JSON.stringify(project.parts),original,'Route analysis preserves the document');
const index=id=>guide.steps.findIndex(s=>s.added.some(p=>p.id===id)),motor=project.parts.find(p=>p.kind==='motor'),drive=project.parts.find(p=>p.sku==='228-2500-2236'),cap=project.parts.find(p=>p.sku==='228-2500-2225');
assert.ok(index(drive.id)<index(motor.id),'Install flanged drive shaft before the motor traps it against the frame');
const capStep=guide.steps[index(cap.id)];assert.equal(capStep.joint.target,project.parts[1].id,'Show first entry support, not a middle bearing');assert.ok(capStep.insertion.clearance>60,'Withdraw the complete capped shaft before drawing an insertion arrow');
assert.ok(capStep.insertion.axis[2]>.99,'The capped shaft enters from its head side; its cap never passes the bearing');
assert.ok(audit.get(drive.id).find(r=>r.axis[2]<-.99).blockedBy.includes(project.parts[7].id),'The old motor-side route really is blocked by the frame');
const included=new Set();
for(const step of guide.steps){
 const added=new Set(step.added.map(p=>p.id));for(const item of step.added){const p=project.parts.find(p=>p.id===item.id),joint=step.parts.find(p=>p.id===item.id).mate;if(!joint)continue;
  const route=audit.get(p.id).find(r=>r.axis.every((v,i)=>Math.abs(v-step.insertion.axis[i])<.001)&&r.contacts.some(c=>c.target===joint.target&&c.sourceRef===joint.sourceRef&&c.targetRef===joint.targetRef));assert.ok(route,'Every instruction uses an actual mating axis');assert.ok(route.blockedBy.every(id=>!included.has(id)),'Previously installed bodies cannot obstruct insertion');
  if(p.kind==='shaft'){
   const obj=objects.get(p.id),base=obj.position.clone(),axis=new THREE.Vector3(...step.insertion.axis);
   for(let mm=.5;mm<=step.insertion.clearance;mm+=1){obj.position.copy(base).addScaledVector(axis,mm/1000);obj.updateMatrixWorld(true);for(const other of project.parts)if(included.has(other.id)&&!added.has(other.id))assert.notEqual(meshContact(collisionMesh(obj),collisionMesh(objects.get(other.id))),'penetration',`Shaft crosses ${other.label} at ${mm} mm`);}
   obj.position.copy(base);obj.updateMatrixWorld(true);
  }
 }for(const id of added)included.add(id);
}
assert.equal(included.size,26);
const impossible=new Map([...audit].map(([id,rows])=>[id,rows.map(r=>({...r,blockedBy:[...r.blockedBy,project.parts[7].id]}))]));
assert.equal(generateStudentGuide(project.parts,{references:refs,inferConnections:true,insertionPaths:impossible}).ready,false,'A blocked route must not be exported as a verified instruction');
await fs.mkdir('artifacts/iq-route-review',{recursive:true});await fs.writeFile('artifacts/iq-route-review/guide.json',JSON.stringify(guide,null,2));
console.log('PASS: all 26 parts have supported CAD-sampled insertion routes; both complete shaft sweeps clear every earlier body; motor cannot precede its shaft; blocked paths fail closed.');
for(const [i,s] of guide.steps.entries())console.log(i+1,s.title);
