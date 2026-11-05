import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {libraryView,libraryGroup,LIBRARY_KITS} from '../public/assembly/library-catalog.js';
import {defaultKitProfile,kitReport,kitAssemblyReport,assertKitChange} from '../public/assembly/kit-policy.js';
import {IQ_STANDARD_PREFERRED,IQ_MISSING_PARTS,IQ_IMPROVED_WHEELS} from '../public/assembly/iq/library-reference.js';
const load=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const iq=await load('public/assembly/iq/parts.json'),go=await load('public/assembly/parts.json'),lego=await load('public/assembly/lego/parts.json');
const all=view=>view.groups.flatMap(g=>g.parts),standard=libraryView(iq,'vexiq'),rows=all(standard),ids=new Set(rows.map(p=>p.id));
assert.equal(standard.available,Object.keys(IQ_STANDARD_PREFERRED).length+IQ_IMPROVED_WHEELS.filter(id=>!Object.values(IQ_STANDARD_PREFERRED).includes(id)).length-1);
assert.equal(standard.missing,IQ_MISSING_PARTS.length);
for(const sku of ['228-6470','228-6960-001','228-2780-001','228-2780-002','228-2780-003','228-2780-004']){
 const found=all(libraryView(iq,'vexiq',{query:sku}));assert.equal(found.length,0,'Removed reference card stays out of the library: '+sku);
}
for(const id of Object.values(IQ_STANDARD_PREFERRED).filter(id=>id!=='228-7045'))assert.ok(ids.has(id),'Official canonical SKU present: '+id);
for(const id of ['228-2536','iq-200mm-travel-wheel'])assert.ok(ids.has(id),'Improved wheels preserved');
for(const id of ['228-2540','228-2604','228-2530','228-3011','228-3012','228-2500-2260'])assert.ok(!ids.has(id),'Legacy/alias not presented as standard kit: '+id);
const pack=all(libraryView(iq,'vexiq',{query:'228-7045'}));
assert.equal(pack.length,1);
assert.equal(pack[0].id,'228-6480');
assert.equal(pack[0].powerPack,'228-7045');
const extras=new Set(all(libraryView(iq,'vexiq',{scope:'extras'})).map(p=>p.id));assert.ok(extras.has('228-2540'));assert.ok(extras.has('228-2500-2260'));
assert.equal(all(libraryView(iq,'vexiq',{scope:'all'})).length,iq.length-1,'A single card represents the Brain and Battery in All CAD');
assert.equal(libraryGroup(iq.find(p=>p.id==='228-2500-060')),'pins');for(const p of iq.filter(p=>p.kind==='shaft'))assert.equal(libraryGroup(p),'shafts',p.name);assert.equal(libraryGroup(iq.find(p=>p.id==='228-2500-114')),'retainers');
assert.ok(all(libraryView(iq,'vexiq',{query:'đinh'})).every(p=>libraryGroup(p)==='pins'));
assert.ok(all(libraryView(iq,'vexiq',{query:'Smart Motor'})).some(p=>p.id==='228-2560'));
assert.equal(all(libraryView(iq,'vexiq',{query:'khong-co-xyz'})).length,0);
const profile=defaultKitProfile(iq,'vexiq');assert.equal(profile.items['228-2500-158'],11,'Cable Anchor quota corrected');
assert.equal(libraryView(iq,'vexiq',{scope:'project',profile}).available,Object.keys(IQ_STANDARD_PREFERRED).length+IQ_IMPROVED_WHEELS.filter(id=>!Object.values(IQ_STANDARD_PREFERRED).includes(id)).length-1,'Project kit also avoids duplicate CAD variants');
const wheel=kitAssemblyReport([],iq,profile).find(p=>p.sku==='iq-200mm-travel-wheel');assert.equal(wheel.available,2,'Integrated wheel shares official stock');
const used=kitReport([{sku:'iq-200mm-travel-wheel'}],iq,profile);assert.equal(used.find(r=>r.skus.includes('228-2500-1208')).used,1);assert.equal(used.find(r=>r.skus.includes('228-2500-209')).used,1);
assert.throws(()=>assertKitChange([],Array.from({length:5},()=>({sku:'228-2560'})),iq,profile),/Vượt giới hạn/);
assert.equal(libraryGroup({name:'Technic Pin Connector Angled',kind:'body',category:'mechanical'}),'connectors');assert.equal(libraryGroup({name:'Technic Axle Connector',kind:'body',category:'mechanical'}),'connectors');assert.equal(libraryGroup({name:'Ball, Hard Plastic',kind:'body',category:'mechanical'}),'specialty');assert.equal(LIBRARY_KITS.length,9);for(const kit of LIBRARY_KITS.filter(k=>k.platform==='lego')){const parts=all(libraryView(lego,'lego',{scope:'kit:'+kit.id}));assert.equal(parts.length,lego.filter(p=>p.sets?.[kit.id]).length);assert.ok(parts.every(p=>p.libraryKitId===kit.id));}
assert.ok(libraryView(go,'vexgo').available>0);assert.ok(libraryView(go,'vexgo').available<=go.length);
for(const p of IQ_MISSING_PARTS)await fs.access('public'+p.image);
console.log(`PASS: ${standard.available} standard IQ CAD (including integrated wheel), ${standard.missing} missing references; legacy/aliases separate; all CAD and 9 kits accessible; search, groups and wheel quotas correct.`);
