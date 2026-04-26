'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

/* ─── Card visual config ─── */
const cardConfig = [
  { isDark: false, isWide: true,  metricValue: '+180%', metricLabel: 'Leads en moyenne' },
  { isDark: true,  isWide: true,  metricValue: '+340%', metricLabel: 'Engagement moyen' },
  { isDark: false, isWide: false, metricValue: '5.2x',  metricLabel: 'ROAS moyen' },
  { isDark: true,  isWide: false, metricValue: 'Top 3', metricLabel: 'En 90 jours' },
  { isDark: false, isWide: true,  metricValue: '+95%',  metricLabel: 'Satisfaction client' },
];

/* ─── Brand logo icons ─── */
function Logo({ bg, children, size = 44 }: { bg: string; children: React.ReactNode; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

/* Shopify */
function LogoShopify() {
  return (
    <Logo bg="#96BF48">
      <svg width="24" height="24" viewBox="0 0 109 124" fill="white">
        <path d="M74.7 14.8c-.1-.6-.6-1-1.2-1-.5 0-9.8-.2-9.8-.2s-6.5-6.3-7.2-7c-.7-.7-2.1-.5-2.6-.3-.1 0-1.4.4-3.6 1.1C48.4 3.2 45 1 40.8 1c-11.4 0-16.9 14.2-18.6 21.4-4.4 1.4-7.6 2.3-7.9 2.4-2.4.8-2.5.8-2.8 3.1C11.3 29.9 1 111.1 1 111.1l75.5 13.1 1.6-.4c-.4-109.4-.8-109-3.4-109zm-20-3.6c-1.7.5-3.6 1.1-5.7 1.7.6-2.2 1.6-4.4 2.9-6.2 1.3 1.4 2.2 3.3 2.8 4.5zm-8.8-3.3c.4-.1.8 0 1.2.1-1.8 2.3-3.1 5.5-3.8 8.8l-8 2.5c1.6-5.5 5.5-11.4 10.6-11.4zm4.2 33.4l-3.5-9.3c3.3-1 6.3-1.9 9-2.8.6 2.2.9 4.7.9 7.7 0 1.7-.2 3.2-.5 4.4h-5.9zm-17.7-5.9c1.1-7.5 5.2-10.3 5.2-10.3l2.6 6.8-7.8 3.5zm10.3 36.3L30.8 53.5l8.6-3.3s3 7.1 4.3 11.5c-2.2 1.6-4.1 3.6-4.9 3.6-.9 0-.9 5.7-.9 5.7s1.8.5 3.7.5z"/>
      </svg>
    </Logo>
  );
}

/* WordPress */
function LogoWordPress() {
  return (
    <Logo bg="#21759B">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.188 12a8.772 8.772 0 0 1 .558-3.08L7.43 19.477A8.816 8.816 0 0 1 3.188 12zm8.812 8.812a8.866 8.866 0 0 1-2.542-.373l2.697-7.83 2.763 7.572a.896.896 0 0 0 .07.135 8.847 8.847 0 0 1-2.988.496zm1.22-13.23c.533-.028.913-.085.913-.085a.333.333 0 0 0-.05-.663s-1.291.1-2.125.1c-.784 0-2.1-.1-2.1-.1a.333.333 0 0 0-.05.663s.352.048.856.082L11.1 12.18l-2.2 6.59L5.4 9.583c.534-.028.913-.085.913-.085a.333.333 0 0 0-.05-.663s-1.292.1-2.125.1a9.03 9.03 0 0 1-.208-.006A8.812 8.812 0 0 1 12 3.188c2.282 0 4.36.868 5.922 2.291a2.994 2.994 0 0 0-.239-.01c-.783 0-1.34.682-1.34 1.413 0 .657.38 1.212.784 1.866.305.531.662 1.212.662 2.197 0 .682-.261 1.47-.604 2.57l-.793 2.645-2.172-6.478zm4.336 11.878l2.742-7.93c.511-1.276.681-2.298.681-3.21 0-.33-.022-.636-.06-.921A8.814 8.814 0 0 1 20.81 12a8.786 8.786 0 0 1-3.255 6.46z"/>
      </svg>
    </Logo>
  );
}

/* React */
function LogoReact() {
  return (
    <Logo bg="#20232a">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#61DAFB">
        <circle cx="12" cy="12" r="2.139"/>
        <path d="M12 6.872c5.154 0 9.333 2.301 9.333 5.139s-4.179 5.139-9.333 5.139-9.333-2.301-9.333-5.139 4.179-5.139 9.333-5.139z" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
        <path d="M8.535 9.006c2.577-4.464 6.306-7.13 8.319-5.97s2.013 5.693-.564 10.157S9.984 20.323 7.971 19.163s-2.013-5.693.564-10.157z" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
        <path d="M15.465 9.006c2.577 4.464 3.141 9.693 1.128 10.853s-5.742-1.506-8.319-5.97S4.734 4.196 6.747 3.036s5.741 1.506 8.318 5.97z" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
      </svg>
    </Logo>
  );
}

/* Next.js */
function LogoNextjs() {
  return (
    <Logo bg="#000000">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z"/>
      </svg>
    </Logo>
  );
}

/* Instagram */
function LogoInstagram() {
  return (
    <Logo bg="linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </Logo>
  );
}

/* TikTok */
function LogoTikTok() {
  return (
    <Logo bg="#010101">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.75a4.86 4.86 0 01-1.02-.06z"/>
      </svg>
    </Logo>
  );
}

/* Facebook */
function LogoFacebook() {
  return (
    <Logo bg="#1877F2">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </Logo>
  );
}

/* LinkedIn */
function LogoLinkedIn() {
  return (
    <Logo bg="#0A66C2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </Logo>
  );
}

/* Meta */
function LogoMeta() {
  return (
    <Logo bg="#0866FF">
      <svg width="24" height="16" viewBox="0 0 30 20" fill="white">
        <path d="M15 10c0-2.75-1.5-5-3-5C10.5 5 9 7.25 9 10s1.5 5 3 5c1.5 0 3-2.25 3-5z"/>
        <path d="M2 10C2 5.5 4 2 7 2c1.5 0 3 1 4.5 3.5C13 3 14.5 2 16 2c3 0 5 3.5 5 8 0 4.5-2 8-5 8-1.5 0-3-1-4.5-3.5C10 16.5 8.5 18 7 18c-3 0-5-3.5-5-8z" fill="none" stroke="white" strokeWidth="2"/>
      </svg>
    </Logo>
  );
}

/* Google */
function LogoGoogle() {
  return (
    <Logo bg="#ffffff">
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    </Logo>
  );
}

/* Google Ads */
function LogoGoogleAds() {
  return (
    <Logo bg="#FABC05">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
      </svg>
    </Logo>
  );
}

/* Figma */
function LogoFigma() {
  return (
    <Logo bg="#1e1e1e">
      <svg width="18" height="26" viewBox="0 0 38 57">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    </Logo>
  );
}

/* Canva */
function LogoCanva() {
  return (
    <Logo bg="#00C4CC">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm3.2 8.4c.664 0 1.2.537 1.2 1.2s-.536 1.2-1.2 1.2-1.2-.537-1.2-1.2.536-1.2 1.2-1.2zm-6.4 0c.664 0 1.2.537 1.2 1.2s-.536 1.2-1.2 1.2-1.2-.537-1.2-1.2.536-1.2 1.2-1.2zm3.2 9.6c-2.87 0-5.2-2.33-5.2-5.2h10.4c0 2.87-2.33 5.2-5.2 5.2z"/>
      </svg>
    </Logo>
  );
}

/* Adobe Illustrator */
function LogoIllustrator() {
  return (
    <Logo bg="#FF9A00">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M10 16.5l-1.5-4.5h-3l-1.5 4.5H2L6 7h2l4 9.5h-2zM7 10L5.75 13.5h2.5L7 10zM14 7h2v9.5h-2V7zM15 5.5c-.69 0-1.25-.56-1.25-1.25S14.31 3 15 3s1.25.56 1.25 1.25S15.69 5.5 15 5.5z"/>
      </svg>
    </Logo>
  );
}

/* Google Search Console */
function LogoSearchConsole() {
  return (
    <Logo bg="#458CF5">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </Logo>
  );
}

/* Google Analytics */
function LogoAnalytics() {
  return (
    <Logo bg="#E37400">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M22 21H2V3h2v16h2v-9h4v9h2V8h4v13h2V5h4z"/>
      </svg>
    </Logo>
  );
}

/* Semrush */
function LogoSemrush() {
  return (
    <Logo bg="#FF642D">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </Logo>
  );
}

/* ─── Per-card logo arrays ─── */
const cardLogos: React.ReactNode[][] = [
  // 0 — Sites Web
  [<LogoShopify key="s"/>, <LogoWordPress key="w"/>, <LogoReact key="r"/>, <LogoNextjs key="n"/>],
  // 1 — Social Media
  [<LogoInstagram key="ig"/>, <LogoTikTok key="tt"/>, <LogoFacebook key="fb"/>, <LogoLinkedIn key="li"/>],
  // 2 — Publicité
  [<LogoMeta key="m"/>, <LogoGoogle key="g"/>, <LogoGoogleAds key="ga"/>, <LogoTikTok key="tt"/>],
  // 3 — SEO
  [<LogoGoogle key="g"/>, <LogoSearchConsole key="sc"/>, <LogoAnalytics key="an"/>, <LogoSemrush key="se"/>],
  // 4 — Branding
  [<LogoFigma key="f"/>, <LogoCanva key="c"/>, <LogoIllustrator key="il"/>],
];

/* ─── Service icons ─── */
function IconWeb() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
}
function IconSocial() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>;
}
function IconAds() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function IconSeo() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function IconBrand() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.5-.7-.5-1.1 0-.9.7-1.7 1.7-1.7H16c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z"/><circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/></svg>;
}
const ICONS = [IconWeb, IconSocial, IconAds, IconSeo, IconBrand];

/* ─── Grid backgrounds ─── */
const dotGridStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage: 'radial-gradient(circle, rgba(30,70,107,0.12) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  maskImage: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)',
  WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)',
};
const lineGridStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,transparent 60%)',
  WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,transparent 60%)',
};

/* ─── Service Card ─── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cfg = cardConfig[index];
  const IconComp = ICONS[index];
  const logos = cardLogos[index];
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const dark = cfg.isDark;
  const wide = cfg.isWide;

  const bg = dark ? '#0a1628'
    : index === 0 ? 'linear-gradient(135deg,#f0f5fb 0%,#e8f0f8 100%)'
    : index === 4 ? 'linear-gradient(135deg,#e8f0f8 0%,#f0f5fb 100%)'
    : '#f5f8fc';

  const border = dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.1)';
  const shadow = dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.03),0 8px 32px rgba(30,70,107,0.06)';

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -8, scale: 1.01, duration: 0.5, ease: 'power3.out',
      boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.5)' : '0 24px 64px rgba(30,70,107,0.15)' });
    if (accentLineRef.current) gsap.to(accentLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out', boxShadow: shadow });
    if (accentLineRef.current) gsap.to(accentLineRef.current, { scaleX: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      className={`service-card service-card-${index}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        gridColumn: wide ? '1 / -1' : undefined,
        background: bg, border, borderRadius: 16,
        padding: wide ? 'clamp(32px,4vw,48px) clamp(24px,3vw,40px)' : 'clamp(28px,3vw,40px) clamp(20px,2.5vw,32px)',
        position: 'relative', overflow: 'hidden', cursor: 'none', willChange: 'transform',
      }}
    >
      <div style={dark ? lineGridStyle : dotGridStyle} />

      {/* Accent line */}
      <div ref={accentLineRef} style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 3,
        background: dark ? 'rgba(103,186,244,0.8)' : 'var(--accent)',
        borderRadius: '0 0 16px 16px', transform: 'scaleX(0)', transformOrigin: 'left',
      }} />

      {/* Inner */}
      <div className={wide ? 'service-card-inner-wide' : undefined} style={{
        display: wide ? 'grid' : 'block',
        gridTemplateColumns: wide ? '1.2fr 1fr' : undefined,
        gap: wide ? 'clamp(24px,4vw,40px)' : undefined,
        alignItems: wide ? 'center' : undefined,
      }}>

        {/* LEFT */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div className={`service-icon-${index}`} style={{
              width: 52, height: 52, borderRadius: 14,
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,70,107,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? 'rgba(255,255,255,0.7)' : 'var(--accent)', flexShrink: 0,
            }}>
              <IconComp />
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: wide ? 'clamp(2rem,3.5vw,3rem)' : 'clamp(1.5rem,2.5vw,2.5rem)',
              color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(30,70,107,0.05)',
              lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              {service.number}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: wide ? 'clamp(1.6rem,3vw,2.8rem)' : 'clamp(1.2rem,2vw,1.75rem)',
            letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12,
            color: dark ? '#ffffff' : 'var(--text)',
          }}>
            {service.name}
          </h3>

          <p style={{
            fontSize: 'clamp(0.9rem,1vw,1.05rem)', lineHeight: 1.7,
            color: dark ? 'rgba(255,255,255,0.5)' : 'var(--text-dim)',
            marginBottom: 24, maxWidth: 400,
          }}>
            {service.description}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: !wide ? 28 : 0 }}>
            {service.sub.map((tag, t) => (
              <span key={t} className="service-tag" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                padding: '5px 13px', borderRadius: 100,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,70,107,0.07)',
                color: dark ? 'rgba(255,255,255,0.55)' : 'var(--accent)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(30,70,107,0.12)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Half-card bottom: metric + logos */}
          {!wide && (
            <div style={{
              borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.08)',
              paddingTop: 20, marginTop: 4,
            }}>
              <div style={{ marginBottom: 16 }}>
                <div className="service-metric-value" style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 900,
                  fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-0.04em', lineHeight: 1,
                  color: dark ? '#ffffff' : 'var(--accent)',
                }}>
                  {cfg.metricValue}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginTop: 4, color: dark ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)',
                }}>
                  {cfg.metricLabel}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {logos.map((logo, k) => <span key={k}>{logo}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — wide cards only */}
        {wide && (
          <div style={{
            borderLeft: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.08)',
            paddingLeft: 'clamp(20px,3vw,40px)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20,
            justifyContent: 'center',
          }}>
            <div>
              <div className="service-metric-value" style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(2.2rem,5vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1,
                color: dark ? '#ffffff' : 'var(--accent)',
              }}>
                {cfg.metricValue}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginTop: 6, color: dark ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)',
              }}>
                {cfg.metricLabel}
              </div>
            </div>

            {/* Logo grid */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {logos.map((logo, k) => <span key={k}>{logo}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const eyebrow = headingRef.current?.querySelector('.services-eyebrow');
      const titleWords = headingRef.current?.querySelectorAll<HTMLElement>('.services-title-word');
      const subtitle = headingRef.current?.querySelector('.services-subtitle');

      if (eyebrow) gsap.fromTo(eyebrow, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      if (titleWords?.length) {
        gsap.set(titleWords, { opacity: 0, y: 60, rotateX: -15 });
        gsap.to(titleWords, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      }
      if (subtitle) gsap.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35, scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      if (dividerRef.current) gsap.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left', scrollTrigger: { trigger: dividerRef.current, start: 'top 90%', once: true } });

      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.service-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.88, rotateZ: i % 2 === 0 ? -3 : 3, rotateX: -8 },
          { opacity: 1, y: 0, scale: 1, rotateZ: 0, rotateX: 0, duration: 1, ease: 'power3.out', delay: 0.12 * i, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } }
        );
        const tags = card.querySelectorAll('.service-tag');
        if (tags.length) gsap.fromTo(tags, { opacity: 0, y: 12, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.12 * i + 0.5, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } });
        const metric = card.querySelector<HTMLElement>('.service-metric-value');
        if (metric) gsap.fromTo(metric, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut', delay: 0.12 * i + 0.6, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } });
      });

      services.forEach((_, i) => {
        const icon = gridRef.current?.querySelector(`.service-icon-${i}`);
        if (icon) gsap.to(icon, { y: -8, rotate: 3, duration: 2.6 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ padding: 'clamp(80px,10vw,140px) 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>

        <div ref={headingRef} style={{ marginBottom: 48 }}>
          <div className="services-eyebrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20,
            padding: '8px 20px 8px 12px', borderRadius: 100,
            background: 'rgba(30,70,107,0.06)', border: '1px solid rgba(30,70,107,0.14)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)' }}>
              Nos Services
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1, letterSpacing: '-0.04em', perspective: 800, marginBottom: 20, overflow: 'hidden' }}>
            {['On', "s'occupe", 'de'].map((w, i) => (
              <span key={i} className="services-title-word" style={{ display: 'inline-block', marginRight: '0.22em', color: 'var(--text)' }}>{w}</span>
            ))}
            <span className="services-title-word" style={{
              display: 'inline-block', fontStyle: 'italic', fontWeight: 400,
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              color: 'var(--accent)', letterSpacing: '0.01em',
            }}>
              tout
            </span>
          </h2>

          <p className="services-subtitle" style={{ fontSize: 'clamp(1rem,1.2vw,1.15rem)', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 460 }}>
            Concentrez-vous sur votre métier. Impulse gère votre visibilité digitale.
          </p>
        </div>

        <div ref={dividerRef} style={{ width: '100%', height: 1, marginBottom: 48, background: 'linear-gradient(90deg,rgba(30,70,107,0.25),rgba(30,70,107,0.1) 50%,transparent)', transformOrigin: 'left' }} />

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }} className="services-cards-grid">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-cards-grid { grid-template-columns: 1fr !important; }
          .service-card { grid-column: 1 !important; }
          .service-card-inner-wide { grid-template-columns: 1fr !important; }
          .service-card-inner-wide > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
