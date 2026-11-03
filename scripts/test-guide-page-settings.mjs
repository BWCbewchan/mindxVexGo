import {buildAssemblyDocument} from '../public/assembly/document-model.js';
import assert from 'node:assert/strict';
import {guidePage,frameSettings,markerPoint} from '../public/assembly/guide-page-settings.js';
assert.deepEqual(guidePage(null),{});
const value={frames:{assembled:{image:{x:.1,y:-.2,zoom:1.5},markers:[],layout:{x:.5,y:0,width:.5,height:1}},detail:{markers:[{x:.25,y:.75,r:.012}],camera:{direction:[1,1,1],up:[0,1,0],zoom:.8}}}};
const result=guidePage(value);assert.equal(result.frames.assembled.markers.length,0);assert.equal(result.frames.detail.markers.length,1);assert.equal(result.frames.detail.camera.zoom,.8);assert.equal(frameSettings(result,'detail').image.zoom,1);
assert.deepEqual(markerPoint({x:.65,y:.25},{x:.1,y:-.2,zoom:1.5}),{x:.5333333333333333,y:.4666666666666667});
for(const invalid of [{frames:{assembled:{image:{x:Infinity,y:0,zoom:1}}}},{frames:{detail:{markers:[{x:-1,y:0,r:.01}]}}},{frames:{detail:{layout:{x:.8,y:0,width:.5,height:1}}}},{frames:{detail:{markers:Array(65).fill({x:0,y:0,r:.01})}}}])assert.throws(()=>guidePage(invalid),/hợp lệ|giới hạn/);
assert.equal(Object.hasOwn(guidePage({frames:{detail:{}}}).frames.detail,'markers'),false,'Missing markers means automatic; empty markers means intentionally hidden');
console.log('PASS: bounded per-frame image/layout/camera/markers, custom empty markers and inverse image coordinates.');

const current={title:'Before',parts:[],groups:[]},input={title:'Presentation',parts:[{id:'beam',sku:'demo'}],guidePreferences:{steps:{beam:{page:value}}}},options={platform:'vexgo',catalog:[{id:'demo',name:'Demo',kind:'beam'}],references:{}};
const imported=buildAssemblyDocument(current,input,options);assert.equal(imported.document.guidePreferences.steps.beam.page.frames.detail.markers.length,1);
const invalid=structuredClone(input);invalid.guidePreferences.steps.beam.page.frames.detail.markers[0].x=2;assert.throws(()=>buildAssemblyDocument(current,invalid,options),/hợp lệ|giới hạn/);assert.equal(current.parts.length,0,'Invalid presentation must not mutate the model document');
