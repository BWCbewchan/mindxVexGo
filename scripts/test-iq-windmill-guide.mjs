import assert from 'node:assert/strict';import fs from 'node:fs/promises';import * as THREE from 'three';import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
globalThis.location={href:'http://localhost/assembly/iq/editor.html'};
// User file "Cối xoay gió": chain drive, braced diagonals, weak standoffs,
// a sprocket saved off its square shaft and two spare pins in the workspace.
const source=JSON.parse(await fs.readFile('scripts/fixtures/iq-windmill-chain.json','utf8'));
const refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts;
const {normalizeMatedJoints,matingPose,keyedRollError}=await import('../public/assembly/mating.js');
const {generateStudentGuide}=await import('../public/assembly/guide-sequence.js');
const {seatedConnections,jointMetrics}=await import('../public/assembly/assembly-review.js');
const {analyzeIQInsertionPaths}=await import('../public/assembly/iq-insertion-paths.js');
const {editGuide}=await import('../public/assembly/guide-editing.js');
const id=prefix=>source.parts.find(p=>p.id.startsWith(prefix)).id;

// 1. Spare parts block the guide and are named, not described generically.
const loose=generateStudentGuide(source.parts,{references:refs,inferConnections:true});
assert.equal(loose.ready,false);
assert.match(loose.blockers.join(' '),/separate mechanical assemblies.*1x2 Connector Pin.*2x2 Connector Pin|separate mechanical assemblies.*2x2 Connector Pin.*1x2 Connector Pin/);
assert.deepEqual(loose.detached.flat().sort(),[id('08f9'),id('9f17')].sort());

// 2. A keyed hub mated through a round face snaps to the square flats, both
// for new joints and for files saved with a free angle.
const parts=structuredClone(source.parts.filter(p=>![id('08f9'),id('9f17')].includes(p.id)));
const byId=new Map(parts.map(p=>[p.id,p])),sprocket=byId.get(id('238d')),shaft=byId.get(id('4cac'));
const hole=refs[sprocket.sku].find(r=>r.id===sprocket.mate.sourceRef),tip=refs[shaft.sku].find(r=>r.id===sprocket.mate.targetRef);
assert.ok(keyedRollError(sprocket,hole,shaft,tip,refs)>20,'Fixture keeps the authored 29 degree error');
for(const twist of [0,15,345,100]){const pose=matingPose(sprocket,hole,shaft,tip,{depth:sprocket.mate.depth,twist,references:refs});assert.ok(keyedRollError({...sprocket,...pose},hole,shaft,tip,refs)<.01,`twist ${twist} stays on the flats`);}
const position=[...sprocket.position];normalizeMatedJoints(parts,refs);
assert.ok(keyedRollError(sprocket,hole,shaft,tip,refs)<.01,'Loading repairs only the impossible roll');
assert.ok(sprocket.position.every((v,i)=>Math.abs(v-position[i])<.01),'The hub stays at its depth on the shaft');

// 3. CAD sweep: long weak-standoff pegs and base-side peg rows do not block
// their own socket; hubs may slide on from either shaft end.
const loader=new GLTFLoader(),cache=new Map(),objects=new Map();
for(const p of parts){if(!cache.has(p.sku)){const raw=await fs.readFile(`public/assembly/iq/parts/${p.sku}/model.glb`);cache.set(p.sku,(await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'')).scene);}const obj=cache.get(p.sku).clone(true);obj.position.fromArray(p.position.map(v=>v/1000));obj.rotation.set(...p.rotation.map(THREE.MathUtils.degToRad));obj.updateMatrixWorld(true);objects.set(p.id,obj);}
const links=new Map(parts.map(p=>[p.id,[]])),seen=new Set(),contacts=seatedConnections(parts,refs);
for(const p of parts){const t=byId.get(p.mate?.target),a=refs[p.sku]?.find(r=>r.id===p.mate?.sourceRef),b=refs[t?.sku]?.find(r=>r.id===p.mate?.targetRef);if(t&&a&&b){const m=jointMetrics(p,t,a,b);if(m.valid)contacts.push({part:p.id,target:t.id,sourceRef:a.id,targetRef:b.id,depth:m.depth,gap:m.gap});}}
for(const c of contacts){const key=[c.part+':'+c.sourceRef,c.target+':'+c.targetRef].sort().join('|');if(seen.has(key))continue;seen.add(key);links.get(c.part).push(c);links.get(c.target).push({...c,part:c.target,target:c.part,sourceRef:c.targetRef,targetRef:c.sourceRef});}
const paths=analyzeIQInsertionPaths(parts,refs,links,objects);
const selfBlocked=(partId,targetId)=>(paths.get(partId)||[]).filter(r=>r.contacts.some(c=>c.target===targetId)).every(r=>r.blockedBy.includes(targetId));
assert.equal(selfBlocked(id('a224'),id('5b83')),false,'Weak standoff leaves its beam');
assert.equal(selfBlocked(id('0122'),id('32a7')),false,'Standoff extender withdraws away from its plate');
assert.equal(selfBlocked(id('238d'),id('4cac')),false,'Aligned sprocket slides along its square shaft');
assert.equal(paths.get(id('238d')).filter(r=>r.contacts.some(c=>c.target===id('4cac'))).length,2,'Both shaft ends are considered');

// 4. A complete, honest guide: best-effort order with named conflicts, the
// chain after both sprockets and the unmounted battery last.
const guide=generateStudentGuide(parts,{references:refs,inferConnections:true,insertionPaths:paths,nameFor:p=>p.label});
assert.equal(guide.ready,true,JSON.stringify(guide.blockers));
assert.equal(guide.reviewRequired,true,'Not exported as a verified sequence');
assert.equal(guide.steps.at(-1).parts.length,parts.length);
const conflicts=guide.steps.filter(s=>s.pathConflict);
assert.ok(conflicts.length<=10,`Only a few flagged insertions (${conflicts.length})`);
const at=pid=>guide.steps.findIndex(s=>s.added.some(p=>p.id===pid)),chain=guide.steps.findIndex(s=>s.type==='chain-drive');
assert.ok(chain>at(id('238d'))&&chain>at(id('d6c5')),'Chain is wrapped after both sprockets');
assert.ok(at(id('4cac'))<at(id('dd68')),'Motor shaft before the motor');
const edited=editGuide(guide,{},paths,refs);
assert.equal(edited.steps.at(-1).added[0].id,id('69e0'),'Loose battery check stays at the end after reordering');
assert.equal(new Set(edited.steps.flatMap(s=>s.added.map(p=>p.id))).size,parts.length,'Every part appears exactly once');
// VEX IQ manual style: pins travel with their part, shaft stacks and twin
// connectors share a step; grouped steps stay valid after reordering.
const grouped=guide.steps.filter(s=>s.grouped);
assert.ok(guide.steps.length<=60&&grouped.length>=8,`Grouped steps (${grouped.length}) shorten the guide to ${guide.steps.length}`);
assert.ok(grouped.some(s=>/bằng 2 chốt/.test(s.title)&&s.added.some(p=>p.id===id('aa3c'))),'Touch LED goes on together with its two pins');
assert.equal(edited.steps.filter(s=>s.grouped&&s.insertionBlocked).length,0,'Grouped steps keep a clear insertion');
console.log(`PASS: named spare parts, keyed hub roll repair, no self-blocking sockets, ${guide.steps.length} steps (${grouped.length} grouped VEX-style) with ${conflicts.length} flagged conflicts, chain after sprockets, battery last.`);
