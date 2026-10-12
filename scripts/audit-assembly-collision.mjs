import fs from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {analyzeCollisions} from '../public/assembly/collision.js';
const file=process.argv[2]||'artifacts/one-motor-car/One Motor Car.assembly.json';
const project=JSON.parse(await fs.readFile(file,'utf8')),objects=new Map(),cache=new Map(),loader=new GLTFLoader();
for(const part of project.parts){
 if(!cache.has(part.sku)){const bytes=await fs.readFile(`public/assembly/parts/${part.sku}/model.glb`);cache.set(part.sku,(await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene);}
 const obj=cache.get(part.sku).clone(true);obj.position.fromArray(part.position.map(v=>v/1000));obj.rotation.set(...part.rotation.map(THREE.MathUtils.degToRad));obj.updateMatrixWorld(true);objects.set(part.id,obj);
}
const report=analyzeCollisions(project.parts,objects);
const names=new Map(project.parts.map(p=>[p.id,p.label]));
report.issues=report.issues.map(i=>({...i,first:names.get(i.a),second:names.get(i.b)}));
await fs.writeFile(file.replace('.assembly.json','-mesh-review.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
