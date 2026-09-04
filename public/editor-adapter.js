(function () {
  let toolbarState = {controls:false,help:false,dock:true};
  const post = data => window.parent.postMessage(data, location.origin);
  let autosave={enabled:window.__vexAutoSaveEnabled!==false,status:'Loading…',savedAt:null};
  function syncAutosave(){
    const menu=document.getElementById('file_menu');
    if(!menu)return;
    let option=menu.querySelector('.studio-autosave');
    if(!option){
      option=document.createElement('div');option.className='studio-autosave';
      const label=document.createElement('label');
      const checkbox=document.createElement('input');checkbox.type='checkbox';
      label.append(checkbox,document.createTextNode('Auto save'));
      const status=document.createElement('small');status.setAttribute('role','status');
      const description=document.createElement('small');description.textContent='Save in this browser on this device.';
      option.append(label,status,description);
      option.addEventListener('click',event=>event.stopPropagation());
      checkbox.addEventListener('change',()=>window.postMessage({type:'vex-autosave-toggle',enabled:checkbox.checked},location.origin));
      menu.append(option);
    }
    const checkbox=option.querySelector('input');
    checkbox.checked=autosave.enabled;checkbox.disabled=autosave.status==='Loading…';
    option.querySelector('[role=status]').textContent=autosave.status;
    option.title=autosave.savedAt?'Saved at '+new Date(autosave.savedAt).toLocaleTimeString():'';
  }
  document.addEventListener('vex-autosave-state',event=>{autosave=event.detail;syncAutosave();});
  document.addEventListener('click',event=>{if(event.target.closest?.('#top_menu_file_button'))setTimeout(syncAutosave,0);});
  document.addEventListener('click',event=>{
    if(!event.target.closest?.('.brain_button'))return;
    if(!window.isSecureContext || typeof navigator.bluetooth?.requestDevice !== 'function'){
      event.preventDefault();event.stopImmediatePropagation();
      post({type:'vex-toolbar-action',action:'permissions'});
    }
  },true);
  function syncToolbar() {
    const toolbar = document.querySelector('.topmenu');
    if (!toolbar) return;
    const firstGroup = toolbar.querySelector('.group');
    const rightGroup = toolbar.querySelector('#topmenu_right_group');
    if (!firstGroup || !rightGroup) return;
    if (!toolbar.querySelector('.studio-home')) {
      const home = document.createElement('a');
      home.className = 'studio-home';
      home.href = '/';
      home.target = '_parent';
      home.textContent = 'mindX / GO';
      home.setAttribute('aria-label','mindX GO Studio home');
      firstGroup.prepend(home);
    }
    if (!toolbar.querySelector('.studio-toolbar-actions')) {
      const actions = document.createElement('span');
      actions.className = 'studio-toolbar-actions';
      for (const [action,label] of [['controls','⌨ Controls'],['dock','▤ Dock'],['help','? Help']]) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'studio-toolbar-button';
        button.dataset.action = action;
        button.textContent = label;
        button.addEventListener('click',()=>post({type:'vex-toolbar-action',action}));
        actions.append(button);
      }
      rightGroup.append(actions);
    }
    toolbar.querySelectorAll('.studio-toolbar-button').forEach(button=>{
      button.setAttribute('aria-expanded',String(toolbarState[button.dataset.action]));
    });
  }
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin || event.source!==window.parent || event.data?.type!=='vex-toolbar-state')return;
    toolbarState={controls:event.data.controls===true,help:event.data.help===true,dock:event.data.dock===true};
    syncToolbar();
  });
  setInterval(function () {
    syncToolbar();
    syncAutosave();
    if (document.querySelector('.blocklySvg')) {
      window.parent.postMessage({ type: 'vex-editor-ready' }, window.location.origin);
    }
  }, 1000);
})();
