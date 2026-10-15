'use client';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  return (
    <footer style={{ background: '#0B1F3A', color: 'rgba(244,239,230,.55)', padding: '56px 40px 32px' }}>
      <div className="footer-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        paddingBottom: 40, borderBottom: '1px solid rgba(244,239,230,.08)',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <BrandLogo variant="light" height={40} />
          </div>
          <p style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', lineHeight: 1.65, maxWidth: 300 }}>
            Conforto e acolhimento no coração de Romelândia SC desde 2018.
          </p>
        </div>

        {/* Nav */}
        <div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,239,230,.3)', marginBottom: 16 }}>
            Navegação
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Início', '/'], ['Quartos', '/quartos'], ['Galeria', '/galeria'], ['Reservas', '/reservas'], ['Contato', '/contato']].map(([label, href]) => (
              <li key={href}>
                <Link href={href} style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', color: 'rgba(244,239,230,.52)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F4EFE6')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,239,230,.52)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: 'var(--font-lato)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,239,230,.3)', marginBottom: 16 }}>
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
                  style={{ fontFamily: 'var(--font-lato)', fontSize: '.85rem', color: 'rgba(244,239,230,.52)', textDecoration: 'none', whiteSpace: 'pre-line', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F4EFE6')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,239,230,.52)')}>
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
        fontFamily: 'var(--font-lato)', fontSize: '.72rem', color: 'rgba(244,239,230,.22)',
      }}>
        <span>© 2026 Pousada Romelândia · Todos os direitos reservados</span>
        <span>Site por Host Pro</span>
      </div>
    </footer>
  );
}
