import {characters,type CharacterId} from './characters';
export type Avatar = {kind:'robot'|'cat'|'alien';color:string;hat:boolean;character?:CharacterId;photo?:string};
export type Student = {id:string;name:string;avatar:Avatar};
export type Entry = {id:string;studentIds:string[];label:string;points:number;kind:'award'|'redeem';at:string;undone?:boolean};
export type Room = {id:string;name:string;students:Student[];entries:Entry[];attendance:Record<string,string[]>;criteria:{name:string;points:number}[];rewards:{name:string;cost:number}[]};
export type Data = {version:1;rooms:Room[]};
export const KEY='mindx-classroom-v1';
export const uid=()=>crypto.randomUUID();
export const day=()=>new Date().toLocaleDateString('en-CA');
export const balance=(r:Room,id:string)=>r.entries.filter(e=>!e.undone&&e.studentIds.includes(id)).reduce((n,e)=>n+e.points,0);
export const earned=(r:Room,id:string)=>r.entries.filter(e=>!e.undone&&e.kind==='award'&&e.studentIds.includes(id)).reduce((n,e)=>n+e.points,0);
export function room(name:string):Room{return {id:uid(),name,students:[],entries:[],attendance:{},criteria:[{name:'Teamwork',points:2},{name:'Creative thinking',points:3},{name:'Persistence',points:2},{name:'Mission completed',points:5}],rewards:[{name:'Choose the next challenge',cost:10},{name:'Team captain for a day',cost:20},{name:'Showcase your project',cost:30}]};}
export function valid(data:unknown):data is Data {
 const text=(x:unknown)=>typeof x==='string'&&x.length>0&&x.length<=100;
 const arr=(x:unknown,n:number)=>Array.isArray(x)&&x.length<=n;
 if(!data||typeof data!=='object')return false;
 const d=data as Data;
 if(d.version!==1||!arr(d.rooms,100))return false;
 const ids=new Set<string>();
 return d.rooms.every(r=>{
 if(!r||!text(r.id)||ids.has(r.id)||!text(r.name)||!arr(r.students,500)||!arr(r.entries,20000)||!arr(r.criteria,30)||!arr(r.rewards,30))return false;
 ids.add(r.id);const students=new Set<string>();
 if(!r.students.every(s=>{if(!s||!text(s.id)||students.has(s.id)||!text(s.name)||!s.avatar||(s.avatar.photo!==undefined&&(typeof s.avatar.photo!=='string'||s.avatar.photo.length>200000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(s.avatar.photo)))||!['robot','cat','alien'].includes(s.avatar.kind)||!/^#[0-9a-f]{6}$/i.test(s.avatar.color)||typeof s.avatar.hat!=='boolean'||(s.avatar.character!==undefined&&!characters.some(c=>c.id===s.avatar.character)))return false;students.add(s.id);return true;}))return false;
 const entries=new Set<string>();
 if(!r.entries.every(e=>{if(!e||!text(e.id)||entries.has(e.id)||!text(e.label)||!arr(e.studentIds,500)||e.studentIds.length===0||new Set(e.studentIds).size!==e.studentIds.length||!e.studentIds.every(id=>students.has(id))||!Number.isInteger(e.points)||Math.abs(e.points)>1000||!['award','redeem'].includes(e.kind)||(e.kind==='award'?e.points<=0:e.points>=0)||typeof e.at!=='string'||!Number.isFinite(Date.parse(e.at))||(e.undone!==undefined&&typeof e.undone!=='boolean'))return false;entries.add(e.id);return true;}))return false;
 if(!r.criteria.every(c=>c&&text(c.name)&&Number.isInteger(c.points)&&c.points>0&&c.points<=1000)||!r.rewards.every(c=>c&&text(c.name)&&Number.isInteger(c.cost)&&c.cost>0&&c.cost<=1000))return false;
 if(!r.attendance||typeof r.attendance!=='object'||Array.isArray(r.attendance)||!Object.entries(r.attendance).every(([date,list])=>date.length<=20&&arr(list,500)&&list.every(id=>students.has(id))))return false;
 return r.students.every(s=>balance(r,s.id)>=0);
 });
}
export function shuffled<T>(items:T[]):T[]{const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
