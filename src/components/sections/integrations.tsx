'use client';

import { useEffect, useRef } from 'react';
import { LineMask } from '@/components/animations/line-mask';

const tools: { name: string; color: string; icon: React.ReactNode }[] = [
  {
    name: 'Shopify',
    color: '#96BF48',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#96BF48">
        <path d="M15.337 23.979l7.33-1.587S19.797 5.565 19.778 5.4c-.019-.165-.15-.27-.28-.28-.129-.01-2.81-.19-2.81-.19s-1.87-1.86-2.07-2.06c-.2-.2-.59-.14-.74-.09L12.54 3.2S11.989.878 11.949.818C11.899.748 11.81.7 11.71.7h-.01C11.64.7 6.94.94 6.94.94S3.68 4.15 3.55 4.3c-.13.15-.1.39-.09.44l1.14 3.57S1.54 9.48 1.3 9.64C1.06 9.8 1 10.06 1.07 10.3l2.48 13.05 11.787.629zM14.07 3.7l-1.31.4-.01-1.33 1.32.93zM11.37 1.6l.01 2.76-2.99.92c.59-2.26 1.71-3.36 2.98-3.68zm-4.49 19.64L5.3 7.04l2.25-.68.35 1.43c.09.36.44.58.8.49.36-.09.58-.44.49-.8L8.84 6l2.54-.77v15.6l-4.5.41zm5.5.5V5.62l3.08-.94.3 9.55-1.6.55c-.35.12-.54.5-.42.85.1.29.37.47.66.47.06 0 .13-.01.19-.03l1.28-.44.14 4.44-3.63.67z"/>
      </svg>
    ),
  },
  {
    name: 'WordPress',
    color: '#21759B',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#21759B">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.186 12a8.785 8.785 0 0 1 .653-3.363l3.604 9.875A8.819 8.819 0 0 1 3.186 12zm8.814 8.814a8.83 8.83 0 0 1-2.496-.359l2.652-7.707 2.718 7.444a.88.88 0 0 0 .068.129 8.832 8.832 0 0 1-2.942.493zm1.215-12.955c.529-.028.006-.782-.523-.754a25.56 25.56 0 0 0-1.685.09c0 .002-1.613-3.376 2.19-3.375 1.036 0 2.168.404 2.168.404s-.352.514-.352 1.285c0 .719.447 1.578.921 2.69l1.228 2.809-4.247-2.853zM18.83 16.93l1.098-3.257c.52-1.3.693-2.34.693-3.27 0-.336-.022-.648-.062-.938A8.82 8.82 0 0 1 20.814 12c0 2.633-1.004 5.038-2.645 6.834l.661-1.904z"/>
      </svg>
    ),
  },
  {
    name: 'Meta Ads',
    color: '#0081FB',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0081FB">
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.985 1.993 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.363.308-.705.663-1.022 1.062a7.222 7.222 0 0 0-.922-1.023C9.1 4.527 8.05 4.03 6.915 4.03zm0 1.5c.758 0 1.527.354 2.219.997.562.518 1.118 1.233 1.631 2.09L12 10.209l.238-.396c.532-.886 1.037-1.582 1.565-2.084.69-.647 1.463-1.2 2.197-1.2 1.303 0 2.573.877 3.545 2.407 1.258 1.878 1.946 4.32 1.946 6.714 0 1.264-.24 2.213-.596 2.821a2.24 2.24 0 0 1-.48.57c-.346.282-.788.478-1.427.478-.74 0-1.257-.196-2.07-.965-.698-.658-1.565-1.845-2.238-2.983l-2.08-3.472-.329-.548c-.505-.845-1.017-1.6-1.572-2.158-.587-.59-1.132-.848-1.713-.848-1.056 0-2.076.72-2.932 1.965C3.67 12.33 3.094 14.583 3.094 16.45c0 .594.053 1.138.153 1.614-.06-.079-.12-.179-.186-.295a4.15 4.15 0 0 1-.279-.645 5.126 5.126 0 0 1-.196-1.675c0-2.35.636-4.78 1.852-6.529.982-1.437 2.108-2.39 3.477-2.39z"/>
      </svg>
    ),
  },
  {
    name: 'Google Ads',
    color: '#4285F4',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3.06 14.4l5.2-9.04a4.8 4.8 0 0 1 6.56-1.76 4.8 4.8 0 0 1 1.76 6.56l-5.2 9.04A4.8 4.8 0 0 1 4.82 20.96 4.8 4.8 0 0 1 3.06 14.4z" fill="#FBBC05"/>
        <path d="M13.68 19.2a4.8 4.8 0 0 1 0-9.6 4.8 4.8 0 0 1 0 9.6z" fill="#4285F4"/>
        <path d="M3.06 14.4a4.8 4.8 0 1 1 8.32-4.8L6.18 18.64A4.8 4.8 0 0 1 3.06 14.4z" fill="#34A853"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    color: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.72a8.19 8.19 0 0 0 4.79 1.53V4.68a4.85 4.85 0 0 1-1.01-1.99z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Google Analytics',
    color: '#E37400',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="13.5" y="2" width="4" height="20" rx="2" fill="#E37400"/>
        <rect x="6.5" y="9" width="4" height="13" rx="2" fill="#E37400" opacity="0.7"/>
        <circle cx="4.5" cy="20" r="2" fill="#E37400" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: 'Klaviyo',
    color: '#1C1C1C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1C1C1C">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/>
      </svg>
    ),
  },
  {
    name: 'Mailchimp',
    color: '#FFE01B',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FFE01B"/>
        <path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#241C15" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9.5" cy="10.5" r="1" fill="#241C15"/>
        <circle cx="14.5" cy="10.5" r="1" fill="#241C15"/>
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    color: '#FF7A59',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.268-1.978V3.07A2.2 2.2 0 0 0 17.234.874h-.036a2.2 2.2 0 0 0-2.196 2.196v.036a2.198 2.198 0 0 0 1.268 1.978V7.93a6.232 6.232 0 0 0-2.963 1.313L5.1 3.61a2.45 2.45 0 0 0 .085-.617A2.46 2.46 0 1 0 2.724 5.45c.463 0 .895-.133 1.265-.358l7.99 5.54a6.223 6.223 0 0 0-.834 3.11 6.224 6.224 0 0 0 .98 3.374l-2.28 2.28a1.928 1.928 0 0 0-.561-.089 1.943 1.943 0 1 0 1.943 1.942 1.927 1.927 0 0 0-.089-.56l2.253-2.254a6.267 6.267 0 1 0 4.773-10.505zm-.93 9.243a3.133 3.133 0 1 1 0-6.266 3.133 3.133 0 0 1 0 6.266z"/>
      </svg>
    ),
  },
  {
    name: 'Zapier',
    color: '#FF4A00',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4A00">
        <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm5.793 11.99L13 16.784V13h-2v4.784L6.207 13H4v-2h9v-2H4V7h2.207L11 11.793V8h2v4h4.793L15 8.207v-.001l-3.5-3.5L12 4l.5.5L8.707 8.293l-.001.001L12 4.5l1.5-1.5L15.5 5.5 12 9l3.793 3.793.001.001L12 16.5l-.5-.5L15.293 12.207z"/>
      </svg>
    ),
  },
  {
    name: 'Stripe',
    color: '#635BFF',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Notion',
    color: '#000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
  },
  {
    name: 'Canva',
    color: '#00C4CC',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#00C4CC">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 16.26c-.235.38-.697.582-1.37.582-.87 0-1.907-.406-2.735-.987-.462.367-1.043.726-1.74.726-1.23 0-2.108-.874-2.108-2.208 0-1.622 1.09-2.69 2.617-2.69.342 0 .72.06 1.076.172.013-.2.016-.41.016-.625 0-1.174-.449-1.72-1.135-1.72-.554 0-.934.314-1.183.826l-.945-.57C9.977 9.1 10.75 8.46 11.897 8.46c1.43 0 2.422.938 2.422 2.873 0 .58-.06 1.205-.18 1.785.557.42 1.138.664 1.63.664.407 0 .618-.138.72-.35l.527.828zm-6.39-1.07c0 .666.35 1.044.874 1.044.322 0 .665-.14.978-.37-.207-.568-.322-1.137-.322-1.622 0-.1.006-.19.016-.277a1.87 1.87 0 0 0-.648-.115c-.57 0-.898.447-.898 1.34z"/>
      </svg>
    ),
  },
];

const row1Tools = tools.slice(0, 8);
const row2Tools = tools.slice(8);

function BrandMarquee({ items, direction = 'left', speed = 0.5 }: {
  items: typeof tools;
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  const repeated = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const dir = direction === 'left' ? -1 : 1;

    const animate = () => {
      const scrollDelta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      const boost = Math.min(4, Math.abs(scrollDelta) * 0.12) * Math.sign(scrollDelta);
      posRef.current += (speed + boost) * dir;
      const half = track.scrollWidth / 3;
      if (posRef.current <= -half) posRef.current += half;
      if (posRef.current >= 0) posRef.current -= half;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [direction, speed]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: 12, width: 'max-content', willChange: 'transform' }}>
        {repeated.map((tool, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface)',
              border: `1px solid ${tool.color}28`,
              borderRadius: 40,
              padding: '8px 18px 8px 10px',
              whiteSpace: 'nowrap',
              boxShadow: `0 2px 12px ${tool.color}12`,
              transition: 'transform 300ms, box-shadow 300ms',
            }}
          >
            {/* Icon container */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: `${tool.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {tool.icon}
            </div>
            {/* Name */}
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '-0.01em',
            }}>
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 48 }}>
        <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
          Nos Outils
        </span>
        <LineMask
          as="h2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 56px)',
            color: 'var(--text)',
            maxWidth: 640,
          }}
        >
          {`On maîtrise les meilleures\nplateformes`}
        </LineMask>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <BrandMarquee items={row1Tools} direction="left" speed={0.45} />
        <BrandMarquee items={row2Tools} direction="right" speed={0.35} />
      </div>
    </section>
  );
}
