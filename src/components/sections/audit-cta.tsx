'use client';

import { SectionHeading } from '@/components/animations/section-heading';
import { FadeIn } from '@/components/animations/fade-in';
import { DiagnosticForm } from '@/components/forms/diagnostic-form';

export function AuditCta() {
  return (
    <section
      id="audit"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        background: 'var(--accent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,186,244,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-5%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,51,80,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>

        {/* Header centré */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <FadeIn direction="up">
            <span style={{ display: 'inline-block', fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--accent-light)', fontWeight: 600, marginBottom: 24 }}>
              Diagnostic Offert
            </span>
          </FadeIn>

          <SectionHeading
            accent="business ?"
            fontSize="clamp(32px, 5.5vw, 80px)"
            color="white"
            accentColor="var(--accent-light)"
            style={{ lineHeight: 0.95, marginBottom: 20 }}
          >
            Prêt à faire décoller votre
          </SectionHeading>

          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              3 questions, 60 secondes. On vous rappelle sur WhatsApp avec un plan d&apos;action sur mesure.
            </p>
          </FadeIn>
        </div>

        {/* Formulaire 3 étapes */}
        <FadeIn direction="up" delay={0.25}>
          <DiagnosticForm variant="section" />
        </FadeIn>
      </div>
    </section>
  );
}
