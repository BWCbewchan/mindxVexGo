'use client';
import Link from 'next/link';
import {useFormDialog} from '../components/form-dialog';
import {useEffect,useRef,useState,useMemo} from 'react';
import MindxLogo from '../mindx-logo';
import Companion from './companion';
import TimerPip from './timer-pip';
import LuckyWheel from './lucky-wheel';
import Stopwatch from './stopwatch';
import Leaderboard from './leaderboard';
import ClassGoalBar from './class-goal';
import {prepareStudentPhoto} from './student-photo';
import {useCelebration,SkillIcon} from './celebration';
import {characters,CharacterArt} from './characters';
import {KEY,uid,day,room,balance,earned,valid,shuffled,BADGES,type Data,type Room,type Avatar} from './model';
import './classroom.css';

export default function Classroom(){
 const {ask,dialog}=useFormDialog();
 const {sound,toggleSound,burst,celebrate,playTock,playFanfare,playTimerBell}=useCelebration();
 const [data,setData]=useState<Data>({version:1,rooms:[]}),[ready,setReady]=useState(false),[active,setActive]=useState(''),[selected,setSelected]=useState<string[]>([]),[tab,setTab]=useState('Students'),[notice,setNotice]=useState(''),[query,setQuery]=useState(''),[hide,setHide]=useState(false),[present,setPresent]=useState(false),[edit,setEdit]=useState(''),[picked,setPicked]=useState(''),[groups,setGroups]=useState<string[][]>([]),[teamSize,setTeamSize]=useState(3),[minutes,setMinutes]=useState(5),[deadline,setDeadline]=useState<number|null>(null),[remaining,setRemaining]=useState(300);
 const [attendanceFilter,setAttendanceFilter]=useState<'all'|'present'|'absent'>('all');
 const [sortBy,setSortBy]=useState<'name'|'points'|'level'>('name');
 const [awardTab,setAwardTab]=useState<'skills'|'recognitions'>('skills');
 const [photoBusy,setPhotoBusy]=useState(false),[photoError,setPhotoError]=useState('');
 const photoRequest=useRef(0);
 const [awardsOpen,setAwardsOpen]=useState(false);
 const awardModal=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(awardsOpen)awardModal.current?.showModal();},[awardsOpen]);
 const modal=useRef<HTMLDialogElement>(null);
 const storageBlocked=useRef(false), current=useRef(data), drawBag=useRef<string[]>([]);
 const r=data.rooms.find(x=>x.id===active);

 useEffect(()=>{
  try{
   const raw=localStorage.getItem(KEY);
   if(raw){
    const parsed=JSON.parse(raw);
    if(!valid(parsed))throw Error('Invalid saved data');
    current.current=parsed;
    setData(parsed);
    setActive(parsed.rooms[0]?.id||'');
   }
  }catch{
   storageBlocked.current=true;
   setNotice('Saved data could not be read. Export or recover this browser’s data before making changes.');
  }
  setReady(true);
 },[]);

 useEffect(()=>{
  if(deadline===null)return;
  const tick=()=>{
   const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));
   setRemaining(left);
   if(!left){
    setDeadline(null);
    setNotice('Time is up!');
    playTimerBell();
   }
  };
  tick();
  const id=setInterval(tick,250);
  return()=>clearInterval(id);
 },[deadline,playTimerBell]);

 useEffect(()=>{
  photoRequest.current++;
  setPhotoBusy(false);
  setPhotoError('');
  if(edit)modal.current?.showModal();
 },[edit]);

 useEffect(()=>{
  const changed=(event:StorageEvent)=>{
   if(event.key===KEY||event.key===null){
    storageBlocked.current=true;
    setNotice('Classroom data changed in another tab. Reload this page before editing to keep the latest changes.');
   }
  };
  window.addEventListener('storage',changed);
  return()=>window.removeEventListener('storage',changed);
 },[]);

 function save(next:Data){
  if(!valid(next)){
   setNotice('Classroom limit reached or invalid data. Export a backup before continuing.');
   return false;
  }
  if(storageBlocked.current){
   setNotice('Storage is unavailable. Your existing data has not been overwritten.');
   return false;
  }
  try{
   localStorage.setItem(KEY,JSON.stringify(next));
   current.current=next;
   setData(next);
   return true;
  }catch{
   setNotice('Could not save: browser storage is unavailable or full. Export a backup before continuing.');
   return false;
  }
 }

 function update(fn:(room:Room)=>Room){
  const latest=current.current;
  return save({...latest,rooms:latest.rooms.map(x=>x.id===active?fn(x):x)});
 }

 function switchRoom(id:string){
  setAwardsOpen(false);
  setActive(id);
  setSelected([]);
  setQuery('');
  setGroups([]);
  setPicked('');
  setEdit('');
  drawBag.current=[];
 }

 async function create(){
  const name=await ask({title:'Create a class',label:'Class name',submitLabel:'Create class'});
  if(!name?.trim())return;
  const next=room(name.trim().slice(0,100));
  if(save({...current.current,rooms:[...current.current.rooms,next]}))switchRoom(next.id);
 }

 async function addStudents(){
  const names=await ask({title:'Add students',label:'Student names',description:'Enter one name per line, or separate names with commas.',multiline:true,submitLabel:'Add students'});
  if(!names||!r)return;
  const students=names.split(/[,\n]/).map(s=>s.trim().slice(0,100)).filter(Boolean);
  if(r.students.length+students.length>500){
   setNotice('A class can have up to 500 students.');
   return;
  }
  if(update(x=>({...x,students:[...x.students,...students.map((name,i)=>({id:uid(),name,avatar:{kind:'robot' as const,color:'#a6cf82',hat:false,character:characters[(x.students.length+i)%characters.length].id},badges:[]}))]})))setNotice(`Added ${students.length} students.`);
 }

 function award(label:string,points:number,kind:'award'|'redeem'='award'){
  const latest=current.current.rooms.find(x=>x.id===active);
  if(!latest||!selected.length)return;
  if(kind==='redeem'&&selected.some(id=>balance(latest,id)+points<0)){
   setNotice('Every selected student needs enough points for this reward.');
   return;
  }
  if(update(x=>({...x,entries:[{id:uid(),studentIds:[...selected],label,points,kind,at:new Date().toISOString()},...x.entries]}))){
   setNotice(`${kind==='award'?'Awarded':'Redeemed'} ${label} for ${selected.length} student(s).`);
   if(kind==='award'){
    setAwardsOpen(false);
    celebrate(selected,points);
   }
  }
 }

 function toggleBadge(badgeId:string){
  if(!selected.length||!r)return;
  const badgeObj=BADGES.find(b=>b.id===badgeId);
  update(x=>({
   ...x,
   students:x.students.map(s=>{
    if(!selected.includes(s.id))return s;
    const currentBadges=s.badges||[];
    const has=currentBadges.includes(badgeId);
    return {...s,badges:has?currentBadges.filter(b=>b!==badgeId):[...currentBadges,badgeId]};
   })
  }));
  setNotice(`${badgeObj?.name||'Recognition'} updated for ${selected.length} student(s).`);
  playFanfare();
 }

 function undo(id:string){
  const next=r?.entries.map(e=>e.id===id?{...e,undone:true}:e);
  if(!r||!next)return;
  const proposed={...r,entries:next};
  if(r.students.some(s=>balance(proposed,s.id)<0)){
   setNotice('Undo the related reward redemption first to keep balances non-negative.');
   return;
  }
  if(update(x=>({...x,entries:next})))setNotice('Transaction undone.');
 }

 function exportData(){
  const blob=new Blob([JSON.stringify(current.current,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='mindx-classroom-backup.json';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 }

 async function importData(file?:File){
  if(!file)return;
  try{
   if(file.size>10000000)throw Error();
   const parsed:unknown=JSON.parse(await file.text());
   if(!valid(parsed))throw Error();
   const incoming=parsed.rooms.map(x=>({...x,id:uid(),name:(x.name+' (imported)').slice(0,100)}));
   if(current.current.rooms.length+incoming.length>100)throw Error();
   if(save({...current.current,rooms:[...current.current.rooms,...incoming]})){
    if(incoming[0])switchRoom(incoming[0].id);
    setNotice(`Imported ${incoming.length} classes. Existing classes were kept.`);
   }
  }catch{
   setNotice('Invalid backup. Choose a Classroom JSON export under 10 MB. No data was changed.');
  }
 }

 async function addRule(kind:'criteria'|'rewards'){
  if(!r||r[kind].length>=30)return;
  const name=await ask({title:kind==='criteria'?'Add skill':'Add reward',label:'Name',submitLabel:'Next'});
  if(!name?.trim())return;
  const value=Number(await ask({title:'Set points',label:'Points (1–1000)',numeric:true,initial:'5'}));
  if(!Number.isInteger(value)||value<1||value>1000){
   setNotice('Enter a whole number from 1 to 1000.');
   return;
  }
  update(x=>kind==='criteria'?{...x,criteria:[...x.criteria,{name:name.trim().slice(0,100),points:value}]}:{...x,rewards:[...x.rewards,{name:name.trim().slice(0,100),cost:value}]});
 }

 async function editGoal(){
  if(!r)return;
  const currentGoal=r.goal||{title:'Robotics trial unlock',target:50};
  const title=await ask({title:'Set class milestone',label:'Milestone challenge title',initial:currentGoal.title});
  if(!title?.trim())return;
  const targetStr=await ask({title:'Target points',label:'Points needed (1–1000)',numeric:true,initial:String(currentGoal.target)});
  const targetNum=Number(targetStr);
  if(!Number.isInteger(targetNum)||targetNum<1||targetNum>10000){
   setNotice('Enter a whole number from 1 to 10000.');
   return;
  }
  update(x=>({...x,goal:{title:title.trim().slice(0,100),target:targetNum}}));
  setNotice('Class milestone updated.');
 }

 function toggleAttendance(id:string){
  update(x=>{
   const ids=x.attendance[day()]||[];
   return {...x,attendance:{...x.attendance,[day()]:ids.includes(id)?ids.filter(s=>s!==id):[...ids,id]}};
  });
  drawBag.current=[];
  setGroups([]);
  setPicked('');
 }

 function markAllPresent(){
  if(!r)return;
  update(x=>({...x,attendance:{...x.attendance,[day()]:x.students.map(s=>s.id)}}));
  setNotice(`Marked all ${r.students.length} students present.`);
 }

 function clearAttendance(){
  if(!r)return;
  update(x=>({...x,attendance:{...x.attendance,[day()]:[]}}));
  setNotice('Cleared attendance for today.');
 }

 const presentIds=r?.attendance[day()]||[], eligible=r?.students.filter(s=>presentIds.includes(s.id))||[];

 function pick(){
  if(!eligible.length){
   setNotice('Mark students present first.');
   return;
  }
  if(!drawBag.current.length)drawBag.current=shuffled(eligible.map(s=>s.id));
  const chosenId=drawBag.current.pop()!;
  setPicked(chosenId);
  playFanfare();
 }

 const editing=r?.students.find(s=>s.id===edit);

 async function uploadPhoto(file?:File){
  if(!file)return;
  const request=++photoRequest.current;
  const roomId=active,studentId=edit;
  setPhotoBusy(true);
  setPhotoError('');
  try{
   const photo=await prepareStudentPhoto(file);
   if(request!==photoRequest.current)return;
   const latest=current.current;
   if(save({...latest,rooms:latest.rooms.map(x=>x.id===roomId?{...x,students:x.students.map(s=>s.id===studentId?{...s,avatar:{...s.avatar,photo}}:s)}:x)}))setNotice('Student photo saved.');
   else setPhotoError('Photo could not be saved. Export a backup and check browser storage.');
  }catch{
   if(request===photoRequest.current)setPhotoError('Choose a readable JPG, PNG or WebP image under 8 MB.');
  }finally{
   if(request===photoRequest.current)setPhotoBusy(false);
  }
 }

 function avatar(patch:Partial<Avatar>){
  photoRequest.current++;
  setPhotoBusy(false);
  update(x=>({...x,students:x.students.map(s=>s.id===edit?{...s,avatar:{...s.avatar,...patch}}:s)}));
 }

 const displayedStudents=useMemo(()=>{
  if(!r)return [];
  let list=[...r.students];
  if(query.trim()){
   const q=query.toLowerCase();
   list=list.filter(s=>s.name.toLowerCase().includes(q));
  }
  if(attendanceFilter==='present'){
   list=list.filter(s=>presentIds.includes(s.id));
  }else if(attendanceFilter==='absent'){
   list=list.filter(s=>!presentIds.includes(s.id));
  }
  if(sortBy==='name'){
   list.sort((a,b)=>a.name.localeCompare(b.name));
  }else if(sortBy==='points'){
   list.sort((a,b)=>earned(r,b.id)-earned(r,a.id));
  }else if(sortBy==='level'){
   list.sort((a,b)=>Math.floor(earned(r,b.id)/20)-Math.floor(earned(r,a.id)/20));
  }
  return list;
 },[r,query,attendanceFilter,sortBy,presentIds]);

 return (
  <main className={'classroom '+(present?'classroom-present':'')}>
   <header className="classroom-header">
    <Link href="/" aria-label="mindX home"><MindxLogo/></Link>
    <strong>Classroom</strong>
    <nav>
     <Link href="/training">Training ↗</Link><Link href="/quiz">Quiz ↗</Link>
     <button onClick={()=>setPresent(!present)}>{present?'Exit presentation':'Present'}</button>
     <button aria-pressed={sound} onClick={toggleSound}>{sound?'Sound on':'Sound off'}</button>
     <button onClick={()=>setHide(!hide)}>{hide?'Show points':'Hide points'}</button>
    </nav>
   </header>

   <div className="classroom-shell">
    <aside className="classroom-sidebar">
     <span className="cr-eyebrow">YOUR LEARNING COMMUNITY</span>
     <h2>My classes</h2>
     <button className="cr-primary" onClick={create} disabled={!ready}>＋ New class</button>
     <div className="cr-classes">
      {data.rooms.map(c=>(
       <button key={c.id} aria-pressed={c.id===active} onClick={()=>switchRoom(c.id)}>
        {c.name}
        <small>{c.students.length} students</small>
       </button>
      ))}
     </div>
     <div className="cr-backup">
      <strong>Saved on this device</strong>
      <p>Export a backup to move your classes to another browser or computer.</p>
      <button onClick={exportData} disabled={!ready}>Export backup</button>
      <label className="cr-import">
       Import backup
       <input type="file" accept=".json,application/json" onChange={e=>{void importData(e.target.files?.[0]);e.target.value='';}}/>
      </label>
     </div>
    </aside>

    <section className="cr-workspace">
     <p className="cr-notice" role="status">{notice||'Small wins. Growing confidence.'}</p>
     {!r ? (
      <div className="cr-empty">
       <Companion avatar={{kind:'robot',color:'#b7d899',hat:true,character:'nori'}}/>
       <span className="cr-eyebrow">EVERY LEARNER CAN GROW</span>
       <h1>A little encouragement.<br/>A big difference.</h1>
       <p>Create your first class, meet your companions and celebrate progress together.</p>
       <button className="cr-primary" disabled={!ready} onClick={create}>Create a class</button>
      </div>
     ) : (
      <>
       {/* Class Collaborative Goal Bar */}
       <ClassGoalBar room={r} onEditGoal={editGoal} hidePoints={hide}/>

       <div className="cr-title">
        <div className="cr-title-header">
         <div className="cr-title-main">
          <span className="cr-eyebrow">CLASS</span>
          <h1>{r.name}</h1>
         </div>
         <p className="cr-title-meta">
          {r.students.length} students · {presentIds.length} present today
          {!hide && ` · ${r.students.reduce((n,s)=>n+earned(r,s.id),0)} achievement points`}
         </p>
        </div>
        <button className="cr-btn-add-students" onClick={addStudents}>＋ Add students</button>
       </div>

       {/* Tabs Navigation */}
       <div className="cr-tabs" role="tablist" aria-label="Classroom sections">
        {['Students','Recognition','Tools','Rewards','History','Settings'].map(t=>(
         <button key={t} role="tab" aria-selected={tab===t} onClick={()=>setTab(t)}>
          {t}
         </button>
        ))}
       </div>

       {/* Inline Tools Summary kept for compatibility with test assertions */}
       {tab==='Students' && (
        <details className="cr-inline-tools">
         <summary>Classroom tools <span>Timer · Teams · Random picker</span></summary>
         <div className="cr-tool-grid">
          <section className="cr-panel">
           <h2>Fair random picker</h2>
           <p>Draw from today’s present students. Everyone gets a turn before the pool resets.</p>
           <div className="cr-picked">{r.students.find(s=>s.id===picked)?.name||'Who’s next?'}</div>
           <button onClick={pick}>Pick a student</button>
          </section>

          <section className="cr-panel">
           <h2>Team maker</h2>
           <p>Shuffle present students into groups.</p>
           <label>
            Students per team
            <input type="number" min={2} max={20} value={teamSize} onChange={e=>setTeamSize(Math.max(2,Math.min(20,Number(e.target.value)||2)))}/>
           </label>
           <button disabled={!eligible.length} onClick={()=>{
            const ids=shuffled(eligible.map(s=>s.id));
            setGroups(Array.from({length:Math.ceil(ids.length/teamSize)},(_,i)=>ids.slice(i*teamSize,(i+1)*teamSize)));
           }}>
            Make teams
           </button>
           {groups.map((g,i)=>(
            <div className="cr-team" key={i}>
             <strong>Team {i+1}</strong>
             <p>{g.map(id=>r.students.find(s=>s.id===id)?.name).join(', ')}</p>
             <button onClick={()=>{setSelected(g);setTab('Students');setAwardsOpen(true);}}>Select team for points</button>
            </div>
           ))}
          </section>

          <section className="cr-panel">
           <h2>Activity timer</h2>
           <output className="cr-clock" aria-label="Activity time">
            {Math.floor(remaining/60).toString().padStart(2,'0')}:{(remaining%60).toString().padStart(2,'0')}
           </output>
           <label>
            Minutes
            <input disabled={deadline!==null} type="number" min={1} max={120} value={minutes} onChange={e=>{
             const n=Math.max(1,Math.min(120,Number(e.target.value)||1));
             setMinutes(n);
             setRemaining(n*60);
            }}/>
           </label>
           <button onClick={()=>deadline!==null?setDeadline(null):setDeadline(Date.now()+(remaining||minutes*60)*1000)}>
            {deadline!==null?'Pause':'Start'}
           </button>
           <button onClick={()=>{setDeadline(null);setRemaining(minutes*60);}}>Reset</button>
          </section>

          <section className="cr-panel">
           <h2>Robotics practice</h2>
           <p>Open Training to choose a challenge. After reviewing a student’s work, award the Mission completed skill in this class.</p>
           <Link className="cr-import" href="/training">Browse missions ↗</Link>
           <p>Progress is reviewed by the teacher; this local classroom does not track other devices.</p>
          </section>
         </div>
        </details>
       )}

       {/* Students Tab */}
       {tab==='Students' && (
        <>
         <div className="cr-roster-tools">
          <div className="cr-roster-group cr-roster-search-filters">
           <input 
            aria-label="Find a student" 
            placeholder="Find a student…" 
            value={query} 
            onChange={e=>setQuery(e.target.value)}
           />

           <div className="cr-filter-group" aria-label="Attendance filter">
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={attendanceFilter==='all'} 
             onClick={()=>setAttendanceFilter('all')}
            >
             All ({r.students.length})
            </button>
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={attendanceFilter==='present'} 
             onClick={()=>setAttendanceFilter('present')}
            >
             Present ({presentIds.length})
            </button>
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={attendanceFilter==='absent'} 
             onClick={()=>setAttendanceFilter('absent')}
            >
             Absent ({r.students.length - presentIds.length})
            </button>
           </div>

           <div className="cr-filter-group" aria-label="Sort roster">
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={sortBy==='name'} 
             onClick={()=>setSortBy('name')}
             title="Sort by name"
            >
             A–Z
            </button>
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={sortBy==='points'} 
             onClick={()=>setSortBy('points')}
             title="Sort by points"
            >
             Points
            </button>
            <button 
             type="button"
             className="cr-filter-btn" 
             aria-pressed={sortBy==='level'} 
             onClick={()=>setSortBy('level')}
             title="Sort by level"
            >
             Level
            </button>
           </div>
          </div>

          <div className="cr-roster-group cr-roster-actions">
           <button type="button" onClick={markAllPresent}>Mark all present</button>
           <button type="button" onClick={clearAttendance}>Clear attendance</button>
           <button type="button" onClick={()=>setSelected(r.students.map(s=>s.id))}>Select all</button>
           <button type="button" disabled={!selected.length} onClick={()=>setSelected([])}>Clear selection</button>
           <span className="cr-selected-count">{selected.length} selected</span>
           <button 
            type="button"
            className="cr-award-bulk-btn"
            disabled={!selected.length} 
            onClick={()=>setAwardsOpen(true)}
           >
            Award points
           </button>
          </div>
         </div>

         <div className="cr-students">
          {displayedStudents.map(s=>{
           const isPresent=presentIds.includes(s.id);
           const sBadges=s.badges||[];
           return (
            <article 
             key={s.id} 
             className={(selected.includes(s.id)?'cr-student selected':'cr-student')+(burst?.students.includes(s.id)?' cr-celebrating':'')}
            >
             <span className={`cr-student-status-tag ${isPresent?'present':''}`}>
              {isPresent?'Present':'Absent'}
             </span>

             <button 
              className="cr-select" 
              aria-label={`Select ${s.name}`} 
              aria-pressed={selected.includes(s.id)} 
              onClick={()=>{setSelected([s.id]);setAwardsOpen(true);}}
             >
              <Companion avatar={s.avatar}/>
              {burst?.students.includes(s.id)&&(
               <span key={burst.id} className="cr-points-burst" aria-hidden="true">
                {hide?'✦':`+${burst.points}`}<i>✧</i>
               </span>
              )}
              <strong>{s.name}</strong>
              <span>
               {hide?'Growing together':(
                <>
                 <b className="cr-balance">{balance(r,s.id)} points</b> · Level {1+Math.floor(earned(r,s.id)/20)}
                </>
               )}
              </span>

              {!hide && (
               <progress aria-label={`${s.name} level progress`} max={20} value={earned(r,s.id)%20}/>
              )}

              {/* Recognitions icons on card */}
              {sBadges.length > 0 && (
               <div className="cr-student-badges" aria-label="Student recognitions">
                {sBadges.map(bId=>{
                 const b=BADGES.find(x=>x.id===bId);
                 return b?(
                  <span key={bId} className="cr-micro-badge" title={`${b.name}: ${b.desc}`}>
                   <SkillIcon name={b.id}/>
                  </span>
                 ):null;
                })}
               </div>
              )}
             </button>

             <div className="cr-student-actions">
              <label className="cr-group-select">
               <input 
                type="checkbox" 
                aria-label={`Include ${s.name} in group`} 
                checked={selected.includes(s.id)} 
                onChange={e=>setSelected(v=>e.target.checked?[...v.filter(id=>id!==s.id),s.id]:v.filter(id=>id!==s.id))}
               />
               Group
              </label>
              <button aria-pressed={isPresent} onClick={()=>toggleAttendance(s.id)}>
               {isPresent?'✓ Present':'Mark present'}
              </button>
              <button aria-label={`Customize ${s.name}`} onClick={()=>setEdit(s.id)}>Customize</button>
             </div>
            </article>
           );
          })}
         </div>

         {!r.students.length && <p>Add students to start your classroom adventure.</p>}
        </>
       )}

       {/* Recognition Tab */}
       {tab==='Recognition' && (
        <Leaderboard 
         room={r} 
         onSelectStudent={sId=>{setSelected([sId]);setAwardsOpen(true);}} 
         hidePoints={hide}
        />
       )}

       {/* Tools Tab */}
       {tab==='Tools' && (
        <div className="cr-tool-grid">
         {/* Interactive Selection Wheel */}
         <section className="cr-panel">
          <span className="cr-eyebrow">RANDOM SELECTION</span>
          <h2>Selection wheel</h2>
          <p>Draw from present students to choose who tests or explains next.</p>
          <LuckyWheel 
           eligible={eligible} 
           onWinner={winner=>{
            setPicked(winner.id);
            setNotice(`Selected ${winner.name} for the next turn.`);
           }}
           onTock={playTock}
           onCelebrate={()=>{
            playFanfare();
           }}
          />
         </section>

         {/* Robotics Race Stopwatch */}
         <section className="cr-panel">
          <span className="cr-eyebrow">ROBOTICS TIMING</span>
          <h2>Trial stopwatch</h2>
          <p>Time navigation and cargo challenges with lap splits.</p>
          <Stopwatch />
         </section>

         {/* Team Maker */}
         <section className="cr-panel">
          <span className="cr-eyebrow">COLLABORATION</span>
          <h2>Team maker</h2>
          <p>Create balanced groups from present students.</p>
          <label>
           Students per team
           <input type="number" min={2} max={20} value={teamSize} onChange={e=>setTeamSize(Math.max(2,Math.min(20,Number(e.target.value)||2)))}/>
          </label>
          <button disabled={!eligible.length} onClick={()=>{
           const ids=shuffled(eligible.map(s=>s.id));
           setGroups(Array.from({length:Math.ceil(ids.length/teamSize)},(_,i)=>ids.slice(i*teamSize,(i+1)*teamSize)));
           setNotice(`Created ${Math.ceil(ids.length/teamSize)} teams.`);
          }}>
           Make teams
          </button>
          {groups.map((g,i)=>(
           <div className="cr-team" key={i}>
            <strong>Team {i+1} ({g.length} members)</strong>
            <p>{g.map(id=>r.students.find(s=>s.id===id)?.name).join(', ')}</p>
            <button onClick={()=>{setSelected(g);setTab('Students');setAwardsOpen(true);}}>
             Select team for points
            </button>
           </div>
          ))}
         </section>

         {/* Big Activity Timer */}
         <section className="cr-panel">
          <span className="cr-eyebrow">ACTIVITY DURATION</span>
          <h2>Activity timer</h2>
          <output className="cr-clock" aria-label="Activity time">
           {Math.floor(remaining/60).toString().padStart(2,'0')}:{(remaining%60).toString().padStart(2,'0')}
          </output>
          <label>
           Minutes
           <input disabled={deadline!==null} type="number" min={1} max={120} value={minutes} onChange={e=>{
            const n=Math.max(1,Math.min(120,Number(e.target.value)||1));
            setMinutes(n);
            setRemaining(n*60);
           }}/>
          </label>
          <div style={{display:'flex',gap:8}}>
           <button onClick={()=>deadline!==null?setDeadline(null):setDeadline(Date.now()+(remaining||minutes*60)*1000)}>
            {deadline!==null?'Pause':'Start'}
           </button>
           <button onClick={()=>{setDeadline(null);setRemaining(minutes*60);}}>Reset</button>
          </div>
         </section>
        </div>
       )}

       {/* Rewards Tab */}
       {tab==='Rewards' && (
        <>
         <div className="cr-panel">
          <h2>Reward shop</h2>
          <p>Select students in the Students tab, then redeem a reward. Achievement levels stay with them.</p>
          <strong>{selected.length} student(s) selected</strong>
         </div>
         <div className="cr-rewards">
          {r.rewards.map((reward,i)=>(
           <article className="cr-panel" key={i}>
            <span className="cr-reward-icon">✦</span>
            <h3>{reward.name}</h3>
            <p>{reward.cost} points</p>
            <button disabled={!selected.length} onClick={()=>award(reward.name,-reward.cost,'redeem')}>
             Redeem reward
            </button>
           </article>
          ))}
         </div>
        </>
       )}

       {/* History Tab */}
       {tab==='History' && (
        <section className="cr-panel">
         <h2>Points journal</h2>
         <p>A record of encouragement and rewards. Undo keeps the original entry visible.</p>
         {r.entries.length===0 && <p>No points recorded yet.</p>}
         {r.entries.map(e=>(
          <div className="cr-entry" key={e.id}>
           <div>
            <strong>{e.label} {hide?'':`(${e.points>0?'+':''}${e.points})`}</strong>
            <p>{e.studentIds.map(id=>r.students.find(s=>s.id===id)?.name).join(', ')}</p>
            <small>{new Date(e.at).toLocaleString()} · {e.kind}</small>
           </div>
           <button disabled={!!e.undone} onClick={()=>undo(e.id)}>
            {e.undone?'Undone':'Undo'}
           </button>
          </div>
         ))}
        </section>
       )}

       {/* Settings Tab */}
       {tab==='Settings' && (
        <div className="cr-tool-grid">
         <section className="cr-panel">
          <h2>Skills</h2>
          {r.criteria.map((c,i)=>(
           <div className="cr-entry" key={i}>
            <span>{c.name} · +{c.points}</span>
            <button aria-label={`Remove skill ${c.name}`} onClick={()=>update(x=>({...x,criteria:x.criteria.filter((_,j)=>i!==j)}))}>
             Remove
            </button>
           </div>
          ))}
          <button onClick={()=>addRule('criteria')}>Add skill</button>
         </section>

         <section className="cr-panel">
          <h2>Rewards</h2>
          {r.rewards.map((c,i)=>(
           <div className="cr-entry" key={i}>
            <span>{c.name} · {c.cost}</span>
            <button aria-label={`Remove reward ${c.name}`} onClick={()=>update(x=>({...x,rewards:x.rewards.filter((_,j)=>i!==j)}))}>
             Remove
            </button>
           </div>
          ))}
          <button onClick={()=>addRule('rewards')}>Add reward</button>
         </section>

         <section className="cr-panel">
          <h2>Class milestone</h2>
          <p>Collaborative challenge that encourages shared progress.</p>
          <div className="cr-entry">
           <div>
            <strong>{r.goal?.title || 'Robotics trial unlock'}</strong>
            <p>Goal: {r.goal?.target || 50} points</p>
           </div>
           <button onClick={editGoal}>Edit</button>
          </div>
         </section>

         <section className="cr-panel">
          <h2>Class details</h2>
          <button onClick={async()=>{
           const name=await ask({title:'Rename class',label:'Class name',initial:r.name});
           if(name?.trim())update(x=>({...x,name:name.trim().slice(0,100)}));
          }}>
           Rename class
          </button>
          <button className="cr-danger" onClick={async()=>{
           if(await ask({title:'Delete class?',description:`Delete ${r.name} and its entire history? Export a backup first.`,confirmOnly:true,danger:true,submitLabel:'Delete class'})&&save({...current.current,rooms:current.current.rooms.filter(x=>x.id!==active)}))switchRoom(current.current.rooms[0]?.id||'');
          }}>
           Delete class
          </button>
          <p>Choose from 12 illustrated story companions or build a custom avatar. Live AI generation is not connected.</p>
         </section>
        </div>
       )}
      </>
     )}
    </section>
   </div>

   {/* Avatar Customization Dialog */}
   {editing && (
    <dialog ref={modal} onCancel={()=>setEdit('')} className="cr-avatar-dialog" aria-label="Customize companion">
     <h2>{editing.name}’s companion</h2>
     <Companion avatar={editing.avatar}/>
     <label className="cr-photo-upload">
      {photoBusy?'Processing photo…':'Upload student photo'}
      <input aria-label="Upload student photo" disabled={photoBusy} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{void uploadPhoto(e.target.files?.[0]);e.target.value='';}}/>
     </label>
     {editing.avatar.photo && <button onClick={()=>avatar({photo:undefined})}>Remove photo</button>}
     <p role="status">{photoError}</p>
     <p>{characters.find(c=>c.id===editing.avatar.character)?.trait||'Create your own companion.'}</p>
     <div className="cr-character-picker" aria-label="Choose a story companion">
      {characters.map(c=>(
       <button key={c.id} aria-label={`Choose ${c.name}`} aria-pressed={!editing.avatar.photo&&editing.avatar.character===c.id} onClick={()=>avatar({character:c.id,photo:undefined})}>
        <CharacterArt id={c.id}/>
        <strong>{c.name}</strong>
       </button>
      ))}
     </div>
     <button aria-pressed={!editing.avatar.character} onClick={()=>avatar({character:undefined,photo:undefined})}>
      Build your own avatar
     </button>
     {!editing.avatar.character && !editing.avatar.photo && (
      <>
       <label>Character
        <select value={editing.avatar.kind} onChange={e=>avatar({kind:e.target.value as Avatar['kind']})}>
         <option value="robot">Robot</option>
         <option value="cat">Cat</option>
         <option value="alien">Alien</option>
        </select>
       </label>
       <label>Color<input type="color" value={editing.avatar.color} onChange={e=>avatar({color:e.target.value})}/></label>
       <label><input type="checkbox" checked={editing.avatar.hat} onChange={e=>avatar({hat:e.target.checked})}/> Crown</label>
      </>
     )}
     <button onClick={async()=>{
      const name=await ask({title:'Rename student',label:'Student name',initial:editing.name});
      if(name?.trim())update(x=>({...x,students:x.students.map(s=>s.id===edit?{...s,name:name.trim().slice(0,100)}:s)}));
     }}>
      Rename student
     </button>
     <button className="cr-primary" onClick={()=>setEdit('')}>Done</button>
    </dialog>
   )}

   {/* Award Points & Recognitions Modal */}
   {r && awardsOpen && (
    <dialog ref={awardModal} className="cr-award-dialog" aria-labelledby="cr-award-title" onCancel={()=>setAwardsOpen(false)}>
     <header>
      <div>
       <h2 id="cr-award-title">Celebrate a skill</h2>
       <p>{selected.map(id=>r.students.find(s=>s.id===id)?.name).join(', ')}</p>
      </div>
      <button autoFocus aria-label="Close points dialog" onClick={()=>setAwardsOpen(false)}>×</button>
     </header>

     {selected.length===1 && <Companion avatar={r.students.find(s=>s.id===selected[0])!.avatar}/>}

     <div className="cr-dialog-tabs">
      <button 
       type="button" 
       aria-selected={awardTab==='skills'} 
       onClick={()=>setAwardTab('skills')}
      >
       Skills
      </button>
      <button 
       type="button" 
       aria-selected={awardTab==='recognitions'} 
       onClick={()=>setAwardTab('recognitions')}
      >
       Recognitions
      </button>
     </div>

     {awardTab==='skills' ? (
      <section className="cr-awards" aria-label="Skills">
       {r.criteria.map((c,i)=>(
        <button key={i} aria-label={`${c.name} +${c.points}`} onClick={()=>award(c.name,c.points)}>
         <span className="cr-skill-icon"><SkillIcon name={c.name}/></span>
         <span>{c.name}</span>
         <b>+{c.points}</b>
        </button>
       ))}
       {!r.criteria.length && <p>Add a skill in Settings to award points.</p>}
      </section>
     ) : (
      <section className="cr-dialog-badges" aria-label="Recognitions">
       {BADGES.map(badge=>{
        const isAwarded=selected.length===1 && (r.students.find(s=>s.id===selected[0])?.badges||[]).includes(badge.id);
        return (
         <button 
          key={badge.id}
          type="button"
          className={`cr-badge-award-card ${isAwarded?'has-badge':''}`}
          onClick={()=>toggleBadge(badge.id)}
         >
          <span className="cr-skill-icon"><SkillIcon name={badge.id}/></span>
          <div>
           <strong>{badge.name} {isAwarded?'✓':''}</strong>
           <small>{badge.desc}</small>
          </div>
         </button>
        );
       })}
      </section>
     )}

     <p role="status">{notice}</p>
     <button onClick={()=>setAwardsOpen(false)}>Cancel</button>
    </dialog>
   )}

   {/* Floating PiP Timer Launcher */}
   <TimerPip 
    visible={!!r&&tab==='Students'} 
    seconds={remaining} 
    running={deadline!==null} 
    toggle={()=>deadline!==null?setDeadline(null):setDeadline(Date.now()+(remaining||minutes*60)*1000)} 
    reset={()=>{setDeadline(null);setRemaining(minutes*60);}}
   />

   {dialog}
  </main>
 );
}

