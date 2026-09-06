export type Question={id:string;prompt:string;options:string[];answer:number;explanation:string;evidence:string;image?:string;context?:{text:string;src?:string;page?:number;label:string};references?:{src:string;caption:string;kind:string}[]};
export type Lesson={id:string;title:string;group:string;family:string;lesson:number;filename:string;original:string;format:string;bytes:number;sha256:string;content:string;pages:number;questions:Question[]};
export type Block={type:'text'|'image'|'page'|'divider'|'table';text:string;src?:string;page?:number;rows?:{colSpan:number;rowSpan:number;blocks:Block[]}[][]};
export type Progress={answers:(number|null)[];submitted:boolean;best:number;attempts:number;updated:string};
export const PROGRESS_KEY='mindx-quiz-progress-v1';
export function validProgress(value:unknown,lessons:Lesson[]):value is Record<string,Progress>{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 return Object.entries(value).every(([id,p])=>{const lesson=lessons.find(l=>l.id===id);if(!lesson)return false;return p&&Array.isArray(p.answers)&&p.answers.length===lesson.questions.length&&p.answers.every((a:unknown,i:number)=>a===null||(Number.isInteger(a)&&Number(a)>=0&&Number(a)<lesson.questions[i].options.length))&&typeof p.submitted==='boolean'&&Number.isInteger(p.best)&&p.best>=0&&p.best<=lesson.questions.length&&Number.isInteger(p.attempts)&&p.attempts>=0&&typeof p.updated==='string';});
}
