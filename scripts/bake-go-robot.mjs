// Bakes a VEX GO assembly project (public/assembly/*.json format) into one light GLB for RoboCode.
// Parts come from public/assembly/parts/<sku>/model.glb (metres, Y up); project positions are mm,
// rotations are XYZ Euler degrees. Meshes are merged per material colour and quantised, so the
// robot is a few draw calls instead of thousands of CAD faces.
// Usage: node scripts/bake-go-robot.mjs <project.json> <out.glb> [--simplify 0.05] [--separate wheel-a,wheel-b]
// --simplify keeps that share of triangles using meshoptimizer (npm i meshoptimizer, or set
// MESHOPT to its index.module.js). The baked GLB is committed, so the app never needs it.
import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter.js';
import {mergeGeometries,mergeVertices,toCreasedNormals} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {pathToFileURL} from 'node:url';
import {isCable} from './vexgo/lib.mjs';

globalThis.FileReader??=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(r=>{this.result=r;this.onloadend?.();});}readAsDataURL(blob){blob.arrayBuffer().then(r=>{this.result='data:application/octet-stream;base64,'+Buffer.from(r).toString('base64');this.onloadend?.();});}};

const [input,output]=process.argv.slice(2);
const ratioArg=process.argv.indexOf('--simplify'),keep=ratioArg>0?Number(process.argv[ratioArg+1]):1;
if(!input||!output)throw new Error('Usage: node scripts/bake-go-robot.mjs <project.json> <out.glb> [--simplify 0.05]');
const {MeshoptSimplifier}=keep<1?await import(process.env.MESHOPT?pathToFileURL(process.env.MESHOPT).href:'meshoptimizer'):{};
if(MeshoptSimplifier)await MeshoptSimplifier.ready;
const project=JSON.parse(fs.readFileSync(input,'utf8'));
// --separate id,id: keep these parts as their own nodes (wheels the simulator spins).
const separateArg=process.argv.indexOf('--separate');
if(separateArg>0)for(const id of process.argv[separateArg+1].split(','))project.parts.find(p=>p.id===id).separate=true;
// Electronics CAD ships straight cables; keep only faces near the part body.
// Same rule as the app and the assembly tools (housing box per device, public/assembly/electronics-housing.js).
const keepMesh=(sku,node)=>!isCable(sku,new THREE.Box3().setFromObject(node));
// Layout parts give `place: {axes, center}` instead of position/rotation: axes names, for world X, Y and Z,
// the signed local axis that points that way ('+y+z+x'); center is the part's world bounding-box centre in mm.
const AXIS={x:new THREE.Vector3(1,0,0),y:new THREE.Vector3(0,1,0),z:new THREE.Vector3(0,0,1)};
const loader=new GLTFLoader(),cache=new Map();
const loadPart=async sku=>{
  if(!cache.has(sku)){const file=path.resolve('public/assembly/parts',sku,'model.glb');const b=fs.readFileSync(file);cache.set(sku,await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),''));}
  return cache.get(sku).scene;
};
const buckets=new Map();let sourceTriangles=0;
const localBox=scene=>{scene.updateMatrixWorld(true);const box=new THREE.Box3();scene.traverse(node=>{if(node.isMesh&&node.userData.keep!==false)box.union(new THREE.Box3().setFromObject(node));});return box;};
for(const part of project.parts){
  const scene=await loadPart(part.sku);
  scene.updateMatrixWorld(true);scene.traverse(node=>{if(node.isMesh)node.userData.keep=keepMesh(part.sku,node);});
  if(part.place){
    const rows=part.place.axes.match(/[+-][xyz]/g).map(t=>AXIS[t[1]].clone().multiplyScalar(t[0]==='-'?-1:1));
    const m=new THREE.Matrix4().set(...rows[0].toArray(),0,...rows[1].toArray(),0,...rows[2].toArray(),0,0,0,0,1);
    const q=new THREE.Quaternion().setFromRotationMatrix(m);
    const c=localBox(scene).getCenter(new THREE.Vector3()).applyQuaternion(q);
    part.position=new THREE.Vector3(...part.place.center).sub(c.multiplyScalar(1000)).toArray().map(v=>+v.toFixed(3));
    const e=new THREE.Euler().setFromQuaternion(q);part.rotation=[e.x,e.y,e.z].map(v=>+THREE.MathUtils.radToDeg(v).toFixed(4));
  }
  const pose=new THREE.Matrix4().compose(new THREE.Vector3(...part.position.map(v=>v/1000)),new THREE.Quaternion().setFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad))),new THREE.Vector3(1,1,1));
  scene.updateMatrixWorld(true);
  scene.traverse(node=>{
    if(!node.isMesh||node.userData.keep===false)return;
    const materials=Array.isArray(node.material)?node.material:[node.material];
    const color=materials[0]?.color?.getHexString()??'cccccc';
    const geometry=node.geometry.clone();
    for(const name of Object.keys(geometry.attributes))if(name!=='position')geometry.deleteAttribute(name);
    geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(pose,node.matrixWorld));
    const flat=geometry.index?geometry.toNonIndexed():geometry;
    sourceTriangles+=flat.attributes.position.count/3;
    // `separate` parts (wheels) stay their own node so the simulator can spin them.
    const key=`${part.separate?part.id:'body'}|${color}|${(materials[0]?.metalness??0).toFixed(2)}|${(materials[0]?.roughness??1).toFixed(2)}`;
    (buckets.get(key)??buckets.set(key,{material:materials[0],list:[]}).get(key)).list.push(flat);
  });
}
const root=new THREE.Group();root.name=project.title||'VEX GO robot';let triangles=0;const nodes=new Map();
for(const [key,{material,list}] of buckets){
  let geometry=mergeVertices(mergeGeometries(list,false),1e-5);
  if(MeshoptSimplifier&&geometry.index.count>600){
    const target=Math.max(300,Math.floor(geometry.index.count*keep/3)*3);
    const [indices]=MeshoptSimplifier.simplify(new Uint32Array(geometry.index.array),new Float32Array(geometry.attributes.position.array),3,target,.02);
    geometry.setIndex(new THREE.BufferAttribute(indices,1));
  }
  geometry=toCreasedNormals(geometry,THREE.MathUtils.degToRad(35));
  geometry=mergeVertices(geometry,1e-5);
  triangles+=(geometry.index?geometry.index.count:geometry.attributes.position.count)/3;
  const [owner,hex]=key.split('|');
  const out=new THREE.MeshStandardMaterial({color:'#'+hex,metalness:material?.metalness??0,roughness:Math.max(.35,material?.roughness??.6)});
  const mesh=new THREE.Mesh(geometry,out);mesh.name=`go-${hex}`;
  if(owner==='body')root.add(mesh);else (nodes.get(owner)??nodes.set(owner,[]).get(owner)).push(mesh);
}
for(const [id,meshes] of nodes){
  // Node origin at the part's bounding-box centre (a wheel's axle); the largest mesh is the node itself.
  const box=new THREE.Box3();meshes.forEach(mesh=>box.expandByObject(mesh));const center=box.getCenter(new THREE.Vector3());
  meshes.forEach(mesh=>mesh.geometry.translate(-center.x,-center.y,-center.z));
  meshes.sort((a,b)=>b.geometry.index.count-a.geometry.index.count);
  const [main,...rest]=meshes;main.name=`part-${id}`;main.position.copy(center);rest.forEach(mesh=>main.add(mesh));root.add(main);
}
const projectOut=process.argv.indexOf('--project');
if(projectOut>0)fs.writeFileSync(process.argv[projectOut+1],JSON.stringify({...project,parts:project.parts.map(({place,...part})=>part)},null,1)+'\n','utf8');
const glb=await new GLTFExporter().parseAsync(root,{binary:true});
fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,Buffer.from(glb));
const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3());
console.log(JSON.stringify({parts:project.parts.length,meshes:root.children.length,sourceTriangles,triangles,bytes:glb.byteLength,sizeMm:size.toArray().map(v=>Math.round(v*1000)),minMm:box.min.toArray().map(v=>Math.round(v*1000)),maxMm:box.max.toArray().map(v=>Math.round(v*1000))}));
