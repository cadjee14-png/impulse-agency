'use client';

import { useRef, useEffect } from 'react';
import { FadeIn } from '@/components/animations/fade-in';
import { SectionHeading } from '@/components/animations/section-heading';

// ─────────────────────────────────────────────
// DONNÉES — ajouter ici les nouveaux projets
// ─────────────────────────────────────────────

const SITES = [
  {
    url: 'viboost.fr',
    image: '/images/card-4.jpg',
    objectPosition: 'top center',
    client: 'ViBoost',
    category: 'Site Web · Réservation en ligne',
    result: '×3 prises de rendez-vous',
    link: 'https://viboost.fr',
  },
  // { url: 'exemple.fr', image: '/images/site-X.jpg', objectPosition: 'top', client: 'Client', category: 'Site Web · ...', result: '...', link: 'https://exemple.fr' },
];

const VISUELS: {
  image: string;
  format: 'square' | 'story';
  label: string;
  client: string;
  detail: string;
}[] = [
  { image: '/images/card-3.jpg', format: 'square', label: 'Post Instagram', client: 'Chick & Cheez', detail: 'Création de contenu · Social Media' },
  { image: '/images/card-2.jpg', format: 'square', label: 'Post Instagram', client: 'Pokebab', detail: "Campagne d'ouverture · Branding" },
  { image: '/images/card-1.jpg', format: 'square', label: 'Post Instagram', client: 'Culture Thaï', detail: 'Contenus animés · Stratégie éditoriale' },
  { image: '/images/card-5.jpg', format: 'story', label: 'Flyer', client: 'WilliBarber', detail: 'Création de flyers · Recrutement' },
  { image: '/images/card-6.jpg', format: 'story', label: 'Menu & Flyer', client: 'Napolino', detail: 'Création de menu · Identité visuelle' },
  // { image: '/images/visuel-X.jpg', format: 'story', label: 'Story Instagram', client: 'Client', detail: '...' },
];

// Triplicate pour le scroll infini
const VISUELS_TRACK = [...VISUELS, ...VISUELS, ...VISUELS];
const SITES_TRACK = SITES.length >= 3 ? [...SITES, ...SITES, ...SITES] : SITES;

// ─────────────────────────────────────────────
// Hook scroll auto-infini réutilisable
// ─────────────────────────────────────────────
function useAutoScroll(speed = 0.6) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef(false);
  const speedRef  = useRef(speed);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isMobile = window.innerWidth < 768;
    speedRef.current = isMobile ? 1.1 : speed;

    const half = track.scrollWidth / 3;
    track.scrollLeft = half;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += speedRef.current;
        if (track.scrollLeft >= (track.scrollWidth / 3) * 2) track.scrollLeft -= track.scrollWidth / 3;
        if (track.scrollLeft <= 0) track.scrollLeft += track.scrollWidth / 3;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const scrollBy = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    const cardW = track.querySelector<HTMLElement>('.gallery-card')?.offsetWidth ?? 300;
    track.scrollBy({ left: dir * (cardW + 20), behavior: 'smooth' });
    setTimeout(() => { pausedRef.current = false; }, 2000);
  };

  return { trackRef, pausedRef, scrollBy };
}

// ─────────────────────────────────────────────
// Section 1 — Sites Web
// ─────────────────────────────────────────────
function SitesSectionGallery() {
  const { trackRef, pausedRef, scrollBy } = useAutoScroll(0.5);

  return (
    <div style={{ position: 'relative' }}>

      <button onClick={() => scrollBy(-1)} className="gallery-arrow gallery-arrow-left" aria-label="Précédent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div
        ref={trackRef}
        className="gallery-track"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {SITES_TRACK.map((site, i) => (
          <div key={i} className="gallery-card site-card">
            {/* Mockup navigateur */}
            <div className="browser-mockup">
              <div className="browser-bar">
                <span className="browser-dot" style={{ background: '#FF5F57' }} />
                <span className="browser-dot" style={{ background: '#FEBC2E' }} />
                <span className="browser-dot" style={{ background: '#28C840' }} />
                <div className="browser-url">{site.url}</div>
              </div>
              <div className="browser-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.image}
                  alt={site.client}
                  className="gallery-img"
                  style={{ objectPosition: site.objectPosition }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-result">{site.result}</span>
                </div>
              </div>
            </div>
            {/* Infos */}
            <div className="gallery-info">
              <p className="gallery-category">{site.category}</p>
              <p className="gallery-client">{site.client}</p>
              <a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
                onClick={e => e.stopPropagation()}
              >
                Voir le site
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scrollBy(1)} className="gallery-arrow gallery-arrow-right" aria-label="Suivant">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="gallery-fade-left" />
      <div className="gallery-fade-right" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Section 2 — Créations Graphiques
// ─────────────────────────────────────────────
function VisuelsSectionGallery() {
  const { trackRef, pausedRef, scrollBy } = useAutoScroll(0.6);

  return (
    <div style={{ position: 'relative' }}>

      <button onClick={() => scrollBy(-1)} className="gallery-arrow gallery-arrow-left" aria-label="Précédent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div
        ref={trackRef}
        className="gallery-track"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {VISUELS_TRACK.map((v, i) => (
          <div key={i} className={`gallery-card visuel-card visuel-${v.format}`}>
            <div className="gallery-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.image} alt={v.client} className="gallery-img" />
              <div className="gallery-overlay">
                <span className="gallery-overlay-result">{v.label}</span>
              </div>
            </div>
            <div className="gallery-info">
              <p className="gallery-category">{v.label}</p>
              <p className="gallery-client">{v.client}</p>
              <p className="gallery-detail">{v.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scrollBy(1)} className="gallery-arrow gallery-arrow-right" aria-label="Suivant">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="gallery-fade-left" />
      <div className="gallery-fade-right" />
    </div>
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
        /* ── Track ── */
        .gallery-track {
          display: flex;
          gap: 20px;
          overflow-x: scroll;
          scroll-behavior: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 4px 60px;
          cursor: grab;
          align-items: flex-start;
        }
        .gallery-track::-webkit-scrollbar { display: none; }

        /* ── Card base ── */
        .gallery-card {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── Site card ── */
        .site-card { width: clamp(280px, 32vw, 420px); }

        /* ── Browser mockup ── */
        .browser-mockup {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111;
        }
        .browser-bar {
          height: 34px;
          background: #1e1e1e;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 6px;
          flex-shrink: 0;
        }
        .browser-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .browser-url {
          flex: 1;
          height: 18px;
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
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        /* ── Visuel card ── */
        .visuel-square { width: clamp(200px, 22vw, 280px); }
        .visuel-story  { width: clamp(140px, 15vw, 200px); }

        /* ── Image commune ── */
        .gallery-img-wrap {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
        }
        .visuel-square .gallery-img-wrap { aspect-ratio: 1 / 1; }
        .visuel-story  .gallery-img-wrap { aspect-ratio: 9 / 16; }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
          pointer-events: none;
        }
        .browser-screen .gallery-img {
          position: absolute;
          inset: 0;
        }
        .gallery-card:hover .gallery-img { transform: scale(1.04); }

        /* ── Overlay ── */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.88) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 400ms ease;
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }
        .gallery-card:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay-result {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(14px, 1.6vw, 20px);
          color: var(--accent-light);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ── Texte infos ── */
        .gallery-info { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
        .gallery-category {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin: 0;
        }
        .gallery-client {
          font-family: var(--font-heading); font-weight: 800;
          font-size: clamp(14px, 1.5vw, 18px);
          color: #ffffff; letter-spacing: -0.02em; line-height: 1.1; margin: 0;
        }
        .gallery-detail { font-size: 12px; color: rgba(255,255,255,0.4); line-height: 1.5; margin: 0; }

        /* ── Lien site ── */
        .site-link {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-light);
          text-decoration: none;
          margin-top: 2px;
          transition: opacity 200ms;
          font-family: var(--font-heading);
          letter-spacing: -0.01em;
        }
        .site-link:hover { opacity: 0.7; }

        /* ── Flèches ── */
        .gallery-arrow {
          position: absolute;
          top: 38%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 250ms ease;
        }
        .gallery-arrow:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.3);
          color: #ffffff;
        }
        .gallery-arrow-left  { left: 12px; }
        .gallery-arrow-right { right: 12px; }

        /* ── Dégradés ── */
        .gallery-fade-left,
        .gallery-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          pointer-events: none;
          z-index: 5;
        }
        .gallery-fade-left  { left: 0;  background: linear-gradient(to right, var(--dark), transparent); }
        .gallery-fade-right { right: 0; background: linear-gradient(to left,  var(--dark), transparent); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .site-card      { width: 260px; }
          .visuel-square  { width: 180px; }
          .visuel-story   { width: 130px; }
          .gallery-track  { gap: 14px; padding: 4px 48px; }
          .gallery-arrow  { width: 36px; height: 36px; }
        }
      `}</style>
    </section>
  );
}
