// Builds the small WebP images the landing page shows (public/landing). Rerun after changing a source image.
import sharp from 'sharp';
import {mkdirSync,statSync} from 'node:fs';
const out='public/landing';mkdirSync(out,{recursive:true});
const jobs=[
 ['public/robotics-vr-preview.png','vr-lab.webp',1280],
 ['public/robolab/gears/textures/maps/WRO/WRO-2026-Junior.png','wro-junior.webp',800],
 ['public/classroom/characters/team-concept-v2.png','classroom-team.webp',520],
 ['public/training-robot.png','training-robot.webp',96],
 ['public/assembly/parts/228-2500-001/preview.png','part-iq-beam.webp',320],
 ['public/assembly/parts/269-6690-000/preview.png','part-go-brain.webp',320],
 ['public/assembly/iq/parts/228-2560/preview.png','part-iq-brain.webp',300],
];
for(const [src,name,width] of jobs){
 const info=await sharp(src).resize({width,withoutEnlargement:true}).webp({quality:78,alphaQuality:90,effort:6}).toFile(`${out}/${name}`);
 console.log(name,`${info.width}x${info.height}`,(statSync(`${out}/${name}`).size/1024).toFixed(0)+' KB','from',(statSync(src).size/1024).toFixed(0)+' KB');
}
