'use client';

import { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Marquee({ items, direction = 'left', speed = 0.5, className, style }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  const repeated = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const dir = direction === 'left' ? -1 : 1;

    const animate = () => {
      const scrollDelta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;

      const boost = Math.min(4, Math.abs(scrollDelta) * 0.15) * Math.sign(scrollDelta);
      posRef.current += (speed + boost) * dir;

      const half = track.scrollWidth / 3;
      if (posRef.current <= -half) posRef.current += half;
      if (posRef.current >= 0) posRef.current -= half;

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed]);

  return (
    <div className={`marquee-outer ${className || ''}`} style={{ overflow: 'hidden', ...style }}>
      <div ref={trackRef} className="marquee-track" style={{ willChange: 'transform' }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-dim)',
              letterSpacing: '0.02em',
              padding: '0 16px',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: 32,
                padding: '6px 16px',
                fontSize: 13,
                color: 'var(--text-dim)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
