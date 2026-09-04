import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const lessons=JSON.parse(await fs.readFile('app/training/missions.json','utf8'));
assert.equal(lessons.length,84);
assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
assert.equal(new Set(lessons.map(l=>JSON.stringify({...l.field,name:''}))).size,lessons.length);
for(const {id,field:f} of lessons){
 const hit=(x,y)=>x<45||y<45||x>f.width-45||y>f.height-45||f.walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.width)),y-Math.max(w.y,Math.min(y,w.y+w.height)))<45);
 assert.ok(!hit(f.start.x,f.start.y),id+' start is clear');
 assert.ok(!hit(f.goal.x,f.goal.y),id+' goal is clear');
 assert.ok(f.walls.length<=100);
 assert.ok(f.walls.every(w=>w.x>=0&&w.y>=0&&w.x+w.width<=f.width&&w.y+w.height<=f.height));
 const queue=[[Math.round(f.start.x/50)*50,Math.round(f.start.y/50)*50]];
 const visited=new Set([queue[0].join(',')]);let found=false;
 for(let i=0;i<queue.length;i++){
  const [x,y]=queue[i];if(Math.hypot(x-f.goal.x,y-f.goal.y)<=f.goal.radius){found=true;break;}
  for(const [dx,dy] of [[50,0],[-50,0],[0,50],[0,-50]]){
   const key=[x+dx,y+dy].join(',');
   if(!visited.has(key)&&!hit(x+dx,y+dy)&&!hit(x+dx/2,y+dy/2)){visited.add(key);queue.push([x+dx,y+dy]);}
  }
 }
 assert.ok(found,id+' must have a collision-free route for the 90 mm robot');
}
console.log('PASS: 84 unique missions; valid starts, targets and wall bounds; every target has a collision-free route for the simulated robot (cargo behavior checked separately).');
