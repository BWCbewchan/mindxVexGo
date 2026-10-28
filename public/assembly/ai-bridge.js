import {ASSEMBLY_COMMANDS} from './api-contract.js';
export function createEditorAIBridge(getAPI,onStatus=()=>{}){
 let connection=null,controller=null,stopped=true,connecting=false;
 const notify=(message,connected=false)=>onStatus({message,connected,connecting,allowWrites:connection?.allowWrites||false});
 async function request(path,body,signal,target=connection){const headers={Authorization:'Bearer '+target.token,'X-Assembly-Session':target.sessionId||''};if(body)headers['Content-Type']='application/json';const response=await fetch(target.url+path,{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined,signal,mode:'cors',credentials:'omit'});const data=await response.json();if(!response.ok)throw Error(data.error||'Không kết nối được MCP local.');return data;}
 async function disconnect(){stopped=true;connecting=false;controller?.abort();const previous=connection;connection=null;if(previous?.sessionId){try{await request('/disconnect',{},AbortSignal.timeout(3000),previous);}catch{}}if(!connection)notify('Chưa kết nối MCP.');}
 async function loop(target,signal){
  while(!stopped&&connection===target){
   try{const task=await request('/next',null,signal,target);if(task.id){let result;
    if(!Object.hasOwn(ASSEMBLY_COMMANDS,task.command))result={ok:false,errorCode:'UNKNOWN_COMMAND',error:'Lệnh không được đăng ký.'};
    else if(!ASSEMBLY_COMMANDS[task.command].readOnly&&!target.allowWrites)result={ok:false,errorCode:'READ_ONLY',error:'Kết nối chỉ cho phép đọc.'};
    else if(Date.now()>task.deadline)result={ok:false,errorCode:'COMMAND_TIMEOUT',error:'Lệnh đã hết hạn; không thực hiện.'};
    else result=await getAPI().execute(task.command,task.args);
    if(!stopped&&connection===target)await request('/result',{id:task.id,result},signal,target);
   }}catch(error){if(!stopped&&connection===target){stopped=true;connection=null;void request('/disconnect',{},AbortSignal.timeout(3000),target).catch(()=>{});notify('MCP đã ngắt: '+error.message);}break;}
  }
 }
 async function connect(link,allowWrites){
  if(connection||connecting)throw Error('Ngắt kết nối hiện tại trước khi ghép nối mô hình khác.');
  const api=getAPI();if(!api)throw Error('Editor đang nạp. Thử lại khi mô hình đã sẵn sàng.');
  let url;try{url=new URL(link);}catch{throw Error('Link ghép nối không hợp lệ. Sao chép link từ assembly_pairing_info.');}const token=new URLSearchParams(url.hash.slice(1)).get('token');
  if(url.protocol!=='http:'||!['127.0.0.1','localhost'].includes(url.hostname)||url.username||url.password||url.search||url.pathname!=='/'||!token||!/^[a-f0-9]{64}$/.test(token))throw Error('Dùng link MCP local 127.0.0.1 hoặc localhost có mã ghép nối hợp lệ.');
  const target={url:url.origin,token,allowWrites:!!allowWrites},attempt=new AbortController();connection=target;controller=attempt;connecting=true;notify('Đang ghép nối MCP…');
  try{const state=await api.execute('getState');if(connection!==target)return;if(!state.ok)throw Error(state.error);
   const project=state.result.project,context=state.result.context||{},data=await request('/connect',{context:{title:project.title,platform:context.platform||project.platform,projectId:context.projectId??project.projectId},allowWrites:target.allowWrites},AbortSignal.any([attempt.signal,AbortSignal.timeout(10000)]),target);target.sessionId=data.sessionId;if(connection!==target){void request('/disconnect',{},AbortSignal.timeout(3000),target).catch(()=>{});return;}connecting=false;stopped=false;notify(`Đã kết nối MCP · ${project.title} · ${target.allowWrites?'cho phép sửa mô hình':'chỉ đọc'}`,true);void loop(target,attempt.signal);
  }catch(error){if(connection!==target)return;connection=null;connecting=false;const detail=error instanceof TypeError?Error('Không tới được MCP local. Kiểm tra server đang chạy, origin được phép và quyền truy cập mạng cục bộ của trình duyệt.'):error;notify(detail.message);throw detail;}
 }
 window.addEventListener('pagehide',()=>{stopped=true;controller?.abort();if(connection?.sessionId)void fetch(connection.url+'/disconnect',{method:'POST',headers:{Authorization:'Bearer '+connection.token,'X-Assembly-Session':connection.sessionId,'Content-Type':'application/json'},body:'{}',keepalive:true,mode:'cors',credentials:'omit'}).catch(()=>{});connection=null;});
 window.addEventListener('assembly-project-replaced',()=>void disconnect());
 return {connect,disconnect,status:()=>({connected:!!connection?.sessionId,connecting,allowWrites:connection?.allowWrites||false})};
}
