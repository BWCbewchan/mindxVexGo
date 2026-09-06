(function(){
  'use strict';
  if(new URLSearchParams(location.search).get('mode')!=='training')return;
  const req=window.__vexStudioRequire;
  const B=req('./src/Blockly/BlocklyAccess.ts').Blockly;
  const controllers=req('./src/Blockly/BlocklyController.ts');
  const config=req('./src/RobotConfiguration/Manager/RobotConfigManager.ts');
  const Interpreter=req('./node_modules/@rm-vca/js-interpreter/dist/index.js').Interpreter;
  const post=data=>parent.postMessage(data,location.origin);
  const workspace=()=>controllers.getCurrentMainController()?.blocklyWorkspace;
  const sensorBlocks=['bumper','eye_distance','eye_found_object','eye_detect','eye_hue','eye_brightness','eye_set_range','eye_set_light_on','eye_set_light_power'];
  const configData=req('./src/Blockly/GO_ConfigData.ts');
  function installToolbox(){
    const original=B.Blocks.goToolbox;
    if(!original||original.training)return;
    const wrapped=function(){
      configData.setBumperList([['Bumper1']]);configData.setEyeList([['Eye']]);configData.setMagnetList([['Magnet']]);
      if(new URLSearchParams(location.search).get('assessment')==='code')configData.setMotorList([['Motor1'],['Motor2']]);
      const xml=B.Xml.textToDom(original());
      const sensing=xml.querySelector('category[id="sensing"]');
      if(sensing){
        for(const name of sensorBlocks){
          const type='go_sensing_'+name;
          if(!sensing.querySelector('block[type="'+type+'"]')){
            const block=xml.ownerDocument.createElement('block');block.setAttribute('type',type);
            if(name==='eye_set_light_power')block.innerHTML='<value name="POWER"><shadow type="math_number"><field name="NUM">100</field></shadow></value>';
            sensing.appendChild(block);
          }
        }
      }
      // Only advertise sensing that the virtual robot actually implements.
      xml.querySelectorAll('block[type^="go_sensing_"]').forEach(b=>{if(!sensorSupported.test(b.getAttribute('type')))b.remove();});
      return new XMLSerializer().serializeToString(xml);
    };
    wrapped.training=true;B.Blocks.goToolbox=wrapped;
    const controller=controllers.getCurrentMainController();
    if(controller){controller.setToolbox(wrapped());controller.refreshToolbox();}
  }
  setInterval(()=>{
    if(workspace()&&config.getRCSaveData().length===0){
      try{const device=new config.DeviceObject('Drivetrain',undefined,true);device.portUpdate([1,4]);device.addBufferedDevice();}catch(error){console.warn('Virtual drivetrain configuration:',error.message);}
    }
    if(workspace())installToolbox();
  },1000);
  let field={width:1200,height:1200,start:{x:200,y:600,heading:90},goal:{x:900,y:600,radius:70},walls:[]};
  const engine=window.createTrainingEngine(field);
  let runner=null,epoch=0,status='Ready',driveSpeed=50,turnSpeed=50,started=0,timerStart=0;
  let logs=[],poseRevision=0;
  let missionStarted=null,missionElapsed=0;
  let assessmentId=null,assessmentProfile=null,settledAt=0,observations={eyeRead:false,eyeFound:false,stop:false,stopAfterEye:false};
  const report=()=>{const running=!!runner||engine.moving;if(missionStarted!==null){missionElapsed=performance.now()-missionStarted;if(!running||(!assessmentId&&engine.state.goal))missionStarted=null;}post({type:'training-state',...engine.state,elapsedMs:missionElapsed,running,status,logs,path:[],assessmentId,observations});};
  function stop(message='Stopped'){epoch++;runner=null;engine.stop();status=message;workspace()?.highlightBlock(null);report();}
  function fail(error){stop(error?.message||String(error));}
  function prepare(){
    const g=B.JavaScript;
    const value=(b,k)=>g.valueToCode(b,k,g.ORDER_NONE)||'0';
    const dir=b=>['rev','reverse'].includes(b.getFieldValue('DIRECTION'))?-1:1;
    const turn=b=>b.getFieldValue('TURNDIRECTION')==='left'?-1:1;
    const wait=b=>!b.getFieldValue('anddontwait_mutator');
    g.go_drivetrain_drive=b=>`simMove("drive",${dir(b)} * 1000000000,false);\n`;
    g.go_drivetrain_drive_for=b=>`simMove("drive",${dir(b)} * (${value(b,'AMOUNT')}) * ${['in','inches'].includes(b.getFieldValue('UNITS'))?25.4:1},${wait(b)});\n`;
    g.go_drivetrain_drive_until=b=>`simDriveUntil(${dir(b)},${JSON.stringify(b.getFieldValue('OBSTACLES'))},${wait(b)});\n`;
    g.go_drivetrain_turn=b=>`simMove("turn",${turn(b)} * 1000000000,false);\n`;
    g.go_drivetrain_turn_for=b=>`simMove("turn",${turn(b)} * (${value(b,'AMOUNT')}),${wait(b)});\n`;
    g.go_drivetrain_turn_to_heading=b=>`simTurnTo(${value(b,'HEADING')},true);\n`;
    g.go_drivetrain_turn_to_rotation=b=>`simTurnTo(${value(b,'ROTATION')},false);\n`;
    g.go_drivetrain_stop_driving=()=>`simStop();\n`;
    g.go_drivetrain_set_drive_velocity=b=>`simVelocity("drive",${value(b,'VELOCITY')});\n`;
    g.go_drivetrain_set_turn_velocity=b=>`simVelocity("turn",${value(b,'VELOCITY')});\n`;
    g.go_looks_print=b=>`print(${g.valueToCode(b,'DATA',g.ORDER_NONE)||'""'});\n`;
    g.go_looks_clear_all_rows=()=>`clearConsole();\n`;
    g.go_looks_next_row=()=>`print("");\n`;
    g.go_control_stop_project=()=>`simEnd();\n`;
    g.go_sensing_reset_timer=()=>`simResetTimer();\n`;
    g.go_magnet_energize=b=>`simMagnet(${JSON.stringify(b.getFieldValue('ACTION'))});\n`;
    for(const name of ['bumper','eye_found_object','eye_hue','eye_brightness'])g['go_sensing_'+name]=()=>[`simRead(${JSON.stringify(name)})`,g.ORDER_FUNCTION_CALL];
    g.go_sensing_eye_distance=b=>[`(simRead("eye_distance") / ${b.getFieldValue('UNITS')==='in'?25.4:1})`,g.ORDER_ATOMIC];
    g.go_sensing_eye_detect=b=>[`(simRead("eye_color") === ${JSON.stringify(b.getFieldValue('COLORS'))})`,g.ORDER_ATOMIC];
    g.go_sensing_eye_set_range=b=>`simSensor("range",${JSON.stringify(b.getFieldValue('MODE'))});\n`;
    g.go_sensing_eye_set_light_on=b=>`simSensor("light",${b.getFieldValue('MODE')==='on'?100:0});\n`;
    g.go_sensing_eye_set_light_power=b=>`simSensor("light",${value(b,'POWER')});\n`;
    for(const [name,reading] of Object.entries({timer_value:'timer',drive_is_done:'done',drive_is_moving:'moving',drive_heading:'heading',drive_rotation:'rotation',gyro_heading:'heading',gyro_rotation:'rotation'})){
      g['go_sensing_'+name]=()=>[`simRead(${JSON.stringify(reading)})`,g.ORDER_FUNCTION_CALL];
    }
    g.text=b=>[JSON.stringify(b.getFieldValue('TEXT')),g.ORDER_ATOMIC];
  }
  const supported=/^(math_|logic_|operator_|operators_|go_operator_|go_variables_(variable|set_variable|change_variable|boolean_variable|set_boolean_variable)$|text$|text_|data_|variables_|argument_reporter_|procedures_|go_control_(wait|repeat|forever|if_then|if_then_else|wait_until|repeat_until|while|break|stop_project)$|go_events_when_started$|go_looks_(print|clear_all_rows|next_row)$|go_drivetrain_(drive|drive_for|turn|turn_for|turn_to_heading|turn_to_rotation|stop_driving|set_drive_velocity|set_turn_velocity)$)/;
  const sensorSupported=/^go_sensing_(reset_timer|timer_value|drive_is_done|drive_is_moving|drive_heading|drive_rotation|gyro_heading|gyro_rotation|bumper|eye_distance|eye_found_object|eye_detect|eye_hue|eye_brightness|eye_set_range|eye_set_light_on|eye_set_light_power)$/;
  function validate(ws){
    const unsupported=ws.getAllBlocks(false).filter(b=>!b.disabled&&!supported.test(b.type)&&!sensorSupported.test(b.type)&&!['go_magnet_energize','go_drivetrain_drive_until'].includes(b.type));
    if(unsupported.length)throw new Error('Not simulated yet: '+[...new Set(unsupported.map(b=>b.type))].join(', '));
  }
  function compileMain(){
    prepare();
    const ws=workspace();if(!ws)throw new Error('Wait for the editor to load.');
    const clone=new B.Workspace();
    const xml=B.Xml.workspaceToDom(ws);
    [...xml.children].forEach(n=>{if(n.tagName.toLowerCase()!=='variables'&&!['go_events_when_started','procedures_definition'].includes(n.getAttribute('type')))n.remove();});
    B.Events.disable();
    try{
      B.Xml.domToWorkspace(xml,clone);validate(clone);
      const roots=clone.getTopBlocks(true);
      if(!roots.some(b=>b.type==='go_events_when_started'&&b.getNextBlock()))throw new Error('Add commands under when started, or use a My Block control.');
      roots.forEach(b=>{b.isHatBlock=()=>true;});
      B.JavaScript.init(clone);
      roots.filter(b=>b.type==='procedures_definition').forEach(b=>B.JavaScript.blockToCode(b));
      roots.filter(b=>b.type==='go_events_when_started').forEach(b=>B.JavaScript.blockToCode(b));
      return B.JavaScript.finish('');
    }finally{clone.dispose();B.Events.enable();}
  }
  function run(code){
    if(runner||engine.moving)throw new Error('Stop the current run first.');
    const token=++epoch;driveSpeed=turnSpeed=50;started=timerStart=performance.now();missionStarted=started;missionElapsed=0;logs=[];status='Running';
    const active=()=>token===epoch;
    const native=(i,s,name,fn)=>i.setProperty(s,name,i.createNativeFunction(fn));
    const asyncFn=(i,s,name,fn)=>i.setProperty(s,name,i.createAsyncFunction(fn));
    runner=new Interpreter('var console_precision=0; var vexcodeSystemInit={runInit:function(){}}; function waitForConfigReady(){};\n'+code,(i,s)=>{
      native(i,s,'print',v=>{logs=[...logs,String(v).slice(0,500)].slice(-50);});
      native(i,s,'clearConsole',()=>{logs=[];});
      native(i,s,'simStop',()=>{observations.stop=true;if(observations.eyeFound&&engine.state.eye.found&&engine.state.distance>30)observations.stopAfterEye=true;engine.stop();});
      native(i,s,'simEnd',()=>{observations.stop=true;if(observations.eyeFound&&engine.state.eye.found&&engine.state.distance>30)observations.stopAfterEye=true;stop('Program stopped');});
      native(i,s,'simResetTimer',()=>{timerStart=performance.now();});
      native(i,s,'simRead',kind=>{if(kind.startsWith('eye_')){observations.eyeRead=true;if(engine.state.eye.found)observations.eyeFound=true;}return ({timer:(performance.now()-timerStart)/1000,done:!engine.moving,moving:engine.moving,heading:((engine.state.heading%360)+360)%360,rotation:engine.state.rotation})[kind]??engine.read(kind);});
      native(i,s,'simMagnet',action=>engine.magnet(action));
      native(i,s,'simSensor',(kind,value)=>engine.sensorSetting(kind,value));
      native(i,s,'simVelocity',(kind,v)=>{
        if(!Number.isFinite(Number(v)))throw new Error('Invalid velocity');
        if(kind==='drive')driveSpeed=Math.min(100,Math.max(0,Number(v)));else turnSpeed=Math.min(100,Math.max(0,Number(v)));
      });
      asyncFn(i,s,'wait',(seconds,callback)=>{
        if(!Number.isFinite(Number(seconds))||Number(seconds)<0){fail(new Error('Invalid wait duration'));return;}
        setTimeout(()=>{if(active())callback();},Math.min(Number(seconds)*1000,2147483647));
      });
      asyncFn(i,s,'simMove',(kind,amount,andWait,callback)=>{
        observations.stopAfterEye=false;
        try{engine.command(kind,Number(amount),(kind==='drive'?driveSpeed*2.5:turnSpeed*1.8),()=>{if(active()&&andWait)callback();});if(!andWait)callback();}catch(error){fail(error);}
      });
      asyncFn(i,s,'simDriveUntil',(direction,obstacle,andWait,callback)=>{
        observations.stopAfterEye=false;
        try{engine.commandUntil(direction,obstacle,driveSpeed*2.5,()=>{if(active()&&andWait)callback();});if(!andWait)callback();}catch(error){fail(error);}
      });
      asyncFn(i,s,'simTurnTo',(target,heading,callback)=>{
        observations.stopAfterEye=false;
        let delta=Number(target)-(heading?((engine.state.heading%360)+360)%360:engine.state.rotation);
        if(heading)delta=((delta+540)%360+360)%360-180;
        try{engine.command('turn',delta,turnSpeed*1.8,()=>{if(active())callback();});}catch(error){fail(error);}
      });
    });
    report();
  }
  let lastTime=performance.now(),lastReport=0,lastPose=0;
  setInterval(()=>{
    const now=performance.now(),dt=(now-lastTime)/1000;lastTime=now;
    engine.tick(dt);
    if(!runner&&!engine.moving&&status==='Moving — press Stop to stop')status='Program finished';
    // Contact stops the motors, but the interpreter must continue so a bumper
    // condition can reverse or turn away from the obstacle.
    if(runner){
      if(now-started>300000){stop('Run limit reached (5 minutes).');}
      else try{const until=performance.now()+5;for(let n=0;n<500&&runner&&!runner.paused_&&performance.now()<until;n++){if(!runner.step()){runner=null;status=engine.moving?'Moving — press Stop to stop':'Program finished';break;}}}catch(error){fail(error);}
    }
    // Sensor tasks commonly keep a forever loop alive after stopping the robot.
    // Accept one second of stable stopping after an actual positive eye reading.
    if(assessmentId&&assessmentProfile==='eye-stop'&&runner&&!engine.moving&&observations.stopAfterEye&&engine.state.bumperHits===0&&engine.state.eye.found){
      if(!settledAt)settledAt=now;
      if(now-settledAt>=1000)stop('Program stopped');
    }else settledAt=0;
    if(now-lastReport>100){lastReport=now;report();}
    if(now-lastPose>=30){lastPose=now;post({type:'training-pose',x:engine.state.x,y:engine.state.y,heading:engine.state.heading,collision:engine.state.collision,blocks:engine.state.blocks,carryingId:engine.state.carrying,carrying:engine.state.blocks.find(b=>b.id===engine.state.carrying)?.color||null,revision:poseRevision});}
  },16);
  window.VexTraining={prepare,validate,get running(){return !!runner||engine.moving;},runFunction(signature,args){prepare();run(window.VexStudio.compileFunction(signature,args));return {signature};},stop};
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||event.source!==parent||event.data?.type!=='training-command')return;
    try{
      const {action}=event.data;
      if(action==='inspect-code'){
        post({type:'quiz-code-inspection',attemptId:event.data.attemptId,xml:workspace()?B.Xml.domToText(B.Xml.workspaceToDom(workspace())):'<xml/>'});return;
      }
      if(action==='run'){assessmentId=null;run(compileMain());}
      if(action==='assess'){
        stop('Ready');assessmentId=String(event.data.attemptId||'').slice(0,100);
        assessmentProfile=event.data.profile==='eye-stop'?'eye-stop':null;settledAt=0;
        observations={eyeRead:false,eyeFound:false,stop:false,stopAfterEye:false};engine.reset();missionStarted=null;missionElapsed=0;poseRevision++;
        run(compileMain());
      }
      if(action==='stop')stop();
      if(action==='reset'){stop('Ready');engine.reset();missionStarted=null;missionElapsed=0;poseRevision++;report();}
      if(action==='field'){
        const f=event.data.field;
        if(!f||![f.width,f.height,f.start?.x,f.start?.y,f.start?.heading,f.goal?.x,f.goal?.y,f.goal?.radius].every(Number.isFinite)||f.width<300||f.height<300||!Array.isArray(f.walls))throw new Error('Invalid field');
        stop('Ready');field=f;engine.reset(f);missionStarted=null;missionElapsed=0;poseRevision++;report();
      }
      if(action==='demo'){
        stop('Ready');const ws=workspace();if(!ws)throw new Error('Wait for the editor.');
        const xml=B.Xml.textToDom('<xml><block type="go_events_when_started" x="40" y="40"><next><block type="go_drivetrain_drive_for"><field name="DIRECTION">forward</field><field name="UNITS">mm</field><value name="AMOUNT"><shadow type="math_number"><field name="NUM">700</field></shadow></value></block></next></block></xml>');
        ws.clear();B.Xml.domToWorkspace(xml,ws);
      }
      if(action==='example'){
        const kind=event.data.kind;if(!['cargo-1','sensor-bumper-1','sensor-eye-1'].includes(kind))throw new Error('Unknown example');
        stop('Ready');const ws=workspace();if(!ws)throw new Error('Wait for the editor.');
        const block=(type,content='',next='')=>`<block type="${type}">${content}${next?'<next>'+next+'</next>':''}</block>`;
        const amount=(name,n)=>`<value name="${name}"><shadow type="math_number"><field name="NUM">${n}</field></shadow></value>`;
        const drive=(n,next='')=>block('go_drivetrain_drive_for',`<field name="DIRECTION">${n<0?'rev':'fwd'}</field><field name="UNITS">mm</field>`+amount('AMOUNT',Math.abs(n)),next);
        const turn=(direction,next)=>block('go_drivetrain_turn_for',`<field name="TURNDIRECTION">${direction}</field>`+amount('AMOUNT',90),next);
        const magnet=(action,next='')=>block('go_magnet_energize',`<field name="MAGNET">Magnet</field><field name="ACTION">${action}</field>`,next);
        const until=(sensor,next)=>block('go_control_wait_until','<value name="CONDITION">'+block('go_sensing_'+sensor)+'</value>',next);
        let stack;
        if(kind==='cargo-1')stack=until('eye_found_object',drive(100,block('go_control_if_then','<value name="CONDITION">'+block('go_sensing_eye_detect','<field name="COLORS">red</field>')+'</value><statement name="SUBSTACK">'+magnet('boost')+'</statement>',drive(600,magnet('drop')))));
        if(kind==='sensor-bumper-1')stack=block('go_drivetrain_drive','<field name="DIRECTION">forward</field>',until('bumper',drive(-405,turn('right',drive(400)))));
        if(kind==='sensor-eye-1')stack=block('go_drivetrain_drive','<field name="DIRECTION">forward</field>',until('eye_found_object',block('go_drivetrain_stop_driving','',turn('right',drive(600,turn('left',drive(740)))))));
        ws.clear();B.Xml.domToWorkspace(B.Xml.textToDom('<xml>'+block('go_events_when_started','',stack)+'</xml>'),ws);
      }
    }catch(error){fail(error);}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('Paused by leaving the page. Press Run to restart.');});
  document.addEventListener('click',event=>{
    if(event.target.closest?.('.brain_button,.tool_download,.tool_build,.tool_play,.tool_pause,.tool_step,.tool_stop')){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  const style=document.createElement('style');style.textContent='.brain_button,.tool_download,.tool_build,.tool_play,.tool_pause,.tool_step,.tool_stop{display:none!important}';document.head.append(style);
})();
