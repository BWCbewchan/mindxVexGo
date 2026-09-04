import {fieldColor,type Field} from './field-model';
import RobotIcon from './robot-icon';
import CargoShape from './cargo-shape';
export default function LayerPreview({field,kind,index}:{field:Field;kind:string;index?:number}){
 const objects:{x:number;y:number;width?:number;height?:number;radius?:number;color?:string;shape?:'square'|'circle'|'triangle'|'hexagon'}[]=kind==='start'||kind==='goal'?[field[kind]]:kind==='background'?[]:((field as unknown as Record<string,{x:number;y:number;width?:number;height?:number;radius?:number;color?:string;shape?:'square'|'circle'|'triangle'|'hexagon'}[]>)[kind]||[]);
 const list=index===undefined?objects:objects.slice(index,index+1);
 const bounds=list.map(o=>({x:o.x-(kind==='walls'?0:(o.width??(o.radius??25)*2)/2),y:o.y-(kind==='walls'?0:(o.height??(o.radius??25)*2)/2),w:o.width??(o.radius??25)*2,h:o.height??(o.radius??25)*2}));
 const x=Math.min(...bounds.map(b=>b.x)),y=Math.min(...bounds.map(b=>b.y));
 const width=Math.max(...bounds.map(b=>b.x+b.w))-x,height=Math.max(...bounds.map(b=>b.y+b.h))-y;
 return <span className="layer-preview" aria-hidden="true">{kind==='start'?<svg viewBox="-50 -50 100 100"><RobotIcon/></svg>:kind==='background'?(field.image?<img src={field.image} alt=""/>:<span>—</span>):list.length?<svg viewBox={`${x-8} ${y-8} ${width+16} ${height+16}`}>
 {list.map((o,i)=>kind==='blocks'?<CargoShape key={i} x={o.x} y={o.y} width={'width' in o?o.width:40} height={'height' in o?o.height:40} color={'color' in o?o.color||'red':'red'} shape={'shape' in o?o.shape:undefined}/>:kind==='walls'?<rect key={i} x={o.x} y={o.y} width={'width' in o?o.width:40} height={'height' in o?o.height:40} fill="#42615a"/>:<circle key={i} cx={o.x} cy={o.y} r={'radius' in o?o.radius:25} fill={kind==='start'?'#173e36':kind==='goal'?'#7acb7e':kind==='checkpoints'?'#efb64e':fieldColor('color' in o?o.color||'red':'red')}/>)}</svg>:<span>—</span>}</span>;
}
