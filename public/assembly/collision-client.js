import {collisionMesh} from './collision.js';
export function collisionClient(){
 const worker=new Worker(new URL('./collision-worker.js',import.meta.url),{type:'module'}),sent=new Set(),geometryBySku=new Map(),pending=new Map();let sequence=0;
 worker.onmessage=({data})=>{const entry=pending.get(data.id);if(!entry)return;pending.delete(data.id);data.error?entry.reject(Error(data.error)):entry.resolve(data.report);};
 worker.onerror=e=>{for(const entry of pending.values())entry.reject(Error(e.message||'Collision worker failed'));pending.clear();};
 return {check(parts,objects){
  const geometryData=[],groups=[];
  for(const p of parts){const obj=objects.get(p.id);if(!obj)continue;obj.updateMatrixWorld(true);if(!geometryBySku.has(p.sku))geometryBySku.set(p.sku,collisionMesh(obj).geometry);const g=geometryBySku.get(p.sku);if(!sent.has(g.uuid)){sent.add(g.uuid);geometryData.push({id:g.uuid,position:g.attributes.position.array.slice(),index:g.index?.array.slice()});}groups.push({id:p.id,meshes:[{geometry:g.uuid,matrix:obj.matrixWorld.toArray()}]});}
  const id=++sequence;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});worker.postMessage({id,parts:structuredClone(parts),groups,geometryData});});
 }};
}
