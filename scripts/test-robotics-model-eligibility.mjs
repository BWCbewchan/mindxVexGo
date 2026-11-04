import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import {PGlite} from '@electric-sql/pglite';
const exports={};vm.runInNewContext(ts.transpileModule(await fs.readFile('lib/robotics/model-eligibility.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports});
const db=new PGlite();try{
 await db.exec('create role anon; create role authenticated; create schema robotics; create table robotics.robotics_projects(document jsonb); create table robotics.robotics_submissions(document jsonb);');
 await db.exec(await fs.readFile('supabase/robotics-assembled-models.sql','utf8'));
 const beam={id:'beam'},pin={id:'pin',mate:{target:'beam',sourceRef:'1',targetRef:'1'}},cases=[{parts:[]},{parts:[beam]},{parts:[beam,{id:'pin'}],groups:[{id:'group'}]},{parts:[beam,{...pin,mate:{...pin.mate,target:'missing'}}]},{parts:[beam,{...pin,mate:{...pin.mate,target:'pin'}}]},{parts:[beam,{...pin,mate:{...pin.mate,sourceRef:0}}]},{parts:null},{parts:'invalid'},{parts:[beam,pin]}];
 for(const doc of cases){const expected=exports.hasAssembledParts(doc),result=await db.query('select robotics.robotics_has_assembled_parts($1::jsonb) eligible',[JSON.stringify(doc)]);assert.equal(result.rows[0].eligible,expected,'Client and database eligibility must agree');if(expected)await db.query('insert into robotics.robotics_projects values($1::jsonb)',[JSON.stringify(doc)]);else await assert.rejects(db.query('insert into robotics.robotics_projects values($1::jsonb)',[JSON.stringify(doc)]),/assembled_model/);}
 for(const platform of ['vexgo','vexiq','lego'])assert.ok(exports.hasAssembledParts({platform,parts:[beam,pin]}));
 console.log('PASS: client/database parity; empty, single, grouped loose, dangling and self joints rejected; connected VEX GO/IQ/LEGO models accepted.');
}finally{await db.close();}
