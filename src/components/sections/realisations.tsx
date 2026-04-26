'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/animations/section-heading';
import { FadeIn } from '@/components/animations/fade-in';
import { realisations } from '@/data/site';

export function Realisations() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setMobileIndex(Math.round(track.scrollLeft / track.offsetWidth));
  };

  return (
    <section
      id="realisations"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
            Nos Réalisations
          </span>
          <SectionHeading accent="concrets" style={{ maxWidth: 700 }}>
            Des résultats vraiment
          </SectionHeading>
        </div>

        {/* Desktop: image + content side by side per project */}
        <div className="realisations-desktop" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 48px)' }}>
          {realisations.map((item, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'clamp(24px, 3vw, 48px)',
                  alignItems: 'center',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                }}
              >
                {/* Image — alternates left/right */}
                <div
                  style={{
                    order: i % 2 === 0 ? 0 : 1,
                    aspectRatio: '4/3',
                    position: 'relative',
                    background: 'var(--bg-2)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="img-treated"
                    sizes="50vw"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(30,70,107,0.25) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} style={{
                        background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
                        borderRadius: 32, padding: '4px 12px', fontSize: 11, fontWeight: 600,
                        backdropFilter: 'blur(8px)', letterSpacing: '0.02em',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'clamp(28px, 3vw, 40px)', order: i % 2 === 0 ? 1 : 0 }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.category}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 'clamp(22px, 2.5vw, 32px)', color: 'var(--text)',
                    letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1,
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--accent)',
                    letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16,
                  }}>
                    {item.metric}
                    <span style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400,
                      fontSize: 14, color: 'var(--text-muted)', marginLeft: 8, letterSpacing: 0,
                    }}>
                      {item.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="realisations-mobile">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              gap: 16,
              paddingBottom: 4,
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {realisations.map((item, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 100%',
                  scrollSnapAlign: 'start',
                  background: 'var(--surface)',
                  borderRadius: 20,
                  border: '1px solid var(--line)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '16/9', position: 'relative', background: 'var(--bg-2)' }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="90vw" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,70,107,0.3) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} style={{
                        background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
                        borderRadius: 32, padding: '3px 10px', fontSize: 11, fontWeight: 600, backdropFilter: 'blur(8px)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '24px 20px' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.category}</p>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: 8, lineHeight: 1 }}>{item.title}</h3>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 32, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }}>
                    {item.metric}
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13, color: 'var(--text-muted)', marginLeft: 6 }}>{item.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {realisations.map((_, i) => (
              <button key={i} onClick={() => scrollTo(i)} style={{
                width: mobileIndex === i ? 24 : 8, height: 8, borderRadius: 4,
                background: mobileIndex === i ? 'var(--accent)' : 'var(--line)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
              }} aria-label={`Réalisation ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 80px)' }}>
            <a
              href="/audit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: 'var(--accent)', border: '1px solid var(--line-hover)',
                borderRadius: 64, padding: '14px 32px', fontSize: 15, fontWeight: 600,
                textDecoration: 'none', transition: 'background 300ms, border-color 300ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(30,70,107,0.05)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line-hover)'; }}
            >
              Obtenir ces résultats →
            </a>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .realisations-mobile { display: none; }
        .realisations-mobile div::-webkit-scrollbar { display: none; }
        @media (max-width: 900px) {
          .realisations-desktop { display: none !important; }
          .realisations-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
