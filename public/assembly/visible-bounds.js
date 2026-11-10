import * as THREE from 'three';

const cachedBounds=new WeakMap();
const meshBounds=new THREE.Box3();

// Hidden CAD cable meshes must not influence selection or camera framing.
export function visibleBounds(object, bounds=new THREE.Box3()) {
 bounds.makeEmpty();
 object.updateWorldMatrix(true,true);
 object.traverseVisible(node=>{
  if(!node.isMesh||!node.geometry)return;
  if(!node.geometry.boundingBox)node.geometry.computeBoundingBox();
  bounds.union(meshBounds.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld));
 });
 return bounds;
}

// CAD mesh hierarchies are static. Their root transform changes while dragging,
// and callers invalidate the cache when they change an internal mesh's visibility.
export function cachedVisibleBounds(object){
 object.updateWorldMatrix(true,false);
 let entry=cachedBounds.get(object);
 if(!entry){
  entry={matrix:new THREE.Matrix4(),bounds:new THREE.Box3()};
  cachedBounds.set(object,entry);
 }
 if(entry.visible!==object.visible||!entry.matrix.equals(object.matrixWorld)){
  visibleBounds(object,entry.bounds);
  entry.matrix.copy(object.matrixWorld);
  entry.visible=object.visible;
 }
 return entry.bounds;
}

export function invalidateVisibleBounds(object){cachedBounds.delete(object);}

export class VisibleBoxHelper extends THREE.Box3Helper {
 constructor(object,color){super(new THREE.Box3(),color);this.object=object;this.update();}
 setFromObject(object){this.object=object;return this.update();}
 update(){this.box.copy(cachedVisibleBounds(this.object));return this;}
}
