import * as THREE from './vendor/three.module.js';
import {analyzeCollisions} from './collision.js';
const geometries=new Map();
self.onmessage=e=>{
 const {id,parts,groups,geometryData}=e.data;
 try{
  for(const g of geometryData){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(g.position,3));if(g.index)geometry.setIndex(new THREE.BufferAttribute(g.index,1));geometries.set(g.id,geometry);}
  const objects=new Map();
  for(const record of groups){const group=new THREE.Group();for(const item of record.meshes){const mesh=new THREE.Mesh(geometries.get(item.geometry));mesh.matrixAutoUpdate=false;mesh.matrix.fromArray(item.matrix);group.add(mesh);}objects.set(record.id,group);}
  self.postMessage({id,report:analyzeCollisions(parts,objects)});
 }catch(error){self.postMessage({id,error:error.message});}
};
