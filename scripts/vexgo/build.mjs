// Build a VEX GO model from a step recipe with the real /assembly mate rules, checking every step.
// Usage: node scripts/vexgo/build.mjs <recipe.json> --out <project.json> [--views <dir>] [--until "Step 7"]
//
// Recipe: { "title", "base"?: "<project.json to start from>", "steps": [Step...] }
// Step:   { "name": "Step 3", "image"?: "<instruction picture for --views>", "az"?: 35, "el"?: 30,
//           "parts": [{ "id": "pin-1", "sku": "228-2500-2260", "at"?: [x,y,z], "rot"?: [rx,ry,rz], "axes"?: "+y-z-x" }],
//           "attach": [{ "part": "pin-1", "ref": "p-y", "to": "beam-1", "toRef": "h2+y",
//                        "twist"?: 0, "align"?: { "ref": "h4-y", "to": "beam-2", "toRef": "p+y" }, "slide"?: 20, "faceTo"?: true }],
//           "check": [{ "part": "beam-2", "ref": "h4-y", "to": "pin-3", "toRef": "p+y" }] }
// - A part is placed by its attach (its connector into an already placed part), or by "at" plus "rot" or
//   "axes" (world X, Y, Z <- local axis, see lib.mjs axesRotation) if it
//   starts a new sub-assembly. Attach order matters: the target must already be placed.
// - "align" turns the part about the attach axis until a second connector pair lines up (no guessing twist).
// - "check" asserts a connection that the step makes without moving anything (a second pin of a beam).
// Connector names come from scripts/vexgo/lib.mjs connectorNames (see the part image from view.mjs).
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createWorkspace,collisions,partName,ROOT,axesRotation,references,refId} from './lib.mjs';
import {worldReference,matingPose} from '../../public/assembly/mating.js';

const args=process.argv.slice(2),flag=n=>{const i=args.indexOf('--'+n);return i<0?undefined:args[i+1];};
const recipeFile=args[0],out=flag('out'),views=flag('views'),until=flag('until');
if(!recipeFile||!out)throw Error('Usage: build.mjs <recipe.json> --out <project.json> [--views dir] [--until "Step N"]');
const recipe=JSON.parse(fs.readFileSync(recipeFile,'utf8'));
const relative=file=>path.resolve(path.dirname(recipeFile),file);
const base=recipe.base?JSON.parse(fs.readFileSync(relative(recipe.base),'utf8')):undefined;
const w=createWorkspace(base?{version:1,platform:'vexgo',parts:base.parts,groups:[]}:undefined);
// Seated pairs share an axis (lateral), face each other, and sit within a pin's reach along it (axial).
const LATERAL_MM=.5,AXIAL_MM=8,FACING=-.98;
const report=[];let failed=false;
// faceTo pairs interlock by their own bosses; their mutual contact is seating, not a collision.
const interlocked=new Set();

async function attach(a){
  // matingPose composes with the part's current rotation, so start every try from the same pose.
  const start=structuredClone(w.find(a.part).rotation);
  // Pins are seated fully by default (recipe "seat": "editor" keeps the editor's recommended depth).
  const depth=a.depth??(recipe.seat==='editor'?undefined:'max');
  const faceTo=twist=>{
    // "faceTo": hole against hole, faces touching (parts held by their own bosses, like a pulley in a
    // wheel hub). The editor's attach only accepts pin into hole, so pose it with the same mating maths.
    const part=w.find(a.part),target=w.find(a.to);part.rotation=structuredClone(start);
    const ra=references[part.sku].find(r=>r.id===refId(part.sku,a.ref)),rb=references[target.sku].find(r=>r.id===refId(target.sku,a.toRef));
    Object.assign(part,matingPose(part,ra,target,rb,{twist,depth:0,references}));delete part.mate;
  };
  if(a.faceTo)interlocked.add([a.part,a.to].sort().join('|'));
  const twistOf=async twist=>{if(a.faceTo)return faceTo(twist);w.find(a.part).rotation=structuredClone(start);await w.attach(a.part,a.ref,a.to,a.toRef,{twist,...(depth===undefined?{}:{depth})});};
  const slide=()=>{
    // "slide": move the part further along the attach axis (mm, positive = further onto the target),
    // for spots without a connector, such as a wheel in the middle of a long shaft.
    if(!a.slide)return;
    const t=w.find(a.to),ref=references[t.sku].find(r=>r.id===refId(t.sku,a.toRef));
    const n=worldReference(t,ref).normal;
    const part=w.find(a.part);part.position=part.position.map((v,i)=>v-n.getComponent(i)*a.slide);
  };
  if(!a.align){await twistOf(a.twist??0);slide();return {twist:a.twist??0};}
  let best;
  for(let twist=0;twist<360;twist+=a.alignStep??15){
    await twistOf(twist);
    const g=w.gap(a.part,a.align.ref,a.align.to,a.align.toRef);
    const score=g.lateral+(g.facing>FACING?100:0)+(Math.abs(g.axial)>AXIAL_MM?100:0);
    if(!best||score<best.score)best={twist,score,gap:g};
  }
  await twistOf(best.twist);slide();
  if(best.score>LATERAL_MM)throw Error(`align ${a.part}.${a.align.ref} -> ${a.align.to}.${a.align.toRef}: closest is ${best.gap.lateral.toFixed(2)} mm off axis, ${best.gap.axial.toFixed(1)} mm along it (facing ${best.gap.facing.toFixed(2)}) at twist ${best.twist}. Wrong hole, wrong face, or the part points the wrong way?`);
  return {twist:best.twist,alignGap:+best.gap.lateral.toFixed(3)};
}

for(const [index,step] of recipe.steps.entries()){
  const row={step:step.name??`#${index+1}`,added:[],errors:[],warnings:[]};
  try{
    for(const p of step.parts??[])w.add(p.id,p.sku,p.at??[0,0,0],p.axes?axesRotation(p.axes):p.rot??[0,0,0]),row.added.push(`${p.id} (${partName(p.sku)})`);
    for(const a of step.attach??[]){const r=await attach(a);if(r.alignGap!==undefined)row.warnings.push(`${a.part}: twist ${r.twist}°, align gap ${r.alignGap} mm`);}
    for(const c of step.check??[]){
      const g=w.gap(c.part,c.ref,c.to,c.toRef);
      if(g.lateral>LATERAL_MM||g.facing>FACING||Math.abs(g.axial)>AXIAL_MM)row.errors.push(`check ${c.part}.${c.ref} -> ${c.to}.${c.toRef}: ${g.lateral.toFixed(2)} mm off axis, ${g.axial.toFixed(1)} mm along it, facing ${g.facing.toFixed(2)}`);
    }
    // The first part of the model is its root and may sit at the origin.
    const posed=new Set((step.attach??[]).filter(a=>a.faceTo).map(a=>a.part));
    const unplaced=(step.parts??[]).filter(p=>!p.at&&!w.find(p.id).mate&&!posed.has(p.id)&&w.project.parts[0].id!==p.id);
    for(const p of unplaced)row.errors.push(`${p.id} was neither attached nor given "at"; it sits at the origin`);
    for(const issue of await collisions(w.project)){
      const text=`${issue.a} (${w.find(issue.a).label}) x ${issue.b} (${w.find(issue.b).label}): ${issue.label}`;
      (issue.severity==='error'&&!interlocked.has([issue.a,issue.b].sort().join('|'))?row.errors:row.warnings).push(text);
    }
  }catch(error){row.errors.push(error.message);}
  if(views){
    fs.mkdirSync(views,{recursive:true});
    const project=path.join(views,`step-${String(index+1).padStart(2,'0')}.json`);fs.writeFileSync(project,JSON.stringify(w.project));
    const picture=path.join(views,`step-${String(index+1).padStart(2,'0')}.png`);
    const focus=(step.parts??[]).map(p=>p.id).join(',');
    execFileSync(process.execPath,[path.join(ROOT,'scripts/vexgo/view.mjs'),'project',project,picture,'--az',String(step.az??35),'--el',String(step.el??30),...(step.image?['--ref',relative(step.image)]:[]),...(focus&&step.focusNew?['--focus',focus]:[])],{stdio:'ignore'});
    row.view=picture;
  }
  if(row.errors.length)failed=true;
  report.push(row);
  console.log(`${row.errors.length?'FAIL':'ok  '} ${row.step}${row.added.length?' + '+row.added.join(', '):''}`);
  for(const e of row.errors)console.log('     ✗ '+e);
  for(const e of row.warnings)console.log('     · '+e);
  if(row.errors.length||step.name===until)break;
}
fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});
fs.writeFileSync(out,JSON.stringify({version:1,platform:'vexgo',title:recipe.title??'VEX GO model',hideCables:true,parts:w.project.parts,groups:[]},null,1)+'\n','utf8');
fs.writeFileSync(out.replace(/\.json$/,'')+'.report.json',JSON.stringify(report,null,1)+'\n','utf8');
console.log(failed?'Stopped at the first failing step.':'All steps passed.',`→ ${out}`);
if(failed)process.exitCode=1;
