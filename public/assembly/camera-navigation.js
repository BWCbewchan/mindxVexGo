import * as THREE from 'three';

export function installCameraNavigation({canvas,camera,orbit,blocked=()=>false}){
 const keys=new Set(),forward=new THREE.Vector3(),right=new THREE.Vector3(),delta=new THREE.Vector3();
 let active=false,hovered=false,lastTime=null,previousDamping=true;
 canvas.addEventListener('pointerenter',()=>{hovered=true;});
 canvas.addEventListener('pointerleave',()=>{hovered=false;if(!active)keys.clear();});
 const editing=target=>target?.closest?.('input,textarea,select,[contenteditable="true"]');
 function stop(){keys.clear();if(!active)return;active=false;orbit.enabled=true;orbit.enableDamping=previousDamping;lastTime=null;}
 canvas.addEventListener('pointerdown',e=>{
  if(e.button!==2||blocked())return;
  e.preventDefault();e.stopImmediatePropagation();
  previousDamping=orbit.enableDamping;orbit.enableDamping=false;orbit.update();orbit.enabled=false;active=true;
  canvas.setPointerCapture?.(e.pointerId);
 },true);
 canvas.addEventListener('pointermove',e=>{
  if(!active)return;
  if(!(e.buttons&2)){stop();return;}
  e.preventDefault();e.stopImmediatePropagation();
  const offset=camera.position.clone().sub(orbit.target);
  const spherical=new THREE.Spherical().setFromVector3(offset);
  spherical.theta-=e.movementX*.004;
  spherical.phi=Math.max(.02,Math.min(Math.PI-.02,spherical.phi-e.movementY*.004));
  offset.setFromSpherical(spherical);
  orbit.target.copy(camera.position).sub(offset);camera.lookAt(orbit.target);
 },true);
 canvas.addEventListener('pointerup',e=>{if(active&&e.button===2){e.stopImmediatePropagation();stop();}},true);
 canvas.addEventListener('pointercancel',stop);
 canvas.addEventListener('lostpointercapture',stop);
 canvas.addEventListener('contextmenu',e=>e.preventDefault());
 document.addEventListener('keydown',e=>{
  if(editing(e.target)||blocked()||e.ctrlKey||e.metaKey||e.altKey||(!active&&!hovered&&!canvas.parentNode?.contains(document.activeElement)))return;
  if(['KeyQ','KeyW','KeyE','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight'].includes(e.code)){
   e.preventDefault();e.stopImmediatePropagation();keys.add(e.code);
  }else if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();stop();}
 },true);
 document.addEventListener('keyup',e=>{keys.delete(e.code);if((active||hovered)&&['KeyQ','KeyW','KeyE','KeyA','KeyS','KeyD'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();}},true);
 window.addEventListener('blur',stop);
 document.addEventListener('focusin',e=>{if(editing(e.target))stop();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 return {active:()=>active,update(time){
  const dt=lastTime===null?0:Math.min(.05,Math.max(0,(time-lastTime)/1000));lastTime=time;
  if(!active&&!keys.size)return;
  if(blocked()){stop();return;}
  camera.getWorldDirection(forward);right.crossVectors(forward,camera.up).normalize();delta.set(0,0,0);
  delta.addScaledVector(forward,Number(keys.has('KeyW'))-Number(keys.has('KeyS')));
  delta.addScaledVector(right,Number(keys.has('KeyD'))-Number(keys.has('KeyA')));
  delta.addScaledVector(camera.up,Number(keys.has('KeyE'))-Number(keys.has('KeyQ')));
  const speed=Math.max(.04,camera.position.distanceTo(orbit.target))*(keys.has('ShiftLeft')||keys.has('ShiftRight')?2.5:1);
  if(delta.lengthSq()){delta.normalize().multiplyScalar(speed*dt);camera.position.add(delta);orbit.target.add(delta);}
 }};
}
