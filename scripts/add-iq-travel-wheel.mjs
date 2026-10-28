import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';

globalThis.FileReader=class{readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();});}};
const root='public/assembly/iq',id='iq-200mm-travel-wheel';
const components=[{sku:'228-2500-1208',quantity:1},{sku:'228-2500-209',quantity:1}];
const group=new THREE.Group();group.name='200mm Travel Wheel';
const loader=new GLTFLoader(),hash=createHash('sha256');
for(const [index,component] of components.entries()){
 const bytes=await fs.readFile(`${root}/parts/${component.sku}/model.glb`);hash.update(bytes);
 const model=(await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene;
 model.name=index?'travel-tire':'wheel-hub';
 // Original hub rim is centered at Z=6.35 mm in STEP (Y after conversion).
 // The separate tire CAD is centered at zero. Preserve the hub's shaft bore.
 if(index)model.position.y+=.00635;
 group.add(model);
}
const bytes=await new GLTFExporter().parseAsync(group,{binary:true});
await fs.mkdir(`${root}/parts/${id}`,{recursive:true});
await fs.writeFile(`${root}/parts/${id}/model.glb`,Buffer.from(bytes));
const box=new THREE.Box3().setFromObject(group),bounds={min:box.min.toArray().map(v=>v*1000),max:box.max.toArray().map(v=>v*1000)};
const entry={id,sku:id,name:'200mm Travel Wheel (Tire + 44mm Hub)',category:'mechanical',kind:'wheel',components,sourceHash:hash.update('tire-offset-y-mm:6.35').digest('hex'),bounds,sourceFile:'Composite of original 228-2500-1208 and 228-2500-209 STEP models'};
const refs=JSON.parse(await fs.readFile(`${root}/connectors.json`,'utf8'));
const row={...entry,status:'ok',source:'https://www.vexrobotics.com/parts/228-7755',units:'millimeters',axes:'Y up',references:structuredClone(refs.parts['228-2500-1208']),bytes:bytes.byteLength,materialPolicy:'Gray hub / black tire, supplied STEP geometry unchanged except assembly positioning'};
const catalog=JSON.parse(await fs.readFile(`${root}/parts.json`,'utf8')).filter(p=>p.id!==id);catalog.push(entry);catalog.sort((a,b)=>a.name.localeCompare(b.name));
refs.parts[id]=row.references;
const manifest=JSON.parse(await fs.readFile(`${root}/cad-manifest.json`,'utf8'));manifest.parts=manifest.parts.filter(p=>p.id!==id);manifest.parts.push(row);manifest.converted=manifest.parts.filter(p=>p.status==='ok').length;
await fs.writeFile(`${root}/parts/${id}/cad.json`,JSON.stringify(row,null,2),'utf8');
await fs.writeFile(`${root}/parts.json`,JSON.stringify(catalog),'utf8');
await fs.writeFile(`${root}/connectors.json`,JSON.stringify(refs),'utf8');
await fs.writeFile(`${root}/cad-manifest.json`,JSON.stringify(manifest,null,2),'utf8');
console.log('Registered',id,'with original hub square shaft references; bytes:',bytes.byteLength);
