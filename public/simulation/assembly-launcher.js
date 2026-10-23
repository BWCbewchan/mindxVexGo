import {PLATFORM,PROJECT_ID} from '../assembly/platform.js';
export function installSimulationLauncher(api){
 const button=document.createElement('button');button.id='simulation-open';button.type='button';button.title='Lập trình robot trên sân ảo 3D';
 const icon=document.createElement('i');icon.dataset.lucide='play';icon.setAttribute('aria-hidden','true');button.append(icon,document.createTextNode('Lập trình ảo'));document.querySelector('nav').insertBefore(button,document.getElementById('library-toggle'));globalThis.lucide?.createIcons({root:button});
 button.onclick=async()=>{if(api.blocked()){api.status('Kết thúc thao tác hoặc quay lại mô hình đầy đủ trước khi mở lập trình ảo.');return;}api.closePreviews();if(!await api.save(false))return;const query=new URLSearchParams({platform:PLATFORM.id,...(PROJECT_ID?{project:PROJECT_ID}:{source:'legacy'})});window.top.location.assign('/simulation?'+query);};
}
