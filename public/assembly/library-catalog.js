import {isChainLink} from './chain-builder.js';
import {GO_KIT_QUANTITIES,IQ_KIT_QUANTITIES} from './kit-presets.js';
import {kitCatalog,kitReport,kitAssemblyReport,legoPartKit} from './kit-policy.js';
import {LEGO_KITS} from './lego/kit-presets.js';
import {IQ_STANDARD_PREFERRED,IQ_MISSING_PARTS,IQ_IMPROVED_WHEELS} from './iq/library-reference.js';
import {IQ_POWER_PACK_BRAIN,IQ_POWER_PACK_BATTERY,IQ_POWER_PACK_NAME} from './iq-power-pack.js';
import {partSource} from './part-source.js';

export const LIBRARY_GROUPS=[
 ['beams','Thanh & tấm','Beams · Plates · Frames'],
 ['connectors','Khớp nối','Connectors'],
 ['pins','Chốt & trụ','Pins · Standoffs'],
 ['shafts','Trục','Shafts · Axles'],
 ['retainers','Vòng chặn & đệm','Collars · Spacers'],
 ['wheels','Bánh xe','Wheels · Tires · Hubs'],
 ['transmission','Truyền động','Gears · Pulleys · Chains'],
 ['electronics','Động cơ & điện tử','Motors · Sensors · Brains'],
 ['specialty','Phụ kiện khác','Specialty parts'],
];
export const LIBRARY_KITS=[
 {id:'269-6911',platform:'vexgo',name:'VEX GO · 269-6911'},
 {id:'228-7755',platform:'vexiq',name:'VEX IQ Gen 2 · 228-7755'},
 ...LEGO_KITS.map(k=>({...k,platform:'lego',name:`LEGO ${k.name} · ${k.id}`})),
];
const collator=new Intl.Collator('en',{numeric:true,sensitivity:'base'});
export const searchText=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
export function libraryGroup(part){
 const name=part.name||'';
 if(part.category==='electronics'||['motor','electronic'].includes(part.kind))return 'electronics';
 if(/shaft collar|spacer|washer|bushing|bush\b/i.test(name)||part.kind==='retainer')return 'retainers';
 if(/pin tool/i.test(name))return 'specialty';
 if(/connector|joiner/i.test(name)&&!/connector pin|standoff/i.test(name))return 'connectors';
 if(/shaft|axle/i.test(name)||part.kind==='shaft')return 'shafts';
 if(/\bmotor\b|sensor|\bbrain\b|battery|controller|smart cable|\bradio\b|\bled\b/i.test(name))return 'electronics';
 if(/connector pin|idler pin|standoff|\bpin\b/i.test(name)||part.kind==='pin')return 'pins';
 if(/wheel|tire|tyre|\bhub\b/i.test(name)||part.kind==='wheel')return 'wheels';
 if(/gear|sprocket|chain|pulley|belt|worm/i.test(name)||part.kind==='gear')return 'transmission';
 if(/connector|joiner/i.test(name))return 'connectors';
 if(/beam|plate|frame|panel|liftarm|brick|tile/i.test(name))return 'beams';
 return 'specialty';
}
function preferredRow(catalog,row,platform){const id=platform==='vexiq'?IQ_STANDARD_PREFERRED[row.name]:null;return (id?catalog.find(p=>p.id===id||p.sourceId===id):null)||catalog.find(p=>p.id===row.sku);}
function standardRows(catalog,platform){
 const stock=platform==='vexgo'?GO_KIT_QUANTITIES:IQ_KIT_QUANTITIES;
 const rows=kitCatalog(catalog,platform).filter(row=>row.sourcePlatform===platform&&(stock[row.name]||0)>0).map(row=>{
  return {...preferredRow(catalog,row,platform),kitQuantity:stock[row.name],standard:true};
 }).filter(p=>p.id);
 if(platform==='vexiq')for(const id of IQ_IMPROVED_WHEELS){const part=catalog.find(p=>p.id===id||p.sourceId===id);if(part&&!rows.some(p=>p.id===part.id))rows.push({...part,standard:true,improved:true});}
 return rows;
}
export function libraryView(catalog,platform,{scope,profile=null,query='',category=''}={}){
 scope||='kit:'+(platform==='vexiq'?'228-7755':platform==='vexgo'?'269-6911':profile?.kitId||'45544-1');
 let rows,missing=[];
 if(platform==='lego'){
  const id=scope.startsWith('kit:')?scope.slice(4):profile?.kitId||'45544-1';
  rows=scope==='all'?catalog:scope==='extras'?catalog.filter(p=>!p.sets?.[id]):catalog.filter(p=>p.sets?.[id]).map(p=>({...p,kitQuantity:p.sets[id],libraryKitId:id}));
 }else{
  const source=LIBRARY_KITS.find(k=>scope==='kit:'+k.id)?.platform||platform,subset=catalog.filter(p=>(p.sourcePlatform||platform)===source),standard=standardRows(subset,source),ids=new Set(standard.map(p=>p.id));
  rows=scope==='all'?catalog:scope==='extras'?catalog.filter(p=>!ids.has(p.id)):standard;
  if(source==='vexiq'&&scope==='kit:228-7755')missing=IQ_MISSING_PARTS.map(p=>({...p,id:'reference:'+p.name,missing:true,kitQuantity:p.quantity}));
 }
 if(scope==='project'){
  const byId=new Map(catalog.map(p=>[p.id,p])),stock=[...kitReport([],catalog,profile),...kitAssemblyReport([],catalog,profile)].filter(r=>(r.available||0)>0);
  rows=stock.map(r=>preferredRow(catalog.filter(p=>(p.sourcePlatform||platform)===(r.sourcePlatform||platform)),r,r.sourcePlatform||platform)||byId.get(r.sku)).filter(Boolean).map(p=>({...p,...(platform==='lego'?{libraryKitId:legoPartKit(p,profile)}:{})}));missing=[];
 }
 const iqPart=(part,id)=>{const source=partSource(platform,part.id);return source.platform==='vexiq'&&source.id===id;};
 const brain=rows.find(part=>iqPart(part,IQ_POWER_PACK_BRAIN));
 const battery=rows.find(part=>iqPart(part,IQ_POWER_PACK_BATTERY));
 const libraryRows=brain&&battery?rows.filter(part=>part!==battery).map(part=>part===brain?{
  ...part,name:IQ_POWER_PACK_NAME,powerPack:battery.id,searchNames:[brain.name,battery.name,battery.id]
 }:part):rows;
 const all=[...libraryRows,...missing],categories=LIBRARY_GROUPS.map(([id,title,subtitle])=>({id,title,subtitle,count:all.filter(p=>libraryGroup(p)===id).length})).filter(g=>g.count);
 const q=searchText(query).trim(),tokens=q.split(/\s+/).filter(Boolean);
 const filtered=all.filter(p=>{
  const group=libraryGroup(p),labels=LIBRARY_GROUPS.find(g=>g[0]===group)||[];
  const text=searchText([p.name,p.id,p.sku,...(p.searchNames||[]),...labels,isChainLink(platform,p.id)?'sợi xích mắt xích vòng xích tạo xích quấn nhông sprocket chain assembly chain builder':'',group==='pins'?'đinh chốt':group==='shafts'?'thanh sắt trục':''].join(' '));
  return (!category||category===group||category===p.category||category==='kind-'+p.kind)&&tokens.every(token=>text.includes(token));
 });
 const groups=LIBRARY_GROUPS.map(([id,title,subtitle])=>({id,title,subtitle,parts:filtered.filter(p=>libraryGroup(p)===id).sort((a,b)=>Number(isChainLink(platform,b.id))-Number(isChainLink(platform,a.id))||Number(!!a.missing)-Number(!!b.missing)||collator.compare(a.name,b.name)||collator.compare(a.id,b.id))})).filter(g=>g.parts.length);
 return {scope,groups,categories,total:all.length,shown:filtered.length,available:libraryRows.length,missing:missing.length,shownMissing:filtered.filter(p=>p.missing).length};
}
