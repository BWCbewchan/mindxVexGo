# Render the pages of an official VEX GO build PDF to PNG, so each step can be used as a
# `view.mjs --ref` picture and checked part by part. The official PDFs (Code Base Rev6,
# Super Code Base Rev3, robot arms...) are the most reliable reference: one numbered step per
# page, parts list per step, and "eye" callouts for the orientation of connectors.
#
# Usage: python scripts/vexgo/pdf-pages.py <build.pdf> <out-dir> [--dpi 110] [--pages 3-8] [--sheet]
#   --sheet  also writes contact sheets (6 pages each) to skim the whole build at once.
# Needs PyMuPDF: `python -m pip install --target <some-dir> pymupdf` and PYTHONPATH=<some-dir>.
import argparse
import os
import sys

try:
    import pymupdf
except ImportError:
    sys.exit('PyMuPDF is not installed: python -m pip install --target <dir> pymupdf, then set PYTHONPATH=<dir>')

parser = argparse.ArgumentParser()
parser.add_argument('pdf')
parser.add_argument('out')
parser.add_argument('--dpi', type=int, default=110)
parser.add_argument('--pages', help='1-based range such as 3-8')
parser.add_argument('--sheet', action='store_true')
args = parser.parse_args()

doc = pymupdf.open(args.pdf)
first, last = 1, doc.page_count
if args.pages:
    a, _, b = args.pages.partition('-')
    first, last = int(a), int(b or a)
os.makedirs(args.out, exist_ok=True)
stem = os.path.splitext(os.path.basename(args.pdf))[0]
files = []
for number in range(first, last + 1):
    path = os.path.join(args.out, f'{stem}-p{number:02d}.png')
    doc[number - 1].get_pixmap(dpi=args.dpi).save(path)
    files.append(path)
if args.sheet:
    for start in range(0, len(files), 6):
        sheet = pymupdf.open()
        page = sheet.new_page(width=1800, height=1000)
        for index, path in enumerate(files[start:start + 6]):
            x, y = (index % 3) * 600, (index // 3) * 500
            page.insert_image(pymupdf.Rect(x, y, x + 600, y + 500), filename=path, keep_proportion=True)
            page.insert_text((x + 5, y + 15), os.path.basename(path), fontsize=12, color=(1, 0, 0))
        page.get_pixmap(dpi=72).save(os.path.join(args.out, f'{stem}-sheet{start // 6 + 1}.png'))
print(f'{len(files)} pages -> {args.out}')
