// Rebuilds the vendored RoboCode app (github.com/thuongtran1210/robot-blocky) into public/blocky.
// Usage: node scripts/import-robot-blocky.mjs <work-dir> [commit]
// Used with the author's permission; the upstream repo has no license file.
import {execSync} from 'node:child_process';
import {cpSync,rmSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import path from 'node:path';
const work=path.resolve(process.argv[2]||'.robot-blocky-build'),commit=process.argv[3]||'cf2d76170acb06cda70fa6a298ebfe3047f86d44';
const repo=path.join(work,'robot-blocky'),run=(cmd,cwd=repo)=>execSync(cmd,{cwd,stdio:'inherit'});
if(!existsSync(repo))run(`git clone https://github.com/thuongtran1210/robot-blocky.git "${repo}"`,process.cwd());
run(`git fetch -q origin ${commit}`);run(`git checkout -q -f ${commit}`);run('git clean -fdq src tests');
// mindX patches (scripts/robot-blocky-patches): VEXcode GO / IQ command set with a GO/IQ switch.
for(const patch of readdirSync(path.resolve('scripts/robot-blocky-patches')).filter(f=>f.endsWith('.patch')).sort())run(`git apply --whitespace=nowarn "${path.resolve('scripts/robot-blocky-patches',patch)}"`);
run('npm ci --no-audit --no-fund');
if(process.platform==='win32'){const v=JSON.parse(execSync('node -p "JSON.stringify(require(\'./node_modules/rolldown/package.json\').version)"',{cwd:repo}).toString());run(`npm i --no-save --no-audit --no-fund @rolldown/binding-win32-x64-msvc@${v}`);}
run('npx vite build --base /blocky/');run('node scripts/build-sw.mjs');
const dest=path.resolve('public/blocky');rmSync(dest,{recursive:true,force:true});cpSync(path.join(repo,'dist'),dest,{recursive:true});
// Replace the upstream precaching worker (about 9 MB on first visit) with one that caches nothing.
writeFileSync(path.join(dest,'sw.js'),"// mindX: RoboCode's upstream worker precached ~9 MB on the first visit. This one caches\n// nothing and removes caches an earlier version left; the browser HTTP cache serves repeat visits.\nself.addEventListener('install', () => self.skipWaiting());\nself.addEventListener('activate', event => event.waitUntil(caches.keys()\n  .then(keys => Promise.all(keys.filter(key => key.startsWith('robocode-')).map(key => caches.delete(key))))\n  .then(() => self.clients.claim())));\n",'utf8');
writeFileSync(path.join(dest,'SOURCE.md'),`# RoboCode (robot-blocky)\n\nBuilt from https://github.com/thuongtran1210/robot-blocky at ${commit} with \`vite build --base /blocky/\`.\nAuthor: Quang Thường (thuongtran1210). Used in mindX Robotics Lab with the author's permission; the upstream repository has no license file.\nBlockly editor UI uses scratch-blocks; see scratch-media/LICENSE and scratch-media/TRADEMARK.\nmindX patches from scripts/robot-blocky-patches are applied before the build: VEXcode GO / VEX IQ command set (same wording as VR Lab) with a GO/IQ switch in the code bar, and the 2D /training fields as 3D maps in a Training mindX group (02-training-maps.patch carries a snapshot of app/training/missions.json), and the two-motor robot drawn as a VEX GO Super Code Base from /robot-models/vex-go-super-code-base.glb (baked by scripts/bake-go-robot.mjs).\n\nRebuild: \`node scripts/import-robot-blocky.mjs <work-dir> [commit]\`.\n`,'utf8');
console.log('RoboCode copied to public/blocky');
