'use client';

import { useState, useEffect, useRef } from 'react';

export interface CarouselItem {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  link?: string;
  objectPosition?: string;
}

interface CircularGalleryProps {
  items: CarouselItem[];
  radius?: number;
  autoRotateSpeed?: number;
  cardWidth?: number;
  cardHeight?: number;
}

export function CircularGallery({
  items,
  radius = 520,
  autoRotateSpeed = 0.14,
  cardWidth = 240,
  cardHeight = 340,
}: CircularGalleryProps) {
  const rotRef     = useRef(0);
  const [rot, setRot] = useState(0);
  const pausedRef  = useRef(false);
  const rafRef     = useRef<number>(0);
  const dragging   = useRef(false);
  const dragStartX = useRef(0);
  const dragStartR = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Auto-rotate RAF
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        rotRef.current += autoRotateSpeed;
        setRot(rotRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotateSpeed]);

  // Drag helpers
  const startDrag = (x: number) => {
    dragging.current  = true;
    pausedRef.current = true;
    dragStartX.current = x;
    dragStartR.current = rotRef.current;
  };
  const moveDrag = (x: number) => {
    if (!dragging.current) return;
    const delta = x - dragStartX.current;
    rotRef.current = dragStartR.current + delta * 0.28;
    setRot(rotRef.current);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current  = false;
    pausedRef.current = false;
  };

  // Arrow nav — jump one card
  const anglePerItem = 360 / items.length;
  const step = (dir: 1 | -1) => {
    pausedRef.current = true;
    rotRef.current += dir * anglePerItem;
    setRot(rotRef.current);
    setTimeout(() => { pausedRef.current = false; }, 1200);
  };

  // Responsive sizing
  const r  = isMobile ? Math.round(radius  * 0.48) : radius;
  const cw = isMobile ? Math.round(cardWidth  * 0.68) : cardWidth;
  const ch = isMobile ? Math.round(cardHeight * 0.68) : cardHeight;

  return (
    <div style={{ userSelect: 'none', touchAction: 'none' }}>

      {/* ── 3D Scene ── */}
      <div
        style={{
          width: '100%',
          height: ch + 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: isMobile ? 800 : 1300,
          cursor: 'grab',
          overflow: 'visible',
        }}
        onMouseDown={e => startDrag(e.clientX)}
        onMouseMove={e => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={e => startDrag(e.touches[0].clientX)}
        onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
        onTouchEnd={endDrag}
      >
        <div
          style={{
            position: 'relative',
            width: cw,
            height: ch,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rot}deg)`,
          }}
        >
          {items.map((item, i) => {
            const angle = i * anglePerItem;
            const rel  = ((angle + rot) % 360 + 360) % 360;
            const norm = rel > 180 ? 360 - rel : rel;
            const opacity = Math.max(0.2, 1 - (norm / 180) * 0.78);

            const card = (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                  position: 'relative',
                  background: '#111',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: item.objectPosition || 'center top',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />

                {/* Badge */}
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'rgba(255,255,255,0.96)',
                  borderRadius: 100, padding: '5px 13px',
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#0D0D0D',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}>
                  {item.badge}
                </div>

                {/* Bottom overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(5,12,24,0.92) 0%, rgba(5,12,24,0.4) 60%, transparent 100%)',
                  padding: '48px 16px 18px',
                }}>
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: isMobile ? 15 : 18,
                    color: '#ffffff',
                    letterSpacing: '-0.025em', lineHeight: 1.1,
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    margin: '5px 0 0',
                    fontSize: isMobile ? 11 : 12,
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 500,
                  }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: cw, height: ch,
                  left: '50%', top: '50%',
                  marginLeft: -(cw / 2), marginTop: -(ch / 2),
                  transform: `rotateY(${angle}deg) translateZ(${r}px)`,
                  opacity,
                  transition: 'opacity 0.12s linear',
                  willChange: 'transform, opacity',
                }}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
                    onClick={e => { if (dragging.current) e.preventDefault(); }}
                  >
                    {card}
                  </a>
                ) : card}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 28, marginTop: 32,
      }}>
        <button
          onClick={() => step(-1)}
          aria-label="Précédent"
          style={{
            width: 52, height: 52, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 200ms, border-color 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.14)'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.18)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <span style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }}>
          Drag · Scroll · Auto-rotation
        </span>

        <button
          onClick={() => step(1)}
          aria-label="Suivant"
          style={{
            width: 52, height: 52, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 200ms, border-color 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.14)'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.18)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
