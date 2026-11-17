import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/focused-drag-test',route=>route.fulfill({contentType:'text/html',body:'<script type="importmap">{"imports":{"three":"/assembly/vendor/three.module.js"}}</script><div><canvas width="800" height="600"></canvas></div><input id="magnet" type="checkbox" checked><input id="move-joined" type="checkbox">'}));
 await page.goto((process.env.BASE_URL||'http://127.0.0.1:3131')+'/focused-drag-test');
 const result=await page.evaluate(async()=>{
  const THREE=await import('three'),{installDirectTools}=await import('/assembly/direct-tools.js');
  const fan={id:'fan',sku:'fan',position:[0,0,0],rotation:[0,0,0]},fixed={id:'fixed',sku:'connector',position:[0,0,0],rotation:[0,0,0]};
  const project={parts:[fan,fixed],groups:[]},scene=new THREE.Scene(),objects=new Map(project.parts.map(p=>[p.id,new THREE.Group()]));
  for(const object of objects.values())scene.add(object);
  const references={fan:Array.from({length:100},(_,i)=>({id:'hole'+i,kind:'hole',point:[i*8,0,0],normal:[0,-1,0],radius:2.2,depth:4})),connector:Array.from({length:4},(_,i)=>({id:'pin'+i,kind:'pin',point:[i*8,0,0],normal:[0,1,0],radius:2.2,depth:4}))};
  const camera=new THREE.PerspectiveCamera(40,800/600,.001,100);camera.position.set(.03,.1,.14);camera.lookAt(.03,0,0);camera.updateMatrixWorld(true);
  const api={references,scene,camera,objects,canvas:document.querySelector('canvas'),project:()=>project,selected:()=>fan.id,selection:()=>new Set([fan.id]),controls:{},orbit:{},busy:()=>false,preview:()=>false,quickActive:()=>false,connectActive:()=>false,status(){},transform(object,part){object.position.fromArray(part.position.map(v=>v/1000));}};
  const tool=await installDirectTools(api),before=JSON.stringify(project.parts);
  tool.previewTransform(['fan']);
  const points=scene.children.filter(object=>object.visible&&object.userData.attachmentTarget),primary=points.filter(object=>object.userData.attachmentTarget.primary);
  if(points.length<2||points.length>8||primary.length!==1)throw Error(`Crowded drag markers: ${points.length}, primary ${primary.length}`);
  if(!tool.active())throw Error('Gizmo preview must suppress idle quick-attach points');
  if(JSON.stringify(project.parts)!==before)throw Error('Suggestions changed the model');
  tool.finishTransform();
  if(tool.active()||scene.children.some(object=>object.userData.attachmentTarget))throw Error('Drag markers were not cleared after release');
  if(fan.mate?.target!=='fixed')throw Error('Filtered suggestions broke snapping');
  return {holes:references.fan.length,visibleMarkers:points.length,primary:primary.length,mate:fan.mate.target};
 });
 assert.deepEqual(errors,[]);console.log('PASS: crowded fan drag has a bounded set of distinct markers, suppresses idle hints, preserves preview poses, and still attaches on release.',JSON.stringify(result));
}finally{await browser.close();}
