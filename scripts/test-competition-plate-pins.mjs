import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateGroupGuide} from '../public/assembly/group-guide.js';
import {seatedPinMatches} from '../public/assembly/mating.js';

const fixture=readFileSync(new URL('../public/assembly/competition-base-grouped-local.html',import.meta.url),'utf8');
const project=JSON.parse(fixture.slice(fixture.indexOf(',{\n')+1,fixture.lastIndexOf('});location')+1));
const {parts:references}=JSON.parse(readFileSync(new URL('../public/assembly/connectors.json',import.meta.url)));
const guide=generateGroupGuide(project,{references});
const plates=guide.steps.filter(step=>step.title.includes('Dark Gray Plate vào Red Pin'));
assert.equal(plates.length,2);
for(const step of plates){
 const plate=step.parts.find(part=>part.id===step.joint.part);
 const seats=seatedPinMatches(plate,step.parts,references);
 assert.equal(new Set(seats.map(seat=>seat.target)).size,4);
 assert.equal(new Set(seats.map(seat=>seat.sourceRef)).size,4);
}
console.log('PASS both Competition Base plates have four separate mounted pins before insertion');
