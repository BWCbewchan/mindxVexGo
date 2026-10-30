import {visibleBounds} from './visible-bounds.js';
import * as THREE from 'three';
import {worldReference} from './mating.js?v=compatibility-27';
import {seatedConnections} from './assembly-review.js';

// Dedicated print renderer: no editor camera, UI dimensions, grid or selection helpers.
export function createGuideRenderer(){
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
 renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('white');
 scene.add(new THREE.HemisphereLight(0xffffff,0xc8cdd1,1.4));
 for(const p of [[2,3,2],[-2,2,2],[-2,2,-2],[2,2,-2]]){const light=new THREE.DirectionalLight(0xffffff,.65);light.position.set(...p);scene.add(light);}
 const group=new THREE.Group();scene.add(group);
 const directions=[[1,.8,1],[-1,.8,1],[1,.8,-1],[-1,.8,-1],[1,.3,1],[-1,.3,1],[1,-.5,1],[-1,-.5,-1]].map(p=>new THREE.Vector3(...p).normalize());
 const owned=[],edgeCache=new Map();
 function clear(){group.clear();for(const r of owned.splice(0))r.dispose();}
 function bodyHits(ray,roots){const meshes=[];for(const root of roots)root.traverseVisible(obj=>{if(obj.isMesh&&!obj.userData.guideAnnotation)meshes.push(obj);});return ray.intersectObjects(meshes,false);}
 function build(objects,addedId){clear();const copies=new Map();for(const [id,obj] of objects){const copy=obj.clone(true);copy.visible=true;copy.traverseVisible(mesh=>{if(!mesh.isMesh)return;if(!edgeCache.has(mesh.geometry))edgeCache.set(mesh.geometry,new THREE.EdgesGeometry(mesh.geometry,35));const isNew=addedId instanceof Set?addedId.has(id):id===addedId,geometry=edgeCache.get(mesh.geometry),material=new THREE.LineBasicMaterial({color:isNew?0xed1c24:0x687078,transparent:true,opacity:isNew?.85:.28});owned.push(material);mesh.add(new THREE.LineSegments(geometry,material));});group.add(copy);copies.set(id,copy);}group.updateMatrixWorld(true);return copies;}
 function cameraFor(bounds,direction,width,height){
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,.00001,10);
  camera.position.copy(center).addScaledVector(direction,Math.max(.1,size.length()*3));camera.lookAt(center);camera.updateMatrixWorld(true);
  const inverse=camera.matrixWorldInverse;let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const p=new THREE.Vector3(x,y,z).applyMatrix4(inverse);minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}
  const halfHeight=Math.max((maxY-minY)/2,(maxX-minX)/2/(width/height),.002)*1.06,halfWidth=halfHeight*width/height;
  // Projected AABB center is often different from the orbit target: center both axes.
  camera.left=(minX+maxX)/2-halfWidth;camera.right=(minX+maxX)/2+halfWidth;camera.bottom=(minY+maxY)/2-halfHeight;camera.top=(minY+maxY)/2+halfHeight;camera.updateProjectionMatrix();return camera;
 }
 function choose(bounds,point){if(!point)return directions[0];const center=bounds.getCenter(new THREE.Vector3()),distance=Math.max(bounds.getSize(new THREE.Vector3()).length()*3,.2);const ray=new THREE.Raycaster();let best=directions[0],score=-Infinity;
  for(let i=0;i<directions.length;i++){const d=directions[i],origin=point.clone().addScaledVector(d,distance);ray.set(origin,d.clone().negate());const hits=bodyHits(ray,[group]).filter(h=>h.distance<distance-.0015);const value=-hits.length*20-i*.1+point.clone().sub(center).dot(d);if(value>score){score=value;best=d;}}
  return best;
 }
 function capture(bounds,direction,width,height){renderer.setSize(width,height,false);const camera=cameraFor(bounds,direction,width,height);renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');}
 return {
  completed(objects){build(objects);const bounds=visibleBounds(group);return capture(bounds,directions[0],2200,1200);},
  render(objects,step,references){
   const joint=step.joint,copies=build(objects,new Set(step.added.map(p=>p.id))),bounds=visibleBounds(group);
   const part=step.parts.find(p=>p.id===joint?.part),target=step.parts.find(p=>p.id===joint?.target);
   const ref=references[target?.sku]?.find(r=>r.id===joint?.targetRef);
   const socket=target&&ref?worldReference(target,ref):null;
   const views={front:[0,.15,1],rear:[0,.15,-1],left:[-1,.15,0],right:[1,.15,0],top:[0,1,.001],bottom:[0,-1,.001]};
   const point=socket?.point.clone().multiplyScalar(.001),direction=views[step.view]?new THREE.Vector3(...views[step.view]).normalize():step.overviewDirection?new THREE.Vector3(...step.overviewDirection).normalize():choose(bounds,point);
   const markHole=(location)=>{const geometry=new THREE.SphereGeometry(.0018,20,12),material=new THREE.MeshBasicMaterial({color:0xa855f7,depthTest:false,depthWrite:false});const dot=new THREE.Mesh(geometry,material);dot.userData.guideAnnotation=true;dot.position.copy(location);dot.renderOrder=1100;group.add(dot);owned.push(geometry,material);};
   if(socket){
    const sourceRef=references[part?.sku]?.find(r=>r.id===joint.sourceRef);
    const hole=ref.kind==='hole'?socket:sourceRef?.kind==='hole'?worldReference(part,sourceRef):null;
    if(hole)markHole(hole.point.clone().multiplyScalar(.001));
   }
   for(const item of step.added){if(item.id===joint?.part)continue;const row=step.parts.find(p=>p.id===item.id),parent=step.parts.find(p=>p.id===row?.mate?.target),ref=references[parent?.sku]?.find(r=>r.id===row?.mate?.targetRef);if(ref?.kind==='hole')markHole(worldReference(parent,ref).point.multiplyScalar(.001));}
   // Mark every seated hole on a newly installed member, including secondary pins.
   const addedSet=new Set(step.added.map(p=>p.id));for(const contact of seatedConnections(step.parts,references))if(addedSet.has(contact.part)||addedSet.has(contact.target)){const row=step.parts.find(p=>p.id===contact.part),hole=references[row.sku]?.find(r=>r.id===contact.sourceRef);if(hole)markHole(worldReference(row,hole).point.multiplyScalar(.001));}
   const assembled=capture(bounds,direction,1400,1400);
   let detail=null;
   if(part&&socket){
    // Only the newly added piece is exploded; all earlier parts remain where saved.
    const added=copies.get(part.id),targetObject=copies.get(target.id),axis=step.insertion?new THREE.Vector3(...step.insertion.axis).normalize():socket.normal;
    const offset=step.insertion?Math.max(.012,step.insertion.clearance/1000):Math.max(.012,Math.min(.035,new THREE.Box3().setFromObject(added).getSize(new THREE.Vector3()).length()*.45));
    const ray=new THREE.Raycaster(point.clone().addScaledVector(axis,.001),axis,.001,offset);
    const obstacles=[...copies].filter(([id])=>!step.added.some(p=>p.id===id)&&id!==target.id).map(([,obj])=>obj);
    const obstructed=!step.insertion&&bodyHits(ray,obstacles).length>0;
    if(obstructed){const focus=new THREE.Box3().setFromObject(added).union(new THREE.Box3().setFromObject(targetObject));return {assembled,detail:capture(focus,choose(focus,point),900,900),seatedDetail:true};}
    const addedIds=new Set(step.added.map(p=>p.id));for(const [id,obj] of copies)if(addedIds.has(id)&&id!==target.id)obj.position.addScaledVector(axis,offset);group.updateMatrixWorld(true);
    const arrowPoints=[point];for(const item of step.added){if(item.id===part.id||item.id===target.id)continue;const row=step.parts.find(p=>p.id===item.id),anchor=step.parts.find(p=>p.id===row?.mate?.target),r=references[anchor?.sku]?.find(r=>r.id===row?.mate?.targetRef);if(!r)continue;const socket=worldReference(anchor,r);if(socket.normal.dot(axis)>.999)arrowPoints.push(socket.point.multiplyScalar(.001));}
    for(const location of arrowPoints){const arrow=new THREE.ArrowHelper(axis.clone().negate(),location.clone().addScaledVector(axis,offset*.92),offset*.8,0xed1c24,.004,.003);group.add(arrow);for(const mesh of [arrow.line,arrow.cone]){mesh.userData.guideAnnotation=true;mesh.material.depthTest=false;mesh.material.depthWrite=false;mesh.renderOrder=1000;}owned.push(arrow.line.geometry,arrow.line.material,arrow.cone.geometry,arrow.cone.material);}
    const detailBounds=(row,obj)=>{
     if(!row.sku.startsWith('269-')||!references[row.sku]?.length)return new THREE.Box3().setFromObject(obj);
     // Motor CAD includes a long straight cable. Close-ups frame its original mounting
     // features instead; the full, unmodified cable remains in the overview image.
     const result=new THREE.Box3();for(const r of references[row.sku])result.expandByPoint(worldReference(row,r).point.multiplyScalar(.001));return result.expandByScalar(.008);
    };
    const addedBounds=detailBounds(part,added);if(part.sku.startsWith('269-'))addedBounds.translate(axis.clone().multiplyScalar(offset));
    const focus=addedBounds.clone().union(detailBounds(target,targetObject));for(const item of step.added){if(item.id===target.id||item.id===part.id)continue;const obj=copies.get(item.id);if(obj)focus.union(visibleBounds(obj));}
    const size=focus.getSize(new THREE.Vector3());const max=Math.max(.025,addedBounds.getSize(new THREE.Vector3()).length()*1.6);
    if(size.length()>max*2&&step.added.filter(p=>p.id!==target.id).length===1){focus.setFromCenterAndSize(point.clone().addScaledVector(axis,offset/2),new THREE.Vector3(max,max,max));}
    detail=capture(focus,choose(focus,point),900,650);
   }
   return {assembled,detail};
  },
  dispose(){clear();for(const geometry of edgeCache.values())geometry.dispose();edgeCache.clear();renderer.dispose();renderer.forceContextLoss();},
 };
}
