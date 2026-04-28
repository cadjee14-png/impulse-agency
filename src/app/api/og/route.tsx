import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#0D0D0D',
          padding: '80px 90px',
          position: 'relative',
        }}
      >
        {/* Barre accent gauche */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: '#1E466B', display: 'flex' }} />

        {/* Cercle déco */}
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,70,107,0.35) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Label */}
        <div style={{
          fontSize: 18, fontWeight: 700, color: '#67BAF4',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: 28, display: 'flex',
        }}>
          Impulse Agency
        </div>

        {/* Titre */}
        <div style={{
          fontSize: 68, fontWeight: 900, color: '#FFFFFF',
          lineHeight: 1.0, letterSpacing: '-0.03em',
          marginBottom: 28, display: 'flex', flexDirection: 'column',
        }}>
          <span>Agence Digitale</span>
          <span style={{ color: '#67BAF4' }}>Marseille & La Réunion</span>
        </div>

        {/* Sous-titre */}
        <div style={{
          fontSize: 26, color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.5, display: 'flex',
        }}>
          Publicité Meta & Google · Sites Web · SEO · Social Media
        </div>

        {/* URL bas droite */}
        <div style={{
          position: 'absolute', bottom: 72, right: 90,
          fontSize: 20, color: 'rgba(255,255,255,0.3)',
          fontWeight: 500, display: 'flex',
        }}>
          impulse-agency.fr
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
