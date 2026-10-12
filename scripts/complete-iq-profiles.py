"""Recover square shaft/bore axes from opposing analytic planar walls.

Rounded/chamfered ends do not have four straight cap edges. Side-wall spacing
establishes the real square width and key; end planes establish axial limits.
"""
import concurrent.futures,json,sys
from pathlib import Path
sys.path.insert(0,str(Path('artifacts/vexgo-cad-reference/runtime').resolve()))
def convert(v): return [round(v[0],5),round(v[2],5),round(-v[1],5)]
def kind(row):
 name=row['name'].lower()
 if row['category']=='electronics':return 'motor' if row['sku']=='228-2560' else 'electronic'
 if 'shaft collar' in name or 'spacer' in name or name=='washer' or 'shaft bushing' in name:return 'retainer'
 if 'shaft' in name and 'support' not in name:return 'shaft'
 if 'connector pin' in name or 'idler pin' in name or 'sheet pin' in name:return 'pin'
 if 'wheel' in name and 'tire' not in name:return 'wheel'
 if 'gear' in name:return 'gear'
 if any(word in name for word in ['beam','plate','connector','standoff','gusset']):return 'body'
 return 'accessory'
def walls(shape,mode):
 import cadquery as cq
 from OCP.BRepAdaptor import BRepAdaptor_Surface
 from OCP.GeomAbs import GeomAbs_Plane
 faces=[]
 for face in shape.Faces():
  if BRepAdaptor_Surface(face.wrapped).GetType()!=GeomAbs_Plane:continue
  faces.append({'normal':face.normalAt(),'center':face.Center(),'vertices':[v.Center() for v in face.Vertices()]})
 pairs=[]
 for i,a in enumerate(faces):
  for b in faces[i+1:]:
   if a['normal'].dot(b['normal'])>-.999:continue
   gap=(b['center']-a['center']).dot(a['normal']);width=abs(gap)
   if not(3.05<=width<=3.4) or (gap<0)!=(mode=='pin'):continue
   pairs.append((a,b,width))
 rows=[]
 for i,(a,b,w1) in enumerate(pairs):
  n1=a['normal'];u=(a['center'].dot(n1)+b['center'].dot(n1))/2
  for c,d,w2 in pairs[i+1:]:
   n2=c['normal']
   if abs(n1.dot(n2))>.001 or abs(w1-w2)>.12:continue
   v=(c['center'].dot(n2)+d['center'].dot(n2))/2;axis=n1.cross(n2).normalized()
   def spans(face,n):
    values=[p.dot(n) for p in face['vertices']];return min(values),max(values)
   if not all(lo-.1<=v<=hi+.1 for lo,hi in [spans(a,n2),spans(b,n2)]) or not all(lo-.1<=u<=hi+.1 for lo,hi in [spans(c,n1),spans(d,n1)]):continue
   interval=[spans(face,axis) for face in [a,b,c,d]];low=max(s[0] for s in interval);high=min(s[1] for s in interval)
   if high-low<.7:continue
   center=n1*u+n2*v;width=(w1+w2)/2
   if mode=='pin':
    ends=[]
    for face in faces:
     if abs(face['normal'].dot(axis))<.999:continue
     offset=face['center']-center;axial=offset.dot(axis)
     if (offset-axis*axial).Length>.2:continue
     p1,p2=spans(face,n1),spans(face,n2)
     if max(p1[1]-p1[0],p2[1]-p2[0])<=3.6:ends.append(axial)
    if not ends:continue
    tips=[(v,-1 if abs(v-low)<abs(v-high) else 1) for v in [min(ends),max(ends)]]
    tips=list(dict.fromkeys(tips))
    if len(ends)>1:low,high=min(ends),max(ends)
   else:tips=[(low,-1),(high,1)]
   for value,sign in tips:
    point=center+axis*value;normal=axis*sign;depth=(high-value if sign<0 else value-low) if mode=='pin' else high-low
    if mode=='pin':
     # A wide planar shoulder limits insertion even when the metal continues behind it.
     stops=[]
     for face in faces:
      if abs(face['normal'].dot(normal))<.999:continue
      delta=-(face['center']-point).dot(normal);p1,p2=spans(face,n1),spans(face,n2)
      if .3<delta<depth-.15 and p1[0]-.1<=u<=p1[1]+.1 and p2[0]-.1<=v<=p2[1]+.1 and max(p1[1]-p1[0],p2[1]-p2[0])>width+.5:stops.append(delta)
     if stops:depth=min(stops)
    row={'kind':mode,'profile':'square-drive','point':convert(point.toTuple()),'normal':convert(normal.toTuple()),'key':convert(n1.toTuple()),'width':round(width,4),'radius':round(width/2,4),'depth':round(depth,4),'maxDepth':round(depth,4),'label':'Square shaft / bore · measured planar walls','evidence':'Opposing planar wall spacing and original CAD end planes'}
    if not any(sum((x-y)**2 for x,y in zip(row['point'],r['point']))<.04 and sum(x*y for x,y in zip(row['normal'],r['normal']))>.999 for r in rows):rows.append(row)
 return rows
def work(row):
 import cadquery as cq
 row['kind']=kind(row);refs=[r for r in row['references'] if not r['id'].startswith(('square-pin-walls-','square-hole-walls-'))];row['references']=refs
 if row['kind']=='shaft' or row['kind'] in ['retainer','wheel','gear'] and not any(r.get('profile') for r in refs):
  shape=cq.importers.importStep(row['source']).val();mode='pin' if row['kind']=='shaft' else 'hole';extra=walls(shape,mode)
  for i,ref in enumerate(extra):ref['id']=f'square-{mode}-walls-{i+1}'
  if row['kind']=='shaft' and 'motor shaft' in row['name'].lower() and len(extra)>1:
   shortest=min(extra,key=lambda r:r['depth']);shortest['driveRole']='short'
   for r in extra:
    if r is not shortest:r['driveRole']='long'
  for candidate in extra:
   if not any(r.get('profile')==candidate['profile'] and r['kind']==candidate['kind'] and sum((a-b)**2 for a,b in zip(r['point'],candidate['point']))<.04 and sum(a*b for a,b in zip(r['normal'],candidate['normal']))>.999 for r in refs):refs.append(candidate)
 if row['sku']=='228-2560':
  for ref in refs:
   if not ref.get('profile'):ref['excludedProfiles']=['square-drive']
 Path('public/assembly/iq/parts',row['id'],'cad.json').write_text(json.dumps(row,ensure_ascii=False,indent=2),encoding='utf-8');return row
def main():
 root=Path('public/assembly/iq');manifest=json.loads((root/'cad-manifest.json').read_text(encoding='utf-8'));rows=manifest['parts']
 with concurrent.futures.ProcessPoolExecutor(max_workers=4) as pool:rows=list(pool.map(work,rows))
 manifest['parts']=rows;(root/'cad-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8');(root/'parts.json').write_text(json.dumps([{k:r[k] for k in ['id','sku','name','category','kind','sourceHash','bounds','sourceFile']} for r in rows if r['status']=='ok'],ensure_ascii=False),encoding='utf-8');(root/'connectors.json').write_text(json.dumps({'version':3,'platform':'vexiq','units':'millimeters','axes':'Y up','policy':'Original analytic cylinders, square opening wires, opposing planar square walls and measured end planes. Review CAD shoulders and physical fit.','parts':{r['id']:r['references'] for r in rows if r['status']=='ok'}},ensure_ascii=False),encoding='utf-8');print('Square-drive parts',sum(any(r.get('profile') for r in row['references']) for row in rows),'of',len(rows),flush=True)
if __name__=='__main__':main()
