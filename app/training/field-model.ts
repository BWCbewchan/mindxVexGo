export type Wall = { x:number; y:number; width:number; height:number };
export type Cargo = {id:string;x:number;y:number;width?:number;height?:number;pushable?:boolean;shape?:'square'|'circle'|'triangle'|'hexagon';color:string};
export type Zone = {x:number;y:number;radius:number;color:Cargo['color']};
export type Field = { name:string; width:number; height:number; image?:string;imageTransform?:Wall;layers?:{kind:string;hidden?:boolean;locked?:boolean}[]; start:{x:number;y:number;heading:number}; goal:{x:number;y:number;radius:number}; walls:Wall[];blocks?:Cargo[];zones?:Zone[];requireBumper?:boolean;checkpoints?:{x:number;y:number;radius:number}[] };
export const initialField:Field={name:'First journey',width:1200,height:1200,start:{x:200,y:600,heading:90},goal:{x:900,y:600,radius:70},walls:[]};
export function validField(value:unknown):value is Field {
  const f=value as Field;
  return !!f && typeof f.name==='string' && f.name.length<=100 && [f.width,f.height].every(n=>Number.isFinite(n)&&n>=300&&n<=5000)
    && !!f.start && !!f.goal && [f.start.x,f.start.y,f.start.heading,f.goal.x,f.goal.y,f.goal.radius].every(Number.isFinite)
    && f.start.x>=45&&f.start.x<=f.width-45&&f.start.y>=45&&f.start.y<=f.height-45
    && f.goal.x>=0&&f.goal.x<=f.width&&f.goal.y>=0&&f.goal.y<=f.height&&f.goal.radius>=20&&f.goal.radius<=300
    && Array.isArray(f.walls)&&f.walls.length<=100&&f.walls.every(w=>[w.x,w.y,w.width,w.height].every(Number.isFinite)&&w.x>=0&&w.y>=0&&w.width>0&&w.height>0&&w.x+w.width<=f.width&&w.y+w.height<=f.height)
    && (f.checkpoints===undefined||(Array.isArray(f.checkpoints)&&f.checkpoints.length<=30&&f.checkpoints.every(c=>c&&[c.x,c.y,c.radius].every(Number.isFinite)&&c.radius>=20&&c.radius<=300&&c.x>=45&&c.y>=45&&c.x<=f.width-45&&c.y<=f.height-45)))
    && (f.requireBumper===undefined||typeof f.requireBumper==='boolean')
    && (f.blocks===undefined||(Array.isArray(f.blocks)&&f.blocks.length<=20&&new Set(f.blocks.map(b=>b?.id)).size===f.blocks.length&&f.blocks.every(b=>b&&typeof b.id==='string'&&/^[a-z0-9-]{1,80}$/.test(b.id)&&validColor(b.color)&&(b.shape===undefined||['square','circle','triangle','hexagon'].includes(b.shape))&&(b.pushable===undefined||typeof b.pushable==='boolean')&&[b.x,b.y].every(Number.isFinite)&&[b.width??40,b.height??40].every(n=>Number.isFinite(n)&&n>=20&&n<=1000)&&b.x>=(b.width??40)/2&&b.x<=f.width-(b.width??40)/2&&b.y>=(b.height??40)/2&&b.y<=f.height-(b.height??40)/2)))
    && (f.zones===undefined||(Array.isArray(f.zones)&&f.zones.length<=20&&f.zones.every(z=>z&&validColor(z.color)&&[z.x,z.y,z.radius].every(Number.isFinite)&&z.radius>=40&&z.radius<=300&&z.x>=z.radius&&z.y>=z.radius&&z.x+z.radius<=f.width&&z.y+z.radius<=f.height)))
    && (f.imageTransform===undefined||[f.imageTransform.x,f.imageTransform.y,f.imageTransform.width,f.imageTransform.height].every(Number.isFinite)&&f.imageTransform.width>=20&&f.imageTransform.height>=20&&f.imageTransform.width<=10000&&f.imageTransform.height<=10000&&Math.abs(f.imageTransform.x)<=10000&&Math.abs(f.imageTransform.y)<=10000)
    && (f.layers===undefined||Array.isArray(f.layers)&&f.layers.length<=7&&new Set(f.layers.map(l=>l.kind)).size===f.layers.length&&f.layers.every(l=>['background','zones','checkpoints','walls','blocks','goal','start'].includes(l.kind)&&(l.hidden===undefined||typeof l.hidden==='boolean')&&(l.locked===undefined||typeof l.locked==='boolean')))
    && (!f.image||(typeof f.image==='string'&&/^data:image\/(png|jpeg|webp);base64,/.test(f.image)&&f.image.length<4000000));
}

export function validColor(value:unknown):value is string{return typeof value==='string'&&(/^(red|green|blue)$/.test(value)||/^#[0-9a-f]{6}$/.test(value));}
export function fieldColor(value:string){return ({red:'#df5361',green:'#31965b',blue:'#397fd6'} as Record<string,string>)[value]||value;}
