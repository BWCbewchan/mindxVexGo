import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import * as THREE from '../public/assembly/vendor/three.module.js';
import {connectorNeighborhood} from '../public/assembly/connector-neighborhood.js';
import {nearestAssemblyMate,assemblyMatingContext} from '../public/assembly/assembly-mating.js';

const rows=Array.from({length:10000},(_,i)=>({point:new THREE.Vector3(i%100*12,Math.floor(i/100)*12,0),ref:{kind:'pin',depth:4}}));
const index=connectorNeighborhood(rows);
for(let i=0;i<30;i++){
 const point=new THREE.Vector3(i*29-40,i*31-20,0),radius=8+i*3,near=index.near(point,radius);
 for(const row of rows)if(row.point.distanceToSquared(point)<=radius*radius)assert.ok(near.includes(row),'Broad phase must not drop any reachable connector');
}
const references={beam:Array.from({length:16},(_,i)=>({id:'h'+i,kind:'hole',point:[i*8,0,0],normal:[0,-1,0],radius:2.2,depth:4})),pin:[{id:'p',kind:'pin',point:[0,0,0],normal:[0,1,0],radius:2.2,depth:4}]};
const parts=Array.from({length:250},(_,i)=>({id:String(i),sku:i<80?'beam':'pin',position:[(i<80?i:i-80)*200+(i<80?2:0),i<80?-4:0,0],rotation:[0,0,0]})),ids=parts.slice(0,80).map(p=>p.id);
const context=assemblyMatingContext(structuredClone(parts),references);
const find=()=>nearestAssemblyMate(parts,references,ids,{context});
const first=find();assert.ok(first?.support>=80);
const search=context.dragSearch,staticRows=search.rows;
for(const p of parts.slice(0,80))p.position[0]+=.1;
const optimized=find();assert.equal(context.dragSearch,search);assert.equal(context.dragSearch.rows,staticRows,'Stationary world connectors are reused');
const signature=result=>JSON.stringify([result.source.id,result.target.id,result.sourceRef.id,result.targetRef.id,result.support,result.parts.map(p=>[p.id,p.position,p.rotation])]);
const normal=search.index.hole.near;search.index.hole.near=()=>search.index.hole.rows;
const pinNormal=search.index.pin.near;search.index.pin.near=()=>search.index.pin.rows;
const exhaustive=find();assert.equal(signature(optimized),signature(exhaustive),'Indexed and exhaustive candidate scans produce identical poses and contacts');
const sample=()=>{const times=[];for(let i=0;i<8;i++){const start=performance.now();find();times.push(performance.now()-start);}return times.sort((a,b)=>a-b)[4];};
const exhaustiveMS=sample();search.index.hole.near=normal;search.index.pin.near=pinNormal;const indexedMS=sample();
parts.at(-1).position[0]+=50;find();assert.notEqual(context.dragSearch,search,'Changed stationary poses invalidate the spatial cache');
assert.equal(first.parts.length,250);
console.log('PASS: conservative search, 250 parts/80 moving members, stationary reuse, identical indexed/exhaustive attachment, and cache invalidation.',JSON.stringify({parts:250,moving:80,indexedMS,exhaustiveMS}));
