import fs from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {matingPose,worldReference} from '../public/assembly/mating.js';
import {compatibleReferences,insertionLimit} from '../public/assembly/connector-policy.js';
import {analyzeCollisions} from '../public/assembly/collision.js';
const refs=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const catalog=JSON.parse(await fs.readFile('public/assembly/parts.json','utf8')),parts=[];
const ref=(sku,id)=>refs[sku].find(r=>r.id===id);
function add(sku,name,position=[0,0,0],rotation=[0,0,0]){const p={id:name,sku,label:catalog.find(c=>c.id===sku).name,position,rotation};parts.push(p);return p;}
function mate(p,sr,t,tr,depth){const a=ref(p.sku,sr),b=ref(t.sku,tr);if(!compatibleReferences(a,b,p.sku,t.sku))throw Error('Bad joint '+p.id);depth=Math.min(depth,insertionLimit(a,b));Object.assign(p,matingPose(p,a,t,b,{depth}));p.mate={target:t.id,sourceRef:sr,targetRef:tr,depth,twist:0,flip:false};return p;}
function localHole(p,point,normal){const row=refs[p.sku].find(r=>r.kind==='hole'&&r.radius<2.6&&new THREE.Vector3(...r.point).distanceTo(new THREE.Vector3(...point))<.02&&new THREE.Vector3(...r.normal).dot(new THREE.Vector3(...normal))>.99);if(!row)throw Error('Missing hole '+p.id+' '+point);return row.id;}
function worldHole(p,point,normal){const row=refs[p.sku].find(r=>{if(r.kind!=='hole'||r.radius>2.6)return false;const w=worldReference(p,r);return w.point.distanceTo(new THREE.Vector3(...point))<.03&&w.normal.dot(new THREE.Vector3(...normal))>.99;});if(!row)throw Error('Missing world hole '+p.id+' '+point);return row.id;}
const pin=(name,target,tr,rotation=[0,0,0])=>mate(add('228-2500-2260',name,[0,0,0],rotation),'1',target,tr,4.572);
const left=add('269-6690-000','left-motor',[-31.75,31,-19.05]);
const gl=mate(add('228-2500-2308','left-bracket',[0,0,0],[90,0,0]),'18',left,'7',2.2);
const postsL=['1','9'].map((hole,i)=>mate(add('228-2500-2271','left-post-'+i),'1',gl,hole,2.2));
const rear=add('228-2500-025','rear-transom',[0,0,0],[0,90,0]);mate(rear,localHole(rear,[57.15,-2.286,-6.35],[0,-1,0]),postsL[0],'4',2.2);
const postsR=[-50.8,-38.1].map((x,i)=>mate(add('228-2500-2268','right-post-'+i),'4',rear,worldHole(rear,[x,rear.position[1]-2.286,57.15],[0,-1,0]),2.2));
const gr=mate(add('228-2500-2308','right-bracket',[0,0,0],[-90,0,0]),'2',postsR[0],'1',2.2);
const right=mate(add('269-6690-000','right-motor',[0,0,0],[180,0,0]),'7',gr,'18',2.2);
const rails=[];
for(const z of [-19.05,19.05]){
 const pins=[-50.8,-38.1].map((x,i)=>pin('rail-rear-pin-'+z+'-'+i,rear,worldHole(rear,[x,rear.position[1]+2.286,z],[0,1,0])));
 const rail=mate(add('228-2500-026','rail-'+z),'11',pins[0],'4',4.572);rails.push(rail);
}
const frontPins=[];for(const rail of rails)for(const x of [50.8,63.5])frontPins.push(pin('rail-front-pin-'+rail.id+'-'+x,rail,worldHole(rail,[x,rail.position[1]-2.286,rail.position[2]],[0,-1,0]),[180,0,0]));
const front=add('228-2500-025','front-transom',[0,0,0],[0,90,0]);mate(front,localHole(front,[19.05,2.286,-6.35],[0,1,0]),frontPins[0],'4',4.572);
const decks=[];
for(const x of [-31.75,31.75]){
 const pins=[];for(const rail of rails)for(const xx of [x-12.7,x+12.7])pins.push(pin('deck-pin-'+x+'-'+rail.id+'-'+xx,rail,worldHole(rail,[xx,rail.position[1]+2.286,Math.sign(rail.position[2])*25.4],[0,1,0])));
 const deck=add('228-2500-042','deck-'+x,[0,0,0],[0,90,0]);mate(deck,localHole(deck,[25.4,-2.286,-12.7],[0,-1,0]),pins[0],'4',4.572);decks.push(deck);
}
const brainDeck=decks[0],brainPins=[];
for(const x of [-19.05,19.05])for(const z of [-31.75,31.75])brainPins.push(pin('brain-pin-'+x+'-'+z,brainDeck,worldHole(brainDeck,[brainDeck.position[0]+x,brainDeck.position[1]+2.286,z],[0,1,0])));
const brain=mate(add('269-6685-000','brain',[0,0,0],[-90,0,90]),'43',brainPins[0],'4',4.572);
const batteryDeck=decks[1],batteryPins=[];
for(const x of [-19.05,19.05])for(const z of [-31.75,31.75])batteryPins.push(pin('battery-pin-'+x+'-'+z,batteryDeck,worldHole(batteryDeck,[batteryDeck.position[0]+x,batteryDeck.position[1]+2.286,z],[0,1,0])));
const battery=mate(add('269-6686-000','battery',[0,0,0],[-90,0,0]),'5',batteryPins[0],'4',2.785);
for(const [i,m] of [left,right].entries()){
 const shaft=mate(add('228-2500-2238','drive-shaft-'+i),'short-drive-end',m,'motor-output',4.572);
 mate(add('228-2500-1383','drive-wheel-'+i),'square-hole-front',shaft,'square-long-shaft-end',27);
 mate(add('228-2500-143','drive-collar-'+i),'square-hole-front',shaft,'square-long-shaft-end',6);
}
for(const [i,z] of [-57.15,57.15].entries()){
 const bracket=add('228-2500-2295','front-wheel-bracket-'+i,[0,0,0],[0,i===0?180:0,0]);
 mate(bracket,'22',front,worldHole(front,[i===0?63.5:50.8,front.position[1]-2.286,z],[0,-1,0]),2.2);
 const axle=mate(add('228-2500-2261','free-axle-'+i),'6',bracket,i===0?'2':'10',2.2);
 mate(add('228-2500-1384','free-wheel-'+i),'8',axle,'1',10.78);
 mate(add('228-2500-154','free-retainer-'+i),'1',axle,'1',4.57);
}
for(const p of parts)p.position[1]-=5.75;
const models=new Map(),objects=new Map();
for(const p of parts){if(!models.has(p.sku)){const bytes=await fs.readFile(`public/assembly/parts/${p.sku}/model.glb`);const g=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');if(p.sku.startsWith('269-')&&p.sku!=='269-6685-000'){const body=new THREE.Box3();for(const r of refs[p.sku]||[])body.expandByPoint(new THREE.Vector3(...r.point).multiplyScalar(.001));body.expandByScalar(.008);g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(!o.isMesh)return;const box=new THREE.Box3().setFromObject(o),s=box.getSize(new THREE.Vector3()),d=[s.x,s.y,s.z].sort((a,b)=>a-b);o.userData.cable=(p.sku==='269-6686-000'&&box.max.y>.039)||(d[2]>.08&&d[1]<.012)||(!body.isEmpty()&&!body.intersectsBox(box));});}models.set(p.sku,g.scene);}const o=models.get(p.sku).clone(true);o.position.fromArray(p.position.map(v=>v*.001));o.rotation.set(...p.rotation.map(THREE.MathUtils.degToRad));o.updateMatrixWorld(true);objects.set(p.id,o);}
const fit=analyzeCollisions(parts,objects,{references:refs});const hard=fit.issues.filter(i=>i.kind==='penetration');
await fs.mkdir('artifacts/assembly-original-car',{recursive:true});await fs.writeFile('public/assembly/original-car-recipe.json',JSON.stringify(parts));await fs.writeFile('artifacts/assembly-original-car/cad-review.json',JSON.stringify({parts:parts.length,hard,poses:parts.map(p=>({id:p.id,position:p.position,rotation:p.rotation}))},null,2));console.log(JSON.stringify({parts:parts.length,hard,brain:brain.position,battery:battery.position,front:front.position,rails:rails.map(p=>p.position),rightMotor:right.position},null,2));
