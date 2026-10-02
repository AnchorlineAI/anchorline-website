"""Validate the two built articles; no browser, vendor writes or form submissions."""
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import json
import re
import sys
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

SLUGS = ['shopify-canvas-sidekick-store-design', 'google-ai-content-manual-fact-checking']
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
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in VOID: self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, data): self.stack[-1].children.append(data)

production = '--production' in sys.argv
results = []
for slug in SLUGS:
    raw = Path(f'dist/insights/{slug}/index.html').read_text(encoding='utf-8')
    nodes = list(Document(raw).root.walk())
    def by_class(name):
        return next(n for n in nodes if name in n.attrs.get('class', '').split())
    meta = {n.attrs.get('name', n.attrs.get('property')): n.attrs.get('content') for n in nodes if n.tag == 'meta'}
    headline = next(n.text() for n in nodes if n.tag == 'h1')
    title = next(n.text() for n in nodes if n.tag == 'title')
    prose = []
    for child in by_class('article-prose').children:
        if isinstance(child, Node) and child.tag == 'h2' and child.text() == 'Photo': break
        if isinstance(child, Node): prose.append(child.text())
    words = len((by_class('r-lede').text() + ' ' + ' '.join(prose)).split())
    assert 200 <= words <= 350, (slug, words)
    assert meta['description'] == by_class('r-lede').text()
    assert meta['og:type'] == 'article'
    assert meta['og:image:width'] == '1600' and meta['og:image:height'] == '900'
    assert meta['twitter:card'] == 'summary_large_image'
    assert meta['robots'] == ('index, follow' if production else 'noindex, nofollow, noarchive')
    canonical = next(n.attrs['href'] for n in nodes if n.tag == 'link' and n.attrs.get('rel') == 'canonical')
    assert urlsplit(canonical).path == f'/insights/{slug}/'
    if production: assert canonical == f'https://anchorlineai.com/insights/{slug}/'
    schemas = [json.loads(n.text()) for n in nodes if n.tag == 'script' and n.attrs.get('type') == 'application/ld+json']
    article = next(item for schema in schemas for item in schema.get('@graph', [schema]) if item.get('@type') == 'Article')
    assert article['headline'] == headline
    assert article['description'] == meta['description']
    assert article['author']['name'] == 'Kris McFadden'
    assert article['datePublished'] == '2026-10-02T00:00:00.000Z'
    assert urlsplit(article['image']).path == urlsplit(meta['og:image']).path
    if production: assert article['image'] == meta['og:image']
    assert not any('googletagmanager' in n.attrs.get('src', '') for n in nodes) or production
    assert 'https://unsplash.com/license' in raw
    results.append({'slug': slug, 'wordsIncludingDeckAndCTA': words, 'title': title, 'titleCharacters': len(title), 'descriptionCharacters': len(meta['description']), 'canonical': canonical, 'schema': 'pass', 'social': 'pass'})

ledger = json.loads(Path('docs/oct02-2026/PHOTO-RIGHTS.json').read_text())
for entry in ledger:
    assert hashlib.sha256(Path(entry['file']).read_bytes()).hexdigest() == entry['sha256']
if production:
    sitemap = ET.parse('dist/sitemap.xml')
    locations = [n.text for n in sitemap.iter() if n.tag.endswith('loc')]
    for slug in SLUGS: assert f'https://anchorlineai.com/insights/{slug}/' in locations
else:
    assert Path('dist/sitemap.xml').read_text().strip() == 'Not found', 'Preview sitemap must not expose URLs'
for file in ['dist/index.html', 'dist/insights/index.html']:
    assert '/insights/growth-audit-website-search-lead-generation/' in Path(file).read_text(encoding='utf-8')
assert not list(Path('src/pages').rglob('*rss*')), 'Feed found: extend verification'
print(json.dumps({'context': 'production' if production else 'preview', 'articles': results, 'rightsHashes': 'pass', 'sitemap': 'pass', 'featuredGrowthReview': 'preserved', 'feed': 'No existing RSS endpoint'}, indent=2))
