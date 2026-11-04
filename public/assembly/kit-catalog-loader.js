import {platformAssetRoot} from './platform-registry.js';
import {partSource,sourceCatalog,sourcePartId} from './part-source.js';

export function createKitCatalogLoader({platform,catalog,references,fetcher=globalThis.fetch}){
 const loaded=new Set([platform]),pending=new Map();
 async function load(source){
  if(loaded.has(source))return;
  if(!['vexgo','vexiq'].includes(source)||platform==='lego')throw Error('Không thể phối bộ VEX với LEGO.');
  if(!pending.has(source))pending.set(source,(async()=>{
   const root=platformAssetRoot(source),responses=await Promise.all([fetcher(root+'parts.json',{cache:'no-store'}),fetcher(root+'connectors.json',{cache:'no-store'})]);
   if(responses.some(r=>!r.ok))throw Error('Không tải được thư viện '+source.toUpperCase()+'. Thử lại trước khi áp dụng.');
   const [parts,refs]=await Promise.all(responses.map(r=>r.json()));
   const existing=new Set(catalog.map(p=>p.id));
   catalog.push(...sourceCatalog(parts,source,platform).filter(p=>!existing.has(p.id)));
   for(const [id,rows] of Object.entries(refs.parts))references[sourcePartId(id,source,platform)]=rows.map(r=>({...r,...(r.excludedPartSkus?{excludedPartSkus:r.excludedPartSkus.map(sku=>sourcePartId(sku,source,platform))}:{})}));
   loaded.add(source);
  })().finally(()=>pending.delete(source)));
  await pending.get(source);
 }
 return {async ensure(profile,parts=[]){
  if(profile?.additionalKits!==undefined&&!Array.isArray(profile.additionalKits))throw Error('Danh sách kit bổ sung không hợp lệ.');
  const sources=new Set((profile?.additionalKits||[]).map(k=>k.platform));
  for(const p of parts)sources.add(partSource(platform,p.sku||p.partId).platform);
  await Promise.all([...sources].filter(s=>s!==platform).map(load));
 },load};
}
