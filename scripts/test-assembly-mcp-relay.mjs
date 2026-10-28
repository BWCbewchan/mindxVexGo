import assert from 'node:assert/strict';
import http from 'node:http';
import {createAssemblyRelay} from './assembly-mcp-relay.mjs';
const origin='http://localhost:3120',relay=await createAssemblyRelay({port:0,timeoutMs:100,leaseMs:2000});let sessionId='';
const headers=()=>({Origin:origin,Authorization:'Bearer '+relay.token,'Content-Type':'application/json','X-Assembly-Session':sessionId});
const call=(path,body,extra={})=>fetch(relay.url+path,{method:body?'POST':'GET',headers:{...headers(),...extra},body:body?JSON.stringify(body):undefined});
try{
 assert.equal((await relay.execute('getState')).errorCode,'NOT_CONNECTED');
 assert.equal((await call('/connect',{},{Origin:'https://example.invalid'})).status,403);
 assert.equal((await call('/connect',{},{Authorization:'Bearer '+'0'.repeat(64)})).status,401);
 let response=await call('/connect',{context:{title:'Fixture',platform:'vexgo'},allowWrites:false});sessionId=(await response.json()).sessionId;assert.ok(sessionId);
 assert.equal((await relay.execute('addPart',{sku:'test'})).errorCode,'READ_ONLY');
 assert.equal((await call('/connect',{context:{title:'Other',platform:'vexiq'},allowWrites:true})).status,409);
 let next=call('/next');let command=relay.execute('getState');let task=await(await next).json();assert.equal(task.command,'getState');assert.equal((await call('/result',{id:task.id,result:{ok:true,result:{title:'Fixture'}}})).status,200);assert.equal((await command).result.title,'Fixture');
 assert.equal((await call('/result',{id:task.id,result:{ok:true}})).status,409,'Duplicate response rejected');
 next=call('/next');command=relay.execute('getState');task=await(await next).json();assert.equal((await command).errorCode,'COMMAND_TIMEOUT');assert.equal((await(await call('/result',{id:task.id,result:{ok:true}})).json()).discarded,true,'Late response is acknowledged without changing its timed-out result');
 command=relay.execute('getState');await call('/disconnect',{});assert.equal((await command).errorCode,'DISCONNECTED');assert.equal(relay.status().connected,false);
 const delayed=http.request(relay.url+'/connect',{method:'POST',headers:headers()});
 const delayedResponse=new Promise((resolve,reject)=>{delayed.once('response',res=>{res.resume();resolve(res.statusCode);});delayed.once('error',reject);});
 delayed.write('{');await new Promise(resolve=>setTimeout(resolve,30));
 response=await call('/connect',{context:{title:'Writable',platform:'vexiq'},allowWrites:true});sessionId=(await response.json()).sessionId;
 delayed.end('"context":{"title":"Racing editor","platform":"vexgo"},"allowWrites":true}');assert.equal(await delayedResponse,409,'Concurrent pairing cannot replace the first connected model');assert.equal(relay.status().context.title,'Writable');
 next=call('/next');command=relay.execute('addPart',{sku:'test'});task=await(await next).json();assert.deepEqual(task.args,{sku:'test'});await call('/result',{id:task.id,result:{ok:false,error:'Kit exhausted'}});assert.equal((await command).error,'Kit exhausted');
 assert.equal((await relay.execute('getState',{typo:true})).errorCode,'INVALID_ARGUMENTS');
 assert.equal((await call('/next',null,{Origin:'http://127.0.0.1:3120'})).status,403,'Session is bound to its original allowed origin');
 let abort=new AbortController();command=relay.execute('getState',{}, {signal:abort.signal});abort.abort();assert.equal((await command).errorCode,'CANCELLED');assert.equal(relay.status().pending,0);
 abort=new AbortController();next=call('/next');command=relay.execute('getState',{}, {signal:abort.signal});task=await(await next).json();abort.abort();assert.equal((await command).errorCode,'CANCELLED_IN_FLIGHT');assert.equal(relay.diagnostics().uncertain,1);assert.equal((await(await call('/result',{id:task.id,result:{ok:true}})).json()).discarded,true);assert.equal(relay.diagnostics().uncertain,0);
 assert.equal(JSON.stringify(relay.diagnostics()).includes(relay.token),false,'Diagnostics never expose pairing secrets');
 assert.equal((await relay.execute('constructor')).errorCode,'UNKNOWN_COMMAND');
 console.log('PASS: loopback relay pairing, origin/token guards, read-only permissions, takeover, result routing, timeout, duplicate/stale rejection and disconnect cancellation.');
}finally{await relay.close();}
const slow=await createAssemblyRelay({port:0,timeoutMs:1000,leaseMs:80});
try{
 const headers={Origin:origin,Authorization:'Bearer '+slow.token,'Content-Type':'application/json'};
 const response=await fetch(slow.url+'/connect',{method:'POST',headers,body:JSON.stringify({context:{title:'Long command',platform:'vexgo'},allowWrites:true})});headers['X-Assembly-Session']=(await response.json()).sessionId;
 const next=fetch(slow.url+'/next',{headers}),command=slow.execute('getState');const task=await(await next).json();await new Promise(resolve=>setTimeout(resolve,160));assert.equal(slow.status().connected,true,'Executing command retains its lease');
 await fetch(slow.url+'/result',{method:'POST',headers,body:JSON.stringify({id:task.id,result:{ok:true}})});assert.equal((await command).ok,true);
 await new Promise(resolve=>setTimeout(resolve,160));assert.equal(slow.status().connected,false,'Idle abandoned editor expires');
 console.log('PASS: long-running command lease and abandoned editor expiry.');
}finally{await slow.close();}
