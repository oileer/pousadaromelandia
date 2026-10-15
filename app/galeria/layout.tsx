import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Galeria de fotos da pousada",
  description: "Fotos reais da Pousada Romelândia: quartos, corredores, entrada e áreas comuns. Veja onde você vai se hospedar em Romelândia SC.",
  alternates: { canonical: "/galeria" },
  openGraph: { title: "Galeria de fotos da pousada | Pousada Romelândia", description: "Fotos reais da Pousada Romelândia: quartos, corredores, entrada e áreas comuns. Veja onde você vai se hospedar em Romelândia SC.", url: "/galeria", type: "website", locale: "pt_BR" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
