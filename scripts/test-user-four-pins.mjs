import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {normalizeMatedJoints,matingPose,seatedPinMatches} from '../public/assembly/mating.js';
const p=JSON.parse(await fs.readFile('C:/Users/admin/Downloads/VEXGO-assembly (6).json','utf8')),r=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const b=p.parts.at(-1),original=structuredClone(b.position),m=b.mate,t=p.parts.find(x=>x.id===m.target);
const pose=matingPose(b,r[b.sku].find(x=>x.id===m.sourceRef),t,r[t.sku].find(x=>x.id===m.targetRef),{depth:m.depth});
assert.equal(seatedPinMatches({...b,...pose},p.parts,r).length,4);
normalizeMatedJoints(p.parts,r);assert.equal(b.mate,undefined);assert.deepEqual(b.position,original);console.log('PASS: user file accepts four pins within 1 mm tolerance; stale beam joint removed without teleporting the model.');
