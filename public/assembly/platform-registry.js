export const PLATFORM_IDS=['vexgo','vexiq','lego'];
export const platformName=id=>({vexgo:'VEX GO',vexiq:'VEX IQ',lego:'LEGO'}[id]||id);
export const platformAssetRoot=id=>({vexgo:'/assembly/',vexiq:'/assembly/iq/',lego:'/assembly/lego/'}[id]||'/assembly/');
export const platformCatalogUrl=id=>platformAssetRoot(id)+'parts.json';
export const platformEditorUrl=id=>platformAssetRoot(id)+'editor.html';
