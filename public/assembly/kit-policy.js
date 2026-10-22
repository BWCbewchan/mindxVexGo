import {GO_KIT_QUANTITIES,IQ_KIT_QUANTITIES,IQ_STOCK_ALIASES} from './kit-presets.js';

export function kitCatalog(catalog,platform){
 const rows=new Map(),byId=new Map(catalog.map(part=>[part.id,part]));
 for(const part of catalog){
  const canonical=platform==='vexiq'?byId.get(IQ_STOCK_ALIASES[part.id])||part:part,key=canonical.name;
  if(!rows.has(key))rows.set(key,{sku:canonical.id,skus:[],name:canonical.name,category:canonical.kind||canonical.category||'other'});
  rows.get(key).skus.push(part.id);
 }
 return [...rows.values()];
}
export function defaultKitProfile(catalog,platform){
 const quantities=platform==='vexgo'?GO_KIT_QUANTITIES:IQ_KIT_QUANTITIES;
 return {version:1,platform,name:platform==='vexgo'?'VEX GO · 269-6911':'VEX IQ (2nd gen) · 228-7755',count:1,enforce:true,items:Object.fromEntries(kitCatalog(catalog,platform).map(row=>[row.sku,quantities[row.name]??0]))};
}
export function kitCoverage(catalog,platform){const names=new Set(kitCatalog(catalog,platform).map(row=>row.name));return Object.entries(platform==='vexgo'?GO_KIT_QUANTITIES:IQ_KIT_QUANTITIES).filter(([name])=>!names.has(name)).map(([name,quantity])=>({name,quantity}));}
export function validateKitProfile(value,catalog,platform){
 if(!value||value.version!==1||!['vexgo','vexiq'].includes(platform)||value.platform!==platform)throw Error('Bộ kit không thuộc thư viện VEX của dự án này.');
 if(typeof value.name!=='string'||!value.name.trim()||value.name.length>120)throw Error('Tên bộ kit cần có từ 1 đến 120 ký tự.');
 if(!Number.isInteger(value.count)||value.count<1||value.count>100)throw Error('Số bộ kit phải là số nguyên từ 1 đến 100.');
 if(typeof value.enforce!=='boolean'||!value.items||typeof value.items!=='object'||Array.isArray(value.items))throw Error('Cấu hình giới hạn bộ kit không hợp lệ.');
 const rows=kitCatalog(catalog,platform),bySku=new Map(rows.flatMap(row=>row.skus.map(sku=>[sku,row.sku]))),items={};
 for(const [sku,quantity] of Object.entries(value.items)){
  if(!bySku.has(sku))throw Error(`Mã ${sku} không thuộc thư viện ${platform.toUpperCase()}.`);
  if(!Number.isInteger(quantity)||quantity<0||quantity>10000)throw Error(`Số lượng ${sku} phải là số nguyên từ 0 đến 10000.`);
  const key=bySku.get(sku);
  if(Object.hasOwn(items,key)&&items[key]!==quantity)throw Error(`Các biến thể CAD của ${sku} phải dùng chung một số lượng.`);
  items[key]=quantity;
 }
 for(const row of rows)if(!Object.hasOwn(items,row.sku))items[row.sku]=0;
 return {version:1,platform,name:value.name.trim(),count:value.count,enforce:value.enforce,items};
}
export function parseKitFile(text,filename,catalog,platform){
 text=text.replace(/^\uFEFF/,'').trim();
 if(text.length>1e6)throw Error('File bộ kit phải nhỏ hơn 1 MB.');
 if(filename.toLowerCase().endsWith('.json'))return validateKitProfile(JSON.parse(text),catalog,platform);
 if(!filename.toLowerCase().endsWith('.csv'))throw Error('Chọn file danh mục .json hoặc .csv.');
 const lines=text.split(/\r?\n/).filter(line=>line.trim()),separator=lines[0]?.includes(';')?';':',';
 const fields=line=>line.split(separator).map(value=>value.trim().replace(/^"(.*)"$/,'$1'));
 const header=fields(lines.shift()||'').map(value=>value.toLowerCase());
 if(!header.includes('sku')||!header.includes('quantity'))throw Error('CSV cần hai cột sku,quantity (số lượng trong 1 bộ).');
 const items={};
 for(const line of lines){const cells=fields(line),sku=cells[header.indexOf('sku')],quantity=cells[header.indexOf('quantity')];if(!sku||!/^\d+$/.test(quantity||''))throw Error('Mỗi dòng CSV cần mã SKU và số nguyên không âm.');if(Object.hasOwn(items,sku))throw Error(`Mã ${sku} bị lặp trong file.`);items[sku]=Number(quantity);}
 if(!lines.length)throw Error('File bộ kit chưa có linh kiện.');
 return validateKitProfile({version:1,platform,name:filename.replace(/\.csv$/i,'').slice(0,120),count:1,enforce:true,items},catalog,platform);
}
export function kitReport(parts,catalog,profile){
 const platform=profile?.platform||'vexgo',counts=new Map();
 for(const part of parts)counts.set(part.sku,(counts.get(part.sku)||0)+1);
 const integrated=platform==='vexgo'?(counts.get('228-2500-1383')||0):0;
 if(integrated)counts.set('228-2500-207',(counts.get('228-2500-207')||0)+integrated);
 return kitCatalog(catalog,platform).map(row=>{
  const used=row.skus.reduce((sum,sku)=>sum+(counts.get(sku)||0),0),available=profile?(profile.items[row.sku]??0)*profile.count:null;
  return {...row,used,available,remaining:available===null?null:available-used,integrated:row.skus.includes('228-2500-207')?integrated:0};
 });
}
export function assertKitChange(before,after,catalog,profile){
 if(!profile?.enforce)return;
 const previous=new Map(kitReport(before,catalog,profile).map(row=>[row.sku,row.used]));
 const excess=kitReport(after,catalog,profile).filter(row=>row.remaining<0&&row.used>(previous.get(row.sku)||0));
 if(excess.length)throw Error('Vượt giới hạn bộ kit: '+excess.map(row=>`${row.name} · cần ${row.used}, có ${row.available} (thiếu ${-row.remaining})`).join('; ')+'. Mở File → Cài đặt bộ kit để điều chỉnh.');
}
