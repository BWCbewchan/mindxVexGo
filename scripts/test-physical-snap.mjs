import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
globalThis.location={href:'http://localhost/assembly/iq/editor.html'};
const {createSnapFitValidator}=await import('../public/assembly/snap-fit.js');
const {nearestMate,matingPose}=await import('../public/assembly/mating.js');
const {nearestAssemblyMate,assemblyMatingContext}=await import('../public/assembly/assembly-mating.js');
const {recoverSeatedAssemblyLinks}=await import('../public/assembly/repair-links.js');
const refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts,loader=new GLTFLoader(),assets=new Map();
async function object(part){if(!assets.has(part.sku)){const b=await fs.readFile(`public/assembly/iq/parts/${part.sku}/model.glb`);assets.set(part.sku,(await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'')).scene);}const obj=assets.get(part.sku).clone(true);obj.position.fromArray(part.position.map(v=>v/1000));obj.rotation.set(...part.rotation.map(THREE.MathUtils.degToRad));obj.updateMatrixWorld(true);return obj;}
const beam={id:'beam',sku:'228-2500-026',position:[0,50,0],rotation:[0,0,0]},pin={id:'pin',sku:'228-2500-060',position:[0,0,0],rotation:[0,0,0]};
Object.assign(pin,matingPose(pin,refs[pin.sku].find(r=>r.id==='1'),beam,refs[beam.sku].find(r=>r.kind==='hole'&&r.normal[1]===1),{depth:4.55}));
const blocker={...beam,id:'overlapping-beam'},parts=[beam,pin,blocker],objects=new Map();for(const p of parts)objects.set(p.id,await object(p));
const fit=createSnapFitValidator(objects,()=>refs);
assert.equal(fit.check([beam,pin],['pin']).ok,true,'A real IQ pin still fits its real bore');
assert.equal(fit.check(parts,['blocker']).ok,false,'Missing CAD cannot produce a green valid-snap hint');
const overlap=fit.check(parts,['overlapping-beam']);assert.equal(overlap.ok,false,'Two coincident real beam bodies cannot attach');
assert.ok(overlap.issues.some(i=>i.b==='beam'));
const source={...pin,id:'moving-pin',position:pin.position.map((v,i)=>v+(i===0?1:0))};objects.set(source.id,await object(source));
const movingBeam={...blocker,id:'moving-beam',position:[...blocker.position]},group=[source,movingBeam];
objects.set(movingBeam.id,await object(movingBeam));
// Even if a pin has a valid target, its group carries a second beam through
// that target. Every preview must validate the entire moving group.
assert.equal(fit.check([beam,...group],group.map(p=>p.id)).ok,false);
const sceneParts=[beam,...group],ids=group.map(p=>p.id),context=assemblyMatingContext(structuredClone(sceneParts),refs);
const guarded=nearestAssemblyMate(sceneParts,refs,ids,{context,acceptCandidate:next=>fit.check(next.parts,ids).ok});
assert.ok(!guarded||fit.check(guarded.parts,ids).ok,'The solver cannot return a green group proposal with overlapping bodies');
assert.equal(nearestMate(source,[beam,source],refs,{acceptCandidate:()=>false}),null,'Single-part suggestions honor the physical gate too');
const seated=[beam,pin],recovered=recoverSeatedAssemblyLinks(seated,refs);
assert.equal(recovered.recovered,1);assert.equal(recovered.moved,0);
assert.deepEqual(recovered.parts.map(p=>[p.position,p.rotation]),seated.map(p=>[p.position,p.rotation]));
pin.snapBlocked=[{target:beam.id,sourceRef:'1',targetRef:'1'}];assert.equal(recoverSeatedAssemblyLinks([beam,pin],refs).recovered,0,'Released assemblies remain released');
const before=objects.get('beam').matrixWorld.toArray();fit.check(parts,['overlapping-beam']);assert.deepEqual(objects.get('beam').matrixWorld.toArray(),before,'Validation never mutates the live CAD scene');
console.log('PASS: real IQ pin/bore seating, solid beam overlap rejected for single/group previews, immutable scene, and metadata-only recovery.');
