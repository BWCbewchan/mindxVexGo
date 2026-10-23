import {createClient} from '@supabase/supabase-js';
import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {randomBytes,randomUUID} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';

const url=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_URL,key=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_PUBLISHABLE_KEY,password=process.env.ROBOTICS_TEST_PASSWORD;
if(!url||!key||!password)throw Error('Configure Supabase and supply ROBOTICS_TEST_PASSWORD at runtime.');
const origin=process.env.ROBOTICS_TEST_ORIGIN||'http://localhost:3120',email=process.env.ROBOTICS_TEST_EMAIL||'baotc@robotics.mindx.edu.vn';
const options={db:{schema:'robotics'},auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}},anon=createClient(url,key,options),reviewer=createClient(url,key,options);
const guestA={id:randomUUID(),secret:randomBytes(32).toString('hex')},guestB={id:randomUUID(),secret:randomBytes(32).toString('hex')};
const args=g=>({p_device:g.id,p_secret:g.secret});
const title='QA Guest '+Date.now(),localId='qa-guest-'+randomUUID(),document={version:1,platform:'vexgo',title,hideCables:true,parts:[{id:'beam',sku:'228-2500-001',label:'Red Beam',position:[0,0,0],rotation:[0,0,0]}],groups:[],steps:[]};
async function ok(result){if(result.error)throw result.error;return result.data;}
const find=()=>anon.rpc('robotics_guest_project',{...args(guestA),p_platform:'vexgo',p_local_id:localId}).then(ok);
await mkdir('artifacts/robotics-cloud',{recursive:true});
// UUIDs only: the host removes exactly these synthetic visitors after the run.
await writeFile('artifacts/robotics-cloud/guest-test-cleanup.json',JSON.stringify({visitorIds:[guestA.id,guestB.id]}));
let browser,adminProjectId,debugPage;
try{
 browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const aContext=await browser.newContext({viewport:{width:1440,height:1000}}),bContext=await browser.newContext({viewport:{width:1440,height:1000}}),adminContext=await browser.newContext({viewport:{width:1440,height:1000}});
 const a=await aContext.newPage(),b=await bContext.newPage(),admin=await adminContext.newPage(),errors=[];debugPage=a;
 for(const p of [a,b,admin])p.on('pageerror',e=>errors.push(e.message));
 await a.addInitScript(({guest,document,localId})=>{if(window!==window.top)return;if(!localStorage.getItem('mindx-robotics-visitor-v1'))localStorage.setItem('mindx-robotics-visitor-v1',JSON.stringify(guest));const key='mindx-assembly-project-v1:vexgo:'+localId;if(!localStorage.getItem(key)){localStorage.setItem(key,JSON.stringify(document));localStorage.setItem('mindx-assembly-projects-v1',JSON.stringify([{id:localId,platform:'vexgo',title:document.title,partCount:1,createdAt:Date.now(),updatedAt:Date.now()}]));}},{guest:guestA,document,localId});
 await b.addInitScript(guest=>{if(window===window.top&&!localStorage.getItem('mindx-robotics-visitor-v1'))localStorage.setItem('mindx-robotics-visitor-v1',JSON.stringify(guest));},guestB);
 await a.goto(origin+'/assembly');
 await a.getByRole('heading',{name:'Bắt đầu một bản lắp mới.',exact:true}).waitFor();
 const card=a.getByRole('article').filter({hasText:title});await card.getByRole('heading',{name:title,exact:true}).waitFor();
 await expect.poll(async()=>Boolean((await find())?.id),{timeout:30000}).toBe(true);
 assert.equal(await a.evaluate(()=>localStorage.getItem('mindx-robotics-auth-v1')),null);
 assert.equal(await a.getByRole('region',{name:'Dự án đám mây'}).count(),0);assert.equal(await a.getByText(/database|TỰ ĐỘNG LƯU · KHÔNG CẦN ĐĂNG NHẬP|Dự án đã lưu trên hệ thống/).count(),0);await a.screenshot({path:'artifacts/robotics-cloud/guest-autosave.png',fullPage:true});
 const project=await find();assert.equal(project.owner_id,null);assert.equal(project.visitor_id,guestA.id);
 assert.equal((await anon.from('robotics_projects').select('id').eq('id',project.id)).error?.code,'42501');
 const wrong=await anon.rpc('robotics_guest_project',{...args(guestA),p_secret:guestB.secret,p_id:project.id});assert.match(wrong.error?.message||'',/ROBOTICS_GUEST_DENIED/);
 assert.equal((await anon.rpc('robotics_collected_projects',{p_page:0})).error?.code,'42501');
 await b.goto(origin+'/assembly');await b.getByRole('heading',{name:'Bắt đầu một bản lắp mới.',exact:true}).waitFor();assert.equal(await b.getByText(title,{exact:true}).count(),0);
 assert.equal(await ok(await anon.rpc('robotics_guest_project',{...args(guestB),p_id:project.id})),null);
 console.log('PASS no-login automatic backfill, database persistence, separate browsers, wrong secret and anonymous collection denial');

 await card.getByRole('button').first().click();await a.waitForURL('**/assembly/vexgo/'+localId);await a.locator('iframe[title="VEX GO assembly editor"]').waitFor();
 const editor=await a.locator('iframe').elementHandle().then(h=>h.contentFrame());await editor.waitForFunction(()=>window.mindxAssembly,null,{timeout:60000});await editor.waitForFunction(async()=>!(await window.mindxAssembly.execute('getState')).result.busy);
 const added=await editor.evaluate(()=>window.mindxAssembly.execute('addPart',{sku:'228-2500-001',position:[100,0,0]}));assert.equal(added.ok,true,JSON.stringify(added));
 await expect.poll(async()=>(await find())?.document.parts.length,{timeout:30000}).toBe(2);
 assert.equal(await a.getByLabel('Lưu mô hình đám mây',{exact:true}).count(),0);assert.equal(await a.getByText('Đã lưu hệ thống',{exact:true}).count(),0);
 assert.equal(await a.getByRole('link',{name:'Đăng nhập để lưu trên máy khác'}).count(),0);
 console.log('PASS actual editor modifications automatically save to TPS without an Auth session');

 await admin.goto(origin+'/account?next=/admin/library');await admin.getByLabel('Email hoặc tên đăng nhập',{exact:true}).fill(email);await admin.getByLabel('Mật khẩu',{exact:true}).fill(password);await admin.getByRole('button',{name:'Đăng nhập',exact:true}).click();await admin.waitForURL('**/admin/library');
 await admin.getByRole('button',{name:'Thu nhận tự động',exact:true}).waitFor();await admin.getByRole('article').filter({hasText:title}).getByRole('button',{name:'Xem và duyệt'}).click();
 await admin.getByRole('heading',{name:title,exact:true}).waitFor();await admin.frameLocator('iframe[title="Xem mô hình 3D"]').getByText('Kéo để xoay góc nhìn · Cuộn để thu phóng',{exact:true}).waitFor({timeout:60000});
 await admin.screenshot({path:'artifacts/robotics-cloud/guest-admin-inspection.png'});
 await admin.getByRole('button',{name:'Duyệt mô hình',exact:true}).click();await admin.getByRole('dialog').getByRole('button',{name:'Duyệt mô hình',exact:true}).click();await admin.getByRole('status').filter({hasText:'Đã duyệt.'}).waitFor();
 const published=await ok(await anon.from('robotics_submissions').select('*').eq('project_id',project.id).eq('status','approved').single());assert.equal(published.document.parts.length,2);
 await admin.getByRole('article').filter({hasText:title}).getByText('Đã công khai',{exact:true}).waitFor();
 await b.goto(origin+'/library');await b.getByRole('searchbox').fill(title);await b.getByRole('heading',{name:title,exact:true}).waitFor();await b.getByRole('link',{name:/Xem mô hình/}).click();await b.getByRole('button',{name:'Mở bản sao trong Assembly ↗'}).click();await b.waitForURL('**/assembly/vexgo/*');
 const copyId=b.url().split('/').at(-1);assert.notEqual(copyId,localId);await expect.poll(async()=>Boolean(await ok(await anon.rpc('robotics_guest_project',{...args(guestB),p_platform:'vexgo',p_local_id:copyId})).then(row=>row?.id)),{timeout:60000}).toBe(true);assert.equal(await b.getByLabel('Lưu mô hình đám mây',{exact:true}).count(),0);
 console.log('PASS administrator automatically sees guest CAD, approves it, public library opens an independently saved guest copy');
 await b.goto(origin+'/');

 const failedSave=a.waitForEvent('requestfailed',{predicate:r=>r.url().includes('/rest/v1/rpc/robotics_guest_project'),timeout:30000});await aContext.setOffline(true);const transformed=await editor.evaluate(id=>window.mindxAssembly.execute('setTransform',{id,position:[150,0,0]}),added.result.id);assert.equal(transformed.ok,true,JSON.stringify(transformed));
 await failedSave;assert.equal(await a.getByText('Chưa lưu hệ thống',{exact:true}).count(),0);assert.ok(await a.evaluate(id=>JSON.parse(localStorage.getItem('mindx-assembly-project-v1:vexgo:'+id)).parts.some(p=>p.position[0]===150),localId));
 await aContext.setOffline(false);await expect.poll(async()=>(await find())?.document.parts.some(p=>p.position[0]===150),{timeout:30000}).toBe(true);
 const snapshot=await ok(await anon.from('robotics_submissions').select('document').eq('id',published.id).single());assert.ok(snapshot.document.parts.some(p=>p.position[0]===100));
 await a.reload();await a.locator('iframe[title="VEX GO assembly editor"]').waitFor();assert.equal(await a.evaluate(()=>JSON.parse(localStorage.getItem('mindx-robotics-visitor-v1')).id),guestA.id);
 console.log('PASS offline local save, online retry, stable guest identity and immutable approved snapshot');
 await admin.getByRole('article').filter({hasText:title}).getByRole('button',{name:'Xem và duyệt'}).click();await admin.getByRole('button',{name:'Duyệt mô hình',exact:true}).waitFor();assert.equal(await admin.getByRole('button',{name:'Gỡ khỏi thư viện',exact:true}).count(),0);
 console.log('PASS stale collection card inspects the current revision and resets its review status');

 await ok(await reviewer.auth.signInWithPassword({email,password}));
 await admin.goto(origin+'/assembly');adminProjectId=await admin.evaluate(async document=>{const {createProject}=await import('/assembly/project-store.js');return createProject('vexgo',document.title+' account',{...document,title:document.title+' account'});},document);
 await expect.poll(async()=>(await reviewer.from('robotics_projects').select('id').eq('local_id',adminProjectId).maybeSingle()).data?.id,{timeout:30000}).toBeTruthy();
 assert.deepEqual(errors,[]);console.log('PASS signed-in collection still works and browser runtime has no errors');
}catch(error){if(debugPage){console.error('Guest page status:',(await debugPage.locator('body').innerText()).slice(-1600));await debugPage.screenshot({path:'artifacts/robotics-cloud/guest-failure.png'});}throw error;}finally{
 if(browser)await browser.close();
 if(adminProjectId){const result=await reviewer.from('robotics_projects').delete().eq('local_id',adminProjectId);if(result.error)console.error('Account fixture cleanup:',result.error.message);}
 await reviewer.auth.signOut({scope:'local'});
 console.log('Synthetic visitor IDs for host cleanup:',guestA.id,guestB.id);
}
