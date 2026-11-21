// Turn the teacher's VEX GO Code Base CAD (reference/00trial--build_xe) into a base for recipes:
// robot frame (+X left, +Y up, +Z front = blue wheel end), parts renamed to the names the recipes use,
// the LED Bumper it carries on top removed (the Super Code Base moves it to the orange fork),
// and both end beams removed (see below).
// Usage: node scripts/robot-models/make-cad-base.mjs [out.json]
import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';

const here=path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/,'$1'));
const out=process.argv[2]??path.join(here,'code-base-cad.base.json');
const ref=JSON.parse(fs.readFileSync(path.join(here,'reference/00trial--build_xe.project.json'),'utf8'));
// CAD frame: wheel axle along Y, Brain toward -X (up), blue wheels toward +Z.
// New X = old Y, new Y = -old X, new Z = old Z (a proper rotation).
const R=new THREE.Matrix4().set(0,1,0,0, -1,0,0,0, 0,0,1,0, 0,0,0,1),q=new THREE.Quaternion().setFromRotationMatrix(R),d=THREE.MathUtils;
const parts=ref.parts.map(p=>{
  const pos=new THREE.Vector3(...p.position).applyMatrix4(R);
  const rot=q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(d.degToRad))));
  const e=new THREE.Euler().setFromQuaternion(rot);
  return {...p,position:pos.toArray(),rotation:[e.x,e.y,e.z].map(v=>+d.radToDeg(v).toFixed(4))};
});
// Wheels on the ground, track centred on X = 0, axle of the gray wheels at Z = 0.
const wheels=parts.filter(p=>/wheel/.test(p.id));
const cx=(Math.max(...wheels.map(p=>p.position[0]))+Math.min(...wheels.map(p=>p.position[0])))/2;
const gray=parts.find(p=>p.id==='gray-wheel-1');
const shift=[-cx,-gray.position[1]+37.3,-gray.position[2]];
for(const p of parts)p.position=p.position.map((v,i)=>+(v+shift[i]).toFixed(3));
// Names: left = +X.
const side=p=>p.position[0]>0?'L':'R';
const byZ=(a,b)=>a.position[2]-b.position[2];
const names=new Map();
const name=(p,n)=>names.set(p.id,n);
for(const p of parts){
  if(p.sku==='228-2500-043')name(p,'plate-'+side(p));
  else if(p.sku==='269-6690-000')name(p,'motor-'+side(p));
  else if(p.sku==='228-2500-2234')name(p,'shaft-'+side(p));
  else if(p.sku==='228-2500-1383')name(p,'wheel-'+side(p));
  else if(p.sku==='228-2500-143')name(p,'collar-'+side(p));
  else if(p.sku==='228-2500-1384')name(p,'wheel-F'+side(p));
  else if(p.sku==='228-2500-2268')name(p,'standoff-F'+side(p));
  else if(p.sku==='269-6686-000')name(p,'battery');
  else if(p.sku==='269-6685-000')name(p,'brain');
}
const beams=parts.filter(p=>p.sku==='228-2500-023').sort(byZ);name(beams[0],'beam-rear');name(beams[1],'beam-front');
// Yellow connectors: two standing at the rear (under beam-rear), two flat in the middle (under the
// battery), two standing at the front (under beam-front).
const yellows=parts.filter(p=>p.sku==='228-2500-2295').sort(byZ);
['yrear','yrear','ymid','ymid','yfront','yfront'].forEach((n,i)=>name(yellows[i],`${n}-${side(yellows[i])}`));
// The LED Bumper on its blue connector and the two pins holding it come off for the Super Code Base.
const led=parts.find(p=>p.sku==='269-6696-000'),blue=parts.find(p=>p.sku==='228-2500-2296');
const near=(p,o,mm)=>Math.hypot(...p.position.map((v,i)=>v-o.position[i]))<mm;
const drop=new Set([led.id,blue.id,...parts.filter(p=>p.sku==='228-2500-2260'&&(near(p,blue,22)||near(p,led,22))&&p.position[1]>blue.position[1]-1).map(p=>p.id)]);
// The teacher stands the gray-wheel end beam up as a wall on edge-mounted connectors. The Super Code Base
// (and Code Base Rev6) lay that beam flat on standing connectors so the orange T can pin onto its top:
// drop that end here; recipes/super-code-base-cad.json builds it the Rev6 way.
for(const p of parts)if(['yrear-L','yrear-R','beam-rear'].includes(names.get(p.id)))drop.add(p.id);
// The blue-wheel end too: the Super Code Base hangs its pink frame under the robot from a flat beam there
// (PDF step 10), so recipes/super-code-base-cad.json rebuilds it flat as well.
for(const p of parts)if(['yfront-L','yfront-R','beam-front'].includes(names.get(p.id)))drop.add(p.id);
for(const beam of beams)for(const p of parts)if(p.sku==='228-2500-2260'&&Math.abs(p.position[2]-beam.position[2])<8)drop.add(p.id);
let pin=0;const kept=parts.filter(p=>!drop.has(p.id)).map(p=>({...p,id:names.get(p.id)??(p.sku==='228-2500-2260'?`pin-c${++pin}`:p.id)}));
fs.writeFileSync(out,JSON.stringify({version:1,platform:'vexgo',title:'VEX GO Code Base (teacher CAD)',source:ref.source,hideCables:true,parts:kept,groups:[]},null,1)+'\n','utf8');
console.log(`${kept.length} parts (dropped ${[...drop].join(', ')}) -> ${out}`);
