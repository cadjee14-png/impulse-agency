'use client';

import { useEffect, useRef, useState } from 'react';
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
  duration = 2,
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);

  const startVal = 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered) return;

    const obj = { val: startVal };
    let tween: gsap.core.Tween;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        if (triggered) return;
        setTriggered(true);
        tween = gsap.to(obj, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              const display = isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString();
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
  }, [target, suffix, prefix, isFloat, duration, triggered, startVal]);

  const initialDisplay = isFloat ? (0).toFixed(1) : '0';

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{initialDisplay}{suffix}
    </span>
  );
}
