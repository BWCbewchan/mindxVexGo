import {libraryGroup} from './part-group.js';

export function isGuideElectronic(part,name){
 return ['motor','electronic','sensor','brain','battery'].includes(part.kind)||libraryGroup({...part,name})==='electronics';
}

export function guidePartPriority(part,name){
 const group=libraryGroup({...part,name});
 if(group==='retainers')return 6;
 if(part.kind==='pin'||group==='pins')return 0;
 if(part.kind==='shaft')return 1;
 if(part.kind==='gear')return 2;
 switch(group){
  case 'shafts':return 1;
  case 'transmission':return 2;
  case 'beams':
  case 'connectors':return 3;
  case 'wheels':return 5;
  default:return 4;
 }
}
