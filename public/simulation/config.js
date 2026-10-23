import {createField} from './fields.js';
export function robotDevices(project,catalog=[]){
 if(!project)return {motors:[{id:'sample-left',label:'Motor trái'},{id:'sample-right',label:'Motor phải'}],wheels:[{id:'sample-wheel-lf'},{id:'sample-wheel-lr'},{id:'sample-wheel-rf'},{id:'sample-wheel-rr'}],brain:true,battery:true,eye:true,colorEye:true,distanceEye:true,bumper:true,magnet:true,sample:true};
 const parts=project.parts||[],iq=project.platform==='vexiq',names=new Map(catalog.map(p=>[p.id,p.name]));
 const colorEye=parts.some(p=>p.sku===(iq?'228-3012':'269-6695-000')),distanceEye=parts.some(p=>p.sku===(iq?'228-3011':'269-6695-000'));
 return {motors:parts.filter(p=>p.sku===(iq?'228-2560':'269-6690-000')).map((p,i)=>({id:p.id,label:p.label||`Motor ${i+1}`})),wheels:parts.filter(p=>p.kind==='wheel'||/wheel|hub|tire/i.test(names.get(p.sku)||'')||!iq&&['228-2500-1383','228-2500-1384'].includes(p.sku)).filter(p=>!/tire/i.test(names.get(p.sku)||'')),brain:parts.some(p=>p.sku===(iq?'228-2540':'269-6685-000')),battery:parts.some(p=>p.sku===(iq?'228-2604':'269-6686-000')),eye:colorEye||distanceEye,colorEye,distanceEye,bumper:parts.some(p=>p.sku===(iq?'228-2677':'269-6696-000')),magnet:parts.some(p=>p.sku==='269-6702-000'),sample:false};
}
export function defaultDrive(devices){return {leftMotor:devices.motors[0]?.id||'',rightMotor:devices.motors[1]?.id||'',wheelDiameter:devices.sample?76:50.9,trackWidth:devices.sample?184:160,maxRpm:100,yaw:0};}
export function validateDriveSettings(value,devices){
 if(!value||typeof value!=='object')throw Error('Chưa có cấu hình dẫn động.');
 if(devices.motors.length>=2){
  if(value.leftMotor===value.rightMotor)throw Error('Chọn hai motor trái / phải khác nhau.');
  if(![value.leftMotor,value.rightMotor].every(id=>devices.motors.some(p=>p.id===id)))throw Error('Motor dẫn động không còn trong mô hình.');
 }
 for(const [key,min,max,label] of [['wheelDiameter',10,300,'Đường kính bánh'],['trackWidth',20,1200,'Khoảng cách hai bánh'],['maxRpm',1,600,'RPM'],['yaw',-360,360,'Hướng tiến']])if(!Number.isFinite(value[key])||value[key]<min||value[key]>max)throw Error(`${label} phải từ ${min} đến ${max}.`);
 return {leftMotor:value.leftMotor,rightMotor:value.rightMotor,wheelDiameter:value.wheelDiameter,trackWidth:value.trackWidth,maxRpm:value.maxRpm,yaw:value.yaw};
}
export function validateDrive(value,devices){
 if(devices.motors.length<2||devices.wheels.length<2||!devices.brain||!devices.battery)throw Error(`Robot cần ít nhất 2 motor, 2 bánh, 1 Brain và 1 Battery để chạy mô phỏng xe. Hiện có ${devices.motors.length} motor, ${devices.wheels.length} bánh, ${devices.brain?'có':'thiếu'} Brain, ${devices.battery?'có':'thiếu'} Battery.`);
 return validateDriveSettings(value,devices);
}
export function playground(name,drive,devices,radius=135){
 const robot={...drive,radius,eye:devices.eye,colorEye:devices.colorEye,distanceEye:devices.distanceEye,bumper:devices.bumper,magnet:devices.magnet};
 return {...createField(name,radius),robot};
}
