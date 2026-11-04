"""Register audited official Gen2 CAD without rebuilding any existing IQ model."""
import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest', default='artifacts/iq-cad-audit/gen2-converted.json')
    args = parser.parse_args()
    root = Path('public/assembly/iq')
    read = lambda path: json.loads(path.read_text(encoding='utf-8-sig'))
    rows = read(Path(args.manifest))
    assert {r['id'] for r in rows} == {'228-6480', '228-7045', '228-7082', '228-7106'}
    for row in rows:
        assert row['status'] == 'ok' and row['validation']['status'] == 'ok'
        assert row['referenceAudit']['excludedCount'] > 0
        assert (root / 'parts' / row['id'] / 'model.glb').stat().st_size == row['bytes']
        row['source'] = row['sourceUrl']
        (root / 'parts' / row['id'] / 'cad.json').write_text(json.dumps(row, ensure_ascii=False, indent=2), encoding='utf-8')
    ids = {r['id'] for r in rows}
    catalog = [p for p in read(root / 'parts.json') if p['id'] not in ids]
    catalog += [{k: r[k] for k in ['id', 'sku', 'name', 'category', 'kind', 'sourceHash', 'bounds', 'sourceFile']} for r in rows]
    catalog.sort(key=lambda p: p['name'].lower())
    refs = read(root / 'connectors.json')
    refs['parts'].update({r['id']: r['references'] for r in rows})
    manifest = read(root / 'cad-manifest.json')
    manifest['parts'] = [p for p in manifest['parts'] if p['id'] not in ids] + rows
    manifest['sourceCount'] = sum(not p.get('components') for p in manifest['parts'])
    manifest['converted'] = sum(p['status'] == 'ok' for p in manifest['parts'])
    for filename, data in [('parts.json', catalog), ('connectors.json', refs), ('cad-manifest.json', manifest)]:
        (root / filename).write_text(json.dumps(data, ensure_ascii=False, indent=2 if filename == 'cad-manifest.json' else None), encoding='utf-8')
    print('Registered 4 official Gen2 models; existing CAD preserved:', len(catalog), 'total.')


if __name__ == '__main__':
    main()
