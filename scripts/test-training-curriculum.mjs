import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context={};vm.runInNewContext(await fs.readFile('public/training-engine.js','utf8'),context);
const catalog=JSON.parse(await fs.readFile('app/training/missions.json','utf8'));
assert.equal(catalog.length,84);
const added=catalog.filter(l=>l.id.startsWith('thinking-'));
assert.equal(added.length,30);assert.equal(new Set(added.map(l=>l.focus)).size,30);
function motion(e,kind,n){e.command(kind,n,250);for(let i=0;i<3000&&e.moving;i++)e.tick(.02);assert.equal(e.state.collision,false,'route must avoid contact');}
function go(e,x,y){const dx=x-e.state.x,dy=y-e.state.y;if(Math.hypot(dx,dy)<.01)return;const heading=Math.atan2(dx,-dy)*180/Math.PI;motion(e,'turn',((heading-e.state.heading+540)%360+360)%360-180);motion(e,'drive',Math.hypot(dx,dy));assert.ok(Math.hypot(e.state.x-x,e.state.y-y)<.1);}
for(const l of added){
 const e=context.createTrainingEngine(l.field);
 // Reach inspection points using a clear left-hand travel lane when cargo exists.
 if(l.field.blocks?.length){go(e,200,1200);}
 for(const c of l.field.checkpoints)go(e,c.x,c.y);
 assert.equal(e.state.checkpointIndex,l.field.checkpoints.length,l.id+' checkpoint sequence');
 if(!l.field.blocks?.length)go(e,l.field.goal.x,l.field.goal.y);
 else{
  go(e,200,e.state.y);
  for(const [i,b] of l.field.blocks.entries()){
   go(e,200,b.y);go(e,b.x-100,b.y);motion(e,'turn',90-e.state.heading);motion(e,'drive',35);e.magnet('boost');assert.equal(e.state.carrying,b.id);
   const z=l.field.zones.find(z=>z.color===b.color);const targetY=l.id==='thinking-26'?z.y+(i===0?-60:60):z.y;
   // Travel along the pickup row first, then align with the delivery row in a clear lane.
   go(e,1050,b.y);go(e,1050,targetY);motion(e,'turn',90-e.state.heading);motion(e,'drive',z.x-65-1050);e.magnet('drop');
   assert.equal(e.state.delivered,i+1,l.id+' delivery '+i);go(e,1050,targetY);go(e,1050,1200);go(e,200,1200);
  }
 }
 assert.equal(e.state.goal,true,l.id+' completed');e.reset();assert.equal(e.state.checkpointIndex,0);assert.equal(e.state.goal,false);
}
const f={width:1000,height:1000,start:{x:200,y:200,heading:90},walls:[],goal:{x:500,y:200,radius:40},checkpoints:[{x:200,y:500,radius:40},{x:500,y:500,radius:40}]};
const e=context.createTrainingEngine(f);go(e,500,200);assert.equal(e.state.goal,false,'goal alone cannot win');go(e,500,500);assert.equal(e.state.checkpointIndex,0,'out-of-order visit ignored');go(e,200,500);go(e,500,500);go(e,500,200);assert.equal(e.state.goal,true);e.reset();assert.equal(e.state.checkpointIndex,0);
console.log('PASS: 30 distinct learning focuses; all 30 new missions completed with actual engine motion and cargo delivery; goal/order gating and reset.');
