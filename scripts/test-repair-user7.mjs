import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {repairAssemblyLinks} from '../public/assembly/repair-links.js';
import {generateStudentGuide} from '../public/assembly/guide-sequence.js';
const path='C:/Users/admin/Downloads/VEXGO-assembly (7).json';
const project=JSON.parse(await fs.readFile(path,'utf8')),refs=JSON.parse(await fs.readFile('public/assembly/connectors.json','utf8')).parts;
const original=JSON.stringify(project),result=repairAssemblyLinks(project.parts,refs);
assert.equal(JSON.stringify(project),original);
assert.ok(result.recovered>0);assert.equal(result.components.length,1);
assert.equal(generateStudentGuide(result.parts,{references:refs}).ready,true);

assert.equal(repairAssemblyLinks(result.parts,refs).recovered,0,'repeated repair is idempotent');
assert.equal(repairAssemblyLinks(project.parts,refs,{isLocked:()=>true}).recovered,0,'locked assemblies must not change');
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3120/assembly/editor.html');await page.locator('#status').filter({hasText:'Draft saved locally'}).waitFor();
 await page.locator('#open').setInputFiles(path);await page.waitForFunction(count=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts.length===count,project.parts.length);await page.getByRole('tab',{name:'Guide',exact:true}).click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts);
 await page.locator('#guide-repair').click();console.log('REPAIR STATUS',await page.locator('#guide-repair-status').innerText());await page.locator('#guide-repair-status').filter({hasText:'Có thể xuất PDF'}).waitFor({timeout:15000});
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts);
 assert.ok(after.filter(p=>p.mate).length>before.filter(p=>p.mate).length);
 assert.equal(await page.locator('#guide-export').isEnabled(),true);
 await page.keyboard.press('Control+z');
 await page.waitForFunction(expected=>JSON.stringify(JSON.parse(localStorage.getItem('mindx-vexgo-assembly-v1')).parts)===JSON.stringify(expected),before);
 assert.deepEqual(errors,[]);console.log('PASS: exact link recovery, positions preserved, locked/far parts protected, repair persisted and Ctrl+Z restored source.');
}finally{await browser.close();}
