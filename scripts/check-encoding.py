"""Check first-party text for invalid UTF-8 and reversible Windows mojibake."""
from pathlib import Path
import re,sys

sys.stdout.reconfigure(encoding='utf-8')
TAIL=r'[\x80-\xbf\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2010-\u203f\u20ac\u2122]'
PATTERN=re.compile(r'(?:[\u00c2\u00c3]'+TAIL+r'|\u00e2'+TAIL+r'{2}|\u00e1[\u00ba\u00bb]'+TAIL+r'|\u00f0\u0178'+TAIL+r'{2}|\ufffd)')
EXTENSIONS={'.tsx','.ts','.js','.mjs','.json','.css','.md','.html','.py'}

def broken(text):
 for m in PATTERN.finditer(text):
  if m.group()=='\ufffd':
   yield m,None
   continue
  for encoding in ['cp1252','latin1']:
   try:fixed=m.group().encode(encoding).decode('utf-8')
   except (UnicodeEncodeError,UnicodeDecodeError):continue
   yield m,fixed
   break

def scan():
 issues=[];count=0
 for folder in ['app','public','scripts','docs']:
  for p in Path(folder).rglob('*'):
   if not p.is_file() or p.suffix not in EXTENSIONS or 'dist' in p.parts:continue
   count+=1
   try:text=p.read_text(encoding='utf-8-sig')
   except UnicodeDecodeError:issues.append((str(p),'invalid UTF-8'));continue
   for m,_ in broken(text):issues.append((str(p),f'line {text.count(chr(10),0,m.start())+1}: {m.group()!r}'))
 for path,issue in issues:print(path,issue)
 print(f'Checked {count} first-party text files; {len(issues)} encoding issues.')
 return issues

if __name__=='__main__':sys.exit(bool(scan()))
