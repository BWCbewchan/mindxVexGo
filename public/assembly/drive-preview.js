import * as THREE from 'three';
import {worldReference} from './mating.js';
import {PLATFORM} from './platform.js';
export function driveStack(parts,connections,references,selectedId){
 const byId=new Map(parts.map(part=>[part.id,part]));
 const links=connections.filter(c=>{
  const hole=references[byId.get(c.part)?.sku]?.find(ref=>ref.id===c.sourceRef),pin=references[byId.get(c.target)?.sku]?.find(ref=>ref.id===c.targetRef);
  // Square shaft through a round bearing transfers load, not prescribed torque.
  return hole?.profile==='square-drive'&&pin?.profile==='square-drive';
 }),visited=new Set([selectedId]),queue=[selectedId];
 while(queue.length){const id=queue.shift();for(const c of links){if(c.part!==id&&c.target!==id)continue;const next=c.part===id?c.target:c.part;if(!visited.has(next)){visited.add(next);queue.push(next);}}}
 const motors=parts.filter(p=>visited.has(p.id)&&p.sku===PLATFORM.motor);if(motors.length!==1)return null;const motor=motors[0],socket=references[motor.sku]?.find(r=>r.id==='motor-output');if(!socket)return null;
 const axis=worldReference(motor,socket),ids=parts.filter(p=>visited.has(p.id)&&p.id!==motor.id&&!PLATFORM.electronics.includes(p.sku)).map(p=>p.id);
 return ids.length?{motor:motor.id,ids,point:axis.point,normal:axis.normal}:null;
}
export function rotatedDrive(parts,stack,degrees){
 const q=new THREE.Quaternion().setFromAxisAngle(stack.normal,THREE.MathUtils.degToRad(degrees));
 return parts.map(p=>{if(!stack.ids.includes(p.id))return structuredClone(p);const position=new THREE.Vector3().fromArray(p.position).sub(stack.point).applyQuaternion(q).add(stack.point),old=new THREE.Quaternion().setFromEuler(new THREE.Euler(...p.rotation.map(THREE.MathUtils.degToRad))),euler=new THREE.Euler().setFromQuaternion(q.clone().multiply(old));return {...structuredClone(p),position:position.toArray(),rotation:[euler.x,euler.y,euler.z].map(THREE.MathUtils.radToDeg)};});
}
export function installDrivePreview(api){
 const panel=document.createElement('details');panel.className='assistant-section';panel.id='drive-preview';const summary=document.createElement('summary');summary.textContent='Thử quay cụm truyền động';const help=document.createElement('p');help.textContent='Chọn motor, trục hoặc bánh có lỗ vuông. Thử 0–90°; không lưu góc thử vào mô hình.';
 const run=document.createElement('button');run.textContent='Thử quay 90°';run.id='drive-preview-run';const cancel=document.createElement('button');cancel.textContent='Dừng';cancel.id='drive-preview-stop';cancel.disabled=true;const result=document.createElement('p');result.setAttribute('role','status');panel.append(summary,help,run,cancel,result);document.getElementById('connection-review').after(panel);
 let active=false,stop=false;cancel.onclick=()=>{stop=true;};
 run.onclick=async()=>{if(active||api.blocked())return;const parts=structuredClone(api.project().parts),stack=driveStack(parts,api.connections(),api.references,api.selected());if(!stack){result.textContent='Chưa tìm thấy chuỗi motor → trục vuông → chi tiết quay được liên kết.';return;}
  api.closePreviews();api.resetInspection();active=true;stop=false;api.setBusy(true);run.disabled=true;cancel.disabled=false;api.detach();
  try{const baseline=await api.check(parts),prior=new Set(baseline.issues.filter(i=>i.kind==='penetration').map(i=>i.key));let passed=true;
   for(let degrees=0;degrees<=90&&!stop;degrees+=15){const sample=rotatedDrive(parts,stack,degrees);for(const p of sample){const obj=api.objects.get(p.id);if(obj)api.transform(obj,p);}const check=await api.check(sample);if(check.issues.some(i=>i.kind==='penetration'&&!prior.has(i.key))){result.textContent=`Phát hiện cấn mới tại ${degrees}°. Vị trí mô hình được giữ nguyên.`;passed=false;break;}result.textContent=`Đang kiểm tra ${degrees}°…`;await new Promise(resolve=>setTimeout(resolve,100));}
   if(passed)result.textContent=stop?'Đã dừng và khôi phục mô hình.':'Đã kiểm tra 7 góc từ 0–90°, chưa phát hiện cấn mới. Chưa kiểm tra tải, ma sát hoặc ăn khớp bánh răng.';
  }catch(error){result.textContent='Chưa kiểm tra được: '+error.message;}
  finally{for(const p of parts){const obj=api.objects.get(p.id);if(obj)api.transform(obj,p);}active=false;api.setBusy(false);run.disabled=false;cancel.disabled=true;api.refresh();}
 };return {active:()=>active};
}
