import {chromium} from 'playwright';
import fs from 'node:fs';
const num=(name,n)=>`<value name="${name}"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value>`;
const wait=`<block type="go_control_wait">${num('DURATION',3)}</block>`;
const eye='<value name="CONDITION"><block type="go_sensing_eye_found_object"><field name="EYE">Eye</field></block></value>';
const stop='<block type="go_drivetrain_stop_driving"/>';
const examples={
 drive:{xml:`<block type="go_drivetrain_drive_for"><field name="DIRECTION">fwd</field><field name="UNITS">mm</field>${num('AMOUNT',200)}</block>`,caption:'drive forward 200 mm',description:'Robot di chuyển tiến một đoạn 200 mm.'},
 turn:{xml:`<block type="go_drivetrain_turn_for"><field name="TURNDIRECTION">right</field>${num('AMOUNT',90)}</block>`,caption:'turn right 90 degrees',description:'Robot rẽ phải 90 độ.'},
 sequence:{xml:`<block type="go_drivetrain_drive_for"><field name="DIRECTION">fwd</field><field name="UNITS">mm</field>${num('AMOUNT',200)}<next><block type="go_drivetrain_turn_for"><field name="TURNDIRECTION">right</field>${num('AMOUNT',90)}</block></next></block>`,caption:'drive → turn',description:'Chuỗi di chuyển tiến 200 mm rồi rẽ phải 90 độ.'},
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
 const page=await browser.newPage({viewport:{width:1800,height:1100},deviceScaleFactor:2});
 await page.addInitScript(()=>Object.defineProperty(window,'__vexStudioRequire',{configurable:true,get(){return window.quizRenderRequire;},set(value){window.quizRenderRequire=value;}}));
 await page.goto('http://localhost:3117/quiz?lesson=5b4e2977412b');
 await page.getByRole('button',{name:/^Coding task/}).click();
 await page.getByRole('button',{name:'Hide map',exact:true}).click();
 const frame=await page.locator('.coding-editor iframe').elementHandle().then(e=>e.contentFrame());
 await frame.waitForFunction(()=>!!window.VexTraining&&!!window.quizRenderRequire);
 const capture=await browser.newPage({viewport:{width:1800,height:1100},deviceScaleFactor:2});
 for(const [id,example] of Object.entries(examples)){
  const info=await frame.evaluate(xml=>{
   const B=window.quizRenderRequire('./src/Blockly/BlocklyAccess.ts').Blockly;
   const ws=window.quizRenderRequire('./src/Blockly/BlocklyController.ts').getCurrentMainController().blocklyWorkspace;
   ws.clear();ws.setScale(1);
   B.Xml.domToWorkspace(B.Xml.textToDom('<xml>'+xml+'</xml>'),ws);
   const top=ws.getTopBlocks(false)[0];top.moveBy(24,24);
   ws.getCanvas().id='quiz-capture-blocks';
   const original=top.getSvgRoot(),copy=original.cloneNode(true),box=original.getBBox();
   const source=[original,...original.querySelectorAll('*')],dest=[copy,...copy.querySelectorAll('*')];
   source.forEach((el,i)=>{const style=getComputedStyle(el);for(const property of ['fill','fill-opacity','stroke','stroke-width','stroke-opacity','font-family','font-size','font-weight','text-anchor','dominant-baseline','opacity'])dest[i].style.setProperty(property,style.getPropertyValue(property));});
   copy.setAttribute('transform',`translate(${8-box.x},${8-box.y})`);
   return {blocks:ws.getAllBlocks(false).map(b=>({type:b.type,text:b.toString()})),svg:`<svg xmlns="http://www.w3.org/2000/svg" width="${box.width+16}" height="${box.height+16}" viewBox="0 0 ${box.width+16} ${box.height+16}">${new XMLSerializer().serializeToString(copy)}</svg>`};
  },example.xml);
  await capture.setContent('<style>body{margin:0;background:white}</style>'+info.svg);
  await capture.locator('svg').first().screenshot({path:`public/quiz/blocks/${id}.png`});
  example.rendered=info.blocks;example.src=`/quiz/blocks/${id}.png`;
 }
}finally{await browser.close();}
fs.writeFileSync('public/quiz/blocks/examples.json',JSON.stringify(examples,null,2));
console.log('Rendered',Object.keys(examples).length,'examples from the application Blockly renderer.');
