// Print where a placed part's connectors are in the world (mm) and which way they face.
// Usage: node scripts/vexgo/where.mjs <project.json> <partId> [name-prefix...]
import fs from 'node:fs';import {references,connectorNames} from './lib.mjs';import {worldReference} from '../../public/assembly/mating.js';
const [file,id,...want]=process.argv.slice(2);const p=JSON.parse(fs.readFileSync(file,'utf8'));const q=p.parts.find(x=>x.id===id);
if(!q)throw Error('Unknown part '+id);
for(const r of connectorNames(q.sku))if(!want.length||want.some(w=>r.name.startsWith(w))){const w=worldReference(q,references[q.sku].find(x=>x.id===r.id));console.log(r.name.padEnd(10),w.point.toArray().map(v=>v.toFixed(1)).join(','),'n',w.normal.toArray().map(v=>v.toFixed(1)).join(','));}
