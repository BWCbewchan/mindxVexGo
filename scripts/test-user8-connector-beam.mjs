import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';import {nearestMate} from '../public/assembly/mating.js';import {seatedConnectorContact,analyzeCollisions} from '../public/assembly/collision.js';
const project=JSON.parse(await fs.readFile('C:/Users/admin/Downloads/VEXGO-assembly (8).json','utf8')),refs=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const beam=project.parts.find(p=>p.id.startsWith('e0f150'));
const moving={...beam,mate:undefined,position:[beam.position[0],43,beam.position[2]]},snap=nearestMate(moving,project.parts,refs);assert.equal(snap.support,4);
const seated={...moving,...snap.pose,mate:{target:snap.target.id}},targets=[...new Set(snap.matches.map(m=>m.target))].map(id=>project.parts.find(p=>p.id===id));assert.equal(targets.length,2);
for(const target of targets)assert.equal(seatedConnectorContact(seated,target,refs,1),true);
assert.equal(seatedConnectorContact({...seated,position:seated.position.map(v=>v+20)},targets[0],refs,1),false);
const parts=[seated,...targets],objects=new Map();for(const part of parts){const buf=await fs.readFile(`public/assembly/parts/${part.sku}/model.glb`),g=await new GLTFLoader().parseAsync(buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),'');g.scene.position.fromArray(part.position.map(v=>v/1000));g.scene.rotation.set(...part.rotation.map(v=>v*Math.PI/180));objects.set(part.id,g.scene);}
const result=analyzeCollisions(parts,objects,{references:refs});assert.ok(!result.issues.some(i=>i.kind==='penetration'),JSON.stringify(result));console.log('PASS: user beam seats on four integral pegs from both yellow connectors; CAD contacts are valid joints; unrelated positions rejected.');
