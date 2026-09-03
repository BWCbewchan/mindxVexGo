const fs=require('fs');
const s=fs.readFileSync(process.argv[3] || 'apk-extracted/assets/webapp/dist/main.bundle.js','utf8');
const key=process.argv[2] || './src/platformInfo.ts';
const p=s.indexOf('/***/ "'+key+'":');
const end=s.indexOf('\n/***/ }),',p);
const result=s.slice(p,end).split('\n').filter(l=>l.length<800).join('\n');
console.log(result);
