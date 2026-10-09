import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Reduce CAD draw calls without changing vertices, normals, colors or part origin.
export function optimizeStaticModel(root){
 root.updateMatrixWorld(true);
 const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});
 if(meshes.length<16||meshes.some(o=>o.isSkinnedMesh||Array.isArray(o.material)||o.geometry.morphAttributes.position?.length))return root;
 const groups=new Map(),inverse=root.matrixWorld.clone().invert();
 for(const mesh of meshes){
  const mat=mesh.material,data=mat.toJSON();delete data.uuid;delete data.name;delete data.metadata;
  const key=JSON.stringify(data),group=groups.get(key)||{material:mat,geometries:[]};
  const geometry=mesh.geometry.clone().applyMatrix4(inverse.clone().multiply(mesh.matrixWorld));
  group.geometries.push(geometry);groups.set(key,group);
 }
 const result=new THREE.Group();result.name=root.name;
 result.position.copy(root.position);result.quaternion.copy(root.quaternion);result.scale.copy(root.scale);
 for(const group of groups.values()){
  const geometry=mergeGeometries(group.geometries,false);
  if(!geometry){for(const child of result.children)child.geometry.dispose();for(const g of groups.values())for(const geo of g.geometries)geo.dispose();return root;}
  result.add(new THREE.Mesh(geometry,group.material));
 }
 for(const group of groups.values())for(const geometry of group.geometries)geometry.dispose();
 return result;
}
