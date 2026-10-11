import * as THREE from 'three';

// Hidden CAD cable meshes must not influence selection or camera framing.
export function visibleBounds(object, bounds=new THREE.Box3()) {
 bounds.makeEmpty();
 object.updateWorldMatrix(true,true);
 object.traverseVisible(node=>{
  if(!node.isMesh||!node.geometry)return;
  if(!node.geometry.boundingBox)node.geometry.computeBoundingBox();
  bounds.union(node.geometry.boundingBox.clone().applyMatrix4(node.matrixWorld));
 });
 return bounds;
}

export class VisibleBoxHelper extends THREE.Box3Helper {
 constructor(object,color){super(new THREE.Box3(),color);this.object=object;this.update();}
 setFromObject(object){this.object=object;return this.update();}
 update(){visibleBounds(this.object,this.box);return this;}
}
