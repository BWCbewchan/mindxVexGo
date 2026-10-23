import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();
 await page.addInitScript(()=>{let req;Object.defineProperty(window,'__vexStudioRequire',{configurable:true,get:()=>req,set:value=>{req=value;window.__auditRequire=value;}});});
 await page.goto('http://localhost:3120/editor/index.html?mode=training&simulation=assembly&lesson=audit-vr');
 await page.waitForFunction(()=>!!window.VexTraining&&!!window.VexStudio,{},{timeout:60000});
 await page.evaluate(()=>{window.postMessage({type:'training-command',action:'field',field:{width:2400,height:2400,start:{x:400,y:1600,heading:90},goal:{x:1100,y:1600,radius:100},walls:[],robot:{radius:135,wheelDiameter:50.9,trackWidth:160,maxRpm:100,eye:true,colorEye:true,distanceEye:true,bumper:true,magnet:true,enabled:true}}},location.origin);});
 await page.waitForTimeout(150);
 const result=await page.evaluate(()=>{
  const req=window.__auditRequire,B=req('./src/Blockly/BlocklyAccess.ts').Blockly;
  window.VexTraining.prepare();B.Events.disable();
  const rows=[];
  for(const type of Object.keys(B.Blocks).filter(t=>/^(vr_|go_|math_|logic_|operator_|text$|procedures_|argument_reporter_)/.test(t)&&typeof B.Blocks[t]?.init==='function')){
   const ws=req('./src/Blockly/BlocklyController.ts').getCurrentMainController().blocklyWorkspace;ws.clear();let block;for(const t of [B.SCALAR_VARIABLE_TYPE,B.BOOL_VARIABLE_TYPE,B.LIST_VARIABLE_TYPE,B.ARRAY2D_VARIABLE_TYPE])ws.createVariable('v'+(t||'Num'),t);
   try{
    block=ws.newBlock(type);for(const input of block.inputList)for(const field of input.fieldRow)field.initModel?.();B.JavaScript.init(ws);
    let code;try{code=B.JavaScript.blockToCode(block);}catch(error){code='ERROR: '+error.message;}
    let supported=true;try{window.VexTraining.validate(ws);}catch(error){supported=error.message;}
    rows.push({type,supported,fields:block.inputList.flatMap(i=>i.fieldRow.filter(f=>f.name).map(f=>({name:f.name,value:f.getValue?.(),options:typeof f.getOptions==='function'?f.getOptions(false):undefined}))),inputs:block.inputList.filter(i=>i.name).map(i=>({name:i.name,type:i.type})),output:!!block.outputConnection,code});
   }catch(error){rows.push({type,error:error.message,init:B.Blocks[type].init.toString()});}finally{ws.clear();}
  }
  return rows;
 });
 await fs.mkdir('artifacts/simulation',{recursive:true});await fs.writeFile('artifacts/simulation/block-audit.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify({registered:result.length,accepted:result.filter(r=>r.supported===true).length,failedGenerators:result.filter(r=>r.supported===true&&String(r.code).startsWith('ERROR:')),types:result.filter(r=>r.supported===true).map(r=>r.type)},null,2));
}finally{await browser.close();}
