"""Render supplied VEX GO STEP geometry, never generated replacement geometry.

Run with the isolated runtime on PYTHONPATH. Source files remain untouched.
"""
from __future__ import annotations
import argparse, hashlib, json, traceback
from pathlib import Path

NAMES = {'269-6685':'Brain', '269-6686':'Battery', '269-6687':'Switch',
         '269-6690':'Motor', '269-6695':'Eye Sensor', '269-6696':'LED Bumper',
         '269-6702':'Electromagnet'}
VIEWS = {'iso':(1,-1,1), 'opposite':(-1,1,1), 'top':(0,0,1),
         'front':(0,-1,0), 'side':(1,0,0), 'bottom':(0,0,-1)}

def cad_faces(file, metadata):
    """XCAF supports flattened SolidWorks parts and per-face AP214 colors."""
    import cadquery as cq
    from OCP.STEPCAFControl import STEPCAFControl_Reader
    from OCP.TDocStd import TDocStd_Document
    from OCP.TCollection import TCollection_ExtendedString
    from OCP.TDF import TDF_LabelSequence
    from OCP.XCAFDoc import XCAFDoc_DocumentTool, XCAFDoc_ColorSurf, XCAFDoc_ColorGen
    from OCP.Quantity import Quantity_Color, Quantity_TOC_sRGB
    from OCP.IFSelect import IFSelect_RetDone
    doc=TDocStd_Document(TCollection_ExtendedString('VEXGO'))
    reader=STEPCAFControl_Reader(); reader.SetColorMode(True)
    if reader.ReadFile(str(file))!=IFSelect_RetDone: raise ValueError('STEP read failed')
    if not reader.Transfer(doc): raise ValueError('STEP transfer failed')
    shapes=XCAFDoc_DocumentTool.ShapeTool_s(doc.Main())
    ct=XCAFDoc_DocumentTool.ColorTool_s(doc.Main())
    labels=TDF_LabelSequence(); shapes.GetFreeShapes(labels)
    def color_of(shape, fallback):
        c=Quantity_Color()
        for kind in (XCAFDoc_ColorSurf,XCAFDoc_ColorGen):
            if ct.GetColor(shape,kind,c): return tuple(c.Values(Quantity_TOC_sRGB))
        return fallback
    all_solids=[]
    for i in range(1,labels.Length()+1):
        all_solids.extend(cq.Shape.cast(shapes.GetShape_s(labels.Value(i))).Solids())
    if all_solids:
        compact=[]
        for solid in all_solids:
            for face in solid.Faces():
                fb=face.BoundingBox()
                dims=sorted([fb.xlen,fb.ylen,fb.zlen],reverse=True)
                if dims[1]>1e-5 and dims[0]/dims[1]<3:
                    compact.append(face)
        if compact:
            anchor=max(compact,key=lambda f:f.Area()); ab=anchor.BoundingBox()
            radius=max(ab.xlen,ab.ylen,ab.zlen)*1.25
            near=[f for f in compact if (f.Center()-anchor.Center()).Length<radius]
            b=cq.Compound.makeCompound(near).BoundingBox()
        else:
            b=max(all_solids,key=lambda s:abs(s.Volume())).BoundingBox()
        metadata['housing_focus_bounds']=[b.xmin,b.xmax,b.ymin,b.ymax,b.zmin,b.zmax]
    for i in range(1,labels.Length()+1):
        root=shapes.GetShape_s(labels.Value(i))
        base=color_of(root,(0.72,0.74,0.76))
        for solid in cq.Shape.cast(root).Solids():
            col=color_of(solid.wrapped,base)
            for face in solid.Faces(): yield face,color_of(face.wrapped,col)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--source', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--electronics-only', action='store_true')
    ap.add_argument('--mechanical-only', action='store_true')
    ap.add_argument('--limit',type=int)
    args=ap.parse_args()
    import cadquery as cq
    import numpy as np
    import pyvista as pv
    from PIL import Image, ImageDraw
    root=Path(args.source).resolve(); out=Path(args.out).resolve()
    out.mkdir(parents=True,exist_ok=True)
    files=sorted(root.rglob('*.STEP'))
    if args.electronics_only: files=[p for p in files if p.parent.name=='Electronics']
    if args.mechanical_only: files=[p for p in files if p.parent.name!='Electronics']
    if args.limit: files=files[:args.limit]
    records=[]
    for file in files:
        ident=file.stem.split()[0]; name=NAMES.get(ident[:8],ident)
        dest=out/ident; dest.mkdir(exist_ok=True)
        rec={'id':ident,'name':name,'source':str(file),'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),
             'identity_status':'official SKU matched' if ident[:8] in NAMES else 'unlabelled mechanical part',
             'material_policy':'STEP colors where available; neutral fallback is not a physical-color claim',
             'assembly_policy':'standalone part; no robot assembly inferred'}
        try:
            meshes=[]; colors=[]; vertices=0; triangles=0
            groups={}
            for shape,color in cad_faces(file,rec):
                verts,faces=shape.tessellate(0.12,0.15)
                if not faces: continue
                pts=np.array([v.toTuple() for v in verts])
                cells=np.column_stack([np.full(len(faces),3),np.array(faces)]).ravel()
                mesh=pv.PolyData(pts,cells)
                groups.setdefault(tuple(round(c,5) for c in color),[]).append(mesh)
                vertices+=len(verts); triangles+=len(faces)
            for col,parts in groups.items():
                meshes.append(pv.merge(parts)); colors.append(col)
            if not meshes: raise ValueError('No tessellated surfaces')
            merged=meshes[0].copy()
            for m in meshes[1:]: merged=merged.merge(m)
            merged.save(dest/'geometry.vtp')
            bb=merged.bounds
            center=np.array(merged.center); span=max(bb[1]-bb[0],bb[3]-bb[2],bb[5]-bb[4])
            plot=pv.Plotter(off_screen=True,window_size=(1400,1400))
            plot.set_background('white')
            for mesh,col in zip(meshes,colors):
                plot.add_mesh(mesh,color=col,smooth_shading=True,split_sharp_edges=True,ambient=0.45,diffuse=0.55,
                              specular=0.18,specular_power=25)
            plot.camera.parallel_projection=True
            plot.show(auto_close=False,interactive=False)
            views=VIEWS if file.parent.name=='Electronics' else {'iso':VIEWS['iso'],'top':VIEWS['top'],'opposite':VIEWS['opposite']}
            for view,direction in views.items():
                d=np.array(direction,dtype=float); d/=np.linalg.norm(d)
                plot.camera_position=[(center+d*span*3).tolist(),center.tolist(),
                                      (0,1,0) if view in ('top','bottom') else (0,0,1)]
                plot.camera.parallel_scale=span*0.7
                plot.render()
                plot.screenshot(str(dest/f'{view}.png'),transparent_background=True)
            if file.parent.name=='Electronics' and 'housing_focus_bounds' in rec:
                b=rec['housing_focus_bounds']; fc=np.array([(b[0]+b[1])/2,(b[2]+b[3])/2,(b[4]+b[5])/2])
                fs=max(b[1]-b[0],b[3]-b[2],b[5]-b[4])
                for view,base_view in [('detail','iso'),('detail-opposite','opposite')]:
                    d=np.array(VIEWS[base_view],dtype=float);d/=np.linalg.norm(d)
                    plot.camera_position=[(fc+d*span*3).tolist(),fc.tolist(),(0,0,1)]
                    plot.camera.parallel_scale=fs*1.0;plot.render()
                    plot.screenshot(str(dest/f'{view}.png'),transparent_background=True)
                rec['detail_policy']='Housing close-up; cable may be cropped. Full views remain authoritative.'
            plot.close()
            # A labelled technical reference sheet, not learner-facing illustrated art.
            sheet=Image.new('RGB',(1800,70+650*((len(views)+2)//3)),'white'); draw=ImageDraw.Draw(sheet)
            draw.text((20,15),f'{name} | {ident} | VEX Robotics CAD',fill='black')
            for i,view in enumerate(views):
                im=Image.open(dest/f'{view}.png'); im.thumbnail((580,580))
                x=(i%3)*600;y=70+(i//3)*650
                sheet.paste(im,(x,y),im if im.mode=='RGBA' else None)
                draw.text((x+15,y+580),f'{view} (CAD axes)',fill='black')
            sheet.save(dest/'reference-sheet.png')
            rec.update(status='ok',vertices=vertices,triangles=triangles,bounds_cad_units=list(bb),
                       center=list(center),colors=[list(c) for c in colors],views=list(views)+(['detail','detail-opposite'] if file.parent.name=='Electronics' else []),directory=str(dest))
            print(f'OK {ident}: {triangles} triangles',flush=True)
        except Exception as exc:
            rec.update(status='error',error=str(exc)); traceback.print_exc()
        records.append(rec)
        (out/'manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Finished {sum(r["status"]=="ok" for r in records)}/{len(records)}',flush=True)
    if any(r['status']!='ok' for r in records): raise SystemExit(1)

if __name__=='__main__': main()
