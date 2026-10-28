import {HELP_TOPICS,SHORTCUTS,TOUR} from './help-content.js';
import {PLATFORM} from './platform.js';
import {describeAssemblyAPI} from './api-contract.js';
import {createEditorAIBridge} from './ai-bridge.js';
import {createAPIWorkbench} from './ai-workbench.js';

export function installAssemblyHelp(){
 const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
 const button=(text,action)=>{const el=node('button',text);el.type='button';el.onclick=action;return el;};
 const link=document.createElement('link');link.rel='stylesheet';link.href='/assembly/help.css';document.head.append(link);
 const dialog=node('dialog');dialog.className='app-help-dialog';dialog.setAttribute('aria-labelledby','assembly-help-title');
 const head=node('header'),heading=node('h2','Trợ giúp Assembly');heading.id='assembly-help-title';const closeButton=button('Đóng',()=>close());head.append(node('span',PLATFORM.name+' / HELP'),heading,closeButton);
 const search=node('input');search.type='search';search.placeholder='Tìm thao tác, phím tắt, pin, kit, PDF…';search.setAttribute('aria-label','Tìm hướng dẫn Assembly');
 const layout=node('div');layout.className='help-layout';const nav=node('nav');nav.setAttribute('aria-label','Chủ đề trợ giúp');const content=node('section');content.className='help-content';content.tabIndex=-1;layout.append(nav,content);dialog.append(head,search,layout);document.body.append(dialog);
 let current='start',returnFocus=null,tour=null,highlight=null;
 const status=node('p','Chưa kết nối MCP.');status.setAttribute('role','status');
 const indicator=button('AI · Chưa kết nối',()=>open('ai'));indicator.id='assembly-ai-status';indicator.className='assembly-ai-status';indicator.hidden=true;document.querySelector('header').append(indicator);
 let disconnectButton,permissionInput,connectButton;
 const bridge=createEditorAIBridge(()=>window.mindxAssembly,info=>{status.textContent=info.message;indicator.hidden=!info.connected;indicator.textContent=info.allowWrites?'AI · Cho phép sửa':'AI · Chỉ đọc';if(disconnectButton)disconnectButton.disabled=!info.connected;if(connectButton)connectButton.disabled=info.connected||info.connecting;if(permissionInput){permissionInput.disabled=info.connected||info.connecting;if(info.connected)permissionInput.checked=info.allowWrites;}});
 function download(name,data){const url=URL.createObjectURL(new Blob([typeof data==='string'?data:JSON.stringify(data,null,2)],{type:'application/json'})),a=node('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 async function copy(text){try{await navigator.clipboard.writeText(text);status.textContent='Đã sao chép.';}catch{status.textContent='Trình duyệt chưa cho sao chép. Chọn nội dung trong ô rồi dùng Ctrl+C.';}}
 function close(){if(dialog.open)dialog.close();const menu=returnFocus?.closest?.('.app-menu');(menu&&!menu.open?menu.querySelector('summary'):returnFocus)?.focus?.();}
 function render(){
  content.replaceChildren();const q=search.value.trim().toLocaleLowerCase('vi');nav.replaceChildren();
  const matches=HELP_TOPICS.filter(topic=>!q||(topic.title+' '+topic.keywords+' '+topic.steps.join(' ')).toLocaleLowerCase('vi').includes(q));
  for(const topic of matches){const item=button(topic.title,()=>{current=topic.id;search.value='';render();content.focus();});item.setAttribute('aria-pressed',String(current===topic.id));nav.append(item);}
  const shortcuts=button('Bảng phím tắt',()=>{current='shortcuts';search.value='';render();}),ai=button('AI / API & MCP',()=>{current='ai';search.value='';render();});shortcuts.setAttribute('aria-pressed',String(current==='shortcuts'));ai.setAttribute('aria-pressed',String(current==='ai'));nav.append(shortcuts,ai,button('Hướng dẫn nhanh trên app',startTour));
  if(q){content.append(node('h3',`Kết quả hướng dẫn (${matches.length})`));for(const topic of matches)topicBody(topic);if(!matches.length)content.append(node('p','Không tìm thấy. Thử “lắp”, “shaft”, “kit”, “layer” hoặc “PDF”.'));return;}
  if(current==='shortcuts'){content.append(node('h3','Phím tắt & thao tác chuột'),node('p','Phím thao tác chỉ hoạt động khi bạn không nhập chữ/số trong ô. Ctrl tương ứng Command trên máy dùng macOS khi ứng dụng hỗ trợ.'));const table=node('table');for(const [key,action] of SHORTCUTS){const row=node('tr'),cell=node('td');cell.append(node('kbd',key));row.append(cell,node('td',action));table.append(row);}content.append(table);return;}
  if(current==='ai'){renderAI();return;}topicBody(HELP_TOPICS.find(topic=>topic.id===current)||HELP_TOPICS[0]);
 }
 function topicBody(topic){const section=node('article');section.append(node('h3',topic.title));const list=node('ol');for(const step of topic.steps)list.append(node('li',step));section.append(list);content.append(section);}
 function renderAI(){
  content.append(node('h3','Làm việc với AI bằng API / MCP'),node('p','AI gửi lệnh trực tiếp vào mô hình đang mở. Lệnh dùng chung kiểm tra kit, khóa layer, khớp và va chạm với giao diện; không cần dò tọa độ chuột.'));
  const setup=node('section');setup.className='help-card';setup.append(node('h4','1. Kết nối MCP local (tùy chọn)'),node('p','Trong ứng dụng AI hỗ trợ MCP stdio, thêm server Node của repo theo docs/assembly-ai.md. Dùng tool assembly_pairing_info để lấy link ghép nối. Mỗi lần chạy server có mã mới; không chia sẻ link đó. Chỉ một mô hình được ghép nối tại một thời điểm.'));
  const config=node('pre',JSON.stringify({mcpServers:{'mindx-assembly':{command:'node',args:['ABSOLUTE_REPO_PATH/scripts/assembly-mcp.mjs']}}},null,2));setup.append(config,button('Sao chép cấu hình MCP',()=>copy(config.textContent)),node('p','Thay ABSOLUTE_REPO_PATH bằng thư mục repo trên máy bạn, chạy npm install trước. MCP server mở relay riêng tại 127.0.0.1; bản web trên Vercel vẫn cần companion local này.'));
  const form=node('form'),label=node('label','Link ghép nối từ MCP'),input=node('input');input.type='password';input.autocomplete='off';input.placeholder='http://127.0.0.1:3188/#token=…';input.setAttribute('aria-label','Link ghép nối MCP');label.append(input);
  const edit=node('label'),check=node('input');check.type='checkbox';check.checked=bridge.status().allowWrites;check.disabled=bridge.status().connected||bridge.status().connecting;permissionInput=check;edit.className='help-checkbox';edit.append(check,node('span','Cho phép AI sửa mô hình đang mở (mặc định chỉ đọc)'));
  const connect=node('button','Kết nối mô hình này');connect.type='submit';connectButton=connect;connect.disabled=bridge.status().connected||bridge.status().connecting;disconnectButton=button('Ngắt kết nối',async()=>{await bridge.disconnect();});disconnectButton.disabled=!bridge.status().connected;
  form.append(label,edit,connect,disconnectButton);form.onsubmit=async e=>{e.preventDefault();connect.disabled=true;try{await bridge.connect(input.value.trim(),check.checked);input.value='';}catch(error){status.textContent=error.message;}finally{connect.disabled=bridge.status().connected||bridge.status().connecting;}};
  const notes=node('details');notes.append(node('summary','Nếu không kết nối được MCP'),node('p','Kiểm tra Node 20+, npm install và đường dẫn script trong cấu hình AI. Gọi assembly_pairing_info của đúng server đang chạy; token đổi khi khởi động lại. Cổng mặc định 3188 phải còn trống. Origin web cần nằm trong danh sách cho phép. Nếu trình duyệt hỏi quyền mạng cục bộ, cho phép kết nối tới companion trên máy bạn. Một server chỉ ghép nối một editor; ngắt editor cũ trước khi đổi mô hình.'),node('p','Tool assembly_diagnostics cho biết hàng đợi, kết nối và kết quả gần nhất. assembly_command_help cung cấp schema từng lệnh. Đóng Help vẫn giữ kết nối; nút AI trên header luôn cho biết quyền hiện tại. Tải lại trang sẽ yêu cầu ghép nối lại. Không gửi token cho người khác.'));
  setup.append(status,form,notes);content.append(setup,createAPIWorkbench());
  const direct=node('section');direct.className='help-card';direct.append(node('h4','3. JavaScript API & đặc tả đầy đủ'),node('p','Có sẵn tại window.mindxAssembly trong editor và trang chứa editor cùng origin. execute luôn trả Promise<{ok,result?,error?}>. Chờ từng kết quả; không tự đoán SKU, ID chi tiết hoặc điểm lắp.'));
  const snippet=node('pre','const api = window.mindxAssembly;\nconst catalog = await api.execute("listParts", {query: "Wheel"});\nconst sku = catalog.result?.[0]?.id;\nconst refs = await api.execute("getCatalogConnectors", {sku});\n// Sau khi chọn SKU và vị trí phù hợp:\nconst part = await api.execute("addPart", {sku, position: [0,50,0]});\n// Kiểm tra part.ok rồi đọc getConnectors({id: part.result.id}).');direct.append(snippet,button('Sao chép ví dụ API',()=>copy(snippet.textContent)),button('Tải đặc tả lệnh JSON',()=>download('mindx-assembly-api.json',describeAssemblyAPI())));
  const reference=node('details');reference.append(node('summary','Danh sách lệnh & JSON schema'));for(const [name,command] of Object.entries(describeAssemblyAPI().commands)){const item=node('details');item.append(node('summary',`${name} · ${command.readOnly?'đọc':'thay đổi'} · ${command.title}`),node('pre',JSON.stringify({inputSchema:command.inputSchema,example:command.example},null,2)));reference.append(item);}direct.append(reference);
  content.append(direct,node('p','Đơn vị: mm, góc độ, trục Y hướng lên. Kiểm tra ok sau mỗi lệnh; nếu timeout, đọc getState trước khi gửi lại lệnh ghi. checkFit là kiểm tra CAD có lấy mẫu.'));
 }
 function stopTour(){highlight?.classList.remove('assembly-help-target');highlight=null;tour?.remove();tour=null;}
 function startTour(){close();stopTour();tour=node('section');tour.className='assembly-help-tour';tour.setAttribute('aria-label','Hướng dẫn nhanh Assembly');let index=0;
  const show=()=>{highlight?.classList.remove('assembly-help-target');const [selector,title,text]=TOUR[index];highlight=document.querySelector(selector);highlight?.classList.add('assembly-help-target');tour.replaceChildren(node('small',`${index+1} / ${TOUR.length}`),node('h3',title),node('p',text));const actions=node('div'),previous=button('Trước',()=>{index--;show();});previous.disabled=index===0;actions.append(previous,button(index===TOUR.length-1?'Hoàn tất':'Tiếp',()=>{if(index===TOUR.length-1)stopTour();else{index++;show();}}),button('Thoát',stopTour));tour.append(actions);};show();document.body.append(tour);tour.querySelector('button:not(:disabled)')?.focus();}
 function open(topic='start'){stopTour();current=topic;returnFocus=document.activeElement;for(const menu of document.querySelectorAll('.app-menus>.app-menu[open]'))menu.open=false;search.value='';render();if(!dialog.open)dialog.showModal();search.focus();}
 search.addEventListener('input',render);
 dialog.addEventListener('cancel',e=>{e.preventDefault();close();});dialog.addEventListener('keydown',e=>{if(e.key==='F1')e.preventDefault();e.stopPropagation();});
 document.addEventListener('keydown',e=>{if(e.key==='F1'){e.preventDefault();open();}if(e.key==='Escape'&&tour){e.preventDefault();e.stopImmediatePropagation();stopTour();}});
 return {open,startTour};
}
