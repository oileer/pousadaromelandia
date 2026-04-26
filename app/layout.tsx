import type { Metadata } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import WhatsAppFAB from "@/components/WhatsAppFAB"
import "./globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
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
  title: "Hotel Pousada Romelândia | Hospedagem em Romelândia SC",
  description: "Pousada aconchegante no centro de Romelândia SC. 9 quartos com ar-condicionado, Wi-Fi e estacionamento gratuito. Avaliação 4,5 ★ no Google. Reserve pelo WhatsApp.",
  keywords: "pousada romelândia, hotel romelândia SC, hospedagem romelândia, onde dormir romelândia, pousada oeste catarinense",
  openGraph: {
    title: "Hotel Pousada Romelândia | Romelândia SC",
    description: "Hospedagem confortável e acolhedora no coração de Romelândia SC. Reserve agora pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630, alt: "Hotel Pousada Romelândia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Pousada Romelândia",
    description: "Hospedagem aconchegante em Romelândia SC. Avaliação 4,5 ★ no Google.",
  },
  alternates: { canonical: "https://www.pousadaromelandia.com.br" },
  robots: { index: true, follow: true },
}

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Hotel Pousada Romelândia",
  "url": "https://www.pousadaromelandia.com.br",
  "telephone": "+55 49 9 8400-8534",
  "email": "pousadaromelandia@gmail.com",
  "image": "https://www.pousadaromelandia.com.br/assets/og-image.jpg",
  "description": "Pousada aconchegante no centro de Romelândia SC. 9 quartos com ar-condicionado, Wi-Fi e estacionamento gratuito.",
  "priceRange": "$$",
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -26.6956,
    "longitude": -53.5342
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "60",
    "bestRating": "5"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi gratuito",        "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Ar-condicionado",       "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Estacionamento",        "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Café da manhã",         "value": true },
    { "@type": "LocationFeatureSpecification", "name": "TV a cabo",             "value": true }
  ],
  "numberOfRooms": 9,
  "starRating": { "@type": "Rating", "ratingValue": "3" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body style={{ fontFamily: "Lato, Arial, sans-serif", backgroundColor: "var(--cream)", color: "var(--text)" }}>
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  )
}
