import type { Metadata } from 'next';
import './globals.css';
import { inter, plusJakarta } from '@/lib/fonts';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { StickyCTAMobile } from '@/components/layout/sticky-cta-mobile';

export const metadata: Metadata = {
  title: 'Impulse Agency — Agence Digitale Full-Service',
  description:
    'Impulse accompagne les marques ambitieuses avec des stratégies digitales qui génèrent de vrais résultats mesurables. Sites web, Social Media, SEO, Ads, Branding.',
  openGraph: {
    title: 'Impulse Agency — Agence Digitale Full-Service',
    description:
      'Transformez votre business en machine à clients avec des stratégies digitales qui génèrent de vrais résultats.',
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Impulse Agency',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakarta.variable}`}>
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
