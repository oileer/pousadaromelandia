'use client';
import Image from 'next/image';
import Link from 'next/link';

const WA_URL = 'https://wa.me/5549984008534?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20na%20Pousada%20Romel%C3%A2ndia.';

export default function CtaBanner() {
  return (
    <div className="fx-dark" style={{ background: '#0B1F3A', padding: '96px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="fx-aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="fx-roof" aria-hidden="true" />
      <div style={{ position: 'absolute', inset: 0, opacity: .1 }}>
        <Image src="/assets/Corredores/2.jpeg" alt="" fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="reveal" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#C9A24B', marginBottom: 16 }}>
          Reserve agora
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#F4EFE6', lineHeight: 1.15, marginBottom: 12 }}>
          Sua próxima estadia <em className="fx-gold-text" style={{ fontStyle: 'italic' }}>começa aqui</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-lato)', fontSize: '.95rem', color: 'rgba(244,239,230,.62)', marginBottom: 36 }}>
          Reserve pelo WhatsApp em minutos — sem formulários, sem espera. Atendimento rápido e pessoal.
        </p>
        <Link
          className="fx-shine fx-magnetic"
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#F4EFE6', color: '#0B1F3A', position: 'relative', overflow: 'hidden',
            fontFamily: 'var(--font-lato)', fontSize: '.82rem', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase' as const,
            padding: '16px 32px', borderRadius: 2, textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(11,31,58,.2)', transition: 'background .2s, color .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0B1F3A'; e.currentTarget.style.color = '#F4EFE6'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#F4EFE6'; e.currentTarget.style.color = '#0B1F3A'; }}
        >
          Falar no WhatsApp
        </Link>
      </div>
    </div>
  );
}
