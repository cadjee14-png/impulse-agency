'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LineMaskProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  trigger?: 'scroll' | 'immediate';
  stagger?: number;
}

export function LineMask({
  children,
  as: Tag = 'h2',
  className,
  style,
  delay = 0,
  trigger = 'scroll',
  stagger = 0.08,
}: LineMaskProps) {
  const containerRef = useRef<HTMLElement>(null);
  const lines = children.split('\n').filter(Boolean);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const innerEls = el.querySelectorAll('.line-mask-inner');

    gsap.set(innerEls, { y: '105%', opacity: 0, filter: 'blur(10px)' });

    let tween: gsap.core.Tween;

    if (trigger === 'immediate') {
      tween = gsap.to(innerEls, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'expo.out',
        stagger,
        delay,
      });
    } else {
      tween = gsap.to(innerEls, {
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'expo.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }

    return () => {
      tween.kill();
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask-wrap" style={{ display: 'block' }}>
          <span className="line-mask-inner" style={{ willChange: 'transform, opacity, filter' }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
