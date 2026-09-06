import {chromium} from 'playwright';
import fs from 'node:fs';
const num=(name,n)=>`<value name="${name}"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value>`;
const wait=`<block type="go_control_wait">${num('DURATION',3)}</block>`;
const eye='<value name="CONDITION"><block type="go_sensing_eye_found_object"><field name="EYE">Eye</field></block></value>';
const stop='<block type="go_drivetrain_stop_driving"/>';
const examples={
 wait:{xml:wait,caption:'wait 3 seconds',description:'Khối chờ 3 giây trước khi chuyển sang lệnh tiếp theo.'},
 speed:{xml:`<block type="go_motion_set_motor_velocity"><field name="MOTOR">Motor1</field>${num('VELOCITY',50)}</block>`,caption:'Set motor velocity',description:'Khối thiết lập tốc độ Motor1 là 50%.'},
 order:{xml:`<block type="go_motion_set_motor_velocity"><field name="MOTOR">Motor1</field>${num('VELOCITY',50)}<next><block type="go_motion_spin"><field name="MOTOR">Motor1</field><field name="DIRECTION">forward</field></block></next></block>`,caption:'Set velocity → spin motor',description:'Đặt tốc độ trước, sau đó bắt đầu quay động cơ.'},
 repeat:{xml:`<block type="go_control_repeat">${num('TIMES',10)}<statement name="SUBSTACK">${wait}</statement></block>`,caption:'repeat 10',description:'Khối repeat chứa một lệnh wait.'},
 until:{xml:`<block type="go_control_repeat_until">${eye}<statement name="SUBSTACK">${wait}</statement></block>`,caption:'repeat until · Eye sensor',description:'Vòng lặp kiểm tra điều kiện mắt phát hiện vật.'},
 condition:{xml:`<block type="go_control_if_then">${eye}<statement name="SUBSTACK">${stop}</statement></block>`,caption:'if · Eye sensor',description:'Khối if có điều kiện mắt phát hiện vật và lệnh dừng ở bên trong.'},
 forever:{xml:`<block type="go_control_forever"><statement name="SUBSTACK">${wait}</statement></block>`,caption:'forever',description:'Khối forever bao quanh lệnh wait.'}
};
fs.mkdirSync('public/quiz/blocks',{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:2});
 await page.addInitScript(()=>Object.defineProperty(window,'__vexStudioRequire',{configurable:true,get(){return window.quizRenderRequire;},set(value){window.quizRenderRequire=value;}}));
 await page.goto('http://localhost:3117/quiz?lesson=5b4e2977412b');
 await page.getByRole('button',{name:/^Coding task/}).click();
 const frame=await page.locator('.coding-editor iframe').elementHandle().then(e=>e.contentFrame());
 await frame.waitForFunction(()=>!!window.VexTraining&&!!window.quizRenderRequire);
 for(const [id,example] of Object.entries(examples)){
  const info=await frame.evaluate(xml=>{
   const B=window.quizRenderRequire('./src/Blockly/BlocklyAccess.ts').Blockly;
   const ws=window.quizRenderRequire('./src/Blockly/BlocklyController.ts').getCurrentMainController().blocklyWorkspace;
   ws.clear();ws.setScale(1);
   B.Xml.domToWorkspace(B.Xml.textToDom('<xml>'+xml+'</xml>'),ws);
   const top=ws.getTopBlocks(false)[0];top.moveBy(24,24);
   ws.getCanvas().id='quiz-capture-blocks';
   return ws.getAllBlocks(false).map(b=>({type:b.type,text:b.toString()}));
  },example.xml);
  await frame.locator('#quiz-capture-blocks').screenshot({path:`public/quiz/blocks/${id}.png`});
  example.rendered=info;example.src=`/quiz/blocks/${id}.png`;
 }
}finally{await browser.close();}
fs.writeFileSync('public/quiz/blocks/examples.json',JSON.stringify(examples,null,2));
console.log('Rendered',Object.keys(examples).length,'examples from the application Blockly renderer.');
