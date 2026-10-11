import * as THREE from 'three';
import {worldReference} from './mating.js?v=compatibility-27';

// Dedicated print renderer: no editor camera, UI dimensions, grid or selection helpers.
export function createGuideRenderer(){
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
 renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('white');
 scene.add(new THREE.HemisphereLight(0xffffff,0xc8cdd1,1.4));
 for(const p of [[2,3,2],[-2,2,2],[-2,2,-2],[2,2,-2]]){const light=new THREE.DirectionalLight(0xffffff,.65);light.position.set(...p);scene.add(light);}
 const group=new THREE.Group();scene.add(group);
 const directions=[[1,.8,1],[-1,.8,1],[1,.8,-1],[-1,.8,-1],[1,.3,1],[-1,.3,1],[1,-.5,1],[-1,-.5,-1]].map(p=>new THREE.Vector3(...p).normalize());
 const owned=[];
 function clear(){group.clear();for(const r of owned.splice(0))r.dispose();}
 function build(objects,addedId){clear();const copies=new Map();for(const [id,obj] of objects){const copy=obj.clone(true);copy.visible=true;copy.traverse(mesh=>{if(!mesh.isMesh)return;const isNew=id===addedId,geometry=new THREE.EdgesGeometry(mesh.geometry,35),material=new THREE.LineBasicMaterial({color:isNew?0xed1c24:0x687078,transparent:true,opacity:isNew?.85:.28});owned.push(geometry,material);mesh.add(new THREE.LineSegments(geometry,material));});group.add(copy);copies.set(id,copy);}group.updateMatrixWorld(true);return copies;}
 function cameraFor(bounds,direction,width,height){
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,.00001,10);
  camera.position.copy(center).addScaledVector(direction,Math.max(.1,size.length()*3));camera.lookAt(center);camera.updateMatrixWorld(true);
  const inverse=camera.matrixWorldInverse;let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const p=new THREE.Vector3(x,y,z).applyMatrix4(inverse);minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}
  const halfHeight=Math.max((maxY-minY)/2,(maxX-minX)/2/(width/height),.002)*1.12,halfWidth=halfHeight*width/height;
  // Projected AABB center is often different from the orbit target: center both axes.
  camera.left=(minX+maxX)/2-halfWidth;camera.right=(minX+maxX)/2+halfWidth;camera.bottom=(minY+maxY)/2-halfHeight;camera.top=(minY+maxY)/2+halfHeight;camera.updateProjectionMatrix();return camera;
 }
 function choose(bounds,point){if(!point)return directions[0];const center=bounds.getCenter(new THREE.Vector3()),distance=Math.max(bounds.getSize(new THREE.Vector3()).length()*3,.2);const ray=new THREE.Raycaster();let best=directions[0],score=-Infinity;
  for(let i=0;i<directions.length;i++){const d=directions[i],origin=point.clone().addScaledVector(d,distance);ray.set(origin,d.clone().negate());const hits=ray.intersectObject(group,true).filter(h=>h.object.isMesh&&h.distance<distance-.0015);const value=-hits.length*20-i*.1+point.clone().sub(center).dot(d);if(value>score){score=value;best=d;}}
  return best;
 }
 function capture(bounds,direction,width,height){renderer.setSize(width,height,false);const camera=cameraFor(bounds,direction,width,height);renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');}
 return {
  render(objects,step,references){
   const joint=step.joint,copies=build(objects,joint?.part),bounds=new THREE.Box3().setFromObject(group);
   const part=step.parts.find(p=>p.id===joint?.part),target=step.parts.find(p=>p.id===joint?.target);
   const ref=references[target?.sku]?.find(r=>r.id===joint?.targetRef);
   const socket=target&&ref?worldReference(target,ref):null;
   const point=socket?.point.clone().multiplyScalar(.001),direction=choose(bounds,point);
   const assembled=capture(bounds,directions[0],1800,1100);
   let detail=null;
   if(part&&socket){
    // Only the newly added piece is exploded; all earlier parts remain where saved.
    const added=copies.get(part.id),targetObject=copies.get(target.id),axis=socket.normal;
    const offset=Math.max(.012,Math.min(.035,new THREE.Box3().setFromObject(added).getSize(new THREE.Vector3()).length()*.45));
    added.position.addScaledVector(axis,offset);group.updateMatrixWorld(true);
    const arrow=new THREE.ArrowHelper(axis.clone().negate(),point.clone().addScaledVector(axis,offset*.92),offset*.8,0xed1c24,.004,.003);group.add(arrow);for(const mesh of [arrow.line,arrow.cone]){mesh.material.depthTest=false;mesh.material.depthWrite=false;mesh.renderOrder=1000;}owned.push(arrow.line.geometry,arrow.line.material,arrow.cone.geometry,arrow.cone.material);
    const detailBounds=(row,obj)=>{
     if(!row.sku.startsWith('269-')||!references[row.sku]?.length)return new THREE.Box3().setFromObject(obj);
     // Motor CAD includes a long straight cable. Close-ups frame its original mounting
     // features instead; the full, unmodified cable remains in the overview image.
     const result=new THREE.Box3();for(const r of references[row.sku])result.expandByPoint(worldReference(row,r).point.multiplyScalar(.001));return result.expandByScalar(.008);
    };
    const addedBounds=detailBounds(part,added);if(part.sku.startsWith('269-'))addedBounds.translate(axis.clone().multiplyScalar(offset));
    const focus=addedBounds.clone().union(detailBounds(target,targetObject));
    const size=focus.getSize(new THREE.Vector3());const max=Math.max(.025,addedBounds.getSize(new THREE.Vector3()).length()*1.6);
    if(size.length()>max*2){focus.setFromCenterAndSize(point.clone().addScaledVector(axis,offset/2),new THREE.Vector3(max,max,max));}
    detail=capture(focus,direction,900,650);
   }
   return {assembled,detail};
  },
  dispose(){clear();renderer.dispose();renderer.forceContextLoss();},
 };
}
