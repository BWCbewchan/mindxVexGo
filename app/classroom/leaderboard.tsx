'use client';
import Companion from './companion';
import {earned,balance,BADGES,type Room,type Student} from './model';

type Props = {
 room: Room;
 onSelectStudent: (studentId: string) => void;
 hidePoints: boolean;
};

export default function Leaderboard({room,onSelectStudent,hidePoints}:Props){
 const sorted = [...room.students].sort((a,b) => earned(room,b.id) - earned(room,a.id));
 const top3 = sorted.slice(0, 3);
 const rest = sorted.slice(3);

 if(room.students.length === 0){
  return (
   <div className="cr-panel cr-leaderboard-empty">
    <h2>Student recognitions</h2>
    <p>Add students to track learning milestones and achievements.</p>
   </div>
  );
 }

 return (
  <div className="cr-leaderboard-shell">
   <div className="cr-podium-section">
    <span className="cr-eyebrow">CLASS CONTRIBUTIONS</span>
    <h2>Leading effort and milestones</h2>

    <div className="cr-podium">
     {/* 2nd Place */}
     {top3[1] && (
      <div className="cr-podium-slot cr-podium-2" onClick={() => onSelectStudent(top3[1].id)}>
       <div className="cr-podium-rank">2nd</div>
       <Companion avatar={top3[1].avatar} />
       <strong>{top3[1].name}</strong>
       {!hidePoints && <span className="cr-podium-pts">{earned(room,top3[1].id)} pts</span>}
       <div className="cr-podium-pedestal cr-pedestal-2">
        <span>Second</span>
       </div>
      </div>
     )}

     {/* 1st Place */}
     {top3[0] && (
      <div className="cr-podium-slot cr-podium-1" onClick={() => onSelectStudent(top3[0].id)}>
       <div className="cr-podium-rank">1st</div>
       <Companion avatar={top3[0].avatar} />
       <strong>{top3[0].name}</strong>
       {!hidePoints && <span className="cr-podium-pts">{earned(room,top3[0].id)} pts</span>}
       <div className="cr-podium-pedestal cr-pedestal-1">
        <span>First</span>
       </div>
      </div>
     )}

     {/* 3rd Place */}
     {top3[2] && (
      <div className="cr-podium-slot cr-podium-3" onClick={() => onSelectStudent(top3[2].id)}>
       <div className="cr-podium-rank">3rd</div>
       <Companion avatar={top3[2].avatar} />
       <strong>{top3[2].name}</strong>
       {!hidePoints && <span className="cr-podium-pts">{earned(room,top3[2].id)} pts</span>}
       <div className="cr-podium-pedestal cr-pedestal-3">
        <span>Third</span>
       </div>
      </div>
     )}
    </div>
   </div>

   <div className="cr-ranking-table">
    <div className="cr-ranking-header">
     <span>Rank</span>
     <span>Student</span>
     <span>Recognitions</span>
     <span>Level</span>
     <span>Total points</span>
     <span>Action</span>
    </div>

    {sorted.map((student,idx) => {
     const pts = earned(room, student.id);
     const currentBalance = balance(room, student.id);
     const level = 1 + Math.floor(pts / 20);
     const studentBadges = student.badges || [];

     return (
      <div key={student.id} className="cr-ranking-row">
       <span className="cr-rank-num">#{idx + 1}</span>
       <div className="cr-rank-student">
        <div className="cr-rank-avatar">
         <Companion avatar={student.avatar} />
        </div>
        <strong>{student.name}</strong>
       </div>
       <div className="cr-rank-badges">
        {studentBadges.map(bId => {
         const b = BADGES.find(x => x.id === bId);
         return b ? (
          <span key={bId} className="cr-badge-pill" title={`${b.name}: ${b.desc}`}>
           {b.name}
          </span>
         ) : null;
        })}
        {studentBadges.length === 0 && <span className="cr-badge-empty">—</span>}
       </div>
       <span className="cr-rank-level">Level {level}</span>
       <span className="cr-rank-points">{hidePoints ? '—' : `${pts} pts`} <small>({currentBalance} available)</small></span>
       <button 
        className="cr-rank-btn"
        onClick={() => onSelectStudent(student.id)}
       >
        Award
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
}
