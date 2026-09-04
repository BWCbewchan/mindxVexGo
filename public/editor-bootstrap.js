(function () {
  if(new URLSearchParams(location.search).get('mode')==='training'){
    window.__vexTrainingMode=true;
    const lesson=new URLSearchParams(location.search).get('lesson');
    const prefix='training:'+(lesson&&/^[a-z0-9-]{1,80}$/.test(lesson)?lesson+':':'');
    if(lesson==='custom'){
      // Keep the original single-workspace training project in Your practice field.
      try{
        const keys=Array.from({length:localStorage.length},(_,i)=>localStorage.key(i));
        for(const key of keys){
          if(!key?.startsWith('training:'))continue;
          const tail=key.slice('training:'.length);
          if(!tail.includes(':')&&localStorage.getItem(prefix+tail)===null)localStorage.setItem(prefix+tail,localStorage.getItem(key));
        }
      }catch{}
    }
    for(const name of ['getItem','setItem','removeItem']){
      const original=Storage.prototype[name];
      Storage.prototype[name]=function(key,...args){return original.call(this,prefix+key,...args);};
    }
  }
  try { window.__vexAutoSaveEnabled=localStorage.getItem('mindx-go-autosave')!=='off'; }
  catch { window.__vexAutoSaveEnabled=true; }
  var startupError = '', finished = false;
  window.addEventListener('error', function (event) {
    if (finished) return;
    var element = event.target;
    if (element && element.tagName === 'SCRIPT') {
      startupError = 'Could not load ' + (element.src || '').split('/').pop() + '. Check your connection and retry.';
    } else if (event.message) {
      startupError = 'The editor could not start: ' + event.message;
    }
  }, true);
  var timer = setInterval(function () {
    if (document.querySelector('.blocklySvg')) {
      finished = true;
      clearInterval(timer);
    } else if (startupError) {
      window.parent.postMessage({type:'vex-editor-error',message:startupError},location.origin);
    }
  }, 1000);
})();
