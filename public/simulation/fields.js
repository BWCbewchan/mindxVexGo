export const fieldPresets=[
 {id:'grid',title:'Sân luyện tập',level:1},
 {id:'obstacles',title:'Tránh chướng ngại',level:2},
 {id:'maze',title:'Đường chữ U',level:3},
 {id:'checkpoints',title:'Đi qua các điểm mốc',level:2},
 {id:'color',title:'Tìm vật màu đỏ',level:2},
 {id:'push',title:'Đẩy hàng về kho',level:3},
 {id:'delivery',title:'Nhặt và giao hàng',level:3},
 {id:'drawing',title:'Vẽ hình vuông',level:2}
];
export function createField(name,radius=135){
 const x=Math.max(400,Math.min(1050,radius+60)),y=1600,start={x,y,heading:90};
 const f={id:name,name:fieldPresets.find(p=>p.id===name)?.title||'Sân luyện tập',width:2400,height:2400,start,goal:{x:x+700,y,radius:100},walls:[],blocks:[],zones:[],checkpoints:[],objective:'navigate',requires:[],instructions:'Đi thẳng 700 mm đến vòng tròn xanh. Quan sát quãng đường và hướng xe.'};
 if(name==='obstacles')Object.assign(f,{walls:[{id:'wall-1',x:1100,y:1100,width:100,height:850},{id:'wall-2',x:1500,y:400,width:500,height:100}],goal:{x:1900,y:1800,radius:110},instructions:'Đi vòng qua tường để đến đích xanh. Xe phải dừng trước tường, không đi xuyên qua.'});
 if(name==='maze')Object.assign(f,{walls:[{id:'wall-1',x:1050,y:700,width:100,height:1500},{id:'wall-2',x:1550,y:0,width:100,height:1300}],goal:{x:1950,y:1800,radius:110},instructions:'Tìm đường qua hai bức tường chữ U. Dùng chuyển động, điều kiện và cảm biến nếu robot có.'});
 if(name==='checkpoints')Object.assign(f,{checkpoints:[{x:x+500,y,radius:90},{x:x+500,y:y+450,radius:90},{x:x+900,y:y+450,radius:90}],goal:{x:x+900,y:y+450,radius:90},instructions:'Đi qua các điểm 1 → 2 → 3 theo đúng thứ tự. Điểm tiếp theo sẽ sáng lên.'});
 if(name==='color')Object.assign(f,{blocks:[{id:'red-target',x:x+radius+700,y,color:'red',width:60,height:60,pushable:false}],goal:{x:x+280,y,radius:70},requires:['colorEye','distanceEye'],instructions:'Tiến tới khi cảm biến tìm thấy vật. In kết quả nhận biết màu đỏ, rồi dừng trước vật thể.'});
 if(name==='push')Object.assign(f,{objective:'delivery',blocks:[{id:'cargo',x:x+radius+240,y,color:'blue',width:80,height:80,pushable:true}],zones:[{id:'warehouse',x:x+950,y,radius:110,color:'blue'}],instructions:'Đẩy khối xanh vào đúng kho màu xanh. Khối phải nằm hoàn toàn trong vùng kho.'});
 if(name==='delivery')Object.assign(f,{objective:'delivery',blocks:[{id:'disk',x:x+radius+240,y,color:'red',width:40,height:40,pushable:false}],zones:[{id:'warehouse',x:x+950,y,radius:100,color:'red'}],requires:['magnet'],instructions:'Bật nam châm, đưa đĩa đỏ tới kho đỏ rồi thả xuống. Đang cầm đĩa chưa được tính là giao hàng.'});
 if(name==='drawing')Object.assign(f,{objective:'draw',drawDistance:1790,checkpoints:[{x:x+450,y,radius:35},{x:x+450,y:y+450,radius:35},{x,y:y+450,radius:35},{x,y,radius:35}],goal:{x,y,radius:45},instructions:'Hạ bút ảo, lặp 4 lần: đi 450 mm và quay phải 90°. Vẽ đủ bốn cạnh rồi trở về điểm đầu.'});
 return f;
}
const validColor=c=>['red','green','blue'].includes(c)||/^#[0-9a-f]{6}$/i.test(c);
export function validateField(input,radius=135){
 const f=structuredClone(input),finite=(...n)=>n.every(Number.isFinite),inside=(x,y,r=0)=>x>=r&&y>=r&&x<=f.width-r&&y<=f.height-r;
 if(!f||!finite(f.width,f.height,f.start?.x,f.start?.y,f.start?.heading,f.goal?.x,f.goal?.y,f.goal?.radius)||f.width<600||f.width>6000||f.height<600||f.height>6000||f.goal.radius<10||!inside(f.start.x,f.start.y,radius)||!inside(f.goal.x,f.goal.y,f.goal.radius))throw Error('Robot hoặc đích nằm ngoài sân; kiểm tra kích thước CAD và vị trí xuất phát.');
 for(const [key,max] of [['walls',50],['blocks',30],['zones',30],['checkpoints',20]])if(!Array.isArray(f[key])||f[key].length>max)throw Error('Dữ liệu sa bàn không hợp lệ: '+key);
 for(const w of f.walls)if(!finite(w.x,w.y,w.width,w.height)||w.width<5||w.height<5||w.x<0||w.y<0||w.x+w.width>f.width||w.y+w.height>f.height)throw Error('Tường phải nằm trong sân và có kích thước dương.');
 const hit=(x,y,r)=>f.walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.width)),y-Math.max(w.y,Math.min(y,w.y+w.height)))<r);
 if(!inside(f.goal.x,f.goal.y,radius)||hit(f.start.x,f.start.y,radius)||hit(f.goal.x,f.goal.y,radius))throw Error('Robot không đủ khoảng trống tại xuất phát hoặc đích; kiểm tra biên và tường.');
 const ids=new Set();for(const b of f.blocks){if(typeof b.id!=='string'||ids.has(b.id)||!finite(b.x,b.y,b.width,b.height)||b.width<10||b.height<10||b.width>500||b.height>500||!validColor(b.color))throw Error('Vật thể có mã, kích thước hoặc màu không hợp lệ.');ids.add(b.id);const r=Math.max(b.width,b.height)/2;if(!inside(b.x,b.y,r)||hit(b.x,b.y,r)||Math.hypot(b.x-f.start.x,b.y-f.start.y)<radius+r)throw Error('Vật thể đang chồng lên robot, tường hoặc biên sân.');}
 for(let i=0;i<f.blocks.length;i++)for(let j=i+1;j<f.blocks.length;j++){const a=f.blocks[i],b=f.blocks[j];if(Math.abs(a.x-b.x)<(a.width+b.width)/2&&Math.abs(a.y-b.y)<(a.height+b.height)/2)throw Error('Hai vật thể đang chồng lên nhau.');}
 for(const z of [...f.zones,...f.checkpoints])if(!finite(z.x,z.y,z.radius)||z.radius<10||!inside(z.x,z.y,z.radius)||hit(z.x,z.y,z.radius))throw Error('Kho hoặc điểm mốc phải nằm trong vùng trống của sân.');
 for(const p of f.checkpoints)if(!inside(p.x,p.y,radius)||hit(p.x,p.y,radius))throw Error('Robot không đủ khoảng trống để đi qua điểm mốc. Chỉnh sân hoặc chọn xe nhỏ hơn.');
 if(!['navigate','delivery','draw'].includes(f.objective))throw Error('Mục tiêu sa bàn không hợp lệ.');
 return f;
}
export function editField(field,edit,radius){
 const next=structuredClone(field);if(!Number.isFinite(edit.x)||!Number.isFinite(edit.y))throw Error('Vị trí không hợp lệ.');
 const x=Math.round(edit.x/10)*10,y=Math.round(edit.y/10)*10;
 if(edit.kind==='start')Object.assign(next.start,{x,y});else if(edit.kind==='goal')Object.assign(next.goal,{x,y});
 else{const list=({wall:next.walls,block:next.blocks,zone:next.zones,checkpoint:next.checkpoints})[edit.kind],item=list?.find((v,i)=>(v.id??String(i))===edit.id);if(!item)throw Error('Không tìm thấy vật thể.');Object.assign(item,edit.kind==='wall'?{x:x-item.width/2,y:y-item.height/2}:{x,y});}
 return validateField(next,radius);
}
const block=(type,body='',next='')=>`<block type="${type}">${body}${next?'<next>'+next+'</next>':''}</block>`;
const num=(name,n)=>`<value name="${name}"><shadow type="math_number"><field name="NUM">${Math.round(n*10)/10}</field></shadow></value>`;
export function exampleXML(name,radius=135){
 const drive=(n,next='')=>block('go_drivetrain_drive_for','<field name="DIRECTION">fwd</field><field name="UNITS">mm</field>'+num('AMOUNT',n),next),turn=(deg,next='')=>block('go_drivetrain_turn_for','<field name="TURNDIRECTION">right</field>'+num('AMOUNT',deg),next);
 const route=steps=>steps.reduceRight((next,[kind,n])=>kind==='drive'?drive(n,next):turn(n,next),'');
 let code=drive(700);
 if(name==='checkpoints')code=drive(500,turn(90,drive(450,turn(-90,drive(400)))));
 if(name==='obstacles')code=route([['turn',90],['drive',550],['turn',-90],['drive',1050],['turn',-90],['drive',350],['turn',90],['drive',450]]);
 if(name==='maze')code=route([['turn',-90],['drive',1200],['turn',90],['drive',950],['turn',90],['drive',1100],['turn',-90],['drive',600],['turn',90],['drive',300]]);
 if(name==='push')code=drive(950-radius-40);
 if(name==='delivery')code=block('go_magnet_energize','<field name="MAGNET">Magnet</field><field name="ACTION">boost</field>',drive(950-radius-20,block('go_magnet_energize','<field name="MAGNET">Magnet</field><field name="ACTION">drop</field>')));
 if(name==='color')code=block('go_drivetrain_drive_until','<field name="DIRECTION">fwd</field><field name="OBSTACLES">object</field>',block('go_looks_print','<field name="andsetcursortonextrow_mutator">true</field><value name="DATA">'+block('go_sensing_eye_detect','<field name="EYE">Eye</field><field name="COLORS">red</field>')+'</value>'));
 if(name==='drawing')code=block('vr_pen_move','<field name="STATE">down</field>',block('go_control_repeat',num('TIMES',4)+'<statement name="SUBSTACK">'+drive(450,turn(90))+'</statement>',block('vr_pen_move','<field name="STATE">up</field>')));
 return '<xml>'+block('go_events_when_started','',code)+'</xml>';
}
