"""Translate upstream LDraw center/segment references to editor surface references."""
import json
from pathlib import Path

root = Path('public/assembly/lego')
catalog = json.loads((root/'parts.json').read_text(encoding='utf8'))
raw = json.loads((root/'connectors-ldraw.json').read_text(encoding='utf8'))
result = {}
transform = lambda v: [v[0]*.4, -v[1]*.4, -v[2]*.4]

for row in catalog:
    row.setdefault('defaultColor', int(next(iter(row['colors']))))
    row.setdefault('kitColors', {})
    name = row['name'].lower()
    if name.startswith('technic axle ') and not name[13:14].isdigit():
        row['kind'] = 'body'
    rows = []
    for index, port in enumerate(raw.get(row['id'], [])):
        family = port['t']
        if row['kind'] == 'shaft' and family in ('axlehole', 'pinhole'):
            continue  # Cylinders cut into an axle do not define a usable bore.
        if family in ('axlehole', 'pinhole') and port['l'] < 4:
            continue  # Single-surface analytic guesses are not complete bores.
        normal = transform(port['d'])
        size = sum(x*x for x in normal)**.5
        normal = [x/size for x in normal]
        point = transform(port['p'])
        length = port['l']*.4
        kind = 'pin' if family in ('pin', 'axle', 'stud') else 'hole'
        offsets = [1, -1] if kind == 'hole' and family != 'astud' else [1]
        if family == 'axle':
            offsets = [1, -1]
        for side in offsets:
            axis = [v*side for v in normal]
            distance = length/2 if family in ('pin', 'axle', 'pinhole', 'axlehole') else length if family == 'stud' else 0
            position = [p+n*distance for p,n in zip(point, axis)]
            depth = max(.1, length-.4) if family == 'pin' else length
            ref = {'id': f'lego-{family}-{index}-{side}', 'kind': kind,
                   'point': position, 'normal': axis, 'radius': 2.4, 'depth': depth,
                   'sourceType': family}
            if family in ('axle', 'axlehole'):
                ref.update(profile='lego-cross', width=4.8, key=[0,1,0] if abs(axis[0])>.9 else [1,0,0])
                if kind == 'pin':
                    ref['maxDepth'] = length
            if family in ('stud', 'astud'):
                ref.update(profile='lego-stud')
            if not any(old['kind']==ref['kind'] and old.get('profile')==ref.get('profile') and sum((a-b)**2 for a,b in zip(old['point'],position))<.01 and sum((a-b)**2 for a,b in zip(old['normal'],axis))<.01 for old in rows):
                rows.append(ref)
    result[row['id']] = rows
(root/'parts.json').write_text(json.dumps(catalog,indent=2)+'\n',encoding='utf8')
(root/'connectors.json').write_text(json.dumps({'units':'mm','source':'LDraw / MindStorms CAD; adapted entrance references','parts':result},indent=2)+'\n',encoding='utf8')
metadata = {p['id']: {'defaultColor':p['defaultColor'],'kitColors':p['kitColors']} for p in catalog}
(root/'preview-colors.js').write_text('export const LEGO_PREVIEW_COLORS='+json.dumps(metadata)+';\n',encoding='utf8')
print('Prepared',len(result),'part entries;',sum(bool(v) for v in result.values()),'with conservative references')
