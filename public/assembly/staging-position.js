import * as THREE from 'three';

export function stagingPosition(incoming,existingObjects,{gapMm=25,heightMm=40}={}){
 incoming.updateMatrixWorld(true);
 const localBounds=new THREE.Box3().setFromObject(incoming),occupied=new THREE.Box3();
 for(const object of existingObjects.values())occupied.expandByObject(object);
 if(occupied.isEmpty()||localBounds.isEmpty())return [0,heightMm,0];
 return [(occupied.max.x-localBounds.min.x)*1000+gapMm,heightMm,0];
}
