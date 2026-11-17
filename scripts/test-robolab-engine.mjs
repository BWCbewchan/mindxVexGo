import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {chromium} from '@playwright/test';

const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto((process.env.BASE_URL||'http://localhost:3131')+'/robolab/runtime/index.html?view=sim');
 await page.waitForFunction(()=>window.__wb&&window.__cad&&document.getElementById('loading').hidden,null,{timeout:90000});
 const fields=await page.locator('#simMat option').evaluateAll(options=>options.map(o=>o.value).filter(Boolean));
 for(const field of fields){await page.locator('#simMat').selectOption(field);await page.waitForTimeout(80);assert.ok(await page.evaluate(()=>!!window.__umc.mat()),field);}
 const blocks=await page.evaluate(()=>{
  const W=window.__wb,ws=W.ws(),types=[],walk=n=>{if(!n)return;if(Array.isArray(n))return n.forEach(walk);if(n.kind==='block'&&n.type)types.push(n.type);if(n.contents)walk(n.contents);};walk(W.wbToolbox());
  const AF=Object.getPrototypeOf(async function(){}).constructor,out=[];
  for(const type of new Set(types)){
   if(['rm_start','controls_flow_statements'].includes(type))continue;
   try{ws.clear();const start=ws.newBlock('rm_start');start.initSvg();start.render();const block=ws.newBlock(type);block.initSvg();block.render();if(block.previousConnection)start.nextConnection.connect(block.previousConnection);
    const js=W.wbCompileSrc(ws).src;new AF('api',js);const py=W.wbGenPython(ws);out.push({type,python:typeof py==='string'?py:py?.code||py?.src||''});
   }catch(e){out.push({type,error:String(e)});}
  }
  ws.clear();return out;
 });
 assert.ok(blocks.length>=100,`Only ${blocks.length} generated blocks`);assert.deepEqual(blocks.filter(b=>b.error),[]);
 await fs.mkdir('artifacts/robolab',{recursive:true});await fs.writeFile('artifacts/robolab/block-codegen.json',JSON.stringify(blocks));
 const check=spawnSync('python',['-X','utf8','-c',"import json,sys; rows=json.load(sys.stdin); [compile(x['python'],x['type']+'.py','exec') for x in rows if x.get('python')]; print('Python syntax passed')"],{input:JSON.stringify(blocks),encoding:'utf8'});assert.equal(check.status,0,check.stderr);
 await page.locator('#simMat').selectOption('line');
 const movement=await page.evaluate(()=>Object.keys(Blockly.Blocks).filter(k=>/^rm_/.test(k)&&/drive|move|turn/.test(k)));
 await page.evaluate(()=>{const ws=window.__wb.ws();ws.clear();const start=ws.newBlock('rm_start');start.initSvg();start.render();const drive=ws.newBlock('rm_drive_straight');drive.initSvg();drive.render();start.nextConnection.connect(drive.previousConnection);});
 const before=await page.evaluate(()=>({...window.__umc.pose()}));await page.locator('#simRun').click();
 await page.waitForFunction(before=>{const now=window.__umc.pose();return Math.hypot(now.x-before.x,now.z-before.z)>5;},before,{timeout:30000});
 await page.locator('#simStop').click();const after=await page.evaluate(()=>({...window.__umc.pose()}));
 await page.locator('#simPhys').click();await page.waitForFunction(()=>document.getElementById('simPhys').getAttribute('aria-pressed')==='true',null,{timeout:30000});
 await page.locator('#simReset').click();const physicsBefore=await page.evaluate(()=>({...window.__umc.pose()}));await page.locator('#simRun').click();
 await page.waitForFunction(before=>{const now=window.__umc.pose();return Math.hypot(now.x-before.x,now.z-before.z)>5;},physicsBefore,{timeout:30000});await page.locator('#simStop').click();
 await page.locator('#simPhys').click();
 await page.locator('#simTrain').click();await page.locator('#trModeGen').click();const oldTraining=await page.locator('#trStatus').textContent();await page.locator('#trStart').click();
 await page.waitForFunction(old=>{const text=document.querySelector('#trStatus')?.textContent;return text&&text!==old&&/\d/.test(text);},oldTraining,{timeout:60000});
 const training=await page.locator('#trStatus').textContent();await page.locator('#trStop').click();
 console.log(JSON.stringify({fields:fields.length,blocks:blocks.length,movement,drove:Math.hypot(after.x-before.x,after.z-before.z),physics:true,training,errors}));
 assert.deepEqual(errors,[]);
 console.log('PASS: fields, JavaScript/Python code generation, real simulated drive execution and automatic training progression.');
}finally{await browser.close();}
