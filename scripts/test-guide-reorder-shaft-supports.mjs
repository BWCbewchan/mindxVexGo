import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
globalThis.location=new URL('http://localhost/assembly/iq/editor.html?platform=vexiq');
const {generateIQGuide}=await import('../public/assembly/iq-guide-sequence.js');
const {generateStudentGuide}=await import('../public/assembly/guide-sequence.js');
const {editGuide,stepKey}=await import('../public/assembly/guide-editing.js');
const refs=JSON.parse(await fs.readFile('public/assembly/iq/connectors.json','utf8')).parts;
const part=(id,sku,kind,position,rotation)=>({id,sku,kind,label:sku,position,rotation});
const parts=[part('base','228-2500-023','body',[0,0,0],[-90,0,-90]),part('shaft','228-2500-2223','shaft',[2.308,0,0],[0,0,-90]),part('closing-beam','228-2500-023','body',[-31.75,0,0],[-90,0,-90]),...[-6.35,6.35].flatMap((y,i)=>[-44.45,44.45].map((z,j)=>part(`post-${i}-${j}`,i===1&&j===0?'228-2500-067':'228-2500-2271','body',[-28.575,y,z],[0,0,90])))];
const before=JSON.stringify(parts),guide=generateIQGuide(parts,{references:refs,inferConnections:true,rootId:'base'});assert.ok(guide.ready,JSON.stringify(guide.blockers));
function move(base,prefs,from,to){const order=editGuide(base,prefs).steps.map(stepKey),[key]=order.splice(from,1);order.splice(to,0,key);return editGuide(base,{...prefs,order});}
function snapshots(g){const included=new Set();for(const s of g.steps){for(const p of s.added){assert.ok(!included.has(p.id));included.add(p.id);}assert.deepEqual(new Set(s.parts.map(p=>p.id)),included);}}
const from=guide.steps.findIndex(s=>s.added.some(p=>p.id==='shaft')),to=guide.steps.findIndex(s=>s.added.some(p=>p.id==='closing-beam'));assert.ok(from<to,'An available shaft is planned before the secondary closing beam');
const shaftKey=stepKey(guide.steps[from]),closingKey=stepKey(guide.steps[to]);
const moved=move(guide,{},from,to);assert.equal(stepKey(moved.steps[to]),shaftKey,'Manual edits can place the shaft after the closing beam');snapshots(moved);
const earlyClosingBeam=move(guide,{},to,0);assert.equal(stepKey(earlyClosingBeam.steps[0]),closingKey);assert.ok(earlyClosingBeam.steps[0].guideSupport);snapshots(earlyClosingBeam);assert.equal(JSON.stringify(parts),before);
const axle={id:'axle',kind:'shaft'},wheel={id:'wheel',kind:'wheel',mate:{target:'axle',targetRef:'end',depth:20}},collar={id:'collar',kind:'retainer',mate:{target:'axle',targetRef:'end',depth:5}},full=[axle,wheel,collar],axial={ready:true,steps:full.map((p,i)=>({added:[p],requires:i?['axle']:[],parts:full.slice(0,i+1)}))};const earlyCollar=move(axial,{},2,1);assert.equal(stepKey(earlyCollar.steps[1]),'collar');snapshots(earlyCollar);
if(process.env.WINDMILL_PROJECT){const doc=JSON.parse(await fs.readFile(process.env.WINDMILL_PROJECT,'utf8')),base=generateStudentGuide(doc.parts,{references:refs,inferConnections:true}),current=editGuide(base,doc.guidePreferences);assert.ok(base.ready);assert.equal(current.editError,null);const key=stepKey(current.steps[18]),edited=move(base,doc.guidePreferences,18,17);assert.equal(edited.editError,null,'Supplied windmill step 19 must move to step 18');assert.equal(stepKey(edited.steps[17]),key);snapshots(edited);assert.equal(edited.steps.length,current.steps.length);assert.equal(edited.steps.at(-1).parts.length,108);
 const touchKey=stepKey(current.steps[66]),manual=move(base,doc.guidePreferences,66,3);
 assert.equal(stepKey(manual.steps[3]),touchKey,'Supplied windmill step 67 must move to step 4');
 assert.match(manual.steps[3].note,/Hình mờ/);
 assert.equal(manual.steps[3].guideSupport.id,manual.steps[3].joint.target);
 assert.ok(!manual.steps[3].parts.some(p=>p.id===manual.steps[3].guideSupport.id));
 assert.deepEqual(manual.steps.at(-1).parts,current.steps.at(-1).parts);snapshots(manual);
 const custom=move(base,{...doc.guidePreferences,steps:{...doc.guidePreferences?.steps,[touchKey]:{note:'Ghi chú của giáo viên'}}},66,3);
 assert.equal(custom.steps[3].note,'Ghi chú của giáo viên');
 console.log('PASS: supplied 108-part windmill, steps 19 → 18 and 67 → 4, all 71 cumulative snapshots, preserved manual note and unchanged part poses.');}
console.log('PASS: shaft before secondary support, unrestricted first-support, multi-post and retainer reorder, immutable input and cumulative snapshots.');
