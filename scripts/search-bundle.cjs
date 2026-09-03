const fs=require('fs');
const s=fs.readFileSync('apk-extracted/assets/webapp/dist/main.bundle.js','utf8');
if(process.argv[2]==='modules')console.log([...s.matchAll(/\/\*\*\*\/ "([^"]+)":/g)].map(m=>m[1]).filter(x=>/file|ble|web/i.test(x)).join('\n'));
else { let p=-1; const term=process.argv[2]; for(let i=0;i<Number(process.argv[3]||8);i++){p=s.indexOf(term,p+1);if(p<0)break;console.log('\nOFFSET',p,'\n',s.slice(Math.max(0,p-Number(process.argv[4]||250)),p+Number(process.argv[5]||900)).split('\n').filter(l=>l.length<900).join('\n'))} }
