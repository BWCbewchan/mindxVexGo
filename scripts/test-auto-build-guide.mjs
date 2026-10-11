import assert from 'node:assert/strict';
import { generateStudentGuide } from '../public/assembly/guide-sequence.js';

const hole = { id: 'hole', kind: 'hole', radius: 2.1, depth: 4.5 };
const pin = { id: 'pin', kind: 'pin', radius: 2.1, depth: 4.5 };
const references = { beam: [hole], pin: [pin, hole] };
const nameFor = part => part.label;
const isElectronic = sku => sku === 'electronics';
const parts = [
  { id: 'beam-b', sku: 'beam', label: 'Top Beam', position: [0, 0, 0], rotation: [0, 0, 0], mate: { target: 'connector', sourceRef: 'hole', targetRef: 'pin', depth: 4.5 } },
  { id: 'brain', sku: 'electronics', label: 'Brain', position: [0, 0, 0], rotation: [0, 0, 0] },
  { id: 'connector', sku: 'pin', label: 'Gray Pin', position: [0, 0, 0], rotation: [0, 0, 0], mate: { target: 'base', sourceRef: 'pin', targetRef: 'hole', depth: 4.5 } },
  { id: 'base', sku: 'beam', label: 'Base Beam', position: [0, 0, 0], rotation: [0, 0, 0] },
  { id: 'battery', sku: 'electronics', label: 'Battery', position: [0, 0, 0], rotation: [0, 0, 0] },
];
const guide = generateStudentGuide(parts, { references, nameFor, isElectronic });
assert.equal(guide.ready, true);
assert.deepEqual(guide.steps.map(step => step.added.map(part => part.id)), [['base', 'connector'], ['beam-b'], ['brain', 'battery']]);
assert.deepEqual(guide.steps.map(step => step.parts.length), [2, 3, 5], 'Each preview accumulates the earlier pieces.');
assert.match(guide.steps[0].title, /Gray Pin.*Base Beam/);
assert.ok(guide.steps[0].title.startsWith('Lắp '), 'the first numbered step describes a real attachment action');
assert.match(guide.steps[0].note, /chốt.*lỗ/);
assert.match(guide.steps[1].note, /Gray Pin/);
assert.equal(guide.steps.at(-1).type, 'electronics');
assert.equal(guide.notes.length, 1, 'Unconnected electronics are explicitly flagged for manual mounting/cable review.');

const squareReferences = {
  beam: [{ id: 'square-hole', kind: 'hole', profile: 'square-drive', width: 4, depth: 6 }],
  shaft: [{ id: 'square-pin', kind: 'pin', profile: 'square-drive', width: 4, depth: 6 }],
};
const squareGuide = generateStudentGuide([
  { id: 'beam-root', sku: 'beam', label: 'Dầm', position: [0, 0, 0], rotation: [0, 0, 0] },
  { id: 'shaft-child', sku: 'shaft', label: 'Trục', position: [0, 0, 0], rotation: [0, 0, 0], mate: { target: 'beam-root', sourceRef: 'square-pin', targetRef: 'square-hole', depth: 6 } },
], { references: squareReferences, nameFor, isElectronic });
assert.equal(squareGuide.ready, true);
assert.match(squareGuide.steps[0].note, /trục vuông.*lỗ vuông/);

const disconnected = generateStudentGuide([
  parts.find(part => part.id === 'base'),
  { id: 'loose', sku: 'beam', label: 'Loose Beam', position: [0, 0, 0], rotation: [0, 0, 0] },
], { references, nameFor, isElectronic });
assert.equal(disconnected.ready, false);
assert.match(disconnected.blockers.join(' '), /separate mechanical assemblies/);

const loop = generateStudentGuide([
  { ...parts.find(part => part.id === 'base'), mate: { target: 'connector', sourceRef: 'hole', targetRef: 'pin', depth: 4 } },
  parts.find(part => part.id === 'connector'),
], { references, nameFor, isElectronic });
assert.equal(loop.ready, false);
assert.match(loop.blockers.join(' '), /starting part|loop/i);

const singleCollar=generateStudentGuide([{id:'retainer',sku:'228-2500-143',label:'Shaft Collar',position:[0,0,0],rotation:[0,0,0]}]);
assert.equal(singleCollar.ready,true,'a single retainer uses the one-piece placement path instead of trying to find a chassis');
assert.equal(singleCollar.steps.length,1);

console.log('PASS: joint-derived ordering, cumulative step images, detached-electronics review, disconnected-model blocker and loop detection.');
