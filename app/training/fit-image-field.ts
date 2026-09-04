import {validField,type Field} from './field-model';
export function fitImageField(field:Field,uploaded:{image:string;width:number;height:number}):Field{
 const scale=Math.min(1,5000/Math.max(uploaded.width,uploaded.height));
 const minimumScale=300/Math.min(uploaded.width,uploaded.height);
 const factor=Math.max(scale,minimumScale);
 const width=Math.round(uploaded.width*factor),height=Math.round(uploaded.height*factor);
 if(width>5000||height>5000)throw new Error('This image is too panoramic for the field. Use an image with an aspect ratio below 16:1.');
 const next=structuredClone(field),sx=width/field.width,sy=height/field.height;
 const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
 next.width=width;next.height=height;next.image=uploaded.image;next.imageTransform={x:0,y:0,width,height};
 next.start.x=clamp(field.start.x*sx,45,width-45);next.start.y=clamp(field.start.y*sy,45,height-45);
 next.goal.x=clamp(field.goal.x*sx,0,width);next.goal.y=clamp(field.goal.y*sy,0,height);
 next.walls.forEach(w=>{w.x=clamp(w.x*sx,0,width-w.width);w.y=clamp(w.y*sy,0,height-w.height);});
 next.blocks?.forEach(b=>{const hw=(b.width??40)/2,hh=(b.height??40)/2;b.x=clamp(b.x*sx,hw,width-hw);b.y=clamp(b.y*sy,hh,height-hh);});
 next.zones?.forEach(z=>{z.x=clamp(z.x*sx,z.radius,width-z.radius);z.y=clamp(z.y*sy,z.radius,height-z.radius);});
 next.checkpoints?.forEach(c=>{c.x=clamp(c.x*sx,45,width-45);c.y=clamp(c.y*sy,45,height-45);});
 if(!validField(next))throw new Error('Some existing objects are larger than the new field. Resize them before uploading this image.');
 return next;
}
