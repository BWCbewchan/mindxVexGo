"""Curated source regions, reviewed against the supplied lesson pages.

Run after prepare-quiz-visuals.py and quiz-question-context.py.
Coordinates below use the 1.5x reader preview pixel space, then render directly
from the original PDF at 2x. No diagrams or source instructions are invented.
"""
import json,re
from pathlib import Path
import fitz

path=Path('public/quiz/catalog.json')
catalog=json.loads(path.read_text(encoding='utf-8'))
byid={l['id']:l for l in catalog}
regions=[
 ('maze','6325b82877b5',1,(80,427,715,738),'Sa bàn Giải thoát mê cung: điểm xuất phát và lối ra',r'Giải thoát mê cung'),
 ('positions','165f92ddbc7d',1,(185,214,707,506),'Đề bài và sa bàn có vị trí 1, 2, 3, GO',r'Nếu vị trí số 1'),
 ('cross-route','23f1d04b0774',1,(82,872,810,1150),'Nhiệm vụ 2 và đường di chuyển trong hình',r'Nhiệm vụ 2 lặp di chuyển theo hình'),
 ('polygon-routes','23f1d04b0774',1,(83,547,810,864),'Nhiệm vụ 1: các hình di chuyển trong tài liệu',r'Hình nào thuộc các hình'),
 ('square-program','ad8a441fd98c',2,(83,609,765,1138),'Nhiệm vụ 4 và chương trình đi hình vuông',r'Nhiệm vụ 4 yêu cầu mô hình đi theo hình'),
 ('numbered-route','028ca18bbb49',2,(211,120,681,380),'Đề số 4: sa bàn và yêu cầu tại từng vị trí',r'Đề số 4:'),
]
for name,source,page_number,box,caption,pattern in regions:
 lesson=byid[source]
 with fitz.open('public'+lesson['original']) as pdf:
  page=pdf[page_number-1];rect=fitz.Rect(*(v/1.5 for v in box))
  dest=Path(f'public/quiz/images/question-{name}.webp')
  page.get_pixmap(matrix=fitz.Matrix(2,2),clip=rect,alpha=False).pil_save(str(dest),format='WEBP',quality=92)
 for lesson in catalog:
  for q in lesson['questions']:
   if re.search(pattern,q['prompt'],re.I):
    q['references']=[r for r in q.get('references',[]) if r['kind']!='question']+[{'src':'/quiz/images/'+dest.name,'caption':caption,'kind':'question'}]
    q['diagramSource']={'lesson':source,'page':page_number,'clip':list(rect)}
    # The curated region includes the required instructions: avoid a duplicate
    # text-only crop above it. Keep source evidence in the assessment metadata.
    q.pop('context',None)

# The triangle lesson has multiple adjacent examples. Only this image belongs
# to its right-triangle task; nearest-image heuristics also picked an equilateral
# triangle, which is not relevant to the question.
for lesson in catalog:
 for q in lesson['questions']:
  if q['prompt']=='Nhiệm vụ 2 yêu cầu xe chạy theo hình nào?':
   q['references']=[{'src':'/quiz/images/7e9365a3565b-read-699d257e64a5.png','caption':'Chương trình trong phần nhiệm vụ tam giác vuông','kind':'question'}]

# Review coverage of every question, including duplicate questions in combined
# documents. Device thumbnails alone do not supply a mission's instructions.
concept=re.compile(r'Repeat Until|repeat 10|if không có else|Forever thực hiện|lệnh đặt tốc độ nên nằm|Muốn thay đổi tốc độ motor|Khối chờ theo số giây',re.I)
self_contained=re.compile(r'^Pin |^Não |^Linh kiện nào cung cấp|^Toán tử |^My Block |^Để thực hiện lại|^Một vòng quay',re.I)
audit=[]
def flatten(blocks):
 return [c for b in blocks for c in (flatten([c for row in b.get('rows',[]) for cell in row for c in cell['blocks']]) if b['type']=='table' else [b])]
norm=lambda s:re.sub(r'\s+',' ',s).strip()
def source_excerpt(lesson,q):
 needle=norm(q['sourceNeedle'])
 if lesson['format']=='DOCX':
  blocks=flatten(json.loads(Path('public'+lesson['content']).read_text(encoding='utf-8'))['blocks'])
  texts=[b['text'] for b in blocks if b['type']=='text']
 else:
  with fitz.open('public'+lesson['original']) as pdf:
   texts=[b[4] for page in pdf for b in page.get_text('blocks') if b[6]==0]
 matches=[norm(t).split('Bản quyền')[0].strip() for t in texts if needle.casefold() in norm(t).casefold()]
 return min(matches,key=len) if matches else needle
for lesson in catalog:
 for q in lesson['questions']:
  diagram=any(r['kind']=='question' for r in q.get('references',[]))
  if concept.search(q['prompt']):kind='app-block-example'
  elif diagram:kind='source-question-illustration'
  elif q.get('context') and q['context']['label']!='Thông tin từ bài học để trả lời câu hỏi':kind='source-mission-context'
  elif self_contained.search(q['prompt']):kind='self-contained-concept'
  else:
   # Preserve the recorded source excerpt rather than making up scene details.
   q['context']={'text':source_excerpt(lesson,q),'label':'Thông tin từ bài học để trả lời câu hỏi'}
   kind='source-evidence-context'
  if re.search(r'vị trí số|theo hình|Giải thoát mê cung|Hình nào thuộc',q['prompt'],re.I):
   assert diagram or concept.search(q['prompt']),q['id']+' missing required diagram'
  for ref in q.get('references',[]):assert Path('public'+ref['src']).is_file(),ref['src']
  audit.append({'id':q['id'],'prompt':q['prompt'],'coverage':kind})
path.write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
Path('artifacts/quiz/question-context-review.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print('Reviewed',len(audit),'questions:',{kind:sum(a['coverage']==kind for a in audit) for kind in sorted({a['coverage'] for a in audit})})
