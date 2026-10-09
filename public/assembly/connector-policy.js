// Profiled drive joints are distinct from cylindrical mounting references.
export function compatibleReferences(a,b){
 if(!a||!b||a.kind===b.kind)return false;
 if(a.profile||b.profile)return a.profile==='square-drive'&&b.profile===a.profile&&Math.abs(a.width-b.width)<.1;
 return ['hole','pin'].includes(a.kind)&&['hole','pin'].includes(b.kind)&&Math.abs(a.radius-b.radius)<=.25&&Math.min(a.radius,b.radius)<=2.6;
}
export function insertionLimit(a,b,previous=0){
 if(a.profile||b.profile)return Math.min(a.maxDepth??a.depth,b.maxDepth??b.depth);
 return Math.max(a.depth,b.depth,previous);
}
