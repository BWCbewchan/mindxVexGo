import fs from 'node:fs/promises';
import path from 'node:path';
import * as THREE from 'three';
import {LDrawLoader} from 'three/addons/loaders/LDrawLoader.js';
import {LDrawConditionalLineMaterial} from 'three/addons/materials/LDrawConditionalLineMaterial.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';

// Browser-only Blob adapter used by the official exporter, not upstream code.
globalThis.FileReader=class {
 readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();this.onload?.();});}
 readAsDataURL(blob){blob.arrayBuffer().then(result=>{this.result=`data:${blob.type};base64,${Buffer.from(result).toString('base64')}`;this.onloadend?.();this.onload?.();});}
};
globalThis.ProgressEvent=class extends Event{constructor(type,props){super(type);Object.assign(this,props);}};
const root=path.resolve('public/assembly/lego'),index=JSON.parse(await fs.readFile(path.join(root,'parts-index.json'),'utf8'));
const loader=new LDrawLoader();
loader.setConditionalLineMaterial(LDrawConditionalLineMaterial);
loader.partsCache.parseCache.fetchData=async name=>{
 const normalized=name.toLowerCase().replaceAll('\\','/');
 for(const candidate of [normalized,'parts/'+normalized,'p/'+normalized,'parts/s/'+normalized]){
  if(candidate.includes('..')||candidate.includes(':'))throw Error('Unsafe part path');
  try{return await fs.readFile(path.join(root,'ldraw',candidate),'utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 }
 throw Error('Missing dependency '+name);
};
await loader.preloadMaterials('data:text/plain,'+encodeURIComponent(await fs.readFile(path.join(root,'ldraw/ldconfig.ldr'),'utf8')));
const catalog=[],report=[],exporter=new GLTFExporter(),catalogPath=path.join(root,'parts.json');
const classify=(id,row)=>{
 const name=row.name.toLowerCase();
 if(name.includes('electric'))return name.includes('motor')?'motor':name.includes('battery')?'battery':name.includes('hub')||/95646/.test(id)?'brain':'sensor';
 if(/^(technic )?axle\s+\d/.test(name))return 'shaft';
 if(/^(technic )?pin\b/.test(name))return 'pin';
 if(/gear|worm/.test(name))return 'gear';
 if(/wheel|tyre|tire/.test(name))return 'wheel';
 if(/bush|spacer/.test(name))return 'retainer';
 return 'body';
};
for(const [id,row] of Object.entries(index.parts)){
 const group=await new Promise((resolve,reject)=>loader.parse(`0 LEGO ${id}\n1 16 0 0 0 1 0 0 0 1 0 0 0 1 ${id}.dat\n`,resolve,reject));
 const remove=[];let vertices=0;
 group.traverse(object=>{
  if(object.isLineSegments){remove.push(object);return;}
  if(!object.isMesh)return;
  vertices+=object.geometry.attributes.position.count;
  const convert=material=>new THREE.MeshStandardMaterial({name:material.name,color:material.color,roughness:.75,metalness:0,opacity:material.opacity,transparent:material.transparent,side:THREE.DoubleSide,userData:{legoMain:material.userData.code==='16'}});
  object.material=Array.isArray(object.material)?object.material.map(convert):convert(object.material);
 });
 for(const object of remove)object.removeFromParent();
 if(!vertices)throw Error('Empty CAD '+id);
 group.rotation.x=Math.PI;group.scale.setScalar(.0004);group.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(group),size=bounds.getSize(new THREE.Vector3()).multiplyScalar(1000);
 group.userData={source:'The LDraw Parts Library',sourcePart:id,license:'See /assembly/lego/ATTRIBUTION.md and original LDraw headers'};
 const folder=path.join(root,'parts',id);await fs.mkdir(folder,{recursive:true});
 const glb=await exporter.parseAsync(group,{binary:true});await fs.writeFile(path.join(folder,'model.glb'),Buffer.from(glb));
 // Rebrickable 9999 is a color-independent sticker, not an LDConfig color.
 const hex=code=>loader.getMaterial(String(code))?.color.getHexString()||index.colors[code]?.rgb||'FFFFFF';
 const colorByCode=Object.fromEntries(Object.keys(row.colors).map(code=>[code,'#'+hex(code)]));
 catalog.push({id,name:(row.rbname||row.name).replace(/\s+/g,' ').trim(),category:/Electric/.test(row.name)?'electronics':'mechanical',kind:classify(id,row),sets:row.sets,defaultColor:row.dc,kitColors:row.dcs,colors:colorByCode,color:'#'+hex(row.dc),boundsMM:{min:bounds.min.toArray().map(n=>n*1000),max:bounds.max.toArray().map(n=>n*1000)},units:'meters'});
 report.push({id,vertices,bytes:glb.byteLength,sizeMM:size.toArray()});
 if(catalog.length%25===0)console.log('Converted',catalog.length,'/',Object.keys(index.parts).length);
}
await fs.writeFile(catalogPath,JSON.stringify(catalog,null,2)+'\n','utf8');
await fs.mkdir('artifacts/lego',{recursive:true});await fs.writeFile('artifacts/lego/cad-report.json',JSON.stringify(report,null,2),'utf8');
console.log('PASS:',catalog.length,'nonempty LEGO GLBs; bytes:',report.reduce((n,p)=>n+p.bytes,0));
