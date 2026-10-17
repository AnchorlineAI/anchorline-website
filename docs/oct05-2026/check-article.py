"""Deterministic output check, adapted from the existing October 3 checker."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import hashlib
import json
import sys
import xml.etree.ElementTree as ET

SLUG = 'ai-visibility-scores-buyer-questions'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)
    def walk(self):
        yield self
        for c in self.children:
            if isinstance(c, Node): yield from c.walk()

class Document(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.root = Node()
        self.stack = [self.root]
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID: self.stack.append(node)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, data): self.stack[-1].children.append(data)

production = '--production' in sys.argv
raw = Path(f'dist/insights/{SLUG}/index.html').read_text(encoding='utf-8')
nodes = list(Document(raw).root.walk())

def by_class(name): return next(n for n in nodes if name in n.attrs.get('class', '').split())

meta = {n.attrs.get('name', n.attrs.get('property')): n.attrs.get('content') for n in nodes if n.tag == 'meta'}
body = []
for n in by_class('article-prose').children:
    if isinstance(n, Node) and n.tag == 'h2' and n.text() == 'Photo': break
    if isinstance(n, Node): body.append(n.text())
words = len((by_class('r-lede').text() + ' ' + ' '.join(body)).split())
cta = by_class('audit-close')
cta_text = ' '.join(n.text() for n in cta.walk() if n.tag in {'h2', 'p', 'a'})
total = words + len(cta_text.split())
assert 200 <= total <= 350, {'articleAndDeck': words, 'withSharedCTA': total}
assert meta['description'] == by_class('r-lede').text()
assert meta['og:type'] == 'article'
assert meta['og:image:width'] == '1600' and meta['og:image:height'] == '900'
assert meta['twitter:card'] == 'summary_large_image'
assert meta['robots'] == ('index, follow' if production else 'noindex, nofollow, noarchive')
canonical = next(n.attrs['href'] for n in nodes if n.tag == 'link' and n.attrs.get('rel') == 'canonical')
assert urlsplit(canonical).path == f'/insights/{SLUG}/'
if production: assert canonical == f'https://anchorlineai.com/insights/{SLUG}/'
schemas = [json.loads(n.text()) for n in nodes if n.tag == 'script' and n.attrs.get('type') == 'application/ld+json']
article = next(a for s in schemas for a in s.get('@graph', [s]) if a.get('@type') == 'Article')
assert article['headline'] == next(n.text() for n in nodes if n.tag == 'h1')
assert article['description'] == meta['description']
assert article['author']['name'] == 'Kris McFadden'
assert article['datePublished'] == '2026-10-05T00:00:00.000Z'
assert urlsplit(article['image']).path == urlsplit(meta['og:image']).path
assert production or not any('googletagmanager' in n.attrs.get('src', '') for n in nodes)
ledger = json.loads(Path('docs/oct05-2026/PHOTO-RIGHTS.json').read_text(encoding='utf-8'))
assert hashlib.sha256(Path(ledger['file']).read_bytes()).hexdigest().upper() == ledger['sha256']
assert ledger['source'] in raw and ledger['license'] in raw
image = next(n for n in by_class('insight-article-image').walk() if n.tag == 'img')
assert image.attrs['alt'] == ledger['alt'] and image.attrs['width'] == '1600' and image.attrs['height'] == '900'
if production:
    locations = [n.text for n in ET.parse('dist/sitemap.xml').iter() if n.tag.endswith('loc')]
    assert canonical in locations
else:
    assert Path('dist/sitemap.xml').read_text().strip() == 'Not found'
for file in ['dist/index.html', 'dist/insights/index.html']:
    assert '/insights/growth-audit-website-search-lead-generation/' in Path(file).read_text(encoding='utf-8')
assert not list(Path('src/pages').rglob('*rss*')), 'Existing feed found; extend verification'
post = Path('docs/oct05-2026/LINKEDIN-DRAFT.md').read_text(encoding='utf-8').split('## Exact Post Text\n', 1)[1]
assert post.count('https://') == 1
assert post.count('We build the systems that help good organizations grow.') == 1
print(json.dumps({'wordsIncludingDeck': words, 'wordsIncludingDeckAndSharedCTA': total, 'context': 'production' if production else 'preview', 'canonical': canonical, 'schema': 'pass', 'socialMetadata': 'pass', 'rightsHash': 'pass', 'sitemap': 'pass', 'feed': 'No existing RSS endpoint', 'descriptionCharacters': len(meta['description']), 'postWords': len(post.split())}, indent=2))
