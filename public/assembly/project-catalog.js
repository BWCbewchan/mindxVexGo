import {platformCatalogUrl} from './platform-registry.js';
import {partSource,sourceCatalog} from './part-source.js';

export async function projectCatalog(platform,project,fetcher=globalThis.fetch){
 const read=async source=>{const response=await fetcher(platformCatalogUrl(source),{cache:'no-store'});if(!response.ok)throw Error('Chưa đọc được thư viện '+source+'.');return response.json();};
 if(project.kit?.additionalKits!==undefined&&!Array.isArray(project.kit.additionalKits))throw Error('Danh sách kit bổ sung không hợp lệ.');
 const catalog=await read(platform),sources=new Set((project.kit?.additionalKits||[]).map(k=>k.platform));
 for(const p of project.parts||[])sources.add(partSource(platform,p.sku||p.partId).platform);
 for(const source of sources){
  if(source===platform)continue;
  if(!['vexgo','vexiq'].includes(source)||platform==='lego')throw Error('Không thể phối bộ VEX với LEGO.');
  catalog.push(...sourceCatalog(await read(source),source,platform));
 }
 return catalog;
}
