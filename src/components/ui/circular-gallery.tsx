'use client';

import { useState, useEffect, useRef, ReactNode, HTMLAttributes } from 'react';

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[];
  /** Rayon du cercle en px (desktop) */
  radius?: number;
  /** Vitesse de rotation automatique (deg/frame) */
  autoRotateSpeed?: number;
  /** Largeur de chaque card en px */
  cardWidth?: number;
  /** Hauteur de chaque card en px */
  cardHeight?: number;
  /** Hauteur du conteneur wrapper */
  containerHeight?: number;
}

export function CircularGallery({
  children,
  radius = 540,
  autoRotateSpeed = 0.18,
  cardWidth = 340,
  cardHeight = 230,
  containerHeight = 480,
  style,
  ...props
}: CircularGalleryProps) {
  const rotationRef  = useRef(0);
  const [rotation, setRotation]  = useState(0);
  const pausedRef    = useRef(false);
  const rafRef       = useRef<number>(0);
  const [mobile, setMobile] = useState(false);

  // Detect mobile once on mount
  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  // Auto-rotate RAF loop
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        rotationRef.current += autoRotateSpeed;
        setRotation(rotationRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotateSpeed]);

  const count = children.length;
  const anglePerItem = 360 / count;

  // Responsive values
  const r  = mobile ? Math.round(radius  * 0.52) : radius;
  const cw = mobile ? Math.round(cardWidth  * 0.65) : cardWidth;
  const ch = mobile ? Math.round(cardHeight * 0.65) : cardHeight;
  const h  = mobile ? Math.round(containerHeight * 0.7) : containerHeight;

  return (
    <div
      role="region"
      aria-label="3D Circular Gallery"
      style={{
        position: 'relative',
        width: '100%',
        height: h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: mobile ? 900 : 1400,
        overflow: 'visible',
        ...style,
      }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      {...props}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {children.map((child, i) => {
          const itemAngle = i * anglePerItem;
          const rel = ((itemAngle + rotation) % 360 + 360) % 360;
          const norm = rel > 180 ? 360 - rel : rel;
          // Cards in front (norm ~0) = full opacity; cards in back = dim
          const opacity = Math.max(0.15, 1 - (norm / 180) * 0.85);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: cw,
                height: ch,
                left: '50%',
                top: '50%',
                marginLeft: -(cw / 2),
                marginTop: -(ch / 2),
                transform: `rotateY(${itemAngle}deg) translateZ(${r}px)`,
                opacity,
                transition: 'opacity 0.15s linear',
                willChange: 'transform, opacity',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
