'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/animations/section-heading';
import { FadeIn } from '@/components/animations/fade-in';

const faqs = [
  {
    q: "Comment se passe le diagnostic offert ?",
    a: "C'est simple : vous laissez votre prénom et votre numéro WhatsApp. On vous rappelle dans les 24h pour un échange de 20-30 minutes. On analyse votre présence digitale et on vous présente les axes d'amélioration prioritaires — sans engagement, sans jargon.",
  },
  {
    q: "Combien coûtent vos prestations ?",
    a: "Nos tarifs dépendent entièrement de vos besoins, de l'ampleur du projet et de vos objectifs. Chaque client a une situation unique — c'est exactement pour ça qu'on commence par un diagnostic offert. On prend le temps de comprendre votre business avant de vous proposer une offre sur mesure, adaptée à votre budget et à vos ambitions.",
  },
  {
    q: "En combien de temps voit-on des résultats ?",
    a: "Pour la publicité (Meta Ads, Google Ads), les premiers résultats se voient en 2-4 semaines. Pour le SEO, comptez 2-3 mois pour des résultats significatifs. Pour les réseaux sociaux, l'engagement s'améliore dès le premier mois. On vous fixe des objectifs clairs dès le départ.",
  },
  {
    q: "Vous travaillez avec quels types de clients ?",
    a: "On accompagne des TPE, PME et indépendants dans tous les secteurs : e-commerce, restauration, services B2B, immobilier, santé, mode... Peu importe votre secteur, si vous voulez développer votre présence digitale et générer plus de clients, on peut vous aider.",
  },
  {
    q: "Est-ce qu'il y a un engagement minimum ?",
    a: "Non. Nos prestations sont sans engagement longue durée. On travaille mois par mois. Si vous n'êtes pas satisfait, vous êtes libre de partir. Notre objectif est de vous donner des résultats concrets pour que vous restiez par choix, pas par obligation.",
  },
  {
    q: "Est-ce que vous gérez tout ou faut-il s'impliquer ?",
    a: "On gère l'essentiel — stratégie, création, diffusion, optimisation. Votre implication se limite à valider les contenus et nous fournir les informations sur votre business. On s'adapte à votre disponibilité.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--bg-2)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
              FAQ
            </span>
          </FadeIn>
          <SectionHeading accent="fréquentes" fontSize="clamp(28px, 4.5vw, 56px)" style={{ maxWidth: 600 }}>
            Les questions
          </SectionHeading>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.05}>
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  ...(i === faqs.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}),
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    padding: 'clamp(18px, 2.5vw, 24px) 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: 'clamp(16px, 2vw, 20px)',
                      color: openIndex === i ? 'var(--accent)' : 'var(--text)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      transition: 'color 300ms',
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Icon */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `1px solid ${openIndex === i ? 'var(--accent)' : 'var(--line)'}`,
                      background: openIndex === i ? 'var(--accent)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 300ms var(--ease-expo)',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke={openIndex === i ? 'white' : 'var(--text-dim)'} strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: openIndex === i ? '1fr' : '0fr',
                    transition: 'grid-template-rows 400ms var(--ease-expo)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        fontSize: 'clamp(14px, 1.8vw, 17px)',
                        color: 'var(--text-dim)',
                        lineHeight: 1.7,
                        paddingBottom: 'clamp(18px, 2.5vw, 24px)',
                        maxWidth: 720,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div style={{ marginTop: 'clamp(40px, 5vw, 64px)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 16, color: 'var(--text-dim)' }}>
              Vous avez une autre question ?
            </p>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 64,
                padding: '12px 28px',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                transition: 'background 300ms',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'}
            >
              Je veux mon diagnostic gratuit
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
