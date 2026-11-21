// Convert a SolidWorks assembly (.SLDASM, SolidWorks 2015+ container) built from the VEX GO kit STEP
// parts into a mindX assembly project, so a teacher's CAD model can be used as ground truth.
// Usage: node scripts/vexgo/sldasm.mjs <file.SLDASM> <out.project.json> [--platform auto|go|iq] [--frame auto] [--png out.png]
// Works for VEX GO and VEX IQ models: the part number is read from the component name, the imported
// part name or the STEP path it was imported from ("2x8 Beam (228-2500-023) v1", ".../228-2500-042.STEP").
//
// The file is a list of records: marker 14 00 06 00 08 00, 8 bytes, compressed size, size, name length,
// name (each byte nibble-swapped), raw-deflate data. The record swXmlContents/COMPINSTANCETREE is XML with
// every component: its part (swImportedName, the GO SKU) and its placement swTransform (4x4, metres).
// Sub-assemblies are read from the .SLDASM file of that name next to the parent and composed.
// Part frames: our part GLBs are the same STEP geometry with Y and Z swapped, so each placement is
// mapped with a fixed axis change; --frame auto picks the variant under which most pins sit in holes.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import * as THREE from 'three';
import {ROOT,references as goReferences,partName as goName} from './lib.mjs';
import {worldReference} from '../../public/assembly/mating.js';

const args=process.argv.slice(2),flag=(n,f)=>{const i=args.indexOf('--'+n);return i<0?f:args[i+1];};
const [input,output]=args;
if(!input||!output)throw Error('Usage: sldasm.mjs <file.SLDASM> <out.project.json> [--platform auto|go|iq]');
const iqReferences=JSON.parse(fs.readFileSync(path.join(ROOT,'public/assembly/iq/connectors.json'),'utf8')).parts;
const iqNames=new Map((JSON.parse(fs.readFileSync(path.join(ROOT,'public/assembly/iq/parts.json'),'utf8')).parts??[]).map(p=>[p.id??p.sku,p.name]));
let references=goReferences,partName=goName;
const SKU=/(2[26]\d-\d{4}-\d{3,4}|228-\d{4})(?!\d)/;

const swap=b=>Buffer.from(b.map(x=>((x<<4)&0xf0)|(x>>4)));
export function records(buffer){
  const out=[],marker=Buffer.from([0x14,0,6,0,8,0]);let i=0;
  while((i=buffer.indexOf(marker,i))>=0){
    if(i+26>buffer.length)break;
    const cs=buffer.readUInt32LE(i+14),us=buffer.readUInt32LE(i+18),nl=buffer.readUInt32LE(i+22);
    if(nl>0&&nl<512&&cs<=buffer.length){
      const name=swap(buffer.subarray(i+26,i+26+nl)).toString('latin1'),start=i+26+nl,raw=buffer.subarray(start,start+cs);
      let data=null;try{data=zlib.inflateRawSync(raw);}catch{if(cs===us)data=raw;}
      if(data&&data.length===us){out.push({name,data});i=start+cs;continue;}
    }
    i+=1;
  }
  return out;
}
const attr=(tag,name)=>tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
function tree(file){
  const rec=records(fs.readFileSync(file)).find(r=>r.name==='swXmlContents/COMPINSTANCETREE');
  if(!rec)throw Error(`${file}: no component tree (not a SolidWorks 2015+ assembly?)`);
  const xml=rec.data.toString('utf8');
  const files=new Map([...xml.matchAll(/<swFile\s[^>]*>/g)].map(m=>[attr(m[0],'id'),{type:attr(m[0],'swDocType'),path:attr(m[0],'swPath'),imported:attr(m[0],'swImportedPath')}]));
  const models=new Map([...xml.matchAll(/<swModel\s[^>]*>/g)].map(m=>[attr(m[0],'id'),{name:attr(m[0],'swName'),imported:attr(m[0],'swImportedName'),file:attr(m[0],'swFileRef'),box:attr(m[0],'swBoundingBox')?.trim().split(/\s+/).map(Number)}]));
  // The top model's references are its components; nested swModel blocks repeat the format.
  const top=[...xml.matchAll(/<swModel\s[^>]*>([\s\S]*?)<\/swModel>/g)].find(m=>files.get(attr(m[0],'swFileRef'))?.type==='ASSEMBLY'&&path.basename(files.get(attr(m[0],'swFileRef')).path.replace(/\\/g,'/')).toLowerCase()===path.basename(file).toLowerCase())??[...xml.matchAll(/<swModel\s[^>]*>([\s\S]*?)<\/swModel>/g)].pop();
  return [...top[1].matchAll(/<swReference\s[^>]*?\/?>/g)].map(m=>{const t=m[0],model=models.get(attr(t,'swModelRef'));const f=files.get(model?.file);
    return {name:attr(t,'swComponentName')??attr(t,'swName'),suppressed:attr(t,'swSuppressed')==='YES',hidden:attr(t,'swHidden')==='YES',
      transform:(attr(t,'swTransform')??'').trim().split(/\s+/).map(Number),model,type:f?.type,path:f?.path,importedPath:f?.imported};});
}
// swTransform: a full 4x4 matrix, 16 numbers, column-major (translation in metres at 13-15),
// e.g. "1 0 0 0 0 1 0 0 0 0 1 0 0.031 0.041 0.055 1". The other order is tried by the pin check.
const matrix=(t,columnMajor)=>{const m=new THREE.Matrix4().fromArray(t.length>=16?t.slice(0,16):[t[0],t[1],t[2],0,t[3],t[4],t[5],0,t[6],t[7],t[8],0,t[9],t[10],t[11],1]);return columnMajor?m:m.transpose();};
// Find a referenced file next to the assembly, in the folder its saved path names, or anywhere below.
const located=new Map();
function locate(fromFile,savedPath){
  if(!savedPath)return null;
  const segments=savedPath.replace(/\\/g,'/').split('/'),base=segments.at(-1),dir=path.dirname(fromFile);
  for(const c of [path.join(dir,base),path.join(dir,segments.at(-2)??'',base)])if(fs.existsSync(c))return c;
  const key=dir+'|'+base.toLowerCase();if(located.has(key))return located.get(key);
  let found=null;
  const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){if(found)return;const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(e.name.toLowerCase()===base.toLowerCase())found=f;}};
  try{walk(dir);}catch{}
  located.set(key,found);return found;
}
// A renamed part ("motor.SLDPRT") still names the STEP part it was imported from inside its records.
const partFileSku=new Map();
function skuInPartFile(file){
  if(!file)return null;if(partFileSku.has(file))return partFileSku.get(file);
  const counts=new Map();
  for(const r of records(fs.readFileSync(file))){const t=r.data.toString('latin1')+r.data.toString('utf16le');for(const m of t.matchAll(new RegExp(SKU.source,'g')))counts.set(m[1],(counts.get(m[1])??0)+1);}
  const best=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0]??null;partFileSku.set(file,best);return best;
}
const skuOf=(c,file)=>[c.model?.imported,c.name,c.model?.name,c.importedPath,c.path].map(t=>t&&String(t).match(SKU)?.[1]).find(Boolean)??(c.type==='PART'?skuInPartFile(locate(file,c.path)):null);
function flatten(file,parent,columnMajor,out,missing,depth=0){
  for(const c of tree(file)){
    if(c.suppressed||c.transform.length<12)continue;
    const world=parent.clone().multiply(matrix(c.transform,columnMajor));
    if(c.type==='ASSEMBLY'){
      const sub=locate(file,c.path);
      // A multi-body STEP part imports as an assembly whose bodies carry no part number of their own:
      // place it as the one part it names instead of opening it.
      const named=[c.model?.imported,c.name,c.importedPath].map(t=>t&&String(t).match(SKU)?.[1]).find(Boolean);
      if(named){out.push({name:c.name,sku:named,matrix:world,hidden:c.hidden,box:c.model?.box});continue;}
      if(sub&&depth<=8){flatten(sub,world,columnMajor,out,missing,depth+1);continue;}
      missing.add(`${c.name} (sub-assembly file not found)`);continue;
    }
    out.push({name:c.name,sku:skuOf(c,file)??c.name,matrix:world,hidden:c.hidden,box:c.model?.box});
  }
  return out;
}
// Axis changes from the STEP/SolidWorks frame (Z up in the GO kit files) to ours (Y up).
// Axis changes from a part's STEP/SolidWorks frame to our part model's frame. Our GO parts are the STEP
// geometry with Y and Z swapped (x, z, -y): FRAMES[0]. Not every library part was converted the same way,
// so each part gets the axis rotation (of the 24) under which its CAD box matches our model's box.
const FRAMES=(()=>{const out=[[1,0,0, 0,0,1, 0,-1,0]];const perms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  for(const pm of perms)for(let sg=0;sg<8;sg++){const r=Array(9).fill(0);pm.forEach((c,row)=>r[row*3+c]=(sg>>row)&1?-1:1);
    const m=new THREE.Matrix4().set(r[0],r[1],r[2],0,r[3],r[4],r[5],0,r[6],r[7],r[8],0,0,0,0,1);if(m.determinant()>0&&!out.some(o=>o.join()===r.join()))out.push(r);}
  return out.map(r=>new THREE.Matrix4().set(r[0],r[1],r[2],0,r[3],r[4],r[5],0,r[6],r[7],r[8],0,0,0,0,1));})();
function project(parts,columnMajor,frameOf){
  // SolidWorks' world is Y up already; only the part frames change.
  const W=new THREE.Matrix4();
  const used=new Map();
  return parts.filter(p=>references[p.sku]).map(p=>{
    const m=W.clone().multiply(p.matrix).multiply(FRAMES[frameOf(p.sku)].clone().invert()),pos=new THREE.Vector3(),q=new THREE.Quaternion(),s=new THREE.Vector3();m.decompose(pos,q,s);
    const e=new THREE.Euler().setFromQuaternion(q,'XYZ');const base=p.sku.split('-').pop();const n=(used.get(base)??0)+1;used.set(base,n);
    return {id:`${partName(p.sku).toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${n}`,sku:p.sku,position:pos.toArray().map(v=>+(v*1000).toFixed(3)),rotation:[e.x,e.y,e.z].map(v=>+THREE.MathUtils.radToDeg(v).toFixed(4)),label:partName(p.sku)};
  });
}
// How many pin-type connectors sit on a hole of another part (axis within 0.6 mm, facing each other).
function seatedPins(parts){
  const holes=[];for(const p of parts)for(const r of references[p.sku]??[])if(r.kind==='hole')holes.push({id:p.id,...worldReference(p,r)});
  let seated=0,total=0;
  for(const p of parts)for(const r of references[p.sku]??[]){if(r.kind!=='pin')continue;total++;const w=worldReference(p,r);
    if(holes.some(h=>h.id!==p.id&&Math.abs(h.normal.dot(w.normal))>.98&&(()=>{const d=w.point.clone().sub(h.point),a=d.dot(h.normal);return Math.abs(a)<8&&d.addScaledVector(h.normal,-a).length()<.6;})()))seated++;}
  return {seated,total};
}
const missing=new Set();
const want=flag('frame','auto');
{
  const skus=flatten(input,new THREE.Matrix4(),true,[],new Set()).map(p=>p.sku);
  const known=refs=>skus.filter(s=>refs[s]).length;
  let platform=flag('platform','auto');
  // IQ part names say "Beam", "Connector Pin", "Smart Motor"; GO and IQ share number ranges.
  if(platform==='auto')platform=known(iqReferences)>known(goReferences)||/\(228-\d{4}-\d+\) v\d/.test(fs.readFileSync(input).toString('latin1'))&&known(iqReferences)>=known(goReferences)?'iq':'go';
  if(platform==='iq'){references=iqReferences;partName=sku=>iqNames.get(sku)??sku;}
  globalThis.PLATFORM=platform==='iq'?'vexiq':'vexgo';
}
// Pick the part-frame change by comparing each part's box in the CAD file with our part model's box.
async function ourBox(sku){
  const dir=globalThis.PLATFORM==='vexiq'?'public/assembly/iq/parts':'public/assembly/parts';
  const cad=path.join(ROOT,dir,sku,'cad.json');
  if(fs.existsSync(cad)){const b=JSON.parse(fs.readFileSync(cad,'utf8')).bounds;if(b)return new THREE.Box3(new THREE.Vector3(...b.min),new THREE.Vector3(...b.max));}
  const glb=path.join(ROOT,dir,sku,'model.glb');if(!fs.existsSync(glb))return null;
  const {GLTFLoader}=await import('three/examples/jsm/loaders/GLTFLoader.js');const data=fs.readFileSync(glb);
  const gltf=await new GLTFLoader().parseAsync(data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength),'');
  const box=new THREE.Box3().setFromObject(gltf.scene);box.min.multiplyScalar(1000);box.max.multiplyScalar(1000);return box;
}
const parts=flatten(input,new THREE.Matrix4(),true,[],missing);
const boxes=new Map();for(const p of parts)if(references[p.sku]&&p.box?.length===6&&!boxes.has(p.sku))boxes.set(p.sku,{sw:p.box.map(v=>v*1000),ours:await ourBox(p.sku)});
const boxError=(sku,frame)=>{const {sw,ours}=boxes.get(sku);const b=new THREE.Box3(new THREE.Vector3(...sw.slice(0,3)),new THREE.Vector3(...sw.slice(3))).applyMatrix4(FRAMES[frame]);return b.min.distanceTo(ours.min)+b.max.distanceTo(ours.max);};
const chosen=new Map(),errors=[];const perPart=[];
for(const [sku,{ours}] of boxes){if(!ours)continue;let f=0,e=boxError(sku,0);for(const k of FRAMES.keys()){const ek=boxError(sku,k);if(ek<e-.5){f=k;e=ek;}}chosen.set(sku,f);errors.push(e);perPart.push([sku,+e.toFixed(1)]);}
if(process.env.SLDASM_DEBUG)console.error(perPart.filter(([,e])=>e>1).map(x=>x.join(':')).join(' '));
const fixed=want==='auto'?null:Number(want);
const frameOf=sku=>fixed??chosen.get(sku)??0;
const result=project(parts,true,frameOf);
const best={result,score:seatedPins(result),all:parts,error:errors.length?+(errors.reduce((a,b)=>a+b,0)/errors.length).toFixed(2):null,
  remapped:[...chosen].filter(([,f])=>f!==0).map(([k])=>k)};
const unknown=[...new Set(best.all.filter(p=>!references[p.sku]).map(p=>p.sku||p.name))];
fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});
// Direct sub-assemblies (their own .SLDASM files), so a library can nest them under this model.
const subassemblies=[...new Set(tree(input).filter(c=>c.type==='ASSEMBLY'&&!c.suppressed&&!SKU.test(c.model?.imported??c.name??'')&&locate(input,c.path)).map(c=>path.basename(c.path.split(String.fromCharCode(92)).join('/'))))];
fs.writeFileSync(output,JSON.stringify({version:1,platform:globalThis.PLATFORM,title:path.basename(input,path.extname(input)),source:path.basename(input),hideCables:true,subassemblies,parts:best.result,groups:[]},null,1)+'\n','utf8');
console.log(JSON.stringify({file:path.basename(input),platform:globalThis.PLATFORM,components:best.all.length,placed:best.result.length,unknownParts:unknown,missing:[...missing],pinsSeated:`${best.score.seated}/${best.score.total}`,boxErrorMm:best.error,partsWithOwnFrame:best.remapped}));
const png=flag('png');
if(png){const rec=records(fs.readFileSync(input)).find(r=>r.name==='PreviewPNG');if(rec)fs.writeFileSync(png,rec.data);}
