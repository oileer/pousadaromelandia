import type { CSSProperties } from 'react';

/**
 * Logo da Pousada Romelândia (rebrand): símbolo oficial do telhado + nome em serifa.
 * O símbolo é o arquivo oficial /marca.png usado como máscara, então pode ser azul-marinho
 * (fundo claro) ou dourado (fundo escuro) sem precisar de outro arquivo.
 */
export default function BrandLogo({ variant = 'dark', height = 40, showName = true }: { variant?: 'dark' | 'light'; height?: number; showName?: boolean }) {
  const mark = variant === 'dark' ? '#0B1F3A' : '#C9A24B';
  const text = variant === 'dark' ? '#0B1F3A' : '#F4EFE6';
  const markStyle: CSSProperties = {
    display: 'inline-block', flex: 'none', height, width: Math.round(height * 2.03), background: mark,
    WebkitMaskImage: 'url(/marca.png)', maskImage: 'url(/marca.png)',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain', maskSize: 'contain',
    WebkitMaskPosition: 'center', maskPosition: 'center',
  };
  return (
    <span role="img" aria-label="Pousada Romelândia" style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(height * 0.3) }}>
      <span style={markStyle} />
      {showName && (
        <span style={{
          display: 'inline-flex', flexDirection: 'column', fontFamily: 'var(--font-brand), Georgia, serif', fontWeight: 600,
          textTransform: 'uppercase', color: text, fontSize: Math.round(height * 0.46), lineHeight: 0.98, letterSpacing: '0.02em', textAlign: 'left',
        }}>
          <span>Pousada</span>
          <span>Romelândia</span>
        </span>
      )}
    </span>
  );
}
