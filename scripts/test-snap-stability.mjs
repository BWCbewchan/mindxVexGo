import assert from 'node:assert/strict';
import {nearestMate} from '../public/assembly/mating.js';
import {nearestAssemblyMate,assemblyMatingContext} from '../public/assembly/assembly-mating.js';
const references={hole:[{id:'h',kind:'hole',point:[0,0,0],normal:[0,-1,0],radius:2.2,depth:4}],pin:[{id:'p',kind:'pin',point:[0,0,0],normal:[0,1,0],radius:2.2,depth:4}]};
const source={id:'s',sku:'hole',position:[3.9,-4,0],rotation:[0,0,0]},left={id:'left',sku:'pin',position:[0,0,0],rotation:[0,0,0]},right={...left,id:'right',position:[8,0,0]},companion={...source,id:'companion',position:[500,-4,0]};
for(const grouped of [false,true]){
 const parts=[source,left,right,...(grouped?[companion]:[])],ids=grouped?['s','companion']:['s'];
 source.position=[3.9,-4,0];const context=assemblyMatingContext(structuredClone(parts),references);
 const find=preferred=>grouped?nearestAssemblyMate(parts,references,ids,{context,preferred}):nearestMate(source,parts,references,{preferred});
 const first=find();assert.equal(first.target.id,'left');
 for(const x of [4.1,3.95,4.2,4.05]){source.position=[x,-4,0];assert.equal(find(first).target.id,'left','Small pointer jitter keeps the current connector');}
 source.position=[6,-4,0];assert.equal(find(first).target.id,'right','A deliberate move switches connectors');
 source.position=[100,-4,0];assert.equal(find(first),null,'Leaving snap range releases the preferred connector');
}
console.log('PASS: single/group hints resist jitter, switch on deliberate movement, and release outside snap range.');
