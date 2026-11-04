import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {IQ_COLOR_VERSION,iqAppearance} from '../public/assembly/iq/color-profile.js';
import {IQ_PREVIEW_REVISIONS} from '../public/assembly/iq/preview-revisions.js';

const base=process.env.BASE_URL||'http://localhost:3131',root='public/assembly/iq';
const catalog=JSON.parse(await fs.readFile(root+'/parts.json','utf8'));
const stamps=JSON.parse(await fs.readFile(root+'/preview-manifest.json','utf8'));
const revisions={...IQ_PREVIEW_REVISIONS};
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();
 await page.goto(base+'/assembly/iq/preview-renderer.html');
 await page.waitForFunction(()=>window.renderPart);
 for(const id of (process.argv.includes('--ids')?process.argv[process.argv.indexOf('--ids')+1].split(','):['228-6480','228-7045','228-7082','228-7106'])){
  const row=catalog.find(p=>p.id===id),appearance=iqAppearance(row);
  const url=await page.evaluate(id=>window.renderPart(id),id);
  const bytes=Buffer.from(url.split(',')[1],'base64');
  await fs.writeFile(`${root}/parts/${id}/preview.png`,bytes);
  stamps[id]=JSON.stringify({sourceHash:row.sourceHash,version:IQ_COLOR_VERSION,appearance});
  revisions[id]=createHash('sha256').update(bytes).digest('hex').slice(0,16);
  console.log('Rendered official CAD preview:',id,bytes.length,'bytes');
 }
 await fs.writeFile(root+'/preview-manifest.json',JSON.stringify(stamps,null,2),'utf8');
 await fs.writeFile(root+'/preview-revisions.js','// Generated from actual preview image content. Do not edit.\nexport const IQ_PREVIEW_REVISIONS='+JSON.stringify(revisions)+';\n','utf8');
}finally{await browser.close();}
