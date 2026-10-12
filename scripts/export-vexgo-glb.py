"""Convert original XCAF STEP geometry and materials into portable glTF binary."""
import argparse,json,struct
from pathlib import Path

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--source',required=True);ap.add_argument('--root',required=True);a=ap.parse_args()
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
    root=Path(a.root); rows=[]
    for file in sorted(Path(a.source).rglob('*.STEP')):
        ident=file.stem.split()[0]; group='electronics' if file.parent.name=='Electronics' else 'mechanical'
        dest=root/group/ident/'model.glb'
        doc=TDocStd_Document(TCollection_ExtendedString('VEXGO'))
        reader=STEPCAFControl_Reader();reader.SetColorMode(True)
        if reader.ReadFile(str(file))!=IFSelect_RetDone or not reader.Transfer(doc):raise ValueError(str(file))
        st=XCAFDoc_DocumentTool.ShapeTool_s(doc.Main());labs=TDF_LabelSequence();st.GetFreeShapes(labs)
        for i in range(1,labs.Length()+1):
            mesh=BRepMesh_IncrementalMesh(st.GetShape_s(labs.Value(i)),0.12,False,0.15,True)
            if not mesh.IsDone():raise ValueError('Meshing failed '+ident)
        writer=RWGltf_CafWriter(TCollection_AsciiString(str(dest)),True)
        conv=writer.ChangeCoordinateSystemConverter();conv.SetInputLengthUnit(0.001)
        conv.SetInputCoordinateSystem(RWMesh_CoordinateSystem_Zup);conv.SetOutputCoordinateSystem(RWMesh_CoordinateSystem_Yup)
        if not writer.Perform(doc,TColStd_IndexedDataMapOfStringString(),Message_ProgressRange()):raise ValueError('GLB write failed '+ident)
        b=dest.read_bytes(); magic,version,length=struct.unpack('<4sII',b[:12])
        assert magic==b'glTF' and version==2 and length==len(b)
        size,kind=struct.unpack('<II',b[12:20]);assert kind==0x4E4F534A
        data=json.loads(b[20:20+size]);assert data.get('meshes') and data.get('scenes')
        rows.append(dict(id=ident,path=f'{group}/{ident}/model.glb',bytes=len(b),meshes=len(data['meshes']),units='meters',axes='Y up',source_cad_units='millimeters'))
        print('GLB',ident,flush=True)
    (root/'glb-manifest.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
    print('Validated',len(rows),'GLB files',flush=True)

if __name__=='__main__':main()
