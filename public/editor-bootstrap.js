(function () {
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
