# Cedric Grolet Opera — Visual Reference
## URL: https://cedric-grolet.com/opera/
## Captured: 2026-04-14

---

## Summary

This is the **online shop page** for **Cedric Grolet Opera** — the Paris pastry boutique located at 35 avenue de l'Opéra, 75002 Paris. The page is a product catalog / e-commerce listing showing 28 available pastry items. Open Wednesday to Sunday, 9h00–18h00.

---

## Screenshots Inventory

### Full Page
| File | Description |
|------|-------------|
| `full-page-desktop.png` | Complete page — desktop 1440px wide |
| `full-page-desktop-loaded.png` | Full page after lazy-load triggered |
| `full-page-mobile.png` | Complete page — mobile 390px wide |
| `full-page-tablet.png` | Complete page — tablet 1024px wide |

### Above Fold / Hero
| File | Description |
|------|-------------|
| `section-above-fold.png` | Full above-fold viewport 1440x900 |
| `section-hero.png` | Hero viewport (initial capture) |
| `section-hero-above-fold.png` | Hero close-up desktop |
| `section-intro-hero.png` | `.introHome` section only (74-471px) — title + subtitle + shop info |
| `section-hero-mobile.png` | Above fold on mobile 390px |
| `mobile-above-fold.png` | Mobile above fold (re-captured) |

### Navigation
| File | Description |
|------|-------------|
| `component-nav-default.png` | Header/nav bar default state — white bg, 74px height, sticky |
| `component-nav-hover.png` | Nav hover state on "Click & collect" link |
| `mobile-component-nav.png` | Mobile nav bar |

### Product Grid
| File | Description |
|------|-------------|
| `section-product-filters.png` | Product count header + filter controls |
| `section-product-grid.png` | Product grid top rows |
| `section-product-grid-wide.png` | Product grid — 3-column layout view |
| `section-product-area.png` | Product area at 1500px scroll |
| `section-mid-page.png` | Mid-page products |
| `section-lower-products.png` | Lower product rows |
| `mobile-component-product-card.png` | Single product card on mobile |
| `mobile-mid-page.png` | Mobile mid-page products |

### Product Card Components
| File | Description |
|------|-------------|
| `component-product-card.png` | Single product card default state |
| `component-product-card-hover.png` | Product card hover state |
| `component-add-to-cart.png` | Add to cart / CTA button |

### Footer
| File | Description |
|------|-------------|
| `section-footer-area.png` | Bottom of page — footer approach |
| `section-page-bottom.png` | Very bottom of page |
| `section-footer-mobile.png` | Mobile footer |

### Typography Close-ups
| File | Description |
|------|-------------|
| `typography-h1-grolet.png` | H1 "Cedric Grolet / Opera" — 90px, -3.6px tracking |
| `typography-heading-h1.png` | H1 DOM element capture |
| `typography-subtitle.png` | Subtitle + location + hours section |
| `typography-product-name.png` | Product name + price in card |

### Scroll Sequences — Desktop (1440px)
| File | Scroll position |
|------|----------------|
| `desktop-scroll-01.png` | y=0 |
| `desktop-scroll-02.png` | y=800 |
| `desktop-scroll-03.png` | y=1600 |
| `desktop-scroll-04.png` | y=2400 |
| `desktop-scroll-05.png` | y=3200 |
| `desktop-scroll-06.png` | y=4000 |
| `desktop-scroll-07.png` | y=4800 |
| `section-scroll-y0.png` | y=0 (second pass) |
| `section-scroll-y900.png` | y=900 |
| `section-scroll-y1800.png` | y=1800 |
| `section-scroll-y2700.png` | y=2700 |
| `section-scroll-y3600.png` | y=3600 |
| `section-scroll-y4500.png` | y=4500 |

### Scroll Sequences — Mobile (390px)
| File | Scroll position |
|------|----------------|
| `mobile-scroll-01.png` | y=0 |
| `mobile-scroll-02.png` | y=700 |
| `mobile-scroll-03.png` | y=1400 |
| `mobile-scroll-04.png` | y=2100 |
| `mobile-scroll-05.png` | y=2800 |
| `mobile-scroll-06.png` | y=3500 |
| `mobile-scroll-07.png` | y=4200 |
| `mobile-scroll-08.png` | y=4900 |

---

## Page Architecture

### Overall Structure

```
<header class="header">          — sticky, 74px, white bg
<main id="wrapper">              — 5208px total height
  .introHome                     — 397px, hero/title section
  .products__container           — 4131px, full product catalog
    .container                   — inner container
      [filter bar]               — product count + layout toggle
      [product rows]             — 28 products in 4-column grid
        .product-row__overlay__container  — each 340x470px
```

### Section Breakdown
| Section | CSS Class | Height | Top Offset | Content |
|---------|-----------|--------|------------|---------|
| Navigation | `.header` | 74px | 0 | Logo, nav links, cart |
| Hero/Intro | `.introHome` | 397px | 74px | Title "Cedric Grolet / Opera", subtitle, address, hours |
| Product Container | `.products__container` | 4131px | 471px | 28 products in grid |
| Footer | (bottom of wrapper) | ~300px | ~4900px | Contact info, links |

---

## Typography System

### Fonts Used

1. **"La Grolet"** — Custom proprietary font, used exclusively for H1/headings
   - CSS var: `--font-heading: "La Grolet", ...`
   - Fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.`
   - Character: Editorial, slightly organic, signature-like — likely a custom display serif

2. **"Akkurat"** — Used for all body text, labels, navigation, product names
   - CSS body font
   - Fallbacks: `-apple-system, "system-ui", "Segoe UI", Roboto, etc.`
   - Character: Clean geometric sans-serif, Swiss influenced

### Heading Styles
| Element | Font | Size | Weight | Letter Spacing | Transform |
|---------|------|------|--------|----------------|-----------|
| H1 main title | "La Grolet" | 90px | 400 | -3.6px | none |
| H1 sub (shop selector) | "La Grolet" | 32px | 400 | normal | none |

### Body Text Styles
| Use | Font | Size | Weight | Line Height | Color |
|-----|------|------|--------|-------------|-------|
| Body default | Akkurat | 16px | 400 | normal | rgb(0,0,0) |
| Address / hours | Akkurat | 14px | 400 | 19.25px | rgb(75,75,75) |
| Product description | Akkurat | 13px | 400 | 17.94px | rgb(143,143,143) |
| Nav links | Akkurat | 16px | 400 | normal | rgb(0,0,0) |

---

## Color Palette

### Core Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Pure White | `#FFFFFF` | rgb(255,255,255) | Navigation background, cards |
| Off-White | `#F6F6F6` | rgb(246,246,246) | Page body background |
| Pure Black | `#000000` | rgb(0,0,0) | Primary text, H1, borders, CTA bg |
| Dark Gray | `#4B4B4B` | rgb(75,75,75) | Address, hours, secondary body text |
| Medium Gray | `#8F8F8F` | rgb(143,143,143) | Product descriptions (CSS var `--color-secondary`) |
| Overlay Black | — | rgba(0,0,0,0.7) | Overlay hover states |

### CSS Custom Properties
```css
--color-primary: 0,0,0;
--color-secondary: 143,143,143;
--font-heading: "La Grolet", -apple-system, ...;
```

### Design Philosophy
The color scheme is **strictly monochromatic** — black, white, and two grays. Zero color accents, no gold, no warm tones. The visual richness comes entirely from the **pastry photography**. This creates an editorial/fashion-house feel rather than a typical food brand look.

---

## Product Catalog

### Grid Layout
- **Desktop 1440px**: 4 columns (each card 340px wide x 470px tall)
- **Tablet 1024px**: likely 3 columns
- **Mobile 390px**: 2 columns (standard responsive grid)
- Total: 28 products displayed

### Product Card Structure
Each `.product-row__overlay__container` (340 x 470px) contains:
- Product image (307 x 425px natural, displayed at 340 x 470px — slightly stretched portrait)
- Product name (Akkurat font, ~16px)
- Product description line (gray, 13px Akkurat)
- Price
- Add to cart action (revealed on hover or always visible)

### Products Listed (28 total)
- Fleur Mangue
- Fleur Chocolat Vanille
- Fleur Pavlova Fraise
- Fleur Pamplemousse
- Fleur Banoffee
- Fleur Coco Passion
- Fleur Paris-Brest Noisette
- Fleur Chocolat
- Fleur Coco Matcha
- Fleur Vanille
- Gousse de vanille
- Cake Chocolat
- Cake Marbré
- Cake Fraise
- Fleur Vanille Chocolat
- Fleur Saint-Honoré caramel
- Saint-Honoré chiffres
- Livre Cedric Grolet Fruits
- (+ 10 additional items)

---

## Navigation

### Desktop Nav Links (left to right)
```
[Logo]
Opéra               (active location)
Click & collect
Réserver une table
Notre maison
---
Changer de boutique
Votre compte
fr | en             (language switcher)
[Cart counter: 0]
Voir mon panier
```

### Nav Properties
- Height: 74px
- Background: `rgb(255,255,255)` — pure white
- Position: `sticky` (stays fixed on scroll)
- Font: Akkurat, 16px

---

## Interactive Elements

### Navigation
- Sticky positioning — visible throughout scroll
- Language toggle: fr/en
- Cart with item count badge
- "Voir mon panier" CTA button

### Cart Button (two states)
- **Transparent state**: transparent bg, black text — `border: none`
- **Active/cart widget button**: `background: rgb(0,0,0)`, `color: white`, `border: 1px solid black`, `border-radius: 10px`, `padding: 0 15px`

### Product Cards
- Default: image + name + description visible
- Hover: see `component-product-card-hover.png` — likely overlay with add-to-cart appears
- Portrait image format (307x425 natural / 340x470 display)

### Layout Toggle (in product filter bar)
- "Affichage 2 colonnes" — 2-column layout
- "Affichage 1 colonne" — 1-column layout

### Shop Selector
- Initial layer shows shop/location selector (`.shopsLayer__grid container --small`)
- Lists Paris locations
- Height: 575px overlay

---

## Animations Observed

- Product card hover likely shows overlay with add-to-cart (opacity fade-in)
- Navigation is sticky with no transition animation on scroll
- Page intro likely has subtle fade-in on load (`.introHome` class)
- Lazy loading: images use multiple SKU-suffixed URLs, loaded on scroll
- No video elements on this page (unusual for luxury brand, confirms focus on product catalog)

---

## Image URL Pattern

```
https://cedric-grolet.com/opera/[SKU]-product_laptop/[product-slug].jpg
https://cedric-grolet.com/opera/[SKU]-product_mobile/[product-slug].jpg
```

Each product has multiple SKU variants for carousel or zoom functionality. Example for "Fleur Mangue": SKUs 7627, 7628, 7629, 7630, 7631, 7632, 7633.

---

## Technical Notes

- Custom font "La Grolet" — not a Google Font, likely self-hosted
- Akkurat — commercial Swiss sans-serif by Lineto foundry, self-hosted
- `js-products-container` class suggests JS-driven filtering/sorting
- `.shopsLayer__grid` — shop picker overlay (shown before location selected)
- No video on this page
- Page height: ~5485px at 1440px viewport

---

## Design Observations for Cloning

1. **Minimal luxury aesthetic** — no decorative elements, the food photography IS the design
2. **Strictly black + white + off-white** — zero accent colors, a true monochromatic palette
3. **Two custom fonts only** — "La Grolet" (editorial display) + "Akkurat" (neutral sans)
4. **Massive H1** — 90px with -3.6px letter-spacing creates bold editorial impact
5. **4-column product grid** — tight, dense layout maximizing product visibility at desktop
6. **Sticky white header** — minimal, clean, 74px
7. **No hero image** — the intro section is text-only with essential shop info (very unusual)
8. **Portrait product cards** — 340x470px portrait format, taller than wide, lets pastry photography dominate
9. **Off-white page background** — `#F6F6F6` not pure white, adds subtle warmth
10. **All interactions are clean** — no animations that feel flashy or decorative

---

## Data Files

- `grolet-dom-info.json` — Full DOM structure, CSS variables, image URLs, section details
- `grolet-typography.json` — All heading/button/paragraph style measurements
