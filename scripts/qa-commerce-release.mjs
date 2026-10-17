import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:4187';
const output = `qa-screenshots/commerce-${origin.startsWith('https:') ? 'live' : 'production'}`;
const paths = ['/', '/commerce/', '/about/', '/services/', '/data-partnerships/'];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  const context = await browser.newContext();
  // Inspect published output without generating GA traffic or submitting inquiries.
  await context.route('**/*', route => {
    const request = route.request();
    return new URL(request.url()).origin === origin && ['GET', 'HEAD'].includes(request.method()) ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://anchorlineai.com' + path);
      assert.equal(await page.locator('.preview-strip').count(), 0);
      assert.equal(await page.locator('script[src="https://www.googletagmanager.com/gtag/js?id=G-KPQ0G7C2YY"]').count(), 1);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(image => image.decode());
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      assert.equal(await page.locator('a[href^="mailto:Kris" i]').count(), 0);
      const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(a11y.violations.map(v => v.id), []);
      if (path === '/') {
        assert.ok((await page.locator('main').innerText()).includes('operate an online retail business'));
        assert.ok(!(await page.locator('main').innerText()).includes('$750'));
        assert.equal(await page.locator('.feature a').getAttribute('href'), '/insights/growth-audit-website-search-lead-generation/');
      }
      if (path === '/commerce/') {
        assert.equal(await page.locator('a[href="mailto:hello@anchorlineai.com?subject=Commerce%20Partnership%20Inquiry"]').count(), 2);
        assert.ok((await page.locator('main').innerText()).includes('Commerce is our own retail operation.'));
      }
      await page.screenshot({ path: `${output}/${path.split('/').filter(Boolean).join('-') || 'home'}-${width}.png`, fullPage: true });
      results.push({ path, width, passed: true });
    }
  }
  await page.goto(origin + '/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Digital Services', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/services/');
  const sitemap = await context.request.get(origin + '/sitemap.xml');
  assert.equal(sitemap.status(), 200);
  assert.ok((await sitemap.text()).includes('<loc>https://anchorlineai.com/commerce/</loc>'));
  const robots = await context.request.get(origin + '/robots.txt');
  // The loopback review server intentionally overrides robots even for a production build.
  if (origin.startsWith('http://127.0.0.1:')) {
    assert.equal(await robots.text(), 'User-agent: *\nDisallow: /\n');
    assert.ok((await readFile('dist/robots.txt', 'utf8')).includes('Allow: /'));
  } else {
    assert.ok((await robots.text()).includes('Allow: /'));
  }
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify({ origin, results, errors, externalRequestsBlocked: true, submissions: 0 }, null, 2));
  console.log(`Passed ${results.length} production route/viewport and accessibility checks, metadata, GA loader presence, commerce contact, featured article, mobile navigation, sitemap and robots. No analytics requests or submissions sent.`);
} finally {
  await browser.close();
}
