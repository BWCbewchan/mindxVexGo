import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Reduce CAD draw calls without changing vertices, normals, colors or part origin.
export function optimizeStaticModel(root){
 root.updateMatrixWorld(true);
 const meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});
 if(meshes.length<16||meshes.some(o=>o.isSkinnedMesh||o.isInstancedMesh||!o.visible||o.geometry.morphAttributes.position?.length||
  Object.values(o.geometry.attributes).some(attribute=>attribute.isInterleavedBufferAttribute)||Array.isArray(o.material)&&!o.geometry.groups.length))return root;
 const groups=new Map(),inverse=root.matrixWorld.clone().invert();
 for(const mesh of meshes){
  const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  const source=Array.isArray(mesh.material)?(mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry):mesh.geometry;
  const sections=Array.isArray(mesh.material)?source.groups:[{start:0,count:Infinity,materialIndex:0}];
  for(const section of sections){
  const mat=materials[section.materialIndex];if(!mat)continue;
  const data=mat.toJSON();delete data.uuid;delete data.name;delete data.metadata;
  const key=JSON.stringify(data),group=groups.get(key)||{material:mat,geometries:[]};
  let geometry;
  if(Array.isArray(mesh.material)){
   geometry=new THREE.BufferGeometry();
   for(const [name,attribute] of Object.entries(source.attributes)){
    const start=section.start*attribute.itemSize,end=(section.start+section.count)*attribute.itemSize;
    geometry.setAttribute(name,new THREE.BufferAttribute(attribute.array.slice(start,end),attribute.itemSize,attribute.normalized));
   }
  }else geometry=source.clone();
  if(geometry.index){const expanded=geometry.toNonIndexed();geometry.dispose();geometry=expanded;}
  geometry.applyMatrix4(inverse.clone().multiply(mesh.matrixWorld));
  group.geometries.push(geometry);groups.set(key,group);
  }
  if(source!==mesh.geometry)source.dispose();
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
