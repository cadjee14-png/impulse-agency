'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { SectionHeading } from '@/components/animations/section-heading';
import { CircularGallery } from '@/components/ui/circular-gallery';

// ─────────────────────────────────────────────
// DONNÉES — ajouter ici les nouveaux projets
// ─────────────────────────────────────────────

const SITES = [
  {
    url: 'bellarya.fr',
    image: '/images/site-bellarya.jpg',
    objectPosition: 'top center',
    client: 'Bellarya',
    category: 'Site Web · Beauté & Cosmétiques',
    result: 'Lancement boutique en ligne',
    link: 'https://bellarya.fr',
  },
  {
    url: 'viboost.fr',
    image: '/images/site-viboost.jpg',
    objectPosition: 'top center',
    client: 'ViBoost',
    category: 'Site Web · Réservation en ligne',
    result: '×3 prises de rendez-vous',
    link: 'https://viboost-v5.vercel.app/',
  },
  {
    url: 'cabinet-sourire.fr',
    image: '/images/site-cabinet-sourire.jpg',
    objectPosition: 'top center',
    client: 'Cabinet Sourire',
    category: 'Site Web · Santé & Dentaire',
    result: 'Site vitrine premium',
    link: 'https://cabinet-sourire.vercel.app/',
  },
  {
    url: 'kits-nation.com',
    image: '/images/site-kits-nation.jpg',
    objectPosition: 'top center',
    client: 'Kits Nation',
    category: 'E-commerce · Sport',
    result: 'Boutique en ligne complète',
    link: 'https://kits-nation.com/',
  },
  {
    url: 'buon-cibo-pizza.fr',
    image: '/images/site-buon-cibo.jpg',
    objectPosition: 'top center',
    client: 'Buon Cibo Pizza',
    category: 'Site Web · Restauration',
    result: 'Site vitrine & menu en ligne',
    link: 'https://buon-cibo-pizza.vercel.app/',
  },
];

const VISUELS: {
  image: string;
  format: 'square' | 'story';
  label: string;
  client: string;
  detail: string;
}[] = [
  // Alternance flyer (story) / post (square)
  { image: '/images/card-5.jpg',  format: 'story',  label: 'Flyer',               client: 'WilliBarber',    detail: 'Création de flyers · Recrutement' },
  { image: '/images/card-3.jpg',  format: 'square', label: 'Post Instagram',       client: 'Chick & Cheez',  detail: 'Création de contenu · Social Media' },
  { image: '/images/card-6.jpg',  format: 'story',  label: 'Menu & Flyer',         client: 'Napolino',       detail: 'Création de menu · Identité visuelle' },
  { image: '/images/card-2.jpg',  format: 'square', label: 'Post Instagram',       client: 'Pokebab',        detail: "Campagne d'ouverture · Branding" },
  { image: '/images/card-9.jpg',  format: 'story',  label: 'Flyer',               client: 'Smash Corner',   detail: 'Menu & flyer · Identité visuelle' },
  { image: '/images/card-1.jpg',  format: 'square', label: 'Post Instagram',       client: 'Culture Thaï',   detail: 'Contenus animés · Stratégie éditoriale' },
  { image: '/images/card-10.jpg', format: 'story',  label: 'Flyer promotionnel',   client: 'La Maison Burger', detail: 'Visuel campagne · Social Media' },
  { image: '/images/card-7.jpg',  format: 'square', label: 'Visuel promotionnel',  client: 'DnnUp',          detail: 'Campagne produit · Identité visuelle' },
  { image: '/images/card-8.jpg',  format: 'square', label: 'Post Instagram',       client: 'La Roche-Posay', detail: 'Visuel produit · Campagne réseaux' },
  // { image: '/images/visuel-X.jpg', format: 'story', label: 'Flyer', client: 'Client', detail: '...' },
];

// ─────────────────────────────────────────────
// Section 1 — Sites Web (carrousel 3D)
// ─────────────────────────────────────────────
function SitesSectionGallery() {
  return (
    <CircularGallery radius={520} cardWidth={360} cardHeight={260} containerHeight={500} autoRotateSpeed={0.14}>
      {SITES.map((site) => (
        <a
          key={site.url}
          href={site.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
        >
          {/* Mockup navigateur */}
          <div className="browser-mockup" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="browser-bar">
              <span className="browser-dot" style={{ background: '#FF5F57' }} />
              <span className="browser-dot" style={{ background: '#FEBC2E' }} />
              <span className="browser-dot" style={{ background: '#28C840' }} />
              <div className="browser-url">{site.url}</div>
            </div>
            <div className="browser-screen" style={{ flex: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.image}
                alt={site.client}
                className="gallery-img"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: site.objectPosition }}
              />
              <div className="gallery-overlay">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>{site.category}</span>
                  <span className="gallery-overlay-result">{site.client}</span>
                  <span style={{ fontSize: 13, color: 'var(--accent-light)', fontWeight: 600 }}>{site.result}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </CircularGallery>
  );
}

// ─────────────────────────────────────────────
// Section 2 — Créations Graphiques (carrousel 3D)
// ─────────────────────────────────────────────
function VisuelsSectionGallery() {
  return (
    <CircularGallery radius={580} cardWidth={220} cardHeight={310} containerHeight={520} autoRotateSpeed={0.16}>
      {VISUELS.map((v, i) => (
        <div key={i} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="gallery-img-wrap" style={{ flex: 1, borderRadius: 14, overflow: 'hidden', position: 'relative', background: '#111' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.image}
              alt={v.client}
              className="gallery-img"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="gallery-overlay">
              <span className="gallery-overlay-result">{v.label}</span>
            </div>
          </div>
          <div className="gallery-info" style={{ padding: '0 2px' }}>
            <p className="gallery-category">{v.label}</p>
            <p className="gallery-client">{v.client}</p>
            <p className="gallery-detail">{v.detail}</p>
          </div>
        </div>
      ))}
    </CircularGallery>
  );
}

// ─────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────
export function Realisations() {
  return (
    <section
      id="realisations"
      style={{ background: 'var(--dark)', overflow: 'hidden' }}
    >

      {/* ── BLOC 1 : Sites Web ── */}
      <div style={{ padding: 'clamp(64px, 8vw, 120px) 0 clamp(48px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>
              Nos Réalisations
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <SectionHeading accent="convertissent" style={{ color: '#ffffff' }}>
              Des sites qui vraiment
            </SectionHeading>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 520, marginTop: 16 }}>
              Des sites conçus pour générer de vrais clients, pas du trafic vide.
            </p>
          </FadeIn>
        </div>
        <SitesSectionGallery />
      </div>

      {/* Séparateur */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* ── BLOC 2 : Créations Graphiques ── */}
      <div style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>
              Créations Graphiques
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <SectionHeading accent="performent" style={{ color: '#ffffff' }}>
              Des visuels qui vraiment
            </SectionHeading>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 520, marginTop: 16 }}>
              Posts, stories et flyers conçus pour capter l&apos;attention et la convertir.
            </p>
          </FadeIn>
        </div>
        <VisuelsSectionGallery />
      </div>

      {/* CTA */}
      <FadeIn direction="up" delay={0.2}>
        <div style={{ textAlign: 'center', paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
          <a
            href="/audit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 64, padding: '14px 32px', fontSize: 15, fontWeight: 600,
              textDecoration: 'none', transition: 'all 300ms',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.borderColor = 'rgba(255,255,255,0.3)'; el.style.color = '#ffffff'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,0.15)'; el.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            Obtenir ces résultats
          </a>
        </div>
      </FadeIn>

      <style>{`
        /* ── Browser mockup ── */
        .browser-mockup {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111;
          width: 100%;
          height: 100%;
        }
        .browser-bar {
          height: 32px;
          background: #1e1e1e;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 6px;
          flex-shrink: 0;
        }
        .browser-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .browser-url {
          flex: 1;
          height: 17px;
          background: #111;
          border-radius: 4px;
          margin: 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: monospace;
        }
        .browser-screen {
          position: relative;
          overflow: hidden;
          flex: 1;
        }

        /* ── Image commune ── */
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .browser-screen .gallery-img {
          position: absolute;
          inset: 0;
        }

        /* ── Overlay ── */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.92) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 350ms ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }
        a:hover .gallery-overlay,
        div:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay-result {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        /* ── Texte infos ── */
        .gallery-info { display: flex; flex-direction: column; gap: 3px; }
        .gallery-category {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin: 0;
        }
        .gallery-client {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 15px;
          color: #ffffff; letter-spacing: -0.02em; line-height: 1.1; margin: 0;
        }
        .gallery-detail { font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.5; margin: 0; }
      `}</style>
    </section>
  );
}
