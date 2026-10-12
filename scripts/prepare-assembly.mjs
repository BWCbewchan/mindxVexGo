import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),source=path.join(root,'artifacts/vexgo-cad-reference'),target=path.join(root,'public/assembly');
await fs.mkdir(target,{recursive:true});
const manifest=JSON.parse(await fs.readFile(path.join(source,'manifest.json'),'utf8'));
const parts=[];
for(const part of manifest.filter(p=>p.status==='ok')){
 const dir=part.relative_directory;
 await fs.mkdir(path.join(target,'parts',part.id),{recursive:true});
 await fs.copyFile(path.join(source,dir,'model.glb'),path.join(target,'parts',part.id,'model.glb'));
 await fs.copyFile(path.join(source,dir,part.category==='electronics'?'detail-opposite.png':'iso.png'),path.join(target,'parts',part.id,'preview.png'));
 parts.push({id:part.id,name:part.name,category:part.category,sourceHash:part.sha256});
}
await fs.writeFile(path.join(target,'parts.json'),JSON.stringify(parts));
await fs.mkdir(path.join(target,'vendor'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/three/build/three.module.js'),path.join(target,'vendor/three.module.js'));
await fs.copyFile(path.join(root,'node_modules/three/build/three.core.js'),path.join(target,'vendor/three.core.js'));
for(const file of ['controls/OrbitControls.js','controls/TransformControls.js','loaders/GLTFLoader.js','utils/BufferGeometryUtils.js','utils/SkeletonUtils.js']){
 await fs.mkdir(path.dirname(path.join(target,'vendor/addons',file)),{recursive:true});
 await fs.copyFile(path.join(root,'node_modules/three/examples/jsm',file),path.join(target,'vendor/addons',file));
}
await fs.copyFile(path.join(root,'node_modules/three/LICENSE'),path.join(target,'vendor/THREE-LICENSE.txt'));
await fs.writeFile(path.join(target,'vendor/mesh-bvh.js'),(await fs.readFile(path.join(root,'node_modules/three-mesh-bvh/build/index.module.js'),'utf8')).replace("from 'three'","from './three.module.js'"));
await fs.copyFile(path.join(root,'node_modules/three-mesh-bvh/LICENSE'),path.join(target,'vendor/MESH-BVH-LICENSE.txt'));
console.log(`Prepared ${parts.length} original CAD parts and local 3D runtime.`);
