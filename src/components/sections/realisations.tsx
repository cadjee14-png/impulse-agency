'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineMask } from '@/components/animations/line-mask';
import { FadeIn } from '@/components/animations/fade-in';
import { realisations } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function Realisations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const stickyImageRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.offsetWidth);
      setMobileIndex(index);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    realisations.forEach((_, i) => {
      const el = document.querySelector(`#case-${i}`);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setActiveIndex(i);
          const imgContainer = stickyImageRef.current;
          if (imgContainer) {
            gsap.to(imgContainer, { opacity: 0, scale: 1.03, duration: 0.3, ease: 'expo.out',
              onComplete: () => {
                setActiveIndex(i);
                gsap.to(imgContainer, { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
              }
            });
          }
        },
        onEnterBack: () => {
          setActiveIndex(i);
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
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
          <LineMask
            as="h2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              color: 'var(--text)',
              maxWidth: 700,
            }}
          >
            {`Des résultats qui parlent\nd'eux-mêmes`}
          </LineMask>
        </div>

        {/* Desktop: sticky image + scrollable cases */}
        <div
          className="realisations-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 4vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Sticky image */}
          <div
            style={{
              position: 'sticky',
              top: 120,
            }}
            className="sticky-image-col"
          >
            <div
              ref={stickyImageRef}
              style={{
                borderRadius: 'var(--radius-card)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                position: 'relative',
                background: 'var(--surface-2)',
              }}
            >
              <Image
                src={realisations[activeIndex].image}
                alt={realisations[activeIndex].title}
                fill
                style={{ objectFit: 'cover', transition: 'opacity 600ms var(--ease-expo)' }}
                className="img-treated"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(30,70,107,0.3) 0%, transparent 60%)',
                  borderRadius: 'var(--radius-card)',
                }}
              />
              {/* Tags overlay */}
              <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {realisations[activeIndex].tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: 'var(--accent)',
                      borderRadius: 32,
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Case studies */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 5vw, 64px)' }}>
            {realisations.map((item, i) => (
              <div
                key={i}
                id={`case-${i}`}
                style={{
                  padding: 'clamp(28px, 3vw, 40px)',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--line)',
                  transition: 'border-color 400ms, box-shadow 400ms',
                  ...(activeIndex === i ? {
                    borderColor: 'var(--line-hover)',
                    boxShadow: 'var(--shadow-card)',
                  } : {}),
                }}
              >
                {/* Mobile image */}
                <div
                  className="mobile-case-image"
                  style={{
                    display: 'none',
                    borderRadius: 12,
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    position: 'relative',
                    marginBottom: 24,
                    background: 'var(--bg-2)',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="90vw"
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        background: 'rgba(30,70,107,0.08)',
                        color: 'var(--accent)',
                        borderRadius: 32,
                        padding: '4px 12px',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {item.category}
                </p>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    color: 'var(--text)',
                    letterSpacing: '-0.025em',
                    marginBottom: 12,
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    color: 'var(--accent)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {item.metric}
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      fontSize: 14,
                      color: 'var(--text-muted)',
                      marginLeft: 8,
                      letterSpacing: 0,
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="realisations-mobile">
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
                {/* Image */}
                <div style={{ aspectRatio: '16/9', position: 'relative', background: 'var(--bg-2)' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="90vw"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(30,70,107,0.3) 0%, transparent 60%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} style={{
                        background: 'rgba(255,255,255,0.9)', color: 'var(--accent)',
                        borderRadius: 32, padding: '3px 10px', fontSize: 11, fontWeight: 600,
                        backdropFilter: 'blur(8px)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '24px 20px' }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.category}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 22, color: 'var(--text)', letterSpacing: '-0.025em',
                    marginBottom: 8, lineHeight: 1,
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: 32, color: 'var(--accent)', letterSpacing: '-0.04em',
                    lineHeight: 1, marginBottom: 12,
                  }}>
                    {item.metric}
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13, color: 'var(--text-muted)', marginLeft: 6 }}>
                      {item.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {realisations.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  width: mobileIndex === i ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: mobileIndex === i ? 'var(--accent)' : 'var(--line)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                }}
                aria-label={`Réalisation ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 80px)' }}>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--accent)',
                border: '1px solid var(--line-hover)',
                borderRadius: 64,
                padding: '14px 32px',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 300ms, border-color 300ms',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(30,70,107,0.05)';
                el.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'var(--line-hover)';
              }}
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
          .realisations-layout { display: none !important; }
          .realisations-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
