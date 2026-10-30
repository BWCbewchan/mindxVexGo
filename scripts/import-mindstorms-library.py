"""Extract the complete bundled LDraw library without executing upstream JS.

Usage: python scripts/import-mindstorms-library.py <cloned repository> [output]
Only data and its original attribution are imported, not upstream application code.
"""
import argparse
import csv
import hashlib
import io
import json
import re
import subprocess
from collections import Counter
from pathlib import Path, PurePosixPath


def extract(source: Path, output: Path):
    text = (source / 'data.js').read_text(encoding='utf-8-sig')
    prefix = 'window.MSCAD_DATA='
    if not text.startswith(prefix):
        raise ValueError('Unexpected data wrapper; refusing to execute JavaScript')
    data = json.loads(text[len(prefix):].strip().removesuffix(';'))
    bundle, index = data['bundle'], data['index']
    missing = []
    authors, licenses = set(), Counter()
    files = []
    for name, contents in bundle.items():
        path = PurePosixPath(name)
        if path.is_absolute() or '..' in path.parts or '\\' in name or ':' in name:
            raise ValueError(f'Unsafe library path: {name}')
        for line in contents.splitlines():
            fields = line.strip().split(None, 14)
            if len(fields) == 15 and fields[0] == '1':
                ref = fields[14].lower().replace('\\', '/')
                if not any(candidate in bundle for candidate in [ref, 'parts/'+ref, 'p/'+ref, 'parts/s/'+ref]):
                    missing.append({'file': name, 'dependency': ref})
        authors.update(re.findall(r'^0 Author: (.*)', contents, re.M))
        license_line = re.search(r'^0 !LICENSE (.*)', contents, re.M)
        license_text = license_line[1] if license_line else 'Configuration file; see CAreadme.txt'
        licenses[license_text] += 1
        files.append({'path': name, 'sha256': hashlib.sha256(contents.encode()).hexdigest(), 'license': license_text})
    if missing:
        raise ValueError(f'Missing LDraw dependencies: {missing}')
    sets = {key: name for key, name in index['sets'].items() if key != 'extra-1'}
    parts = {key: value for key, value in index['parts'].items() if any(s in value.get('sets', {}) for s in sets)}
    roots_missing = [key for key in parts if f'parts/{key}.dat' not in bundle]
    if roots_missing:
        raise ValueError(f'Missing part geometry: {roots_missing}')
    output.mkdir(parents=True, exist_ok=True)

    def write(name, value):
        destination = output / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(value, encoding='utf-8')

    def dump(name, value):
        write(name, json.dumps(value, ensure_ascii=False, indent=2)+'\n')

    for name, contents in bundle.items():
        write('ldraw/'+name, contents)
    dump('parts-index.json', {'parts': parts, 'colors': index['colors']})
    dump('connectors-ldraw.json', {key: value for key, value in data['conn'].items() if key in parts})
    kits = []
    for key, name in sets.items():
        inventory = [{'part': part, 'name': row['name'], 'quantity': row['sets'][key],
                      'displayColor': row.get('dcs', {}).get(key, row.get('dc')),
                      'ldraw': f'ldraw/parts/{part}.dat'}
                     for part, row in parts.items() if key in row.get('sets', {})]
        kit = {'id': key, 'name': name, 'partTypes': len(inventory),
               'sourceQuantity': sum(row['quantity'] for row in inventory),
               'inventory': inventory, 'factoryInventoryVerified': False,
               'quantityByColorAvailable': False}
        kits.append(kit)
        dump(f'kits/{key}.json', kit)
        table = io.StringIO(newline='')
        writer = csv.DictWriter(table, fieldnames=['part', 'name', 'quantity', 'displayColor', 'ldraw'])
        writer.writeheader()
        writer.writerows(inventory)
        write(f'kits/{key}.csv', '\ufeff'+table.getvalue())
    dump('kits.json', kits)
    commit = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
    manifest = {'source': 'https://github.com/daewonlee81-glitch/mindstorms-cad', 'commit': commit,
                'dataSha256': hashlib.sha256((source/'data.js').read_bytes()).hexdigest(),
                'sourcePartTypes': len(index['parts']), 'legoPartTypes': len(parts), 'kitCount': len(kits),
                'libraryFiles': len(bundle), 'partsWithConnectionData': sum(key in data['conn'] for key in parts),
                'missingDependencies': missing, 'completeRelativeToSource': True,
                'factoryInventoryVerified': False, 'millimetersPerLDrawUnit': .4,
                'applicationCodeCopied': False, 'licenses': dict(licenses), 'authors': sorted(authors), 'files': files}
    dump('source-manifest.json', manifest)
    write('ATTRIBUTION.md', '# LEGO CAD data attribution\n\n'
          'Geometry: The LDraw Parts Library and the individual authors listed in each original file.\n'
          'Bundled data and kit index: RoboMakers / Daewon Lee, from '+manifest['source']+'\n'
          'Upstream revision: '+commit+'\n\n'
          'Individual original CC BY 4.0 / CC BY 2.0 headers are preserved.\n'
          'Terms: https://www.ldraw.org/legal-info and CAreadme.txt.\n'
          'LEGO is a trademark of the LEGO Group; this data package is not endorsed by LEGO.\n\n'
          'All source kit entries and their recursive CAD dependencies were imported.\n'
          'Set quantities are the source snapshot, not a certified factory inventory.\n'
          'displayColor is the upstream default color; it is NOT a per-color quantity.\n'
          'Connection coordinates remain in original LDraw units and conventions.\n'
          'Convert units, axes and mating profiles before using them with the VEX editor.\n'
          'This importer does not copy or relicense upstream application code.\n')
    print(json.dumps({key: value for key, value in manifest.items() if key not in ('files', 'authors', 'licenses')}, indent=2))
    print('Kit inventory:', [(kit['id'], kit['partTypes'], kit['sourceQuantity']) for kit in kits])


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('output', type=Path, nargs='?', default=Path('public/assembly/lego'))
    args = parser.parse_args()
    extract(args.source, args.output)
