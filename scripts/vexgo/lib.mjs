// Shared helpers for building VEX GO models headlessly with the real /assembly mate rules.
// Units: mm and degrees, Y up (same as public/assembly projects).
import fs from 'node:fs';
import path from 'node:path';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {installAssemblyAPI} from '../../public/assembly/ai-api.js';
import {worldReference} from '../../public/assembly/mating.js';
import {analyzeCollisions} from '../../public/assembly/collision.js';
import {insertionLimit,compatibleReferences} from '../../public/assembly/connector-policy.js';
import {electronicsHousing,isElectronicsCable,ELECTRONICS_HOUSINGS} from '../../public/assembly/electronics-housing.js';

export const ROOT=path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1')),'../..');
export const catalog=JSON.parse(fs.readFileSync(path.join(ROOT,'public/assembly/parts.json'),'utf8'));
export const references=JSON.parse(fs.readFileSync(path.join(ROOT,'public/assembly/connectors.json'),'utf8')).parts;
export const partName=sku=>catalog.find(p=>p.id===sku)?.name??sku;
/** Electronics CAD ships each device with a long straight cable. A mesh is cable, not body, by the same
 *  rule as the app (public/assembly/cad-cables.js): outside the device's housing box, a long thin run, or
 *  the battery's top lead. `box` is the mesh box in the part frame, metres. The Brain has no cable. */
export const isCable=(sku,box)=>isElectronicsCable(THREE,sku,references,box);
/** Housing boxes of the electronics in a project, as plain numbers for browser-side code. */
export const housingBoxes=skus=>Object.fromEntries([...new Set(skus)].filter(s=>s.startsWith('269-')&&s!=='269-6685-000').map(s=>{const b=electronicsHousing(THREE,s,references);return [s,[b.min.toArray(),b.max.toArray(),!!ELECTRONICS_HOUSINGS[s]?.centre]];}));

const AXES=['x','y','z'];
/**
 * Readable connector names: `<kind><index><face>`, for example `h3+y`.
 *  - kind: h = hole, p = pin.
 *  - face: the side the connector opens to, in the part's own frame (+y, -z, ...).
 *  - index: holes and pins on one face are numbered together, from the part's negative end along its
 *    longest direction. Two-dimensional faces (plates, Brain, sensor sides, staggered grids too) use
 *    `column.row` instead, e.g. `h2.4+y`: columns and rows count the distinct positions, so on a staggered
 *    plate the in-between holes get their own column and row numbers.
 *  - `#2`: a second connector at the same spot and face (a deeper layer).
 * Connectors on a single axis line (a pin, a shaft) are numbered from the outer tip: `p-y` is the tip
 * pointing down, `p-y2` the next one inwards. Names are stable for a SKU. Run
 * `node scripts/vexgo/view.mjs part <sku> out.png` to see them drawn on the part.
 */
export function connectorNames(sku){
  const rows=references[sku]||[];
  const labels=new Map(),byFace=new Map(),key=v=>Math.round(v*10)/10;
  for(const r of rows){const axis=r.normal.map(Math.abs).indexOf(Math.max(...r.normal.map(Math.abs)));const face=(r.normal[axis]>0?'+':'-')+AXES[axis];(byFace.get(face)??byFace.set(face,[]).get(face)).push({r,axis});}
  for(const [face,items] of byFace){
    const axis=items[0].axis,plane=[0,1,2].filter(i=>i!==axis);
    const spread=plane.map(i=>{const v=items.map(x=>x.r.point[i]);return Math.max(...v)-Math.min(...v);});
    const order=spread[0]>=spread[1]?plane:[plane[1],plane[0]];
    const spot=r=>key(r.point[order[0]])+','+key(r.point[order[1]]);
    const spots=[...new Map(items.map(({r})=>[spot(r),[key(r.point[order[0]]),key(r.point[order[1]])]])).entries()];
    const used=new Map(),put=(r,label)=>{const n=(used.get(label)||0)+1;used.set(label,n);labels.set(r.id,n>1?`${label}#${n}`:label);};
    if(spots.length===1){
      // Outer end first: most positive along the axis for a + face, most negative for a - face.
      const sign=face[0]==='+'?1:-1;
      [...items].sort((x,y)=>sign*(y.r.point[axis]-x.r.point[axis])).forEach(({r},i)=>labels.set(r.id,`${r.kind[0]}${face}${i?i+1:''}`));
      continue;
    }
    const cols=[...new Set(spots.map(([,v])=>v[0]))].sort((a,b)=>a-b),rowsOf=[...new Set(spots.map(([,v])=>v[1]))].sort((a,b)=>a-b);
    // Plates, Brain and sensor faces are 2D (also staggered ones); beams, even bent, are a line.
    const grid=cols.length>1&&rowsOf.length>1&&spots.length>=1.5*Math.max(cols.length,rowsOf.length);
    const sequence=[...spots].sort((a,b)=>a[1][0]-b[1][0]||a[1][1]-b[1][1]).map(([k])=>k);
    for(const {r} of items){
      const [u,v]=[key(r.point[order[0]]),key(r.point[order[1]])];
      put(r,grid?`${r.kind[0]}${cols.indexOf(u)+1}.${rowsOf.indexOf(v)+1}${face}`:`${r.kind[0]}${sequence.indexOf(spot(r))+1}${face}`);
    }
  }
  return rows.map(r=>({id:r.id,name:labels.get(r.id)??r.id,kind:r.kind,point:r.point,normal:r.normal,radius:r.radius}));
}
export function refId(sku,name){
  const rows=connectorNames(sku);
  const hit=rows.find(r=>r.name===name)||rows.find(r=>r.id===String(name));
  if(!hit)throw Error(`${partName(sku)} (${sku}) has no connector "${name}". Known: ${rows.map(r=>r.name).join(' ')}`);
  return hit.id;
}

/**
 * Rotation (XYZ Euler degrees) from an axes string naming, for world X, Y and Z in turn, the signed
 * local axis that points that way. '+y-z-x': local +y points to world +X, local -z up, local -x to the front.
 * Robot frame: +X left, +Y up, +Z front.
 */
export function axesRotation(axes){
  const t=String(axes).match(/^([+-][xyz])([+-][xyz])([+-][xyz])$/);if(!t)throw Error('axes must look like +y-z-x');
  const v=s=>new THREE.Vector3(...'xyz'.split('').map(c=>c===s[1]?(s[0]==='-'?-1:1):0));
  const m=new THREE.Matrix4().set(...v(t[1]).toArray(),0,...v(t[2]).toArray(),0,...v(t[3]).toArray(),0,0,0,0,1);
  if(Math.abs(m.determinant()-1)>1e-6)throw Error(`axes ${axes} is a mirror image; flip the sign of one axis`);
  const e=new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromRotationMatrix(m));
  return [e.x,e.y,e.z].map(r=>+THREE.MathUtils.radToDeg(r).toFixed(6));
}

/** A project plus the real AI attach command, in memory. */
export function createWorkspace(project={version:1,platform:'vexgo',parts:[],groups:[]}){
  globalThis.window??=globalThis;window.parent??=window;globalThis.location??=new URL('http://localhost/assembly/editor.html');
  const state={project:structuredClone(project)};
  const api=installAssemblyAPI({project:()=>state.project,catalog:()=>catalog,references,locked:()=>false,busy:()=>false,selection:()=>[],select(){},async transaction(fn){const before=structuredClone(state.project);try{return await fn();}catch(e){state.project=before;throw e;}}});
  const find=id=>{const p=state.project.parts.find(p=>p.id===id);if(!p)throw Error('Unknown part '+id);return p;};
  return {
    get project(){return state.project;},
    find,
    add(id,sku,position=[0,0,0],rotation=[0,0,0]){
      if(!catalog.some(p=>p.id===sku))throw Error('Unknown SKU '+sku);
      if(state.project.parts.some(p=>p.id===id))throw Error('Duplicate part id '+id);
      state.project.parts.push({id,sku,label:partName(sku),position:[...position],rotation:[...rotation]});
    },
    /** Pose `id` by putting its connector into `toRef` of `to`; `twist` turns it about that axis. */
    async attach(id,ref,to,toRef,{twist=0,depth}={}){
      const source=find(id),target=find(to);
      const sourceRef=refId(source.sku,ref),targetRef=refId(target.sku,toRef);
      // 'max' seats a pin fully, like real parts pressed flush; the editor default leaves ~0.16 mm per side.
      if(depth==='max'){const x=references[source.sku].find(r=>r.id===sourceRef),y=references[target.sku].find(r=>r.id===targetRef);depth=compatibleReferences(x,y,source.sku,target.sku)?insertionLimit(x,y):undefined;}
      const result=await api.execute('attach',{id,targetId:to,sourceRef,targetRef,twist,...(depth===undefined?{}:{depth})});
      if(!result.ok)throw Error(`attach ${id}.${ref} -> ${to}.${toRef}: ${result.error}`);
      return result;
    },
    /** Distance in mm between two connectors, and whether they face each other. */
    gap(id,ref,to,toRef){
      const a=find(id),b=find(to);
      const x=worldReference(a,references[a.sku].find(r=>r.id===refId(a.sku,ref))),y=worldReference(b,references[b.sku].find(r=>r.id===refId(b.sku,toRef)));
      // Seated connectors share an axis; measure the off-axis distance and the facing.
      const d=x.point.clone().sub(y.point),axial=d.dot(y.normal);
      return {lateral:d.clone().addScaledVector(y.normal,-axial).length(),axial,facing:x.normal.dot(y.normal)};
    },
  };
}

const loader=new GLTFLoader(),meshCache=new Map();
export async function partScene(sku){
  if(!meshCache.has(sku)){const b=fs.readFileSync(path.join(ROOT,'public/assembly/parts',sku,'model.glb'));meshCache.set(sku,await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),''));}
  return meshCache.get(sku).scene.clone(true);
}
export function placeObject(object,part){
  object.position.set(...part.position.map(v=>v/1000));
  object.rotation.set(...part.rotation.map(THREE.MathUtils.degToRad));
  object.updateMatrixWorld(true);
  return object;
}
/** Real CAD collision check used by the editor's fit report. */
export async function collisions(project){
  const objects=new Map();
  for(const part of project.parts){
    const scene=await partScene(part.sku);
    // Electronics CAD ships long straight cables; real cables bend, so only the body collides.
    if(part.sku.startsWith('269-')){scene.updateMatrixWorld(true);const far=[];scene.traverse(n=>{if(n.isMesh&&isCable(part.sku,new THREE.Box3().setFromObject(n)))far.push(n);});far.forEach(n=>n.parent.remove(n));}
    objects.set(part.id,placeObject(scene,part));
  }
  const report=analyzeCollisions(project.parts,objects,{limit:200,references});
  const sku=id=>project.parts.find(p=>p.id===id).sku;
  // Pins, shafts, collars and standoffs touch their hole walls when seated; the editor's own
  // example car reports those too. That contact is only seating when the other part really has a
  // hole on the pin's axis, within the pin's length. A pin that pokes into a part where it has no
  // hole (a standoff into a motor body) is a real error.
  const part=id=>project.parts.find(p=>p.id===id);
  const seated=(pinId,otherId)=>{
    const pin=part(pinId),other=part(otherId);
    const refs=(references[pin.sku]??[]).map(r=>worldReference(pin,r));if(!refs.length)return false;
    const origin=refs[0].point,axis=refs[0].normal.clone().normalize();
    const along=refs.map(r=>r.point.clone().sub(origin).dot(axis)),lo=Math.min(...along)-1,hi=Math.max(...along)+1;
    return (references[other.sku]??[]).some(r=>{
      if(r.kind!=='hole')return false;const w=worldReference(other,r);
      if(Math.abs(w.normal.dot(axis))<.98)return false;
      const d=w.point.clone().sub(origin),t=d.dot(axis);
      return t>=lo&&t<=hi&&d.addScaledVector(axis,-t).length()<1;
    });
  };
  const severity=issue=>{
    const a=CONNECTOR_SKU.test(sku(issue.a)),b=CONNECTOR_SKU.test(sku(issue.b));
    if(!a&&!b)return 'error';
    // Two pins meeting in one hole from both sides, or a pin seated in a hole of the other part.
    if(a&&b)return 'seating';
    return (a?seated(issue.a,issue.b):seated(issue.b,issue.a))?'seating':'error';
  };
  return report.issues.filter(issue=>issue.kind!=='joint').map(issue=>({...issue,severity:severity(issue)}));
}
export const CONNECTOR_SKU=/^228-2500-(124|143|154|2221|2234|2238|2258|2260|2261|2268|2269|2271|328)$/;
