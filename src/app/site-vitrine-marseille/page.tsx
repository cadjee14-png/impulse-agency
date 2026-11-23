import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { LocalIntro } from '@/components/sections/local-intro';
import { Services } from '@/components/sections/services';
import { Realisations } from '@/components/sections/realisations';
import { Process } from '@/components/sections/process';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Integrations } from '@/components/sections/integrations';
import { AuditCta } from '@/components/sections/audit-cta';

export const metadata: Metadata = {
  title: 'Site Vitrine Marseille — Création Site Web',
  description:
    'Création de site vitrine à Marseille. Sites web professionnels, rapides et optimisés SEO pour les entreprises marseillaises. Résultat livré en 3 semaines, hébergement inclus.',
  keywords: [
    'site vitrine Marseille',
    'création site vitrine Marseille',
    'site web professionnel Marseille',
    'création site internet Marseille',
    'agence création site web Marseille',
    'site vitrine entreprise Marseille',
    'site web artisan Marseille',
    'site internet PME Marseille',
    'refonte site web Marseille',
    'développeur web Marseille',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/site-vitrine-marseille',
  },
  openGraph: {
    title: 'Site Vitrine Marseille — Création Site Web — Impulse Agency',
    description:
      'Création de sites vitrines professionnels à Marseille. Rapides, optimisés SEO, livrés en 3 semaines. Pour artisans, restaurants, cabinets et PME.',
    url: 'https://impulse-agency.fr/site-vitrine-marseille',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Site Vitrine Marseille — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Création Site Vitrine Marseille',
  description:
    'Création de sites vitrines professionnels à Marseille pour artisans, restaurants, PME et professions libérales. Sites rapides, mobiles et optimisés pour le SEO local.',
  url: 'https://impulse-agency.fr/site-vitrine-marseille',
  logo: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '23 rue Mathieu Stilati',
    addressLocality: 'Marseille',
    postalCode: '13003',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'City',
    name: 'Marseille',
  },
  serviceType: [
    'Création site vitrine Marseille',
    'Développement site web Marseille',
    'Refonte site web Marseille',
    'Site web professionnel Marseille',
    'Site web artisan Marseille',
    'Site web restaurant Marseille',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageSiteVitrineMarseille() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Création Site Vitrine Marseille"
        subtext="Votre entreprise mérite un site web qui donne envie de vous appeler. On crée des sites vitrines professionnels à Marseille — rapides, mobiles, bien référencés — livrés en 3 semaines."
      />
      <LocalIntro {...{
        "eyebrow": "Création de site à Marseille",
        "title": "Un site vitrine conçu pour faire sonner votre téléphone",
        "paragraphs": [
          "La plupart des visiteurs arrivent sur votre site depuis Google ou Instagram, sur leur téléphone, et repartent en moins de dix secondes s'ils ne trouvent pas ce qu'ils cherchent. Un site vitrine doit répondre vite à trois questions : que faites-vous, où êtes-vous, comment vous contacter.",
          "On conçoit des sites rapides, pensés d'abord pour le mobile, avec un bouton d'appel ou de réservation toujours visible. Bellarya, ViBoost, Cabinet Sourire ou Buon Cibo Pizza font partie des sites qu'on a livrés."
        ],
        "points": [
          {
            "title": "Mobile d'abord",
            "text": "Le site est dessiné pour l'écran du téléphone, puis adapté à l'ordinateur. Pas l'inverse."
          },
          {
            "title": "Référencement local de base inclus",
            "text": "Balises, données structurées, vitesse et fiche Google Business Profile reliée : de quoi apparaître sur les recherches « + Marseille »."
          },
          {
            "title": "Vous restez propriétaire",
            "text": "Nom de domaine et contenu à votre nom. Pas de location déguisée."
          }
        ]
      }} />
      <Stats />
      <Services />
      <Realisations />
      <Process />
      <Testimonials />
      <Faq />
      <Integrations />
      <AuditCta />
    </>
  );
}
