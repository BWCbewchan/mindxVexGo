export const inventoryCategory=part=>{
 const name=part.name||'';
 if(part.category==='electronics'||part.id.startsWith('269-'))return 'Thiết bị điện tử';
 if(/Shaft Collar|Spacer/i.test(name))return 'Vòng chặn & vòng đệm';
 if(/Shaft/i.test(name))return 'Trục · Shafts';
 if(/Pin|Standoff/i.test(name)&&!/Tool/i.test(name))return 'Chốt & trụ · Pins';
 if(/Wheel|Gear|Pulley/i.test(name))return 'Bánh xe & bánh răng';
 if(/Connector/i.test(name))return 'Khớp nối · Connectors';
 if(/Beam|Plate/i.test(name))return 'Thanh & tấm kết cấu';
 return 'Phụ kiện khác';
};
const order=['Thiết bị điện tử','Trục · Shafts','Chốt & trụ · Pins','Bánh xe & bánh răng','Vòng chặn & vòng đệm','Khớp nối · Connectors','Thanh & tấm kết cấu','Phụ kiện khác'];
export function inventoryPages(counts,catalog){
 const groups=new Map();
 for(const [sku,count] of counts){const part=catalog.find(p=>p.id===sku)||{id:sku,name:sku};const key=inventoryCategory(part);if(!groups.has(key))groups.set(key,[]);groups.get(key).push({...part,count});}
 const page=[];
 for(const title of order){const items=(groups.get(title)||[]).sort((a,b)=>a.name.localeCompare(b.name));if(items.length)page.push({title,items,continued:false});}
 return page.length?[page]:[];
}
