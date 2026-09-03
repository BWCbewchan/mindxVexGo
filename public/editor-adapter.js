(function () {
  let toolbarState = {controls:false,help:false,dock:true};
  const post = data => window.parent.postMessage(data, location.origin);
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
    if (document.querySelector('.blocklySvg')) {
      window.parent.postMessage({ type: 'vex-editor-ready' }, window.location.origin);
    }
  }, 1000);
})();
