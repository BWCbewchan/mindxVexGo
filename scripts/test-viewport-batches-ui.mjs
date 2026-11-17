import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';

const base=process.env.BASE_URL||'http://localhost:3131';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();
 await page.route('**/viewport-benchmark',route=>route.fulfill({contentType:'text/html',body:'<script type="importmap">{"imports":{"three":"/assembly/vendor/three.module.js","three/addons/":"/assembly/vendor/addons/"}}</script>'}));
 await page.goto(base+'/viewport-benchmark');
 const fixture=process.env.VIEWPORT_PROJECT?JSON.parse(await fs.readFile(process.env.VIEWPORT_PROJECT,'utf8')):null;
 const result=await page.evaluate(async fixture=>{
  const THREE=await import('three');
  const {GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');
  const {createViewportBatches}=await import('/assembly/viewport-batches.js');
  const {optimizeStaticModel}=await import('/assembly/render-model.js');
  const loader=new GLTFLoader(),prototypes=new Map();
  const rows=fixture?.parts||Array.from({length:200},(_,i)=>({id:String(i),sku:'228-2500-001',position:[(i%20)*50,Math.floor(i/20)*60,0],rotation:[0,0,0]}));
  const prefix=fixture?.platform==='vexiq'?'/assembly/iq/parts/':'/assembly/parts/';
  for(const sku of new Set(rows.map(row=>row.sku)))prototypes.set(sku,(await loader.loadAsync(prefix+sku+'/model.glb')).scene);
  const scene=new THREE.Scene();scene.background=new THREE.Color('white');
  scene.add(new THREE.HemisphereLight(0xffffff,0xffffff,2));
  const objects=new Map();
  for(const [i,row] of rows.entries()){
   const root=prototypes.get(row.sku).clone(true);root.position.fromArray(row.position.map(value=>value/1000));root.rotation.set(...row.rotation.map(THREE.MathUtils.degToRad));
   scene.add(root);objects.set(String(i),root);
  }
  const camera=new THREE.PerspectiveCamera(40,1,.001,100);camera.position.set(.5,.3,2);camera.lookAt(.5,.3,0);camera.updateMatrixWorld(true);
  const focus=new THREE.Vector3(.5,.3,0);
  if(fixture){const bounds=new THREE.Box3();for(const root of objects.values())bounds.expandByObject(root);bounds.getCenter(focus);camera.position.copy(focus).addScaledVector(new THREE.Vector3(1,.5,1).normalize(),bounds.getSize(new THREE.Vector3()).length()*2);camera.lookAt(focus);camera.updateMatrixWorld(true);}
  const renderer=new THREE.WebGLRenderer({antialias:false,preserveDrawingBuffer:true});renderer.setSize(600,600);
  document.body.append(renderer.domElement);
  const pixels=()=>{const gl=renderer.getContext(),data=new Uint8Array(600*600*4);gl.readPixels(0,0,600,600,gl.RGBA,gl.UNSIGNED_BYTE,data);return data;};
  renderer.render(scene,camera);const initialCalls=renderer.info.render.calls,before=pixels();
  const rawFrames=[];for(let i=0;i<6;i++){const start=performance.now();renderer.render(scene,camera);renderer.getContext().finish();rawFrames.push(performance.now()-start);}
  const rawMS=rawFrames.sort((a,b)=>a-b)[3];
  const compact=new Map([...prototypes].map(([sku,root])=>[sku,optimizeStaticModel(root)]));
  for(const [i,row] of rows.entries()){
   const old=objects.get(String(i)),root=compact.get(row.sku).clone(true);
   root.position.copy(old.position);root.quaternion.copy(old.quaternion);scene.remove(old);scene.add(root);objects.set(String(i),root);
  }
  const batch=createViewportBatches(scene);
  batch.draw(renderer,camera,objects);const calls=renderer.info.render.calls,after=pixels();
  let difference=0;for(let i=0;i<before.length;i++)if(Math.abs(before[i]-after[i])>2)difference++;
  const root=objects.get('0'),mesh=(()=>{let result;root.traverse(node=>{if(node.isMesh)result=node;});return result;})();
  if(!mesh.visible)throw Error('Original mesh left hidden');
  const startPosition=camera.position.clone();
  const sample=(batched)=>{
   const times=[];for(let i=0;i<12;i++){
    camera.position.copy(startPosition);camera.position.x+=i*.003;camera.lookAt(focus);camera.updateMatrixWorld(true);
    const start=performance.now();if(batched)batch.draw(renderer,camera,objects);else renderer.render(scene,camera);renderer.getContext().finish();times.push(performance.now()-start);
   }
   return times.sort((a,b)=>a-b)[6];
  };
  const plainMS=sample(false),batchMS=sample(true);
  root.position.x+=.015;objects.get('1').visible=false;
  batch.draw(renderer,camera,objects);const moved=pixels();renderer.render(scene,camera);const expected=pixels();
  let movedDifference=0;for(let i=0;i<moved.length;i++)if(Math.abs(moved[i]-expected[i])>2)movedDifference++;
  const materials=new Set();root.traverse(node=>{if(node.isMesh){node.material=node.material.clone();materials.add(node.material);node.material.transparent=true;node.material.opacity=.4;}});
  batch.draw(renderer,camera,objects);const transparentOK=mesh.visible;
  let threw=false;try{batch.draw({render(){throw Error('intentional');}},camera,objects);}catch{threw=true;}
  let restored=true;for(const root of objects.values())root.traverse(node=>{if(node.isMesh&&!node.visible)restored=false;});
  batch.dispose();renderer.dispose();renderer.forceContextLoss();for(const material of materials)material.dispose();
  return {initialCalls,calls,difference,movedDifference,rawMS,plainMS,batchMS,transparentOK,threw,restored};
 },fixture);
 assert.ok(result.calls<result.initialCalls/(fixture?1:5),JSON.stringify(result));
 assert.ok(result.difference<600*600*.01,JSON.stringify(result));
 assert.ok(result.movedDifference<600*600*.01,JSON.stringify(result));
 assert.ok(result.transparentOK&&result.threw&&result.restored);
 console.log(JSON.stringify(result));
 console.log(`PASS: ${fixture?.parts.length||200} real CAD parts reduce draw calls with matching images, moved/hidden parts, transparent materials, and restoration after draw failure.`);
}finally{await browser.close();}
