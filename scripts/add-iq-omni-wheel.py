"""Register the original VEX IQ omni-wheel STEP without rebuilding other CAD."""
import argparse, importlib.util, json
from pathlib import Path

def module(name, file):
    spec=importlib.util.spec_from_file_location(name, file)
    value=importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--source', required=True)
    parser.add_argument('--source-url', required=True)
    args=parser.parse_args()
    importer=module('iq_importer','scripts/import-vexiq-cad.py')
    profiles=module('iq_profiles','scripts/complete-iq-profiles.py')
    root=Path('public/assembly/iq'); ident='228-2536'
    record={'id':ident,'sku':ident,'name':'200mm Travel Omni-Directional Wheel','category':'mechanical','source':str(Path(args.source).resolve()),'sourceFile':Path(args.source).name,'destination':str((root/'parts'/ident).resolve())}
    row=importer.worker(record)
    if row['status']!='ok':raise RuntimeError(row.get('error'))
    row=profiles.work(row)
    row['source']=args.source_url
    row['manufacturerSource']='https://www.vexrobotics.com/228-2536.html'
    row['sourceNote']='Original STEP geometry retrieved from a public CAD mirror; dimensions and square bore verified against the 200 mm travel wheel.'
    (root/'parts'/ident/'cad.json').write_text(json.dumps(row,ensure_ascii=False,indent=2),encoding='utf-8')
    catalog=json.loads((root/'parts.json').read_text(encoding='utf-8'))
    catalog=[p for p in catalog if p['id']!=ident]
    catalog.append({k:row[k] for k in ['id','sku','name','category','kind','sourceHash','bounds','sourceFile']})
    catalog.sort(key=lambda p:p['name'].lower())
    refs=json.loads((root/'connectors.json').read_text(encoding='utf-8'));refs['parts'][ident]=row['references']
    manifest=json.loads((root/'cad-manifest.json').read_text(encoding='utf-8'))
    manifest['parts']=[p for p in manifest['parts'] if p['id']!=ident]+[row]
    manifest['sourceCount']=sum(not p.get('components') for p in manifest['parts'])
    manifest['converted']=sum(p['status']=='ok' for p in manifest['parts'])
    (root/'parts.json').write_text(json.dumps(catalog,ensure_ascii=False),encoding='utf-8')
    (root/'connectors.json').write_text(json.dumps(refs,ensure_ascii=False),encoding='utf-8')
    (root/'cad-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Registered',ident,row['bounds'],'square bores:',sum(r.get('profile')=='square-drive' for r in row['references']),flush=True)

if __name__=='__main__':main()
