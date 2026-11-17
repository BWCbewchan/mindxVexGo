import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';

const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();
 await page.route('**/group-preview-benchmark',r=>r.fulfill({contentType:'text/html',body:'<script type="importmap">{"imports":{"three":"/assembly/vendor/three.module.js","three/addons/":"/assembly/vendor/addons/"}}</script>'}));
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:3131')+'/group-preview-benchmark');
 const result=await page.evaluate(async()=>{
  const THREE=await import('three'),{GLTFLoader}=await import('three/addons/loaders/GLTFLoader.js');
  const {optimizeStaticModel}=await import('/assembly/render-model.js');
  const {createGuideRenderer}=await import('/assembly/guide-renderer.js');
  const prototype=optimizeStaticModel((await new GLTFLoader().loadAsync('/assembly/iq/parts/228-2500-026/model.glb')).scene);
  const objects=new Map(),parts=[];
  for(let i=0;i<180;i++){
   const part={id:String(i),sku:'228-2500-026',position:[i%12*45,Math.floor(i/12)*10,0],rotation:[0,0,0]};
   const object=prototype.clone(true);object.position.fromArray(part.position.map(v=>v/1000));objects.set(part.id,object);parts.push(part);
  }
  const step={type:'group',parts,added:parts.slice(-2),page:{frames:{assembled:{redOutline:false},detail:{redOutline:false}}}};
  const renderer=createGuideRenderer(),clone=THREE.Object3D.prototype.clone;let clones=0;
  let draws=0;const drawNames=['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced'],originalDraws=new Map();
  for(const name of drawNames){const original=WebGL2RenderingContext.prototype[name];originalDraws.set(name,original);WebGL2RenderingContext.prototype[name]=function(...args){draws++;return original.apply(this,args);};}
  THREE.Object3D.prototype.clone=function(...args){clones++;return clone.apply(this,args);};
  try{
   // Compare detail-only rendering with the full PDF's detail frame, including
   // custom camera and an explicit outline toggle. Both must show the same CAD.
   const full=renderer.render(objects,step,{}, {width:320,height:240,detailScale:.35,contextEdges:false});
   clones=0;const start=performance.now();
   const detail=renderer.render(objects,step,{}, {width:320,height:240,detailScale:.35,frameOnly:'detail',contextEdges:false});
   const detailMS=performance.now()-start,detailClones=clones;
   if(full.detail!==detail.detail)throw Error('Detail image differs from full PDF frame');
   const own=new Map([...objects].filter(([id])=>step.added.some(p=>p.id===id)));
   clones=0;renderer.render(own,step,{}, {detailScale:.35,frameOnly:'detail',contextEdges:false});const ownClones=clones;
   if(detailClones!==ownClones)throw Error(`Cloned prior groups: ${detailClones} vs ${ownClones}`);
   step.page.frames.detail={redOutline:true,camera:{direction:[-1,.7,1],up:[0,1,0],zoom:1.2}};
   const outlined=renderer.render(objects,step,{}, {detailScale:.35,frameOnly:'detail',contextEdges:false});
   if(outlined.detail===detail.detail)throw Error('Outline/custom camera did not apply');
   renderer.render(objects,step,{}, {live:true,liveFrame:'detail',width:320,height:240,detailScale:.35,contextEdges:false});
   clones=0;for(let i=0;i<10;i++)renderer.drawView({direction:[1+i*.02,.8,1],up:[0,1,0],zoom:1},320,240);
   if(clones)throw Error('Orbit rebuilt the CAD scene');
   const orbitClones=clones;
   const large={...step,added:parts.slice(-80),page:{frames:{detail:{redOutline:false}}}};
   renderer.render(objects,large,{}, {live:true,liveFrame:'detail',width:320,height:240,detailScale:.35,contextEdges:false});
   draws=0;renderer.drawView({direction:[1,.8,1],up:[0,1,0],zoom:1},320,240);const largeGroupDraws=draws;
   if(largeGroupDraws>=10)throw Error(`Repeated group CAD was not batched: ${largeGroupDraws} draws`);
   large.page.frames.detail.redOutline=true;
   const visibleOutline=renderer.render(objects,large,{}, {frameOnly:'detail',detailScale:.35,contextEdges:false});
   large.page.frames.detail.redOutline=false;
   const hiddenOutline=renderer.render(objects,large,{}, {frameOnly:'detail',detailScale:.35,contextEdges:false});
   if(visibleOutline.detail===hiddenOutline.detail)throw Error('Batching hid the red edge children');
   return {parts:parts.length,groupParts:step.added.length,detailClones,ownClones,detailMS,matchingPDF:true,orbitClones,largeGroupParts:large.added.length,largeGroupDraws};
  }finally{THREE.Object3D.prototype.clone=clone;for(const [name,original] of originalDraws)WebGL2RenderingContext.prototype[name]=original;renderer.dispose();}
 });
 assert.equal(result.matchingPDF,true);assert.equal(result.orbitClones,0);
 console.log('PASS: detail preview only clones the current group, matches full PDF, honors camera/outline, and orbit reuses the scene.',JSON.stringify(result));
}finally{await browser.close();}
