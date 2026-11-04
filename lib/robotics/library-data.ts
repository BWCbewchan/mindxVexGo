'use client';
import {roboticsClient} from './supabase';
import {submissionFields,type Submission} from './models';
// Public approved metadata only, in memory for one minute. Never cache private
// admin queues, review decisions or credentials. Detail pages recheck approval.
const pages=new Map<string,{expires:number;value:Promise<Submission[]>}>();
export function publicLibraryPage(platform:string,query:string,page:number){
 const text=query.trim().replace(/[%,_]/g,''),key=JSON.stringify([platform,text,page]),cached=pages.get(key);if(cached&&cached.expires>Date.now())return cached.value;
 const value=(async()=>{let q=roboticsClient().from('robotics_submissions').select(submissionFields).eq('status','approved').order('created_at',{ascending:false}).range(page*24,page*24+23);if(platform!=='all')q=q.eq('platform',platform);if(text)q=q.ilike('title','%'+text+'%');const {data,error}=await q;if(error)throw error;return (data||[]) as unknown as Submission[];})();
 const entry={expires:Date.now()+60_000,value};pages.set(key,entry);if(pages.size>12)pages.delete(pages.keys().next().value!);void value.catch(()=>{if(pages.get(key)===entry)pages.delete(key);});return value;
}
export function clearPublicLibraryCache(){pages.clear();}
