(function () {
  'use strict';
  const requireModule = window.__vexStudioRequire;
  delete window.__vexStudioRequire;
  if (!requireModule) return;
  const B = requireModule('./src/Blockly/BlocklyAccess.ts').Blockly;
  const controllers = requireModule('./src/Blockly/BlocklyController.ts');
  const hardware = requireModule('./src/HardwareInterface/HWInterface.ts');
  const interpreter = requireModule('./src/jsinterpreter/vexcodejsinterpreter.ts').JSInterpreter;
  const codeGen = requireModule('./src/codeGen.ts');
  const config = requireModule('./src/RobotConfiguration/Manager/RobotConfigManager.ts');
  let hw = null, enabled = false, pending = false, stopUntil = 0, assignedKeys = new Set();
  hardware.getInterface().then(value => { hw = value; }).catch(console.error);
  const workspace = () => controllers.getCurrentMainController()?.blocklyWorkspace;
  const connected = () => !!hw && hw.getConnectionState() === hardware.BrainConnectionState.Connected;
  const post = data => window.parent.postMessage(data, location.origin);
  let controllerRun = false;
  const originalRunComplete = interpreter.onRunComplete;
  interpreter.onRunComplete = function (...args) {
    originalRunComplete.apply(this,args);
    // The vendor keeps normal projects alive for events after their main stack
    // ends. A standalone controller call must release that running state.
    if(controllerRun && this.isRunning){
      controllerRun=false;
      this.stop();
    }
  };
  let highlighted = [], highlightTimer = null, highlightStarted = 0;
  function clearFunctionHighlight() {
    clearTimeout(highlightTimer);
    highlighted.forEach(root=>root.classList.remove('studio-function-running'));
    highlighted = [];
  }
  function highlightFunction(signature) {
    clearFunctionHighlight();
    const definition=workspace()?.getAllBlocks(false).find(block=>block.type==='procedures_definition'&&block.getInputTargetBlock('custom_block')?.mutationToDom().getAttribute('proccode')===signature);
    if(!definition)return;
    highlighted=[definition,definition.getInputTargetBlock('custom_block')].map(block=>block?.getSvgRoot?.()).filter(Boolean);
    highlighted.forEach(root=>root.classList.add('studio-function-running'));
    highlightStarted=Date.now();
  }
  function functions() {
    const ws = workspace();
    if (!ws) return [];
    return ws.getAllBlocks(false).filter(block => block.type === 'procedures_definition').map(block => {
      const prototype = block.getInputTargetBlock('custom_block');
      const mutation = prototype?.mutationToDom();
      if (!mutation) return null;
      const signature = mutation.getAttribute('proccode');
      const names = JSON.parse(mutation.getAttribute('argumentnames') || '[]');
      const defaults = JSON.parse(mutation.getAttribute('argumentdefaults') || '[]');
      const types = signature.match(/%[snb]/g) || [];
      return { signature, args: names.map((name,index) => ({name, type:types[index] === '%b' ? 'boolean' : types[index] === '%n' ? 'number' : 'text', value:defaults[index] ?? ''})) };
    }).filter(Boolean);
  }
  function compileFunction(signature, values = []) {
    const ws = workspace();
    if (!ws) throw new Error('The editor is still loading.');
    const selected = ws.getAllBlocks(false).find(block => block.type === 'procedures_definition' && block.getInputTargetBlock('custom_block')?.mutationToDom().getAttribute('proccode') === signature);
    if (!selected) throw new Error('This My Block no longer exists. Choose another function.');
    const mutation = selected.getInputTargetBlock('custom_block').mutationToDom();
    const names = JSON.parse(mutation.getAttribute('argumentnames') || '[]');
    const ids = JSON.parse(mutation.getAttribute('argumentids') || '[]');
    const types = signature.match(/%[snb]/g) || [];
    const original = B.Xml.workspaceToDom(ws);
    const xml = original.cloneNode(true);
    // Only definitions and variables are copied. Existing when-started stacks
    // and disconnected blocks are never executed or changed by a control.
    [...xml.children].forEach(node => { if(node.tagName.toLowerCase() !== 'variables' && node.getAttribute('type') !== 'procedures_definition') node.remove(); });
    const element = name => xml.ownerDocument.createElement(name);
    const start = element('block');start.setAttribute('type','go_events_when_started');
    const next = element('next'), call = element('block');call.setAttribute('type','procedures_call');
    call.appendChild(mutation.cloneNode(true));
    names.forEach((name,index) => {
      const input = element('value');input.setAttribute('name',ids[index]);
      const shadow = element('shadow'), field = element('field');
      const value = values[index] ?? functions().find(f=>f.signature===signature)?.args[index]?.value ?? '';
      if(types[index] === '%b') {
        shadow.setAttribute('type','logic_boolean');field.setAttribute('name','BOOL');field.textContent = value === true || value === 'true' ? 'TRUE' : 'FALSE';
      } else if(types[index] === '%n') {
        if(!Number.isFinite(Number(value)))throw new Error('Enter a valid number for '+name+'.');
        shadow.setAttribute('type','math_number');field.setAttribute('name','NUM');field.textContent = String(Number(value));
      } else { shadow.setAttribute('type','text');field.setAttribute('name','TEXT');field.textContent = String(value); }
      shadow.appendChild(field);input.appendChild(shadow);call.appendChild(input);
    });
    next.appendChild(call);start.appendChild(next);xml.appendChild(start);
    const clone = new B.Workspace();
    const prefix = B.JavaScript.STATEMENT_PREFIX;
    const textGenerator = B.JavaScript.text;
    B.Events.disable();
    try {
      B.Xml.domToWorkspace(xml,clone);
      B.JavaScript.STATEMENT_PREFIX = null;
      // The APK generator changes quote delimiters without escaping double
      // quotes. Serialize text safely, including control arguments and bodies.
      B.JavaScript.text = block => [JSON.stringify(block.getFieldValue('TEXT')), B.JavaScript.ORDER_ATOMIC];
      // Headless blocks lack the rendered hat shape. The vendor's scrub_
      // otherwise appends the next stack AGAIN after the function definition.
      clone.getTopBlocks(false).filter(block=>block.type==='procedures_definition'||block.type==='go_events_when_started').forEach(block=>{block.isHatBlock=()=>true;});
      // Headless blocks have no rendered hat shape, so the vendor's
      // workspaceToCode would skip their entry point. Generate it explicitly.
      B.JavaScript.init(clone);
      clone.getTopBlocks(true).filter(block=>block.type==='procedures_definition').forEach(block=>B.JavaScript.blockToCode(block));
      const entry=clone.getTopBlocks(false).find(block=>block.type==='go_events_when_started');
      B.JavaScript.blockToCode(entry);
      const generated = B.JavaScript.finish('');
      return codeGen.genGOClasses() + '\nvar console_precision = 0;\n' + codeGen.genGOConstructors() + config.getDeviceDefaults() + generated;
    } finally { clone.dispose(); B.JavaScript.STATEMENT_PREFIX = prefix; B.JavaScript.text = textGenerator; B.Events.enable(); }
  }
  async function runFunction(signature,args) {
    if(!enabled)throw new Error('Enable controls first.');
    if(!connected())throw new Error('Connect a VEX GO Brain before running a function.');
    if(pending || interpreter.isRunning || Date.now() < stopUntil)throw new Error('A function is running or stopping. Wait, or press Stop.');
    pending = true;
    try {
      const code = compileFunction(signature,args);
      interpreter.setProgram(code);
      interpreter.setVarNames(controllers.javascriptVariableNames());
      highlightFunction(signature);
      controllerRun=true;
      interpreter.run();
      return {signature};
    } catch(error) { controllerRun=false;clearFunctionHighlight(); throw error; }
    finally { pending = false; }
  }
  function stop() {
    stopUntil = Date.now()+500;
    if(interpreter.isRunning) interpreter.stop();
    clearFunctionHighlight();
    return {stopped:true};
  }
  interpreter.on('onStop',()=>{
    controllerRun=false;
    stopUntil=Date.now()+500;
    // Keep very short calls visible, while long calls stay outlined until done.
    clearTimeout(highlightTimer);
    highlightTimer=setTimeout(clearFunctionHighlight,Math.max(0,600-(Date.now()-highlightStarted)));
  });
  window.VexStudio = Object.freeze({functions,compileFunction,runFunction,stop,snapshot:()=>({functions:functions(),connected:connected(),running:interpreter.isRunning})});
  window.addEventListener('message',async event => {
    if(event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'vex-controller')return;
    const {id,action,signature,args} = event.data;
    try {
      let result;
      if(action === 'enable') { enabled = event.data.enabled === true; if(!enabled)stop(); result={enabled}; }
      else if(action === 'keys') { assignedKeys = new Set(Array.isArray(event.data.keys)?event.data.keys.filter(k=>typeof k==='string'):[]); result={}; }
      else if(action === 'run')result=await runFunction(signature,args);
      else if(action === 'stop')result=stop();
      else if(action === 'snapshot')result=window.VexStudio.snapshot();
      else throw new Error('Unknown controller action.');
      post({type:'vex-controller-result',id,ok:true,result});
    }catch(error){post({type:'vex-controller-result',id,ok:false,error:error.message});}
  });
  document.addEventListener('keydown',event=>{
    if(event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
    if(event.code !== 'Escape' && !assignedKeys.has(event.code))return;
    event.preventDefault();
    if(event.code === 'Escape' && enabled)stop();
    post({type:'vex-controller-key',code:event.code,down:true});
  });
  document.addEventListener('keyup',event=>post({type:'vex-controller-key',code:event.code,down:false}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden && enabled)stop();});
  window.addEventListener('pagehide',()=>{if(enabled)stop();});
  window.addEventListener('blur',()=>{post({type:'vex-controller-release'});setTimeout(()=>{if(enabled && !document.hasFocus())stop();},0);});
  let last = '', mobileInitialized = false;
  setInterval(()=>{
    if(!workspace())return;
    if(!connected()&&highlighted.length)clearFunctionHighlight();
    const mobile = innerWidth <= 700;
    if(mobile !== mobileInitialized){controllers.getCurrentMainController().setAutoCollapse(mobile);mobileInitialized=mobile;}
    const state={type:'vex-controller-state',functions:functions(),connected:connected(),running:interpreter.isRunning};
    const serialized=JSON.stringify(state);if(serialized!==last){post(state);last=serialized;}
  },500);
})();
