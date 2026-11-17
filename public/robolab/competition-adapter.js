/* MindX integration of Gears. GPL-3.0; upstream notices and source ZIP retained. */
(() => {
 let initialized=false,robotInfo=null;
 const send=(type,message)=>parent.postMessage({type,message,robot:robotInfo},location.origin);
 const name=port=>/^out/.test(port)?'Cổng '+port.slice(3):/^in/.test(port)?'Cổng '+port.slice(2):port;
 const typeLabel={ColorSensor:'cảm biến màu',UltrasonicSensor:'siêu âm',GyroSensor:'gyro',GPSSensor:'GPS',LaserRangeSensor:'laser khoảng cách',CameraSensor:'camera',TouchSensor:'chạm',LidarSensor:'lidar',MagnetActuator:'nam châm',ArmActuator:'tay động cơ',LinearActuator:'trục tịnh tiến',SwivelActuator:'khớp xoay',PaintballLauncherActuator:'súng bắn bóng',Pen:'bút vẽ'};
 function portMap(config,live){
  const rows=[{port:'A/B',label:'bánh trái/phải'}];
  const walk=(cs,ls)=>cs.forEach((c,i)=>{const l=ls?.[i],label=c.label||typeLabel[c.type];if(l?.port&&label)rows.push({port:name(l.port),label});if(c.components)walk(c.components,l?.components);});
  walk(config,live);return rows;
 }
 async function boot(){
  try{
   Blockly.dialog.setAlert((message,callback)=>window.robolabDialogs.alert(message).then(()=>callback?.()));
   Blockly.dialog.setConfirm((message,callback)=>window.robolabDialogs.confirm(message).then(value=>callback?.(value)));
   Blockly.dialog.setPrompt((message,value,callback)=>window.robolabDialogs.input(message,value).then(result=>callback?.(result)));
   const id=new URLSearchParams(location.search).get('mission');
   const load=file=>fetch(file).then(r=>{if(!r.ok)throw Error('Không tải được danh sách sa bàn.');return r.json();});
   const catalog=[...await load('../competitions.json'),...await load('../practice.json')];
   const entry=catalog.find(item=>item.id===id);
   if(!entry)throw Error('Không tìm thấy sa bàn đã chọn.');
   while(!window.babylon?.scene?.isReady())await new Promise(resolve=>setTimeout(resolve,100));
   const data=entry.world?{worldName:entry.world,options:null}:await fetch(entry.url).then(r=>{if(!r.ok)throw Error('Không tải được dữ liệu sa bàn.');return r.json();});
   const world=worlds.find(item=>item.name===data.worldName);
   if(!world)throw Error('Bộ mô phỏng không hỗ trợ sa bàn này.');
   if(entry.world)data.options={...JSON.parse(JSON.stringify(world.defaultOptions||{})),...entry.worldOptions};
   const profiles=await fetch('../robot-profiles.json').then(r=>{if(!r.ok)throw Error('Không tải được robot cho sa bàn.');return r.json();});
   const rule=entry.world?null:profiles.rules.find(item=>new RegExp(item.match).test(entry.id));
   const profile=rule&&profiles.profiles[rule.profile];
   const template=entry.robotTemplate&&robotTemplates.find(item=>item.name===entry.robotTemplate);
   if(template)robot.options=JSON.parse(JSON.stringify(template));
   if(profile){
    const options={...JSON.parse(JSON.stringify(profiles.base)),name:rule.profile,shortDescription:profile.title,longDescription:profile.purpose,longerDescription:'',thumbnail:'',components:JSON.parse(JSON.stringify(profile.components))};
    const index=robotTemplates.findIndex(item=>item.name===options.name);
    if(index===-1)robotTemplates.push({...options});else robotTemplates[index]={...options};
    robot.options=options;
   }
   babylon.world=world;
   simPanel.worldOptionsSetting=data.options;
   await world.setOptions(data.options);
   await simPanel.resetSim();
   babylon.resetCamera();
   babylon.setCameraMode('arc');
   babylon.cameraArc.setTarget(BABYLON.Vector3.Zero());
   const ground=babylon.scene.getMeshByName('box');
   if(ground){
    const extent=ground.getBoundingInfo().boundingBox.extendSizeWorld;
    const aspect=babylon.engine.getRenderWidth()/babylon.engine.getRenderHeight();
    const halfFov=Math.min(babylon.cameraArc.fov/2,Math.atan(Math.tan(babylon.cameraArc.fov/2)*aspect));
    babylon.cameraArc.radius=Math.hypot(extent.x,extent.z)/Math.sin(halfFov)*1.08;
   }
   simPanel.initSensorsPanel();
   main.tabClicked('navSim');
   robotInfo=profile?{title:profile.title,purpose:profile.purpose,ports:portMap(profile.components,robot.components)}:{title:'Robot mẫu '+(robot.options.name||''),purpose:'Robot mẫu có sẵn của bộ mô phỏng, phù hợp bài luyện tập này.',ports:portMap(robot.options.components||[],robot.components)};
   initialized=true;send('robolab-ready');
  }catch(error){send('robolab-error',error.message);}
 }
 addEventListener('message',event=>{if(event.origin===location.origin&&event.source===parent&&event.data?.type==='robolab-ping'&&initialized)send('robolab-ready');});
 if(document.readyState==='complete')boot();else addEventListener('load',boot,{once:true});
})();
