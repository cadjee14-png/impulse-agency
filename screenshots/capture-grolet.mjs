import { chromium } from '/tmp/node_modules/playwright/index.mjs';
import { writeFileSync } from 'fs';

const URL = 'https://cedric-grolet.com/opera/';
const OUTPUT_DIR = '/Users/normancadjee/Projects/impulse-agency/screenshots';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureGrolet() {
  const browser = await chromium.launch({ headless: true });
  const observations = {
    sections: [],
    colors: [],
    fonts: [],
    animations: [],
    interactive: [],
    screenshots: []
  };

  // ─── DESKTOP 1440px ───────────────────────────────────────────────────────
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1.5
    });
    const page = await context.newPage();

    console.log('Loading page at desktop 1440px...');
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(3000);

    // Full page
    await page.screenshot({
      path: `${OUTPUT_DIR}/full-page-desktop.png`,
      fullPage: true
    });
    observations.screenshots.push('full-page-desktop.png');
    console.log('full-page-desktop.png done');

    // Above fold
    await page.screenshot({
      path: `${OUTPUT_DIR}/section-hero.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    observations.screenshots.push('section-hero.png');

    // Get page height and scroll through sections
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Page height: ${pageHeight}px`);

    // Capture scrolling sections at every 900px
    let scrollY = 0;
    let screenIndex = 1;
    while (scrollY < pageHeight) {
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await sleep(800);
      const filename = `desktop-scroll-${String(screenIndex).padStart(2, '0')}.png`;
      await page.screenshot({
        path: `${OUTPUT_DIR}/${filename}`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      observations.screenshots.push(filename);
      scrollY += 800;
      screenIndex++;
      if (screenIndex > 20) break;
    }

    // Collect CSS info
    const cssInfo = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      const fonts = new Set();
      const colors = new Set();
      const bgColors = new Set();

      for (const el of allElements) {
        const style = window.getComputedStyle(el);
        const ff = style.fontFamily;
        const color = style.color;
        const bg = style.backgroundColor;
        if (ff) fonts.add(ff);
        if (color && color !== 'rgba(0, 0, 0, 0)') colors.add(color);
        if (bg && bg !== 'rgba(0, 0, 0, 0)') bgColors.add(bg);
      }

      // Get headings text + styles
      const headings = [];
      document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
        const s = window.getComputedStyle(h);
        headings.push({
          tag: h.tagName,
          text: h.textContent.trim().substring(0, 100),
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          color: s.color,
          letterSpacing: s.letterSpacing,
          textTransform: s.textTransform
        });
      });

      // Get nav links
      const navLinks = [];
      document.querySelectorAll('nav a, header a').forEach(a => {
        navLinks.push(a.textContent.trim());
      });

      // Get all sections/divs with IDs or meaningful classes
      const sections = [];
      document.querySelectorAll('section, [id], main > div, .section').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height > 100) {
          sections.push({
            tag: el.tagName,
            id: el.id,
            class: el.className.substring(0, 80),
            height: Math.round(el.offsetHeight),
            top: Math.round(el.offsetTop)
          });
        }
      });

      return {
        fonts: [...fonts].slice(0, 20),
        colors: [...colors].slice(0, 30),
        bgColors: [...bgColors].slice(0, 20),
        headings,
        navLinks,
        sections,
        bodyBg: window.getComputedStyle(document.body).backgroundColor,
        pageHeight: document.body.scrollHeight
      };
    });

    observations.fonts = cssInfo.fonts;
    observations.colors = cssInfo.colors;
    observations.bgColors = cssInfo.bgColors;
    observations.headings = cssInfo.headings;
    observations.navLinks = cssInfo.navLinks;
    observations.sections = cssInfo.sections;
    observations.bodyBg = cssInfo.bodyBg;
    observations.pageHeight = cssInfo.pageHeight;

    console.log('Nav links:', cssInfo.navLinks);
    console.log('Sections found:', cssInfo.sections.length);
    console.log('Headings found:', cssInfo.headings.length);

    // Capture navigation close-up
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    const navBounds = await page.evaluate(() => {
      const nav = document.querySelector('nav, header, [class*="nav"], [class*="header"]');
      if (nav) {
        const rect = nav.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }
      return null;
    });

    if (navBounds && navBounds.height > 0 && navBounds.height < 300) {
      await page.screenshot({
        path: `${OUTPUT_DIR}/component-nav-default.png`,
        clip: { x: 0, y: 0, width: 1440, height: Math.max(navBounds.height + 20, 80) }
      });
      observations.screenshots.push('component-nav-default.png');
    }

    // Hover over nav items
    const navLinks2 = await page.$$('nav a, header a, [class*="nav"] a');
    if (navLinks2.length > 0) {
      await navLinks2[0].hover();
      await sleep(500);
      await page.screenshot({
        path: `${OUTPUT_DIR}/component-nav-hover.png`,
        clip: { x: 0, y: 0, width: 1440, height: 120 }
      });
      observations.screenshots.push('component-nav-hover.png');
    }

    // Typography close-ups — scroll back to top, capture headings
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    await page.screenshot({
      path: `${OUTPUT_DIR}/section-hero-above-fold.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    observations.screenshots.push('section-hero-above-fold.png');

    // Try to find and capture a button/CTA
    const buttons = await page.$$('button, a[class*="btn"], a[class*="cta"], a[class*="button"], a[href*="reserver"], a[href*="book"]');
    if (buttons.length > 0) {
      for (let i = 0; i < Math.min(3, buttons.length); i++) {
        const box = await buttons[i].boundingBox();
        if (box && box.width > 10 && box.height > 10) {
          await page.screenshot({
            path: `${OUTPUT_DIR}/component-button-${i}.png`,
            clip: {
              x: Math.max(0, box.x - 20),
              y: Math.max(0, box.y - 10),
              width: Math.min(400, box.width + 40),
              height: box.height + 20
            }
          });
          observations.screenshots.push(`component-button-${i}.png`);
          // Hover state
          await buttons[i].hover();
          await sleep(400);
          await page.screenshot({
            path: `${OUTPUT_DIR}/component-button-${i}-hover.png`,
            clip: {
              x: Math.max(0, box.x - 20),
              y: Math.max(0, box.y - 10),
              width: Math.min(400, box.width + 40),
              height: box.height + 20
            }
          });
          observations.screenshots.push(`component-button-${i}-hover.png`);
          break;
        }
      }
    }

    // Capture cards / product items
    const cards = await page.$$('[class*="card"], [class*="product"], [class*="item"], article');
    if (cards.length > 0) {
      const box = await cards[0].boundingBox();
      if (box && box.width > 50 && box.height > 50) {
        await page.evaluate(y => window.scrollTo(0, y - 200), box.y);
        await sleep(600);
        await page.screenshot({
          path: `${OUTPUT_DIR}/component-card.png`,
          clip: {
            x: Math.max(0, box.x - 10),
            y: Math.max(0, box.y - 10),
            width: Math.min(1440, box.width + 20),
            height: Math.min(600, box.height + 20)
          }
        });
        observations.screenshots.push('component-card.png');
      }
    }

    // Find and capture footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1000);
    await page.screenshot({
      path: `${OUTPUT_DIR}/section-footer.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    observations.screenshots.push('section-footer.png');

    // Capture mid-page sections by scrolling to specific positions
    const midPoints = [0.25, 0.5, 0.75];
    for (const pct of midPoints) {
      const y = Math.floor(pageHeight * pct);
      await page.evaluate(yy => window.scrollTo(0, yy), y);
      await sleep(800);
      const name = `section-at-${Math.round(pct * 100)}pct.png`;
      await page.screenshot({
        path: `${OUTPUT_DIR}/${name}`,
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      observations.screenshots.push(name);
    }

    await context.close();
  }

  // ─── MOBILE 390px ─────────────────────────────────────────────────────────
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    });
    const page = await context.newPage();

    console.log('Loading page at mobile 390px...');
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(3000);

    // Full page mobile
    await page.screenshot({
      path: `${OUTPUT_DIR}/full-page-mobile.png`,
      fullPage: true
    });
    observations.screenshots.push('full-page-mobile.png');
    console.log('full-page-mobile.png done');

    // Hero mobile
    await page.screenshot({
      path: `${OUTPUT_DIR}/section-hero-mobile.png`,
      clip: { x: 0, y: 0, width: 390, height: 844 }
    });
    observations.screenshots.push('section-hero-mobile.png');

    // Scroll through mobile
    const mobileHeight = await page.evaluate(() => document.body.scrollHeight);
    let scrollY = 0;
    let idx = 1;
    while (scrollY < mobileHeight) {
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await sleep(700);
      const filename = `mobile-scroll-${String(idx).padStart(2, '0')}.png`;
      await page.screenshot({
        path: `${OUTPUT_DIR}/${filename}`,
        clip: { x: 0, y: 0, width: 390, height: 844 }
      });
      observations.screenshots.push(filename);
      scrollY += 700;
      idx++;
      if (idx > 20) break;
    }

    // Mobile footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(800);
    await page.screenshot({
      path: `${OUTPUT_DIR}/section-footer-mobile.png`,
      clip: { x: 0, y: 0, width: 390, height: 844 }
    });
    observations.screenshots.push('section-footer-mobile.png');

    await context.close();
  }

  // ─── TABLET 1024px ────────────────────────────────────────────────────────
  {
    const context = await browser.newContext({
      viewport: { width: 1024, height: 768 },
      deviceScaleFactor: 1.5
    });
    const page = await context.newPage();

    console.log('Loading page at tablet 1024px...');
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(3000);

    await page.screenshot({
      path: `${OUTPUT_DIR}/full-page-tablet.png`,
      fullPage: true
    });
    observations.screenshots.push('full-page-tablet.png');
    console.log('full-page-tablet.png done');

    await context.close();
  }

  await browser.close();

  // ─── Write context.md ─────────────────────────────────────────────────────
  const topColors = [...new Set([
    observations.bodyBg,
    ...observations.bgColors,
    ...observations.colors
  ])].filter(c => c && c !== 'rgba(0, 0, 0, 0)').slice(0, 20);

  const contextContent = `# Cedric Grolet Opera — Screenshot Reference
## URL: ${URL}
## Captured: ${new Date().toISOString()}

---

## Screenshots Taken (${observations.screenshots.length})

${observations.screenshots.map(s => `- \`${s}\``).join('\n')}

---

## Page Dimensions

- Desktop viewport: 1440 x 900px
- Mobile viewport: 390 x 844px
- Tablet viewport: 1024 x 768px
- Full page height (desktop): ${observations.pageHeight}px

---

## Sections Identified

${observations.sections.length > 0 ? observations.sections.map(s =>
  `- **${s.tag}${s.id ? '#' + s.id : ''}** — class: \`${s.class}\` | top: ${s.top}px | height: ${s.height}px`
).join('\n') : '- (Could not detect named sections — see scroll screenshots)'}

---

## Navigation Links

${observations.navLinks.length > 0 ? observations.navLinks.filter(l => l.trim()).map(l => `- ${l}`).join('\n') : '- (Not detected)'}

---

## Typography

### Headings Found

${observations.headings && observations.headings.length > 0 ? observations.headings.map(h =>
  `#### ${h.tag}: "${h.text}"
- Font: ${h.fontFamily}
- Size: ${h.fontSize}
- Weight: ${h.fontWeight}
- Color: ${h.color}
- Letter Spacing: ${h.letterSpacing}
- Text Transform: ${h.textTransform}`
).join('\n\n') : '- (Not detected)'}

---

## Color Palette (Observed)

${topColors.map(c => `- \`${c}\``).join('\n')}

---

## Fonts Detected

${observations.fonts.slice(0, 10).map(f => `- \`${f}\``).join('\n')}

---

## Interactive Elements

- Navigation links
- Hover states on nav items
- Buttons/CTA links captured in component-button-*.png

---

## Animations Observed

- Page loads with potential fade-in animations (Grolet site uses smooth transitions)
- Hover states on navigation and product cards may include color/opacity transitions
- Scroll-triggered reveal animations likely present (common in luxury hospitality sites)

---

## Design Notes

- Luxury patisserie / restaurant website
- Opera location (Paris Opera)
- Cedric Grolet is a world-renowned pastry chef
- Site likely uses elegant, minimal typography with high-quality food photography
- Color palette expected: dark backgrounds, gold/beige/cream accents, white text
- Serif or editorial fonts typical for luxury F&B brands

---

## Files by Category

### Full Page
- full-page-desktop.png — Complete page at 1440px
- full-page-mobile.png — Complete page at 390px
- full-page-tablet.png — Complete page at 1024px

### Section Captures
- section-hero.png — Above fold desktop
- section-hero-above-fold.png — Hero close-up desktop
- section-hero-mobile.png — Hero on mobile
- section-footer.png — Footer desktop
- section-footer-mobile.png — Footer mobile
- section-at-25pct.png — Page at 25% scroll
- section-at-50pct.png — Page at 50% scroll
- section-at-75pct.png — Page at 75% scroll

### Components
- component-nav-default.png — Navigation bar default state
- component-nav-hover.png — Navigation bar hover state
- component-button-0.png — Primary button default
- component-button-0-hover.png — Primary button hover
- component-card.png — Product/content card

### Scroll Sequences (Desktop)
${observations.screenshots.filter(s => s.startsWith('desktop-scroll-')).map(s => `- ${s}`).join('\n')}

### Scroll Sequences (Mobile)
${observations.screenshots.filter(s => s.startsWith('mobile-scroll-')).map(s => `- ${s}`).join('\n')}
`;

  writeFileSync(`${OUTPUT_DIR}/context.md`, contextContent);
  console.log('\ncontext.md written.');
  console.log(`Total screenshots: ${observations.screenshots.length}`);
  console.log('Done!');
}

captureGrolet().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
