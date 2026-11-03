export function installGuidePreviews({enabled,prepare,render}){
 let epoch=0,queue=[],working=false,observer=null;const cache=new Map(),lastImages=new Map(),identity=step=>step.added.map(p=>p.id).sort().join('|');
 async function pump(){if(working)return;working=true;try{while(queue.length){const job=queue.shift();if(job.epoch!==epoch||!job.img.isConnected)continue;try{let src=cache.get(job.key);if(!src){const objects=await prepare(job.step);if(job.epoch!==epoch)continue;src=render(objects,job.step);cache.set(job.key,src);if(cache.size>48)cache.delete(cache.keys().next().value);}if(job.epoch!==epoch||!job.img.isConnected)continue;lastImages.set(identity(job.step),src);if(lastImages.size>48)lastImages.delete(lastImages.keys().next().value);job.img.src=src;job.img.dataset.ready='true';job.img.alt=job.step.title;}catch(error){if(job.epoch===epoch){job.img.alt='Không dựng được ảnh: '+error.message;job.img.dataset.error='true';}}}}finally{working=false;}}
 function begin(){epoch++;queue=[];observer?.disconnect();observer=null;}
 function add(article,step,key,{paused=false}={}){
  const figure=document.createElement('figure');figure.className='guide-card-preview';
  if(!enabled){const text=document.createElement('p');text.textContent='Chế độ dữ liệu · không dựng ảnh 3D';figure.append(text);article.prepend(figure);return;}
  const img=document.createElement('img');img.width=320;img.height=240;img.alt='Đang dựng hình bước lắp…';figure.append(img);article.prepend(figure);
  const job={img,step,key,epoch};if(cache.has(key)){img.src=cache.get(key);img.dataset.ready='true';img.alt=step.title;return;}
  if(paused){const last=lastImages.get(identity(step));if(last)img.src=last;img.alt='Tạm dừng cập nhật ảnh · '+step.title;figure.append(document.createTextNode('Ảnh đang tạm dừng cập nhật'));return;}
  if(!observer)observer=new IntersectionObserver(rows=>{for(const row of rows)if(row.isIntersecting){observer.unobserve(row.target);queue.push(row.target._guideJob);pump();}},{rootMargin:'80px'});
  figure._guideJob=job;observer.observe(figure);
 }
 return {begin,add,dispose(){begin();cache.clear();lastImages.clear();}};
}
