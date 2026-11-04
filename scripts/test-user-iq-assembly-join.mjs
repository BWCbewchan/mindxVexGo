import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
globalThis.location={href:'http://localhost/assembly/iq/editor.html'};
const {assemblyMatingContext,movingAssemblyIds,previewAssemblyConnection,nearestAssemblyMate}=await import('../public/assembly/assembly-mating.js');
const {constrainJoints}=await import('../public/assembly/joint-constraints.js');
const {jointMetrics,seatedConnections}=await import('../public/assembly/assembly-review.js');
const file=JSON.parse(await fs.readFile(new URL('./fixtures/user-iq-codebase-join.json',import.meta.url),'utf8')),references=JSON.parse(await fs.readFile(new URL('../public/assembly/iq/connectors.json',import.meta.url),'utf8')).parts;
const sourceId='11e440d1-a623-47ab-bc06-9dc2e7bff5fe',targetId='da50a8db-c643-4b16-bb66-bc0a7eb04c23',otherPin='61acce9f-f10c-4c4c-9757-d11ac9fcf232',original=JSON.stringify(file.parts),context=assemblyMatingContext(file.parts,references),ids=movingAssemblyIds(file.parts,references,sourceId,[],context);
assert.equal(ids.length,39);assert.ok(ids.includes(otherPin));assert.ok(!ids.includes(targetId));
const result=previewAssemblyConnection(file.parts,references,{sourceId,targetId,sourceRef:'6',targetRef:'9',depth:4.55,movingIds:ids,context});
assert.equal(result.support,2);assert.ok(result.contacts.some(c=>c.part===targetId&&c.target===otherPin&&c.sourceRef==='4'));assert.ok(result.contacts.some(c=>c.part===targetId&&c.target===sourceId&&c.sourceRef==='9'));
assert.equal(JSON.stringify(file.parts),original,'Pure preview must not mutate the source document');const set=new Set(ids),byId=new Map(result.parts.map(p=>[p.id,p]));
for(const old of file.parts)if(!set.has(old.id))assert.deepEqual(byId.get(old.id),old,'Static target assembly is unchanged');
const distance=(a,b)=>Math.hypot(...a.position.map((n,i)=>n-b.position[i]));for(const a of file.parts.filter(p=>set.has(p.id)))for(const b of file.parts.filter(p=>set.has(p.id)))assert.ok(Math.abs(distance(a,b)-distance(byId.get(a.id),byId.get(b.id)))<1e-6,'Rigid component distances');
for(const p of result.parts){const seen=new Set([p.id]);let next=p;while(next.mate){assert.ok(!seen.has(next.mate.target),'No joint cycle');seen.add(next.mate.target);next=byId.get(next.mate.target);assert.ok(next);}if(p.mate){const t=byId.get(p.mate.target);assert.ok(jointMetrics(p,t,references[p.sku].find(r=>r.id===p.mate.sourceRef),references[t.sku].find(r=>r.id===p.mate.targetRef)).valid,'All authored/re-rooted joints valid');}}
assert.equal(movingAssemblyIds(result.parts,references,sourceId).length,79,'The two chassis sides become one connected assembly');
const guarded=structuredClone(result.parts),guardPoses=JSON.stringify(guarded.map(p=>[p.position,p.rotation]));const guard=constrainJoints(guarded,file.parts,references,{autoAttach:false});assert.ok(guard.ok,guard.reason);for(let i=0;i<guarded.length;i++)for(const field of ['position','rotation'])for(let j=0;j<3;j++)assert.ok(Math.abs(guarded[i][field][j]-result.parts[i][field][j])<1e-5,'Guard must preserve the accepted rigid pose');
assert.throws(()=>previewAssemblyConnection(file.parts,references,{sourceId,targetId:otherPin,sourceRef:'6',targetRef:'6',movingIds:ids}),/tương thích|cùng cụm/);
const shifted=structuredClone(result.parts);for(const p of shifted)if(set.has(p.id))p.position[0]-=5;const start=performance.now();const nearest=nearestAssemblyMate(shifted,references,ids,{distance:8,context});const ms=performance.now()-start;assert.ok(nearest);assert.ok(nearest.support>=2);assert.equal(nearest.target.id,targetId);assert.equal(nearest.movingIds.length,39);
console.log(`PASS: actual 79-part IQ file; two 39/40-part chassis sides, rigid 39-member join, two aligned pins, valid rerooted mates, no cycles, no static/authoring changes; nearest probe ${ms.toFixed(1)} ms.`);

const {releaseAssemblyBoundary}=await import('../public/assembly/assembly-mating.js');
const released=structuredClone(result.parts),internal=released.filter(p=>p.mate&&set.has(p.id)===set.has(p.mate.target)).map(p=>[p.id,structuredClone(p.mate)]);
releaseAssemblyBoundary(released,references,ids);
assert.ok(released.every(p=>!p.mate||set.has(p.id)===set.has(p.mate.target)),'Only cross-group links are released');
for(const [id,mate] of internal)assert.deepEqual(released.find(p=>p.id===id).mate,mate,'All internal links preserved');
assert.equal(nearestAssemblyMate(released,references,ids,{distance:1}),null,'Released boundary does not snap back immediately');
for(const p of released)if(set.has(p.id))p.position[0]-=40;
const releaseGuard=constrainJoints(released,result.parts,references,{autoAttach:false});assert.ok(releaseGuard.ok,releaseGuard.reason);
for(const p of released){const before=result.parts.find(q=>q.id===p.id);assert.ok(Math.abs(p.position[0]-before.position[0]-(set.has(p.id)?-40:0))<1e-5,'Selected chassis moves out; static chassis stays still');}
console.log('PASS: selected group can separate again; internal mates preserved, boundary released, no immediate snap-back.');

const retry=structuredClone(result.parts);releaseAssemblyBoundary(retry,references,ids);for(const p of retry)if(set.has(p.id))p.position[0]-=3;
releaseAssemblyBoundary(retry,references,ids);const retryMate=nearestAssemblyMate(retry,references,ids,{distance:8});assert.ok(retryMate&&retryMate.support>=2,'A new intentional group drag reconnects both pins without requiring a wide retreat');
const excursion=structuredClone(result.parts);releaseAssemblyBoundary(excursion,references,ids);for(const p of excursion)if(set.has(p.id))p.position[0]-=40;nearestAssemblyMate(excursion,references,ids,{distance:8});for(const p of excursion)if(set.has(p.id))p.position[0]+=37;assert.ok(nearestAssemblyMate(excursion,references,ids,{distance:8})?.support>=2,'Moving out then back in the same drag re-enables the released seat');
console.log('PASS: easy two-pin reconnect on the next drag and after moving out/back; no permanent connector lock.');
