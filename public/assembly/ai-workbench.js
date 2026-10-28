import {ASSEMBLY_COMMANDS,validateAssemblyCommand,describeAssemblyAPI} from './api-contract.js';
import {PLATFORM} from './platform.js';

export function createAPIWorkbench(){
 const el=(tag,text)=>{const item=document.createElement(tag);if(text!==undefined)item.textContent=text;return item;};
 const button=(text,run)=>{const item=el('button',text);item.type='button';item.onclick=run;return item;};
 const root=el('section');root.className='help-card ai-workbench';
 root.append(el('h4','2. Kiểm tra API & thử lệnh'),el('p','Các kiểm tra đọc không thêm linh kiện. Lệnh thay đổi trong trình thử sẽ sửa bản lắp đang mở và có thể Undo.'));
 const summary=el('p','Chưa kiểm tra API.'),health=el('ul');summary.setAttribute('role','status');health.className='ai-health-results';
 const healthButton=button('Kiểm tra API (chỉ đọc)',async()=>{
  healthButton.disabled=true;health.replaceChildren();summary.textContent='Đang kiểm tra…';let passed=0;
  try{for(const command of ['getCapabilities','getState','listParts','getKit']){
   const result=await api().execute(command);const row=el('li');row.dataset.ok=String(result.ok);
   const detail=result.ok?(command==='getState'?`${result.result.project.platform} · ${result.result.project.parts.length} chi tiết · ${result.result.busy?'đang bận':'sẵn sàng'}`:command==='listParts'?`${result.result.length} loại linh kiện`:command==='getKit'?(result.result?.name||'Chưa giới hạn bộ kit'):`Phiên bản ${result.result.version}`):result.error;
   row.textContent=`${result.ok?'Đạt':'Lỗi'} · ${command} · ${detail}`;health.append(row);if(result.ok)passed++;
  }summary.textContent=`Kiểm tra API: ${passed}/4 đạt. Mô hình được giữ nguyên.`;}catch(error){summary.textContent=error.message;}finally{healthButton.disabled=false;}
 });
 root.append(healthButton,summary,health);
 const form=el('form'),selector=el('select');selector.setAttribute('aria-label','Chọn lệnh API');
 for(const [name,item] of Object.entries(ASSEMBLY_COMMANDS)){const option=el('option',`${item.readOnly?'Đọc':'Sửa'} · ${name} — ${item.title}`);option.value=name;selector.append(option);}selector.value='getState';
 const label=el('label','Lệnh cần thử');label.append(selector);
 const mode=el('p'),schema=el('details'),schemaBody=el('pre');schema.append(el('summary','Tham số bắt buộc, schema & ví dụ'),schemaBody);
 const request=el('textarea');request.rows=9;request.spellcheck=false;request.setAttribute('aria-label','Lệnh API JSON');
 const output=el('pre');output.setAttribute('aria-label','Kết quả API');const resultStatus=el('p');resultStatus.setAttribute('role','status');resultStatus.className='ai-command-status';let lastResult=null;
 const showExample=()=>{const command=selector.value,item=ASSEMBLY_COMMANDS[command],args=structuredClone(item.example);if(command==='setKit')args.profile.platform=PLATFORM.id;mode.textContent=item.readOnly?'Chỉ đọc · không thay đổi bản lắp':'Thay đổi mô hình · dùng Undo để hoàn tác';mode.dataset.kind=item.readOnly?'read':'edit';request.value=JSON.stringify({command,args},null,2);schemaBody.textContent=JSON.stringify(item.inputSchema,null,2);resultStatus.textContent='';};
 selector.onchange=showExample;showExample();
 function api(){if(!window.mindxAssembly)throw Error('Editor đang nạp. Chờ mô hình sẵn sàng rồi thử lại.');return window.mindxAssembly;}
 function parsed(){let value;try{value=JSON.parse(request.value);}catch{throw Error('JSON chưa hợp lệ. Kiểm tra dấu ngoặc, dấu phẩy và dấu nháy kép.');}if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!['command','args'].includes(key)))throw Error('Dùng đối tượng JSON chỉ gồm command và args.');const args=value.args===undefined?{}:value.args,validation=validateAssemblyCommand(value.command,args);if(!validation.ok)throw Object.assign(Error(validation.error),{response:validation});return {command:value.command,args};}
 function showError(error){lastResult=error.response||{ok:false,errorCode:'CLIENT_ERROR',error:error.message};output.textContent=JSON.stringify(lastResult,null,2);resultStatus.textContent=error.message;}
 const validate=button('Kiểm tra JSON',()=>{try{const value=parsed();resultStatus.textContent=`JSON hợp lệ · ${value.command} · ${ASSEMBLY_COMMANDS[value.command].readOnly?'chỉ đọc':'sẽ sửa mô hình khi chạy'}`;}catch(error){showError(error);}});
 const selection=button('Điền ID từ lựa chọn',async()=>{try{
  const state=await api().execute('getState');if(!state.ok)throw Error(state.error);const ids=state.result.selectedIds;if(!ids.length)throw Error('Chọn chi tiết trong mô hình trước, rồi mở lại Help.');
  const command=selector.value,args=structuredClone(ASSEMBLY_COMMANDS[command].example),properties=ASSEMBLY_COMMANDS[command].inputSchema.properties;
  if(properties.ids)args.ids=ids;if(properties.id)args.id=ids[0];if(command==='setGroup'){const groupId=state.result.project.parts.find(p=>p.id===ids[0])?.groupId;if(!groupId)throw Error('Chi tiết đang chọn chưa thuộc group.');args.id=groupId;}if(properties.targetId&&ids.length>1)args.targetId=ids[1];request.value=JSON.stringify({command,args},null,2);resultStatus.textContent='Đã điền ID lựa chọn. Kiểm tra lại điểm nối và vị trí trước khi chạy.';
 }catch(error){resultStatus.textContent=error.message;}});
 const run=el('button','Chạy lệnh API');run.type='submit';
 const download=button('Tải kết quả JSON',()=>{if(!lastResult){resultStatus.textContent='Chưa có kết quả để tải.';return;}const url=URL.createObjectURL(new Blob([JSON.stringify(lastResult,null,2)],{type:'application/json'})),a=el('a');a.href=url;a.download='assembly-api-result.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 form.append(label,mode,schema,request,validate,selection,run,download,resultStatus,output);
 form.onsubmit=async event=>{event.preventDefault();run.disabled=true;try{const value=parsed();resultStatus.textContent='Đang chạy '+value.command+'…';lastResult=await api().execute(value.command,value.args);output.textContent=JSON.stringify(lastResult,null,2).slice(0,30000);resultStatus.textContent=`${lastResult.ok?'Thành công':'Thất bại'} · ${value.command} · ${lastResult.meta?.durationMs??0} ms${lastResult.errorCode?' · '+lastResult.errorCode:''}${lastResult.hint?' · '+lastResult.hint:''}`;if(JSON.stringify(lastResult).length>30000)resultStatus.textContent+=' · Bản xem trước đã rút gọn; tải JSON để xem đủ.';}catch(error){showError(error);}finally{run.disabled=false;}};
 root.append(form);
 const flows=el('details');flows.append(el('summary','Quy trình AI nên dùng khi lắp mô hình'));
 const steps=el('ol');for(const text of ['Đọc getState, getKit và listParts để biết nền tảng, mô hình và số lượng còn dùng được.','Đọc getCatalogConnectors trước khi thêm; dùng ID trả về từ addPart. Electronics có thể thêm cả Brain/Battery theo quy tắc app.','Dùng getConnectionOptions giữa hai ID để lấy cặp sourceRef/targetRef và độ sâu gợi ý. Đây là tương thích kiểu lỗ, chưa đảm bảo không va chạm.','attach từng cặp, kiểm tra ok. Dùng checkFit, getConnections và reviewMechanics để rà lại.','Dùng group / duplicateParts cho cụm. Offset áp dụng cho cả cụm, giữ các khớp nội bộ. Không tự đoán ID bản sao.','Đọc getGuide trước exportGuide. Nếu timeout hoặc hủy lệnh đang chạy: đọc getState, không tự gửi lại lệnh ghi.'])steps.append(el('li',text));flows.append(steps);root.append(flows);
 const diagnostics=button('Xem lịch sử lệnh & chẩn đoán',async()=>{try{lastResult=await api().execute('getDiagnostics');output.textContent=JSON.stringify(lastResult,null,2);resultStatus.textContent='60 lệnh gần nhất trong phiên; không ghi tham số, token hoặc dữ liệu CAD.';}catch(error){resultStatus.textContent=error.message;}});root.append(diagnostics);
 const reference=el('details');reference.append(el('summary','Mã lỗi & cách xử lý'));const list=el('dl');for(const [code,hint] of Object.entries(describeAssemblyAPI().errors))list.append(el('dt',code),el('dd',hint));reference.append(list);root.append(reference);
 return root;
}
