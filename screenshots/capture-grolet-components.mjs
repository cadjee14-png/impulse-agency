import { chromium } from '/tmp/node_modules/playwright/index.mjs';

const URL = 'https://cedric-grolet.com/opera/';
const OUTPUT_DIR = '/Users/normancadjee/Projects/impulse-agency/screenshots';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureComponents() {
  const browser = await chromium.launch({ headless: true });

  // ─── Desktop 1440px — Component-focused captures ──────────────────────────
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Loading for component capture...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // ── NAV / HEADER ──────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await page.screenshot({
    path: `${OUTPUT_DIR}/component-nav-default.png`,
    clip: { x: 0, y: 0, width: 1440, height: 74 }
  });
  console.log('component-nav-default.png');

  // ── HERO / INTRO SECTION ─────────────────────────────────────────────────
  // The introHome class = hero, height 397px, starts after nav (74px)
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-intro-hero.png`,
    clip: { x: 0, y: 74, width: 1440, height: 397 }
  });
  console.log('section-intro-hero.png (introHome class)');

  // ── ABOVE FOLD FULL (nav + hero) ──────────────────────────────────────────
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-above-fold.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-above-fold.png');

  // ── PRODUCT FILTERS / SUB-NAV ─────────────────────────────────────────────
  // introHome ends at 74+397=471, products start at 471
  await page.evaluate(() => window.scrollTo(0, 400));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-product-filters.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-product-filters.png');

  // ── PRODUCT GRID ──────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 550));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-product-grid.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-product-grid.png');

  // ── SINGLE PRODUCT CARD ───────────────────────────────────────────────────
  // product-row__overlay__container, width 340px, height 470px
  const firstProductCard = await page.$('.product-row__overlay__container, [class*="product-row"]');
  if (firstProductCard) {
    await firstProductCard.scrollIntoViewIfNeeded();
    await sleep(600);
    const box = await firstProductCard.boundingBox();
    if (box) {
      await page.screenshot({
        path: `${OUTPUT_DIR}/component-product-card.png`,
        clip: {
          x: Math.max(0, box.x - 5),
          y: Math.max(0, box.y - 5),
          width: Math.min(360, box.width + 10),
          height: Math.min(500, box.height + 10)
        }
      });
      console.log('component-product-card.png');

      // Hover state on product card
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await sleep(600);
      await page.screenshot({
        path: `${OUTPUT_DIR}/component-product-card-hover.png`,
        clip: {
          x: Math.max(0, box.x - 5),
          y: Math.max(0, box.y - 5),
          width: Math.min(360, box.width + 10),
          height: Math.min(500, box.height + 10)
        }
      });
      console.log('component-product-card-hover.png');
    }
  }

  // ── WIDER PRODUCT GRID VIEW (3 cols) ─────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 600));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-product-grid-wide.png`,
    clip: { x: 0, y: 0, width: 1440, height: 600 }
  });
  console.log('section-product-grid-wide.png');

  // ── SCROLL TO MID-PAGE (1500px) ───────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 1500));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-mid-page.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-mid-page.png');

  // ── SCROLL TO 2500px ─────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 2500));
  await sleep(800);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-lower-products.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-lower-products.png');

  // ── FOOTER ────────────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
  await sleep(1000);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-footer-area.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-footer-area.png');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(600);
  await page.screenshot({
    path: `${OUTPUT_DIR}/section-page-bottom.png`,
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('section-page-bottom.png');

  // ── COLOR / TYPOGRAPHY ZOOM ───────────────────────────────────────────────
  // H1 "Cedric Grolet Opera" is at pageY ~114, let's zoom
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);
  await page.screenshot({
    path: `${OUTPUT_DIR}/typography-h1-grolet.png`,
    clip: { x: 0, y: 74, width: 1440, height: 250 }
  });
  console.log('typography-h1-grolet.png');

  // Subtitle / description text
  await page.evaluate(() => window.scrollTo(0, 74));
  await sleep(400);
  await page.screenshot({
    path: `${OUTPUT_DIR}/typography-subtitle.png`,
    clip: { x: 0, y: 0, width: 1440, height: 320 }
  });
  console.log('typography-subtitle.png');

  // Product name typography
  const productCard2 = await page.$('.product-row__overlay__container');
  if (productCard2) {
    await productCard2.scrollIntoViewIfNeeded();
    await sleep(500);
    const box2 = await productCard2.boundingBox();
    if (box2 && box2.width > 0) {
      // Capture name + price section of the card (bottom portion)
      await page.screenshot({
        path: `${OUTPUT_DIR}/typography-product-name.png`,
        clip: {
          x: Math.max(0, box2.x),
          y: Math.max(0, box2.y + box2.height - 100),
          width: Math.min(400, box2.width),
          height: 100
        }
      });
      console.log('typography-product-name.png');
    }
  }

  // ── NAV HOVER ─────────────────────────────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);

  const navLinks = await page.$$('.header a, nav a');
  for (const link of navLinks) {
    const text = await link.textContent();
    if (text && text.trim() === 'Click & collect') {
      const box = await link.boundingBox();
      if (box) {
        await link.hover();
        await sleep(400);
        await page.screenshot({
          path: `${OUTPUT_DIR}/component-nav-hover.png`,
          clip: { x: 0, y: 0, width: 1440, height: 74 }
        });
        console.log('component-nav-hover.png');
      }
      break;
    }
  }

  // ── ADD TO CART BUTTON (on product) ───────────────────────────────────────
  // Find "Ajouter" or cart button
  const addToCartBtns = await page.$$('[class*="add"], [class*="cart"], a[href*="product"]');
  if (addToCartBtns.length > 0) {
    for (const btn of addToCartBtns) {
      const box = await btn.boundingBox();
      if (box && box.width > 20 && box.height > 15 && box.height < 100) {
        await btn.scrollIntoViewIfNeeded();
        await sleep(400);
        const finalBox = await btn.boundingBox();
        if (finalBox && finalBox.y > 0) {
          await page.screenshot({
            path: `${OUTPUT_DIR}/component-add-to-cart.png`,
            clip: {
              x: Math.max(0, finalBox.x - 10),
              y: Math.max(0, finalBox.y - 5),
              width: Math.min(400, finalBox.width + 20),
              height: finalBox.height + 10
            }
          });
          console.log('component-add-to-cart.png');
          break;
        }
      }
    }
  }

  // ── SHOP SELECTOR OVERLAY ─────────────────────────────────────────────────
  // The site has a shop selector (shopsLayer__grid class shown initially)
  // Try to capture the initial state before location is selected
  // This might be hidden after page load

  await context.close();

  // ─── Mobile detail captures ───────────────────────────────────────────────
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileCtx.newPage();

  console.log('\nLoading mobile for components...');
  await mobilePage.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(3000);

  // Mobile above fold
  await mobilePage.screenshot({
    path: `${OUTPUT_DIR}/mobile-above-fold.png`,
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('mobile-above-fold.png');

  // Mobile nav
  const mobileNavH = await mobilePage.evaluate(() => {
    const h = document.querySelector('.header, nav, header');
    return h ? h.offsetHeight : 60;
  });
  await mobilePage.screenshot({
    path: `${OUTPUT_DIR}/mobile-component-nav.png`,
    clip: { x: 0, y: 0, width: 390, height: mobileNavH + 10 }
  });
  console.log('mobile-component-nav.png');

  // Mobile product card
  const mobileCard = await mobilePage.$('.product-row__overlay__container, [class*="product-row"]');
  if (mobileCard) {
    await mobileCard.scrollIntoViewIfNeeded();
    await sleep(500);
    const mBox = await mobileCard.boundingBox();
    if (mBox) {
      await mobilePage.screenshot({
        path: `${OUTPUT_DIR}/mobile-component-product-card.png`,
        clip: {
          x: 0,
          y: Math.max(0, mBox.y - 5),
          width: 390,
          height: Math.min(520, mBox.height + 10)
        }
      });
      console.log('mobile-component-product-card.png');
    }
  }

  // Mobile mid-page
  await mobilePage.evaluate(() => window.scrollTo(0, 1200));
  await sleep(600);
  await mobilePage.screenshot({
    path: `${OUTPUT_DIR}/mobile-mid-page.png`,
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log('mobile-mid-page.png');

  await mobileCtx.close();
  await browser.close();

  console.log('\nAll component captures done.');
}

captureComponents().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
