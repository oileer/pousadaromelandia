'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section style={{ background: '#F0EAE0', padding: '96px 40px' }}>
      <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', alignItems: 'center' }}>
        {/* Images composition */}
        <div className="reveal about-images-wrap" style={{ position: 'relative', height: 540 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 80, bottom: 80,
            borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(31,27,22,.18)',
          }}>
            <Image
              src="/assets/Corredores/0.jpeg"
              alt="Entrada da Pousada Romelandia"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '55%', height: '52%',
            borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(31,27,22,.22)',
            border: '4px solid #F0EAE0',
          }}>
            <Image
              src="/assets/Quarto5/1.jpeg"
              alt="Quarto Pousada Romelandia"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 30vw"
            />
          </div>

          <div style={{
            position: 'absolute', top: 24, right: 100,
            background: '#9B1B1B', color: '#FAF7F2',
            padding: '14px 18px', textAlign: 'center', borderRadius: 2,
            boxShadow: '0 8px 24px rgba(155,27,27,.32)',
          }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', fontWeight: 300, display: 'block', lineHeight: 1 }}>
              ★ 4,5
            </span>
            <span style={{ fontFamily: 'var(--font-lato)', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, opacity: .8, marginTop: 4, display: 'block' }}>
              Google Reviews
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="reveal">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: '#9B1B1B' }} />
            <span style={{ fontFamily: 'var(--font-lato)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#9B1B1B' }}>
              Nossa Historia
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 1, background: '#C8A97A' }} />
            <span style={{ color: '#C8A97A', fontSize: '.5rem' }}>✦</span>
            <div style={{ width: 40, height: 1, background: '#C8A97A' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
            fontWeight: 300, lineHeight: 1.15, color: '#1F1B16', marginBottom: 18,
          }}>
            Uma pousada que<br /><em style={{ fontStyle: 'italic' }}>sente como lar</em>
          </h2>

          <p style={{ fontFamily: 'var(--font-lato)', fontSize: '.93rem', color: 'rgba(31,27,22,.68)', lineHeight: 1.75, marginBottom: 14 }}>
            Desde 2018 no centro de Romelândia SC, oferecemos acomodações confortáveis e atendimento personalizado para viajantes a negócios ou lazer.
          </p>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: '.93rem', color: 'rgba(31,27,22,.68)', lineHeight: 1.75 }}>
            São 9 quartos cuidadosamente equipados — com ar-condicionado, Wi-Fi de alta velocidade, TV e roupa de cama de qualidade.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', margin: '24px 0 32px' }}>
            {['Wi-Fi gratuito', 'Ar-condicionado', 'Estacionamento', 'Café da manhã', 'Atendimento 24h', 'Localização central'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-lato)', fontSize: '.82rem', color: 'rgba(31,27,22,.65)' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#9B1B1B', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <Link href="/quartos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-lato)', fontSize: '.78rem', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#9B1B1B',
            borderBottom: '1px solid #9B1B1B', paddingBottom: 2, textDecoration: 'none',
          }}>
            Ver nossas acomodações &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
