'use client';

import { useEffect, useRef, useState } from 'react';

export function StickyCTAMobile() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show after scrolling past the hero (300px)
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Hide when near the bottom audit CTA section
      const auditSection = document.getElementById('audit');
      const auditTop = auditSection ? auditSection.getBoundingClientRect().top + window.scrollY : Infinity;

      setVisible(scrollY > 300);
      setHidden(scrollY > auditTop - 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isShowing = visible && !hidden;

  return (
    <>
      <div
        ref={ref}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9980,
          padding: '12px 16px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(250,250,250,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(30,70,107,0.10)',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          transform: isShowing ? 'translateY(0)' : 'translateY(110%)',
          transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.08)',
        }}
        className="sticky-cta-mobile"
      >
        {/* WhatsApp direct */}
        <a
          href="https://wa.me/33688663176"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 14,
            background: '#25D366',
            flexShrink: 0,
            textDecoration: 'none',
          }}
          aria-label="WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

        {/* Main CTA */}
        <a
          href="/audit"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent)',
            color: 'white',
            borderRadius: 14,
            height: 48,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            gap: 6,
          }}
        >
          Audit gratuit →
        </a>
      </div>

      {/* Only show on mobile */}
      <style>{`
        .sticky-cta-mobile { display: none !important; }
        @media (max-width: 768px) {
          .sticky-cta-mobile { display: flex !important; }
          body { padding-bottom: 80px; }
        }
      `}</style>
    </>
  );
}
