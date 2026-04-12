'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power3.out' });
    };

    const animate = () => {
      circleX += (mouseX - circleX) * 0.12;
      circleY += (mouseY - circleY) * 0.12;
      gsap.set(circle, { x: circleX, y: circleY });
      requestAnimationFrame(animate);
    };
    animate();

    const onEnterInteractive = () => {
      gsap.to(dot, { scale: 2, duration: 0.3, ease: 'expo.out' });
      gsap.to(circle, { scale: 1.5, opacity: 0.7, duration: 0.3, ease: 'expo.out' });
    };
    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'expo.out' });
      gsap.to(circle, { scale: 1, opacity: 1, duration: 0.3, ease: 'expo.out' });
    };
    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15, ease: 'expo.out' });
      gsap.to(circle, { scale: 0.7, duration: 0.15, ease: 'expo.out' });
    };
    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
      gsap.to(circle, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    };

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Circle follower */}
      <div
        ref={circleRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid var(--accent-light)',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: 0.8,
        }}
      />
    </>
  );
}
