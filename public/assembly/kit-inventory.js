import {inventoryCategory} from './guide-inventory.js';
import {PLATFORM_ID} from './platform.js';
import {kitReport} from './kit-policy.js';
export const KIT_SOURCE='https://www.vexrobotics.com/parts/269-6911';
// Official VEX GO reference; the shared preset was checked on 2026-10-22.
// Unmapped CAD variants remain unknown rather than borrowing another part's quota.
import {GO_KIT_QUANTITIES as quantities} from './kit-presets.js';
export function kitInventory(parts,catalog,profile){
 if(profile!==undefined)return kitReport(parts,catalog,profile||{platform:PLATFORM_ID,count:1,items:{}}).filter(row=>row.used>0).map(row=>({...row,category:inventoryCategory(catalog.find(part=>part.id===row.sku)||{}),...(!profile?{available:null,remaining:null}:{})}));
 const counts=new Map();for(const p of parts)counts.set(p.sku,(counts.get(p.sku)||0)+1);
 // Gray Wheel GLB already includes its tire; the real tire is a separate kit piece.
 const integrated=PLATFORM_ID==='vexgo'?(counts.get('228-2500-1383')||0):0;if(integrated)counts.set('228-2500-207',(counts.get('228-2500-207')||0)+integrated);
 return [...counts].map(([sku,used])=>{const p=catalog.find(p=>p.id===sku)||{id:sku,name:sku},available=PLATFORM_ID==='vexgo'?(quantities[p.name]??null):null;return {sku,name:p.name,category:inventoryCategory(p),used,available,remaining:available===null?null:available-used,integrated:sku==='228-2500-207'?integrated:0};}).sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
}
