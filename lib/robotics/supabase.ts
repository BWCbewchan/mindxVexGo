'use client';
import {createClient} from '@supabase/supabase-js';
function createRoboticsClient(url:string,key:string){return createClient(url,key,{db:{schema:'robotics'},auth:{storageKey:'mindx-robotics-auth-v1',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});}
let client:ReturnType<typeof createRoboticsClient>|null=null;
export function roboticsClient(){
 const url=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_URL,key=process.env.NEXT_PUBLIC_ROBOTICS_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw Error('Chưa cấu hình kết nối Robotics. Vui lòng liên hệ quản trị viên.');
 return client??=createRoboticsClient(url,key);
}
export function loginIdentifier(value:string){const name=value.trim();return name.includes('@')?name:name.toLowerCase()+'@robotics.mindx.edu.vn';}
