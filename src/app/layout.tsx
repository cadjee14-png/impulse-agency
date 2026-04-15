import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { inter, plusJakarta } from '@/lib/fonts';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { StickyCTAMobile } from '@/components/layout/sticky-cta-mobile';

export const metadata: Metadata = {
  metadataBase: new URL('https://impulse-agency.fr'),
  title: {
    default: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    template: '%s | Impulse Agency',
  },
  description:
    'Agence digitale à Marseille et La Réunion. Publicité Meta & Google, création de sites web, SEO, réseaux sociaux et branding pour les entreprises ambitieuses.',
  keywords: [
    'agence digitale Marseille',
    'agence publicité Marseille',
    'agence Meta Ads Marseille',
    'agence Google Ads Marseille',
    'création site web Marseille',
    'agence SEO Marseille',
    'agence digitale La Réunion',
    'agence publicité La Réunion',
    'marketing digital Marseille',
    'agence réseaux sociaux Marseille',
  ],
  authors: [{ name: 'Impulse Agency' }],
  creator: 'Impulse Agency',
  alternates: {
    canonical: 'https://impulse-agency.fr',
  },
  openGraph: {
    title: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    description:
      'Publicité Meta & Google, sites web, SEO et réseaux sociaux. On transforme votre business en machine à clients.',
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Impulse Agency',
    url: 'https://impulse-agency.fr',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    description:
      'Publicité Meta & Google, sites web, SEO et réseaux sociaux. On transforme votre business en machine à clients.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Impulse Agency',
  description:
    'Agence digitale spécialisée en publicité Meta & Google, création de sites web, SEO, réseaux sociaux et branding.',
  url: 'https://impulse-agency.fr',
  logo: 'https://impulse-agency.fr/logo.png',
  image: 'https://impulse-agency.fr/og-image.jpg',
  telephone: '+33600000000',
  email: 'contact@impulse-agency.fr',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marseille',
    addressRegion: 'Provence-Alpes-Côte d\'Azur',
    addressCountry: 'FR',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Marseille',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'La Réunion',
    },
  ],
  serviceType: [
    'Publicité Meta Ads',
    'Publicité Google Ads',
    'Création de site web',
    'SEO',
    'Gestion réseaux sociaux',
    'Branding',
  ],
  priceRange: '€€',
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S8CMV9K5NT" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S8CMV9K5NT');
        `}</Script>
      </head>
      <body style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyCTAMobile />
        </SmoothScroll>
      </body>
    </html>
  );
}
