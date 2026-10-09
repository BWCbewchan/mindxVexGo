export const BRAIN='269-6685-000', BATTERY='269-6686-000';
export const ELECTRONICS=new Set([BRAIN,BATTERY,'269-6687-000','269-6690-000','269-6695-000','269-6696-000','269-6702-000']);
export function missingElectronics(parts,sku){
 if(!ELECTRONICS.has(sku))return [];
 const present=new Set(parts.map(p=>p.sku));present.add(sku);
 return [BRAIN,BATTERY].filter(id=>!present.has(id));
}
export function withElectronics(parts,item,catalog,idFactory=()=>crypto.randomUUID()){
 const missing=missingElectronics(parts,item.sku);
 if(parts.length+1+missing.length>250)throw Error('Not enough room for the part, Brain and battery (maximum 250 parts).');
 return [item,...missing.map((sku,i)=>({id:idFactory(),sku,label:catalog.find(p=>p.id===sku)?.name||sku,position:[item.position[0]+(i+1)*100,item.position[1],item.position[2]],rotation:[0,0,0]}))];
}
