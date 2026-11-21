// Render a VEX GO project (or one part with its connector names) to PNG, optionally beside a reference
// picture, so a person or an AI can compare the build with the instruction step.
// Usage:
//   node scripts/vexgo/view.mjs project <project.json> <out.png> [--ref step.png] [--az 35] [--el 30] [--only id,id] [--focus id,id]
//   node scripts/vexgo/view.mjs part <sku> <out.png> [--az 35] [--el 30] [--face -z] [--kind hole]
//   (--face/--kind only label connectors on that face / of that kind, to keep busy parts readable)
// az: degrees round Y from the front (+Z), positive towards the robot's left (+X). el: degrees above.
import {chromium} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,connectorNames,partName,housingBoxes} from './lib.mjs';

const [mode,input,output,...rest]=process.argv.slice(2);
const flag=(name,fallback)=>{const i=rest.indexOf('--'+name);return i<0?fallback:rest[i+1];};
if(!['project','part'].includes(mode)||!input||!output)throw Error('Usage: view.mjs project <project.json> <out.png> [--ref img] | view.mjs part <sku> <out.png>');
const az=Number(flag('az',35)),el=Number(flag('el',30)),ref=flag('ref'),only=flag('only')?.split(','),focus=flag('focus')?.split(',');
// --clean: no title or axis key (thumbnails).
const clean=rest.includes('--clean');
let parts,labels=[],partsRoot='public/assembly';
const face=flag('face'),kind=flag('kind');
if(mode==='part'){parts=[{id:'part',sku:input,position:[0,0,0],rotation:[0,0,0]}];labels=connectorNames(input).filter(r=>(!face||r.name.replace(/#\d+$/,'').endsWith(face))&&(!kind||r.kind===kind)).map(r=>({text:r.name,point:r.point,kind:r.kind}));}
else{const project=JSON.parse(fs.readFileSync(input,'utf8'));parts=project.parts.filter(p=>!only||only.includes(p.id));if(project.platform==='vexiq')partsRoot='public/assembly/iq';}
const title=mode==='part'?`${partName(input)} (${input})`:path.basename(input);

const three=path.join(ROOT,'node_modules/three');
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
  const width=ref?1600:900,height=760;
  const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://v.local/**',route=>{
    const url=new URL(route.request().url()).pathname;
    const file=url.startsWith('/three/')?path.join(three,url.slice(7)):url.startsWith('/parts/')?path.join(ROOT,partsRoot,url):url==='/ref.png'&&ref?path.resolve(ref):null;
    if(!file||!fs.existsSync(file))return route.fulfill({status:404});
    route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.png')?'image/png':'application/octet-stream'});
  });
  await page.route('http://v.local/index.html',route=>route.fulfill({contentType:'text/html',body:`<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;display:flex;background:#fff;font:14px Arial">
${ref?'<img src="/ref.png" style="width:700px;height:760px;object-fit:contain;border-right:2px solid #ccd">':''}
<div style="position:relative;width:900px;height:760px"><canvas id="c" width="900" height="760"></canvas><canvas id="o" width="900" height="760" style="position:absolute;left:0;top:0"></canvas>
${clean?'':`<div style="position:absolute;left:10px;top:8px;color:#334">${title.replace(/</g,'')} · az ${az}° el ${el}°</div>`}</div>
<script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script>
<script type="module">
import * as THREE from 'three';import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const parts=${JSON.stringify(parts)},labels=${JSON.stringify(labels)},focus=${JSON.stringify(focus??null)};
const r=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true});r.setClearColor('#ffffff');
const s=new THREE.Scene();s.add(new THREE.HemisphereLight('#ffffff','#8890a0',2.4));const d=new THREE.DirectionalLight('#ffffff',2);d.position.set(1,3,2);s.add(d);
const loader=new GLTFLoader(),cache={};const root=new THREE.Group();s.add(root);
const housings=${JSON.stringify(housingBoxes(parts.map(q=>q.sku)))};
for(const p of parts){cache[p.sku]??=loader.loadAsync('/parts/'+p.sku+'/model.glb');const o=(await cache[p.sku]).scene.clone(true);
 // Electronics CAD ships long straight cables: hide them by the app's rule (lib.mjs isCable), in the part frame.
 const h=housings[p.sku];if(h){o.updateMatrixWorld(true);const box=new THREE.Box3(new THREE.Vector3(...h[0]),new THREE.Vector3(...h[1]));o.traverse(n=>{if(!n.isMesh)return;const b=new THREE.Box3().setFromObject(n),sz=b.getSize(new THREE.Vector3()),dm=[sz.x,sz.y,sz.z].sort((a,c)=>a-c);if((p.sku==='269-6686-000'&&b.max.y>.039)||(dm[2]>.08&&dm[1]<.012)||(h[2]?!box.containsPoint(b.getCenter(new THREE.Vector3())):!box.intersectsBox(b)))n.visible=false;});}
 o.position.set(...p.position.map(v=>v/1000));o.rotation.set(...p.rotation.map(v=>v*Math.PI/180));o.userData.id=p.id;
 if(focus&&!focus.includes(p.id))o.traverse(n=>{if(n.isMesh){n.material=n.material.clone();n.material.transparent=true;n.material.opacity=.18;n.material.depthWrite=false;}});
 root.add(o);}
root.updateMatrixWorld(true);
const box=new THREE.Box3();root.children.forEach(o=>{if(!focus||focus.includes(o.userData.id))o.traverse(n=>{if(n.isMesh&&n.visible)box.expandByObject(n)})});
const c=box.getCenter(new THREE.Vector3()),size=Math.max(box.getSize(new THREE.Vector3()).length(),.02);
const cam=new THREE.PerspectiveCamera(30,900/760,.0005,50);const a=${az}*Math.PI/180,e=${el}*Math.PI/180;
cam.position.set(c.x+Math.sin(a)*Math.cos(e)*size*1.9,c.y+Math.sin(e)*size*1.9,c.z+Math.cos(a)*Math.cos(e)*size*1.9);cam.lookAt(c);
r.render(s,cam);
const g=document.getElementById('o').getContext('2d');g.font='bold 12px Arial';g.textAlign='center';
const toCam=cam.position.clone();
for(const l of labels){const v=new THREE.Vector3(...l.point).multiplyScalar(.001);const normalSide=v.clone().sub(c).dot(toCam.clone().sub(c));const p=v.clone().project(cam);const x=(p.x+1)*450,y=(1-p.y)*380;
 g.globalAlpha=normalSide>=-1e-6?1:.35;g.fillStyle=l.kind==='pin'?'#0a7d3b':'#c0262d';g.beginPath();g.arc(x,y,3,0,7);g.fill();g.fillStyle='rgba(255,255,255,.85)';const w=g.measureText(l.text).width+6;g.fillRect(x-w/2,y-20,w,15);g.fillStyle=l.kind==='pin'?'#0a7d3b':'#c0262d';g.fillText(l.text,x,y-8);}
g.globalAlpha=1;
// Axis key: robot front is +Z, left is +X, up is +Y.
const o=new THREE.Vector3(),key=${clean}?[]:[[1,0,0,'+X left','#d33'],[0,1,0,'+Y up','#393'],[0,0,1,'+Z front','#36c']];
for(const [x,y,z,t,col] of key){const p0=c.clone().project(cam),p1=c.clone().add(new THREE.Vector3(x,y,z).multiplyScalar(1)).project(cam);const dx=p1.x-p0.x,dy=p1.y-p0.y,len=Math.hypot(dx,dy)||1;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=2;g.beginPath();g.moveTo(60,700);g.lineTo(60+dx/len*36,700-dy/len*36);g.stroke();g.fillText(t,60+dx/len*50,704-dy/len*50);}
window.done=true;
</script></body></html>`}));
  await page.goto('http://v.local/index.html');
  await page.waitForFunction(()=>window.done,null,{timeout:180000});
  fs.mkdirSync(path.dirname(path.resolve(output)),{recursive:true});
  await page.screenshot({path:output});
  if(errors.length)throw Error(errors.join('\n'));
  console.log('wrote',output);
}finally{await browser.close();}
