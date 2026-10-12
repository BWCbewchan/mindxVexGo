import assert from 'node:assert/strict';
import {PROJECT_INDEX,createProject,saveProject,loadProject,listProjects,projectKey,markProjectDeleted,migrateLegacyDraft,validateProjectFile} from '../public/assembly/project-store.js';
class Storage{values=new Map();get length(){return this.values.size;}key(i){return [...this.values.keys()][i];}getItem(k){return this.values.get(k)??null;}setItem(k,v){this.values.set(k,v);}removeItem(k){this.values.delete(k);}}
const storage=new Storage(),blank={version:1,title:'GO',parts:[],groups:[],steps:[]};
const go=createProject('vexgo','GO',undefined,storage),iq=createProject('vexiq','IQ',undefined,storage);
saveProject('vexgo',go,{...blank,title:'Updated GO'},{thumbnail:'image'},storage);
assert.equal(loadProject('vexiq',iq,storage).title,'IQ');assert.equal(loadProject('vexgo',go,storage).title,'Updated GO');
assert.equal(listProjects(storage).length,2);assert.equal(loadProject('vexiq',go,storage),null);
assert.throws(()=>projectKey('vexiq','../go'));markProjectDeleted('vexgo',go,true,storage);assert.throws(()=>saveProject('vexgo',go,blank,{},storage),/thùng rác/);assert.ok(loadProject('vexgo',go,storage));markProjectDeleted('vexgo',go,false,storage);assert.equal(listProjects(storage).find(p=>p.id===go).deletedAt,undefined);
const legacy={...blank,parts:[{id:'beam-1',sku:'beam',label:'Beam',position:[0,0,0],rotation:[0,0,0]}]};storage.setItem('mindx-vexgo-assembly-v1',JSON.stringify(legacy));migrateLegacyDraft(storage);migrateLegacyDraft(storage);assert.equal(listProjects(storage).filter(p=>p.legacyDraft).length,1);assert.equal(storage.getItem('mindx-vexgo-assembly-v1'),JSON.stringify(legacy));
const partial=new Storage();partial.setItem=(k,v)=>{if(k===PROJECT_INDEX)throw Error('quota');partial.values.set(k,v);};assert.throws(()=>createProject('vexiq','Recovered',undefined,partial));assert.equal(listProjects(partial)[0].title,'Recovered');
const cat=[{id:'beam',kind:'body'}];assert.equal(validateProjectFile(legacy,'vexgo',cat).parts[0].kind,'body');assert.throws(()=>validateProjectFile({...legacy,platform:'vexiq'},'vexgo',cat));assert.throws(()=>validateProjectFile({...legacy,parts:[...legacy.parts,...legacy.parts]},'vexgo',cat));assert.throws(()=>validateProjectFile({...legacy,groups:[{id:'a',name:'A',parentId:'b'},{id:'b',name:'B',parentId:'a'}]},'vexgo',cat));assert.throws(()=>validateProjectFile({...legacy,parts:[{...legacy.parts[0],position:[NaN,0,0]}]},'vexgo',cat));
console.log('PASS: GO/IQ isolation, missing IDs, reversible trash, legacy migration once, quota recovery and invalid import rejection.');
