"""Pin a standalone upstream runtime; never modify existing product modules."""
import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

source = Path(sys.argv[1]).resolve()
destination = Path('public/robolab/runtime')
revision = subprocess.check_output(['git', '-C', str(source), 'rev-parse', 'HEAD'], text=True).strip()
expected = '829a6cc3cd77913ed785a9e7092af8aa73f08b3f'
if revision != expected:
    raise SystemExit('Review upstream changes before changing the pinned revision')
destination.mkdir(parents=True, exist_ok=True)
manifest = {}
for path in source.rglob('*'):
    relative = path.relative_to(source)
    if not path.is_file() or relative.parts[0] in {'.git', '.github', 'tests', 'tools', 'docs', 'vla-helper'}:
        continue
    if path.suffix not in {'.js', '.json', '.html', '.css', '.png', '.svg', '.wasm', '.txt', '.md', '.mpy', '.py', '.ldr', '.mpd', '.zip'}:
        continue
    target = destination / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(path, target)
    manifest[str(relative).replace('\\', '/')] = hashlib.sha256(path.read_bytes()).hexdigest()

index = destination / 'index.html'
text = index.read_text(encoding='utf-8')
text = text.replace('<head>', '<head><script src="../isolation.js"></script><script src="../dialogs.js"></script>', 1)
# Optional upstream version-history uses synchronous browser confirmations.
# Retain core engine autosave and file export; do not include that addon.
text = re.sub(r'<script src="backup\.js[^\"]*"></script>', '', text)
text = text.replace('</html>', '<script src="../adapter.js"></script></html>')
text = re.sub(r'<img class="logo"[^>]*>', '', text)
text = re.sub(r'<title>.*?</title>', '<title>mindX RoboLab</title>', text)
text = text.replace('href="logo.png"', 'href="/mindx-logo-color-mark.png"')
text = text.replace('</style>', 'header h1,#btnAbout,#simExtLink{display:none!important}</style>', 1)
index.write_text(text, encoding='utf-8')

def patch(name, replacements):
    path = destination / name
    content = path.read_text(encoding='utf-8')
    for before, after in replacements:
        if before not in content:
            raise RuntimeError(f'Upstream dialog patch drift: {name}: {before}')
        content = content.replace(before, after)
    path.write_text(content, encoding='utf-8')

patch('bc.js', [("querySelector('#bcClear').onclick = () =>", "querySelector('#bcClear').onclick = async () =>"), ('!confirm(', '!await window.robolabDialogs.confirm('), ('alert(', 'window.robolabDialogs.alert(')])
patch('rfguide.js', [('function load(key)', 'async function load(key)'), ('!window.confirm(', '!await window.robolabDialogs.confirm(')])
patch('simsave.js', [('!window.confirm(', '!await window.robolabDialogs.confirm(')])
patch('classes.js', [('prompt(', 'window.robolabDialogs.copy(')])
(destination / 'source-manifest.json').write_text(json.dumps({'repository':'https://github.com/daewonlee81-glitch/mindstorms-cad','revision':revision,'originalSha256':manifest,'applicationLicense':'No top-level application license supplied upstream; original notices preserved.','integrationPatches':['storage isolation bootstrap','custom dialogs','omit optional native-dialog version-history addon','runtime-ready adapter']}, indent=2), encoding='utf-8')
print(f'Imported {len(manifest)} runtime assets at {revision}; independent of existing modules.')
