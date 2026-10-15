import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserve seu quarto na Pousada Romelândia, em Romelândia SC: escolha o quarto e confirme direto pelo WhatsApp. Sem cartão de crédito e sem taxa antecipada.",
  alternates: { canonical: "/reservas" },
  openGraph: { title: "Reservas | Pousada Romelândia", description: "Reserve seu quarto na Pousada Romelândia, em Romelândia SC: escolha o quarto e confirme direto pelo WhatsApp. Sem cartão de crédito e sem taxa antecipada.", url: "/reservas", type: "website", locale: "pt_BR" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
