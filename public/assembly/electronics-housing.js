// Which meshes of a VEX GO electronics model are cable, not housing. The CAD ships each device with a
// long straight cable; the app hides it. One rule for the editor, the 3D viewer, guide close-ups and the
// assembly tools (scripts/vexgo/lib.mjs isCable).
//
// Default housing: the device's connectors widened by 8 mm; a mesh outside it is cable. Some devices reach
// much further than that from their connectors, so they get a measured housing box (metres, part frame):
// - LED Bumper: the cap sits 14 mm below the connectors.
// - Electromagnet: the body runs 32 mm deep.
// - Switch: the body runs 39 mm deep.
// - Eye Sensor: the lens side.
// Their cable runs into the housing, so for a measured box a mesh is housing when its centre is inside.
export const ELECTRONICS_HOUSINGS={
 '269-6695-000':{box:[[-.013,-.013,-.0195],[.013,.013,.001]],centre:false},
 '269-6696-000':{box:[[-.0135,-.0135,-.0145],[.0135,.0135,.007]],centre:true},
 '269-6702-000':{box:[[-.0145,-.0135,-.0325],[.0135,.0135,.004]],centre:true},
 '269-6687-000':{box:[[-.0135,-.0285,-.0395],[.0135,.0285,.004]],centre:true},
};

/** Box the device's housing occupies: the measured one above, or its connectors widened by 8 mm. */
export function electronicsHousing(THREE,sku,references){
 const fixed=ELECTRONICS_HOUSINGS[sku]?.box;
 if(fixed)return new THREE.Box3(new THREE.Vector3(...fixed[0]),new THREE.Vector3(...fixed[1]));
 const body=new THREE.Box3();
 for(const ref of references?.[sku]||[])body.expandByPoint(new THREE.Vector3().fromArray(ref.point).multiplyScalar(.001));
 return body.isEmpty()?body:body.expandByScalar(.008);
}

/** True when a mesh with these bounds (part frame, metres) is cable. The Brain and non-electronics have none. */
export function isElectronicsCable(THREE,sku,references,bounds,housing=electronicsHousing(THREE,sku,references)){
 if(!sku.startsWith('269-')||sku==='269-6685-000')return false;
 const size=bounds.getSize(new THREE.Vector3()),dims=[size.x,size.y,size.z].sort((a,b)=>a-b);
 if(sku==='269-6686-000'&&bounds.max.y>.039)return true;
 if(dims[2]>.08&&dims[1]<.012)return true;
 if(housing.isEmpty())return false;
 return ELECTRONICS_HOUSINGS[sku]?.centre?!housing.containsPoint(bounds.getCenter(new THREE.Vector3())):!housing.intersectsBox(bounds);
}
