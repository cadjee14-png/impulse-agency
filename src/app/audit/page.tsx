'use client';

import Link from 'next/link';
import { DiagnosticForm } from '@/components/forms/diagnostic-form';
import { FadeIn } from '@/components/animations/fade-in';
import { LineMask } from '@/components/animations/line-mask';

export default function AuditPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 32px) 100px' }}>

        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none', marginBottom: 36 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>

        <div style={{ marginBottom: 36 }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Diagnostic Offert</span>
          </FadeIn>
          <LineMask as="h1" trigger="scroll" style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 56px)', color: 'var(--text)',
            letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 16,
          }}>
            {`30 secondes.\nOn s'occupe du reste.`}
          </LineMask>
          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              3 questions pour comprendre votre projet. On vous rappelle sous 24h avec un plan d&apos;action personnalisé — gratuit, sans engagement.
            </p>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2}>
          <DiagnosticForm variant="page" />
        </FadeIn>
      </div>
    </div>
  );
}
