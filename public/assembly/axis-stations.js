// Free mounting positions along a shaft or long pin.
//
// A shaft can carry hubs, spacers and beams anywhere along its length, not only
// at its tip. Positions are measured in millimetres from the tip, inward.

// Projection of a world box onto the axis, in mm from the tip.
export function axialInterval(box,tip,dir){
 let lo=Infinity,hi=-Infinity;
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
  const t=((x-tip.x)*dir.x+(y-tip.y)*dir.y+(z-tip.z)*dir.z)*1000;
  if(t<lo)lo=t;if(t>hi)hi=t;
 }
 return [lo,hi];
}

// Depths (insertion values) where a part occupying [candidate[0],candidate[1]]
// at depth `start` does not overlap any occupied interval. Positions stack
// flush: after a free depth the next one starts one part thickness further.
export function freeStations({start,limit,candidate,occupied=[],step=.25,tolerance=.3,max=24}){
 const thickness=Math.max(.5,candidate[1]-candidate[0]);
 const free=depth=>{
  const lo=candidate[0]+depth-start+tolerance,hi=candidate[1]+depth-start-tolerance;
  return occupied.every(([a,b])=>hi<=a||lo>=b);
 };
 const result=[];
 for(let depth=Math.max(0,start);depth<=limit+1e-6&&result.length<max;){
  if(free(depth)){result.push(Math.round(depth*100)/100);depth+=thickness;}
  else depth+=step;
 }
 return result;
}

// Short Vietnamese description of a connector end for the attach panel.
export function describeReference(ref,travel){
 if(ref.kind==='hole')return ref.profile==='square-drive'?'Lỗ vuông (truyền động)':'Lỗ tròn';
 if(ref.profile==='square-drive')return `Trục vuông · dài ${Math.round(travel)} mm`;
 if(ref.profile==='lego-cross')return `Trục chữ thập · dài ${Math.round(travel)} mm`;
 return travel>8?`Chốt dài · ${travel.toFixed(1)} mm`:`Đầu chốt · ${travel.toFixed(1)} mm`;
}
