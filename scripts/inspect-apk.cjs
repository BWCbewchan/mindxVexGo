const fs = require('fs');
const s = fs.readFileSync('apk-extracted/assets/webapp/dist/main.bundle.js','utf8');
for (const key of ['"./src/targetPlatform.ts":','"./src/targetApp.ts":','"./src/Platform/']) {
  const p=s.indexOf(key); console.log(key,p);
  if(p>=0) console.log(s.slice(p,p+16000).split('\n').filter(l=>l.length<500).slice(0,160).join('\n'));
}
console.log(s.split('\n').filter(l=>l.length<350 && /platform.*=.*Android|targetPlatform.*=|BUILD_TARGET|appType.*=|WebBluetooth|ChromeBLE/.test(l)).slice(-70).join('\n'));
