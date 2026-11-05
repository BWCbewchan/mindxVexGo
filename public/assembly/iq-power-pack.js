import {Euler,Quaternion,Vector3,MathUtils} from './vendor/three.module.js';

export const IQ_POWER_PACK_NAME='Robot Brain + Battery (Gen 2)';
export const IQ_POWER_PACK_BRAIN='228-6480';
export const IQ_POWER_PACK_BATTERY='228-7045';

// The imported Gen 2 battery is upright in its own CAD coordinates. Rotate it
// into the underside bay, with the terminal inside and the latch outside.
const batteryOffset=new Vector3(43.65,-10,0);
const batteryOrientation=new Quaternion().setFromEuler(new Euler(Math.PI/2,0,Math.PI));
const orientation=part=>new Quaternion().setFromEuler(new Euler(...part.rotation.map(MathUtils.degToRad)));

export function iqBatteryPose(brain){
 const brainOrientation=orientation(brain);
 const position=batteryOffset.clone().applyQuaternion(brainOrientation).add(new Vector3(...brain.position));
 const angles=new Euler().setFromQuaternion(brainOrientation.multiply(batteryOrientation));
 return {position:position.toArray(),rotation:[angles.x,angles.y,angles.z].map(MathUtils.radToDeg)};
}

export function seatedIQPowerPack(a,b){
 if(!a.groupId||a.groupId!==b.groupId)return false;
 const isBrain=part=>part.sku===IQ_POWER_PACK_BRAIN||part.sku===`vexiq__${IQ_POWER_PACK_BRAIN}`;
 const [brain,battery]=isBrain(a)?[a,b]:[b,a];
 if(!isBrain(brain)||battery.sku!==brain.sku.replace(IQ_POWER_PACK_BRAIN,IQ_POWER_PACK_BATTERY))return false;
 const pose=iqBatteryPose(brain);
 return new Vector3(...pose.position).distanceTo(new Vector3(...battery.position))<=.15&&
  orientation(pose).angleTo(orientation(battery))<=MathUtils.degToRad(.25);
}
