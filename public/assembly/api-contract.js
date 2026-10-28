export const ASSEMBLY_API_VERSION='1.2';
const str={type:'string',minLength:1,maxLength:200},bool={type:'boolean'},num={type:'number'},ids={type:'array',minItems:1,maxItems:250,uniqueItems:true,items:str},vec={type:'array',minItems:3,maxItems:3,items:{type:'number',minimum:-10000,maximum:10000}};
const define=(title,readOnly,properties={},required=[],example={})=>({title,readOnly,inputSchema:{type:'object',properties,required,additionalProperties:false},example});
export const ASSEMBLY_COMMANDS={
 getCapabilities:define('Phiên bản, lệnh và quy tắc API',true),
 getState:define('Đọc mô hình và lựa chọn hiện tại',true),
 getDiagnostics:define('Trạng thái và lịch sử lệnh gần đây, không chứa dữ liệu CAD',true),
 listParts:define('Tìm linh kiện trong bộ GO hoặc IQ đang mở',true,{query:{type:'string',maxLength:200},category:{type:'string',maxLength:120}},[],{query:'Wheel'}),
 getCatalogConnectors:define('Đọc điểm lắp theo SKU trước khi thêm chi tiết',true,{sku:str},['sku'],{sku:'228-2500-001'}),
 getConnectors:define('Đọc điểm lắp của chi tiết trong mô hình',true,{id:str},['id'],{id:'PART_ID'}),
 getConnectionOptions:define('Tìm cặp điểm nối tương thích giữa hai chi tiết; chưa lắp',true,{id:str,targetId:str,offset:{type:'integer',minimum:0},limit:{type:'integer',minimum:1,maximum:200}},['id','targetId'],{id:'PIN_ID',targetId:'BEAM_ID',limit:20}),
 select:define('Chọn các chi tiết',false,{ids},['ids'],{ids:['PART_ID']}),
 addPart:define('Thêm linh kiện; trả về ID và linh kiện đi kèm',false,{sku:str,position:vec,rotation:vec},['sku'],{sku:'228-2500-001',position:[0,50,0]}),
 setTransform:define('Di chuyển/xoay một chi tiết; tháo các liên kết bị tác động',false,{id:str,position:vec,rotation:vec},['id'],{id:'PART_ID',position:[100,50,0]}),
 attach:define('Lắp bằng điểm nối CAD hợp lệ',false,{id:str,targetId:str,sourceRef:str,targetRef:str,depth:{...num,minimum:0},twist:num},['id','targetId','sourceRef','targetRef'],{id:'PIN_ID',targetId:'BEAM_ID',sourceRef:'PIN_REFERENCE',targetRef:'HOLE_REFERENCE'}),
 snap:define('Tự tìm khớp tương thích ở gần',false,{id:str},['id'],{id:'PART_ID'}),
 detach:define('Tháo liên kết của chi tiết',false,{id:str},['id'],{id:'PART_ID'}),
 deleteParts:define('Xóa chi tiết; có thể Undo',false,{ids},['ids'],{ids:['PART_ID']}),
 duplicateParts:define('Sao chép chi tiết/cụm; giữ các khớp nội bộ và cây group',false,{ids,groupId:str,offset:vec},['ids'],{ids:['PART_A','PART_B'],offset:[100,0,0]}),
 group:define('Gom các chi tiết vào group',false,{ids:{...ids,minItems:2},name:{type:'string',minLength:1,maxLength:120}},['ids'],{ids:['PART_A','PART_B'],name:'Cụm bánh trái'}),
 ungroup:define('Tách group nhưng giữ các chi tiết',false,{ids,groupId:str},['ids'],{ids:['PART_A','PART_B']}),
 setLayer:define('Ẩn/hiện hoặc khóa/mở khóa chi tiết',false,{id:str,visible:bool,locked:bool},['id'],{id:'PART_ID',locked:true}),
 setGroup:define('Tên, cây group, trạng thái khóa và hiển thị',false,{id:str,name:str,parentId:{type:['string','null']},visible:bool,locked:bool,collapsed:bool},['id'],{id:'GROUP_ID',name:'Khung xe'}),
 checkFit:define('Kiểm tra va chạm CAD có lấy mẫu',true),
 getConnections:define('Đọc các khớp đã nhận diện',true),
 reviewMechanics:define('Kiểm tra giữ trục và cơ cấu truyền động',true),
 getInventory:define('Linh kiện và tồn kho kit',true),
 getKit:define('Đọc cấu hình bộ kit',true),
 setKit:define('Áp dụng cấu hình kit đã kiểm tra',false,{profile:{type:'object',properties:{version:{type:'integer',enum:[1]},platform:{type:'string',enum:['vexgo','vexiq']},name:{type:'string',minLength:1,maxLength:120},count:{type:'integer',minimum:1,maximum:100},enforce:bool,items:{type:'object',additionalProperties:{type:'integer',minimum:0,maximum:10000}}},required:['version','platform','name','count','enforce','items'],additionalProperties:false}},['profile'],{profile:{version:1,platform:'vexgo',name:'Example custom kit',count:1,enforce:false,items:{}}}),
 getGuide:define('Đọc bước hướng dẫn và các lỗi cần sửa',true),
 exportProject:define('Đọc toàn bộ dữ liệu dự án để lưu JSON',true),
 flushProject:define('Lưu các chỉnh sửa hiện tại',false),
 exportGuide:define('Tạo bản in/PDF khi hướng dẫn hợp lệ',false),
 undo:define('Hoàn tác một lần sửa',false),
 redo:define('Làm lại lần sửa vừa hoàn tác',false),
};
for(const [command,fields] of Object.entries({setTransform:['position','rotation'],setLayer:['visible','locked'],setGroup:['name','parentId','visible','locked','collapsed']}))ASSEMBLY_COMMANDS[command].inputSchema.anyOf=fields.map(field=>({required:[field]}));
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
freeze(ASSEMBLY_COMMANDS);

export const API_ERROR_HELP=freeze({
 UNKNOWN_COMMAND:'Dùng getCapabilities để lấy tên lệnh hợp lệ.',
 INVALID_ARGUMENTS:'Sửa các trường được chỉ ra trong details; không tự đổi kiểu dữ liệu.',
 UNKNOWN_PART:'Đọc getState và dùng ID chi tiết hiện có.',UNKNOWN_SKU:'Tìm SKU bằng listParts trong đúng thư viện GO/IQ.',
 UNKNOWN_CONNECTOR:'Đọc getConnectors hoặc getCatalogConnectors; không đoán ID lỗ.',
 LAYER_LOCKED:'Mở khóa chi tiết/group trước khi sửa.',BUSY:'Kết thúc thao tác kéo/xem trước rồi gửi lại sau.',
 INCOMPATIBLE_CONNECTORS:'Dùng getConnectionOptions để tìm cặp điểm nối phù hợp.',CYCLE_REJECTED:'Đổi chi tiết đích để không tạo chuỗi khớp vòng.',
 COLLISION:'Chọn vị trí, góc hoặc độ sâu khác. Lần sửa đã được hoàn tác.',KIT_LIMIT:'Đọc getInventory/getKit, bớt chi tiết hoặc điều chỉnh số lượng bộ kit.',
 GUIDE_NOT_READY:'Đọc getGuide, sửa liên kết và các blocker trước khi xuất.',PERSISTENCE_FAILED:'Giữ bản JSON và kiểm tra dung lượng lưu trữ trình duyệt.',
 READ_ONLY:'Ngắt kết nối rồi ghép nối lại với quyền sửa trong Help.',NOT_CONNECTED:'Mở Help → AI / API & MCP và ghép nối mô hình.',
 COMMAND_TIMEOUT:'Đọc getState trước khi gửi lại lệnh ghi; lệnh có thể đã hoàn tất.',
 CANCELLED:'Lệnh chưa được chuyển cho editor nên chưa thay đổi mô hình.',
 CANCELLED_IN_FLIGHT:'Lệnh đã chuyển cho editor và có thể vẫn hoàn tất. Đọc getState trước khi gửi lại.',
 EDITOR_REJECTED:'Đọc thông báo cụ thể và getDiagnostics trước khi thử lại.'
});

// Small, shared validator for the JSON Schema subset used above. Never coerce input.
export function validateAssemblyCommand(command,args={}){
 if(typeof command!=='string'||!Object.hasOwn(ASSEMBLY_COMMANDS,command))return {ok:false,errorCode:'UNKNOWN_COMMAND',error:'Unknown command: '+String(command),hint:API_ERROR_HELP.UNKNOWN_COMMAND};
 const issues=[],ancestors=new Set(),issue=(path,message)=>{if(issues.length<30)issues.push({path,message});};
 function check(schema,value,path,depth=0){
  if(depth>12){issue(path,'JSON nesting exceeds 12 levels');return;}
  const actual=value===null?'null':Array.isArray(value)?'array':typeof value;
  const types=Array.isArray(schema.type)?schema.type:[schema.type];
  if(!types.some(type=>type===actual||(type==='integer'&&actual==='number'&&Number.isInteger(value)))){issue(path,'Expected '+types.join(' or '));return;}
  if(schema.enum&&!schema.enum.includes(value))issue(path,'Expected one of '+schema.enum.join(', '));
  if(actual==='number'){if(!Number.isFinite(value))issue(path,'Expected finite number');if(value<schema.minimum||value>schema.maximum)issue(path,`Outside allowed range ${schema.minimum??'-∞'}..${schema.maximum??'∞'}`);}
  if(actual==='string'){if(schema.minLength&&value.trim().length<schema.minLength)issue(path,'Value must not be blank');if(value.length>(schema.maxLength??Infinity))issue(path,'Text is too long');}
  if(actual!=='object'&&actual!=='array')return;
  if(ancestors.has(value)){issue(path,'Cyclic JSON is not supported');return;}
  ancestors.add(value);
  if(actual==='array'){
   if(value.length<(schema.minItems??0)||value.length>(schema.maxItems??Infinity))issue(path,`Expected ${schema.minItems??0}..${schema.maxItems??'∞'} items`);
   if(schema.uniqueItems&&new Set(value).size!==value.length)issue(path,'Items must be unique');
   for(let i=0;i<Math.min(value.length,10001);i++)check(schema.items,value[i],`${path}[${i}]`,depth+1);
  }else{
   // A same-origin parent window has a different Object.prototype. Accept its
   // ordinary JSON objects while still rejecting class/DOM/Date instances.
   const prototype=Object.getPrototypeOf(value);
   if(prototype!==null&&(Object.getPrototypeOf(prototype)!==null||Object.prototype.toString.call(value)!=='[object Object]'))issue(path,'Expected a plain JSON object');
   for(const key of schema.required||[])if(!Object.hasOwn(value,key)||value[key]===undefined)issue(path+'.'+key,'Required field');
   if(schema.anyOf&&!schema.anyOf.some(option=>option.required.every(key=>Object.hasOwn(value,key)&&value[key]!==undefined)))issue(path,'Supply at least one change: '+schema.anyOf.flatMap(option=>option.required).join(', '));
   for(const key of Object.keys(value)){
    if(Object.hasOwn(schema.properties||{},key))check(schema.properties[key],value[key],path+'.'+key,depth+1);
    else if(schema.additionalProperties===false)issue(path+'.'+key,'Unknown field');
    else if(typeof schema.additionalProperties==='object')check(schema.additionalProperties,value[key],path+'.'+key,depth+1);
   }
  }
  ancestors.delete(value);
 }
 check(ASSEMBLY_COMMANDS[command].inputSchema,args,'args');
 return issues.length?{ok:false,errorCode:'INVALID_ARGUMENTS',error:'Invalid arguments: '+issues.map(item=>item.path+' '+item.message).join('; '),details:issues,hint:API_ERROR_HELP.INVALID_ARGUMENTS}:{ok:true};
}
export function describeAssemblyAPI(){return {version:ASSEMBLY_API_VERSION,units:{position:'millimeters',rotation:'degrees',axes:'Y up'},limits:{parts:250,coordinate:10000},rules:['Đọc catalog và connectors, không tự đoán SKU hoặc ID lỗ.','getConnectionOptions chỉ xét kiểu điểm nối; attach vẫn kiểm tra va chạm, kit và hướng lắp.','Chờ từng lệnh hoàn tất. Lệnh sửa dùng chung kiểm tra khóa layer, kit và va chạm với giao diện.','Luôn kiểm tra ok; khi timeout/cancel đang chạy hãy đọc getState trước khi gửi lại lệnh ghi.','duplicateParts giữ khớp nội bộ; offset tính bằng mm. setTransform tách các khớp bị ảnh hưởng.','checkFit là kiểm tra CAD có lấy mẫu, không chứng nhận lắp ngoài thực tế.'],errors:structuredClone(API_ERROR_HELP),commands:structuredClone(ASSEMBLY_COMMANDS)};}
