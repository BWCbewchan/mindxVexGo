import fs from 'node:fs/promises';
const p='app/training/missions.json';
const catalog=JSON.parse(await fs.readFile(p,'utf8')).filter(l=>!l.id.startsWith('push-'));
const jobs=[
 ['First push','BEGINNER','Contact and continued drive',[200,600],[[500,600,'red']],[[1200,600,'red']],[[1135,600]],[]],
 ['Stop inside the bay','BEGINNER','Stopping before overshoot',[200,400],[[500,400,'blue']],[[850,400,'blue']],[[785,400]],[]],
 ['Push north','BEGINNER','Changing the approach heading',[500,1200],[[500,950,'green']],[[500,300,'green']],[[500,365]],[]],
 ['Approach from above','INTERMEDIATE','Getting behind the cargo',[200,200],[[600,600,'red']],[[600,1050,'red']],[[600,200],[600,985]],[]],
 ['Corner transfer','INTERMEDIATE','Repositioning before the second push',[200,600],[[500,600,'blue']],[[950,300,'blue']],[[885,600],[800,600],[800,850],[950,850],[950,365]],[]],
 ['Three-sided delivery','CHALLENGE','Planning access around a block',[200,600],[[500,600,'green']],[[250,1000,'green']],[[935,600],[800,600],[800,350],[1000,350],[1000,935],[1000,800],[1250,800],[1250,1000],[315,1000]],[]],
 ['Warehouse corridor','INTERMEDIATE','Maintaining lateral alignment',[200,600],[[500,600,'red']],[[1250,600,'red']],[[1185,600]],[{x:350,y:350,width:1050,height:100},{x:350,y:750,width:1050,height:100}]],
 ['Loading gate','INTERMEDIATE','Clearance through a bottleneck',[200,600],[[450,600,'blue']],[[1250,600,'blue']],[[1185,600]],[{x:800,y:0,width:80,height:470},{x:800,y:730,width:80,height:670}]],
 ['Two independent deliveries','CHALLENGE','Safe return lanes',[200,350],[[500,350,'red'],[500,950,'blue']],[[1250,350,'red'],[1250,950,'blue']],[[1185,350],[200,350],[200,950],[1185,950]],[]],
 ['Shared sorting bay','CHALLENGE','Separate parking positions',[200,400],[[500,400,'green'],[500,850,'green']],[[1200,400,'green'],[1200,850,'green']],[[1135,400],[200,400],[200,850],[1135,850]],[]],
 ['Inspect then push','INTERMEDIATE','Inspection followed by transport',[200,200],[[500,700,'red']],[[1250,700,'red']],[[200,1100],[200,700],[1185,700]],[]],
 ['Push around the island','CHALLENGE','Avoiding a blocked direct route',[200,600],[[500,600,'blue']],[[1200,1000,'blue']],[[535,600],[450,600],[450,350],[600,350],[600,935],[600,800],[350,800],[350,1000],[1135,1000]],[{x:800,y:400,width:200,height:400}]]
];
const solutions={};
for(const [i,[name,level,focus,start,blocks,zones,route,walls]] of jobs.entries()){
 const id='push-'+(i+1);
 const field={name,width:1600,height:1400,start:{x:start[0],y:start[1],heading:90},goal:{x:1400,y:1200,radius:70},walls,blocks:blocks.map(([x,y,color],j)=>({id:'push-box-'+j,x,y,color,pushable:true})),zones:zones.map(([x,y,color])=>({x,y,color,radius:85}))};
 if(i===10)field.checkpoints=[{x:200,y:1100,radius:50}];
 catalog.push({id,level:(73+i)+' · '+level,focus,hint:'Align with the center of the block. To change its direction, back away and move to another side before pushing again.',description:'Push the marked cargo completely into its matching color zone using drivetrain commands. These blocks cannot be lifted by the magnet. '+focus+'.',field});
 solutions[id]=route;
}
await fs.writeFile(p,JSON.stringify(catalog,null,2)+'\n');
await fs.writeFile('scripts/push-routes.json',JSON.stringify(solutions,null,2)+'\n');
