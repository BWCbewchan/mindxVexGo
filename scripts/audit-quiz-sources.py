import json,hashlib,re,zipfile
from pathlib import Path
import xml.etree.ElementTree as ET
import fitz
root=Path('C:/Users/admin/Downloads/HOMEWORK ALL -20260905T113047Z-1-001/HOMEWORK ALL')
catalog=json.loads(Path('public/quiz/catalog.json').read_text(encoding='utf-8'))
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
norm=lambda s:re.sub(r'\s+',' ',s).strip()
def flatten(blocks):
 return [c for b in blocks for c in ([b]+flatten([c for row in b.get('rows',[]) for cell in row for c in cell['blocks']]) if b['type']=='table' else [b])]
report=[]
for lesson in catalog:
 original=root/lesson['sourcePath'];hosted=Path('public'+lesson['original'])
 assert original.is_file(),str(original)
 assert hashlib.sha256(original.read_bytes()).hexdigest()==lesson['sha256']==hashlib.sha256(hosted.read_bytes()).hexdigest(),lesson['id']
 content=json.loads(Path('public'+lesson['content']).read_text(encoding='utf-8'))['blocks']
 blocks=flatten(content)
 for b in blocks:
  if b.get('src'):assert Path('public'+b['src']).is_file(),b['src']
 if lesson['format']=='PDF':
  with fitz.open(hosted) as pdf:
   assert len(content)==len(pdf)==lesson['pages']
   for i,p in enumerate(pdf):assert norm(p.get_text(sort=True))==norm(content[i]['text']),lesson['id']+' PDF page '+str(i+1)
 else:
  with zipfile.ZipFile(hosted) as z:
   body=ET.fromstring(z.read('word/document.xml')).find('w:body',ns)
   expected=' '.join(''.join(n.text or '' for n in p.findall('.//w:t',ns)) for p in body.findall('.//w:p',ns))
   actual=' '.join(b['text'] for b in blocks if b['type']=='text')
   assert re.sub(r'\s','',expected)==re.sub(r'\s','',actual),lesson['id']+' Word text mismatch'
   assert len(body.findall('.//w:tbl',ns))==sum(b['type']=='table' for b in blocks),lesson['id']+' table mismatch'
 report.append({'id':lesson['id'],'originalHash':'matched','readerText':'matched','layout':'PDF pages' if lesson['format']=='PDF' else 'Word tables restored'})
Path('artifacts/quiz/source-audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print('PASS:',len(report),'original files match supplied source hashes; all PDF page texts and Word body texts/table counts match.')

