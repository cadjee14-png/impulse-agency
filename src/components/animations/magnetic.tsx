'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: ReactNode;
  dampening?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Magnetic({ children, dampening = 0.3, className, style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * dampening;
    const dy = (e.clientY - cy) * dampening;
    gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
