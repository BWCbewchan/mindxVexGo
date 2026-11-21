// List placements of a part against an already placed part where several connectors line up, so the
// builder (person or AI) picks one from a short list instead of guessing hole numbers from a picture.
// Usage: node scripts/vexgo/fit.mjs <project.json> <targetPartId> <movingSku> [--min 3] [--limit 12] [--also id,id]
//        [--target-face +y] [--moving-face -z] [--near targetRef]
// It pairs holes face to face (joined by pins, as VEX GO parts are) and pins into holes, tries every
// 15° twist, and counts how many other connectors then line up. Output: candidates with the aligned
// pairs by readable name, and the attach line to use in a recipe.
import fs from 'node:fs';
import * as THREE from 'three';
import {matingPose,worldReference} from '../../public/assembly/mating.js';
import {compatibleReferences} from '../../public/assembly/connector-policy.js';
import {connectorNames,references,partName,ROOT} from './lib.mjs';
import path from 'node:path';
// Joints seen in correct teacher CAD (scripts/vexgo/learn.mjs over scripts/robot-models/reference):
// a candidate whose pin-in-hole pairs are common in real models is ranked first.
const learnedFile=path.join(ROOT,'scripts/robot-models/reference/learned-joints.json');
const learned=new Map(fs.existsSync(learnedFile)?JSON.parse(fs.readFileSync(learnedFile,'utf8')).joints.map(j=>[j.joint,j.count]):[]);
const jointKey=(pinSku,holeSku,holeName)=>`${pinSku} > ${holeSku}${(holeName.replace(/#\d+$/,'').match(/[+-][xyz]$/)||[''])[0]?' '+holeName.replace(/#\d+$/,'').match(/[+-][xyz]$/)[0]:''}`;

const args=process.argv.slice(2),flag=(n,f)=>{const i=args.indexOf('--'+n);return i<0?f:args[i+1];};
const [projectFile,targetId,sku]=args;
if(!projectFile||!targetId||!sku)throw Error('Usage: fit.mjs <project.json> <targetPartId> <movingSku> [--min 3]');
const project=JSON.parse(fs.readFileSync(projectFile,'utf8'));
const target=project.parts.find(p=>p.id===targetId);if(!target)throw Error('Unknown target part '+targetId);
const alsoIds=(flag('also')||'').split(',').filter(Boolean);
const min=Number(flag('min',3)),limit=Number(flag('limit',12)),tFace=flag('target-face'),mFace=flag('moving-face'),near=flag('near');
const names=s=>new Map(connectorNames(s).map(r=>[r.id,r.name]));
const tNames=names(target.sku),mNames=names(sku);
const face=(name,f)=>!f||name.replace(/#\d+$/,'').endsWith(f);
// One connector per spot and face is enough to anchor a pose.
// Every layer is tried: stacked parts (battery ears, Brain ears) have holes at several depths per spot.
const anchors=(rows,map,f)=>rows.filter(r=>face(map.get(r.id),f));
const tRefs=references[target.sku],mRefs=references[sku];
const tWorld=tRefs.map(r=>({r,sku:target.sku,local:tNames.get(r.id),name:tNames.get(r.id),...worldReference(target,r)}));
// --also: count alignment against more placed parts (a battery resting on two connectors).
for(const id of alsoIds){const q=project.parts.find(p=>p.id===id);if(!q)throw Error('Unknown --also part '+id);const qn=names(q.sku);for(const r of references[q.sku])tWorld.push({r,sku:q.sku,local:qn.get(r.id),name:`${id}.${qn.get(r.id)}`,...worldReference(q,r)});}
const results=new Map();
for(const b of anchors(tRefs,tNames,tFace)){
  if(near&&tNames.get(b.id).replace(/#\d+$/,'')!==near)continue;
  for(const a of anchors(mRefs,mNames,mFace)){
    const pin=compatibleReferences(a,b,sku,target.sku),faceToFace=a.kind==='hole'&&b.kind==='hole';
    if(!pin&&!faceToFace)continue;
    for(let twist=0;twist<360;twist+=15){
      const moving={id:'moving',sku,position:[0,0,0],rotation:[0,0,0]};
      Object.assign(moving,matingPose(moving,a,target,b,{twist,depth:0}));
      // Which moving connectors now sit on a target connector, axes opposed, faces within 1.5 mm.
      const pairs=[];
      for(const r of mRefs){
        const w=worldReference(moving,r);
        for(const t of tWorld){
          if(w.normal.dot(t.normal)>-.98)continue;
          const d=w.point.clone().sub(t.point),axial=d.dot(t.normal),lateral=d.clone().addScaledVector(t.normal,-axial).length();
          if(lateral<.6&&Math.abs(axial)<1.5){pairs.push([mNames.get(r.id),t.name,r.kind==='pin'&&t.r.kind==='hole'?jointKey(sku,t.sku,t.local):r.kind==='hole'&&t.r.kind==='pin'?jointKey(t.sku,sku,mNames.get(r.id)):null]);break;}
        }
      }
      const unique=[...new Map(pairs.map(p=>[p[0].replace(/#\d+$/,'')+'>'+p[1].replace(/#\d+$/,''),p])).values()];
      if(unique.length<min)continue;
      const key=moving.position.map(v=>Math.round(v*10)).join(',')+'|'+new THREE.Quaternion().setFromEuler(new THREE.Euler(...moving.rotation.map(THREE.MathUtils.degToRad))).toArray().map(v=>Math.round(Math.abs(v)*100)).join(',');
      const prior=+[...new Set(unique.map(p=>p[2]).filter(Boolean))].reduce((sum,k)=>sum+Math.log2(1+(learned.get(k)??0)),0).toFixed(1);
      if(!results.has(key))results.set(key,{count:unique.length,prior,seen:unique.filter(p=>learned.has(p[2])).length,anchor:{ref:mNames.get(a.id),toRef:tNames.get(b.id),twist},pairs:unique.map(p=>`${p[0]}→${p[1]}`),position:moving.position.map(v=>+v.toFixed(2)),rotation:moving.rotation.map(v=>+v.toFixed(1))});
    }
  }
}
const list=[...results.values()].sort((x,y)=>y.count-x.count||y.prior-x.prior).slice(0,limit);
console.log(`${partName(sku)} against ${targetId} (${partName(target.sku)}): ${results.size} placements with ≥${min} aligned connectors${results.size>limit?`, showing ${limit}`:''}.`);
for(const [i,c] of list.entries())console.log(`#${i+1} ${c.count} aligned${learned.size?` · CAD ${c.seen}/${c.count} (${c.prior})`:''} · anchor ${c.anchor.ref}→${c.anchor.toRef} twist ${c.anchor.twist}° · at ${c.position.join(',')} rot ${c.rotation.join(',')}\n    ${c.pairs.join('  ')}`);
