import {chromium} from 'playwright';
import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
const compiled=ts.transpileModule(fs.readFileSync('app/quiz/code-check.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const browser=await chromium.launch({channel:'chrome'});
try{
 const page=await browser.newPage();await page.goto('http://localhost:3117/quiz?lesson=5b4e2977412b');await page.getByRole('button',{name:/^Coding task/}).click();
 await page.locator('.coding-requirements').waitFor();assert.ok(await page.locator('.coding-requirements').isVisible());assert.match(await page.locator('.coding-requirements').innerText(),/10%/);
 assert.doesNotMatch(await page.locator('.quiz-coding').innerText(),/Teacher review|giáo viên/);
 const results=await page.evaluate(compiled=>{
  const exp={};new Function('exports',compiled)(exp);
  const task={requirements:'Di chuyển về phía trước, chờ 3 giây rồi dừng lại.'};
  const move='<block type="go_drivetrain_drive"><next><block type="go_control_wait"><value name="DURATION"><shadow type="math_number"><field name="NUM">3</field></shadow></value><next><block type="go_drivetrain_stop_driving"/></next></block></next></block>';
  const hat=body=>'<xml><block type="go_events_when_started"><next>'+body+'</next></block></xml>';
  return {correct:exp.checkCode(task,hat(move)),wrong:exp.checkCode(task,hat(move.replace('>3<','>2<'))),disconnected:exp.checkCode(task,'<xml><block type="go_events_when_started"/>'+move+'</xml>'),afterStop:exp.checkCode(task,hat('<block type="go_control_stop_project"><next>'+move+'</next></block>')),falseBranch:exp.checkCode(task,hat('<block type="go_control_if_then"><value name="CONDITION"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value><statement name="SUBSTACK">'+move+'</statement></block>')),vague:exp.checkCode({requirements:'Sáng tạo mô hình từ các mô hình đã học'},hat(move))};
 },compiled);
 assert.ok(results.correct.checks.every(Boolean));assert.ok(results.wrong.checks.some(v=>!v));assert.ok(results.disconnected.checks.every(v=>!v));assert.ok(results.afterStop.checks.some(v=>!v));assert.ok(results.falseBranch.checks.some(v=>!v));assert.equal(results.vague.coverage,false);
 await page.waitForFunction(()=>!document.querySelector('.coding-toolbar .quiz-primary').disabled);
 await page.getByRole('button',{name:'Submit code',exact:true}).click();await page.locator('.coding-result.retry').waitFor();
 assert.match(await page.locator('.coding-result').innerText(),/cấu trúc/);
 await page.screenshot({path:'artifacts/quiz/automatic-code-check.png'});
 console.log('PASS: visible task, automatic inspection response, connected code, exact wait, disconnected/after-stop/false-branch rejection, unclear requirements not passed.');
}finally{await browser.close();}
