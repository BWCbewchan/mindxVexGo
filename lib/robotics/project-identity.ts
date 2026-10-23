'use client';
import {useEffect,useState} from 'react';
import {roboticsClient} from './supabase';
import {useRoboticsAuth} from './use-auth';
import type {CloudProject} from './models';
export const GUEST_KEY='mindx-robotics-visitor-v1';
export type ProjectIdentity={kind:'account';key:string;userId:string}|{kind:'guest';key:string;deviceId:string;secret:string};
async function browserGuest():Promise<ProjectIdentity>{
 const read=()=>{const raw=localStorage.getItem(GUEST_KEY);if(raw){const value=JSON.parse(raw);if(typeof value.id!=='string'||!/^[a-f0-9-]{36}$/i.test(value.id)||typeof value.secret!=='string'||!/^[a-f0-9]{64}$/.test(value.secret))throw Error('Mã lưu dự án trên trình duyệt không hợp lệ.');return {kind:'guest' as const,key:'guest:'+value.id,deviceId:value.id,secret:value.secret};}
  const value={id:crypto.randomUUID(),secret:Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('')};localStorage.setItem(GUEST_KEY,JSON.stringify(value));return {kind:'guest' as const,key:'guest:'+value.id,deviceId:value.id,secret:value.secret};};
 return navigator.locks? navigator.locks.request('mindx-robotics-visitor-init',read):read();
}
export async function currentProjectIdentity():Promise<ProjectIdentity>{const {data,error}=await roboticsClient().auth.getSession();if(error)throw error;return data.session?{kind:'account',key:data.session.user.id,userId:data.session.user.id}:browserGuest();}
export async function assertProjectIdentity(expected:ProjectIdentity){const current=await currentProjectIdentity();if(current.key!==expected.key)throw Error('ROBOTICS_ACCOUNT_CHANGED');}
export function ownsProject(identity:ProjectIdentity,row:CloudProject){return identity.kind==='account'?row.owner_id===identity.userId&&row.visitor_id==null:row.owner_id===null&&row.visitor_id===identity.deviceId;}
export function guestArgs(identity:ProjectIdentity){if(identity.kind!=='guest')throw Error('Không phải không gian khách.');return {p_device:identity.deviceId,p_secret:identity.secret};}
export function useProjectIdentity(){const {user,loading:authLoading,error:authError}=useRoboticsAuth(),[identity,setIdentity]=useState<ProjectIdentity|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(authLoading)return;let active=true;setIdentity(null);setError('');const read=()=>currentProjectIdentity().then(value=>{if(active)setIdentity(value);}).catch(e=>{if(active)setError(e.message);});void read();const changed=(e:StorageEvent)=>{if(e.key===GUEST_KEY)void read();};window.addEventListener('storage',changed);return()=>{active=false;window.removeEventListener('storage',changed);};},[authLoading,user?.id]);
 return {identity,user,loading:authLoading||(!identity&&!error&&!authError),error:error||authError};
}
