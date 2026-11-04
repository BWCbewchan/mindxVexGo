import type {ProjectData} from '../../public/assembly/project-store';

// Grouping and loose staging parts are not an assembly. Keep them local until
// an authored joint connects two distinct parts that both exist in this draft.
export function hasAssembledParts(document:ProjectData):boolean{
 if(!Array.isArray(document?.parts)||document.parts.length<2)return false;
 const ids=new Set(document.parts.filter(p=>typeof p?.id==='string'&&p.id).map(p=>p.id));
 return document.parts.some(part=>{const mate=part.mate as {target?:unknown;sourceRef?:unknown;targetRef?:unknown}|undefined;return typeof part.id==='string'&&!!part.id&&typeof mate?.target==='string'&&mate.target!==part.id&&ids.has(mate.target)&&typeof mate.sourceRef==='string'&&mate.sourceRef.length>0&&typeof mate.targetRef==='string'&&mate.targetRef.length>0;});
}
