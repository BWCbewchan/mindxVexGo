import * as THREE from 'three';

// Only the viewport draw uses batches. Authored meshes stay available for
// selection, connector picking, collision checks and guide rendering.
export function createViewportBatches(scene){
 const batches=new Map(),hidden=[],matrix=new THREE.Matrix4();
 let disposed=false;
 function collect(objects,camera){
  const groups=new Map();
  for(const root of objects.values()){
   if(!root.visible)continue;
   root.updateWorldMatrix(true,true);
   root.traverseVisible(mesh=>{
    const material=mesh.material;
    if(!mesh.isMesh||mesh.isSkinnedMesh||mesh.isInstancedMesh||Array.isArray(material)||!material||
     material.transparent||!mesh.layers.test(camera.layers)||mesh.geometry.morphAttributes.position?.length||mesh.userData.cable||
     mesh.children.some(child=>child.visible)||mesh.matrixWorld.determinant()<=0)return;
    const key=mesh.geometry.uuid+'|'+material.uuid+'|'+mesh.renderOrder;
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push(mesh);
   });
  }
  return groups;
 }
 function draw(renderer,camera,objects){
  if(disposed||renderer.isDataRenderer)return renderer.render(scene,camera);
  const groups=collect(objects,camera),used=new Set();
  try{
   for(const [key,meshes] of groups){
    if(meshes.length<3)continue;
    used.add(key);
    let entry=batches.get(key);
    if(!entry||entry.mesh.instanceMatrix.count<meshes.length){
     if(entry){scene.remove(entry.mesh);entry.mesh.dispose();}
     const batch=new THREE.InstancedMesh(meshes[0].geometry,meshes[0].material,meshes.length);
     batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
     batch.frustumCulled=false;batch.matrixAutoUpdate=false;batch.name='Viewport copies';
     batch.renderOrder=meshes[0].renderOrder;batch.layers.mask=camera.layers.mask;
     scene.add(batch);entry={mesh:batch,matrices:[]};batches.set(key,entry);
    }
    let changed=entry.mesh.count!==meshes.length;
    entry.mesh.count=meshes.length;
    for(const [i,mesh] of meshes.entries()){
     if(!entry.matrices[i]?.equals(mesh.matrixWorld)){
      (entry.matrices[i]??=new THREE.Matrix4()).copy(mesh.matrixWorld);
      entry.mesh.setMatrixAt(i,matrix.copy(mesh.matrixWorld));changed=true;
     }
     mesh.visible=false;hidden.push(mesh);
    }
    if(changed)entry.mesh.instanceMatrix.needsUpdate=true;
    entry.mesh.visible=true;
   }
   for(const [key,entry] of batches)if(!used.has(key)){scene.remove(entry.mesh);entry.mesh.dispose();batches.delete(key);}
   renderer.render(scene,camera);
  }finally{
   for(const mesh of hidden)mesh.visible=true;
   hidden.length=0;
   for(const entry of batches.values())entry.mesh.visible=false;
  }
 }
 return {draw,dispose(){disposed=true;for(const entry of batches.values()){scene.remove(entry.mesh);entry.mesh.dispose();}batches.clear();}};
}
