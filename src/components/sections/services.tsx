'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineMask } from '@/components/animations/line-mask';
import { services } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setExpanded(true);
    if (subRef.current) {
      const items = subRef.current.querySelectorAll('.sub-item');
      gsap.fromTo(items, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'expo.out' });
    }
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderBottom: '1px solid var(--line)',
        cursor: 'none',
        transition: 'background 300ms',
        background: expanded ? 'rgba(30,70,107,0.03)' : 'transparent',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 3,
          height: '100%',
          background: 'var(--accent)',
          transform: expanded ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 400ms var(--ease-expo)',
        }}
      />

      <div style={{ padding: '0 clamp(24px, 4vw, 64px)' }}>
        {/* Main row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            height: 80,
            paddingLeft: 16,
          }}
        >
          {/* Number + Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)', flex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(13px, 1.5vw, 16px)',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                minWidth: 28,
              }}
            >
              {service.number}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 3vw, 36px)',
                color: 'var(--text)',
                letterSpacing: '-0.025em',
                lineHeight: 1,
                transition: 'color 300ms',
                ...(expanded ? { color: 'var(--accent)' } : {}),
              }}
            >
              {service.name}
            </span>
          </div>

          {/* Description (hidden on mobile) */}
          <span
            className="service-desc"
            style={{
              fontSize: 14,
              color: 'var(--text-muted)',
              flex: 1,
              maxWidth: 280,
            }}
          >
            {service.description}
          </span>

          {/* Metric */}
          <span
            style={{
              fontSize: 13,
              color: 'var(--accent)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              background: 'rgba(30,70,107,0.08)',
              borderRadius: 32,
              padding: '4px 12px',
              whiteSpace: 'nowrap',
            }}
          >
            {service.metric}
          </span>

          {/* Arrow */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 400ms var(--ease-expo), background 300ms, border-color 300ms',
              transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
              background: expanded ? 'var(--accent)' : 'transparent',
              borderColor: expanded ? 'var(--accent)' : 'var(--line)',
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={expanded ? 'white' : 'var(--text-dim)'}
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* Expanded sub-items */}
        <div
          ref={subRef}
          style={{
            display: 'grid',
            gridTemplateRows: expanded ? '1fr' : '0fr',
            transition: 'grid-template-rows 400ms var(--ease-expo)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                paddingBottom: 20,
                paddingLeft: 68,
                flexWrap: 'wrap',
              }}
            >
              {service.sub.map((item, i) => (
                <span
                  key={i}
                  className="sub-item"
                  style={{
                    fontSize: 13,
                    color: 'var(--text-dim)',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line)',
                    borderRadius: 32,
                    padding: '6px 14px',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-desc { display: none; }
        }
      `}</style>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tween = gsap.from(el, {
      transformPerspective: 1600,
      rotationX: -8,
      yPercent: 2,
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        end: 'top 55%',
        scrub: 0.6,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
            Nos Services
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
            {`Tout ce qu'il faut pour\ndominer votre marché`}
          </LineMask>
        </div>

        {/* Border top */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {services.map((service, i) => (
            <ServiceRow key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
