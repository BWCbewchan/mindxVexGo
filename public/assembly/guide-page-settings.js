import {guideCamera} from './guide-camera.js';
const number=(value,min,max)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max;
const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const fail=()=>{throw Error('Thiết lập trang hướng dẫn không hợp lệ hoặc vượt giới hạn.');};
export function guidePage(value){
 if(value==null)return {};if(!object(value))return fail();const out={};if(value.frames===undefined)return out;if(!object(value.frames))return fail();out.frames={};
 for(const name of ['assembled','detail']){const input=value.frames[name];if(input===undefined)continue;if(!object(input))return fail();const row={};
  if(input.image!==undefined){const image=input.image;if(!object(image)||!number(image.x??0,-1,1)||!number(image.y??0,-1,1)||!number(image.zoom??1,.25,3))return fail();row.image={x:image.x??0,y:image.y??0,zoom:image.zoom??1};}
  if(input.layout!==undefined){const r=input.layout;if(!object(r)||!number(r.x,0,1)||!number(r.y,0,1)||!number(r.width,.1,1)||!number(r.height,.1,1)||r.x+r.width>1.000001||r.y+r.height>1.000001)return fail();row.layout={x:r.x,y:r.y,width:r.width,height:r.height};}
  if(input.redOutlineOpacity!==undefined){if(!number(input.redOutlineOpacity,0,1))return fail();row.redOutlineOpacity=input.redOutlineOpacity;}
  if(input.redOutline!==undefined){if(typeof input.redOutline!=='boolean')return fail();row.redOutline=input.redOutline;}
  if(input.explodeMM!==undefined){if(!number(input.explodeMM,0,120))return fail();row.explodeMM=input.explodeMM;}
  if(input.camera!==undefined){const camera=guideCamera(input.camera);if(!camera)return fail();row.camera=camera;}
  if(input.markers!==undefined){if(!Array.isArray(input.markers)||input.markers.length>64)return fail();row.markers=input.markers.map(p=>{if(!object(p)||!number(p.x,0,1)||!number(p.y,0,1)||!number(p.r??.012,.003,.04))return fail();return {x:p.x,y:p.y,r:p.r??.012,...(typeof p.anchor==='string'?{anchor:p.anchor}:{})};});}
  out.frames[name]=row;
 }return out;
}
export function frameSettings(page,name){const row=page?.frames?.[name]||{};return {...row,image:{x:0,y:0,zoom:1,...row.image}};}
export function markerPoint(point,image){return {x:Math.max(0,Math.min(1,(point.x-.5-image.x)/image.zoom+.5)),y:Math.max(0,Math.min(1,(point.y-.5-image.y)/image.zoom+.5))};}
