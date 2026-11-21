// Rebuild the reference models (teacher CAD, scripts/robot-models/reference) for /library:
// stand each model the right way up, put it on the ground, render a cover picture and write the index.
// Usage: node scripts/build-reference-library.mjs [--no-pictures]
// Output: public/library/reference/<slug>.json, <slug>.jpg, index.json
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import * as THREE from 'three';
import {ROOT} from './vexgo/lib.mjs';

const SRC=path.join(ROOT,'scripts/robot-models/reference'),OUT=path.join(ROOT,'public/library/reference');
const pictures=!process.argv.includes('--no-pictures');
// What each model is, in the words a teacher uses. course: the lesson set it came from.
const META={
 '00trial--build_xe':{title:'Xe Code Base có LED Bumper',kind:'robot',course:'go-trial',note:'Xe 2 động cơ hoàn chỉnh: Brain, pin, 2 bánh xám, 2 bánh xanh và LED Bumper.'},
 '00trial--assem2':{title:'Xe Code Base cắm cờ',kind:'robot',course:'go-trial',note:'Xe Code Base mang cột cờ dựng trên thân.'},
 '00trial--flag':{title:'Cột cờ',kind:'small',course:'go-trial',note:'Mô hình nhỏ để tập gắn pin và thanh.'},
 '1-arm--baisoan_basic--bai1--build--ten':{title:'Tập gắn pin vào tấm (ARM bài 1)',kind:'small',course:'arm',note:'Tấm xám, 8 pin đỏ và kìm tháo pin: bài làm quen đầu khoá ARM.'},
 '2-semi--build--b1--body':{title:'Người máy SEMI',kind:'robot',course:'semi',note:'Người máy hoàn chỉnh: thân với Brain, động cơ, cảm biến, ghép với đầu, 2 tay và 2 chân.'},
 '2-semi--build--b1--head':{title:'Người máy SEMI: đầu',kind:'part',course:'semi'},
 '2-semi--build--b1--left_a':{title:'Người máy SEMI: khớp tay trái',kind:'part',course:'semi'},
 '2-semi--build--b1--left_arm':{title:'Người máy SEMI: tay trái',kind:'part',course:'semi'},
 '2-semi--build--b1--left_leg':{title:'Người máy SEMI: chân trái',kind:'part',course:'semi'},
 '2-semi--build--b1--right_a':{title:'Người máy SEMI: khớp tay phải',kind:'part',course:'semi'},
 '2-semi--build--b1--right_arm':{title:'Người máy SEMI: tay phải',kind:'part',course:'semi'},
 '2-semi--build--b1--right_leg':{title:'Người máy SEMI: chân phải',kind:'part',course:'semi'},
 '2-semi--build--b2--final':{title:'Robot cánh quạt SEMI',kind:'robot',course:'semi',note:'Robot hoàn chỉnh: khung, Brain, động cơ, bánh răng 48 răng và cánh quạt.'},
 '2-semi--build--b2--body':{title:'Robot cánh quạt SEMI: thân',kind:'part',course:'semi'},
 '2-semi--build--b2--base':{title:'Robot cánh quạt SEMI: đế',kind:'part',course:'semi'},
 '2-semi--build--b2--base_f':{title:'Robot cánh quạt SEMI: đế hoàn chỉnh',kind:'part',course:'semi'},
 '2-semi--build--b2--canhquat':{title:'Robot cánh quạt SEMI: cánh quạt',kind:'part',course:'semi'},
 '2-semi--build--b2--left':{title:'Robot cánh quạt SEMI: cụm trái',kind:'part',course:'semi'},
 '2-semi--build--b2--right':{title:'Robot cánh quạt SEMI: cụm phải',kind:'part',course:'semi'},
 '4-others--rl_sorter--s_1_67':{title:'Máy phân loại: cụm thử nghiệm 1.67',kind:'part',course:'sorter',note:'Cụm lắp riêng của giáo viên, không nằm trong máy phân loại hoàn chỉnh.'},
 '4-others--rl_sorter--final':{title:'Máy phân loại RL Sorter',kind:'robot',course:'sorter',note:'Máy phân loại hoàn chỉnh 225 chi tiết: băng xích, cảm biến màu, Touch LED và Brain.'},
};
const COURSES={'go-trial':'Xe VEX GO','arm':'Khoá ARM','semi':'Khoá SEMI','sorter':'Máy phân loại'};
const meta=slug=>META[slug]??(slug.startsWith('4-others--rl_sorter--')?{title:`Máy phân loại: cụm ${slug.split('--').pop().replace(/^s_?/,'').replace(/_/g,'.')}`,kind:'part',course:'sorter'}:{title:slug,kind:'part',course:'other'});

const WHEELS=new Set(['228-2500-1383','228-2500-1384','228-2500-208','228-2500-209','228-2500-210','228-2500-211','228-2500-218','228-2500-219','228-2500-231']);
const d=THREE.MathUtils;
// Cars: wheel axles horizontal (X) and wheels at the bottom. Other models keep the CAD's own up (Y).
function upright(project){
  const wheels=project.parts.filter(p=>WHEELS.has(p.sku));
  if(wheels.length<3)return project;
  const c=v=>v.reduce((a,p)=>a.add(new THREE.Vector3(...p.position)),new THREE.Vector3()).divideScalar(v.length);
  const all=c(project.parts),w=c(wheels);
  // Axle: the axis along which the wheels spread most (left and right wheels).
  const spread=[0,1,2].map(i=>Math.max(...wheels.map(p=>p.position[i]))-Math.min(...wheels.map(p=>p.position[i])));
  const rest=[0,1,2].map(i=>{const v=wheels.map(p=>p.position[i]);return {i,spread:spread[i]};});
  const axle=spread.indexOf(Math.max(...spread));
  // Down: of the other two axes, the one where the wheels sit furthest from the body's centre.
  const others=[0,1,2].filter(i=>i!==axle),off=others.map(i=>w.getComponent(i)-all.getComponent(i));
  const k=Math.abs(off[0])>Math.abs(off[1])?0:1,down=others[k],sign=Math.sign(off[k])||-1,front=others[1-k];
  const unit=i=>new THREE.Vector3().setComponent(i,1);
  const X=unit(axle),Y=unit(down).multiplyScalar(-sign),Z=new THREE.Vector3().crossVectors(X,Y);
  const R=new THREE.Matrix4().makeBasis(X,Y,Z).transpose(),q=new THREE.Quaternion().setFromRotationMatrix(R);
  void rest;void front;
  return {...project,parts:project.parts.map(p=>{const pos=new THREE.Vector3(...p.position).applyMatrix4(R);const e=new THREE.Euler().setFromQuaternion(q.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(d.degToRad)))));return {...p,position:pos.toArray().map(v=>+v.toFixed(3)),rotation:[e.x,e.y,e.z].map(v=>+d.radToDeg(v).toFixed(4))};})};
}
// Centre on X/Z and put the lowest part origin near the ground; the viewers fit the camera anyway.
function centred(project){
  const ps=project.parts.map(p=>p.position),mid=i=>(Math.max(...ps.map(v=>v[i]))+Math.min(...ps.map(v=>v[i])))/2,low=Math.min(...ps.map(v=>v[1]));
  return {...project,parts:project.parts.map(p=>({...p,position:[p.position[0]-mid(0),p.position[1]-low,p.position[2]-mid(2)].map(v=>+v.toFixed(3))}))};
}
fs.mkdirSync(OUT,{recursive:true});
const index=[];
for(const file of fs.readdirSync(SRC).filter(f=>f.endsWith('.project.json')).sort()){
  const slug=file.replace('.project.json',''),m=meta(slug),src=JSON.parse(fs.readFileSync(path.join(SRC,file),'utf8'));
  const project=centred(upright(src));project.title=m.title;
  const {source,...doc}=project;
  fs.writeFileSync(path.join(OUT,slug+'.json'),JSON.stringify(doc)+'\n','utf8');
  if(pictures){
    const jpg=path.join(OUT,slug+'.jpg');
    execFileSync(process.execPath,[path.join(ROOT,'scripts/vexgo/view.mjs'),'project',path.join(OUT,slug+'.json'),jpg,'--az','35','--el','25','--clean'],{stdio:'ignore'});
  }
  const parts=project.parts.length,electronics=project.parts.filter(p=>/^269-|^228-(2560|6480|7106|7082|3010|3011|3012|3014|2540|2604)/.test(p.sku)).length;
  index.push({slug,children:src.subassemblies??[],title:m.title,platform:project.platform,kind:m.kind,course:m.course,courseName:COURSES[m.course]??'Khác',note:m.note??'',parts,electronics,source:src.source??'',picture:pictures||fs.existsSync(path.join(OUT,slug+'.jpg'))?`/library/reference/${slug}.jpg`:null});
  console.log(`${slug}: ${parts} parts`);
}
// Nesting: a model listed as a sub-assembly of another is shown inside it in /library, not on its own,
// unless it is a whole robot itself (the Code Base car inside the car with a flag).
const bySlug=new Map(index.map(m=>[m.slug,m]));
for(const m of index){m.children=m.children.filter(c=>bySlug.has(c));m.parents=index.filter(o=>o.children.includes(m.slug)).map(o=>o.slug);}
const descendants=m=>new Set(m.children.flatMap(c=>[c,...descendants(bySlug.get(c))]));
for(const m of index){m.subassemblyCount=descendants(m).size;m.listed=!m.parents.length||m.kind==='robot';}
const order={robot:0,small:1,part:2};
index.sort((a,b)=>order[a.kind]-order[b.kind]||a.course.localeCompare(b.course)||a.title.localeCompare(b.title,'vi'));
index.unshift({"slug": "go-competition-base", "title": "GO Competition Base", "platform": "vexgo", "kind": "robot", "course": "go-competition", "courseName": "VEX GO thi đấu", "note": "Khung xe thi đấu VEX GO với hai motor. Mở bản sao để xem bốn cụm lắp và tạo hướng dẫn từng bước.", "parts": 58, "electronics": 5, "source": "Assembly", "picture": "/library/reference/go-competition-base.jpg", "children": [], "parents": [], "subassemblyCount": 0, "listed": true});
fs.writeFileSync(path.join(OUT,'index.json'),JSON.stringify({generated:'scripts/build-reference-library.mjs',models:index},null,1)+'\n','utf8');
console.log(`${index.length} models -> ${OUT}`);
