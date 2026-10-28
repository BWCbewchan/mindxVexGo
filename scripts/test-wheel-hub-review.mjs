import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {reviewMechanics} from '../public/assembly/assembly-review.js';
import {seatedConnections} from '../public/assembly/assembly-review.js';
import {driveStack} from '../public/assembly/drive-preview.js';
const parts=JSON.parse(await fs.readFile('artifacts/assembly-practical-review/recipe.json','utf8'));
const references=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const issues=reviewMechanics(parts,references);
assert.deepEqual(issues,[],'Standoffs in peripheral holes must not replace the central axle in wheel support review');
const noAxle=parts.filter(p=>p.id!=='free-wheel-axle');
assert.ok(reviewMechanics(noAxle,references).some(issue=>issue.kind==='support'&&issue.ids.includes('free-wheel')),'Peripheral standoffs cannot count as axle support');
const noCollar=parts.filter(p=>p.id!=='left-drive-collar');
assert.ok(reviewMechanics(noCollar,references).some(issue=>issue.kind==='retention'&&issue.ids.includes('left-drive-wheel')));
const contacts=seatedConnections(parts,references);
for(const side of ['left','right']){const stack=driveStack(parts,contacts,references,side+'-motor');assert.ok(stack);assert.deepEqual(stack.ids.sort(),[side+'-drive-shaft',side+'-drive-wheel',side+'-drive-collar'].sort(),'Round plate bearing must not be dragged into the driven stack');}
assert.equal(driveStack(parts,contacts,references,'left-side-plate'),null);
console.log('PASS: actual central wheel bore, peripheral standoff rejection and missing-collar detection.');
