import type {Task} from './coding-model';
type Rule={label:string;types:RegExp;condition?:boolean;number?:number;input?:string};
export function codeRules(task:Task):Rule[]{
 const t=task.requirements.toLocaleLowerCase();const rules:Rule[]=[];
 const add=(when:RegExp,label:string,types:RegExp,condition=false)=>{if(when.test(t))rules.push({label,types,condition});};
 add(/di chuyển|chạy|đi lùi|đi tiến|xe|xoay|quay|nâng|hạ|mở|đóng|cánh tay|quả lắc/,'Có lệnh điều khiển chuyển động trong chương trình.',/^go_(drivetrain_(drive|turn)|motion_spin)/);
 add(/nếu|khi .*thì|cho đến khi/,'Có khối điều kiện hoặc chờ điều kiện.',/^go_control_(if_then|if_then_else|wait_until|repeat_until|while)$/);
 add(/mắt|phát hiện|nhìn thấy/,'Có đọc cảm biến mắt trong điều kiện.',/^go_sensing_eye_(found_object|detect|distance|brightness|hue)$/,true);
 add(/nhấn|ấn vào|được ấn|chạm vào|chạm thì/,'Có kiểm tra Bumper trong điều kiện.',/^go_sensing_bumper$/,true);
 add(/báo động|báo tín hiệu|hiển thị|nháy|nhấp nháy|đèn/,'Có lệnh điều khiển tín hiệu đèn.',/^go_(looks_(set_bumper_color|set_bumper_brightness)|sensing_eye_set_light_(on|power))$/);
 add(/nam châm|hút|nhả|thả vật|nhặt/,'Có lệnh điều khiển nam châm.',/^go_magnet_energize$/);
 add(/dừng|ngừng/,'Có lệnh dừng chuyển động hoặc dừng chương trình.',/^go_(motion_stop_motor|drivetrain_stop_driving|control_stop_project)$/);
 add(/lặp|liên tục|tự động|forever/,'Có cấu trúc lặp trong chương trình.',/^go_control_(repeat|forever|repeat_until|while)$/);
 add(/tốc độ|vận tốc|tăng tốc|giảm tốc/,'Có thiết lập tốc độ động cơ hoặc robot.',/^go_(drivetrain_set_drive_velocity|motion_set_motor_velocity)$/);
 for(const match of t.matchAll(/(\d+(?:[.,]\d+)?)\s*(%|giây|s\b|độ|lần)/g)){
  const n=Number(match[1].replace(',','.')),unit=match[2];
  const types=unit==='%'?/^go_(drivetrain_set_drive_velocity|motion_set_motor_velocity|looks_set_bumper_brightness|sensing_eye_set_light_power)$/:unit==='lần'?/^go_control_repeat$/:unit==='độ'?/^go_(motion_spin_for|motion_spin_to_position|drivetrain_turn_for|drivetrain_turn_to_heading|drivetrain_turn_to_rotation)$/:/^go_control_wait$/;
  const label=`Có thông số ${n} ${unit==='s'?'giây':unit} trong khối lệnh tương ứng.`;
  if(!rules.some(r=>r.label===label))rules.push({label,types,number:n});
 }
 return rules;
}
export function checkCode(task:Task,xml:string){
 const doc=new DOMParser().parseFromString(xml,'application/xml');
 const nodes:Element[]=[];const visited=new Set<Element>();
 const target=(e:Element)=>Array.from(e.children).find(c=>c.tagName==='block')||Array.from(e.children).find(c=>c.tagName==='shadow');
 const roots=Array.from(doc.documentElement.children);const definitions=roots.filter(e=>e.getAttribute('type')==='procedures_definition');
 function walk(b?:Element){
  if(!b||visited.has(b)||b.getAttribute('disabled')==='true')return;visited.add(b);nodes.push(b);
  const type=b.getAttribute('type')||'';
  const condition=Array.from(b.children).find(c=>c.tagName==='value'&&c.getAttribute('name')==='CONDITION');
  const literal=condition&&target(condition);
  const falseCondition=literal?.getAttribute('type')==='logic_boolean'&&literal.querySelector('field[name="BOOL"]')?.textContent==='FALSE';
  const zeroRepeat=type==='go_control_repeat'&&b.querySelector('value[name="TIMES"] > shadow[type="math_number"] > field[name="NUM"]')?.textContent==='0';
  for(const input of Array.from(b.children).filter(c=>['value','statement'].includes(c.tagName))){
   if(input.tagName==='statement'&&((falseCondition&&input.getAttribute('name')==='SUBSTACK')||zeroRepeat))continue;
   walk(target(input));
  }
  if(type==='procedures_call'){
   const code=b.querySelector('mutation')?.getAttribute('proccode');
   for(const def of definitions)if(def.querySelector('mutation')?.getAttribute('proccode')===code)walk(def);
  }
  if(!['go_control_stop_project','go_control_forever'].includes(type))for(const next of Array.from(b.children).filter(c=>c.tagName==='next'))walk(target(next));
 }
 for(const root of roots)if(root.getAttribute('type')==='go_events_when_started')walk(root);
 const started=nodes.some(n=>n.getAttribute('type')==='go_events_when_started'&&Array.from(n.children).some(c=>c.tagName==='next'&&target(c)));
 const rules=codeRules(task);
 const matches=(rule:Rule,b:Element)=>{
  if(!rule.types.test(b.getAttribute('type')||''))return false;
  if(rule.condition){let p=b.parentElement,found=false;while(p){if(p.tagName==='value'&&p.getAttribute('name')==='CONDITION'){found=true;break;}p=p.parentElement;}if(!found)return false;}
  if(rule.number!==undefined){const values=Array.from(b.children).filter(c=>c.tagName==='value').flatMap(c=>Array.from(c.querySelectorAll('field[name="NUM"]')));if(!values.some(v=>Number(v.textContent)===rule.number))return false;}
  return true;
 };
 return {labels:['Có code nối vào when started.',...rules.map(r=>r.label)],checks:[started&&!doc.querySelector('parsererror'),...rules.map(r=>nodes.some(b=>matches(r,b)))],coverage:rules.length>0};
}
