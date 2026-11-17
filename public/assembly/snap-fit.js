import * as THREE from 'three';
import {collisionMesh,partContact} from './collision.js?v=physical-snap-112';

export function createSnapFitValidator(objects,getReferences){
 const shapes=new Map(),poses=new Map(),rotation=new THREE.Euler(),quaternion=new THREE.Quaternion(),position=new THREE.Vector3();
 function shape(part,extras){
  const object=extras?.get(part.id)||objects.get(part.id);if(!object)return null;
  let entry=shapes.get(part.sku);
  if(!entry){object.updateWorldMatrix(true,true);const mesh=collisionMesh(object);entry={geometry:mesh.geometry,relative:object.matrixWorld.clone().invert().multiply(mesh.matrixWorld),scale:object.scale.clone()};shapes.set(part.sku,entry);}
  const key=JSON.stringify([part.sku,part.position,part.rotation]),cached=poses.get(part.id);
  if(cached?.key===key&&cached.entry===entry)return cached.value;
  const mesh=new THREE.Mesh(entry.geometry,null);mesh.matrixAutoUpdate=false;
  quaternion.setFromEuler(rotation.set(...part.rotation.map(THREE.MathUtils.degToRad)));position.fromArray(part.position).multiplyScalar(.001);
  mesh.matrixWorld.compose(position,quaternion,entry.scale).multiply(entry.relative);
  if(!entry.geometry.boundingBox)entry.geometry.computeBoundingBox();
  const value={mesh,bounds:entry.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld)};
  if(poses.size>=512)poses.delete(poses.keys().next().value);poses.set(part.id,{key,entry,value});return value;
 }
 return {clear(){shapes.clear();poses.clear();},check(parts,ids,{extraObjects,limit=1}={}){
  const moving=new Set(ids),rows=parts.map(part=>({part,shape:shape(part,extraObjects)})),issues=[],references=getReferences();
  if([...moving].some(id=>!rows.some(row=>row.part.id===id&&row.shape)))return {ok:false,issues,reason:'CAD geometry is not ready'};
  for(const a of rows){if(!moving.has(a.part.id)||!a.shape)continue;
   for(const b of rows){if(moving.has(b.part.id)||!b.shape||!a.shape.bounds.intersectsBox(b.shape.bounds))continue;
    if(partContact(a.part,b.part,a.shape.mesh,b.shape.mesh,references,1)!=='penetration')continue;
    issues.push({a:a.part.id,b:b.part.id,key:[a.part.id,b.part.id].sort().join('|'),kind:'penetration'});if(issues.length>=limit)return {ok:false,issues};
   }
  }
  return {ok:true,issues};
 }};
}
