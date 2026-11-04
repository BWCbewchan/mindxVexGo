import {platformAssetRoot} from './platform-registry.js';

// Saved local IDs remain unchanged. Only foreign VEX parts need a namespace.
export function partSource(platform,id){
 const match=/^(vexgo|vexiq)__(.+)$/.exec(id||'');
 return match?{platform:match[1],id:match[2]}:{platform,id};
}
export const sourcePartId=(id,source,base)=>source===base?id:source+'__'+id;
export const partModelUrl=(platform,id)=>{const source=partSource(platform,id);return platformAssetRoot(source.platform)+'parts/'+encodeURIComponent(source.id)+'/model.glb';};
export function sourceCatalog(entries,source,base){
 if(source===base)return entries;
 return entries.map(p=>({...p,id:sourcePartId(p.id,source,base),sku:sourcePartId(p.id,source,base),sourceId:p.id,sourceSku:p.sku||p.id,sourcePlatform:source,...(p.components?{components:p.components.map(c=>({...c,sku:sourcePartId(c.sku,source,base)}))}:{})}));
}
