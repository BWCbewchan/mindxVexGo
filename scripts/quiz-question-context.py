"""Render relevant source PDF regions, without redrawing or inventing lesson content."""
import json,re,hashlib
from pathlib import Path
import fitz
catalog=json.loads(Path('public/quiz/catalog.json').read_text(encoding='utf-8'))
norm=lambda s:re.sub(r'\s+',' ',s).strip().casefold()
audit=[]
def flatten(blocks):
 return [child for b in blocks for child in (flatten([c for row in b.get('rows',[]) for cell in row for c in cell['blocks']]) if b['type']=='table' else [b])]
for lesson in catalog:
 if lesson['format']=='DOCX':
  blocks=flatten(json.loads(Path('public'+lesson['content']).read_text(encoding='utf-8'))['blocks'])
  texts=[b['text'] for b in blocks if b['type']=='text']
  for q in lesson['questions']:
   if not re.search(r'nhiệm vụ|\bđề\s+(?:số\s*)?\d',q['prompt'],re.I):continue
   needle=norm(q.get('sourceNeedle',''))
   hit=next((i for i,t in enumerate(texts) if needle and needle in norm(t)),None)
   if hit is None:audit.append({'question':q['id'],'status':'no-exact-context'});continue
   starts=[i for i in range(hit+1) if re.search(r'Nhiệm vụ\s*\d*\s*:',texts[i],re.I)]
   start=starts[-1] if starts else hit
   end=next((i for i in range(hit+1,len(texts)) if re.search(r'Nhiệm vụ|^\d+\.\s|^Câu\s+\d|Bản quyền',texts[i],re.I)),hit+1)
   q['context']={'text':'\n'.join(texts[start:end]),'label':'Ngữ cảnh nhiệm vụ trong tài liệu gốc'}
   audit.append({'question':q['id'],'status':'exact-source-text'})
  continue
 with fitz.open('public'+lesson['original']) as pdf:
  for q in lesson['questions']:
   if not re.search(r'nhiệm vụ|\bđề\s+(?:số\s*)?\d',q['prompt'],re.I):continue
   needle=norm(q.get('sourceNeedle',''))
   if not needle or needle.startswith('đọc từ hình'):continue
   desired=re.search(r'nhiệm vụ\s*(\d+)|đề\s+(?:số\s*)?(\d+)',q['prompt'],re.I)
   expected=(desired.group(1) or desired.group(2)) if desired else None
   candidates=[]
   for page in pdf:
    lines=[{'text':''.join(s['text'] for s in line['spans']),'box':line['bbox']} for b in page.get_text('dict')['blocks'] if b['type']==0 for line in b['lines']]
    joined=norm(' '.join(l['text'] for l in lines))
    if needle not in joined:continue
    offset=0;hit=0;at=joined.index(needle)
    for i,l in enumerate(lines):
     offset+=len(norm(l['text']))+1
     if offset>at:hit=i;break
    starts=[i for i in range(hit+1) if re.search(r'(?:Nhiệm vụ|Đề\s*(?:số)?)\s*\d*\s*[:.]',lines[i]['text'],re.I)]
    start=starts[-1] if starts else hit
    number=re.search(r'(?:Nhiệm vụ|Đề\s*(?:số)?)\s*(\d+)',lines[start]['text'],re.I)
    if expected and number and expected!=number.group(1):continue
    end=len(lines)
    for i in range(hit+1,len(lines)):
     if re.search(r'Nhiệm vụ|Bản quyền|ĐÁP ÁN|\d+\.\s*BÀI TẬP',lines[i]['text'],re.I):end=i;break
    chosen=lines[start:end]
    if not chosen:continue
    candidates.append((page.number,chosen))
   if not candidates:
    audit.append({'question':q['id'],'status':'no-exact-context'});continue
   pageNum,lines=candidates[0];page=pdf[pageNum]
   y0=min(l['box'][1] for l in lines);y1=max(l['box'][3] for l in lines)
   rect=fitz.Rect(20,max(0,y0),page.rect.width-20,min(page.rect.height,y1))
   file=Path('public/quiz/images')/(q['id']+'-context.webp')
   page.get_pixmap(matrix=fitz.Matrix(2,2),clip=rect,alpha=False).pil_save(str(file),format='WEBP',quality=90)
   q['context']={'text':'\n'.join(l['text'].strip() for l in lines),'src':'/quiz/images/'+file.name,'page':pageNum+1,'label':'Ngữ cảnh nhiệm vụ trong tài liệu gốc'}
   audit.append({'question':q['id'],'status':'exact-source-region','page':pageNum+1,'candidates':len(candidates),'clip':list(rect)})
Path('public/quiz/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
Path('artifacts/quiz/context-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print('PDF crops:',sum(x['status']=='exact-source-region' for x in audit),'Word excerpts:',sum(x['status']=='exact-source-text' for x in audit),'unresolved:',[x['question'] for x in audit if x['status']=='no-exact-context'])
