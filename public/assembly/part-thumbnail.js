const croppedThumbnails=new Map();
export async function croppedPartThumbnail(img){
 const source=img.src;if(croppedThumbnails.has(source))return croppedThumbnails.get(source);
 const task=Promise.resolve().then(()=>{
  const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h||w*h>4000000)return source;
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
  const pixels=ctx.getImageData(0,0,w,h),data=pixels.data,bg=[data[0],data[1],data[2]],transparent=data[3]<16,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
  const push=i=>{if(seen[i])return;seen[i]=1;const k=i*4;if(data[k+3]<16||!transparent&&Math.max(Math.abs(data[k]-bg[0]),Math.abs(data[k+1]-bg[1]),Math.abs(data[k+2]-bg[2]))<=9){queue[tail++]=i;data[k+3]=0;}};
  for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1);}
  while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
  let left=w,top=h,right=-1,bottom=-1;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(data[(y*w+x)*4+3]>24){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
  if(right<left)return source;ctx.putImageData(pixels,0,0);const pad=3;left=Math.max(0,left-pad);top=Math.max(0,top-pad);right=Math.min(w-1,right+pad);bottom=Math.min(h-1,bottom+pad);const out=document.createElement('canvas');out.width=right-left+1;out.height=bottom-top+1;out.getContext('2d').drawImage(canvas,left,top,out.width,out.height,0,0,out.width,out.height);return out.toDataURL('image/png');
 }).catch(()=>source);croppedThumbnails.set(source,task);if(croppedThumbnails.size>256)croppedThumbnails.delete(croppedThumbnails.keys().next().value);return task;
}
