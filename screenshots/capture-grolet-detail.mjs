import { chromium } from '/tmp/node_modules/playwright/index.mjs';
import { writeFileSync } from 'fs';

const URL = 'https://cedric-grolet.com/opera/';
const OUTPUT_DIR = '/Users/normancadjee/Projects/impulse-agency/screenshots';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureDetail() {
  const browser = await chromium.launch({ headless: true });

  // ─── DESKTOP — Detailed section captures ──────────────────────────────────
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Loading for detailed capture...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // Inspect DOM structure in detail
  const domInfo = await page.evaluate(() => {
    const result = {
      sections: [],
      allImages: [],
      bodyStyles: {},
      navDetails: {},
      colorVars: [],
      heroDetails: {}
    };

    // Body background
    const bodyStyle = window.getComputedStyle(document.body);
    result.bodyStyles = {
      bg: bodyStyle.backgroundColor,
      color: bodyStyle.color,
      font: bodyStyle.fontFamily,
      fontSize: bodyStyle.fontSize
    };

    // CSS custom properties
    const rootStyle = window.getComputedStyle(document.documentElement);
    const cssVarNames = ['--color-primary', '--color-secondary', '--color-bg', '--color-text',
      '--font-primary', '--font-heading', '--color-accent', '--primary', '--secondary',
      '--background', '--foreground', '--gold', '--beige', '--cream'];
    for (const v of cssVarNames) {
      const val = rootStyle.getPropertyValue(v);
      if (val.trim()) result.colorVars.push({ name: v, value: val.trim() });
    }

    // Major sections by tag and position
    const elements = document.querySelectorAll('section, main, [class*="section"], [class*="container"], [class*="wrapper"]');
    let count = 0;
    elements.forEach(el => {
      if (el.offsetHeight > 80 && count < 30) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        result.sections.push({
          tag: el.tagName,
          id: el.id || '',
          class: el.className ? el.className.toString().substring(0, 120) : '',
          height: Math.round(el.offsetHeight),
          top: Math.round(el.offsetTop),
          width: Math.round(el.offsetWidth),
          hasVideo: !!el.querySelector('video'),
          hasImages: el.querySelectorAll('img').length,
          textContent: el.textContent.trim().substring(0, 100)
        });
        count++;
      }
    });

    // All images
    document.querySelectorAll('img').forEach((img, i) => {
      if (i < 20) {
        result.allImages.push({
          src: img.src ? img.src.substring(0, 80) : '',
          alt: img.alt || '',
          width: img.naturalWidth,
          height: img.naturalHeight,
          displayW: img.offsetWidth,
          displayH: img.offsetHeight
        });
      }
    });

    // Nav details
    const nav = document.querySelector('nav, header');
    if (nav) {
      const navStyle = window.getComputedStyle(nav);
      result.navDetails = {
        bg: navStyle.backgroundColor,
        height: nav.offsetHeight,
        position: navStyle.position,
        class: nav.className ? nav.className.toString().substring(0, 100) : ''
      };
    }

    // Hero section - first section or header
    const hero = document.querySelector('section, .hero, [class*="hero"], main > *:first-child');
    if (hero) {
      const heroStyle = window.getComputedStyle(hero);
      result.heroDetails = {
        height: hero.offsetHeight,
        bg: heroStyle.backgroundColor,
        bgImage: heroStyle.backgroundImage ? heroStyle.backgroundImage.substring(0, 100) : '',
        class: hero.className ? hero.className.toString().substring(0, 100) : '',
        hasVideo: !!hero.querySelector('video'),
        videoSrc: hero.querySelector('video') ? hero.querySelector('video').src : ''
      };
    }

    return result;
  });

  console.log('Body styles:', domInfo.bodyStyles);
  console.log('CSS vars:', domInfo.colorVars);
  console.log('Nav details:', domInfo.navDetails);
  console.log('Hero details:', domInfo.heroDetails);
  console.log('Sections count:', domInfo.sections.length);
  console.log('Images count:', domInfo.allImages.length);

  // Write detailed DOM info to a JSON file for reference
  writeFileSync(`${OUTPUT_DIR}/grolet-dom-info.json`, JSON.stringify(domInfo, null, 2));

  // Now capture each distinct section by scrolling to its top
  const capturedSections = [];
  for (let i = 0; i < Math.min(domInfo.sections.length, 15); i++) {
    const section = domInfo.sections[i];
    if (section.height < 50) continue;

    const scrollTo = Math.max(0, section.top - 60);
    await page.evaluate(y => window.scrollTo(0, y), scrollTo);
    await sleep(800);

    const name = `section-detail-${i}-${section.class.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30)}.png`;
    await page.screenshot({
      path: `${OUTPUT_DIR}/${name}`,
      clip: { x: 0, y: 0, width: 1440, height: Math.min(900, section.height + 120) }
    });
    capturedSections.push(name);
    console.log(`Captured: ${name} (height: ${section.height})`);
  }

  // Capture large section views
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);

  // Section at specific scroll points - more granular
  const scrollPoints = [0, 900, 1800, 2700, 3600, 4500];
  for (const yPos of scrollPoints) {
    if (yPos >= pageHeight) break;
    await page.evaluate(y => window.scrollTo(0, y), yPos);
    await sleep(1000);
    const name = `section-scroll-y${yPos}.png`;
    await page.screenshot({
      path: `${OUTPUT_DIR}/${name}`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    capturedSections.push(name);
  }

  // Typography close-up — zoom into first heading
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);

  // Get first h1 or h2 bounding box
  const h1Box = await page.evaluate(() => {
    const h = document.querySelector('h1, h2');
    if (!h) return null;
    const rect = h.getBoundingClientRect();
    return { x: Math.max(0, rect.x - 20), y: Math.max(0, rect.y - 20), width: Math.min(1440, rect.width + 40), height: rect.height + 40 };
  });

  if (h1Box && h1Box.height > 10 && h1Box.height < 800) {
    await page.screenshot({
      path: `${OUTPUT_DIR}/typography-heading-h1.png`,
      clip: h1Box
    });
    capturedSections.push('typography-heading-h1.png');
    console.log('Captured h1 typography');
  }

  // Capture product grid if it exists
  await page.evaluate(() => window.scrollTo(0, 1500));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-product-area.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  capturedSections.push('section-product-area.png');

  // Colors — take screenshot of full page and crop color blocks
  // Also capture any apparent "menu" or "product" section
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);

  // Check for lazy-loaded content by scrolling slowly
  for (let y = 0; y <= pageHeight; y += 400) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await sleep(200);
  }
  await sleep(1000);

  // Final full page after all lazy loads triggered
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);
  const finalShot = await page.screenshot({
    path: `${OUTPUT_DIR}/full-page-desktop-loaded.png`,
    fullPage: true
  });
  capturedSections.push('full-page-desktop-loaded.png');
  console.log('Final full-page after lazy load done');

  // ─── Get computed colors and typography details ───────────────────────────
  const typographyInfo = await page.evaluate(() => {
    const info = {
      allHeadings: [],
      bodyText: [],
      links: [],
      buttons: []
    };

    // All headings with styles
    document.querySelectorAll('h1, h2, h3').forEach(h => {
      const s = window.getComputedStyle(h);
      const rect = h.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      info.allHeadings.push({
        tag: h.tagName,
        text: h.textContent.trim().substring(0, 80),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        textTransform: s.textTransform,
        color: s.color,
        pageY: Math.round(rect.top + scrollTop)
      });
    });

    // Body paragraphs
    document.querySelectorAll('p').forEach((p, i) => {
      if (i > 5) return;
      const s = window.getComputedStyle(p);
      info.bodyText.push({
        text: p.textContent.trim().substring(0, 80),
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        color: s.color
      });
    });

    // Buttons/CTAs
    document.querySelectorAll('button, a[class*="btn"], a[class*="cta"], [class*="button"]').forEach((b, i) => {
      if (i > 10) return;
      const s = window.getComputedStyle(b);
      const rect = b.getBoundingClientRect();
      info.buttons.push({
        text: b.textContent.trim().substring(0, 50),
        bg: s.backgroundColor,
        color: s.color,
        border: s.border,
        borderRadius: s.borderRadius,
        fontSize: s.fontSize,
        fontFamily: s.fontFamily,
        letterSpacing: s.letterSpacing,
        textTransform: s.textTransform,
        padding: s.padding,
        pageY: Math.round(rect.top + (window.pageYOffset || 0))
      });
    });

    return info;
  });

  writeFileSync(`${OUTPUT_DIR}/grolet-typography.json`, JSON.stringify(typographyInfo, null, 2));
  console.log(`Typography: ${typographyInfo.allHeadings.length} headings, ${typographyInfo.buttons.length} buttons`);

  await context.close();
  await browser.close();

  console.log(`\nDetail captures done: ${capturedSections.length} additional screenshots`);
  return { capturedSections, domInfo, typographyInfo };
}

captureDetail().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
