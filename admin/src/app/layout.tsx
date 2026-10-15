import type { Metadata } from 'next';
import { Cormorant_Garamond, Lato } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import InstallPrompt from '@/components/InstallPrompt';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-cormorant' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' });

export const metadata: Metadata = {
  title: 'Pousada Romelândia · Painel',
  description: 'Painel de reservas da Pousada Romelândia.',
  robots: { index: false, follow: false },
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Painel Pousada', statusBarStyle: 'default' },
  icons: { apple: '/icon-192.png' },
};

export const viewport = { themeColor: '#0B1F3A' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn(cormorant.variable, lato.variable, 'font-body antialiased')}>
        <AuthProvider>
          {children}
          <Toaster />
          <InstallPrompt name="Painel da Pousada" />
        </AuthProvider>
      </body>
    </html>
  );
}
