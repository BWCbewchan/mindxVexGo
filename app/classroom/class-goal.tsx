'use client';
import {earned,type Room,type ClassGoal} from './model';

type Props = {
 room: Room;
 onEditGoal: () => void;
 hidePoints: boolean;
};

export default function ClassGoalBar({room,onEditGoal,hidePoints}:Props){
 const goal: ClassGoal = room.goal || {title:'Robotics trial unlock',target:50};
 const totalEarned = room.students.reduce((n,s) => n + earned(room,s.id), 0);
 const pct = Math.min(100, Math.round((totalEarned / goal.target) * 100));
 const reached = pct >= 100;

 return (
  <section className={`cr-class-goal ${reached ? 'cr-goal-reached' : ''}`} aria-label="Class milestone">
   <div className="cr-goal-row">
    <div className="cr-goal-info">
     <span className="cr-eyebrow">MILESTONE</span>
     <strong className="cr-goal-title">{goal.title}</strong>
    </div>

    <div className="cr-goal-track-wrap">
     <div className="cr-goal-track">
      <div 
       className="cr-goal-fill" 
       style={{width: `${pct}%`}}
       role="progressbar" 
       aria-valuenow={pct} 
       aria-valuemin={0} 
       aria-valuemax={100}
      />
     </div>
     <span className="cr-goal-pct">{pct}%</span>
    </div>

    <div className="cr-goal-stats">
     {!hidePoints && (
      <span className="cr-goal-count">
       <strong>{totalEarned}</strong>/{goal.target} pts
      </span>
     )}
     <button className="cr-goal-edit-btn" onClick={onEditGoal} title="Edit milestone">
      Edit
     </button>
    </div>
   </div>

   {reached && (
    <div className="cr-goal-banner">
     Class milestone achieved: <strong>{goal.title}</strong>
    </div>
   )}
  </section>
 );
}
