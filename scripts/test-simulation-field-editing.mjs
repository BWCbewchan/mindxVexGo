import assert from 'node:assert/strict';
import {createField,validateField,editField,fieldPresets} from '../public/simulation/fields.js';
import {lessons} from '../public/simulation/lessons.js';
for(const radius of [45,100,135,170])for(const preset of fieldPresets){const field=createField(preset.id,radius);assert.equal(validateField(field,radius).id,preset.id);const lesson=lessons[preset.id];assert.ok(lesson.steps.length>=3&&lesson.hints.length>=3&&lesson.extensions.length===3);assert.deepEqual(Object.keys(lesson.stem),['S','T','E','M']);}
const f=createField('push',135),before=JSON.stringify(f),next=editField(f,{kind:'block',id:'cargo',x:835,y:1505},135);assert.equal(next.blocks[0].x,840);assert.equal(next.blocks[0].y,1510);assert.equal(JSON.stringify(f),before);
assert.throws(()=>editField(f,{kind:'block',id:'cargo',x:400,y:1600},135),/chồng/);
assert.throws(()=>editField(f,{kind:'start',x:-50,y:1600},135),/ngoài sân/);
assert.throws(()=>validateField({...f,blocks:[{...f.blocks[0],width:-1}]},135),/kích thước/);
assert.throws(()=>validateField({...f,walls:[{x:350,y:1500,width:100,height:300}]},135),/tường/);
assert.throws(()=>validateField({...f,blocks:[f.blocks[0],f.blocks[0]]},135),/Vật thể/);
console.log('PASS: all 8 fields at 4 robot sizes, 8 detailed STEM lessons, immutable editing, 10 mm grid, out-of-bounds/overlap/wall/duplicate/invalid-size rejection.');
