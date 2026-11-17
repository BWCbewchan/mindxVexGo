import {collisionMesh} from './collision.js?v=physical-snap-112';
import {PLATFORM} from './platform.js';
export function collisionClient(getReferences){
 const sent=new Set(),sentReferences=new Set(),geometryBySku=new Map(),pending=new Map();
 let worker,sequence=0;
 function startWorker(){
  if(worker)return worker;
  const address=new URL('./collision-worker.js?v=physical-snap-112',import.meta.url);
  address.searchParams.set('platform',PLATFORM.id);
  worker=new Worker(address,{type:'module'});
  worker.onmessage=({data})=>{const entry=pending.get(data.id);if(!entry)return;pending.delete(data.id);data.error?entry.reject(Error(data.error)):entry.resolve(data.report);};
  worker.onerror=e=>{for(const entry of pending.values())entry.reject(Error(e.message||'Collision worker failed'));pending.clear();worker?.terminate();worker=null;sent.clear();sentReferences.clear();};
  return worker;
 }
 function request(parts,objects,guideNames){
  if(!guideNames&&parts.length<2)return Promise.resolve({issues:[],truncated:false});
  const target=startWorker(),geometryData=[],groups=[],referenceData={},transfers=[];
  const references=getReferences();
  for(const p of parts)if(!sentReferences.has(p.sku)){referenceData[p.sku]=references[p.sku]||[];sentReferences.add(p.sku);}
  for(const p of parts){
   const obj=objects.get(p.id);
   if(!obj)continue;
   obj.updateMatrixWorld(true);
   let shape=geometryBySku.get(p.sku);
   if(!shape){
    const mesh=collisionMesh(obj);
    shape={geometry:mesh.geometry,relative:obj.matrixWorld.clone().invert().multiply(mesh.matrixWorld)};
    geometryBySku.set(p.sku,shape);
   }
   const g=shape.geometry;
   if(!sent.has(g.uuid)){
    sent.add(g.uuid);
    const position=g.attributes.position.array.slice(),index=g.index?.array.slice();
    geometryData.push({id:g.uuid,position,index});
    transfers.push(position.buffer);
    if(index)transfers.push(index.buffer);
   }
   const matrix=obj.matrixWorld.clone().multiply(shape.relative);
   groups.push({id:p.id,meshes:[{geometry:g.uuid,matrix:matrix.toArray()}]});
  }
  const id=++sequence;
  return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});target.postMessage({id,parts,groups,geometryData,referenceData,guideNames},transfers);});
 }
 return {check:request,auditGuide:(parts,objects,names)=>request(parts,objects,names),recoverLinks(parts,lockedIds=[]){
  const target=startWorker(),id=++sequence,referenceData={},references=getReferences();
  for(const p of parts)if(!sentReferences.has(p.sku)){referenceData[p.sku]=references[p.sku]||[];sentReferences.add(p.sku);}
  return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});target.postMessage({id,kind:'recover',parts,lockedIds,referenceData});});
 }};
}
