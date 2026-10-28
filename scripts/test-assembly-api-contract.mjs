import assert from 'node:assert/strict';
import vm from 'node:vm';
import {ASSEMBLY_COMMANDS,validateAssemblyCommand} from '../public/assembly/api-contract.js';
let count=0;
const verify=(command,args,ok)=>{const result=validateAssemblyCommand(command,args);assert.equal(result.ok,ok,JSON.stringify({command,args,result}));count++;return result;};
for(const [command,item] of Object.entries(ASSEMBLY_COMMANDS)){
 verify(command,item.example,true);
 verify(command,{...item.example,misspelledField:true},false);
 verify(command,null,false);verify(command,[],false);
 for(const required of item.inputSchema.required){const args={...item.example};delete args[required];verify(command,args,false);}
 for(const [field,schema] of Object.entries(item.inputSchema.properties)){
  const bad=schema.type==='boolean'?'true':schema.type==='array'?[0,1]:schema.type==='object'?[]:schema.type==='number'||schema.type==='integer'?'5':42;
  verify(command,{...item.example,[field]:bad},false);
 }
}
verify('getState',{__proto__:null},true);
verify('listParts',vm.runInNewContext('({query:"Wheel"})'),true);
verify('getState',new(class Fixture{})(),false);verify('getState',new Date(),false);
verify('setTransform',{id:'x'},false);verify('setLayer',{id:'x'},false);verify('setGroup',{id:'g'},false);
for(const number of [NaN,Infinity,-Infinity,10001])verify('addPart',{sku:'x',position:[number,0,0]},false);
verify('addPart',{sku:'  '},false);verify('group',{ids:['a','a']},false);verify('group',{ids:['a']},false);
verify('getConnectionOptions',{id:'a',targetId:'b',limit:201},false);verify('getConnectionOptions',{id:'a',targetId:'b',offset:-1},false);
const kit={version:1,platform:'vexgo',name:'Test',count:1,enforce:true,items:{beam:2}};verify('setKit',{profile:kit},true);
verify('setKit',{profile:{...kit,items:{beam:-1}}},false);verify('setKit',{profile:{...kit,count:1.5}},false);
assert.equal(verify('__proto__',{},false).errorCode,'UNKNOWN_COMMAND');verify('constructor',{},false);
console.log(`PASS: ${count} command schema cases; examples, unknown/missing fields, types, bounds and kit JSON.`);
