import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'http://127.0.0.1:4187';
const output = 'qa-screenshots/commerce-preview';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // Keep this QA pass local even if a future page adds an external resource.
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const paths = ['/', '/commerce/', '/about/', '/data-partnerships/', '/services/'];
  const internal = new Set();
  for (const width of [1440, 1024, 961, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width > 960 ? 1000 : 844 });
    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(image => image.decode());
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow, noarchive');
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        broken: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(href => href.startsWith('/')),
      }));
      assert.equal(layout.overflow, false, `Overflow ${path} at ${width}`);
      assert.deepEqual(layout.broken, [], `Images ${path} at ${width}`);
      if (width > 960) {
        const header = await page.locator('.site-header').evaluate(header => {
          const elements = ['.brand', '.desktop-nav', '.header-contact'].map(selector => header.querySelector(selector).getBoundingClientRect());
          return { separated: elements.slice(1).every((rect, i) => rect.left >= elements[i].right), within: elements.every(rect => rect.left >= 0 && rect.right <= innerWidth) };
        });
        assert.ok(header.separated && header.within, `Header overlap ${path} at ${width}`);
        assert.equal(await page.locator('.desktop-nav').getByRole('link', { name: 'Digital Services', exact: true }).count(), 1);
      }
      layout.links.forEach(link => internal.add(link));
      if (width === 1440 || width === 390) {
        await page.addScriptTag({ url: origin + '/__qa__/axe.js' });
        const a11y = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) })));
        assert.deepEqual(a11y, [], `Accessibility ${path} at ${width}`);
        await page.screenshot({ path: `${output}/${path.split('/').filter(Boolean).join('-') || 'home'}-${width}.png`, fullPage: true });
      }
      results.push({ path, width, passed: true });
    }
  }
  await page.goto(origin + '/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Commerce', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/commerce/');
  assert.equal(await page.locator('a[href^="mailto:hello"]').count(), 2);
  assert.equal(await page.locator('a[href^="mailto:hello"]').first().getAttribute('href'), 'mailto:hello@anchorlineai.com?subject=Commerce%20Partnership%20Inquiry');
  for (const link of internal) {
    const response = await context.request.get(origin + link);
    assert.equal(response.status(), 200, `Broken link ${link}`);
  }
  const blocked = await context.request.post(origin + '/__preview_submission_test__');
  assert.equal(blocked.status(), 405);
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify({ results, internalLinks: internal.size, errors, submissionStatus: blocked.status() }, null, 2));
  console.log(`Passed ${results.length} page/viewport checks, ${paths.length * 2} accessibility checks, ${internal.size} local links, mobile navigation, email hrefs, and submission blocking.`);
} finally {
  await browser.close();
}
