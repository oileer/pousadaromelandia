import type { Metadata } from "next"
import { Playfair_Display_SC, Lato } from "next/font/google"
import "./globals.css"

const display = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
})

const body = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hotel Pousada Romelândia | Romelândia SC",
  description: "Hospedagem confortável e acolhedora no centro de Romelândia SC. 9 quartos com ar-condicionado, Wi-Fi e estacionamento. Nota 4,5 ★ no Google.",
  keywords: "pousada romelândia, hotel romelândia SC, hospedagem romelândia",
  openGraph: {
    title: "Hotel Pousada Romelândia",
    description: "Conforto e acolhimento no coração de Romelândia SC.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: "Lato, Arial, sans-serif", backgroundColor: "var(--cream)", color: "var(--text)" }}>
        {children}
      </body>
    </html>
  )
}
