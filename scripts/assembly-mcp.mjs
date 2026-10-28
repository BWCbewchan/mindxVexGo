import {McpServer} from '@modelcontextprotocol/server';
import {serveStdio} from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import {createAssemblyRelay} from './assembly-mcp-relay.mjs';
import {ASSEMBLY_COMMANDS,describeAssemblyAPI} from '../public/assembly/api-contract.js';

const port=Number(process.env.MINDX_ASSEMBLY_MCP_PORT||3188);
if(!Number.isInteger(port)||port<0||port>65535)throw Error('Invalid MCP relay port');
const options={port};if(process.env.MINDX_ASSEMBLY_APP_ORIGIN)options.origins=[new URL(process.env.MINDX_ASSEMBLY_APP_ORIGIN).origin];
const relay=await createAssemblyRelay(options);
const result=value=>({content:[{type:'text',text:JSON.stringify(value)}],isError:value?.ok===false});
const handle=serveStdio(()=>{
 const server=new McpServer({name:'mindx-assembly',version:'1.2.0'});
 server.registerTool('assembly_pairing_info',{description:'Return the local pairing link. The user opens Help → AI / API & MCP in the intended model, pastes the link and explicitly connects. Does not connect a model by itself.',inputSchema:z.object({}),annotations:{readOnlyHint:true}},async()=>result({url:relay.url+'/#token='+relay.token,status:relay.status(),instructions:'Paste this private link in the app. Enable editing only if AI should modify this model.'}));
 server.registerTool('assembly_status',{description:'Inspect which model the user paired, without reading its CAD.',inputSchema:z.object({}),annotations:{readOnlyHint:true}},async()=>result(relay.status()));
 server.registerTool('assembly_diagnostics',{description:'Inspect relay connectivity, pending/uncertain commands and the last 60 command outcomes. No pairing token or CAD payload is included.',inputSchema:z.object({}),annotations:{readOnlyHint:true}},async()=>result(relay.diagnostics()));
 server.registerTool('assembly_disconnect',{description:'Disconnect the paired editor and cancel queued calls. A CAD transaction already running may finish; inspect the model before retrying writes.',inputSchema:z.object({}),annotations:{readOnlyHint:false,destructiveHint:false,idempotentHint:true}},async()=>{relay.disconnect();return result({ok:true});});
 server.registerTool('assembly_api_reference',{description:'Command names, input JSON schemas, examples, units and editor rules. Read before building.',inputSchema:z.object({}),annotations:{readOnlyHint:true}},async()=>result(describeAssemblyAPI()));
 server.registerTool('assembly_command_help',{description:'Read the exact schema and example for one command before calling it. Use getConnectionOptions to discover compatible reference pairs; duplication preserves internal joints.',inputSchema:z.object({command:z.enum(Object.keys(ASSEMBLY_COMMANDS))}),annotations:{readOnlyHint:true}},async({command})=>result({command,...ASSEMBLY_COMMANDS[command]}));
 for(const [name,readOnly] of [['assembly_read',true],['assembly_edit',false]]){
  const commands=Object.keys(ASSEMBLY_COMMANDS).filter(command=>ASSEMBLY_COMMANDS[command].readOnly===readOnly);
  server.registerTool(name,{description:readOnly?'Read catalog, compatible connection options, project, kit, diagnostics, mechanical review or guide from the paired editor.':'Edit the explicitly paired model through the editor API. Requires editing permission. Honors kit, locks, fit, serialization and Undo. Inspect ok/errors. On timeout or in-flight cancellation, read getState before retrying writes.',inputSchema:z.object({command:z.enum(commands),args:z.record(z.string(),z.unknown()).default({})}),annotations:{readOnlyHint:readOnly,destructiveHint:!readOnly,idempotentHint:false,openWorldHint:false}},async({command,args},context)=>result(await relay.execute(command,args,{signal:context.mcpReq.signal})));
 }
 return server;
});
console.error(`mindX Assembly MCP ready; local relay ${relay.url}. Use assembly_pairing_info to pair a model.`);
let stopping=false;async function stop(){if(stopping)return;stopping=true;await relay.close();await handle.close();}
process.once('SIGINT',()=>void stop());process.once('SIGTERM',()=>void stop());process.stdin.once('end',()=>void stop());
