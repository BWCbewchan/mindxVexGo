export async function prepareStudentPhoto(file:File):Promise<string>{
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8*1024*1024)throw Error('Choose a JPG, PNG or WebP image under 8 MB.');
 const bitmap=await createImageBitmap(file);
 try{
 if(!bitmap.width||!bitmap.height)throw Error('This image could not be read.');
 const canvas=document.createElement('canvas');canvas.width=320;canvas.height=320;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Image processing is unavailable.');
 ctx.fillStyle='#f6f7f1';ctx.fillRect(0,0,320,320);
 const ratio=Math.min(320/bitmap.width,320/bitmap.height),w=bitmap.width*ratio,h=bitmap.height*ratio;
 ctx.drawImage(bitmap,(320-w)/2,(320-h)/2,w,h);
 return canvas.toDataURL('image/jpeg',.85);
 }finally{bitmap.close();}
}
