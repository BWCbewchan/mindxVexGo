import * as THREE from 'three';

const H=new THREE.Matrix4().makeRotationX(Math.PI),identity=new THREE.Matrix4();
const key=name=>name.trim().replaceAll('\\','/').toLowerCase();
const safe=name=>name&&!/^[a-z]+:|^\/|(^|\/)\.\.(\/|$)/i.test(name);
const colorCode=value=>typeof value==='number'&&Number.isInteger(value)&&value>=0&&value<=0x3ffffff||typeof value==='string'&&/^0x2[0-9a-f]{6}$/i.test(value);
export function ldrawColors(text){const colors={};for(const match of text.matchAll(/^0\s+!COLOUR\s+.+?\s+CODE\s+(\d+)\s+VALUE\s+(#[0-9a-f]{6})/gim))colors[Number(match[1])]=match[2];return colors;}
function rigid(matrix){const a=new THREE.Vector3(),b=new THREE.Quaternion(),s=new THREE.Vector3();matrix.decompose(a,b,s);const pure=new THREE.Matrix4().compose(a,b,new THREE.Vector3(1,1,1));return Math.abs(matrix.determinant()-1)<1e-4&&matrix.elements.every((n,i)=>Math.abs(n-pure.elements[i])<1e-4);}
export function parseLDraw(text,catalog,{colors={}}={}){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>5e6)throw Error('File LDraw phải nhỏ hơn 5 MB.');
 const all=text.replace(/^\uFEFF/,'').split(/\r?\n/);if(all.length>50000)throw Error('File LDraw quá nhiều dòng.');
 const models=new Map(),prefix=[];let current=prefix,root=null,title='LEGO · LDraw';
 all.forEach((raw,index)=>{const line=raw.trim(),file=/^0\s+FILE\s+(.+)$/i.exec(line);if(file){const name=key(file[1]);if(!safe(name)||models.has(name))throw Error(`Tên submodel không hợp lệ tại dòng ${index+1}.`);current=[];models.set(name,current);root??=name;return;}if(/^0\s+NOFILE$/i.test(line)){current=prefix;return;}current.push({line,number:index+1});});
 const entries=new Map(catalog.map(p=>[p.id.toLowerCase(),p])),parts=[];let next=1;
 function walk(lines,parent,inherited,stack){
  if(stack.length>30)throw Error('Submodel LDraw lồng quá sâu.');
  for(const {line,number} of lines){
   if(!line)continue;const tokens=line.split(/\s+/),type=Number(tokens[0]);
   if(type===0){if(parts.length===0&&title==='LEGO · LDraw'&&!/^0\s+(!|Name:|Author:|FILE|NOFILE|BFC|STEP|ROTSTEP)/i.test(line))title=line.slice(2).trim().slice(0,120)||title;continue;}
   if(type!==1)throw Error(`Dòng ${number}: chỉ hỗ trợ tham chiếu linh kiện type 1, chưa hỗ trợ hình học tự vẽ type ${tokens[0]}.`);
   if(tokens.length<15)throw Error(`Dòng ${number}: thiếu tọa độ hoặc ma trận.`);
   const rawColor=/^0x/i.test(tokens[1])?tokens[1]:Number(tokens[1]);if(!colorCode(rawColor))throw Error(`Dòng ${number}: mã màu không hợp lệ.`);
   const color=rawColor===16?inherited:rawColor,n=tokens.slice(2,14).map(Number);if(n.some(v=>!Number.isFinite(v)||Math.abs(v)>1e7))throw Error(`Dòng ${number}: tọa độ/ma trận không hợp lệ.`);
   const [x,y,z,a,b,c,d,e,f,g,h,i]=n,local=new THREE.Matrix4().set(a,b,c,x,d,e,f,y,g,h,i,z,0,0,0,1);
   if(!rigid(local))throw Error(`Dòng ${number}: chưa hỗ trợ scale, shear hoặc chi tiết phản chiếu; mô hình cũ được giữ nguyên.`);
   const name=key(tokens.slice(14).join(' '));if(!safe(name))throw Error(`Dòng ${number}: đường dẫn linh kiện không hợp lệ.`);
   const world=parent.clone().multiply(local);
   if(models.has(name)){if(stack.includes(name))throw Error(`Dòng ${number}: submodel vòng lặp ${name}.`);walk(models.get(name),world,color,[...stack,name]);continue;}
   const sku=name.replace(/^parts\//,'').replace(/\.dat$/,''),entry=entries.get(sku);if(!entry)throw Error(`Dòng ${number}: chưa có CAD ${name} trong thư viện LEGO. Không nhập một phần mô hình.`);
   const converted=H.clone().multiply(world).multiply(H),position=new THREE.Vector3().setFromMatrixPosition(converted).multiplyScalar(.4);converted.setPosition(0,0,0);
   if(position.toArray().some(v=>Math.abs(v)>10000))throw Error(`Dòng ${number}: tọa độ vượt ±10000 mm.`);
   const rotation=new THREE.Euler().setFromRotationMatrix(converted,'XYZ').toArray().slice(0,3).map(THREE.MathUtils.radToDeg);
   const part={id:'ldr-'+next++,sku:entry.id,label:entry.name,kind:entry.kind,position:position.toArray().map(v=>+v.toFixed(8)),rotation};
   if(color!==16){const hex=typeof color==='string'?'#'+color.slice(3):colors[color]||entry.colors?.[color];if(!/^#[0-9a-f]{6}$/i.test(hex||''))throw Error(`Dòng ${number}: chưa đọc được màu LDraw ${color}.`);part.ldrawColor=color;part.ldrawColorHex=hex;}
   parts.push(part);if(parts.length>250)throw Error('Tối đa 250 linh kiện trong một dự án.');
  }
 }
 walk(root?models.get(root):prefix,identity,16,root?[root]:[]);if(!parts.length)throw Error('File LDraw không có linh kiện hỗ trợ.');
 return {version:1,platform:'lego',title,parts,groups:[],steps:[],hideCables:true};
}
export function exportLDraw(project,catalog){
 if(project.platform!=='lego')throw Error('LDraw chỉ hỗ trợ dự án LEGO.');const entries=new Map(catalog.map(p=>[p.id,p]));
 const lines=['0 '+String(project.title||'LEGO model').replace(/[\r\n]/g,' '),'0 Name: model.ldr','0 Author: mindX Robotics','0 !LDRAW_ORG Model','0 // Geometry and colors; use project.json to retain native groups, mates and guide settings.'];
 const format=n=>Number(n.toFixed(8)).toString();
 for(const part of project.parts){const entry=entries.get(part.sku);if(!entry||!/^[a-z0-9_-]+$/i.test(part.sku))throw Error('Linh kiện LDraw không hợp lệ: '+part.sku);
  if(![part.position,part.rotation].every(v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n))))throw Error('Tọa độ LDraw không hợp lệ.');
  const position=new THREE.Vector3(...part.position).multiplyScalar(2.5).applyMatrix4(H),r=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...part.rotation.map(THREE.MathUtils.degToRad),'XYZ')),m=H.clone().multiply(r).multiply(H).elements;
  let code=part.ldrawColor??entry.kitColors?.[project.kit?.kitId]??entry.defaultColor??16;if(code===9999)code=16;if(!colorCode(code))throw Error('Màu LDraw không hợp lệ.');
  lines.push('1 '+[code,...position.toArray().map(format),...[m[0],m[4],m[8],m[1],m[5],m[9],m[2],m[6],m[10]].map(format),part.sku+'.dat'].join(' '));
 }
 return lines.join('\r\n')+'\r\n';
}
