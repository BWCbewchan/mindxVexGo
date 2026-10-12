import {inventoryCategory} from './guide-inventory.js';
import {PLATFORM_ID} from './platform.js';
export const KIT_SOURCE='https://www.vexrobotics.com/parts/269-6911';
// Verified names and quantities from VEX GO kit contents, 2026-10-12.
// Unmapped CAD variants remain unknown rather than borrowing another part's quota.
const quantities={'Red Pin':53,'Green Pin':7,'Pink Pin':5,'Gray Pin':2,'Yellow Standoff':7,'Blue Standoff':8,'Orange Standoff':5,'Red Shaft':4,'Green Shaft':4,'Capped Shaft':2,'Plain Shaft':2,'Red Gear':6,'Green Gear':3,'Blue Gear':5,'Pink Gear':2,'Green Pulley':3,'Orange Pulley':2,'Red Beam':5,'Green Beam':9,'Yellow Beam':5,'Blue Beam':2,'Orange Beam':6,'Pink Beam':2,'Dark Gray Beam':2,'White Beam':2,'Black Beam':2,'Gray Beam':2,'Red Angle Beam':2,'Green Angle Beam':3,'Yellow Angle Beam':4,'Orange Angle Beam':2,'Red Connector':9,'Green Connector':4,'Yellow Connector':8,'Blue Connector':5,'Orange Connector':3,'Red Disk':1,'Blue Disk':1,'Green Disk':1,'Gray Wheel':2,'Blue Wheel':2,'Tire':2,'Red Large Beam':6,'Green Large Beam':4,'Yellow Large Beam':3,'Blue Large Beam':2,'Orange Large Beam':3,'Dark Gray Large Beam':2,'White Large Beam':3,'Black Large Beam':3,'Gray Large Beam':2,'White Plate':2,'Black Plate':2,'Large White Plate':2,'Gray Plate':2,'Dark Gray Plate':3,'Spacer':8,'Shaft Collar':6,'Motor':3,'Brain':1,'Battery':1,'Switch':1,'Eye Sensor':1,'LED Bumper':1,'Electromagnet':1,'Pin Tool':1};
export function kitInventory(parts,catalog){
 const counts=new Map();for(const p of parts)counts.set(p.sku,(counts.get(p.sku)||0)+1);
 // Gray Wheel GLB already includes its tire; the real tire is a separate kit piece.
 const integrated=PLATFORM_ID==='vexgo'?(counts.get('228-2500-1383')||0):0;if(integrated)counts.set('228-2500-207',(counts.get('228-2500-207')||0)+integrated);
 return [...counts].map(([sku,used])=>{const p=catalog.find(p=>p.id===sku)||{id:sku,name:sku},available=PLATFORM_ID==='vexgo'?(quantities[p.name]??null):null;return {sku,name:p.name,category:inventoryCategory(p),used,available,remaining:available===null?null:available-used,integrated:sku==='228-2500-207'?integrated:0};}).sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
}
