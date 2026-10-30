import * as THREE from 'three';

// Shared by CPU CAD checks and the editor. Hidden legacy cable geometry is not
// part of the electronics housing; preserve the same boundary as the 3D editor.
export function markOriginalGOCables(object,sku,references){
 if(!sku.startsWith('269-')||sku==='269-6685-000')return false;
 const body=new THREE.Box3();for(const ref of references[sku]||[])body.expandByPoint(new THREE.Vector3().fromArray(ref.point).multiplyScalar(.001));body.expandByScalar(.008);if(sku==='269-6695-000')body.set(new THREE.Vector3(-.013,-.013,-.0195),new THREE.Vector3(.013,.013,.001));object.updateMatrixWorld(true);
 let found=false;
 object.traverse(mesh=>{if(!mesh.isMesh)return;const bounds=new THREE.Box3().setFromObject(mesh),size=bounds.getSize(new THREE.Vector3()),dims=[size.x,size.y,size.z].sort((a,b)=>a-b);mesh.userData.cable=(sku==='269-6686-000'&&bounds.max.y>.039)||(dims[2]>.08&&dims[1]<.012)||(!body.isEmpty()&&!body.intersectsBox(bounds));if(mesh.userData.cable)found=true;});
 return found;
}
