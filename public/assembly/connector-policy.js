// VEX GO distinguishes a torque-transmitting square drive from a free-spinning
// square shaft in a round bore. A round peg must never enter a square socket.
export function compatibleReferences(a,b,skuA,skuB){
 if(!a||!b||a.kind===b.kind)return false;
 // Collared shafts drive the motor with their short tip; wheels belong on
 // the long free section, even when both ends fit a square socket geometrically.
 const wheelSkus=['228-2500-1383','228-2500-1384'];
 if(a.id==='short-drive-end'&&wheelSkus.includes(skuB)||b.id==='short-drive-end'&&wheelSkus.includes(skuA))return false;
 if(a.excludedPartSkus?.includes(skuB)||b.excludedPartSkus?.includes(skuA))return false;
 if(a.excludedProfiles?.includes(b.profile)||b.excludedProfiles?.includes(a.profile))return false;
 const squarePin=ref=>ref.profile==='square-drive'&&ref.kind==='pin';
 const squareSocket=ref=>ref.profile==='square-drive'&&ref.kind==='hole';
 if(squarePin(a)&&squareSocket(b)||squarePin(b)&&squareSocket(a))return Math.abs(a.width-b.width)<.1;
 const squareToRound=(pin,hole)=>squarePin(pin)&&hole.kind==='hole'&&!hole.profile&&hole.radius>=2&&hole.radius<=2.6;
 if(squareToRound(a,b)||squareToRound(b,a))return true;
 if(a.profile||b.profile)return false;
 return ['hole','pin'].includes(a.kind)&&['hole','pin'].includes(b.kind)&&Math.abs(a.radius-b.radius)<=.25&&Math.min(a.radius,b.radius)<=2.6;
}
export function insertionLimit(a,b,previous=0){
 if(a.profile==='square-drive'&&b.profile==='square-drive'){
  const pin=a.kind==='pin'?a:b,hole=pin===a?b:a;
  if(hole.id!=='motor-output')return pin.maxDepth??pin.depth;
  return Math.min(a.maxDepth??a.depth,b.maxDepth??b.depth);
 }
 if(a.profile==='square-drive'||b.profile==='square-drive'){
  const pin=a.profile==='square-drive'?a:b;
  const hole=pin===a?b:a;
  // A shaft passes through a beam bearing; bore thickness is not travel length.
  if(pin.kind==='pin'&&hole.kind==='hole')return pin.maxDepth??pin.depth;
  return Math.min(pin.maxDepth??pin.depth,hole.depth??Infinity);
 }
 const pin=a.kind==='pin'?a:b.kind==='pin'?b:null;
 if(pin&&Number.isFinite(pin.depth)&&pin.depth>=0)return pin.depth;
 const depths=[a.depth,b.depth].filter(value=>Number.isFinite(value)&&value>=0);
 return depths.length?Math.max(...depths):Math.max(0,previous);
}
export function recommendedInsertionDepth(a,b){
 const limit=insertionLimit(a,b);
 if(a.profile||b.profile){const hole=a.kind==='hole'?a:b;return Math.max(0,hole.id!=='motor-output'?Math.min(limit,hole.depth):limit);}
 const depths=[a.depth,b.depth].filter(value=>Number.isFinite(value)&&value>=0);
 return depths.length?Math.min(limit,...depths):Math.max(0,limit);
}
