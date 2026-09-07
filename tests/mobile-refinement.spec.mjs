import { test, expect } from '@playwright/test';
for (const width of [320,390]) {
 test(`mobile-specific hero composition ${width}`,async({page})=>{
  await page.setViewportSize({width,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{const heading=document.querySelector('h1'),visual=document.querySelector('.home-hero>.engine-visual'),cta=document.querySelector('.hero-actions>.button'),core=document.querySelector('.engine-core strong');const r=core.getBoundingClientRect();return{headline:parseFloat(getComputedStyle(heading).fontSize),visualTop:visual.getBoundingClientRect().top,visualBottom:visual.getBoundingClientRect().bottom,ctaWidth:cta.getBoundingClientRect().width,centerTextUncovered:!!document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)?.closest('.engine-core')}});
  expect(metrics.headline).toBeLessThanOrEqual(45);expect(metrics.visualTop).toBeLessThan(280);expect(metrics.visualBottom).toBeLessThan(550);expect(metrics.ctaWidth).toBeLessThan(width*.8);expect(metrics.centerTextUncovered).toBe(true);
 });
}
