"""Show only mindX branding in the vendored Gears UI. Idempotent; credits text stays in About and in RoboLab sources."""
import re
from pathlib import Path

dest = Path('public/robolab/gears')
index = dest / 'index.html'
html = index.read_text(encoding='utf-8')
html = re.sub(r'<link rel="icon" href="favicon-\d+\.png" sizes="\d+x\d+">\s*', '', html)
html = html.replace('<title>GearsBot</title>', '<title>mindX RoboLab</title><link rel="icon" type="image/png" href="/mindx-logo-color-mark.png">')
html = html.replace('<img class="gearsIcon" src="favicon-32.png">\n    <div>GearsBot</div>',
                    '<img class="gearsIcon mindxMark" src="/mindx-logo-color-mark.png" alt="mindX">\n    <div>RoboLab</div>')
if 'mindx-brand' not in html:
    html = html.replace('</head>', '<style id="mindx-brand">header{background:#102b2b!important}header .mindxMark{background:#fff;border-radius:3px;padding:2px}'
                        'header #projectName{background:#1d3f3c!important;border-color:#4b655e!important}</style>\n</head>', 1)
if 'GearsBot</div>' in html or 'favicon-32.png' in html:
    raise RuntimeError('Gears header branding drifted; review index.html')
index.write_text(html, encoding='utf-8')
tools = {'configurator.html': ('GearsBot Robot Configurator', 'Thiết kế robot'),
         'builder.html': ('GearsBot World Builder', 'Tạo sa bàn'),
         'arena.html': ('GearsBot Arena', 'Đấu trường')}
for filename, (old, label) in tools.items():
    path = dest / filename
    page = path.read_text(encoding='utf-8')
    page = re.sub(r'<link rel="icon" href="favicon-\d+\.png" sizes="\d+x\d+">\s*', '', page)
    if '../isolation.js' not in page:
        page = page.replace('<head>', '<head><script src="../isolation.js" data-storage-prefix="mindx-robolab-gears:v1:"></script><script src="../dialogs.js"></script>', 1)
    page = page.replace(f'<title>{old}</title>', f'<title>mindX RoboLab · {label}</title><link rel="icon" type="image/png" href="/mindx-logo-color-mark.png">')
    page = page.replace(f'<img class="gearsIcon" src="favicon-32.png">\n    <div>{old}</div>',
                        f'<img class="gearsIcon mindxMark" src="/mindx-logo-color-mark.png" alt="mindX">\n    <div>RoboLab · {label}</div>')
    if 'mindx-brand' not in page:
        page = page.replace('</head>', '<style id="mindx-brand">header{background:#102b2b!important}header .mindxMark{background:#fff;border-radius:3px;padding:2px}header input{background:#1d3f3c!important;border-color:#4b655e!important}</style>\n</head>', 1)
    if 'GearsBot' in page.split('<main')[0].split('</header>')[0].split('<body>')[-1] or 'favicon-32.png' in page:
        raise RuntimeError('Gears tool branding drifted: ' + filename)
    path.write_text(page, encoding='utf-8')
print('mindX branding applied to Gears UI')
