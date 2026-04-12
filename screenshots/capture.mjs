import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/normancadjee/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = __dirname;
const BASE_URL = 'http://localhost:3000';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureSection(page, name, selectorList, padding = 40) {
  const selectors = Array.isArray(selectorList) ? selectorList : [selectorList];
  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (!el) continue;
      const box = await el.boundingBox();
      if (!box) continue;
      const vp = page.viewportSize();
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${name}.png`),
        clip: {
          x: Math.max(0, box.x - padding),
          y: Math.max(0, box.y - padding),
          width: Math.min(vp.width - Math.max(0, box.x - padding), box.width + padding * 2),
          height: box.height + padding * 2,
        },
      });
      console.log(`  [OK] ${name}.png (via: ${sel})`);
      return;
    } catch (e) {
      // try next selector
    }
  }
  console.log(`  [SKIP] ${name} — no selector matched`);
}

async function scrollFullPage(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await delay(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await delay(600);
}

async function captureScrollshots(page, prefix) {
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const vh = page.viewportSize().height;
  let scrollY = 0;
  let i = 1;
  while (scrollY < pageHeight && i <= 25) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await delay(350);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${prefix}-scroll-${String(i).padStart(2,'0')}.png`),
    });
    console.log(`  [OK] ${prefix}-scroll-${String(i).padStart(2,'0')}.png  (y=${scrollY})`);
    scrollY += vh - 80;
    i++;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  // ───────────────────────────────────────────────────────────────────────────
  // DESKTOP  1440 × 900
  // ───────────────────────────────────────────────────────────────────────────
  console.log('\n════ DESKTOP 1440×900 ════');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(2000);

    // Trigger lazy-loads
    await scrollFullPage(page);

    // Full page
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'full-page-desktop.png'), fullPage: true });
    console.log('  [OK] full-page-desktop.png');

    // Scrolling viewport shots
    await captureScrollshots(page, 'desktop');

    // Section-level captures
    const sections = [
      { name: 'section-nav',          sel: ['nav', 'header', '[class*="Navbar"]', '[class*="navbar"]', '[class*="Header"]'] },
      { name: 'section-hero',         sel: ['[class*="hero"]', '[class*="Hero"]', 'section:first-of-type', '#hero'] },
      { name: 'section-features',     sel: ['[class*="feature"]', '[class*="Feature"]', '#features', '[id*="features"]'] },
      { name: 'section-services',     sel: ['[class*="service"]', '[class*="Service"]', '#services', '[id*="service"]'] },
      { name: 'section-about',        sel: ['[class*="about"]', '[class*="About"]', '#about', '[id*="about"]'] },
      { name: 'section-pricing',      sel: ['[class*="pricing"]', '[class*="Pricing"]', '#pricing', '[id*="pricing"]'] },
      { name: 'section-testimonials', sel: ['[class*="testimonial"]', '[class*="Testimonial"]', '[class*="review"]', '#testimonials'] },
      { name: 'section-cta',          sel: ['[class*="cta"]', '[class*="Cta"]', '[class*="CTA"]', '[class*="call-to-action"]'] },
      { name: 'section-faq',          sel: ['[class*="faq"]', '[class*="FAQ"]', '[class*="Faq"]', '#faq'] },
      { name: 'section-contact',      sel: ['[class*="contact"]', '[class*="Contact"]', '#contact'] },
      { name: 'section-portfolio',    sel: ['[class*="portfolio"]', '[class*="Portfolio"]', '[class*="work"]', '#portfolio'] },
      { name: 'section-team',         sel: ['[class*="team"]', '[class*="Team"]', '#team'] },
      { name: 'section-stats',        sel: ['[class*="stats"]', '[class*="Stats"]', '[class*="numbers"]', '[class*="metric"]'] },
      { name: 'section-logos',        sel: ['[class*="logos"]', '[class*="Logos"]', '[class*="clients"]', '[class*="partners"]'] },
      { name: 'section-banner',       sel: ['[class*="banner"]', '[class*="Banner"]', '[class*="announcement"]'] },
      { name: 'section-footer',       sel: ['footer', '[class*="footer"]', '[class*="Footer"]'] },
    ];

    for (const s of sections) {
      await captureSection(page, s.name, s.sel, 30);
    }

    // Components
    const components = [
      { name: 'component-button-primary', sel: ['.btn-primary', 'button[class*="primary"]', 'a[class*="primary"]', 'button[class*="cta"]', 'a[class*="cta"]'] },
      { name: 'component-card',           sel: ['[class*="card"]:first-of-type', '[class*="Card"]:first-of-type'] },
      { name: 'component-form',           sel: ['form'] },
      { name: 'component-pricing-card',   sel: ['[class*="pricing"] [class*="card"]', '[class*="plan"]', '[class*="Plan"]'] },
    ];

    for (const c of components) {
      await captureSection(page, c.name, c.sel, 20);
    }

    // Hover state on first CTA button
    try {
      const btn = await page.$('button, a[class*="btn"], a[class*="cta"]');
      if (btn) {
        await btn.scrollIntoViewIfNeeded();
        await btn.hover();
        await delay(400);
        await captureSection(page, 'component-button-primary-hover', ['button', 'a[class*="btn"]', 'a[class*="cta"]'], 20);
      }
    } catch (_) {}

    await ctx.close();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // TABLET  1024 × 768
  // ───────────────────────────────────────────────────────────────────────────
  console.log('\n════ TABLET 1024×768 ════');
  {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1800);
    await scrollFullPage(page);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'full-page-tablet.png'), fullPage: true });
    console.log('  [OK] full-page-tablet.png');
    await captureScrollshots(page, 'tablet');
    await ctx.close();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // MOBILE  375 × 812
  // ───────────────────────────────────────────────────────────────────────────
  console.log('\n════ MOBILE 375×812 ════');
  {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await delay(1800);
    await scrollFullPage(page);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'full-page-mobile.png'), fullPage: true });
    console.log('  [OK] full-page-mobile.png');
    await captureScrollshots(page, 'mobile');

    // Mobile nav toggle
    try {
      const ham = await page.$('[class*="burger"], [class*="hamburger"], [class*="menu-toggle"], [aria-label*="menu" i], [aria-label*="navigation" i], [class*="MenuToggle"], [class*="HamburgerMenu"]');
      if (ham) {
        await ham.click();
        await delay(600);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'component-mobile-nav-open.png') });
        console.log('  [OK] component-mobile-nav-open.png');
      }
    } catch (_) {}

    await ctx.close();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // /audit PAGE  — Desktop
  // ───────────────────────────────────────────────────────────────────────────
  console.log('\n════ /audit PAGE — Desktop ════');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE_URL}/audit`, { waitUntil: 'networkidle' });
      await delay(2000);
      await scrollFullPage(page);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'full-page-audit-desktop.png'), fullPage: true });
      console.log('  [OK] full-page-audit-desktop.png');
      await captureScrollshots(page, 'audit-desktop');

      // Audit-specific sections
      const auditSections = [
        { name: 'audit-section-hero',    sel: ['[class*="hero"]', '[class*="Hero"]', 'section:first-of-type'] },
        { name: 'audit-section-form',    sel: ['form', '[class*="form"]', '[class*="Form"]'] },
        { name: 'audit-section-results', sel: ['[class*="result"]', '[class*="Result"]', '[class*="score"]', '[class*="report"]'] },
        { name: 'audit-section-steps',   sel: ['[class*="step"]', '[class*="Step"]', '[class*="process"]'] },
        { name: 'audit-section-footer',  sel: ['footer', '[class*="footer"]'] },
      ];
      for (const s of auditSections) {
        await captureSection(page, s.name, s.sel, 30);
      }
    } catch (e) {
      console.log(`  [ERR] /audit page: ${e.message}`);
    }
    await ctx.close();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // /audit PAGE  — Mobile
  // ───────────────────────────────────────────────────────────────────────────
  console.log('\n════ /audit PAGE — Mobile ════');
  {
    const ctx = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
    });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE_URL}/audit`, { waitUntil: 'networkidle' });
      await delay(1800);
      await scrollFullPage(page);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'full-page-audit-mobile.png'), fullPage: true });
      console.log('  [OK] full-page-audit-mobile.png');
      await captureScrollshots(page, 'audit-mobile');
    } catch (e) {
      console.log(`  [ERR] /audit mobile: ${e.message}`);
    }
    await ctx.close();
  }

  await browser.close();
  console.log(`\nAll screenshots saved to: ${SCREENSHOTS_DIR}`);
}

run().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
