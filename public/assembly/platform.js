const address=typeof location!=='undefined'?new URL(location.href):new URL('http://localhost/assembly/editor.html');
export const PLATFORM_ID=address.searchParams.get('platform')==='vexiq'||address.pathname.startsWith('/assembly/iq/')?'vexiq':'vexgo';
export const PROJECT_ID=address.searchParams.get('project');
export const PLATFORM=PLATFORM_ID==='vexiq'?{id:'vexiq',name:'VEX IQ',assetRoot:'/assembly/iq/',brain:'228-2540',battery:'228-2604',motor:'228-2560',electronics:['228-2540','228-2604','228-2560','228-2677','228-3010','228-3011','228-3012','228-3014']}:{id:'vexgo',name:'VEX GO',assetRoot:'/assembly/',brain:'269-6685-000',battery:'269-6686-000',motor:'269-6690-000',electronics:['269-6685-000','269-6686-000','269-6687-000','269-6690-000','269-6695-000','269-6696-000','269-6702-000']};
export const assetUrl=(relative)=>PLATFORM.assetRoot+relative;
