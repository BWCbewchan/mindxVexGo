import {rasterizePaperImages} from './guide-paper.js';
import {zipStore} from './zip-store.js';
import {exportLDraw} from './ldraw-model.js';

const css=`*{box-sizing:border-box}body{margin:0;background:#e9eeee;color:#172727;font:15px Arial,sans-serif}body>header{padding:18px;text-align:center}.guide-paper{margin:20px auto;box-shadow:0 2px 15px #0001}img{max-width:100%}@media print{@page{size:16in 9in;margin:0}html,body{width:16in;background:white}body>header{display:none}.guide-paper{margin:0;box-shadow:none}}`;


export function downloadFile(data,type,name){const url=URL.createObjectURL(new Blob([data],{type})),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
export async function packageGuide(container,project,guide,catalog){
 const clone=container.cloneNode(true),files=[],sources=new Map();await rasterizePaperImages(clone);let index=0;
 for(const img of clone.querySelectorAll('img')){
  const src=img.getAttribute('src');if(!src)throw Error('Thiếu ảnh hướng dẫn.');
  const step=img.closest('.guide-assembly-step'),number=step?.querySelector('.guide-step-number')?.textContent;
  const desired=number&&img.classList.contains('guide-step-image')?`images/step-${number.padStart(3,'0')}.png`:number&&img.closest('.guide-detail-figure')?`images/step-${number.padStart(3,'0')}-detail.png`:img.classList.contains('guide-finished-image')?'images/completed.png':null;
  const sourceKey=desired?src+'|'+desired:src;let name=sources.get(sourceKey);if(!name){
   const uri=new URL(src,location.href);if(uri.protocol!=='data:'&&uri.origin!==location.origin)throw Error('Ảnh ZIP phải thuộc ứng dụng này.');
   const response=await fetch(uri.href);if(!response.ok)throw Error('Không tải được ảnh để đóng gói.');const type=response.headers.get('content-type')||'',ext=type.includes('jpeg')?'jpg':type.includes('svg')?'svg':'png';
   if(!/^image\/(png|jpeg|svg\+xml)/i.test(type))throw Error('Ảnh hướng dẫn không đúng định dạng.');
   name=desired||`images/asset-${String(++index).padStart(3,'0')}.${ext}`;
   files.push({name,data:new Uint8Array(await response.arrayBuffer())});sources.set(sourceKey,name);
  }img.setAttribute('src',name);img.removeAttribute('loading');
 }
 const sharedResponse=await fetch('/assembly/guide-paper.css');if(!sharedResponse.ok)throw Error('Không tải được mẫu trang.');const sharedCSS=await sharedResponse.text();
 const title=document.createElement('div');title.textContent=project.title;
 const html=`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title.innerHTML}</title><style>${sharedCSS}\n${css}</style><body><header>Mở offline · <a href="project.json" download>Tải mô hình JSON</a>${project.platform==='lego'?' · <a href="model.ldr" download>Tải LDraw</a>':''} · Ctrl+P để in</header><main>${clone.innerHTML}</main></body></html>`;
 files.push({name:'index.html',data:html},{name:'project.json',data:JSON.stringify(project,null,2)},{name:'manifest.json',data:JSON.stringify({version:1,title:project.title,platform:project.platform,steps:guide.steps.map((s,i)=>({number:i+1,title:s.title,image:`images/step-${String(i+1).padStart(3,'0')}.png`,camera:s.camera||null,page:s.page||null})),files:files.map(f=>f.name)},null,2)},{name:'README.txt',data:'Giải nén toàn bộ ZIP rồi mở index.html. Ảnh từng bước nằm trong images/. project.json giữ đầy đủ layer, khớp và góc nhìn của ứng dụng. Kiểm tra CAD có lấy mẫu không thay thế lắp thử ngoài thực tế.\n'});
 if(project.platform==='lego')files.push({name:'model.ldr',data:exportLDraw(project,catalog)},{name:'ATTRIBUTION.txt',data:'LEGO geometry: The LDraw Parts Library. Original part attribution and CC BY licenses are available with this application at /assembly/lego/ATTRIBUTION.md and in the original LDraw part headers. LEGO is a trademark of the LEGO Group.\n'});
 const manifest=files.find(file=>file.name==='manifest.json');manifest.data=JSON.stringify({...JSON.parse(manifest.data),files:files.map(file=>file.name)},null,2);
 return zipStore(files);
}
