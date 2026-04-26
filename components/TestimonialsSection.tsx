'use client';
import Image from 'next/image';
import { useState } from 'react';

const reviews = [
  { name: 'Rodrigo M.',   photo: '/assets/Clientes/1.jpg',  text: 'Ótima pousada! Quarto limpo, wi-fi funcionando bem e atendimento excelente. Recomendo para quem precisa ficar em Romelândia.' },
  { name: 'Mariana S.',   photo: '/assets/Clientes/2.jpg',  text: 'Muito aconchegante e bem localizado. O pessoal é super atencioso. Com certeza voltarei!' },
  { name: 'Carlos A.',    photo: '/assets/Clientes/3.jpg',  text: 'Melhor custo-benefício da região. Limpo, silencioso e com tudo que precisava para uma boa noite de descanso.' },
  { name: 'Ana Paula F.', photo: null, text: 'Atendimento impecável desde a reserva até o checkout. Café da manhã farto e quarto muito confortável.' },
  { name: 'Fábio L.',     photo: null, text: 'Passei 3 noites a trabalho e foi excelente. Wi-Fi estável, silencioso e localização perfeita no centro.' },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: '#C8A97A', fontSize: '.9rem' }}>★</span>
      ))}
    </div>
  );
}

function Card({ name, photo, text }: { name: string; photo: string | null; text: string }) {
  const [hovered, setHovered] = useState(false);
  const initial = name.charAt(0);

  return (
    <div
      className="testimonial-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(250,247,242,.07)' : 'rgba(250,247,242,.04)',
        border: `1px solid ${hovered ? 'rgba(250,247,242,.2)' : 'rgba(250,247,242,.1)'}`,
        borderRadius: 4, padding: '28px 24px',
        transition: 'background .25s, border-color .25s',
      }}
    >
      <Stars />
      <p style={{
        fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 300,
        fontSize: '1.08rem', lineHeight: 1.65, color: 'rgba(250,247,242,.85)',
        marginBottom: 24,
      }}>
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#9B1B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {photo ? (
            <Image src={photo} alt={name} fill style={{ objectFit: 'cover' }} sizes="44px" />
          ) : (
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 500, color: 'rgba(250,247,242,.9)' }}>
              {initial}
            </span>
          )}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.82rem', fontWeight: 700, color: 'rgba(250,247,242,.85)' }}>
            {name}
          </div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.7rem', color: 'rgba(250,247,242,.4)', marginTop: 1 }}>
            Google Reviews
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#1F1B16', padding: '96px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: '#C8A97A' }} />
            <span style={{ fontFamily: 'var(--font-lato)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#C8A97A' }}>
              Depoimentos
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: '#FAF7F2', lineHeight: 1.15 }}>
            O que nossos <em style={{ fontStyle: 'italic' }}>hóspedes dizem</em>
          </h2>
        </div>

        <div className="testimonials-grid-3 reveal">
          {reviews.slice(0, 3).map(r => <Card key={r.name} {...r} />)}
        </div>

        <div className="testimonials-grid-2 reveal">
          {reviews.slice(3).map(r => <Card key={r.name} {...r} />)}
        </div>
      </div>
    </section>
  );
}
