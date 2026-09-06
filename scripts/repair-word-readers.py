import json,zipfile,posixpath,hashlib
from pathlib import Path
from io import BytesIO
import xml.etree.ElementTree as ET
from PIL import Image
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships','v':'urn:schemas-microsoft-com:vml'}
w=lambda tag:'{'+ns['w']+'}'+tag
catalog=json.loads(Path('public/quiz/catalog.json').read_text(encoding='utf-8'));count=0
for lesson in catalog:
 if lesson['format']!='DOCX':continue
 with zipfile.ZipFile('public'+lesson['original']) as archive:
  rels={x.attrib['Id']:x.attrib['Target'] for x in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
  def paragraph(p):
   result=[];text=''
   for node in p.iter():
    if node.tag==w('t'):text+=node.text or ''
    if node.tag==w('tab'):text+='\t'
    if node.tag in [w('br'),w('cr')]:text+='\n'
    ref=node.attrib.get('{'+ns['r']+'}embed') if node.tag=='{'+ns['a']+'}blip' else node.attrib.get('{'+ns['r']+'}id') if node.tag=='{'+ns['v']+'}imagedata' else None
    if ref:
     if text.strip():result.append({'type':'text','text':text.strip()});text=''
     target=posixpath.normpath(posixpath.join('word',rels[ref]));raw=archive.read(target)
     name=lesson['id']+'-read-'+hashlib.sha256(raw).hexdigest()[:12]+'.png';dest=Path('public/quiz/images')/name
     if not dest.exists():
      img=Image.open(BytesIO(raw));img.thumbnail((1600,1600));img.convert('RGBA').save(dest,optimize=True)
     result.append({'type':'image','src':'/quiz/images/'+name,'text':'Hình gốc trong tài liệu'})
   if text.strip():result.append({'type':'text','text':text.strip()})
   return result
  def contents(parent):
   result=[]
   for child in parent:
    if child.tag==w('p'):result.extend(paragraph(child))
    elif child.tag==w('tbl'):result.append(table(child))
   return result
  def table(tbl):
   rows=[];above={}
   for row in tbl.findall('w:tr',ns):
    cells=[];col=0;nextAbove={}
    for cell in row.findall('w:tc',ns):
     span=cell.find('w:tcPr/w:gridSpan',ns);width=int(span.attrib.get(w('val'),'1')) if span is not None else 1
     merge=cell.find('w:tcPr/w:vMerge',ns)
     if merge is not None and merge.attrib.get(w('val'))!='restart' and col in above:
      previous=above[col];previous['rowSpan']+=1;nextAbove[col]=previous
     else:
      item={'colSpan':width,'rowSpan':1,'blocks':contents(cell)};cells.append(item)
      if merge is not None:nextAbove[col]=item
     col+=width
    rows.append(cells);above=nextAbove
   return {'type':'table','text':'Bảng trong tài liệu gốc','rows':rows}
  body=ET.fromstring(archive.read('word/document.xml')).find('w:body',ns)
  blocks=contents(body)
  Path('public'+lesson['content']).write_text(json.dumps({'blocks':blocks},ensure_ascii=False),encoding='utf-8');count+=1
print('Restored Word tables and inline content order:',count,'documents')
