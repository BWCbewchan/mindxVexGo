export async function prepareBackground(file:File):Promise<{image:string;width:number;height:number}>{
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>25_000_000)throw new Error('Choose PNG, JPG or WebP under 25 MB.');
 const url=URL.createObjectURL(file);
 try{
  const image=new Image();image.src=url;
  try{await image.decode();}catch{throw new Error('This image could not be opened. Try another PNG, JPG or WebP.');}
  const scale=Math.min(1,1800/Math.max(image.naturalWidth,image.naturalHeight));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
  const context=canvas.getContext('2d');if(!context)throw new Error('Image processing is unavailable.');
  context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
  for(const quality of [.85,.7,.5]){const result=canvas.toDataURL('image/jpeg',quality);if(result.length<1_500_000)return {image:result,width:image.naturalWidth,height:image.naturalHeight};}
  throw new Error('This image is too detailed to save. Try a smaller image.');
 }finally{URL.revokeObjectURL(url);}
}
