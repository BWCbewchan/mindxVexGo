import assert from 'node:assert/strict';
import {sequenceIssue} from '../public/assembly/guide-sequence.js';
const a={id:'rail'}, b={id:'pin'};
assert.equal(sequenceIssue([{parts:[a]},{parts:[a,b]}]),null);
assert.match(sequenceIssue([{parts:[a,b]},{parts:[a]}]),/Step 2 removes/);
assert.equal(sequenceIssue([{parts:[a]},{parts:[{...a,position:[1,2,3]},b]}]),null);
assert.equal(sequenceIssue([]),null);
assert.match(sequenceIssue([{parts:[{id:'pin',mate:{target:'missing'}}]}]),/without its target/);
console.log('Cumulative assembly sequence checks passed.');
