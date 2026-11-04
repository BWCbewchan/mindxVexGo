import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {defaultKitProfile,additionalKitProfile,validateKitProfile,kitReport,kitAssemblyReport,assertKitChange,totalKitCount} from '../public/assembly/kit-policy.js';
import {sourceCatalog,partModelUrl} from '../public/assembly/part-source.js';
import {partPreviewSrc} from '../public/assembly/part-preview.js';
import {projectCatalog} from '../public/assembly/project-catalog.js';
import {validateProjectFile} from '../public/assembly/project-store.js';
import {createKitCatalogLoader} from '../public/assembly/kit-catalog-loader.js';
import {validateAssemblyCommand} from '../public/assembly/api-contract.js';
import {libraryView} from '../public/assembly/library-catalog.js';

const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const go=await read('public/assembly/parts.json'),iq=await read('public/assembly/iq/parts.json'),lego=await read('public/assembly/lego/parts.json');
for(const [base,primary,foreign,foreignCatalog] of [['vexgo',go,'vexiq',iq],['vexiq',iq,'vexgo',go]]){
 const catalog=[...primary,...sourceCatalog(foreignCatalog,foreign,base)],original=defaultKitProfile(primary,base);
 assert.equal(original.additionalKits,undefined,'Single-kit default unchanged');
 const profile=validateKitProfile({...defaultKitProfile(catalog,base),additionalKits:[{...additionalKitProfile(catalog,base,foreign),count:2}]},catalog,base);
 assert.equal(validateAssemblyCommand('setKit',{profile}).ok,true,'AI API accepts optional mixed-kit profile');assert.equal(totalKitCount(profile),3);assert.equal(profile.additionalKits.length,1);
 const sku=foreign==='vexiq'?'vexiq__228-2500-060':'vexgo__228-2500-2260',report=kitReport([{sku}],catalog,profile),row=report.find(r=>r.skus.includes(sku));
 assert.equal(row.available,foreign==='vexiq'?442:106);assert.equal(row.used,1);
 const alias=foreign==='vexiq'?'vexiq__228-2500-2260':sku;
 if(foreign==='vexiq')assert.equal(kitReport([{sku},{sku:alias}],catalog,profile).find(r=>r.skus.includes(sku)).used,2,'IQ aliases share stock only inside their source kit');
 assert.match(partModelUrl(base,sku),foreign==='vexiq'?/\/iq\/parts\/228-2500-060\/model.glb$/:/^\/assembly\/parts\/228-2500-2260\/model.glb$/);
 assert.ok(!partPreviewSrc(base,sku).includes('__'),'PDF/library preview resolves original source URL');
 const kitId=foreign==='vexiq'?'228-7755':'269-6911';assert.ok(libraryView(catalog,base,{scope:'kit:'+kitId,profile}).available>0);
 assert.ok(libraryView(catalog,base,{scope:'project',profile}).groups.flatMap(g=>g.parts).some(p=>p.id===sku));
 const data={version:1,platform:base,title:'Mixed stock',parts:[{id:'part',sku,label:'Pin',position:[0,20,0],rotation:[0,0,0]}],groups:[],steps:[],kit:profile};
 assert.deepEqual(validateProjectFile(JSON.parse(JSON.stringify(data)),base,catalog).kit,profile);
 const removed=validateKitProfile({...profile,additionalKits:[]},catalog,base);
 assert.equal(kitReport(data.parts,catalog,removed).find(r=>r.skus.includes(sku)).remaining,-1);
 assert.equal(validateProjectFile({...data,kit:removed},base,catalog).parts.length,1,'Removing stock never deletes placed parts');
 assert.throws(()=>assertKitChange(data.parts,[...data.parts,{sku}],catalog,removed),/Vượt/);
 if(foreign==='vexiq'){
  const wheel='vexiq__iq-balloon-wheel',stock=kitReport([{sku:wheel}],catalog,profile);
  for(const part of ['1953','1958'])assert.equal(stock.find(r=>r.skus.includes('vexiq__228-2500-'+part)).used,1);
  assert.ok(kitAssemblyReport([],catalog,profile).find(r=>r.sku===wheel).available>0);
 }else{
  const stock=kitReport([{sku:'vexgo__228-2500-1383'}],catalog,profile);assert.equal(stock.find(r=>r.skus.includes('vexgo__228-2500-207')).used,1);
 }
}
const core=defaultKitProfile(lego,'lego','45544-1'),prime=additionalKitProfile(lego,'lego','lego','45678-1'),combined=validateKitProfile({...core,additionalKits:[{...prime,count:2}]},lego,'lego');
const shared=lego.find(p=>p.sets?.['45544-1']&&p.sets?.['45678-1']);assert.ok(shared);
assert.equal(kitReport([],lego,combined).find(r=>r.sku===shared.id).available,shared.sets['45544-1']+2*shared.sets['45678-1']);
assert.throws(()=>validateKitProfile({...core,additionalKits:[prime,prime]},lego,'lego'),/lặp/);
assert.throws(()=>validateKitProfile({...core,additionalKits:[{...prime,count:0}]},lego,'lego'),/1.*100/);
assert.throws(()=>validateKitProfile({...core,additionalKits:[defaultKitProfile(go,'vexgo')]},lego,'lego'),/cùng hệ/);
const fixture={kit:{additionalKits:[{platform:'vexiq'}]},parts:[{sku:'vexiq__228-2500-060'}]};let calls=0;
const fetcher=async url=>{calls++;return {ok:true,json:async()=>url.includes('connectors')?{parts:{'228-2500-060':[{id:'pin',kind:'pin'}]}}:url.includes('/iq/')?iq:go};};
const loaded=await projectCatalog('vexgo',fixture,fetcher);assert.ok(loaded.some(p=>p.id==='vexiq__228-2500-060'));
const catalog=[...go],references={},loader=createKitCatalogLoader({platform:'vexgo',catalog,references,fetcher});
await loader.ensure(fixture.kit,fixture.parts);const count=catalog.length,after=calls;await loader.ensure(fixture.kit,fixture.parts);assert.equal(catalog.length,count);assert.equal(calls,after);assert.equal(references['vexiq__228-2500-060'][0].id,'pin');
console.log('PASS: untouched defaults, GO/IQ both directions, independent stock and aliases, composite wheels, mixed LEGO sums, invalid-kit rejection, source CAD/PDF URLs, saved reload, safe removal and lazy loading.');
