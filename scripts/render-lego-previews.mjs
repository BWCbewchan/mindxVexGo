import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {chromium} from '@playwright/test';
const root=path.resolve('public'),addons=path.resolve('node_modules/three/examples/jsm');
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost'),base=url.pathname.startsWith('/addons/')?addons:root,part=decodeURIComponent(url.pathname.replace(/^\/addons\//,''));const file=path.resolve(base,part.replace(/^\//,''));if(!file.startsWith(base+path.sep))throw Error('Invalid path');const data=await fs.readFile(file);res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.json')?'application/json':'application/octet-stream');res.end(data);}catch{res.statusCode=404;res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:320,height:240},deviceScaleFactor:1});
 await page.goto(`http://127.0.0.1:${server.address().port}/assembly/lego/parts.json`);
 await page.setContent(`<style>body{margin:0;background:#f1f3f4}canvas{display:block}</style><script type="importmap">{"imports":{"three":"/assembly/vendor/three.module.js"}}</script><script type="module">
 import * as THREE from 'three';import {GLTFLoader} from '/addons/loaders/GLTFLoader.js';
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(320,240);renderer.setClearColor(0xf1f3f4);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;document.body.append(renderer.domElement);
 const scene=new THREE.Scene();scene.add(new THREE.AmbientLight(0xffffff,1.8));for(const p of [[3,4,5],[-3,3,-5],[3,2,-5],[-3,2,5]]){const light=new THREE.DirectionalLight(0xffffff,.7);light.position.set(...p);scene.add(light);}
 const camera=new THREE.OrthographicCamera(-1,1,1,-1,.0001,100),loader=new GLTFLoader();let current=null,currentId=null;
 window.renderPart=async(part,code)=>{
  if(currentId!==part.id){if(current)scene.remove(current);current=(await loader.loadAsync('/assembly/lego/parts/'+part.id+'/model.glb')).scene;currentId=part.id;scene.add(current);}
  current.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material]){if(m.userData.legoMain)m.color.set(part.colors[code]||part.color);m.metalness=0;m.roughness=.8;}});
  current.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(current),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());const radius=Math.max(size.length()/2,.001),direction=new THREE.Vector3(1,.85,1.2).normalize();camera.position.copy(center).addScaledVector(direction,radius*5);camera.lookAt(center);camera.near=.0001;camera.far=radius*20+1;
  const fit=radius*1.08;camera.left=-fit*4/3;camera.right=fit*4/3;camera.top=fit;camera.bottom=-fit;camera.updateProjectionMatrix();renderer.render(scene,camera);
 };window.previewReady=true;</script>`);
 await page.waitForFunction(()=>window.previewReady);
 const catalog=JSON.parse(await fs.readFile('public/assembly/lego/parts.json','utf8'));let count=0;
 for(const part of catalog){
  for(const code of Object.keys(part.colors)){await page.evaluate(({part,code})=>window.renderPart(part,code),{part,code});await page.screenshot({path:`public/assembly/lego/parts/${part.id}/preview-${code}.png`});count++;}
  await fs.copyFile(`public/assembly/lego/parts/${part.id}/preview-${part.defaultColor}.png`,`public/assembly/lego/parts/${part.id}/preview.png`);
  if(catalog.indexOf(part)%40===0)console.log('Previewed',catalog.indexOf(part)+1,'/',catalog.length);
 }
 console.log('PASS:',catalog.length,'parts;',count,'color-specific previews');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
