import {collisionMesh} from './collision.js?v=iq-power-pack-89';
import {PLATFORM} from './platform.js';
export function collisionClient(getReferences=()=>null){
 const address=new URL('./collision-worker.js?v=guide-drive-100',import.meta.url);address.searchParams.set('platform',PLATFORM.id);
 const worker=new Worker(address,{type:'module'}),sent=new Set(),sentReferences=new Set(),geometryBySku=new Map(),pending=new Map();let sequence=0;
 worker.onmessage=({data})=>{const entry=pending.get(data.id);if(!entry)return;pending.delete(data.id);data.error?entry.reject(Error(data.error)):entry.resolve(data.report);};
 worker.onerror=e=>{for(const entry of pending.values())entry.reject(Error(e.message||'Collision worker failed'));pending.clear();};
 function request(parts,objects,guideNames){
  const geometryData=[],groups=[],referenceData={};const references=getReferences();if(references)for(const p of parts)if(!sentReferences.has(p.sku)){referenceData[p.sku]=references[p.sku]||[];sentReferences.add(p.sku);}
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
    geometryData.push({id:g.uuid,position:g.attributes.position.array.slice(),index:g.index?.array.slice()});
   }
   const matrix=guideNames?obj.matrixWorld.clone().multiply(shape.relative):obj.matrixWorld;
   groups.push({id:p.id,meshes:[{geometry:g.uuid,matrix:matrix.toArray()}]});
  }
  const id=++sequence;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});worker.postMessage({id,parts:structuredClone(parts),groups,geometryData,referenceData,guideNames});});
 }
 return {check:request,auditGuide:(parts,objects,names)=>request(parts,objects,names)};
}
