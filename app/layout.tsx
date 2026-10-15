import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import WhatsAppFAB from "@/components/WhatsAppFAB"
import SiteFx from "@/components/SiteFx"
import "./globals.css"
import { SITE_URL, NEGOCIO } from "@/lib/seo"

const cormorant = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const viewport = { themeColor: "#0B1F3A" }

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hotel Pousada Romelândia | Romelândia SC", template: "%s | Pousada Romelândia" },
  description: "Pousada aconchegante no centro de Romelândia SC. 9 quartos com ar-condicionado, Wi-Fi e estacionamento gratuito. Avaliação 4,5 ★ no Google. Reserve pelo WhatsApp.",
  keywords: "pousada romelândia, hotel romelândia SC, hospedagem romelândia, onde dormir romelândia, pousada oeste catarinense",
  openGraph: {
    title: "Hotel Pousada Romelândia | Romelândia SC",
    description: "Hospedagem confortável e acolhedora no coração de Romelândia SC. Reserve agora pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Pousada Romelândia",
    description: "Hospedagem aconchegante em Romelândia SC. Avaliação 4,5 ★ no Google.",
  },
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Pousada Romelândia", statusBarStyle: "default" },
  icons: { apple: "/icon-192.png" },
}

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Hotel Pousada Romelândia",
  "url": SITE_URL,
  "telephone": "+55 49 9 8400-8534",
  "email": "pousadaromelandia@gmail.com",
  "image": SITE_URL + "/assets/Corredores/1.jpeg",
  "description": "Pousada aconchegante no centro de Romelândia SC. 9 quartos com ar-condicionado, Wi-Fi e estacionamento gratuito.",
  "@id": SITE_URL + "/#negocio",
  "logo": SITE_URL + "/icon-512.png",
  "priceRange": "$",
  "petsAllowed": false,
  "paymentAccepted": "Dinheiro, PIX, Cartão",
  "currenciesAccepted": "BRL",
  "availableLanguage": "pt-BR",
  "sameAs": [NEGOCIO.instagram],
  "hasMap": NEGOCIO.mapa,
  "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59" },
  "areaServed": { "@type": "City", "name": "Romelândia" },
  "checkinTime": "14:00",
  "checkoutTime": "12:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R. Doze de Outubro, 798",
    "addressLocality": "Romelândia",
    "addressRegion": "SC",
    "postalCode": "89890-000",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -26.6956, "longitude": -53.5342 },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.5", "reviewCount": "60", "bestRating": "5" },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi gratuito", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Ar-condicionado", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Estacionamento", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Café da manhã", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "TV a cabo", "value": true }
  ],
  "numberOfRooms": 9,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${lato.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body style={{ background: "#F4EFE6", color: "#0B1F3A", overflowX: "hidden" }}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ScrollReveal />
        <SiteFx />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
