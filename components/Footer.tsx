'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ background: '#1F1B16', color: 'rgba(250,247,242,.55)', padding: '56px 40px 32px' }}>
      <div className="footer-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        paddingBottom: 40, borderBottom: '1px solid rgba(250,247,242,.08)',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Image src="/assets/logo.png" alt="Logo" width={32} height={32} style={{ objectFit: 'contain', opacity: .85 }} />
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', fontWeight: 300, color: '#FAF7F2', letterSpacing: '.03em' }}>
              Pousada Romelândia
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', lineHeight: 1.65, maxWidth: 300 }}>
            Conforto e acolhimento no coração de Romelândia SC desde 2018.
          </p>
        </div>

        {/* Nav */}
        <div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,.3)', marginBottom: 16 }}>
            Navegação
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Início', '/'], ['Quartos', '/quartos'], ['Galeria', '/galeria'], ['Reservas', '/reservas'], ['Contato', '/contato']].map(([label, href]) => (
              <li key={href}>
                <Link href={href} style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', color: 'rgba(250,247,242,.52)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FAF7F2')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,.52)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,.3)', marginBottom: 16 }}>
            Contato
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['+55 49 9840-8534', 'https://wa.me/5549984008534'],
              ['R. Doze de Outubro, 798\nRomelândia SC', 'https://maps.google.com/?q=R.+Doze+de+Outubro,+798,+Romelândia+SC'],
              ['@pousadaromelandia_', 'https://www.instagram.com/pousadaromelandia_/'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', color: 'rgba(250,247,242,.52)', textDecoration: 'none', whiteSpace: 'pre-line', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FAF7F2')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,247,242,.52)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: 1200, margin: '28px auto 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        fontFamily: 'var(--font-lato)', fontSize: '.72rem', color: 'rgba(250,247,242,.22)',
      }}>
        <span>© 2026 Pousada Romelândia · Todos os direitos reservados</span>
        <span>Site por Host Pro</span>
      </div>
    </footer>
  );
}
