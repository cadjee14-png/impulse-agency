import { FadeIn } from '@/components/animations/fade-in';

interface LocalIntroProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  points: { title: string; text: string }[];
}

export function LocalIntro({ eyebrow, title, paragraphs, points }: LocalIntroProps) {
  return (
    <section style={{ padding: 'clamp(64px, 8vw, 120px) 0', background: 'var(--bg)' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(40px, 6vw, 96px)',
        }}
      >
        <div>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
              {eyebrow}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.6vw, 48px)',
                lineHeight: 1.05,
                marginBottom: 28,
              }}
            >
              {title}
            </h2>
          </FadeIn>
          {paragraphs.map((p, i) => (
            <FadeIn key={i} direction="up" delay={0.05 * (i + 1)}>
              <p style={{ color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.7, marginBottom: 18 }}>{p}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={0.1}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {points.map((pt) => (
              <li
                key={pt.title}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-card)',
                  padding: '24px 28px',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.01em' }}>
                  {pt.title}
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.6 }}>{pt.text}</p>
              </li>
          ))}
        </ul>
        </FadeIn>
      </div>
    </section>
  );
}
