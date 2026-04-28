'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { SectionHeading } from '@/components/animations/section-heading';

/* ─── Projets — à mettre à jour avec les vrais contenus ─── */
const PROJECTS = [
  {
    image: '/images/card-1.jpg',
    client: 'Chick & Cheez',
    category: 'Social Media · Identité visuelle',
    result: 'Lancement réussi',
    detail: 'Création de contenu + stratégie réseaux sociaux',
  },
  {
    image: '/images/card-2.jpg',
    client: 'Pokebab',
    category: 'Social Media · Branding',
    result: 'Ouverture à Marseille',
    detail: 'Campagne d\'ouverture + animation réseaux',
  },
  {
    image: '/images/card-3.jpg',
    client: 'Culture Thaï',
    category: 'Social Media · Publicité',
    result: '+60% d\'engagement',
    detail: 'Contenus animés + stratégie éditoriale',
  },
];

/* Dupliquer pour le défilement infini */
const TRACK = [...PROJECTS, ...PROJECTS, ...PROJECTS];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="gallery-card">
      {/* Image */}
      <div className="gallery-img-wrap">
        <img
          src={project.image}
          alt={project.client}
          className="gallery-img"
        />
        {/* Overlay au hover */}
        <div className="gallery-overlay">
          <span className="gallery-overlay-result">{project.result}</span>
        </div>
      </div>

      {/* Texte */}
      <div className="gallery-info">
        <p className="gallery-category">{project.category}</p>
        <p className="gallery-client">{project.client}</p>
        <p className="gallery-detail">{project.detail}</p>
      </div>
    </div>
  );
}

export function Realisations() {
  return (
    <section
      id="realisations"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--dark)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
        <FadeIn direction="up">
          <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>
            Nos Réalisations
          </span>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <SectionHeading
            accent="concrets"
            style={{ color: '#ffffff', maxWidth: 600 }}
          >
            Des résultats vraiment
          </SectionHeading>
        </FadeIn>
      </div>

      {/* Galerie défilante */}
      <div className="gallery-track-wrap">
        <div className="gallery-track">
          {TRACK.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
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
              backdropFilter: 'blur(8px)',
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
        /* ─── Track ─── */
        .gallery-track-wrap {
          width: 100%;
          overflow: hidden;
          cursor: default;
        }
        .gallery-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: galleryScroll 30s linear infinite;
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
        @keyframes galleryScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }

        /* ─── Card ─── */
        .gallery-card {
          flex-shrink: 0;
          width: clamp(260px, 28vw, 360px);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ─── Image ─── */
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
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.04);
        }

        /* ─── Overlay ─── */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,22,40,0.85) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 400ms ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-overlay-result {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(18px, 2vw, 24px);
          color: var(--accent-light);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* ─── Texte ─── */
        .gallery-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 4px;
        }
        .gallery-category {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }
        .gallery-client {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(16px, 1.8vw, 20px);
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .gallery-detail {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
          margin: 0;
        }

        /* ─── Mobile ─── */
        @media (max-width: 768px) {
          .gallery-card { width: 240px; }
          .gallery-track { gap: 14px; }
        }
      `}</style>
    </section>
  );
}
