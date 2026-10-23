import {PGlite} from '@electric-sql/pglite';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const db=new PGlite();
const a='11111111-1111-4111-8111-111111111111',b='22222222-2222-4222-8222-222222222222',reviewer='33333333-3333-4333-8333-333333333333';
await db.exec(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;insert into auth.users values('${a}'),('${b}'),('${reviewer}');`);
await db.exec(await readFile('supabase/robotics-schema.sql','utf8'));
await db.exec(await readFile('supabase/robotics-guest-collection.sql','utf8'));
await db.query('insert into robotics_private.robotics_reviewers(user_id) values($1)',[reviewer]);
async function as(uid){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid||'']);await db.exec(`set role ${uid?'authenticated':'anon'}`);}
async function denied(fn,pattern){await assert.rejects(fn,pattern);}
const doc={version:1,platform:'vexgo',title:'Test chassis',parts:[{id:'beam',sku:'228-2500-001',label:'Beam',position:[0,0,0],rotation:[0,0,0]}],groups:[],steps:[]};
async function save(uid,localId,revision=null,document=doc){return (await db.query('select * from robotics.robotics_save_project($1,$2,$3,$4::jsonb,null,$5,$6::uuid)',[localId,'vexgo',document.title,JSON.stringify(document),revision,uid])).rows[0];}
try{
 await as(a);let project=await save(a,'cloud-test');assert.equal(project.revision,1);
 await denied(()=>save(b,'cloud-test',1),/ROBOTICS_ACCOUNT_CHANGED/);
 await denied(()=>save(a,'cloud-test',0),/ROBOTICS_CONFLICT/);
 project=await save(a,'cloud-test',1);assert.equal(project.revision,2);
 await as(b);assert.equal((await db.query('select * from robotics.robotics_projects')).rows.length,0);
 await denied(()=>db.query('insert into robotics.robotics_submissions(project_id,title,author_name,project_revision) values($1,$2,$3,2)',[project.id,'Other owner','B']),/ROBOTICS_PROJECT_NOT_OWNED/);
 await as();await denied(()=>db.query('select * from robotics.robotics_projects'),/permission denied/);
 console.log('PASS private ownership, expected account and revision, anonymous access');
 await as(a);await denied(()=>db.query('insert into robotics.robotics_submissions(project_id,title,author_name,project_revision) values($1,$2,$3,1)',[project.id,'Stale version','A']),/ROBOTICS_CONFLICT/);
 const submission=(await db.query('insert into robotics.robotics_submissions(project_id,title,description,author_name,project_revision) values($1,$2,$3,$4,2) returning *',[project.id,doc.title,'Synthetic test','A'])).rows[0];
 assert.deepEqual(submission.document,doc);assert.equal(submission.status,'pending');
 assert.equal((await db.query("update robotics.robotics_submissions set status='approved' where id=$1 returning id",[submission.id])).rows.length,0);
 await denied(()=>db.query('update robotics.robotics_submissions set document=$1 where id=$2',[doc,submission.id]),/permission denied/);
 await denied(()=>db.query('insert into robotics_private.robotics_reviewers(user_id) values($1)',[a]),/permission denied/);
 const empty=await save(a,'empty',null,{...doc,parts:[]});await denied(()=>db.query('insert into robotics.robotics_submissions(project_id,title,author_name,project_revision) values($1,$2,$3,1)',[empty.id,'Empty','A']),/ROBOTICS_EMPTY_MODEL/);
 await as();assert.equal((await db.query('select * from robotics.robotics_submissions')).rows.length,0);
 await as(b);assert.equal((await db.query('select robotics.robotics_is_reviewer() as allowed')).rows[0].allowed,false);assert.equal((await db.query('select * from robotics.robotics_submissions')).rows.length,0);
 console.log('PASS snapshot revision, empty model rejection, owner cannot approve, protected reviewer membership');
 await as(reviewer);assert.equal((await db.query('select robotics.robotics_is_reviewer() as allowed')).rows[0].allowed,true);assert.equal((await db.query('select * from robotics.robotics_submissions')).rows.length,1);
 await db.query("update robotics.robotics_submissions set status='approved',review_note='Test approved' where id=$1",[submission.id]);
 await as();assert.equal((await db.query('select * from robotics.robotics_submissions')).rows.length,1);
 await as(a);await save(a,'cloud-test',2,{...doc,title:'Changed private draft'});
 assert.equal((await db.query('select document from robotics.robotics_submissions where id=$1',[submission.id])).rows[0].document.title,doc.title);
 await as(reviewer);await db.query("update robotics.robotics_submissions set status='rejected' where id=$1",[submission.id]);
 await as();assert.equal((await db.query('select * from robotics.robotics_submissions')).rows.length,0);
 console.log('PASS reviewer approval, public visibility, immutable published snapshot, unpublishing');
 const device='44444444-4444-4444-8444-444444444444',otherDevice='55555555-5555-4555-8555-555555555555',secret='a'.repeat(64),otherSecret='b'.repeat(64);
 const guestSave=(revision=null,data=doc)=>db.query('select * from robotics.robotics_guest_save($1,$2,$3,$4,$5,$6::jsonb,null,$7)',[device,secret,'guest-car','vexgo',data.title,JSON.stringify(data),revision]).then(r=>r.rows[0]);
 await as();const guest=await guestSave();assert.equal(guest.owner_id,null);assert.equal(guest.visitor_id,device);assert.equal(guest.revision,1);
 assert.equal((await db.query('select robotics.robotics_guest_projects($1,$2,0) as projects',[device,secret])).rows[0].projects.length,1);
 assert.equal((await db.query('select robotics.robotics_guest_projects($1,$2,0) as projects',[otherDevice,otherSecret])).rows[0].projects.length,0);
 await denied(()=>db.query('select robotics.robotics_guest_projects($1,$2,0)',[device,otherSecret]),/ROBOTICS_GUEST_DENIED/);
 assert.equal((await db.query('select robotics.robotics_guest_project($1,$2,$3) as project',[otherDevice,otherSecret,guest.id])).rows[0].project,null);
 await denied(()=>db.query('select * from robotics_private.robotics_visitors'),/permission denied/);
 await denied(()=>db.query('select robotics.robotics_collected_projects(0)'),/permission denied/);
 await denied(()=>guestSave(),/ROBOTICS_CONFLICT/);
 const sent=(await db.query('select robotics.robotics_guest_submit($1,$2,$3,1,$4) as id',[device,secret,guest.id,'Guest model'])).rows[0].id;
 assert.equal((await db.query('select * from robotics.robotics_submissions where id=$1',[sent])).rows.length,0);
 assert.equal((await db.query('select robotics.robotics_guest_submissions($1,$2) as items',[device,secret])).rows[0].items.length,1);
 console.log('PASS guest autosave, separate visitor capabilities, wrong-secret rejection, direct table denial and private submission');
 await as(b);assert.equal((await db.query('select * from robotics.robotics_projects where id=$1',[guest.id])).rows.length,0);
 await denied(()=>db.query('select robotics.robotics_review_collected($1,1,$2,$3)',[guest.id,'approved','']),/ROBOTICS_REVIEWER_REQUIRED/);
 await denied(()=>db.query('select robotics.robotics_collected_project($1)',[guest.id]),/ROBOTICS_REVIEWER_REQUIRED/);
 await as(reviewer);assert.equal((await db.query('select * from robotics.robotics_collected_project($1)',[guest.id])).rows[0].visitor_id,device);
 const collected=(await db.query('select robotics.robotics_collected_projects(0) as projects')).rows[0].projects;assert.ok(collected.some(p=>p.id===guest.id));assert.ok(collected.some(p=>p.id===project.id));assert.equal('document' in collected[0],false);
 await denied(()=>db.query('select robotics.robotics_review_collected($1,0,$2,$3)',[guest.id,'approved','']),/ROBOTICS_CONFLICT/);
 await db.query('select robotics.robotics_review_collected($1,1,$2,$3)',[guest.id,'approved','']);
 await as();assert.equal((await db.query('select * from robotics.robotics_submissions where id=$1',[sent])).rows[0].status,'approved');
 await guestSave(1,{...doc,title:'Guest private change'});assert.equal((await db.query('select document from robotics.robotics_submissions where id=$1',[sent])).rows[0].document.title,doc.title);
 await as(reviewer);const auto=(await db.query('select robotics.robotics_review_collected($1,2,$2,$3) as id',[guest.id,'rejected','Change model'])).rows[0].id;assert.ok(auto);
 await as();assert.equal((await db.query('select * from robotics.robotics_submissions where id=$1',[auto])).rows.length,0);
 console.log('PASS reviewer-only automatic collection, stale review rejection, guest publication and immutable snapshots');
}finally{await db.close();}
