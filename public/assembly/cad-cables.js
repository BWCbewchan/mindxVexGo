import * as THREE from 'three';
import {electronicsHousing,isElectronicsCable} from './electronics-housing.js';

// Shared by CPU CAD checks and the editor. Hidden legacy cable geometry is not
// part of the electronics housing; preserve the same boundary as the 3D editor.
export function markOriginalGOCables(object,sku,references){
 if(!sku.startsWith('269-')||sku==='269-6685-000')return false;
 const body=electronicsHousing(THREE,sku,references);object.updateMatrixWorld(true);
 let found=false;
 object.traverse(mesh=>{if(!mesh.isMesh)return;mesh.userData.cable=isElectronicsCable(THREE,sku,references,new THREE.Box3().setFromObject(mesh),body);if(mesh.userData.cable)found=true;});
 return found;
}
