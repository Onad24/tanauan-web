#!/usr/bin/env python3
"""OCR images in drive_data that contain text data (citizens charters, checklists, tarp CC)."""
import os, sys
sys.path.insert(0, '/tmp/drivetools/lib/python3.11/site-packages')
from rapidocr_onnxruntime import RapidOCR

engine = RapidOCR()

root = '/home/krixan/Documents/tanauan/tanauan-leyte-clone/migration/drive_data'
outdir = '/home/krixan/Documents/tanauan/tanauan-leyte-clone/migration/extracted_ocr'
os.makedirs(outdir, exist_ok=True)

# Images that likely contain TEXT (not just photos of places/events)
# Filter: citizens charter, checklist, CC, tarp, org chart, verification
TEXT_KEYWORDS = ['citizens', 'citizen', 'cc ', 'cc.', 'charter', 'checklist', 'tarp', 'organiz', 'verification', 'duties', 'responsib']

def should_ocr(relpath):
    lp = relpath.lower()
    # skip tourist spot photos and accomplishment event photos (MCR, MHO subfolders)
    if 'tourism spots' in lp or 'shoreline' in lp:
        return False
    # skip event pics
    if any(k in lp for k in ['school based', 'immunization', 'case finding', 'brap', 'accomplishments/']):
        return False
    return any(k in lp for k in TEXT_KEYWORDS)

def run_ocr(path, relpath):
    try:
        result, _ = engine(path)
        if not result:
            return False
        text = '\n'.join([line[1] for line in result])
        if not text.strip():
            return False
        outname = relpath.replace('/', '__').replace(' ', '_') + '.txt'
        with open(os.path.join(outdir, outname), 'w') as fh:
            fh.write(text)
        print(f"OCR OK: {relpath} ({len(text)} chars)")
        return True
    except Exception as e:
        print(f"OCR ERR: {relpath}: {e}")
        return False

count = 0
for dirpath, _, files in os.walk(root):
    for f in files:
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            p = os.path.join(dirpath, f)
            rel = os.path.relpath(p, root)
            if should_ocr(rel):
                if run_ocr(p, rel):
                    count += 1
print(f"\nTotal OCR'd: {count}")