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
// chain after both sprockets and the battery inside the Brain module.
const guide=generateStudentGuide(parts,{references:refs,inferConnections:true,insertionPaths:paths,nameFor:p=>p.label});
assert.equal(guide.ready,true,JSON.stringify(guide.blockers));
assert.equal(guide.reviewRequired,true,'Not exported as a verified sequence');
assert.equal(guide.steps.at(-1).parts.length,parts.length);
const conflicts=guide.steps.filter(s=>s.pathConflict);
assert.ok(conflicts.length<=10,`Only a few flagged insertions (${conflicts.length})`);
const at=pid=>guide.steps.findIndex(s=>s.added.some(p=>p.id===pid)),chain=guide.steps.findIndex(s=>s.type==='chain-drive');
assert.ok(chain>at(id('238d'))&&chain>at(id('d6c5')),'Chain is wrapped after both sprockets');
assert.ok(at(id('4cac'))<at(id('dd68')),'Motor shaft before the motor');
// Rules A1/A9: start from the frame lying on the table; the Brain module late.
assert.ok(guide.steps[0].added.some(p=>p.sku==='228-2500-030'),'Start from a 2x20 base beam, not the motor plate');
const brain=parts.find(p=>/Robot Brain/.test(p.label));
assert.ok(at(brain.id)>=guide.steps.length*.75,'Brain module is mounted in the last quarter');
assert.ok(at(id('667d'))<at(id('2770')),'Lower motor plate before the top fan plate');
const edited=editGuide(guide,{},paths,refs);
// The battery sits against the Brain: it goes into the Brain module (VEX BaseBot step 15).
const batteryStep=edited.steps.find(s=>s.added.some(p=>p.id===id('69e0')));
assert.ok(batteryStep.phase===2&&batteryStep.added.some(p=>p.id===brain.id),'Battery is installed with the Brain on the table');
assert.ok(!edited.steps.some(s=>s.type==='electronics'),'No loose "check position" page remains');
// 1:1 rulers: pins and shafts carry their physical length.
const pinEntry=guide.steps.flatMap(s=>s.added).find(p=>p.sku==='228-2500-060');
assert.ok(Math.abs(pinEntry.lengthMM-10.9)<.2,`1x1 pin printed at 1:1 (${pinEntry.lengthMM} mm)`);
assert.equal(new Set(edited.steps.flatMap(s=>s.added.map(p=>p.id))).size,parts.length,'Every part appears exactly once');
// VEX IQ manual style: pins travel with their part, shaft stacks and twin
// connectors share a step; grouped steps stay valid after reordering.
const grouped=guide.steps.filter(s=>s.grouped);
assert.ok(guide.steps.length<=60&&grouped.length>=8,`Grouped steps (${grouped.length}) shorten the guide to ${guide.steps.length}`);
assert.ok(grouped.some(s=>/bằng 2 chốt/.test(s.title)&&s.added.some(p=>p.id===id('aa3c'))),'Touch LED goes on together with its two pins');
assert.equal(edited.steps.filter(s=>s.grouped&&s.insertionBlocked).length,0,'Grouped steps keep a clear insertion');
assert.ok(edited.steps.findIndex(s=>s.added.some(p=>p.id===brain.id))>=edited.steps.length*.75,'Reordering keeps the Brain module late');
assert.ok(edited.steps[0].added.some(p=>p.sku==='228-2500-030'),'Reordering keeps the base beam first');
// Rules A2-A4: both side frames are built together ("2X"), the Brain module is
// prepared on the table as one contiguous block and mounted at the end.
assert.equal(guide.modules?.twinSides,'side');
const twinSteps=edited.steps.filter(s=>s.mirrored);
assert.ok(twinSteps.length>=4&&edited.steps.slice(0,twinSteps.length).every(s=>s.mirrored),'Twin-side steps open the guide');
assert.ok(twinSteps.every(s=>s.added.length%2===0&&/làm 2 bên/.test(s.title)),'Each twin step adds a part and its twin');
assert.ok(twinSteps.some(s=>s.added.filter(p=>p.sku==='228-2500-030').length===2),'Both 2x20 base beams start together');
const moduleSteps=edited.steps.map((s,i)=>[s,i]).filter(([s])=>s.phase===2);
assert.ok(moduleSteps.length>=2&&moduleSteps.every(([,i],k)=>i===moduleSteps[0][1]+k),'Brain module steps are contiguous');
assert.ok(moduleSteps.at(-1)[0].attachModule&&/đặt cả module Brain lên khung/.test(moduleSteps.at(-1)[0].note));
assert.equal(edited.steps.filter(s=>s.pathConflict&&s.added.some(p=>p.id===brain.id||guide.modules.brainModule.includes(p.id))).length,0,'No forced insertions around the Brain any more');
// Frame parts that CAD flags as overlapping are placed where their support is, not at the end.
for(const [s,i] of edited.steps.map((s,i)=>[s,i]).filter(([s])=>s.pathConflict==='forced'&&(s.region??0)<=2))assert.ok(i<edited.steps.length/2,`Flagged frame step ${i+1} (${s.added[0].name}) stays with the base`);
// "2X" steps are drawn and counted for one copy.
assert.ok(edited.steps.filter(s=>s.mirrored).every(s=>s.twinIds.length*2===s.added.length&&!s.parts.some(p=>s.twinIds.includes(p.id))),'2X steps draw one half');
console.log(`PASS: named spare parts, keyed hub roll repair, no self-blocking sockets, ${guide.steps.length} steps (${grouped.length} grouped VEX-style) with ${conflicts.length} flagged conflicts, chain after sprockets, battery inside the Brain module, 1:1 pin rulers.`);
