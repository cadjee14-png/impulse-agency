'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.8,
  className,
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0 };
    if (direction === 'up') from.y = distance;
    if (direction === 'down') from.y = -distance;
    if (direction === 'left') from.x = distance;
    if (direction === 'right') from.x = -distance;

    const tween = gsap.from(el, {
      ...from,
      duration,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay, direction, distance, duration]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity', ...style }}>
      {children}
    </div>
  );
}
