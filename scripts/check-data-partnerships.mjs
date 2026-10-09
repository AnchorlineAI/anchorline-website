import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const html = await read('dist/data-partnerships/index.html');
const privacy = await read('dist/privacy/index.html');
const sitemap = await read('dist/sitemap.xml');
const production = process.env.CONTEXT === 'production';
const origin = production ? 'https://anchorlineai.com' : process.env.DEPLOY_PRIME_URL || 'http://localhost:4321';

assert(html.includes(`content="${production ? 'index, follow' : 'noindex, nofollow, noarchive'}"`), 'Index only in production');
assert(html.includes(`href="${origin}/data-partnerships/"`), 'Context-specific canonical');
assert.equal(sitemap.includes('https://anchorlineai.com/data-partnerships/'), production, 'Only the production sitemap includes the page');
assert(!/<(?:form|input|textarea|select)\b/i.test(html), 'No form, upload or intake controls');
assert(html.includes('href="#data-buyers"') && html.includes('id="data-buyers"'), 'Buyer anchor must resolve');
for (const subject of ['Data%20Partnership%20Inquiry', 'Data%20Sourcing%20Partnership%20Inquiry']) {
  assert(html.includes(`href="mailto:hello@anchorlineai.com?subject=${subject}"`), `Email subject: ${subject}`);
}
assert.equal((html.match(/<details\b/g) || []).length, 5, 'Five native accessible FAQs');
assert(html.includes('We do not currently have signed buyer relationships.'), 'Relationship status must remain explicit');
assert(html.includes('Anchorline may receive a referral or sourcing fee'), 'Compensation disclosure');
assert(html.includes("we don&#39;t negotiate the agreement or handle the data transfer") || html.includes("we don't negotiate the agreement or handle the data transfer"), 'Coordination boundary');
assert(!/\$750|\b(?:micro1|Mercor|Handshake|Turing|Appen|Troveo|Protege|Roboflow|TAUS)\b/.test(html), 'No audit price or implied named buyer affiliation');
for (const route of ['index', 'services/index']) {
  assert(!(await read(`dist/${route}.html`)).includes('/data-partnerships/'), 'No site-wide promotion');
}
for (const text of ['Data partnership inquiries', 'not a submission form', "Email links can", 'sharing your inquiry']) {
  assert(privacy.includes(text), `Proposed privacy notice: ${text}`);
}
const analyticsLoader = 'https://www.googletagmanager.com/gtag/js?';
assert.equal(html.includes(analyticsLoader), production, 'Existing analytics behavior must remain production-only');
console.log(`Data Partnerships checks passed (${production ? 'production-shaped local build' : 'preview'}): context-specific indexing, canonical, email subjects, disclosures, privacy, intake boundary and navigation.`);
