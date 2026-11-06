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
const {generateIQGuide}=await import('../public/assembly/iq-guide-sequence.js');
const socket={id:'socket',kind:'hole',point:[0,0,0],normal:[0,1,0],radius:2.2,depth:8};
const plug={id:'plug',kind:'pin',point:[0,0,0],normal:[0,-1,0],radius:2.2,depth:8};
const fixtureRefs={anchor:[0,20,40,60,80].map((x,i)=>({...socket,id:'socket-'+i,point:[x,0,0]}))};
const anchor={id:'anchor',sku:'anchor',kind:'body',label:'Support Beam',position:[0,0,0],rotation:[0,0,0]};
const categories=[
 ['new-beam','body','Beam'],['gear','gear','Gear'],['axle','shaft','Shaft'],
 ['standoff','body','Standoff'],['pin','pin','Pin']
].map(([id,kind,label],i)=>{
 fixtureRefs[id]=[plug];
 const part={id,sku:id,kind,label,position:[0,0,0],rotation:[0,0,0]},target=fixtureRefs.anchor[i];
 return {...part,...matingPose(part,plug,anchor,target,{depth:2}),mate:{target:anchor.id,sourceRef:plug.id,targetRef:target.id,depth:2}};
});
const prioritized=generateIQGuide([anchor,...categories],{references:fixtureRefs,rootId:anchor.id});
assert.ok(prioritized.ready,JSON.stringify(prioritized.blockers));
assert.deepEqual(prioritized.steps.flatMap(s=>s.added.map(p=>p.id)).filter(id=>id!==anchor.id),['pin','standoff','axle','gear','new-beam']);
const gear={id:'outer-gear',sku:'228-2500-213',kind:'gear',position:[0,0,0],rotation:[0,0,0]};
const gearHole=refs[gear.sku].find(r=>r.kind==='hole'&&r.profile==='square-drive');
const seat=(part,opening,depth)=>({...part,...matingPose(part,opening,axle,tip,{depth}),mate:{target:axle.id,sourceRef:opening.id,targetRef:tip.id,depth}});
const stack=generateIQGuide([axle,seat(wheel,hole,20),seat(gear,gearHole,10),seat(collar,bore,5)],{references:refs,rootId:axle.id,inferConnections:true});
assert.ok(stack.ready,JSON.stringify(stack.blockers));
assert.deepEqual(stack.steps.flatMap(s=>s.added.map(p=>p.id)),[axle.id,wheel.id,gear.id,collar.id]);
assert.ok(stack.steps.find(s=>s.added.some(p=>p.id===gear.id)).requires.includes(wheel.id));
console.log('PASS: stable VEX IQ build order, requested category priorities, and inner-to-outer insertion on a shared shaft.');
