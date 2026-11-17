// Conservative broad phase: only discard points outside the largest possible
// pin reach. Exact profile, depth, direction and snap checks stay in the solver.
export function connectorNeighborhood(rows,cell=32){
 const cells=new Map();let maxPinSpan=0;
 const key=(x,y,z)=>x+','+y+','+z;
 rows.forEach((row,order)=>{
  const p=row.point,k=key(Math.floor(p.x/cell),Math.floor(p.y/cell),Math.floor(p.z/cell));
  if(!cells.has(k))cells.set(k,[]);cells.get(k).push({row,order});
  if(row.ref.kind==='pin')maxPinSpan=Math.max(maxPinSpan,row.ref.maxDepth??row.ref.depth??Infinity);
 });
 return {rows,maxPinSpan,near(point,radius){
  if(!Number.isFinite(radius)||radius<0)return rows;
  const lo=[point.x-radius,point.y-radius,point.z-radius].map(v=>Math.floor(v/cell));
  const hi=[point.x+radius,point.y+radius,point.z+radius].map(v=>Math.floor(v/cell));
  if((hi[0]-lo[0]+1)*(hi[1]-lo[1]+1)*(hi[2]-lo[2]+1)>Math.max(32,rows.length*2))return rows;
  const found=[];
  for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++)for(const entry of cells.get(key(x,y,z))||[])if(entry.row.point.distanceToSquared(point)<=radius*radius)found.push(entry);
  return found.sort((a,b)=>a.order-b.order).map(entry=>entry.row);
 }};
}
