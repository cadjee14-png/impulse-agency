'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  /** Main text — the words before the accent word */
  children: string;
  /** The accent word rendered in Outfit italic */
  accent: string;
  as?: 'h1' | 'h2' | 'h3';
  fontSize?: string;
  color?: string;
  accentColor?: string;
  style?: React.CSSProperties;
  trigger?: 'scroll' | 'immediate';
  delay?: number;
}

export function SectionHeading({
  children,
  accent,
  as: Tag = 'h2',
  fontSize = 'clamp(32px, 4.5vw, 64px)',
  color = 'var(--text)',
  accentColor = 'var(--accent)',
  style,
  trigger = 'scroll',
  delay = 0,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>('.sh-word');
    gsap.set(words, { opacity: 0, y: 50, rotateX: -15 });

    const anim = {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.8, ease: 'power3.out',
      stagger: 0.08, delay,
    };

    let tween: gsap.core.Tween;

    if (trigger === 'immediate') {
      tween = gsap.to(words, anim);
    } else {
      tween = gsap.to(words, {
        ...anim,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }

    return () => { tween.kill(); };
  }, [children, accent, trigger, delay]);

  // Split main text into words
  const mainWords = children.trim().split(/\s+/);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontWeight: 800,
        fontSize,
        lineHeight: 1.05,
        letterSpacing: '-0.035em',
        color,
        perspective: 800,
        ...style,
      }}
    >
      {mainWords.map((word, i) => (
        <span
          key={i}
          className="sh-word"
          style={{ display: 'inline-block', marginRight: '0.22em', willChange: 'transform, opacity' }}
        >
          {word}
        </span>
      ))}
      {/* Accent word — Outfit italic */}
      <span
        className="sh-word"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-outfit), Outfit, serif',
          fontWeight: 400,
          fontStyle: 'italic',
          color: accentColor,
          letterSpacing: '0.01em',
          willChange: 'transform, opacity',
        }}
      >
        {accent}
      </span>
    </Tag>
  );
}
