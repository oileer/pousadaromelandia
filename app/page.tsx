import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import StatsBand from '@/components/StatsBand';
import AboutSection from '@/components/AboutSection';
import RoomCard from '@/components/RoomCard';
import GalleryStrip from '@/components/GalleryStrip';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import CtaBanner from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'Hotel Pousada Romelândia | Romelândia SC',
  description: 'A melhor hospedagem de Romelândia SC — 9 quartos, café da manhã incluso, Wi-Fi e estacionamento gratuito. Reserve pelo WhatsApp.',
};

const rooms = [
  {
    name: 'Quarto Conforto',
    slug: 'q5',
    imageSrc: '/assets/Quarto5/1.jpeg',
    capacity: 'Até 4 pessoas',
    tags: ['Cama Casal', '2 Solteiros', 'Ar-cond.', 'Wi-Fi'],
    waMessage: 'Olá! Tenho interesse no Quarto Conforto. Pode verificar disponibilidade?',
  },
  {
    name: 'Quarto Superior',
    slug: 'q6',
    imageSrc: '/assets/Quarto6/1.jpeg',
    capacity: 'Até 4 pessoas',
    tags: ['Cama Casal', '2 Solteiros', 'Frigobar', 'Wi-Fi'],
    waMessage: 'Olá! Tenho interesse no Quarto Superior. Pode verificar disponibilidade?',
  },
  {
    name: 'Quarto Casal',
    slug: 'q7',
    imageSrc: '/assets/Quarto7/1.jpeg',
    capacity: 'Até 3 pessoas',
    tags: ['Cama Casal', 'Ar-cond.', 'Wi-Fi', 'Privativo'],
    waMessage: 'Olá! Tenho interesse no Quarto Casal. Pode verificar disponibilidade?',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBand />
      <AboutSection />

      {/* Quartos */}
      <section style={{ padding: '96px 40px', background: '#FAF7F2' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1, background: '#9B1B1B' }} />
                <span style={{ fontFamily: 'var(--font-lato)', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#9B1B1B' }}>
                  Acomodações
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: '#1F1B16', lineHeight: 1.15 }}>
                Nossas <em style={{ fontStyle: 'italic' }}>Acomodações</em>
              </h2>
            </div>
            <a
              href="/quartos"
              style={{ fontFamily: 'var(--font-lato)', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#9B1B1B', borderBottom: '1px solid #9B1B1B', paddingBottom: 2, textDecoration: 'none' }}
            >
              Ver todos os quartos →
            </a>
          </div>

          <div className="rooms-grid">
            {rooms.map(room => (
              <div key={room.slug} className="reveal">
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GalleryStrip />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
