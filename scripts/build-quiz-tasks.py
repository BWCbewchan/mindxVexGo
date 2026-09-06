import json,re,copy
from pathlib import Path
docs=json.loads(Path('artifacts/quiz/extracted.json').read_text(encoding='utf-8'))
result={}
base={'name':'Homework practice','width':1200,'height':1200,'start':{'x':200,'y':600,'heading':90},'goal':{'x':500,'y':600,'radius':30},'walls':[]}
for doc in docs:
 text=doc['text'].split('ĐÁP ÁN GỢI Ý')[0]
 # Remove repeating page furniture, retaining source task wording.
 text=re.sub(r'Bản quyền[^\n]*|Robotics & Engineering[^\n]*|Tình tr[aạ]ng[^\n]*|Phiên bản[^\n]*', '', text)
 text=re.sub(r'(?m)^\s*(?:\d+|\.)\s*$', '',text)
 matches=list(re.finditer(r'Nhiệm vụ\s*(\d*)\s*:',text,re.I))
 tasks=[];seen=set()
 for i,m in enumerate(matches):
  body=text[m.end():matches[i+1].start() if i+1<len(matches) else len(text)]
  body=re.split(r'\n\s*\d+\.\s*[A-ZÀ-Ỹ]|\n\s*BÀI\s+\d+|\n\s*Câu\s+\d+',body)[0]
  body=re.sub(r'\s+',' ',body).strip()
  if not body or body in seen:continue
  seen.add(body)
  tasks.append({'id':'task-'+str(len(tasks)+1),'title':'Nhiệm vụ '+(m.group(1) or str(len(tasks)+1)),'requirements':body,'profile':'code-check','field':copy.deepcopy(base),'note':'Sa bàn thử nghiệm chung, không tái tạo cơ cấu vật lý trong tài liệu. Submit tự đối chiếu cấu trúc code với tiêu chí; phần này chưa xác nhận hành vi cơ khí qua mô phỏng. Xem tài liệu gốc nếu yêu cầu có hình minh họa.'})
 if not tasks and re.search(r'lập trình|nhiệm vụ|thẻ lệnh',text,re.I):
  tasks=[{'id':'task-1','title':'Thực hành theo tài liệu','requirements':'Mở Read lesson để chọn yêu cầu thực hành và xem hình khối lệnh trong tài liệu. Viết chương trình ở đây và dùng Submit để xem các tiêu chí hệ thống có thể kiểm tra.','profile':'code-check','field':copy.deepcopy(base),'note':'Tài liệu chưa có nhiệm vụ dạng văn bản đủ rõ để chấm tự động. Đây là không gian thử code bằng robot ảo, không phải mô hình cơ khí gốc.'}]
 for task in tasks:
  body=task['requirements'].rstrip(' .').casefold()
  profile=None
  if body in ['lập trình mô hình di chuyển về phía trước','lập trình cho mô hình di chuyển về phía trước']:profile='forward'
  if body=='lập trình mô hình xoay trái/phải':profile='turn'
  if body=='lập trình để cho mô hình di chuyển theo hình vuông:':profile='square'
  if body=='lập trình cho mô hình dừng lại nếu phát hiện có vật cản trước mặt':profile='eye-stop'
  if body=='thực hiện thử thách robot thoát khỏi mê cung':profile='maze'
  if profile:
   task['profile']=profile
   task['note']='Bài chuyển thể trên robot ảo. Chấm hành vi theo các tiêu chí bên dưới; kích thước sa bàn là quy ước luyện tập, không phải số đo trong tài liệu.'
   field=task['field']
   if profile=='square':
    field['goal']={'x':200,'y':600,'radius':30};field['checkpoints']=[{'x':500,'y':600,'radius':30},{'x':500,'y':900,'radius':30},{'x':200,'y':900,'radius':30}]
   if profile=='eye-stop':field['walls']=[{'x':750,'y':400,'width':50,'height':400}];field['goal']={'x':400,'y':600,'radius':100}
   if profile=='maze':
    field['walls']=[{'x':500,'y':350,'width':160,'height':500}];field['goal']={'x':900,'y':600,'radius':40};field['checkpoints']=[{'x':350,'y':250,'radius':50},{'x':850,'y':250,'radius':50}]
 if tasks:result[doc['id']]=tasks
# Aggregates contain answer sections between lessons: merge all original lesson tasks
# instead of truncating the aggregate at its first answer key. Existing task IDs stay stable.
for doc in docs:
 if 'Tổng hợp' not in doc['title'] and doc['title']!='PreA - Homework':continue
 existing=result.setdefault(doc['id'],[]);seen={t['requirements'] for t in existing}
 for other in docs:
  if other['id']==doc['id'] or other['group']!=doc['group'] or 'Tổng hợp' in other['title']:continue
  for t in result.get(other['id'],[]):
   if t['requirements'] in seen:continue
   seen.add(t['requirements']);existing.append({**copy.deepcopy(t),'id':'task-'+str(len(existing)+1),'title':other['title']+' / '+t['title'],'sourceLesson':other['id']})
Path('public/quiz/tasks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print('Lessons',len(result),'tasks',sum(map(len,result.values())),'auto',sum(t['profile']!='code-check' for ts in result.values() for t in ts))
