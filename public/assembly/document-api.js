import {buildAssemblyDocument} from './document-model.js';

export function installDocumentAPI(app){
 let tail=Promise.resolve();
 function update(input,mode,producer=false){
  const task=tail.then(async()=>{
   if(app.busy())throw Error('Editor đang bận. Kết thúc thao tác hiện tại rồi thử lại.');
   const value=producer?await input():input;
   const result=buildAssemblyDocument(app.project(),value,{mode,platform:app.platform,catalog:app.catalog(),references:app.references});
   await app.transaction(()=>app.replace(result.document),{replaceAll:mode==='replace'});
   return {partCount:app.project().parts.length,addedIds:result.addedIds,idMap:result.idMap,mode:app.mode};
  });tail=task.catch(()=>{});return task;
 }
 const api=Object.freeze({
  async listParts(){return structuredClone(app.catalog().map(p=>({...p,partId:p.id,ports:app.references[p.id]||[]})));},
  async getState(){await tail;return {...structuredClone(app.project()),viewMode:app.mode,buildGuide:structuredClone(app.guide())};},
  loadJSON:input=>update(input,'replace'),
  appendJSON:input=>update(input,'append'),
  addPart:row=>update(async()=>{const sku=row?.partId??row?.sku;if(!app.catalog().some(p=>p.id===sku))throw Error('Mã linh kiện không có trong thư viện: '+String(sku));return {parts:[{...row,position:row.position??await app.staging(sku)}]};},'append',true),
  clear:()=>update({parts:[],groups:[]},'replace'),
 });
 // The bootstrap facade retains identity for callers already waiting on ready.
 if(window.assemblyAPI)window.dispatchEvent(new CustomEvent('assembly-api-ready',{detail:api}));
 else{window.assemblyAPI=api;if(window.parent!==window)try{if(window.parent.location.origin===location.origin)window.parent.assemblyAPI=api;}catch{}}
 return api;
}
