import {platformCatalogUrl} from './platform-registry.js';
import {partSource,sourceCatalog} from './part-source.js';

export async function readAssemblyCatalog(platform,fetcher=globalThis.fetch){
 const response=await fetcher(platformCatalogUrl(platform));
 if(!response.ok)throw Error('Chưa đọc được thư viện '+platform+'.');
 const rows=await response.json();
 if(!Array.isArray(rows))throw Error('Thư viện '+platform+' không hợp lệ.');
 return rows;
}

export async function projectCatalog(platform,project,fetcher=globalThis.fetch){
 if(project.kit?.additionalKits!==undefined&&!Array.isArray(project.kit.additionalKits))throw Error('Danh sách kit bổ sung không hợp lệ.');
 const sources=new Set((project.kit?.additionalKits||[]).map(k=>k.platform));
 for(const p of project.parts||[])sources.add(partSource(platform,p.sku||p.partId).platform);
 sources.delete(platform);
 for(const source of sources){
  if(!['vexgo','vexiq'].includes(source)||platform==='lego')throw Error('Không thể phối bộ VEX với LEGO.');
 }
 const order=[platform,...sources];
 const catalogs=await Promise.all(order.map(source=>readAssemblyCatalog(source,fetcher)));
 return catalogs.flatMap((rows,index)=>sourceCatalog(rows,order[index],platform));
}
