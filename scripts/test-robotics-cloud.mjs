import {createClient} from '@supabase/supabase-js';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';

// Run against a configured test environment. Password is supplied only at runtime.
const url=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_URL,key=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_PUBLISHABLE_KEY;
const password=process.env.ROBOTICS_TEST_PASSWORD,email=process.env.ROBOTICS_TEST_EMAIL||'baotc@robotics.mindx.edu.vn';
if(!url||!key||!password)throw Error('Set Supabase URL, publishable key and ROBOTICS_TEST_PASSWORD.');
const origin=process.env.ROBOTICS_TEST_ORIGIN||'http://localhost:3120';
const options={db:{schema:'robotics'},auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}};
const owner=createClient(url,key,options),anonymous=createClient(url,key,options);
const title='QA Robotics '+Date.now(),localId='qa-'+crypto.randomUUID();
const visitorFixture={id:crypto.randomUUID(),secret:randomBytes(32).toString('hex')};
const document={version:1,platform:'vexgo',title,hideCables:true,parts:[{id:'qa-beam',sku:'228-2500-001',label:'Beam',kind:'body',position:[0,0,0],rotation:[0,0,0]}],groups:[],steps:[]};
let projectId,iqProjectId,submissionId,browser,debugPage;
async function check(result){if(result.error)throw result.error;return result.data;}
try{
 const auth=await check(await owner.auth.signInWithPassword({email,password}));const uid=auth.user.id;
 assert.equal(await check(await owner.rpc('robotics_is_reviewer')),true);
 const args={p_local_id:localId,p_platform:'vexgo',p_title:title,p_document:document,p_thumbnail:null,p_expected_revision:null,p_expected_owner:uid};
 const project=await check(await owner.rpc('robotics_save_project',args));projectId=project.id;assert.equal(project.revision,1);
 const wrong=await owner.rpc('robotics_save_project',{...args,p_expected_owner:crypto.randomUUID()});assert.match(wrong.error?.message||'',/ROBOTICS_ACCOUNT_CHANGED/);
 const stale=await owner.rpc('robotics_save_project',args);assert.match(stale.error?.message||'',/ROBOTICS_CONFLICT/);
 assert.equal((await anonymous.from('robotics_projects').select('id').eq('id',projectId)).error?.code,'42501');
 const submission=await check(await owner.from('robotics_submissions').insert({project_id:projectId,project_revision:1,title,description:'Mô hình tổng hợp dùng kiểm thử. Không phải thiết kế của người dùng.',author_name:'Robotics QA'}).select('*').single());submissionId=submission.id;
 assert.equal((await check(await anonymous.from('robotics_submissions').select('id').eq('id',submissionId))).length,0);
 await owner.rpc('robotics_save_project',{...args,p_expected_revision:1,p_title:title+' private',p_document:{...document,title:title+' private'}}).then(check);
 const old=await owner.from('robotics_submissions').insert({project_id:projectId,project_revision:1,title,author_name:'QA'});assert.match(old.error?.message||'',/ROBOTICS_CONFLICT/);
 console.log('PASS live Auth, reviewer permission, private project, account guard, revision conflict and pending privacy');

 await mkdir('artifacts/robotics-cloud',{recursive:true});
 await writeFile('artifacts/robotics-cloud/cloud-test-cleanup.json',JSON.stringify({visitorIds:[visitorFixture.id]}));
 browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const adminContext=await browser.newContext({viewport:{width:1440,height:1000}}),publicContext=await browser.newContext({viewport:{width:1440,height:1000}});
 await publicContext.addInitScript(guest=>{if(window===window.top&&!localStorage.getItem('mindx-robotics-visitor-v1'))localStorage.setItem('mindx-robotics-visitor-v1',JSON.stringify(guest));},visitorFixture);
 const admin=await adminContext.newPage(),publicPage=await publicContext.newPage(),errors=[];
 for(const page of [admin,publicPage])page.on('pageerror',e=>errors.push(e.message));
 await admin.goto(origin+'/account?next=/admin/library');
 await admin.getByLabel('Email hoặc tên đăng nhập',{exact:true}).fill(email);
 await admin.getByLabel('Mật khẩu',{exact:true}).fill(password);
 await admin.getByRole('button',{name:'Đăng nhập',exact:true}).click();
 await admin.waitForURL('**/admin/library');
 await admin.getByRole('button',{name:'Chờ duyệt',exact:true}).click();
 await admin.getByRole('article').filter({hasText:title}).getByRole('button',{name:'Xem và duyệt'}).click();
 await admin.getByRole('heading',{name:title,exact:true}).waitFor();
 const preview=admin.frameLocator('iframe[title="Xem mô hình 3D"]');await preview.locator('canvas').waitFor({timeout:60000});await preview.getByText('Kéo để xoay góc nhìn · Cuộn để thu phóng',{exact:true}).waitFor();await admin.screenshot({path:'artifacts/robotics-cloud/admin-inspection.png'});
 await admin.getByRole('button',{name:'Duyệt mô hình',exact:true}).click();
 await admin.getByRole('dialog').getByRole('button',{name:'Duyệt mô hình',exact:true}).click();
 await admin.getByRole('status').filter({hasText:'Đã duyệt.'}).waitFor();
 const published=await check(await anonymous.from('robotics_submissions').select('*').eq('id',submissionId).single());assert.equal(published.document.title,title);
 console.log('PASS live admin login, 3D inspection, approval and immutable published snapshot');
 await publicPage.goto(origin+'/library');
 await publicPage.getByRole('searchbox').fill(title);
 await publicPage.getByRole('heading',{name:title,exact:true}).waitFor();
 await publicPage.getByRole('link',{name:/Xem mô hình/}).click();
 await publicPage.waitForURL('**/library/'+submissionId);
 await publicPage.getByRole('button',{name:'Mở bản sao trong Assembly ↗'}).click();
 await publicPage.waitForURL('**/assembly/vexgo/*');
 await publicPage.locator('iframe[title="VEX GO assembly editor"]').waitFor();
 const editor=await publicPage.locator('iframe[title="VEX GO assembly editor"]').elementHandle().then(handle=>handle.contentFrame());
 await editor.waitForFunction(()=>window.mindxAssembly,null,{timeout:60000});
 const state=await editor.evaluate(()=>window.mindxAssembly.execute('getState'));assert.equal(state.ok,true);assert.equal(state.result.project.parts.length,1);
 assert.notEqual(new URL(publicPage.url()).pathname.split('/').at(-1),localId);
 console.log('PASS anonymous search, detail preview, independent copy and real CAD editor');
 await publicPage.goto(origin+'/');

 // Silent collection and account autosave are verified by test-robotics-guests.mjs.

 await mkdir('artifacts/robotics-cloud',{recursive:true});
 await publicPage.goto(origin+'/');await publicPage.screenshot({path:'artifacts/robotics-cloud/landing-desktop.png',fullPage:true});await publicPage.screenshot({path:'artifacts/robotics-cloud/landing-first-screen.png'});
 assert.equal(await publicPage.locator('a[href="/admin/library"]').count(),0);
 for(const route of ['/assembly','/simulation','/studio','/training','/quiz','/classroom','/library'])assert.ok(await publicPage.locator(`a[href="${route}"]`).count());
 await publicPage.setViewportSize({width:390,height:844});await publicPage.screenshot({path:'artifacts/robotics-cloud/landing-mobile.png',fullPage:true});
 assert.ok(await publicPage.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'No mobile horizontal overflow');
 assert.deepEqual(errors,[]);
 await check(await owner.from('robotics_submissions').update({status:'rejected',review_note:'QA cleanup'}).eq('id',submissionId));
 assert.equal((await check(await anonymous.from('robotics_submissions').select('id').eq('id',submissionId))).length,0);
 console.log('PASS landing feature links, mobile layout, no runtime errors and unpublishing');
}catch(error){if(debugPage){console.error('Browser page:',(await debugPage.locator('body').innerText()).slice(-1200));await debugPage.screenshot({path:'artifacts/robotics-cloud/failure.png'});}throw error;}finally{
 if(browser)await browser.close();
 if(projectId){const result=await owner.from('robotics_projects').delete().eq('id',projectId);if(result.error)console.error('Test cleanup failed:',result.error.message);}
 if(iqProjectId){const result=await owner.from('robotics_projects').delete().eq('id',iqProjectId);if(result.error)console.error('IQ test cleanup failed:',result.error.message);}
 await owner.auth.signOut({scope:'local'});
 console.log('Synthetic visitor ID for host cleanup:',visitorFixture.id);
}
