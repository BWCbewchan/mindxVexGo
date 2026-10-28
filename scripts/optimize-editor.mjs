import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {minify}=require('next/dist/compiled/terser');
// Generate deploy-only files; keep the original vendor bundle and its preparation
// patches as the source of truth. No property mangling or unsafe optimizations.
const source=await fs.readFile('public/editor/dist/main.bundle.js','utf8');
const result=await minify(source,{compress:false,mangle:false,format:{comments:/@license|@preserve|^!/}});
if(!result.code)throw Error('Editor minification returned no code');
const hash=createHash('sha256').update(result.code).digest('hex').slice(0,16);
const name=`main.${hash}.bundle.js`;
await fs.writeFile(`public/editor/dist/${name}`,result.code,'utf8');
const html=(await fs.readFile('public/editor/index.html','utf8')).replace('<head>','<head><base href="/editor/">').replace('dist/main.bundle.js',`dist/${name}`);
if(!html.includes(name))throw Error('Editor bundle entry was not found');
await fs.writeFile('public/editor/runtime.html',html,'utf8');
console.log(`Editor: ${(Buffer.byteLength(source)/1e6).toFixed(1)} MB → ${(Buffer.byteLength(result.code)/1e6).toFixed(1)} MB; ${name}`);
