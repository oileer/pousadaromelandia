'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const images = [
  { src: '/assets/Corredores/2.jpeg', alt: 'Corredor da pousada' },
  { src: '/assets/Quarto5/2.jpeg',    alt: 'Quarto 5' },
  { src: '/assets/Corredores/6.jpeg', alt: 'Área comum' },
  { src: '/assets/Quarto6/2.jpeg',    alt: 'Quarto 6' },
  { src: '/assets/Quarto7/2.jpeg',    alt: 'Quarto 7' },
];

function GalleryItem({ src, alt, style, onClick }: { src: string; alt: string; style?: React.CSSProperties; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', ...style }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform .5s ease',
        }}
        sizes="(max-width: 900px) 50vw, 33vw"
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(31,27,22,.28)' : 'rgba(31,27,22,0)',
        transition: 'background .3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontSize: '1.8rem', opacity: hovered ? 1 : 0, transition: 'opacity .3s' }}>
          +
        </span>
      </div>
    </div>
  );
}

export default function GalleryStrip() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section style={{ padding: '0 40px 96px', background: '#FAF7F2' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: '260px 260px',
          gap: 4,
        }}>
          {images.map((img, i) => (
            <GalleryItem
              key={img.src}
              {...img}
              style={i === 0 ? { gridRow: '1 / 3' } : undefined}
              onClick={() => setLightbox(img.src)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 28 }}>
          <Link href="/galeria" style={{
            fontFamily: 'var(--font-lato)', fontSize: '.78rem', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#9B1B1B',
            borderBottom: '1px solid #9B1B1B', paddingBottom: 2, textDecoration: 'none',
          }}>
            Ver galeria completa &rarr;
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(20,16,12,.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: 24, right: 28,
              color: 'rgba(250,247,242,.7)', fontSize: '2rem', cursor: 'pointer',
              background: 'none', border: 'none', lineHeight: 1,
            }}
          >
            &times;
          </button>
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative', minWidth: 300, minHeight: 200 }} onClick={e => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="Pousada Romelandia"
              width={1200}
              height={800}
              style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto', borderRadius: 2 }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
