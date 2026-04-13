'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Magnetic } from '@/components/animations/magnetic';
import { siteConfig } from '@/data/site';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Initial states
    gsap.set([labelRef.current], { y: 20, opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current], { y: '105%', opacity: 0, filter: 'blur(12px)' });
    gsap.set(subtextRef.current, { opacity: 0, y: 16 });
    if (ctaGroupRef.current) {
      const ctaItems = ctaGroupRef.current.children;
      gsap.set(ctaItems, { y: 24, opacity: 0 });
    }
    gsap.set(badgeRef.current, { opacity: 0, y: 10, scale: 0.95 });
    if (statsRef.current) {
      const statItems = statsRef.current.children;
      gsap.set(statItems, { y: 20, opacity: 0 });
    }
    gsap.set(scrollIndRef.current, { opacity: 0 });

    tl
      .to(labelRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.15)
      .to([line1Ref.current, line2Ref.current], {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.0,
        stagger: 0.1,
      }, 0.35)
      .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
      .to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.0)
      .to(ctaGroupRef.current ? Array.from(ctaGroupRef.current.children) : [], {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
      }, 1.1)
      .to(statsRef.current ? Array.from(statsRef.current.children) : [], {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
      }, 1.35)
      .to(scrollIndRef.current, { opacity: 1, duration: 0.5 }, 1.6);

    return () => { tl.kill(); };
  }, []);

  const scrollToRealisations = () => {
    document.querySelector('#realisations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-mesh"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(120px, 15vw, 180px) clamp(24px, 5vw, 80px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent blur */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,186,244,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        animation: 'floatBlur 8s ease-in-out infinite alternate',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,70,107,0.10) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        animation: 'floatBlur 10s ease-in-out infinite alternate-reverse',
      }} />

      <style>{`
        @keyframes floatBlur {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <span
          ref={labelRef}
          className="section-label"
          style={{ display: 'block', marginBottom: 24 }}
        >
          Agence Digitale Full-Service
        </span>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(38px, 7.5vw, 112px)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            marginBottom: 'clamp(24px, 3vw, 40px)',
            maxWidth: 1000,
          }}
        >
          <div ref={line1Ref} style={{ overflow: 'hidden', willChange: 'transform, opacity, filter' }}>
            <span style={{ display: 'block' }}>Transformez</span>
          </div>
          <div ref={line2Ref} style={{ overflow: 'hidden', willChange: 'transform, opacity, filter' }}>
            <span style={{ display: 'block' }}>votre{' '}
              <span style={{
                color: 'var(--accent)',
                position: 'relative',
                display: 'inline-block',
              }}>
                business
                <svg
                  style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '6px', overflow: 'visible' }}
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                >
                  <path d="M0,5 Q25,0 50,4 Q75,8 100,3" stroke="var(--accent-light)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ display: 'block', color: 'var(--text-dim)' }}>en ligne.</span>
          </div>
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
            maxWidth: 560,
            marginBottom: 40,
          }}
        >
          {siteConfig.subtext}
        </p>

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(103,186,244,0.10)',
            border: '1px solid rgba(103,186,244,0.30)',
            borderRadius: 32,
            padding: '8px 18px',
            fontSize: 13,
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: 28,
            letterSpacing: '0.01em',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-light)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span>Audit offert — Sans engagement</span>
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }`}</style>
        </div>

        {/* CTAs */}
        <div
          ref={ctaGroupRef}
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 'clamp(40px, 5vw, 64px)',
          }}
        >
          <Magnetic>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 64,
                padding: 'clamp(14px, 2vw, 18px) clamp(28px, 4vw, 40px)',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                transition: 'background 300ms var(--ease-expo), transform 300ms var(--ease-expo), box-shadow 300ms',
                boxShadow: '0 8px 32px rgba(30,70,107,0.25)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--accent-dim)';
                el.style.boxShadow = '0 16px 48px rgba(30,70,107,0.35)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--accent)';
                el.style.boxShadow = '0 8px 32px rgba(30,70,107,0.25)';
              }}
            >
              Recevoir mon audit gratuit →
            </a>
          </Magnetic>

          <button
            onClick={scrollToRealisations}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--line-hover)',
              borderRadius: 64,
              padding: 'clamp(14px, 2vw, 18px) clamp(24px, 3vw, 32px)',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              transition: 'border-color 300ms, background 300ms',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'var(--accent)';
              el.style.background = 'rgba(30,70,107,0.04)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'var(--line-hover)';
              el.style.background = 'transparent';
            }}
          >
            Voir nos réalisations
          </button>
        </div>

        {/* Hero Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 48px)',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingTop: 'clamp(20px, 3vw, 32px)',
            borderTop: '1px solid var(--line)',
          }}
        >
          {[
            { value: '200+', label: 'Marques' },
            { value: 'x3.4', label: 'ROI moyen' },
            { value: '24h', label: 'Setup' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  color: 'var(--accent)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating metric cards — desktop only */}
      <div className="hero-floaters" style={{
        position: 'absolute',
        right: 'clamp(24px, 5vw, 80px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        pointerEvents: 'none',
      }}>
        {[
          { label: 'ROAS moyen', value: '5.2×', color: 'var(--accent-light)', delay: '0s' },
          { label: 'Engagement', value: '+340%', color: '#25D366', delay: '0.3s' },
          { label: 'Marques', value: '200+', color: 'var(--accent)', delay: '0.6s' },
        ].map((card, i) => (
          <div key={i} style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            animation: `floatCard 4s ease-in-out infinite`,
            animationDelay: card.delay,
            backdropFilter: 'blur(8px)',
            minWidth: 170,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `${card.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: card.color }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>{card.label}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{card.value}</div>
            </div>
          </div>
        ))}
        <style>{`
          @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @media(max-width:900px){ .hero-floaters { display: none !important; } }
        `}</style>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'bounce 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
