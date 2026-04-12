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

  // Start from 80% of target so even if captured mid-animation it looks credible
  const startVal = isFloat ? target * 0.75 : Math.round(target * 0.75);

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

  const initialDisplay = isFloat ? startVal.toFixed(1) : Math.round(startVal).toString();

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{initialDisplay}{suffix}
    </span>
  );
}
