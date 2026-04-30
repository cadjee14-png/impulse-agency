'use client';

import { useEffect, useRef } from 'react';

export interface CarouselItem {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  objectPosition?: string;
  /** Site cards only — shown in browser URL bar */
  url?: string;
  /** Site cards only — wraps card in <a> */
  link?: string;
}

interface CircularGalleryProps {
  items: CarouselItem[];
  /** 'visual' = badge pill card (default) | 'site' = browser mockup card */
  variant?: 'visual' | 'site';
  /** Override default radius (px) for desktop — useful to tighten card spacing */
  radiusOverride?: number;
}

export function CircularGallery({ items, variant = 'visual', radiusOverride }: CircularGalleryProps) {
  const stageRef  = useRef<HTMLDivElement>(null);
  const rotorRef  = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const rotor = rotorRef.current;
    if (!stage || !rotor) return;

    const N = items.length;
    const anglePerItem = 360 / N;

    // ── Responsive values ──────────────────────────────────────
    const W = window.innerWidth;
    const isMobile = W < 600;
    const isTablet = W >= 600 && W < 900;

    const perspective = isMobile ? 1200 : isTablet ? 1800 : 2800;

    // Site variant uses landscape dimensions; visual variant stays portrait
    const isSite = variant === 'site';
    const cw      = isSite
      ? (isMobile ? 260  : isTablet ? 400  : 580)
      : (isMobile ? 140  : isTablet ? 170  : 200);
    const ch      = isSite
      ? (isMobile ? 165  : isTablet ? 255  : 370)
      : (isMobile ? 190  : isTablet ? 230  : 270);
    const br      = isMobile ? 12 : 16;
    const stageH  = isSite
      ? (isMobile ? 260  : isTablet ? 340  : 480)
      : (isMobile ? 340  : isTablet ? 400  : 380);

    // Auto-radius: cards spaced with ~15% gap regardless of N or screen size
    const radius = radiusOverride !== undefined
      ? (isMobile ? Math.round(radiusOverride * 0.55) : isTablet ? Math.round(radiusOverride * 0.75) : radiusOverride)
      : Math.round((cw * 1.15) / (2 * Math.sin(Math.PI / N)));
    const autoSpeed   = 0.06;
    const idleDelay   = 1500;
    const lerpFactor  = 0.12;

    // ── Stage setup ─────────────────────────────────────────────
    stage.style.height = `${stageH}px`;
    stage.style.perspective = `${perspective}px`;

    // ── Build card DOM ──────────────────────────────────────────
    rotor.innerHTML = '';
    items.forEach((item, i) => {
      const angle = i * anglePerItem;

      // Wrapper (clickable for site cards)
      const wrapper = item.link ? document.createElement('a') : document.createElement('div');
      if (item.link) {
        (wrapper as HTMLAnchorElement).href = item.link;
        (wrapper as HTMLAnchorElement).target = '_blank';
        (wrapper as HTMLAnchorElement).rel = 'noopener noreferrer';
      }
      wrapper.style.cssText = `
        position: absolute;
        width: ${cw}px; height: ${ch}px;
        left: 50%; top: 50%;
        margin: ${-(ch / 2)}px 0 0 ${-(cw / 2)}px;
        transform: rotateY(${angle}deg) translateZ(${radius}px);
        border-radius: ${br}px;
        overflow: hidden;
        background: #0A0A0A;
        box-shadow: 0 30px 60px -20px rgba(0,0,0,.45), 0 12px 24px -8px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.06);
        backface-visibility: hidden;
        cursor: pointer;
        text-decoration: none;
        display: block;
        transition: opacity 0.1s linear;
        will-change: transform, opacity;
      `;

      if (variant === 'site') {
        // ── Browser mockup card (landscape) ──────────────────
        const barH = isMobile ? 22 : isTablet ? 28 : 36;
        const dotSz = isMobile ? 7 : 9;

        // Browser bar
        const bar = document.createElement('div');
        bar.style.cssText = `
          height: ${barH}px; background: #1a1a1a;
          display: flex; align-items: center;
          padding: 0 12px; gap: 6px; flex-shrink: 0;
        `;
        ['#FF5F57','#FEBC2E','#28C840'].forEach(color => {
          const dot = document.createElement('span');
          dot.style.cssText = `width:${dotSz}px;height:${dotSz}px;border-radius:50%;background:${color};flex-shrink:0;`;
          bar.appendChild(dot);
        });
        const urlBar = document.createElement('div');
        urlBar.textContent = item.url || '';
        urlBar.style.cssText = `
          flex:1; height:${isMobile?14:18}px; background:#111; border-radius:4px;
          margin:0 8px; display:flex; align-items:center; justify-content:center;
          font-size:${isMobile?8:10}px; color:rgba(255,255,255,0.4); font-family:monospace;
          overflow:hidden; white-space:nowrap; padding:0 6px;
        `;
        bar.appendChild(urlBar);
        wrapper.appendChild(bar);

        // Screen
        const screen = document.createElement('div');
        screen.style.cssText = `position:relative; height:${ch - barH}px; overflow:hidden;`;

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        img.draggable = false;
        img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${item.objectPosition||'top center'};pointer-events:none;transition:transform 600ms ease;`;
        screen.appendChild(img);

        // Always-visible overlay at bottom
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.2) 45%,transparent 70%);display:flex;flex-direction:column;justify-content:flex-end;padding:${isMobile?10:16}px;`;
        const cat = document.createElement('p');
        cat.textContent = item.badge;
        cat.style.cssText = `margin:0 0 4px;font-size:${isMobile?8:10}px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.55);font-family:var(--font-body);`;
        const t1 = document.createElement('p');
        t1.textContent = item.title;
        t1.style.cssText = `margin:0;font-size:${isMobile?13:isMobile?16:20}px;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.1;font-family:var(--font-heading);`;
        overlay.appendChild(cat);
        overlay.appendChild(t1);
        screen.appendChild(overlay);

        wrapper.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.04)'; });
        wrapper.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });

        wrapper.appendChild(screen);

      } else {
        // ── Visual card (badge + portrait image) ─────────────
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        img.draggable = false;
        img.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${item.objectPosition||'center top'};pointer-events:none;`;
        wrapper.appendChild(img);

        const badge = document.createElement('div');
        badge.textContent = item.badge;
        badge.style.cssText = `position:absolute;top:14px;left:14px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-radius:99px;padding:6px 10px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0A0A0A;white-space:nowrap;`;
        wrapper.appendChild(badge);

        const fig = document.createElement('figcaption');
        fig.style.cssText = `position:absolute;bottom:0;left:0;right:0;padding:40px 14px 16px;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.55) 60%,transparent 100%);`;
        const t1 = document.createElement('p');
        t1.textContent = item.title;
        t1.style.cssText = `margin:0;font-size:16px;font-weight:700;letter-spacing:-.01em;color:#fff;line-height:1.15;font-family:var(--font-heading);`;
        const t2 = document.createElement('p');
        t2.textContent = item.subtitle;
        t2.style.cssText = `margin:4px 0 0;font-size:12px;font-weight:500;color:rgba(255,255,255,.75);line-height:1.3;`;
        fig.appendChild(t1);
        fig.appendChild(t2);
        wrapper.appendChild(fig);
      }

      rotor.appendChild(wrapper);
    });

    // ── Rotation state ──────────────────────────────────────────
    let current  = 0; // displayed rotation (lerped)
    let target   = 0; // target rotation
    let rafId    = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isHover  = false;
    let isDrag   = false;
    let dragStartX = 0;
    let dragStartT = 0;

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { /* auto-rotate resumes via loop */ }, idleDelay);
    };

    // ── Animation loop ──────────────────────────────────────────
    const cards = Array.from(rotor.children) as HTMLDivElement[];

    const tick = () => {
      // Auto-rotate when idle
      if (!isHover && !isDrag) {
        target += autoSpeed;
      }

      // Lerp toward target
      current += (target - current) * lerpFactor;

      rotor.style.transform = `rotateY(${current}deg)`;

      // Update card opacities + zIndex
      cards.forEach((card, i) => {
        const itemAngle = i * anglePerItem;
        const rel  = ((itemAngle + current) % 360 + 360) % 360;
        const dist = rel > 180 ? 360 - rel : rel;
        const opacity = Math.max(0.25, 1 - dist / 180);
        card.style.opacity = String(opacity);
        card.style.zIndex  = String(Math.round((1 - dist / 180) * 100));
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Scroll ─────────────────────────────────────────────────
    const onScroll = (e: WheelEvent) => {
      if (!isHover) return;
      target += e.deltaY * 0.18;
      resetIdleTimer();
    };
    stage.addEventListener('wheel', onScroll, { passive: true });

    // ── Drag (mouse) ────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDrag = true;
      dragStartX = e.clientX;
      dragStartT = target;
      stage.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrag) return;
      target = dragStartT - (e.clientX - dragStartX) * 0.4;
    };
    const onMouseUp = () => {
      isDrag = false;
      stage.style.cursor = 'grab';
    };

    // ── Drag (touch) ────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      isDrag = true;
      dragStartX = e.touches[0].clientX;
      dragStartT = target;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDrag) return;
      e.preventDefault();
      target = dragStartT - (e.touches[0].clientX - dragStartX) * 0.4;
    };
    const onTouchEnd = () => { isDrag = false; };

    // ── Hover pause ─────────────────────────────────────────────
    const onEnter = () => { isHover = true; };
    const onLeave = () => { isHover = false; isDrag = false; stage.style.cursor = 'grab'; };

    stage.style.cursor = 'grab';
    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: false });
    stage.addEventListener('touchend', onTouchEnd);

    // ── Arrow nav ────────────────────────────────────────────────
    const bottom = bottomRef.current;
    if (bottom) {
      const [btnL, , btnR] = Array.from(bottom.children) as HTMLElement[];
      btnL?.addEventListener('click', () => { target -= anglePerItem; });
      btnR?.addEventListener('click', () => { target += anglePerItem; });
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      stage.removeEventListener('wheel', onScroll);
      stage.removeEventListener('mouseenter', onEnter);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
    };
  }, [items]);

  return (
    <div>
      {/* 3D stage */}
      <div
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 14%, #000 86%, transparent 100%)',
        }}
      >
        <div
          ref={rotorRef}
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d',
          }}
        />
      </div>

      {/* Bottom nav */}
      <div
        ref={bottomRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          marginTop: 40,
        }}
      >
        <button
          aria-label="Précédent"
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#0A0A0A', border: 'none',
            color: '#fff', fontSize: 22, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px -6px rgba(0,0,0,.4)',
            transition: 'transform 150ms, background 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget).style.transform = 'scale(1.08)'; (e.currentTarget).style.background = '#1c1c1c'; }}
          onMouseLeave={e => { (e.currentTarget).style.transform = 'scale(1)'; (e.currentTarget).style.background = '#0A0A0A'; }}
          onMouseDown={e => { (e.currentTarget).style.transform = 'scale(0.95)'; }}
          onMouseUp={e => { (e.currentTarget).style.transform = 'scale(1.08)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <span style={{
          fontSize: 13, fontWeight: 700,
          letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.3)',
        }}>
          Drag · Scroll · Auto-rotation
        </span>

        <button
          aria-label="Suivant"
          style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#0A0A0A', border: 'none',
            color: '#fff', fontSize: 22, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px -6px rgba(0,0,0,.4)',
            transition: 'transform 150ms, background 150ms',
          }}
          onMouseEnter={e => { (e.currentTarget).style.transform = 'scale(1.08)'; (e.currentTarget).style.background = '#1c1c1c'; }}
          onMouseLeave={e => { (e.currentTarget).style.transform = 'scale(1)'; (e.currentTarget).style.background = '#0A0A0A'; }}
          onMouseDown={e => { (e.currentTarget).style.transform = 'scale(0.95)'; }}
          onMouseUp={e => { (e.currentTarget).style.transform = 'scale(1.08)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
