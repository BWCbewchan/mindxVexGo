import * as THREE from 'three';
const ports={battery:[-19.05,23.7,0],eye:[19.05,23.7,0],'1':[-19.05,-23.7,0],'2':[-6.35,-23.7,0],'3':[6.35,-23.7,0],'4':[19.05,-23.7,0]};
const transform=(part,point)=>new THREE.Vector3().fromArray(point).multiplyScalar(.001).applyEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad))).add(new THREE.Vector3().fromArray(part.position).multiplyScalar(.001));
export function routeWire(start,end,boxes,sourceId,targetId){
 const all=new THREE.Box3();for(const box of boxes.values())all.union(box);if(all.isEmpty())return [start,end];
 const ray=new THREE.Ray(),hit=new THREE.Vector3();
 const clear=(a,b,skip)=>{ray.direction.subVectors(b,a);const length=ray.direction.length();if(length<1e-7)return true;ray.origin.copy(a);ray.direction.divideScalar(length);for(const [id,box] of boxes){if(id===skip)continue;if(box.containsPoint(a)||box.containsPoint(b))return false;if(ray.intersectBox(box,hit)&&hit.distanceTo(a)<length-.0001)return false;}return true;};
 const exits=(point,box)=>{if(!box)return [point];return ['x','y','z'].flatMap(axis=>['min','max'].map(side=>{const p=point.clone();p[axis]=box[side][axis]+(side==='min'?-.006:.006);return p;}));};
 let best=null,bestLength=Infinity;
 const outside=all.clone().expandByScalar(.012);
 const entrances=exits(start,boxes.get(sourceId)).filter(point=>clear(start,point,sourceId));
 const destinations=exits(end,boxes.get(targetId)).filter(point=>clear(point,end,targetId));
 for(const a of entrances)for(const b of destinations){
  const routes=[[a,b]];
  for(const axis of ['x','y','z'])for(const side of ['min','max']){const x=a.clone(),y=b.clone();x[axis]=y[axis]=outside[side][axis];routes.push([a,x,y,b]);}
  for(const middle of routes){if(middle.some((point,i)=>i&& !clear(middle[i-1],point)))continue;const points=[start,...middle,end],length=points.reduce((sum,p,i)=>sum+(i?p.distanceTo(points[i-1]):0),0);if(length<bestLength){best=points;bestLength=length;}}
 }
 return best?.filter((p,i)=>!i||p.distanceTo(best[i-1])>1e-7)||null;
}
export function installWiring3D(scene,getObjects=()=>new Map(),report=()=>{}){
 const group=new THREE.Group();group.name='Connected flexible wires';scene.add(group);let signature='';
 function clear(){for(const obj of [...group.children]){obj.geometry.dispose();obj.material.dispose();group.remove(obj);}}
 const meshBounds=new THREE.Box3(),ray=new THREE.Ray(),hit=new THREE.Vector3();
 return {update(parts,hidden){
  if(hidden||!parts.some(part=>part.wiring)){
   if(signature){signature='';clear();}
   return;
  }
  const objects=getObjects();
  const next=JSON.stringify(parts.map(p=>[p.id,p.sku,p.position,p.rotation,p.wiring,objects.get(p.id)?.visible]));
  if(next===signature)return;
  signature=next;clear();
  const byId=new Map(parts.map(part=>[part.id,part])),boxes=new Map();
  for(const [id,obj] of objects){
   if(!obj.visible)continue;
   const box=new THREE.Box3();obj.updateWorldMatrix(true,true);
   obj.traverseVisible(mesh=>{
    if(!mesh.isMesh||mesh.userData.cable)return;
    if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
    box.union(meshBounds.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld));
   });
   if(!box.isEmpty())boxes.set(id,box.expandByScalar(.003));
  }
  for(const device of parts){const wire=device.wiring,brain=byId.get(wire?.brain);if(!brain||!ports[wire.port])continue;
   const start=transform(device,device.sku==='269-6686-000'?[0,38.1,-9.5]:[0,0,0]),end=transform(brain,ports[wire.port]);
   const points=routeWire(start,end,boxes,device.id,brain.id);
   if(!points){report('Dây chưa được vẽ: không tìm thấy đường tránh vật cản. Cần chỉnh vị trí thiết bị hoặc cổng nối.');continue;}
   // Linear segments stay inside the verified corridor; spline overshoot can
   // reintroduce body crossings even when all control points are outside.
   const rounded=new THREE.CatmullRomCurve3(points,false,'centripetal');
   const samples=rounded.getPoints(160);let safe=true;
   for(let i=1;i<samples.length&&safe;i++){
    const a=samples[i-1],b=samples[i];ray.direction.subVectors(b,a);const length=ray.direction.length();if(length<1e-8)continue;
    ray.origin.copy(a);ray.direction.divideScalar(length);
    for(const [id,box] of boxes){if(id===device.id&&i<12||id===brain.id&&i>148)continue;if(box.containsPoint(a)||ray.intersectBox(box,hit)&&hit.distanceTo(a)<length){safe=false;break;}}
   }
   let curve=rounded;if(!safe){curve=new THREE.CurvePath();for(let i=1;i<points.length;i++)curve.add(new THREE.LineCurve3(points[i-1],points[i]));}
   const color=wire.port==='battery'?0xff671f:wire.port==='eye'?0x007377:0x34383a;
   const cable=new THREE.Mesh(new THREE.TubeGeometry(curve,100,.0014,8,false),new THREE.MeshStandardMaterial({color,roughness:.8}));cable.userData.wiring=true;group.add(cable);
   const plug=new THREE.Mesh(new THREE.BoxGeometry(.005,.007,.004),new THREE.MeshStandardMaterial({color}));plug.position.copy(end);plug.rotation.set(...brain.rotation.map(THREE.MathUtils.degToRad));plug.userData.wiring=true;group.add(plug);
  }
 }};
}
