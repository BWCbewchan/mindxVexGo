export type Lesson={title:string;minutes:number;context:string;objectives:string[];steps:string[];hints:string[];extensions:string[];stem:{S:string;T:string;E:string;M:string};success:string;reflection:string};
export const lessons:Record<string,Lesson>;
