import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/normancadjee/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = __dirname;
const BASE_URL = 'http://localhost:3000';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * Capture a section by scrolling to it and taking a full-element screenshot.
 * Works by scrolling to the element, then capturing multi-viewport slices if needed.
 */
async function captureElement(page, name, selector, vp) {
  try {
    const el = await page.$(selector);
    if (!el) { console.log(`  [SKIP] ${name} — selector not found`); return; }

    await el.scrollIntoViewIfNeeded();
    await delay(500);

    const box = await el.boundingBox();
    if (!box || box.height === 0) { console.log(`  [SKIP] ${name} — zero height`); return; }

    // For tall sections, we'll capture via full-page clip
    // Key: clip is relative to the FULL page, not the viewport
    // We need to scroll to a position where the element is visible, then clip

    const sectionHeight = box.height;

    if (sectionHeight <= vp.height * 1.5) {
      // Short enough: scroll so element is centered, take single shot
      const targetScrollY = Math.max(0, box.y + box.height / 2 - vp.height / 2);
      await page.evaluate(y => window.scrollTo(0, y), targetScrollY);
      await delay(350);
      const visibleTop = box.y - targetScrollY;
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${name}.png`),
        clip: {
          x: 0,
          y: Math.max(0, visibleTop),
          width: vp.width,
          height: Math.min(sectionHeight, vp.height - Math.max(0, visibleTop)),
        },
      });
    } else {
      // Tall section: use fullPage screenshot with clip
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${name}.png`),
        fullPage: true,
        clip: {
          x: 0,
          y: Math.max(0, box.y - 10),
          width: vp.width,
          height: box.height + 10,
        },
      });
    }
    console.log(`  [OK] ${name}.png  (y=${Math.round(box.y)}, h=${Math.round(sectionHeight)}px)`);
  } catch (e) {
    console.log(`  [ERR] ${name}: ${e.message.split('\n')[0]}`);
  }
}

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const dist = 500;
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
  const VP_D = { width: 1440, height: 900 };
  const VP_M = { width: 375, height: 812 };

  // ── HOMEPAGE — Desktop Sections ──────────────────────────────────────────
  console.log('\n════ HOMEPAGE SECTIONS — Desktop 1440 ════');
  {
    const ctx = await browser.newContext({ viewport: VP_D });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    const sections = [
      ['section-header',        'header'],
      ['section-hero',          '#hero'],
      ['section-stats',         '#stats'],
      ['section-services',      '#services'],
      ['section-realisations',  '#realisations'],
      ['section-case-0',        '#case-0'],
      ['section-case-1',        '#case-1'],
      ['section-case-2',        '#case-2'],
      ['section-process',       '#process'],
      ['section-testimonials',  '#testimonials'],
      ['section-integrations',  '#integrations'],
      ['section-audit-cta',     '#audit'],
      ['section-footer',        'footer'],
    ];

    for (const [name, sel] of sections) {
      await captureElement(page, name, sel, VP_D);
    }

    // Above-the-fold
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'section-hero-above-fold.png') });
    console.log('  [OK] section-hero-above-fold.png');

    await ctx.close();
  }

  // ── HOMEPAGE — Mobile Sections ────────────────────────────────────────────
  console.log('\n════ HOMEPAGE SECTIONS — Mobile 375 ════');
  {
    const ctx = await browser.newContext({
      viewport: VP_M,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    const sections = [
      ['mobile-section-hero',         '#hero'],
      ['mobile-section-stats',        '#stats'],
      ['mobile-section-services',     '#services'],
      ['mobile-section-realisations', '#realisations'],
      ['mobile-section-process',      '#process'],
      ['mobile-section-testimonials', '#testimonials'],
      ['mobile-section-integrations', '#integrations'],
      ['mobile-section-audit-cta',    '#audit'],
      ['mobile-section-footer',       'footer'],
    ];

    for (const [name, sel] of sections) {
      await captureElement(page, name, sel, VP_M);
    }

    await ctx.close();
  }

  // ── /audit PAGE — Desktop Sections ───────────────────────────────────────
  console.log('\n════ /audit PAGE SECTIONS — Desktop ════');
  {
    const ctx = await browser.newContext({ viewport: VP_D });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/audit`, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    const sections = [
      ['audit-section-nav',    'nav'],
      ['audit-section-header', 'header'],
      ['audit-section-main',   'main, div:not(nav):not(header):not(footer):first-of-type'],
      ['audit-section-form',   'form'],
      ['audit-section-footer', 'footer'],
    ];

    for (const [name, sel] of sections) {
      await captureElement(page, name, sel, VP_D);
    }

    // Above fold
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-above-fold-desktop.png') });
    console.log('  [OK] audit-above-fold-desktop.png');

    // Bottom of audit page (footer area)
    const h = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate(y => window.scrollTo(0, y), h);
    await delay(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-bottom.png') });
    console.log('  [OK] audit-bottom.png');

    await ctx.close();
  }

  // ── /audit PAGE — Mobile ──────────────────────────────────────────────────
  console.log('\n════ /audit PAGE SECTIONS — Mobile ════');
  {
    const ctx = await browser.newContext({
      viewport: VP_M,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/audit`, { waitUntil: 'networkidle' });
    await delay(1500);
    await scrollFullPage(page);

    await captureElement(page, 'audit-mobile-form', 'form', VP_M);
    await captureElement(page, 'audit-mobile-footer', 'footer', VP_M);

    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'audit-mobile-above-fold.png') });
    console.log('  [OK] audit-mobile-above-fold.png');

    await ctx.close();
  }

  await browser.close();
  console.log(`\nAll section screenshots saved to: ${SCREENSHOTS_DIR}`);
}

run().catch(err => { console.error('Fatal:', err); process.exit(1); });
