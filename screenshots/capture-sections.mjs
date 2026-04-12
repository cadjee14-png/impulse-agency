import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/normancadjee/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = __dirname;
const BASE_URL = 'http://localhost:3000';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function captureSectionById(page, name, id, padding = 20) {
  try {
    const el = await page.$(`#${id}`);
    if (!el) { console.log(`  [SKIP] #${id}`); return; }
    const box = await el.boundingBox();
    if (!box) return;
    const vp = page.viewportSize();
    await page.evaluate(y => window.scrollTo(0, y), Math.max(0, box.y - 60));
    await delay(400);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${name}.png`),
      clip: {
        x: 0,
        y: Math.max(0, box.y - padding),
        width: vp.width,
        height: box.height + padding * 2,
      },
    });
    console.log(`  [OK] ${name}.png  (h=${Math.round(box.height)}px)`);
  } catch (e) {
    console.log(`  [ERR] ${name}: ${e.message}`);
  }
}

async function captureSectionBySelector(page, name, selector, padding = 20) {
  try {
    const el = await page.$(selector);
    if (!el) { console.log(`  [SKIP] ${selector}`); return; }
    const box = await el.boundingBox();
    if (!box) return;
    const vp = page.viewportSize();
    await page.evaluate(y => window.scrollTo(0, y), Math.max(0, box.y - 60));
    await delay(400);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${name}.png`),
      clip: {
        x: 0,
        y: Math.max(0, box.y - padding),
        width: vp.width,
        height: box.height + padding * 2,
      },
    });
    console.log(`  [OK] ${name}.png  (h=${Math.round(box.height)}px)`);
  } catch (e) {
    console.log(`  [ERR] ${name}: ${e.message}`);
  }
}

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const dist = 400;
      const t = setInterval(() => {
        window.scrollBy(0, dist);
        total += dist;
        if (total >= document.body.scrollHeight) { clearInterval(t); resolve(); }
      }, 80);
    });
  });
  await delay(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(400);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // ── HOMEPAGE SECTIONS (Desktop 1440) ──────────────────────────────────────
  console.log('\n════ HOMEPAGE SECTIONS — Desktop 1440 ════');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    await captureSectionBySelector(page, 'section-header', 'header', 10);
    await captureSectionById(page, 'section-hero', 'hero', 0);
    await captureSectionById(page, 'section-stats', 'stats', 0);
    await captureSectionById(page, 'section-services', 'services', 0);
    await captureSectionById(page, 'section-realisations', 'realisations', 0);
    await captureSectionById(page, 'section-case-0', 'case-0', 10);
    await captureSectionById(page, 'section-case-1', 'case-1', 10);
    await captureSectionById(page, 'section-case-2', 'case-2', 10);
    await captureSectionById(page, 'section-process', 'process', 0);
    await captureSectionById(page, 'section-testimonials', 'testimonials', 0);
    await captureSectionById(page, 'section-integrations', 'integrations', 0);
    await captureSectionById(page, 'section-audit-cta', 'audit', 0);
    await captureSectionBySelector(page, 'section-footer', 'footer', 0);

    // Scroll to hero and capture above-fold
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'section-hero-above-fold.png') });
    console.log('  [OK] section-hero-above-fold.png');

    await ctx.close();
  }

  // ── HOMEPAGE SECTIONS (Mobile 375) ────────────────────────────────────────
  console.log('\n════ HOMEPAGE SECTIONS — Mobile 375 ════');
  {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    await captureSectionById(page, 'mobile-section-hero', 'hero', 0);
    await captureSectionById(page, 'mobile-section-stats', 'stats', 0);
    await captureSectionById(page, 'mobile-section-services', 'services', 0);
    await captureSectionById(page, 'mobile-section-realisations', 'realisations', 0);
    await captureSectionById(page, 'mobile-section-process', 'process', 0);
    await captureSectionById(page, 'mobile-section-testimonials', 'testimonials', 0);
    await captureSectionById(page, 'mobile-section-integrations', 'integrations', 0);
    await captureSectionById(page, 'mobile-section-audit-cta', 'audit', 0);
    await captureSectionBySelector(page, 'mobile-section-footer', 'footer', 0);

    await ctx.close();
  }

  // ── /audit PAGE SECTIONS ──────────────────────────────────────────────────
  console.log('\n════ /audit PAGE SECTIONS ════');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/audit`, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    // Inspect /audit DOM
    const auditInfo = await page.evaluate(() => {
      const els = document.querySelectorAll('section, [id], header, footer, form, main > *, main > div > *');
      return [...els].map(el => ({
        tag: el.tagName.toLowerCase(),
        id: el.id,
        classes: (el.className || '').toString().slice(0, 150),
        text: (el.textContent || '').trim().slice(0, 100),
        top: Math.round(el.getBoundingClientRect().top + window.pageYOffset),
        height: Math.round(el.getBoundingClientRect().height),
      }));
    });
    console.log('  Audit page DOM:', JSON.stringify(auditInfo, null, 2));

    // Above fold
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-above-fold.png') });
    console.log('  [OK] audit-above-fold.png');

    // Try common patterns
    for (const [name, sel] of [
      ['audit-section-header', 'header'],
      ['audit-section-hero', 'section:first-of-type'],
      ['audit-section-form', 'form'],
      ['audit-section-footer', 'footer'],
    ]) {
      await captureSectionBySelector(page, name, sel, 0);
    }

    await ctx.close();
  }

  await browser.close();
  console.log(`\nAll section screenshots saved to: ${SCREENSHOTS_DIR}`);
}

run().catch(err => { console.error('Fatal:', err); process.exit(1); });
