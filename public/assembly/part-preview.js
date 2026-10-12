import {IQ_PREVIEW_REVISIONS} from './iq/preview-revisions.js';
export function partPreviewSrc(platform,id){
 const root=platform==='vexiq'?'/assembly/iq/':'/assembly/';
 const revision=platform==='vexiq'?IQ_PREVIEW_REVISIONS[id]:null;
 return root+'parts/'+encodeURIComponent(id)+'/preview.png'+(revision?'?rev='+revision:'');
}
