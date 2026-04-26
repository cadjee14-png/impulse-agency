'use client';

import { useRef, useState, useEffect } from 'react';
import { SectionHeading } from '@/components/animations/section-heading';
import { FadeIn } from '@/components/animations/fade-in';
import { testimonials } from '@/data/site';

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.offsetWidth);
      setActiveIndex(index);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', maxWidth: 640 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
            Ils nous font confiance
          </span>
          <SectionHeading accent="témoignent">
            Nos clients
          </SectionHeading>
        </div>

        {/* Desktop — editorial rows */}
        <div className="testimonials-desktop" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr 1fr',
                  gap: 'clamp(24px, 4vw, 64px)',
                  alignItems: 'start',
                  padding: 'clamp(32px, 4vw, 56px) 0',
                  borderBottom: i < testimonials.length - 1 ? '1px solid var(--line)' : 'none',
                }}
              >
                {/* Author */}
                <div style={{ paddingTop: 8 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12, color: 'white',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18,
                  }}>
                    {t.author[0]}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{t.author}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</p>
                  <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{t.company}</p>
                </div>

                {/* Quote */}
                <div>
                  <div style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    color: 'var(--text)', lineHeight: 1.3,
                    letterSpacing: '-0.02em', marginBottom: 16,
                  }}>
                    &ldquo;{t.quote}&rdquo;
                  </div>
                  <div style={{ width: 40, height: 2, background: 'var(--accent)', borderRadius: 2 }} />
                </div>

                {/* Metric */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1,
                    background: 'rgba(30,70,107,0.08)', borderRadius: 12, padding: '12px 16px',
                  }}>
                    {t.metric}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile — swipe carousel */}
        <div className="testimonials-mobile">
          <div
            ref={trackRef}
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
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 100%',
                  scrollSnapAlign: 'start',
                  background: 'var(--bg)',
                  borderRadius: 20,
                  padding: '28px 24px',
                  border: '1px solid var(--line)',
                }}
              >
                {/* Metric badge */}
                <div style={{ marginBottom: 20 }}>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22,
                    color: 'var(--accent)', letterSpacing: '-0.03em',
                    background: 'rgba(30,70,107,0.08)', borderRadius: 10, padding: '8px 14px',
                  }}>
                    {t.metric}
                  </span>
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: 17, fontFamily: 'var(--font-heading)', fontWeight: 700,
                  color: 'var(--text)', lineHeight: 1.4, letterSpacing: '-0.02em',
                  marginBottom: 24,
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div style={{ width: 32, height: 2, background: 'var(--accent)', borderRadius: 2, marginBottom: 20 }} />

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {t.author[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{t.author}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role} · <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{t.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: activeIndex === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeIndex === i ? 'var(--accent)' : 'var(--line)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                }}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-mobile { display: none; }
        .testimonials-mobile div::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .testimonials-desktop { display: none !important; }
          .testimonials-mobile { display: block; }
        }
      `}</style>
    </section>
  );
}
