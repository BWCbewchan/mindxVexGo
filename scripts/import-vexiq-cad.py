"""Import supplied IQ STEP files without altering geometry, scale or source files."""
import argparse,concurrent.futures,hashlib,json,math,re,struct,sys,traceback
from pathlib import Path
sys.path.insert(0,str(Path('artifacts/vexgo-cad-reference/runtime').resolve()))
CONTROL_NAMES={'228-2530':'Controller (1st generation)','228-2540':'Robot Brain (1st generation)','228-2560':'Smart Motor','228-2604':'Robot Battery','228-2621':'900 MHz Radio','228-2677':'Bumper Switch','228-2780':'Smart Cable (simulated)','228-3010':'Touch LED','228-3011':'Distance Sensor (1st generation)','228-3012':'Color Sensor','228-3014':'Gyro Sensor (1st generation)'}
def convert(v):return [round(v[0],5),round(v[2],5),round(-v[1],5)]
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def sub(a,b):return [x-y for x,y in zip(a,b)]
def square_wire(wire,normal):
 import cadquery as cq
 edges=[e for e in wire.Edges() if e.geomType()=='LINE' and len(e.Vertices())==2]
 if len(edges)<4:return None
 edge=max(edges,key=lambda e:e.Length());a,b=[v.Center() for v in edge.Vertices()];axis=(b-a).normalized();n=cq.Vector(*normal);other=n.cross(axis).normalized();vertices=[v.Center() for v in wire.Vertices()]
 u=[v.dot(axis) for v in vertices];v=[p.dot(other) for p in vertices];width=max(u)-min(u);height=max(v)-min(v)
 if not(3.0<=width<=3.6 and abs(width-height)<.15 and edge.Length()>1):return None
 # Circle/polygon faceting is not a square reference: analytic straight edges required.
 center=axis*((max(u)+min(u))/2)+other*((max(v)+min(v))/2)+n*(vertices[0].dot(n))
 return center.toTuple(),axis.toTuple(),(width+height)/2
def references(shape,name):
 import cadquery as cq
 from OCP.BRepAdaptor import BRepAdaptor_Surface
 from OCP.GeomAbs import GeomAbs_Cylinder,GeomAbs_Plane
 points={};squares=[];caps=[];shaft='shaft' in name.lower() and 'collar' not in name.lower()
 for face in shape.Faces():
  surf=BRepAdaptor_Surface(face.wrapped)
  if surf.GetType()==GeomAbs_Cylinder:
   cylinder=surf.Cylinder();radius=cylinder.Radius();u0,u1,v0,v1=surf.FirstUParameter(),surf.LastUParameter(),surf.FirstVParameter(),surf.LastVParameter()
   if not(1.2<=radius<=3.6 and u1-u0>=math.pi*.7 and .7<=v1-v0<=40):continue
   origin=cylinder.Location();direction=cylinder.Axis().Direction();d=[direction.X(),direction.Y(),direction.Z()];o=[origin.X(),origin.Y(),origin.Z()];mid=surf.Value((u0+u1)/2,(v0+v1)/2);n=face.normalAt(cq.Vector(mid.X(),mid.Y(),mid.Z()));center=[o[i]+d[i]*(v0+v1)/2 for i in range(3)];radial=[mid.Coord(i+1)-center[i] for i in range(3)];kind='hole' if dot(n.toTuple(),radial)<0 else 'pin'
   for value,sign in [(v0,-1),(v1,1)]:
    point=convert([o[i]+d[i]*value for i in range(3)]);normal=convert([x*sign for x in d]);key=tuple(round(x,2) for x in point+normal)+(kind,);row={'point':point,'normal':normal,'radius':round(radius,4),'depth':round(v1-v0,4),'kind':kind}
    if key not in points or radius<points[key]['radius']:points[key]=row
  elif surf.GetType()==GeomAbs_Plane:
   try:
    normal=face.normalAt().toTuple()
    for wire in face.innerWires():
     found=square_wire(wire,normal)
     if found:squares.append((found[0],normal,found[1],found[2]))
    found=square_wire(face.outerWire(),normal)
    if found:caps.append((found[0],normal,found[1],found[2]))
   except Exception:pass
 rows=sorted(points.values(),key=lambda p:(p['kind'],p['point'],p['normal']))
 for i,p in enumerate(rows):p['id']=str(i+1)
 for i,(point,normal,key,width) in enumerate(squares):
  lengths=[]
  for opposite,n2,k2,w2 in squares+caps:
   offset=sub(opposite,point);axial=-dot(offset,normal);lateral=[offset[j]+normal[j]*axial for j in range(3)]
   if .3<axial<80 and sum(x*x for x in lateral)<.04 and abs(dot(normal,n2))>.999 and abs(width-w2)<.2:lengths.append(axial)
  if not lengths:continue # Unknown blind depth must not become an invented motor socket.
  depth=min(lengths);ident='motor-output' if name=='Smart Motor' and not any(r.get('id')=='motor-output' for r in rows) else 'square-hole-'+str(i+1)
  rows.append({'id':ident,'kind':'hole','profile':'square-drive','label':'Square socket · CAD','point':convert(point),'normal':convert(normal),'key':convert(key),'width':round(width,4),'radius':round(width/2,4),'depth':round(depth,4),'maxDepth':round(depth,4),'through':any(dot(normal,n2)<-.999 and abs(-dot(sub(p2,point),normal)-depth)<.1 for p2,n2,_,_ in squares)})
 if shaft:
  bb=shape.BoundingBox();corners=[[x,y,z] for x in [bb.xmin,bb.xmax] for y in [bb.ymin,bb.ymax] for z in [bb.zmin,bb.zmax]]
  for i,(point,normal,key,width) in enumerate(caps):
   axial=[-dot(sub(p,point),normal) for p in corners];length=max(axial)
   if length<1 or min(axial)<-.2:continue
   rows.append({'id':'square-end-'+str(i+1),'kind':'pin','profile':'square-drive','label':'Square shaft end · CAD','point':convert(point),'normal':convert(normal),'key':convert(key),'width':round(width,4),'radius':round(width/2,4),'depth':round(length,4),'maxDepth':round(length,4),'evidence':'Planar square end and original CAD axial bounds; check shoulders before deep seating'})
 return rows
def worker(record):
 import cadquery as cq
 from OCP.STEPCAFControl import STEPCAFControl_Reader
 from OCP.TDocStd import TDocStd_Document
 from OCP.TCollection import TCollection_ExtendedString,TCollection_AsciiString
 from OCP.TDF import TDF_LabelSequence
 from OCP.XCAFDoc import XCAFDoc_DocumentTool
 from OCP.BRepMesh import BRepMesh_IncrementalMesh
 from OCP.RWGltf import RWGltf_CafWriter
 from OCP.RWMesh import RWMesh_CoordinateSystem_Zup,RWMesh_CoordinateSystem_Yup
 from OCP.TColStd import TColStd_IndexedDataMapOfStringString
 from OCP.Message import Message_ProgressRange
 from OCP.IFSelect import IFSelect_RetDone
 file=Path(record['source']);dest=Path(record['destination']);dest.mkdir(parents=True,exist_ok=True);meta=dest/'cad.json';digest=hashlib.sha256(file.read_bytes()).hexdigest()
 if meta.exists():
  old=json.loads(meta.read_text(encoding='utf-8'))
  if old.get('sourceHash')==digest and old.get('status')=='ok' and (dest/'model.glb').exists():return old
 result={k:v for k,v in record.items() if k!='destination'};result['sourceHash']=digest
 try:
  doc=TDocStd_Document(TCollection_ExtendedString('VEXIQ'));reader=STEPCAFControl_Reader();reader.SetColorMode(True)
  if reader.ReadFile(str(file))!=IFSelect_RetDone or not reader.Transfer(doc):raise ValueError('STEP transfer failed')
  tool=XCAFDoc_DocumentTool.ShapeTool_s(doc.Main());labels=TDF_LabelSequence();tool.GetFreeShapes(labels);shapes=[]
  for i in range(1,labels.Length()+1):
   shape=tool.GetShape_s(labels.Value(i));shapes.append(cq.Shape.cast(shape));mesh=BRepMesh_IncrementalMesh(shape,.15,False,.2,True)
   if not mesh.IsDone():raise ValueError('CAD tessellation failed')
  compound=cq.Compound.makeCompound(shapes);b=compound.BoundingBox();corners=[convert([x,y,z]) for x in [b.xmin,b.xmax] for y in [b.ymin,b.ymax] for z in [b.zmin,b.zmax]]
  result['bounds']={'min':[min(p[i] for p in corners) for i in range(3)],'max':[max(p[i] for p in corners) for i in range(3)]};result['references']=references(compound,result['name'])
  writer=RWGltf_CafWriter(TCollection_AsciiString(str(dest/'model.glb')),True);conversion=writer.ChangeCoordinateSystemConverter();conversion.SetInputLengthUnit(.001);conversion.SetInputCoordinateSystem(RWMesh_CoordinateSystem_Zup);conversion.SetOutputCoordinateSystem(RWMesh_CoordinateSystem_Yup)
  if not writer.Perform(doc,TColStd_IndexedDataMapOfStringString(),Message_ProgressRange()):raise ValueError('GLB export failed')
  data=(dest/'model.glb').read_bytes();magic,version,size=struct.unpack('<4sII',data[:12]);assert magic==b'glTF' and version==2 and size==len(data);chunk=struct.unpack('<I',data[12:16])[0];header=json.loads(data[20:20+chunk]);assert header.get('meshes')
  result.update(status='ok',bytes=len(data),meshes=len(header['meshes']),units='millimeters',axes='Y up',materialPolicy='Original STEP/XCAF materials; no guessed recoloring')
 except Exception as e:result.update(status='error',error=str(e),trace=traceback.format_exc())
 meta.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');return result
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--workers',type=int,default=4);ap.add_argument('--limit',type=int);args=ap.parse_args()
 sources=[Path('C:/Users/admin/Downloads/VEX-IQ-All-Parts-2024-11-08'),Path('C:/Users/admin/Downloads/VEX-IQ-All-Control-STEP (1)')];root=Path('public/assembly/iq');records=[]
 files=sorted((p for src in sources for p in src.rglob('*') if p.is_file() and p.suffix.lower() in ['.step','.stp']),key=lambda p:p.name.lower());counts={}
 for p in files:
  match=re.search(r'\d{3}-\d{4}(?:-\d{3,4})?',p.stem)
  if not match:raise ValueError('No CAD ID: '+str(p))
  sku=match.group();counts[sku]=counts.get(sku,0)+1
 for p in files:
  sku=re.search(r'\d{3}-\d{4}(?:-\d{3,4})?',p.stem).group();ident=sku if counts[sku]==1 else sku+'--'+hashlib.sha256(p.name.encode()).hexdigest()[:8];electronic=p.is_relative_to(sources[1]);name=CONTROL_NAMES.get(sku) if electronic else re.sub(r'\s*\('+re.escape(sku)+r'\)\s*','',p.stem).strip()
  records.append({'id':ident,'sku':sku,'name':name or p.stem,'category':'electronics' if electronic else 'mechanical','source':str(p),'sourceFile':p.name,'destination':str((root/'parts'/ident).resolve())})
 if args.limit:records=records[:args.limit]
 root.mkdir(parents=True,exist_ok=True);results=[]
 with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as pool:
  futures={pool.submit(worker,r):r for r in records}
  for future in concurrent.futures.as_completed(futures):
   row=future.result();results.append(row);print(f"{len(results)}/{len(records)} {row['status']} {row['id']} {row['name']}",flush=True)
 results.sort(key=lambda r:r['name'].lower());(root/'cad-manifest.json').write_text(json.dumps({'platform':'vexiq','sourceCount':len(files),'converted':sum(r['status']=='ok' for r in results),'parts':results},ensure_ascii=False,indent=2),encoding='utf-8')
 parts=[{k:r[k] for k in ['id','sku','name','category','sourceHash','bounds','sourceFile']} for r in results if r['status']=='ok'];(root/'parts.json').write_text(json.dumps(parts,ensure_ascii=False),encoding='utf-8');(root/'connectors.json').write_text(json.dumps({'version':3,'platform':'vexiq','units':'millimeters','axes':'Y up','policy':'Analytic original IQ cylinders and planar square wires; geometric references, not physical certification','parts':{r['id']:r['references'] for r in results if r['status']=='ok'}},ensure_ascii=False),encoding='utf-8');print('Converted',len(parts),'/',len(files),flush=True)
if __name__=='__main__':main()
