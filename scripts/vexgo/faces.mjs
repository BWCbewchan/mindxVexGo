// Which side of a part is its "tooth" side (pins/bosses sticking out) and which is flat, from the
// connector data and the mesh. Usage: node scripts/vexgo/faces.mjs <sku>...
import fs from 'node:fs';import path from 'node:path';import * as THREE from 'three';
import {connectorNames,partScene,partName,isCable} from './lib.mjs';
for(const sku of process.argv.slice(2)){
  const scene=await partScene(sku);scene.updateMatrixWorld(true);
  const box=new THREE.Box3();scene.traverse(n=>{if(n.isMesh){const b=new THREE.Box3().setFromObject(n);if(!isCable(sku,b))box.union(b);}});
  const min=box.min.toArray().map(v=>v*1000),max=box.max.toArray().map(v=>v*1000);
  const rows=connectorNames(sku);const out=[];
  for(const [i,a] of ['x','y','z'].entries())for(const s of ['+','-']){
    const face=s+a,on=rows.filter(r=>r.name.replace(/#\d+$/,'').endsWith(face));if(!on.length)continue;
    const pins=on.filter(r=>r.kind==='pin'),holes=on.filter(r=>r.kind==='hole');
    // Pins reaching beyond the body surface on this side are teeth (they stick out).
    const surface=s==='+'?max[i]:min[i];
    const teeth=pins.filter(r=>s==='+'?r.point[i]>=surface-1.5:r.point[i]<=surface+1.5);
    out.push(`${face}: ${holes.length} holes, ${pins.length} pins${teeth.length?`, ${teeth.length} sticking out (TOOTH side)`:''}; surface at ${surface.toFixed(1)} mm`);
  }
  console.log(`${partName(sku)} ${sku}  body ${min.map(v=>v.toFixed(1)).join(',')} .. ${max.map(v=>v.toFixed(1)).join(',')}\n  `+out.join('\n  '));
}
