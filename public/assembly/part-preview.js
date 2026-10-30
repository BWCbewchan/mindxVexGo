import {IQ_PREVIEW_REVISIONS} from './iq/preview-revisions.js';
import {LEGO_PREVIEW_COLORS} from './lego/preview-colors.js';
export function partPreviewSrc(platform,id,kitId){
 if(platform==='lego'){kitId||=typeof document!=='undefined'?document.documentElement.dataset.legoKit:null;const part=LEGO_PREVIEW_COLORS[id],color=part?.kitColors?.[kitId]??part?.defaultColor;return '/assembly/lego/parts/'+encodeURIComponent(id)+'/preview'+(color!==undefined?'-'+color:'')+'.png';}
 const root=platform==='vexiq'?'/assembly/iq/':'/assembly/';
 const revision=platform==='vexiq'?IQ_PREVIEW_REVISIONS[id]:null;
 return root+'parts/'+encodeURIComponent(id)+'/preview.png'+(revision?'?rev='+revision:'');
}
