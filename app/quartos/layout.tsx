import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quartos e acomodações em Romelândia SC",
  description: "Conheça os quartos da Pousada Romelândia: cama de casal e solteiro, ar-condicionado, Wi-Fi, TV, banheiro privativo e café da manhã incluso. Veja fotos e reserve.",
  alternates: { canonical: "/quartos" },
  openGraph: { title: "Quartos e acomodações em Romelândia SC | Pousada Romelândia", description: "Conheça os quartos da Pousada Romelândia: cama de casal e solteiro, ar-condicionado, Wi-Fi, TV, banheiro privativo e café da manhã incluso. Veja fotos e reserve.", url: "/quartos", type: "website", locale: "pt_BR" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
