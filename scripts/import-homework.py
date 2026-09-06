from pathlib import Path
import hashlib,json,re,shutil,sys,zipfile,posixpath
import xml.etree.ElementTree as ET
import fitz
from PIL import Image
from io import BytesIO
sys.stdout.reconfigure(encoding='utf-8')
root=Path(sys.argv[1]);out=Path('public/quiz');out.mkdir(exist_ok=True)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships','v':'urn:schemas-microsoft-com:vml'}
catalog=[];texts=[];issues=[]
for p in sorted(root.rglob('*')):
 if not p.is_file():continue
 if p.suffix.lower() not in ['.pdf','.docx']:raise ValueError('Unknown file '+str(p))
 relative=p.relative_to(root).as_posix();digest=hashlib.sha256(p.read_bytes()).hexdigest();id=hashlib.sha256(relative.encode()).hexdigest()[:12]
 group=re.search(r'ROB - (\w+)',relative).group(1)
 dest=out/'documents'/f'{id}{p.suffix.lower()}';shutil.copyfile(p,dest)
 blocks=[];alltext=[];pages=0;imagecount=0
 if p.suffix.lower()=='.pdf':
  with fitz.open(p) as doc:
   pages=len(doc)
   for idx,page in enumerate(doc):
    text=page.get_text(sort=True).strip();alltext.append(text)
    pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False)
    img=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    imagepath=out/'images'/f'{id}-page-{idx+1}.webp';img.save(imagepath,'WEBP',quality=85)
    blocks.append({'type':'page','src':'/quiz/images/'+imagepath.name,'text':text,'page':idx+1})
 else:
  with zipfile.ZipFile(p) as z:
   relations={x.attrib['Id']:x.attrib['Target'] for x in ET.fromstring(z.read('word/_rels/document.xml.rels'))}
   doc=ET.fromstring(z.read('word/document.xml'));body=doc.find('w:body',ns)
   def paragraph(para):
    global imagecount
    text=''.join(x.text or '' for x in para.findall('.//w:t',ns)).strip()
    if text:blocks.append({'type':'text','text':text});alltext.append(text)
    refs=[x.attrib.get('{'+ns['r']+'}embed') for x in para.findall('.//a:blip',ns)]+[x.attrib.get('{'+ns['r']+'}id') for x in para.findall('.//v:imagedata',ns)]
    for ref in refs:
     target=relations.get(ref,'');path=posixpath.normpath(posixpath.join('word',target))
     if path not in z.namelist():continue
     imagecount+=1;imgpath=out/'images'/f'{id}-image-{imagecount}.png'
     try:
      img=Image.open(BytesIO(z.read(path)));img.thumbnail((1600,1600));img.convert('RGBA').save(imgpath,optimize=True)
      blocks.append({'type':'image','src':'/quiz/images/'+imgpath.name,'text':f'Hình minh họa {imagecount}'})
     except Exception as e:issues.append({'id':id,'image':path,'error':str(e)})
   for child in body:
    if child.tag=='{'+ns['w']+'}p':paragraph(child)
    elif child.tag=='{'+ns['w']+'}tbl':
     for row in child.findall('w:tr',ns):
      blocks.append({'type':'divider','text':'Table row'})
      for cell in row.findall('w:tc',ns):
       for para in cell.findall('.//w:p',ns):paragraph(para)
  pages=0
 title=p.stem
 lesson=re.search(r'(?:LS\s*|Buổi\s*|BUỔI\s*|Bài\s*)(\d+)',title,re.I)
 item={'id':id,'title':title,'group':group,'family':relative.split('/')[0],'lesson':int(lesson.group(1)) if lesson else 0,'filename':p.name,'original':'/quiz/documents/'+dest.name,'format':p.suffix[1:].upper(),'bytes':p.stat().st_size,'sha256':digest,'sourcePath':relative,'content':'/quiz/content/'+id+'.json','pages':pages,'questions':[]}
 (out/'content'/f'{id}.json').write_text(json.dumps({'blocks':blocks},ensure_ascii=False),encoding='utf-8')
 catalog.append(item);texts.append({'id':id,'group':group,'title':title,'text':'\n'.join(alltext)})
 print(group,title,'text',sum(map(len,alltext)),'blocks',len(blocks))
(out/'catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
Path('artifacts/quiz/extracted.json').write_text(json.dumps(texts,ensure_ascii=False,indent=2),encoding='utf-8')
Path('artifacts/quiz/import-report.json').write_text(json.dumps({'count':len(catalog),'issues':issues},ensure_ascii=False,indent=2),encoding='utf-8')
print('TOTAL',len(catalog),'ISSUES',issues)
