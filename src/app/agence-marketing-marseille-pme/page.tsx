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
  title: 'Agence Marketing Marseille PME & TPE',
  description:
    'Agence marketing digital pour PME et TPE à Marseille. Sites web, publicité Meta & Google, réseaux sociaux et SEO adaptés aux budgets des petites entreprises marseillaises.',
  keywords: [
    'agence marketing Marseille PME',
    'agence marketing digital Marseille TPE',
    'agence marketing petite entreprise Marseille',
    'marketing digital PME Marseille',
    'agence digitale Marseille artisan',
    'agence web PME Marseille',
    'marketing digital Marseille',
    'agence communication Marseille PME',
    'publicité en ligne PME Marseille',
    'prestataire digital Marseille',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-marketing-marseille-pme',
  },
  openGraph: {
    title: 'Agence Marketing Marseille PME & TPE — Impulse Agency',
    description:
      'Marketing digital adapté aux PME et TPE de Marseille. Sites web, Meta Ads, réseaux sociaux, SEO — des résultats concrets sans budget de grand groupe.',
    url: 'https://impulse-agency.fr/agence-marketing-marseille-pme',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Marketing Marseille PME — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Marketing PME Marseille',
  description:
    'Agence marketing digital spécialisée pour les PME et TPE de Marseille. Sites web, publicité Meta & Google Ads, SEO, réseaux sociaux — résultats mesurables adaptés aux budgets des petites structures.',
  url: 'https://impulse-agency.fr/agence-marketing-marseille-pme',
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
    'Marketing digital PME Marseille',
    'Création site web PME Marseille',
    'Publicité Meta Ads PME Marseille',
    'SEO PME Marseille',
    'Gestion réseaux sociaux PME Marseille',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageMarketingMarseillePme() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Marketing Marseille — PME & TPE"
        subtext="Vous êtes une PME ou TPE à Marseille et vous voulez des clients en ligne sans vous ruiner ? Impulse Agency construit et gère votre présence digitale de A à Z — site web, publicité, réseaux sociaux, SEO."
      />
      <LocalIntro {...{
        "eyebrow": "Marketing pour PME et TPE",
        "title": "Le marketing d'une grande marque, au format d'une PME marseillaise",
        "paragraphs": [
          "Une PME n'a pas de service marketing. Le gérant poste quand il a le temps, le site date d'il y a cinq ans et la pub Facebook a été lancée une fois, sans suivi. Ce n'est pas un manque de motivation, c'est un manque de temps.",
          "On prend ce rôle à votre place. On commence par regarder ce qui vous ramène déjà des clients, puis on renforce ce qui marche et on coupe ce qui coûte sans rapporter. Pas de forfait gonflé : on dimensionne l'accompagnement à votre budget réel."
        ],
        "points": [
          {
            "title": "Un interlocuteur, pas une chaîne de sous-traitants",
            "text": "Vous parlez directement à la personne qui gère votre compte. Pas de chef de projet qui transmet à un junior."
          },
          {
            "title": "Des priorités claires",
            "text": "On ne lance pas cinq chantiers en même temps. On attaque d'abord le levier qui peut rapporter le plus vite, puis on élargit."
          },
          {
            "title": "Sans engagement longue durée",
            "text": "On travaille au mois. Si les résultats ne suivent pas, vous êtes libre d'arrêter."
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
