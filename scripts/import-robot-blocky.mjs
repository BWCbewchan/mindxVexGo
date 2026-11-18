// Rebuilds the vendored RoboCode app (github.com/thuongtran1210/robot-blocky) into public/blocky.
// Usage: node scripts/import-robot-blocky.mjs <work-dir> [commit]
// Used with the author's permission; the upstream repo has no license file.
import {execSync} from 'node:child_process';
import {cpSync,rmSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const work=path.resolve(process.argv[2]||'.robot-blocky-build'),commit=process.argv[3]||'cf2d76170acb06cda70fa6a298ebfe3047f86d44';
const repo=path.join(work,'robot-blocky'),run=(cmd,cwd=repo)=>execSync(cmd,{cwd,stdio:'inherit'});
if(!existsSync(repo))run(`git clone https://github.com/thuongtran1210/robot-blocky.git "${repo}"`,process.cwd());
run(`git fetch -q origin ${commit}`);run(`git checkout -q ${commit}`);
run('npm ci --no-audit --no-fund');
if(process.platform==='win32'){const v=JSON.parse(execSync('node -p "JSON.stringify(require(\'./node_modules/rolldown/package.json\').version)"',{cwd:repo}).toString());run(`npm i --no-save --no-audit --no-fund @rolldown/binding-win32-x64-msvc@${v}`);}
run('npx vite build --base /blocky/');run('node scripts/build-sw.mjs');
const dest=path.resolve('public/blocky');rmSync(dest,{recursive:true,force:true});cpSync(path.join(repo,'dist'),dest,{recursive:true});
writeFileSync(path.join(dest,'SOURCE.md'),`# RoboCode (robot-blocky)\n\nBuilt from https://github.com/thuongtran1210/robot-blocky at ${commit} with \`vite build --base /blocky/\`.\nAuthor: Quang Thường (thuongtran1210). Used in mindX Robotics Lab with the author's permission; the upstream repository has no license file.\nBlockly editor UI uses scratch-blocks; see scratch-media/LICENSE and scratch-media/TRADEMARK.\n\nRebuild: \`node scripts/import-robot-blocky.mjs <work-dir> [commit]\`.\n`,'utf8');
console.log('RoboCode copied to public/blocky');
