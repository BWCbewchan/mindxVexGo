import {rasterizePaperImages} from './guide-paper.js';

function loadScript(src,available){
 if(available())return Promise.resolve();
 return new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  script.onload=resolve;
  script.onerror=()=>{script.remove();reject(new Error('Không tải được công cụ tạo PDF.'));};
  script.src=new URL(src,import.meta.url);document.head.append(script);
 });
}

export async function guidePDF(container,title,onProgress){
 await Promise.all([
  loadScript('./vendor/html-to-image.js',()=>window.htmlToImage),
  loadScript('./vendor/jspdf.umd.min.js',()=>window.jspdf)
 ]);
 const pdf=new window.jspdf.jsPDF({orientation:'landscape',unit:'pt',format:[1152,648],compress:true});
 pdf.setProperties({title});
 const stage=document.createElement('div');
 stage.style.cssText='position:fixed;top:0;left:-20000px;width:16in;background:white;pointer-events:none';
 document.body.append(stage);
 try{
  const pages=[...container.querySelectorAll('.guide-page')];
  if(!pages.length)throw Error('Hướng dẫn chưa có trang để xuất.');
  for(const [index,source] of pages.entries()){
   onProgress(index+1,pages.length);
   const page=source.cloneNode(true);stage.replaceChildren(page);
   await rasterizePaperImages(page);
   const canvas=await window.htmlToImage.toCanvas(page,{pixelRatio:1.25,backgroundColor:'#fff',skipFonts:true});
   if(index)pdf.addPage();
   pdf.addImage(canvas.toDataURL('image/jpeg',.94),'JPEG',0,0,1152,648);
   canvas.width=canvas.height=0;
  }
  return pdf.output('arraybuffer');
 }finally{stage.remove();}
}
