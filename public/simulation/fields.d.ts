import type {SimField} from './config';
export const fieldPresets:Array<{id:string;title:string;level:number}>;
export function createField(name:string,radius?:number):Omit<SimField,'robot'>;
export function validateField(field:SimField,radius?:number):SimField;
export function editField(field:SimField,edit:{kind:string;id?:string;x:number;y:number},radius:number):SimField;
export function exampleXML(name:string,radius?:number):string;
