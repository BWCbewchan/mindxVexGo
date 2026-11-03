const vector=v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<=10000);
export function guideCamera(value){
 if(!value||!vector(value.direction)||!vector(value.up))return null;
 if(value.zoom!==undefined&&(typeof value.zoom!=='number'||!Number.isFinite(value.zoom)||value.zoom<.25||value.zoom>3))return null;
 const length=v=>Math.hypot(...v),d=length(value.direction),u=length(value.up);if(d<1e-8||u<1e-8)return null;
 const direction=value.direction.map(n=>n/d),up=value.up.map(n=>n/u);
 if(Math.abs(direction.reduce((s,n,i)=>s+n*up[i],0))>.999)return null;
 return {direction,up,...(value.zoom!==undefined?{zoom:value.zoom}:{})};
}
export function guideAngles(value){const camera=guideCamera(value)||guideCamera({direction:[1,.8,1],up:[0,1,0]});return {yaw:Math.atan2(camera.direction[0],camera.direction[2])*180/Math.PI,elevation:Math.asin(Math.max(-1,Math.min(1,camera.direction[1])))*180/Math.PI,zoom:camera.zoom??1};}
export function orbitGuideCamera(value,{yaw=0,elevation=0,zoom}={}){
 if(![yaw,elevation].every(Number.isFinite)||zoom!==undefined&&!Number.isFinite(zoom))throw Error('Góc nhìn không hợp lệ.');
 const angles=guideAngles(value),a=(angles.yaw+yaw)*Math.PI/180,b=Math.max(-85,Math.min(85,angles.elevation+elevation))*Math.PI/180;
 return {direction:[Math.sin(a)*Math.cos(b),Math.sin(b),Math.cos(a)*Math.cos(b)],up:[0,1,0],zoom:Math.round(Math.max(.25,Math.min(3,zoom??angles.zoom))*100)/100};
}
