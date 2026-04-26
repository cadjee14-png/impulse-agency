'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  isFloat?: boolean;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Counter({
  target,
  suffix = '',
  prefix = '',
  isFloat = false,
  duration = 1.6,
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.textContent = `${prefix}0${suffix}`;

    const obj = { val: 0 };
    let tween: gsap.core.Tween;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        tween = gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              const display = isFloat
                ? obj.val.toFixed(1)
                : Math.round(obj.val).toString();
              el.textContent = `${prefix}${display}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      tween?.kill();
      st.kill();
    };
  }, [target, suffix, prefix, isFloat, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
