import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {defaultKitProfile,validateKitProfile,kitCoverage} from '../public/assembly/kit-policy.js';
import {electronicsCompanions} from '../public/assembly/electronics.js';
import {applyIQAppearance} from '../public/assembly/iq/color-profile.js';

const root='public/assembly/iq',read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const catalog=await read(root+'/parts.json'),refs=await read(root+'/connectors.json');
const before=JSON.parse(execFileSync('git',['show','HEAD:'+root+'/parts.json'],{encoding:'utf8'}));
const byId=new Map(catalog.map(p=>[p.id,p]));
for(const row of before)assert.deepEqual(byId.get(row.id),row,'Existing CAD unchanged: '+row.id);
const stock=defaultKitProfile(catalog,'vexiq'),ids=['228-6480','228-7045','228-7082','228-7106'];
const loader=new GLTFLoader();
for(const [index,id] of ids.entries()){
 const row=byId.get(id),meta=await read(`${root}/parts/${id}/cad.json`),bytes=await fs.readFile(`${root}/parts/${id}/model.glb`);
 assert.equal(stock.items[id],1);assert.ok(!kitCoverage(catalog,'vexiq').some(r=>r.name===row.name));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),meta.validation.glbSha256);
 assert.equal(meta.source,meta.sourceUrl);assert.match(meta.source,/^https:\/\/www.vexrobotics.com\/cadmodels\//);
 assert.equal(refs.parts[id].length,[16,0,5,5][index]);
 for(const ref of refs.parts[id]){assert.equal(ref.kind,'hole');assert.equal(ref.radius,2.1);assert.ok(Math.abs(Math.hypot(...ref.normal)-1)<1e-5);}
 const scene=(await loader.parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'')).scene;
 const colors=[];scene.traverse(m=>{if(m.isMesh)colors.push(m.material.color.getHexString());});
 applyIQAppearance(scene,row);const after=[];scene.traverse(m=>{if(m.isMesh)after.push(m.material.color.getHexString());});assert.deepEqual(after,colors);
 const box=new THREE.Box3().setFromObject(scene);
 for(const [axis,key] of ['x','y','z'].entries())for(const side of ['min','max'])assert.ok(Math.abs(box[side][key]*1000-row.bounds[side][axis])<.2,'GLB mm scale matches exact CAD bounds');
 assert.ok((await fs.stat(`${root}/parts/${id}/preview.png`)).size>5000);
}
const older={...stock,items:{...stock.items}};for(const id of ids)delete older.items[id];
const migrated=validateKitProfile(older,catalog,'vexiq');for(const id of ids)assert.equal(migrated.items[id],1);
const explicit={...stock,items:{...stock.items,'228-6480':0}};assert.equal(validateKitProfile(explicit,catalog,'vexiq').items['228-6480'],0);
const iq={id:'vexiq'},old=['228-2540','228-2604'],modern=['228-6480','228-7045'];
assert.deepEqual(electronicsCompanions([],'228-2560',iq),modern);
for(const id of ids)assert.deepEqual(electronicsCompanions([{sku:'228-2540'}],id,iq),modern);
assert.deepEqual(electronicsCompanions([{sku:'228-2540'}],'228-2560',iq),old);
assert.deepEqual(electronicsCompanions([],'228-3012',iq),old);
assert.deepEqual(electronicsCompanions([{sku:'228-2540'},{sku:'228-6480'}],'228-2560',iq),modern);
assert.deepEqual(electronicsCompanions([],'motor',{id:'vexgo',brain:'brain',battery:'battery'}),['brain','battery']);
console.log('PASS: 4 original Gen2 CAD, units/materials/provenance, exterior mounting bores, old catalog preservation, kit stock migration and generation-aware companions.');
