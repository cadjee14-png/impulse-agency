import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Impulse Agency',
  description: 'Mentions légales du site Impulse Agency.',
};

export default function MentionsLegales() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 64px)',
        background: 'rgba(250,250,250,0.90)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)', zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
              <path d="M8 1L1 10H7L6 17L13 8H7L8 1Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: 'var(--text)', letterSpacing: '-0.04em' }}>
            Impulse<span style={{ color: 'var(--accent-light)' }}>.</span>
          </span>
        </Link>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 40px)' }}>
        <span style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 16 }}>
          Légal
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 48 }}>
          Mentions légales
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              1. Éditeur du site
            </h2>
            <p>Le site <strong>impulse-agency.fr</strong> est édité par :</p>
            <p style={{ marginTop: 8 }}>
              <strong>Impulse Agency</strong><br/>
              Représentant légal : Norman Cadjee<br/>
              Email : hello@impulse-agency.fr<br/>
              Téléphone : +33 6 88 66 31 76
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              2. Hébergeur
            </h2>
            <p>
              <strong>Vercel Inc.</strong><br/>
              440 N Barranca Ave #4133<br/>
              Covina, CA 91723, États-Unis<br/>
              Site : vercel.com
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive d'Impulse Agency. Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              4. Responsabilité
            </h2>
            <p>
              Impulse Agency s'efforce d'assurer l'exactitude et la mise à jour des informations présentes sur ce site. Nous nous réservons le droit de modifier le contenu à tout moment et sans préavis. Impulse Agency ne peut être tenu responsable de l'utilisation faite des informations présentes sur le site.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              5. Données personnelles
            </h2>
            <p>
              Les données collectées via les formulaires du site (prénom, numéro de téléphone) sont utilisées exclusivement dans le cadre de votre demande d'audit. Elles ne sont ni vendues, ni transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à hello@impulse-agency.fr.
            </p>
            <p style={{ marginTop: 8 }}>
              Pour plus d'informations, consultez notre{' '}
              <Link href="/politique-de-confidentialite" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              6. Cookies
            </h2>
            <p>
              Ce site peut utiliser des cookies à des fins de mesure d'audience (Google Analytics). Ces cookies ne collectent pas d'informations personnelles identifiables. Vous pouvez désactiver les cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <p style={{ fontSize: 13, color: 'var(--text-muted)', borderTop: '1px solid var(--line)', paddingTop: 24 }}>
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </div>
    </div>
  );
}
