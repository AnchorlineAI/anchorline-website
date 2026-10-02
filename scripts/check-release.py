"""Check the redesigned static release without sending requests or form data."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path('dist').resolve()

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.text, self.forms, self.images = [], [], [], []
        self.h1 = 0
        self.ids = set()
        self.controls = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'form': self.forms.append(attrs)
        if tag == 'img': self.images.append(attrs)
        if attrs.get('id'): self.ids.add(attrs['id'])
        if tag in ('input', 'textarea', 'select'): self.controls.append(attrs)
        for key in ('href', 'src'):
            if attrs.get(key): self.refs.append(attrs[key])
    def handle_data(self, data):
        self.text.append(data)

pages = {}
for file in ROOT.rglob('*.html'):
    page = Page()
    page.feed(file.read_text(encoding='utf-8'))
    pages[file] = page
errors = []
references = set()
if len(pages) < 39: errors.append('Expected all 39 release pages')
for file, page in pages.items():
    label = file.relative_to(ROOT).as_posix()
    if page.h1 != 1: errors.append(f'{label}: expected one H1')
    if any('alt' not in image for image in page.images): errors.append(f'{label}: missing image alt')
    if page.forms and label != 'growth-audit/index.html': errors.append(f'{label}: unexpected form')
    if label == 'growth-audit/index.html':
        if len(page.forms) != 1 or page.forms[0].get('name') != 'growth-audit': errors.append('Existing Netlify form identity changed')
        required = {'form-name', 'subject', 'bot-field', 'name', 'email', 'website', 'business_type', 'growth_problem'}
        if {c.get('name') for c in page.controls} != required: errors.append('Existing form field contract changed')
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else file.parent / unquote(url.path) if url.path else file
        if target.is_dir(): target = target / 'index.html'
        target = target.resolve()
        references.add(str(target))
        if not target.is_file(): errors.append(f'{label}: missing {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids: errors.append(f'{label}: missing fragment {ref}')
home = ' '.join(pages[ROOT / 'index.html'].text)
if re.search(r'\$\s*\d|\bfree\b|\bno[ -]cost\b', home, re.I): errors.append('Homepage must not display pricing')
for route in ('pricing', 'website-search-audit'):
    if '$750' not in ' '.join(pages[ROOT / route / 'index.html'].text): errors.append(f'{route}: audit price missing')
for file, page in pages.items():
    if 'Preview inquiry' in ' '.join(page.text): errors.append(f'{file}: prototype interaction leaked into release')
print(json.dumps({'pages': len(pages), 'local_references': len(references), 'errors': errors}, indent=2))
raise SystemExit(bool(errors))
