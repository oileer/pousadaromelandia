"use client"
import { useState } from "react"

export const FAQS = [
  {
    q: "Quais são os horários de check-in e check-out?",
    a: "Check-in a partir das 14h e check-out até as 12h. Chegadas fora desse horário podem ser combinadas diretamente pelo WhatsApp — fazemos o possível para acomodar sua necessidade.",
  },
  {
    q: "O café da manhã está incluso?",
    a: "Sim! O café da manhã está incluso em todas as acomodações, servido diariamente no horário acordado na chegada.",
  },
  {
    q: "Tem estacionamento gratuito?",
    a: "Sim, oferecemos estacionamento gratuito para todos os hóspedes, com vagas cobertas disponíveis.",
  },
  {
    q: "Aceitam animais de estimação?",
    a: "Não aceitamos animais de estimação nas acomodações. Caso precise de indicações de estabelecimentos pet-friendly na região, podemos ajudar.",
  },
  {
    q: "Como funciona a reserva e o pagamento?",
    a: "As reservas são confirmadas via WhatsApp. O pagamento pode ser feito na chegada em dinheiro, PIX ou cartão. Não cobramos nenhuma taxa antecipada pelo site.",
  },
  {
    q: "Qual é a política de cancelamento?",
    a: "Cancelamentos com mais de 48h de antecedência são gratuitos. Para cancelamentos de última hora, entre em contato pelo WhatsApp — analisamos cada caso individualmente.",
  },
  {
    q: "A pousada fica perto do centro de Romelândia?",
    a: "Sim, estamos no centro de Romelândia SC, a poucos minutos de comércio, restaurantes e das principais vias de acesso à região Oeste Catarinense.",
  },
  {
    q: "Tem Wi-Fi em todos os quartos?",
    a: "Sim. Todos os quartos têm acesso a Wi-Fi de alta velocidade incluído na diária, sem custo adicional.",
  },
]

interface Props {
  items?: typeof FAQS
  limit?: number
}

export default function FAQ({ items = FAQS, limit }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const list = limit ? items.slice(0, limit) : items

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {list.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="reveal" style={{ borderBottom: "1px solid var(--line)" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                  padding: "1.4rem 0", textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.15rem", fontWeight: 500,
                  color: isOpen ? "var(--accent)" : "var(--text)",
                  lineHeight: 1.3, transition: "color 0.2s",
                }}>
                  {item.q}
                </span>
                <span style={{
                  flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
                  border: "1.5px solid", borderColor: isOpen ? "var(--accent)" : "var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isOpen ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "1.1rem", lineHeight: 1,
                  transition: "all 0.2s",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                  +
                </span>
              </button>

              <div style={{
                overflow: "hidden",
                maxHeight: isOpen ? "300px" : "0",
                transition: "max-height 0.35s ease",
              }}>
                <p style={{
                  fontFamily: "Lato, Arial, sans-serif",
                  fontSize: "0.92rem", lineHeight: 1.8,
                  color: "var(--text-muted)",
                  paddingBottom: "1.4rem",
                }}>
                  {item.a}
                </p>
              </div>
            </div>
        )
      })}
    </div>
  )
}
