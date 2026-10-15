import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contato e localização",
  description: "Fale com a Pousada Romelândia pelo WhatsApp (49) 98400-8534. Endereço: R. Doze de Outubro, 798, centro de Romelândia SC. Atendimento 24 horas.",
  alternates: { canonical: "/contato" },
  openGraph: { title: "Contato e localização | Pousada Romelândia", description: "Fale com a Pousada Romelândia pelo WhatsApp (49) 98400-8534. Endereço: R. Doze de Outubro, 798, centro de Romelândia SC. Atendimento 24 horas.", url: "/contato", type: "website", locale: "pt_BR" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
