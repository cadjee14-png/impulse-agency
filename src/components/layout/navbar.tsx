'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { navLinks, siteConfig } from '@/data/site';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const linksEl = overlayLinksRef.current;
    if (!overlay || !linksEl) return;

    if (menuOpen) {
      overlay.style.display = 'flex';
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'expo.out' });
      const items = linksEl.querySelectorAll('.menu-item');
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'expo.out', delay: 0.1 }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'expo.out',
        onComplete: () => { if (overlay) overlay.style.display = 'none'; },
      });
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9990,
          width: 'calc(100% - 48px)',
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px 0 20px',
            height: 56,
            borderRadius: 64,
            transition: 'background 500ms, box-shadow 500ms, border-color 500ms',
            background: scrolled ? 'rgba(250,250,250,0.80)' : 'transparent',
            backdropFilter: scrolled ? 'blur(30px) saturate(160%)' : 'none',
            border: scrolled ? '1px solid rgba(30,70,107,0.12)' : '1px solid transparent',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Image src="/logo.png" alt="Impulse Agency" width={120} height={48} style={{ objectFit: 'contain', height: 72, width: 'auto' }} priority />
          </Link>

          {/* Desktop Links */}
          <nav
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: 13,
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-dim)',
                  fontWeight: 500,
                  borderRadius: 32,
                  transition: 'color 200ms, background 200ms',
                  letterSpacing: '0.01em',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLButtonElement).style.color = 'var(--accent)';
                  (e.target as HTMLButtonElement).style.background = 'rgba(30,70,107,0.06)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLButtonElement).style.color = 'var(--text-dim)';
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </button>
            ))}

            {/* CTA */}
            <a
              href="/audit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 64,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'background 300ms, transform 300ms',
                letterSpacing: '0.01em',
                marginLeft: 8,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
              }}
            >
              Audit gratuit
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              width: 44,
              height: 44,
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              borderRadius: 32,
              cursor: 'none',
            }}
            aria-label="Menu"
          >
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: 'var(--text)',
              transition: 'transform 300ms, opacity 300ms',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: 'var(--text)',
              transition: 'opacity 300ms',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: 'var(--text)',
              transition: 'transform 300ms, opacity 300ms',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg)',
          zIndex: 9985,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <div ref={overlayLinksRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="menu-item"
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                cursor: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            className="menu-item"
            href="/audit"
            style={{
              display: 'inline-flex',
              marginTop: 24,
              background: 'var(--accent)',
              color: 'white',
              borderRadius: 64,
              padding: '14px 32px',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
            }}
          >
            Audit gratuit
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
