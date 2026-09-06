import {codeRules} from './code-check';
import type {Field} from '../training/field-model';
export type Task={id:string;title:string;requirements:string;profile:'code-check'|'forward'|'turn'|'square'|'eye-stop'|'maze';field:Field;note:string;sourceLesson?:string;references?:{src:string;caption:string;kind:string}[]};
export type RunState={x:number;y:number;heading:number;distance:number;rotation:number;running:boolean;status:string;goal:boolean;bumperHits:number;checkpointIndex:number;elapsedMs:number;assessmentId?:string;observations?:{eyeFound:boolean;eyeRead:boolean;stop:boolean;stopAfterEye?:boolean};eye?:{found:boolean;color:string;distance:number};};
export const criteria:Record<Task['profile'],string[]>={'code-check':['Tự kiểm tra cấu trúc code; chưa xác nhận đầy đủ hành vi qua mô phỏng.'],forward:['Đi tiến thẳng 300 mm (sai số 30 mm).','Không va chạm và kết thúc chương trình.'],turn:['Xoay trái hoặc phải 90° (sai số 5°).','Giữ nguyên vị trí; kết thúc chương trình.'],square:['Đi qua các mốc 1 → 2 → 3 rồi trở về điểm xuất phát.','Đi khoảng 1.200 mm (sai số 120 mm), không va chạm.'],maze:['Đi qua mốc 1 → 2 rồi đến đích.','Không va chạm và kết thúc chương trình.'],'eye-stop':['Robot đã di chuyển và đọc được mắt phát hiện vật cản.','Dừng bằng code khi vật còn trong tầm mắt, trước khi va chạm; vòng lặp forever cần đứng yên ít nhất 1 giây.']};
export function grade(task:Task,s:RunState):boolean[]{
 const f=task.field,clean=s.bumperHits===0,finished=!s.running&&['Program finished','Program stopped'].includes(s.status);
 if(task.profile==='forward')return [Math.hypot(s.x-(f.start.x+300),s.y-f.start.y)<=30&&Math.abs(s.distance-300)<=30,clean&&finished&&Math.abs(s.rotation)<5];
 if(task.profile==='turn')return [Math.abs(Math.abs(s.rotation)-90)<=5,finished&&s.distance<5&&clean];
 if(task.profile==='square')return [s.checkpointIndex===3&&s.goal,finished&&clean&&Math.abs(s.distance-1200)<=120];
 if(task.profile==='maze')return [s.checkpointIndex===2&&s.goal,finished&&clean];
 if(task.profile==='eye-stop')return [s.distance>30&&!!s.observations?.eyeFound,finished&&clean&&!!s.eye?.found&&!!s.observations?.stopAfterEye];
 return [];
}


export function taskCriteria(task:Task){return task.profile==='code-check'?['Có code nối vào when started.',...codeRules(task).map(r=>r.label)]:criteria[task.profile];}
