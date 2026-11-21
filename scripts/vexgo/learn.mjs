// Learn assembly rules from correct models (teacher CAD converted with sldasm.mjs).
// Usage: node scripts/vexgo/learn.mjs <out.json> <project.json>... [--collisions]
// For every pin-type connector that sits on a hole of another part it records the joint: pin part,
// host part, how far the pin reference sits past the hole reference along the axis (insertion), and
// whether the host connector is on a stud or a flat face. With --collisions it also runs our collision
// check on each model: these models are correct, so every "error" it reports is a false alarm to fix.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,references as goReferences,connectorNames,collisions} from './lib.mjs';
import {worldReference} from '../../public/assembly/mating.js';

const args=process.argv.slice(2),withCollisions=args.includes('--collisions');
const [out,...files]=args.filter(a=>!a.startsWith('--'));
if(!out||!files.length)throw Error('Usage: learn.mjs <out.json> <project.json>... [--collisions]');
const iqReferences=JSON.parse(fs.readFileSync(path.join(ROOT,'public/assembly/iq/connectors.json'),'utf8')).parts;
const LATERAL=.6,AXIAL=8;
const joints=new Map(),models=[];
const bump=(key,insertion,model)=>{const j=joints.get(key)??{count:0,insertions:[],models:new Set()};j.count++;j.insertions.push(insertion);j.models.add(model);joints.set(key,j);};
for(const file of files){
  const project=JSON.parse(fs.readFileSync(file,'utf8'));
  const refs=project.platform==='vexiq'?iqReferences:goReferences;
  const names=new Map();const nameOf=(sku,id)=>{if(project.platform==='vexiq')return id;if(!names.has(sku))names.set(sku,new Map(connectorNames(sku).map(r=>[r.id,r.name])));return names.get(sku).get(id)??id;};
  const holes=[];
  for(const p of project.parts)for(const r of refs[p.sku]??[])if(r.kind==='hole')holes.push({part:p,r,...worldReference(p,r)});
  let pins=0,seated=0;
  for(const p of project.parts)for(const r of refs[p.sku]??[]){
    if(r.kind!=='pin')continue;pins++;
    const w=worldReference(p,r);let best=null;
    for(const h of holes){if(h.part.id===p.id||Math.abs(h.normal.dot(w.normal))<.98)continue;
      const d=w.point.clone().sub(h.point),axial=d.dot(h.normal),lateral=d.addScaledVector(h.normal,-axial).length();
      if(lateral<LATERAL&&Math.abs(axial)<AXIAL&&(!best||Math.abs(axial)<Math.abs(best.axial)))best={h,axial};}
    if(!best)continue;seated++;
    // Insertion: how far the pin reference goes into the hole, measured against the hole's outward normal.
    const face=nameOf(best.h.part.sku,best.h.r.id).replace(/#\d+$/,'').match(/[+-][xyz]$/)?.[0]??'';
    bump(`${p.sku} > ${best.h.part.sku}${face?' '+face:''}`,+(-best.axial).toFixed(2),path.basename(file));
  }
  const row={model:path.basename(file),platform:project.platform,parts:project.parts.length,pins,seated};
  if(withCollisions&&project.platform!=='vexiq'){const issues=await collisions(project);row.errors=issues.filter(i=>i.severity==='error').map(i=>`${i.a} x ${i.b}: ${i.label}`);row.seatingWarnings=issues.length-row.errors.length;}
  models.push(row);console.log(JSON.stringify(row).slice(0,300));
}
const median=v=>{const s=[...v].sort((a,b)=>a-b);return s[s.length>>1];};
const table=[...joints].map(([key,j])=>({joint:key,count:j.count,models:j.models.size,insertionMedian:median(j.insertions),insertionMin:Math.min(...j.insertions),insertionMax:Math.max(...j.insertions)})).sort((a,b)=>b.count-a.count);
fs.writeFileSync(out,JSON.stringify({models,joints:table},null,1)+'\n','utf8');
console.log(`${models.length} models, ${table.length} joint kinds -> ${out}`);
