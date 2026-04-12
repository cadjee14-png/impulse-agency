import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/normancadjee/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Dump all section/div with IDs, and top-level block classes
  const info = await page.evaluate(() => {
    const els = document.querySelectorAll('section, [id], nav, header, footer, main > *, main > div > *');
    const results = [];
    for (const el of els) {
      const tag = el.tagName.toLowerCase();
      const id = el.id || '';
      const classes = el.className || '';
      const text = (el.textContent || '').trim().slice(0, 80);
      const rect = el.getBoundingClientRect();
      const scrollY = window.pageYOffset;
      results.push({
        tag,
        id,
        classes: typeof classes === 'string' ? classes.slice(0, 200) : '',
        text,
        top: Math.round(rect.top + scrollY),
        height: Math.round(rect.height),
      });
    }
    return results;
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

run().catch(console.error);
