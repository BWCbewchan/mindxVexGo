import {PLATFORM,PLATFORM_SPECS} from './platform.js';
import {partSource,sourcePartId} from './part-source.js';
export const BRAIN=PLATFORM.brain, BATTERY=PLATFORM.battery;
export const ELECTRONICS=new Set(PLATFORM.electronics);
// Shared motors/switches work with either generation; preserve legacy projects.
export function electronicsCompanions(parts,sku,platform=PLATFORM){
 if(platform.id!=='vexiq')return [platform.brain,platform.battery];
 const gen1=['228-2540','228-2604','228-3011','228-3012','228-3014'];
 const gen2=['228-6480','228-7045','228-7082','228-7106'];
 const legacy=gen1.includes(sku)||(!gen2.includes(sku)&&parts.some(p=>p.sku==='228-2540')&&!parts.some(p=>p.sku==='228-6480'));
 return legacy?['228-2540','228-2604']:['228-6480','228-7045'];
}
export function isElectronicSku(sku,base=PLATFORM.id){const source=partSource(base,sku);return PLATFORM_SPECS[source.platform].electronics.includes(source.id);}
export function missingElectronics(parts,sku){
 const source=partSource(PLATFORM.id,sku),platform=PLATFORM_SPECS[source.platform];
 if(!platform.electronics.includes(source.id))return [];
 const local=parts.filter(p=>partSource(PLATFORM.id,p.sku).platform===source.platform).map(p=>({...p,sku:partSource(PLATFORM.id,p.sku).id}));
 const present=new Set(local.map(p=>p.sku));present.add(source.id);
 return electronicsCompanions(local,source.id,platform).filter(id=>!present.has(id)).map(id=>sourcePartId(id,source.platform,PLATFORM.id));
}
export function withElectronics(parts,item,catalog,idFactory=()=>crypto.randomUUID(),include=()=>true){
 const missing=missingElectronics(parts,item.sku).filter(include);
 if(parts.length+1+missing.length>250)throw Error('Not enough room for the part, Brain and battery (maximum 250 parts).');
 return [item,...missing.map((sku,i)=>({id:idFactory(),sku,label:catalog.find(p=>p.id===sku)?.name||sku,kind:catalog.find(p=>p.id===sku)?.kind,position:[item.position[0]+(i+1)*100,item.position[1],item.position[2]],rotation:[0,0,0]}))];
}
