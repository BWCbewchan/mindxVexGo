"""Vendor the independent GPL Gears runtime and its corresponding source."""
import hashlib
import json
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

source = Path(sys.argv[1]).resolve()
revision = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
if revision != 'c0549600a26f9811906b4e02fd9246fe2413a072':
    raise SystemExit('Review upstream revision before import')
root = Path('public/robolab')
dest = root / 'gears'
dest.mkdir(parents=True, exist_ok=True)
excluded = {'ace-1.4.10', 'blockly-9.0.0', 'blockly-12.3.0'}
hashes = {}
for path in (source / 'public').rglob('*'):
    if not path.is_file():
        continue
    rel = path.relative_to(source / 'public')
    if (rel.parts[0] in excluded and rel.parts[:2] not in {('blockly-9.0.0', 'msg'), ('blockly-9.0.0', 'media')}) or (rel.parts[0] == 'models' and rel.parts[1] != 'WRO'):
        continue
    target = dest / rel
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, target)
    hashes[rel.as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
shutil.copyfile(source / 'LICENSE', dest / 'LICENSE.txt')
shutil.copyfile(source / 'README.md', dest / 'UPSTREAM-README.md')

# Entire original source is downloadable, including build inputs and asset notices.
with zipfile.ZipFile(root / 'gears-source.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in source.rglob('*'):
        if path.is_file() and '.git' not in path.relative_to(source).parts:
            archive.write(path, path.relative_to(source).as_posix())
    for filename in ['scripts/import-robolab-competitions.py', 'public/robolab/competition-adapter.js', 'public/robolab/robot-profiles.json', 'public/robolab/practice.json', 'scripts/patch-robolab-gears-brand.py', 'public/robolab/isolation.js', 'public/robolab/dialogs.js']:
        if Path(filename).exists():
            archive.write(filename, 'mindx-integration/' + filename)

index = dest / 'index.html'
html = index.read_text(encoding='utf-8')
html = html.replace('<head>', '<head><script src="../isolation.js" data-storage-prefix="mindx-robolab-gears:v1:"></script><script src="../dialogs.js"></script>')
html = html.replace('</body>', '<script src="../competition-adapter.js"></script></body>')
index.write_text(html, encoding='utf-8')
main = dest / 'js/main.js'
code = main.read_text(encoding='utf-8').replace('self.showWhatsNew();', '// Changelog available in upstream source.')
code = code.replace("alert('Failed to read file.');", "window.robolabDialogs.alert('Failed to read file.');")
main.write_text(code, encoding='utf-8')
panel = dest / 'js/blocklyPanel.js'
code = panel.read_text(encoding='utf-8')
for name in ['addPage', 'copyCurrentPage', 'moveSelected', 'renameCurrentPage']:
    code = code.replace(f'this.{name} = function(', f'this.{name} = async function(')
code = re.sub(r'(?<![\w.])prompt\(', 'await window.robolabDialogs.input(', code)
panel.write_text(code, encoding='utf-8')

missions = (dest / 'js/worlds/world_Missions.js').read_text(encoding='utf-8')
catalog = []
for title, url in re.findall(r"\['([^']+)', '(worlds/missions/(?:FLL|WRO)/[^']+)'\]", missions):
    year = int(title[:4])
    if year > 2026:
        continue
    relative = url.split('?')[0]
    data = json.loads((dest / relative).read_text(encoding='utf-8-sig'))
    opts = data['options']
    image = opts.get('imageURL', '')
    if image and not (dest / image.split('?')[0]).is_file():
        raise RuntimeError('Missing mission image: ' + image)
    objects = len(opts.get('objects') or [])
    catalog.append({'id': Path(relative).stem, 'title': title, 'year': year, 'family': 'FLL' if '/FLL/' in relative else 'WRO', 'url': relative, 'image': image, 'objects': objects, 'mode': 'objects' if objects else 'mat'})
(root / 'competitions.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding='utf-8')
(dest / 'source-manifest.json').write_text(json.dumps({'repository': 'https://github.com/QuirkyCort/gears', 'revision': revision, 'license': 'GPL-3.0', 'sourceDownload': '../gears-source.zip', 'originalSha256': hashes, 'patches': ['isolated storage', 'custom error dialog', 'omit changelog popup', 'competition adapter', 'per-field mindX robots', 'mindX header branding']}, indent=2), encoding='utf-8')
subprocess.check_call([sys.executable, '-I', 'scripts/patch-robolab-gears-brand.py'])
print(f'Imported {len(hashes)} files, {len(catalog)} competition fields; corresponding source included.')
