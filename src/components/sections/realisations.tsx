'use client';

import { useRef, useEffect } from 'react';
import { FadeIn } from '@/components/animations/fade-in';
import { SectionHeading } from '@/components/animations/section-heading';

const PROJECTS = [
  {
    image: '/images/card-1.jpg',
    objectPosition: 'center',
    client: 'Chick & Cheez',
    category: 'Social Media · Identité visuelle',
    result: 'Lancement réussi',
    detail: 'Création de contenu + stratégie réseaux sociaux',
  },
  {
    image: '/images/card-2.jpg',
    objectPosition: 'center',
    client: 'Pokebab',
    category: 'Social Media · Branding',
    result: 'Ouverture à Marseille',
    detail: "Campagne d'ouverture + animation réseaux",
  },
  {
    image: '/images/card-3.jpg',
    objectPosition: 'center',
    client: 'Culture Thaï',
    category: 'Social Media · Publicité',
    result: '+60% d\'engagement',
    detail: 'Contenus animés + stratégie éditoriale',
  },
  {
    image: '/images/card-4.jpg',
    objectPosition: 'top center',
    client: 'ViBoost',
    category: 'Site Web · Réservation en ligne',
    result: '×3 prises de rendez-vous',
    detail: 'Système de réservation en ligne + site vitrine',
  },
  {
    image: '/images/card-5.jpg',
    objectPosition: 'center',
    client: 'WilliBarber',
    category: 'Social Media · Recrutement',
    result: 'Campagne recrutement',
    detail: 'Création de flyers + stratégie de contenu',
  },
  {
    image: '/images/card-6.jpg',
    objectPosition: 'top center',
    client: 'Napolino',
    category: 'Social Media · Identité visuelle',
    result: 'Menu & flyers',
    detail: 'Création de menu + supports visuels',
  },
];

const TRACK = [...PROJECTS, ...PROJECTS, ...PROJECTS];

export function Realisations() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const pausedRef = useRef(false);
  const speedRef  = useRef(0.6);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isMobile = window.innerWidth < 768;
    speedRef.current = isMobile ? 1.1 : 0.6;

    /* Position de départ au milieu du track pour l'infini */
    const half = track.scrollWidth / 3;
    track.scrollLeft = half;

    const tick = () => {
      if (!pausedRef.current && track) {
        track.scrollLeft += speedRef.current;
        /* Reset pour loop infini */
        if (track.scrollLeft >= (track.scrollWidth / 3) * 2) {
          track.scrollLeft -= track.scrollWidth / 3;
        }
        if (track.scrollLeft <= 0) {
          track.scrollLeft += track.scrollWidth / 3;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    /* Pause 2s après clic flèche */
    pausedRef.current = true;
    const cardW = track.querySelector<HTMLElement>('.gallery-card')?.offsetWidth ?? 300;
    track.scrollBy({ left: dir * (cardW + 20), behavior: 'smooth' });
    setTimeout(() => { pausedRef.current = false; }, 2000);
  };

  return (
    <section
      id="realisations"
      style={{ padding: 'clamp(64px, 8vw, 120px) 0', background: 'var(--dark)', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
        <FadeIn direction="up">
          <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>
            Nos Réalisations
          </span>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <SectionHeading accent="concrets" style={{ color: '#ffffff', whiteSpace: 'nowrap' }}>
            Des résultats vraiment
          </SectionHeading>
        </FadeIn>
      </div>

      {/* Galerie */}
      <div style={{ position: 'relative' }}>

        {/* Flèche gauche */}
        <button
          onClick={() => scrollBy(-1)}
          className="gallery-arrow gallery-arrow-left"
          aria-label="Précédent"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="gallery-track"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {TRACK.map((project, i) => (
            <div key={i} className="gallery-card">
              <div className="gallery-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.client} className="gallery-img" style={{ objectPosition: project.objectPosition }} />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-result">{project.result}</span>
                </div>
              </div>
              <div className="gallery-info">
                <p className="gallery-category">{project.category}</p>
                <p className="gallery-client">{project.client}</p>
                <p className="gallery-detail">{project.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Flèche droite */}
        <button
          onClick={() => scrollBy(1)}
          className="gallery-arrow gallery-arrow-right"
          aria-label="Suivant"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dégradés latéraux */}
        <div className="gallery-fade-left" />
        <div className="gallery-fade-right" />
      </div>

      {/* CTA */}
      <FadeIn direction="up" delay={0.2}>
        <div style={{ textAlign: 'center', marginTop: 'clamp(40px, 5vw, 60px)' }}>
          <a
            href="/audit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 64, padding: '14px 32px', fontSize: 15, fontWeight: 600,
              textDecoration: 'none', transition: 'all 300ms',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'rgba(255,255,255,0.08)';
              el.style.borderColor = 'rgba(255,255,255,0.3)';
              el.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.borderColor = 'rgba(255,255,255,0.15)';
              el.style.color = 'rgba(255,255,255,0.8)';
            }}
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
        }
        .gallery-track::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .gallery-card {
          flex-shrink: 0;
          width: clamp(240px, 26vw, 340px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── Image ── */
        .gallery-img-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
          pointer-events: none;
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
          padding: 20px;
        }
        .gallery-card:hover .gallery-overlay { opacity: 1; }
        .gallery-overlay-result {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(16px, 1.8vw, 22px);
          color: var(--accent-light);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ── Texte ── */
        .gallery-info { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
        .gallery-category {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.35); margin: 0;
        }
        .gallery-client {
          font-family: var(--font-heading); font-weight: 800;
          font-size: clamp(15px, 1.6vw, 19px);
          color: #ffffff; letter-spacing: -0.02em; line-height: 1.1; margin: 0;
        }
        .gallery-detail { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.5; margin: 0; }

        /* ── Flèches ── */
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
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
          .gallery-card { width: 220px; }
          .gallery-track { gap: 14px; padding: 4px 48px; }
          .gallery-arrow { width: 36px; height: 36px; }
        }
      `}</style>
    </section>
  );
}
