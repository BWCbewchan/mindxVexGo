"""Build reproducible source illustrations and the official VEX reference shelf."""
import json,re,urllib.request
from pathlib import Path
import xml.etree.ElementTree as ET
base='https://content.vexrobotics.com/vexgo/parts-page/go-parts/svg/'
parts=[('motor','Motor','motor_small_size.svg'),('electromagnet','Electromagnet','electronics-electromagnet.svg'),('bumper','LED Bumper','electronics-led_bumper.svg'),('brain','Brain','electronics-brain.svg'),('battery','Battery','electronics-battery.svg'),('switch','Switch','electronics-switch.svg'),('eye','Eye Sensor','electronics-eye_sensor.svg')]
out=Path('public/quiz/devices');out.mkdir(exist_ok=True)
devices=[]
for id,name,filename in parts:
 dest=out/(id+'.svg');url=base+filename
 if not dest.exists():
  request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  content=urllib.request.urlopen(request,timeout=30).read()
  root=ET.fromstring(content)
  assert root.tag.endswith('svg')
  assert not any(e.tag.split('}')[-1] in ['script','foreignObject'] for e in root.iter())
  dest.write_bytes(content)
 devices.append({'id':id,'name':name,'src':'/quiz/devices/'+id+'.svg','source':url})
Path('public/quiz/devices.json').write_text(json.dumps(devices,indent=2),encoding='utf-8')
catalog=json.loads(Path('public/quiz/catalog.json').read_text(encoding='utf-8'))
norm=lambda x:re.sub(r'\s+',' ',x).strip().casefold()
def flatten(blocks):
 return [child for b in blocks for child in (flatten([c for row in b.get('rows',[]) for cell in row for c in cell['blocks']]) if b['type']=='table' else [b])]
report=[]
for lesson in catalog:
 blocks=flatten(json.loads(Path('public'+lesson['content']).read_text(encoding='utf-8'))['blocks'])
 for q in lesson['questions']:
  refs=[];needle=norm(q.get('sourceNeedle',q['evidence']))
  if q.get('image'):refs.append({'src':q['image'],'caption':'Hình gốc của câu hỏi','kind':'question'})
  if lesson['format']=='PDF':
   pages=[b for b in blocks if b['type']=='page']
   matched=next((b for b in pages if needle in norm(b['text'])),None)
   if not matched:
    # A source fragment may span pages. Find the longest shared contiguous excerpt.
    candidates=[(sum(needle[i:i+30] in norm(b['text']) for i in range(0,max(1,len(needle)-29),15)),b) for b in pages]
    score,matched=max(candidates,key=lambda p:p[0]) if candidates else (0,None)
    if not score:matched=None
   if matched and not any(r['src']==matched['src'] for r in refs):refs.append({'src':matched['src'],'caption':'Trang '+str(matched['page'])+' · tài liệu gốc','kind':'source'})
  else:
   # Word images retain paragraph order. Show contextual images with an explicit label.
   hits=[i for i,b in enumerate(blocks) if b['type']=='text' and (needle in norm(b['text']) or (len(needle)>40 and needle[:40] in norm(b['text'])))]
   if hits:
    indices=[i for i,b in enumerate(blocks) if b['type']=='image' and min(abs(i-h) for h in hits)<=5]
    for i in sorted(indices,key=lambda i:min(abs(i-h) for h in hits))[:2]:refs.append({'src':blocks[i]['src'],'caption':'Hình trong phần bài học liên quan','kind':'source'})
  patterns={'motor':r'động cơ|\bmotor\b','electromagnet':r'nam châm','bumper':r'bumper','brain':r'\bnão\b','battery':r'\bpin\b','switch':r'công tắc','eye':r'\bmắt\b'}
  contextual=[d for d in devices if re.search(patterns[d['id']],q['prompt'],re.I)]
  refs=[{'src':d['src'],'caption':d['name']+' · VEX GO','kind':'device'} for d in contextual[:3]]+refs
  q['references']=refs
  report.append({'lesson':lesson['id'],'question':q['id'],'illustrated':bool(refs),'format':lesson['format'],'prompt':q['prompt']})
Path('public/quiz/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
Path('artifacts/quiz/visual-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print('Questions:',len(report),'with source visuals:',sum(q['illustrated'] for q in report),'text-only:',sum(not q['illustrated'] for q in report))
taskfile=Path('public/quiz/tasks.json')
if taskfile.exists():
 tasks=json.loads(taskfile.read_text(encoding='utf-8'));byid={d['id']:d for d in catalog}
 for id,items in tasks.items():
  for task in items:
   source=byid[task.get('sourceLesson',id)]
   blocks=flatten(json.loads(Path('public'+source['content']).read_text(encoding='utf-8'))['blocks'])
   needle=norm(task['requirements'])[:55]
   hits=[i for i,b in enumerate(blocks) if needle in norm(b.get('text',''))]
   task['references']=[]
   for i in hits[:1]:
    if blocks[i]['type']=='page':task['references'].append({'src':blocks[i]['src'],'caption':'Nhiệm vụ trong tài liệu · trang '+str(blocks[i]['page']),'kind':'source'})
    else:
     imgs=[(abs(j-i),b) for j,b in enumerate(blocks) if b['type']=='image' and abs(j-i)<=5]
     for _,b in sorted(imgs,key=lambda x:x[0])[:2]:task['references'].append({'src':b['src'],'caption':'Hình mô hình / nhiệm vụ trong bài học','kind':'source'})
 taskfile.write_text(json.dumps(tasks,ensure_ascii=False,indent=2),encoding='utf-8')
