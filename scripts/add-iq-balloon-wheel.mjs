import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';

globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();});}};
const root='public/assembly/iq',id='iq-balloon-wheel';
const components=[{sku:'228-2500-1953',quantity:1},{sku:'228-2500-1958',quantity:1}];
const group=new THREE.Group();group.name='2x Wide Balloon Wheel';
const loader=new GLTFLoader(),hash=createHash('sha256');
for(const [index,component] of components.entries()){
 const bytes=await fs.readFile(`${root}/parts/${component.sku}/model.glb`);hash.update(bytes);
 const model=(await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene;
 model.name=index?'balloon-tire':'wheel-hub';
// Original tire and hub point in opposite axial directions. Rotate the tire
 // only: its axial range then matches the hub rim (-21.336 to +2.286 mm).
 if(index)model.rotation.x=Math.PI;
 group.add(model);
}
const bytes=await new GLTFExporter().parseAsync(group,{binary:true});
await fs.mkdir(`${root}/parts/${id}`,{recursive:true});
await fs.writeFile(`${root}/parts/${id}/model.glb`,Buffer.from(bytes));
const box=new THREE.Box3().setFromObject(group),bounds={min:box.min.toArray().map(v=>v*1000),max:box.max.toArray().map(v=>v*1000)};
const entry={id,sku:id,name:'2x Wide Balloon Wheel (Tire + 48.5mm Hub)',category:'mechanical',kind:'wheel',components,sourceHash:hash.update('tire-rotation-x-radians:pi').digest('hex'),bounds,sourceFile:'Composite of original 228-2500-1953 and 228-2500-1958 STEP models'};
const refs=JSON.parse(await fs.readFile(`${root}/connectors.json`,'utf8'));
const row={...entry,status:'ok',source:'https://www.vexrobotics.com/parts/228-7755',units:'millimeters',axes:'Y up',references:structuredClone(refs.parts['228-2500-1953'].filter(r=>r.kind==='hole'&&(r.profile==='square-drive'||r.radius===2.1))),bytes:bytes.byteLength,materialPolicy:'Gray hub / black tire, supplied STEP geometry unchanged except assembly positioning'};
const catalog=JSON.parse(await fs.readFile(`${root}/parts.json`,'utf8')).filter(p=>p.id!==id);catalog.push(entry);catalog.sort((a,b)=>a.name.localeCompare(b.name));
refs.parts[id]=row.references;
// Dedicated rim/bead frames let the two loose original parts snap together too.
// Tire is reversed about the axle; both original source meshes keep their scale.
for(const [sku,kind,y] of [['228-2500-1953','pin',-9.525],['228-2500-1958','hole',9.525]]){
 const ref={id:'balloon-rim',kind,profile:'iq-balloon-rim',label:kind==='pin'?'Lắp lốp Balloon vào vành':'Lắp vào vành 48.5 mm',point:[0,y,0],normal:[0,-1,0],radius:24.25,width:48.5,depth:0,maxDepth:0,evidence:'Original hub/tire axial seating ranges; reverse tire aligns -21.336 to +2.286 mm.'};
 refs.parts[sku]=[...refs.parts[sku].filter(r=>r.id!==ref.id),ref];
 const metaPath=`${root}/parts/${sku}/cad.json`,meta=JSON.parse(await fs.readFile(metaPath,'utf8'));meta.references=refs.parts[sku];await fs.writeFile(metaPath,JSON.stringify(meta,null,2),'utf8');
}

const manifest=JSON.parse(await fs.readFile(`${root}/cad-manifest.json`,'utf8'));manifest.parts=manifest.parts.filter(p=>p.id!==id);manifest.parts.push(row);for(const part of manifest.parts)if(['228-2500-1953','228-2500-1958'].includes(part.id))part.references=refs.parts[part.id];manifest.converted=manifest.parts.filter(p=>p.status==='ok').length;
await fs.writeFile(`${root}/parts/${id}/cad.json`,JSON.stringify(row,null,2),'utf8');
await fs.writeFile(`${root}/parts.json`,JSON.stringify(catalog),'utf8');
await fs.writeFile(`${root}/connectors.json`,JSON.stringify(refs),'utf8');
await fs.writeFile(`${root}/cad-manifest.json`,JSON.stringify(manifest,null,2),'utf8');
console.log('Registered',id,'with original hub square shaft references; bytes:',bytes.byteLength);
