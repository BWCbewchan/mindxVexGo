// Live MCP client: the browser only pairs through Help; every CAD operation
// below goes through the real stdio tools. Never import a finished project.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import readline from 'node:readline';

const projectId=process.argv[2];
const recipeSource=process.argv[3]||'public/assembly/original-car-recipe.json';
if(!/^[a-zA-Z0-9_-]{1,100}$/.test(projectId||''))throw Error('Supply the explicitly created, empty project ID');
const directory=path.resolve('artifacts/assembly-live-ai',projectId);await fs.mkdir(directory,{recursive:true});
const child=spawn(process.execPath,['scripts/assembly-mcp.mjs'],{env:{...process.env,MINDX_ASSEMBLY_MCP_PORT:'0'},stdio:['pipe','pipe','pipe']});
const input=readline.createInterface({input:child.stdout}),requests=new Map(),ledger=[];let sequence=0,stderr='';
child.stderr.on('data',chunk=>stderr+=chunk.toString());
input.on('line',line=>{try{const message=JSON.parse(line),pending=requests.get(message.id);if(pending){clearTimeout(pending.timer);requests.delete(message.id);message.error?pending.reject(Error(JSON.stringify(message.error))):pending.resolve(message.result);}}catch{}});
function rpc(method,params={}){const id=++sequence;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{requests.delete(id);reject(Error('MCP request timed out: '+method));},90000);requests.set(id,{resolve,reject,timer});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});}
async function tool(name,args={}){const response=await rpc('tools/call',{name,arguments:args});const data=JSON.parse(response.content[0].text);if(response.isError||data.ok===false)throw Object.assign(Error(data.error||'MCP tool failed'),{details:data});return data;}
async function command(name,args={}){
 const readOnly=new Set(['getState','listParts','getCatalogConnectors','getConnectors','getConnectionOptions','checkFit','getConnections','reviewMechanics','getInventory','getKit','getGuide','exportProject','getCapabilities','getDiagnostics']);
 const started=Date.now();try{const result=await tool(readOnly.has(name)?'assembly_read':'assembly_edit',{command:name,args});ledger.push({command:name,args,ok:true,elapsedMs:Date.now()-started,meta:result.meta,relay:result.relay});return result.result;}catch(error){ledger.push({command:name,args,ok:false,elapsedMs:Date.now()-started,error:error.message,details:error.details});throw error;}
}
const write=(name,value)=>fs.writeFile(path.join(directory,name),JSON.stringify(value,null,2),'utf8');
try{
 await rpc('initialize',{protocolVersion:'2025-11-25',capabilities:{},clientInfo:{name:'mindX live AI model builder',version:'1.0'}});child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const pairing=await tool('assembly_pairing_info');console.log(JSON.stringify({stage:'PAIR_IN_HELP',url:pairing.url,projectId}));
 let connected=false;for(let i=0;i<600;i++){const status=await tool('assembly_status');if(status.connected){assert.equal(status.context.projectId,projectId,'Paired editor is not the explicitly created project');assert.equal(status.context.platform,'vexgo');assert.equal(status.allowWrites,true,'Enable editing before pairing');connected=true;break;}await new Promise(resolve=>setTimeout(resolve,1000));}assert.ok(connected,'Pairing timed out');
 const initial=await command('getState');assert.equal(initial.project.parts.length,0,'Refusing to overwrite a nonempty model');assert.equal(initial.context.projectId,projectId);const kit=await command('getKit');assert.equal(kit.enforce,true);assert.equal(kit.count,1);
 const recipe=JSON.parse(await fs.readFile(recipeSource,'utf8')),catalog=await command('listParts'),entries=new Map(catalog.map(item=>[item.id,item])),references=new Map();
 for(const sku of new Set(recipe.map(item=>item.sku))){assert.ok(entries.has(sku),'Unknown catalog SKU: '+sku);references.set(sku,await command('getCatalogConnectors',{sku}));}
 const originals=new Map(recipe.map(item=>[item.id,item]));for(const item of recipe)if(item.mate){assert.ok(references.get(item.sku).some(ref=>ref.id===item.mate.sourceRef));assert.ok(references.get(originals.get(item.mate.target).sku).some(ref=>ref.id===item.mate.targetRef));}
 console.log(JSON.stringify({stage:'CONNECTED',title:initial.project.title,platform:'vexgo',kitCount:kit.count,plannedParts:recipe.length}));
 const ids=new Map();let writes=0;
 for(const [index,item] of recipe.entries()){
  let id;if(['269-6685-000','269-6686-000'].includes(item.sku)){const state=await command('getState');id=state.project.parts.find(part=>part.sku===item.sku)?.id;if(id){await command('setTransform',{id,position:[1500,200,1000],rotation:item.rotation});writes++;}}
  if(!id){const result=await command('addPart',{sku:item.sku,position:[index===0?500:1500,200,1000],rotation:item.rotation});id=result.id;writes++;}
  ids.set(item.id,id);
  if(item.mate){
   const targetId=ids.get(item.mate.target);assert.ok(targetId,'Target must already exist');let found;
   for(let offset=0;;){const choices=await command('getConnectionOptions',{id,targetId,offset,limit:200});found=choices.options.find(option=>option.sourceRef===item.mate.sourceRef&&option.targetRef===item.mate.targetRef);if(found||choices.nextOffset===null)break;offset=choices.nextOffset;}
   assert.ok(found,'Recipe connector pair is not compatible');assert.ok(item.mate.depth<=found.maxDepth);
   await command('attach',{id,targetId,sourceRef:item.mate.sourceRef,targetRef:item.mate.targetRef,depth:item.mate.depth,twist:item.mate.twist||0});
  }else await command('setTransform',{id,position:item.position,rotation:item.rotation});writes++;
  if((index+1)%6===0||index===recipe.length-1)console.log(JSON.stringify({stage:'BUILDING',complete:index+1,total:recipe.length,writeCommands:writes}));
 }
 const state=await command('getState');assert.equal(state.project.parts.length,recipe.length);await command('group',{ids:state.project.parts.map(part=>part.id),name:'Khung xe · motor / bánh / điện tử'});writes++;
 const fit=await command('checkFit'),inventory=await command('getInventory'),connections=await command('getConnections'),mechanics=await command('reviewMechanics'),guide=await command('getGuide');
 assert.equal(fit.issues.filter(issue=>issue.kind==='penetration').length,0,'Body penetration must be resolved');assert.equal(inventory.filter(row=>row.remaining<0).length,0,'Model exceeds the one-kit stock');
 await command('flushProject');const project=await command('exportProject');
 const summary={title:project.title,projectId,url:'http://localhost:3120/assembly/vexgo/'+projectId,parts:project.parts.length,motors:project.parts.filter(p=>p.sku==='269-6690-000').length,brains:project.parts.filter(p=>p.sku==='269-6685-000').length,batteries:project.parts.filter(p=>p.sku==='269-6686-000').length,wheels:project.parts.filter(p=>['228-2500-1383','228-2500-1384'].includes(p.sku)).length,kitCount:1,writeCommands:writes,totalAPICommands:ledger.length,penetrations:0,shortages:0,connections:connections.length,mechanicalIssues:mechanics,guideReady:guide.ready,guideBlockers:guide.blockers,verification:'CAD and inventory checked; no physical hardware test',recipeSource,transport:'MCP stdio → paired loopback relay → existing editor API'};
 await write('model.json',project);await write('bom.json',inventory);await write('connections.json',connections);await write('guide.json',guide);await write('summary.json',summary);await write('commands.json',ledger);await write('id-map.json',Object.fromEntries(ids));console.log(JSON.stringify({stage:'COMPLETE',summary,files:directory}));
 await tool('assembly_disconnect');
}catch(error){await write('commands.json',ledger);await write('failure.json',{error:error.message,details:error.details||null,stderr:stderr.slice(-1000)});console.error(JSON.stringify({stage:'FAILED',error:error.message,details:error.details,files:directory}));process.exitCode=1;
}finally{child.stdin.end();await new Promise(resolve=>{if(child.exitCode!==null)resolve();else{child.once('exit',resolve);setTimeout(()=>{child.kill();resolve();},3000).unref();}});for(const pending of requests.values())clearTimeout(pending.timer);input.close();}
