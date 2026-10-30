import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
globalThis.location={href:'http://localhost/assembly/iq/editor.html?platform=vexiq'};
const {generateStudentGuide,sequenceIssue}=await import('../public/assembly/guide-sequence.js');
const refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts;
const catalog=JSON.parse(await fs.readFile('public/assembly/iq/parts.json','utf8'));
const input=JSON.parse(await fs.readFile('scripts/fixtures/iq-guide-codebase.json','utf8')).parts;
const parts=input.map(p=>({...p,kind:catalog.find(c=>c.id===p.sku).kind}));
const before=JSON.stringify(parts),guide=generateStudentGuide(parts,{references:refs,inferConnections:true});
assert.equal(guide.ready,true,JSON.stringify(guide.blockers));
assert.equal(JSON.stringify(parts),before,'Planning must not change authored poses/mates');
assert.equal(sequenceIssue(guide.steps),null);
const all=guide.steps.flatMap(s=>s.added.map(p=>p.id));assert.equal(all.length,parts.length);assert.equal(new Set(all).size,parts.length);
const base=guide.steps[0].parts.find(p=>!p.mate);assert.equal(base.kind,'body');assert.equal(base.sku,'228-2500-026');
for(const step of guide.steps){
 const fresh=step.added.map(p=>step.parts.find(x=>x.id===p.id));
 assert.ok(step===guide.steps[0]||!fresh.some(p=>p.kind==='body')||!fresh.some(p=>p.kind==='pin'),'Separate pin insertion from adding a new body after the starting support');
 for(const id of step.requires)assert.ok(!step.added.some(p=>p.id===id));
 const pins=fresh.filter(p=>p.kind==='pin');if(pins.length>1){assert.equal(new Set(pins.map(p=>p.mate.target)).size,1);const parent=step.parts.find(p=>p.id===pins[0].mate.target);const normals=pins.map(p=>refs[parent.sku].find(r=>r.id===p.mate.targetRef).normal);for(const n of normals)assert.ok(n.every((v,i)=>Math.abs(v-normals[0][i])<.001),'Batch only one insertion face');}
}
const plan=rows=>generateStudentGuide(rows,{references:refs,inferConnections:true});
const signature=g=>g.steps.map(s=>s.added.map(a=>{const p=parts.find(p=>p.id===a.id);return [p.sku,p.position];}));
const withoutMates=structuredClone(parts);withoutMates.forEach(p=>delete p.mate);assert.deepEqual(signature(plan(withoutMates)),signature(guide),'Geometry, not editing gestures, controls IQ build order');
const reversed=plan([...parts].reverse());assert.deepEqual(signature(reversed),signature(guide),'File serialization order does not shuffle steps');
const renamed=structuredClone(parts),names=new Map(parts.map((p,i)=>[p.id,'part-'+(parts.length-i)]));
for(const p of renamed){p.id=names.get(p.id);if(p.mate)p.mate.target=names.get(p.mate.target);}
const renamedGuide=plan(renamed);assert.equal(renamedGuide.ready,true);
assert.deepEqual(renamedGuide.steps.map(s=>s.added.map(a=>{const p=renamed.find(p=>p.id===a.id);return [p.sku,p.position];})),signature(guide),'New UUIDs do not shuffle a geometrically identical guide');
const stepOf=id=>guide.steps.findIndex(s=>s.added.some(p=>p.id===id));
for(const shaft of parts.filter(p=>p.kind==='shaft')){
 const snapshot=guide.steps.at(-1).parts,stack=snapshot.filter(p=>p.mate?.target===shaft.id&&p.kind==='retainer').sort((a,b)=>b.mate.depth-a.mate.depth);
 for(let i=1;i<stack.length;i++)assert.ok(stepOf(stack[i-1].id)<stepOf(stack[i].id),'Axial retainers proceed from inside to outside');
}
const built=new Set();for(const s of guide.steps){for(const id of s.requires)assert.ok(built.has(id),`Unsupported prerequisite in ${s.title}`);for(const x of s.added)built.add(x.id);}
const {matingPose}=await import('../public/assembly/mating.js');
const axle={id:'axle',sku:'228-2500-122',kind:'shaft',position:[0,0,0],rotation:[0,0,0]},tip=refs[axle.sku].find(r=>r.kind==='pin'&&r.profile==='square-drive');
const wheel={id:'wheel',sku:'228-2536',kind:'wheel',position:[0,0,0],rotation:[0,0,0]},hole=refs[wheel.sku].find(r=>r.kind==='hole'&&r.profile==='square-drive');
Object.assign(wheel,matingPose(wheel,hole,axle,tip,{depth:20}));
const collar={id:'collar',sku:'228-2500-168',kind:'retainer',position:[0,0,0],rotation:[0,0,0]},bore=refs[collar.sku].find(r=>r.kind==='hole'&&r.radius>=2&&r.radius<=2.6);
Object.assign(collar,matingPose(collar,bore,axle,tip,{depth:5}));
const axial=plan([collar,wheel,axle]);assert.equal(axial.ready,true,JSON.stringify(axial.blockers));assert.ok(axial.steps[0].added.some(p=>p.id==='axle'));assert.ok(axial.steps.findIndex(s=>s.added.some(p=>p.id==='wheel'))<axial.steps.findIndex(s=>s.added.some(p=>p.id==='collar')));
console.log('PASS: supplied 26-part IQ model, structural anchor, supported same-face pin batches, cumulative complete poses, stable order and unchanged input.');
