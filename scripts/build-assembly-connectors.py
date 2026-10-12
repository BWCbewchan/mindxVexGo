"""Extract circular mating references from original STEP analytic cylinders.

These are geometric references, not certified mechanical joints. CAD mm Z-up
coordinates are converted to GLB mm Y-up without recentering meshes.
"""
import json,math,sys
from pathlib import Path
runtime=Path('artifacts/vexgo-cad-reference/runtime').resolve()
sys.path.insert(0,str(runtime))
import cadquery as cq
from OCP.BRepAdaptor import BRepAdaptor_Surface
from OCP.GeomAbs import GeomAbs_Cylinder

def convert(v):return [round(v[0],5),round(v[2],5),round(-v[1],5)]
rows=json.loads(Path('artifacts/vexgo-cad-reference/manifest.json').read_text(encoding='utf-8'))
out={}
for row in rows:
 if row['status']!='ok':continue
 shape=cq.importers.importStep(row['source']).val()
 points={}
 for face in shape.Faces():
  surf=BRepAdaptor_Surface(face.wrapped)
  if surf.GetType()!=GeomAbs_Cylinder:continue
  cylinder=surf.Cylinder();r=cylinder.Radius()
  if not 1.2<=r<=3.6:continue
  u0,u1,v0,v1=surf.FirstUParameter(),surf.LastUParameter(),surf.FirstVParameter(),surf.LastVParameter()
  if u1-u0<math.pi*.7 or v1-v0<.7 or v1-v0>30:continue
  origin=cylinder.Location();direction=cylinder.Axis().Direction()
  d=[direction.X(),direction.Y(),direction.Z()];o=[origin.X(),origin.Y(),origin.Z()]
  midpoint=surf.Value((u0+u1)/2,(v0+v1)/2)
  n=face.normalAt(cq.Vector(midpoint.X(),midpoint.Y(),midpoint.Z()))
  center=[o[i]+d[i]*(v0+v1)/2 for i in range(3)]
  radial=[midpoint.Coord(i+1)-center[i] for i in range(3)]
  kind='hole' if sum(n.toTuple()[i]*radial[i] for i in range(3))<0 else 'pin'
  for v,sign in [(v0,-1),(v1,1)]:
   pos=convert([o[i]+d[i]*v for i in range(3)]);axis=convert([d[i]*sign for i in range(3)])
   ident=tuple(round(x,2) for x in pos+axis)+(kind,)
   candidate={'point':pos,'normal':axis,'radius':round(r,4),'depth':round(v1-v0,4),'kind':kind}
   if ident not in points or r<points[ident]['radius']:points[ident]=candidate
 refs=sorted(points.values(),key=lambda p:(p['kind'],p['point'],p['normal']))
 for i,p in enumerate(refs):p['id']=str(i+1)
 out[row['id']]=refs
 print(row['id'],len(refs),flush=True)
out.update(json.loads(Path('scripts/assembly-drive-profiles.json').read_text(encoding='utf-8'))['parts'])
square_data=json.loads(Path('scripts/assembly-square-profiles.json').read_text(encoding='utf-8'))['parts']
for ref in out.get('269-6690-000',[]):
 if ref.get('profile')!='square-drive':ref['excludedProfiles']=['square-drive']
for sku,profile in square_data.items():
 refs=out.setdefault(sku,[])
 suppressed=set(profile.get('removeCircularIds',[]))
 refs[:]=[ref for ref in refs if ref['id'] not in suppressed]
 refs.extend(profile['features'])
Path('public/assembly/connectors.json').write_text(json.dumps({'version':2,'units':'millimeters','axes':'Y up','policy':'Analytic STEP circular references plus curated square-drive sockets and shafts mapped from original VEX GO CAD. Square shafts drive square holes and spin freely in round holes. Check physical fit.','parts':out},separators=(',',':')),encoding='utf-8')
print('Extracted',sum(map(len,out.values())),'references across',len(out),'parts')
