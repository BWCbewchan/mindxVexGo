import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {visibleBounds} from '../assembly/visible-bounds.js';
import {applyIQAppearance} from '../assembly/iq/color-profile.js';
import {optimizeStaticModel} from '../assembly/render-model.js';
const previewOnly=new URLSearchParams(location.search).get('preview')==='1';
const post=data=>parent.postMessage(data,location.origin),status=document.getElementById('status');
const scene=new THREE.Scene();scene.background=new THREE.Color('#e9eff0');
let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true});}catch{status.textContent='Không khởi tạo được 3D. Bật tăng tốc đồ họa trong trình duyệt rồi tải lại.';post({type:'vr-model-error',message:status.textContent});throw Error(status.textContent);}renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;document.body.prepend(renderer.domElement);
const camera=new THREE.PerspectiveCamera(42,1,.001,100),controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.49;
scene.add(new THREE.HemisphereLight(0xffffff,0xffffff,2));for(const xyz of [[3,4,3],[-3,4,3],[-3,4,-3],[3,4,-3]]){const light=new THREE.DirectionalLight(0xffffff,1.2);light.position.set(...xyz);scene.add(light);}
const terrain=new THREE.Group(),robot=new THREE.Group(),body=new THREE.Group();robot.add(body);scene.add(terrain,robot);terrain.visible=!previewOnly;
const previewSize=new THREE.Vector3();
const cargo=new THREE.Group(),checkpoints=new THREE.Group();scene.add(cargo,checkpoints);const cargoMeshes=new Map();robot.userData.edit={kind:'start'};
const ink=new THREE.Mesh(new THREE.BufferGeometry(),new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide}));ink.frustumCulled=false;scene.add(ink);
const arrow=new THREE.ArrowHelper(new THREE.Vector3(0,0,-1),new THREE.Vector3(0,.04,0),.2,0x167caa,.045,.028);robot.add(arrow);arrow.visible=!previewOnly;
const eye=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),new THREE.LineBasicMaterial({color:0x2cbbb0,transparent:true,opacity:.8}));eye.frustumCulled=false;scene.add(eye);
const trail=new THREE.Line(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0xe58b46}));scene.add(trail);
let field=null,pose=null,mode='follow',trace=true,lastRevision=null,points=[],generation=0,modelReady=false,editing=false,drag=null;
const colors={red:'#df5361',green:'#31965b',blue:'#397fd6'},color=c=>colors[c]||c;
function ring(point,tint,editable){const group=new THREE.Group(),disk=new THREE.Mesh(new THREE.CircleGeometry(point.radius*.001,48),new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.12,side:THREE.DoubleSide})),edge=new THREE.Mesh(new THREE.RingGeometry(point.radius*.0009,point.radius*.001,48),new THREE.MeshBasicMaterial({color:tint,side:THREE.DoubleSide}));for(const obj of [disk,edge]){obj.rotation.x=-Math.PI/2;group.add(obj);}group.position.set(point.x*.001,.004,point.y*.001);group.userData.edit=editable;return group;}
function syncObjects(blocks){for(const b of blocks||[]){let mesh=cargoMeshes.get(b.id);if(!mesh){mesh=b.pushable?box(b.width*.001,.06,b.height*.001,color(b.color),0,0,0):new THREE.Mesh(new THREE.CylinderGeometry(Math.max(b.width,b.height)*.0005,Math.max(b.width,b.height)*.0005,.02,32),new THREE.MeshStandardMaterial({color:color(b.color),roughness:.8}));mesh.userData.edit={kind:'block',id:b.id};cargo.add(mesh);cargoMeshes.set(b.id,mesh);}if(drag?.object!==mesh)mesh.position.set(b.x*.001,b.pushable ? .03 : pose?.carryingId===b.id ? .045 : .012,b.y*.001);}}
function syncInk(strokes){const positions=[],tints=[];for(const s of strokes||[]){const dx=s.x2-s.x1,dz=s.y2-s.y1,len=Math.hypot(dx,dz);if(!len)continue;const nx=-dz/len*s.width*.0005,nz=dx/len*s.width*.0005,a=[s.x1*.001+nx,.007,s.y1*.001+nz],b=[s.x1*.001-nx,.007,s.y1*.001-nz],c=[s.x2*.001+nx,.007,s.y2*.001+nz],d=[s.x2*.001-nx,.007,s.y2*.001-nz],tint=new THREE.Color(s.color);for(const vertex of [a,b,c,b,d,c]){positions.push(...vertex);tints.push(tint.r,tint.g,tint.b);}}ink.geometry.dispose();ink.geometry=new THREE.BufferGeometry();ink.geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));ink.geometry.setAttribute('color',new THREE.Float32BufferAttribute(tints,3));}
const loader=new GLTFLoader(),cache=new Map();
function clear(group,dispose=true){for(const child of [...group.children]){group.remove(child);if(dispose)child.traverse(mesh=>{mesh.geometry?.dispose();for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material])material?.dispose();});}}
function box(width,height,depth,color,x,y,z){const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),new THREE.MeshStandardMaterial({color,roughness:.9}));mesh.position.set(x,y,z);return mesh;}
function sample(){const group=new THREE.Group();group.add(box(.16,.035,.21,'#6dba3e',0,.065,0),box(.12,.05,.10,'#d2d4d0',0,.105,.015),box(.07,.033,.055,'#b7bcc0',0,.143,.015));for(const x of [-.092,.092])for(const z of [-.065,.065]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.038,.038,.025,24),new THREE.MeshStandardMaterial({color:'#283842',roughness:.9}));wheel.rotation.z=Math.PI/2;wheel.position.set(x,.038,z);group.add(wheel);}group.add(box(.045,.025,.028,'#f0bd4f',0,.09,-.112));return group;}
async function cad(part,platform,refs,entry){
 const root=platform==='vexiq'?'/assembly/iq/':'/assembly/',key=root+part.sku;
 if(!cache.has(key))cache.set(key,loader.loadAsync(root+'parts/'+encodeURIComponent(part.sku)+'/model.glb').then(g=>{
  g.scene.traverse(mesh=>{if(!mesh.isMesh)return;for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){if(material.isMeshStandardMaterial){material.metalness=0;material.roughness=.85;}}});
  if(platform==='vexgo'&&part.sku.startsWith('269-')&&part.sku!=='269-6685-000'){
   const bodyBounds=new THREE.Box3();for(const ref of refs[part.sku]||[])bodyBounds.expandByPoint(new THREE.Vector3().fromArray(ref.point).multiplyScalar(.001));bodyBounds.expandByScalar(.008);if(part.sku==='269-6695-000')bodyBounds.set(new THREE.Vector3(-.013,-.013,-.0195),new THREE.Vector3(.013,.013,.001));g.scene.updateMatrixWorld(true);
   g.scene.traverse(mesh=>{if(!mesh.isMesh)return;const bounds=new THREE.Box3().setFromObject(mesh),size=bounds.getSize(new THREE.Vector3()),dims=[size.x,size.y,size.z].sort((a,b)=>a-b);mesh.userData.cable=(part.sku==='269-6686-000'&&bounds.max.y>.039)||(dims[2]>.08&&dims[1]<.012)||(!bodyBounds.isEmpty()&&!bodyBounds.intersectsBox(bounds));if(mesh.userData.cable)mesh.visible=false;});
  }
  if(platform==='vexiq')applyIQAppearance(g.scene,entry);let hasCable=false;g.scene.traverse(mesh=>{if(mesh.userData.cable)hasCable=true;});return hasCable?g.scene:optimizeStaticModel(g.scene);
 }));return (await cache.get(key)).clone(true);
}
async function load(project,catalog){
 const token=++generation;modelReady=false;status.textContent='Đang nạp mô hình CAD…';clear(body,false);body.position.set(0,0,0);body.rotation.set(0,0,0);
 try{
  const assembled=new THREE.Group(),bounds=new THREE.Box3();
  if(!project)assembled.add(sample());else{
   const root=project.platform==='vexiq'?'/assembly/iq/':'/assembly/',refs=(await fetch(root+'connectors.json').then(r=>r.json())).parts;
   const groups=new Map((project.groups||[]).map(g=>[g.id,g]));
   const shown=part=>{if(part.visible===false)return false;let id=part.groupId;while(id){const g=groups.get(id);if(!g||g.visible===false)return false;id=g.parentId;}return true;};
   for(const part of project.parts){if(token!==generation)return;const obj=await cad(part,project.platform,refs,catalog.find(p=>p.id===part.sku));if(token!==generation)return;obj.position.fromArray(part.position.map(v=>v*.001));obj.rotation.set(...part.rotation.map(THREE.MathUtils.degToRad));assembled.add(obj);bounds.union(visibleBounds(obj));obj.visible=shown(part);}
  }
  if(token!==generation)return;if(!project)bounds.copy(visibleBounds(assembled));if(bounds.isEmpty())throw Error('Mô hình không có hình học để hiển thị.');
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3()),radius=Math.hypot(size.x,size.z)*500;previewSize.copy(size);
  if(radius>1000||size.y>2)throw Error('Mô hình có các cụm quá xa nhau hoặc lớn hơn sân. Kiểm tra vị trí CAD trước.');
  assembled.position.set(-center.x,-bounds.min.y,-center.z);body.add(assembled);arrow.position.y=size.y+.035;arrow.setLength(Math.max(size.x,size.z)*.6+.08,.045,.025);modelReady=true;status.textContent='Kéo để xoay góc nhìn · Cuộn để thu phóng';post({type:'vr-model-ready',radius:Math.max(45,radius),size:[size.x*1000,size.y*1000,size.z*1000]});
 }catch(error){if(token!==generation)return;status.textContent='Không nạp được CAD: '+error.message;post({type:'vr-model-error',message:error.message});}
}
function drawField(next){field=next;clear(terrain);clear(cargo);clear(checkpoints);cargoMeshes.clear();syncInk([]);const w=field.width*.001,h=field.height*.001;const floor=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({color:'#f7f8f2',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.set(w/2,-.002,h/2);terrain.add(floor);const grid=new THREE.GridHelper(Math.max(w,h),24,0xabb9b5,0xd8e0da);grid.position.set(w/2,0,h/2);terrain.add(grid);
 for(const [i,wall] of field.walls.entries()){const mesh=box(wall.width*.001,.18,wall.height*.001,'#52716f',(wall.x+wall.width/2)*.001,.09,(wall.y+wall.height/2)*.001);mesh.userData.edit={kind:'wall',id:wall.id??String(i)};terrain.add(mesh);}
 if(field.objective!=='delivery')terrain.add(ring(field.goal,'#59aa6d',{kind:'goal'}));
 for(const [i,zone] of (field.zones||[]).entries())terrain.add(ring(zone,color(zone.color),{kind:'zone',id:zone.id??String(i)}));
 for(const [i,point] of (field.checkpoints||[]).entries()){const marker=ring(point,'#e8a74e',{kind:'checkpoint',id:String(i)});const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d');ctx.fillStyle='#62430c';ctx.font='bold 40px sans-serif';ctx.textAlign='center';ctx.fillText(String(i+1),32,46);const label=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(canvas),depthTest:false}));label.scale.set(.07,.07,.07);label.position.y=.025;marker.add(label);checkpoints.add(marker);}
 syncObjects(field.blocks);
 for(const [x,z] of [[0,0],[w,0],[0,h],[w,h]])terrain.add(box(.025,.055,.025,'#a1b3ad',x,.027,z));points=[];trail.geometry.dispose();trail.geometry=new THREE.BufferGeometry();setView(mode);}
function setView(next){mode=next;if(!field)return;controls.enabled=mode!=='follow'&&!editing;const target=new THREE.Vector3(field.width*.0005,0,field.height*.0005),span=Math.max(field.width,field.height)*.001;
 if(previewOnly&&modelReady){target.y=previewSize.y/2;const halfFov=THREE.MathUtils.degToRad(camera.fov/2),angle=Math.min(halfFov,Math.atan(Math.tan(halfFov)*camera.aspect)),distance=Math.max(.025,previewSize.length()/2)/Math.sin(angle)*1.15;controls.target.copy(target);camera.position.copy(target).add(new THREE.Vector3(1,.8,1).normalize().multiplyScalar(distance));}
 else{controls.target.copy(target);camera.position.copy(target).add(mode==='top'?new THREE.Vector3(0,span*1.55,.001):new THREE.Vector3(span,span*1.12,span));}
 camera.lookAt(target);controls.update();}
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==parent)return;const message=event.data;
 if(message?.type==='vr-init')load(message.project,message.catalog||[]);
 if(message?.type==='vr-field')drawField(message.field);
 if(message?.type==='vr-view')setView(message.mode);
 if(message?.type==='vr-edit-mode'){editing=!!message.enabled;controls.enabled=!editing&&mode!=='follow';renderer.domElement.style.cursor=editing?'grab':'default';}
 if(message?.type==='vr-trail'){trace=!!message.visible;trail.visible=trace;}
 if(message?.type==='vr-pose'){
  if(![message.x,message.y,message.heading].every(Number.isFinite))return;
  if(lastRevision!==message.revision){lastRevision=message.revision;points=[];trail.geometry.dispose();trail.geometry=new THREE.BufferGeometry();robot.position.set(message.x*.001,0,message.y*.001);}
  pose=message;const point=new THREE.Vector3(message.x*.001,.006,message.y*.001);
  syncObjects(message.blocks);syncInk(message.strokes);for(const [i,marker] of checkpoints.children.entries()){const tint=i<(message.checkpointIndex||0)?'#59aa6d':i===(message.checkpointIndex||0)?'#e8a74e':'#a3aaa8';marker.children[1].material.color.set(tint);}
  if(trace&&(!points.length||points.at(-1).distanceTo(point)>.003)){points.push(point);if(points.length>4000)points.shift();trail.geometry.dispose();trail.geometry=new THREE.BufferGeometry().setFromPoints(points);}
 }
});
const ray=new THREE.Raycaster(),ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),pointer=new THREE.Vector2();
function hitGround(event){const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);return ray.ray.intersectPlane(ground,new THREE.Vector3());}
renderer.domElement.addEventListener('pointerdown',event=>{if(!editing||event.button!==0)return;const point=hitGround(event);if(!point)return;const hits=ray.intersectObjects([...terrain.children,...cargo.children,...checkpoints.children,robot],true);for(const hit of hits){let node=hit.object;while(node&&!node.userData.edit)node=node.parent;if(node){drag={object:node,edit:node.userData.edit,offset:node.position.clone().sub(point)};renderer.domElement.setPointerCapture(event.pointerId);renderer.domElement.style.cursor='grabbing';break;}}});
renderer.domElement.addEventListener('pointermove',event=>{if(!drag)return;const point=hitGround(event);if(point){drag.object.position.x=point.x+drag.offset.x;drag.object.position.z=point.z+drag.offset.z;}});
renderer.domElement.addEventListener('pointerup',()=>{if(!drag)return;post({type:'vr-edit',edit:{...drag.edit,x:drag.object.position.x*1000,y:drag.object.position.z*1000}});drag=null;renderer.domElement.style.cursor='grab';});
renderer.domElement.addEventListener('pointercancel',()=>{if(drag){drag=null;drawField(field);}});
new ResizeObserver(()=>{renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}).observe(document.body);
function animate(){requestAnimationFrame(animate);if(pose&&field&&modelReady){const target=new THREE.Vector3(pose.x*.001,0,pose.y*.001);if(drag?.object!==robot)robot.position.lerp(target,.35);robot.rotation.y=THREE.MathUtils.degToRad(-pose.heading);body.rotation.y=THREE.MathUtils.degToRad(field.robot?.yaw||0);if(mode==='follow'){const offset=new THREE.Vector3(0,.55,.75).applyAxisAngle(new THREE.Vector3(0,1,0),robot.rotation.y);camera.position.lerp(target.clone().add(offset),.12);camera.lookAt(target.clone().add(new THREE.Vector3(0,.08,0)));}const length=pose.eyeDistance??400,from=new THREE.Vector3(0,.05,-(field.robot?.radius||45)*.001).applyAxisAngle(new THREE.Vector3(0,1,0),robot.rotation.y).add(robot.position),to=new THREE.Vector3(0,0,-length*.001).applyAxisAngle(new THREE.Vector3(0,1,0),robot.rotation.y).add(from);eye.visible=!previewOnly&&!!field.robot?.eye;const positions=eye.geometry.attributes.position;positions.setXYZ(0,from.x,from.y,from.z);positions.setXYZ(1,to.x,to.y,to.z);positions.needsUpdate=true;}if(mode!=='follow')controls.update();renderer.render(scene,camera);}
animate();post({type:'vr-viewer-ready'});
