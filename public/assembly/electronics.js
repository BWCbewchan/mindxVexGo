import {PLATFORM} from './platform.js';
export const BRAIN=PLATFORM.brain, BATTERY=PLATFORM.battery;
export const ELECTRONICS=new Set(PLATFORM.electronics);
export function missingElectronics(parts,sku){
 if(!ELECTRONICS.has(sku))return [];
 const present=new Set(parts.map(p=>p.sku));present.add(sku);
 return [BRAIN,BATTERY].filter(id=>!present.has(id));
}
export function withElectronics(parts,item,catalog,idFactory=()=>crypto.randomUUID(),include=()=>true){
 const missing=missingElectronics(parts,item.sku).filter(include);
 if(parts.length+1+missing.length>250)throw Error('Not enough room for the part, Brain and battery (maximum 250 parts).');
 return [item,...missing.map((sku,i)=>({id:idFactory(),sku,label:catalog.find(p=>p.id===sku)?.name||sku,kind:catalog.find(p=>p.id===sku)?.kind,position:[item.position[0]+(i+1)*100,item.position[1],item.position[2]],rotation:[0,0,0]}))];
}
