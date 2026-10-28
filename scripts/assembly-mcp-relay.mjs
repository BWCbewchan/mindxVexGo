import http from 'node:http';
import {randomBytes,randomUUID,timingSafeEqual} from 'node:crypto';
import {ASSEMBLY_COMMANDS,validateAssemblyCommand,API_ERROR_HELP} from '../public/assembly/api-contract.js';

export async function createAssemblyRelay({port=3188,origins=['http://localhost:3120','http://127.0.0.1:3120','http://localhost:3100','http://127.0.0.1:3100','https://mindxvexgostudio.vercel.app'],timeoutMs=60000,leaseMs=60000}={}){
 const token=randomBytes(32).toString('hex'),allowed=new Set(origins),pending=new Map(),retired=new Map(),recent=[];let session=null,poll=null,closed=false;
 const json=(res,status,data)=>{if(!res.writableEnded){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));}};
 const fail=(code,error)=>({ok:false,errorCode:code,error,hint:API_ERROR_HELP[code]});
 function finish(id,result){const entry=pending.get(id);if(!entry)return false;clearTimeout(entry.timer);entry.signal?.removeEventListener('abort',entry.abort);pending.delete(id);
  const durationMs=Date.now()-entry.started;recent.push({requestId:id,command:entry.command,ok:result.ok,errorCode:result.errorCode||null,durationMs,delivered:entry.delivered,finishedAt:new Date().toISOString()});if(recent.length>60)recent.shift();
  if(entry.delivered&&!result.ok&&['COMMAND_TIMEOUT','CANCELLED_IN_FLIGHT'].includes(result.errorCode)){retired.set(id,Math.max(entry.deadline,Date.now()+60000));if(retired.size>64)retired.delete(retired.keys().next().value);}
  entry.resolve({...result,relay:{requestId:id,durationMs}});return true;
 }
 function disconnect(reason='Editor disconnected'){
  session=null;if(poll){clearTimeout(poll.timer);json(poll.res,410,fail('DISCONNECTED',reason));poll=null;}
  for(const id of pending.keys())finish(id,fail('DISCONNECTED',reason));
  retired.clear();
 }
 function expire(){const now=Date.now();for(const [id,deadline] of retired)if(deadline<now)retired.delete(id);const executing=[...pending.values()].some(task=>task.delivered&&task.deadline>now)||retired.size>0;if(session&&now-session.lastSeen>leaseMs&&!executing)disconnect('Editor connection expired. Pair the model again.');}
 function deliver(){if(!poll||!session)return;const task=[...pending.values()].find(task=>!task.delivered);if(!task)return;task.delivered=true;clearTimeout(poll.timer);json(poll.res,200,{id:task.id,command:task.command,args:task.args,deadline:task.deadline});poll=null;}
 async function body(req){let bytes=0,chunks=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>8e6)throw Error('Request too large');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}');}
 const server=http.createServer(async(req,res)=>{
  try{
   const address=server.address(),hosts=new Set([`127.0.0.1:${address.port}`,`localhost:${address.port}`]);
   if(!hosts.has(req.headers.host))return json(res,403,fail('INVALID_HOST','Loopback Host required'));
   const origin=req.headers.origin;
   if(!allowed.has(origin))return json(res,403,fail('INVALID_ORIGIN','This app origin is not allowed'));
   res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type, X-Assembly-Session');res.setHeader('Access-Control-Allow-Private-Network','true');res.setHeader('Access-Control-Max-Age','600');
   if(req.method==='OPTIONS')return json(res,200,{});
   const bearer=String(req.headers.authorization||'').replace(/^Bearer /,'');
   if(!/^[a-f0-9]{64}$/.test(bearer)||!timingSafeEqual(Buffer.from(bearer),Buffer.from(token)))return json(res,401,fail('UNAUTHORIZED','Invalid pairing token'));
   expire();const path=new URL(req.url,'http://127.0.0.1').pathname;
   if(path==='/connect'&&req.method==='POST'){
    if(session)return json(res,409,fail('ALREADY_CONNECTED','Disconnect the currently paired model first'));
    const data=await body(req);if(session)return json(res,409,fail('ALREADY_CONNECTED','Disconnect the currently paired model first'));
    if(!data.context||typeof data.context.title!=='string'||!['vexgo','vexiq'].includes(data.context.platform)||typeof data.allowWrites!=='boolean')return json(res,400,fail('INVALID_CONTEXT','Invalid editor context'));
    session={id:randomUUID(),origin,context:{title:data.context.title.slice(0,120),platform:data.context.platform,projectId:String(data.context.projectId||'').slice(0,120)},allowWrites:data.allowWrites,lastSeen:Date.now()};return json(res,200,{sessionId:session.id});
   }
   if(!session||req.headers['x-assembly-session']!==session.id)return json(res,409,fail('DISCONNECTED','Pair this editor again'));
   if(origin!==session.origin)return json(res,403,fail('INVALID_ORIGIN','The session belongs to another app origin'));
   session.lastSeen=Date.now();
   if(path==='/disconnect'&&req.method==='POST'){disconnect();return json(res,200,{ok:true});}
   if(path==='/next'&&req.method==='GET'){
    if(poll)return json(res,409,fail('DUPLICATE_POLL','Only one editor poll is allowed'));
    const current={res,timer:setTimeout(()=>{if(poll===current){poll=null;json(res,200,{idle:true});}},Math.min(20000,leaseMs/2))};poll=current;
    res.on('close',()=>{if(poll===current){clearTimeout(current.timer);poll=null;}});deliver();return;
   }
   if(path==='/result'&&req.method==='POST'){
    const data=await body(req),task=pending.get(data.id);
    if(retired.has(data.id)){retired.delete(data.id);return json(res,200,{ok:true,discarded:true});}
    if(!task?.delivered||typeof data.result?.ok!=='boolean')return json(res,409,fail('STALE_RESULT','Unknown or expired command result'));
    finish(data.id,data.result);return json(res,200,{ok:true});
   }
   json(res,404,fail('NOT_FOUND','Unknown relay endpoint'));
  }catch(error){json(res,400,fail('BAD_REQUEST',error.message));}
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 const sweep=setInterval(expire,Math.min(5000,leaseMs/2));sweep.unref();
 return {
  url:`http://127.0.0.1:${server.address().port}`,token,
  status(){expire();return {connected:!!session,context:session?.context||null,allowWrites:session?.allowWrites||false,pending:pending.size,origin:session?.origin||null,lastSeenAt:session?new Date(session.lastSeen).toISOString():null};},
  diagnostics(){return {...this.status(),recent:structuredClone(recent),pendingCommands:[...pending.values()].map(task=>({requestId:task.id,command:task.command,stage:task.delivered?'delivered':'queued',elapsedMs:Date.now()-task.started,deadlineAt:new Date(task.deadline).toISOString()})),uncertain:retired.size,timeoutMs,leaseMs};},
  disconnect,
  execute(command,args={},{signal}={}){
   expire();if(closed||!session)return Promise.resolve(fail('NOT_CONNECTED','Open Help → AI / API & MCP and pair the editor.'));
   const validation=validateAssemblyCommand(command,args);if(!validation.ok)return Promise.resolve(validation);
   if(!ASSEMBLY_COMMANDS[command].readOnly&&!session.allowWrites)return Promise.resolve(fail('READ_ONLY','Enable model editing when pairing in the app.'));
   if(pending.size>=16)return Promise.resolve(fail('BUSY','Too many pending commands'));
   if(signal?.aborted)return Promise.resolve(fail('CANCELLED','Command cancelled before delivery'));
   args=structuredClone(args);
   const id=randomUUID(),wait=command==='exportGuide'?Math.max(timeoutMs,300000):timeoutMs;
   return new Promise(resolve=>{const task={id,command,args,resolve,signal,started:Date.now(),delivered:false,deadline:Date.now()+wait,timer:setTimeout(()=>finish(id,fail('COMMAND_TIMEOUT','Command timed out. Read getState before retrying any write; the edit may already have completed.')),wait)};
    task.abort=()=>finish(id,fail(task.delivered?'CANCELLED_IN_FLIGHT':'CANCELLED',task.delivered?'Cancelled after delivery. The edit may still finish; read getState before retrying.':'Command cancelled before delivery'));
    pending.set(id,task);signal?.addEventListener('abort',task.abort,{once:true});deliver();});
  },
  async close(){closed=true;clearInterval(sweep);disconnect('MCP server stopped');server.closeAllConnections();await new Promise(resolve=>server.close(resolve));},
 };
}
