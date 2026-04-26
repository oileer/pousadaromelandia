'use client'
"use client"
import { useState } from "react"

const faqs = [
  { q: "Quais sÃ£o os horÃ¡rios de check-in e check-out?", a: "Check-in a partir das 14h e check-out atÃ© as 12h. Chegadas fora desse horÃ¡rio podem ser combinadas diretamente pelo WhatsApp." },
  { q: "O cafÃ© da manhÃ£ estÃ¡ incluso?", a: "Sim! O cafÃ© da manhÃ£ estÃ¡ incluso em todas as acomodaÃ§Ãµes, servido diariamente no horÃ¡rio acordado na chegada." },
  { q: "Tem estacionamento gratuito?", a: "Sim, oferecemos estacionamento gratuito para todos os hÃ³spedes, com vagas disponÃ­veis." },
  { q: "Aceitam animais de estimaÃ§Ã£o?", a: "NÃ£o aceitamos animais de estimaÃ§Ã£o nas acomodaÃ§Ãµes. Caso precise de indicaÃ§Ãµes de estabelecimentos pet-friendly na regiÃ£o, podemos ajudar." },
  { q: "Como funciona a reserva e o pagamento?", a: "As reservas sÃ£o confirmadas via WhatsApp. O pagamento pode ser feito na chegada em dinheiro, PIX ou cartÃ£o. NÃ£o cobramos nenhuma taxa antecipada." },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="faq-section-pad" style={{ background: "#F0EAE0", padding: "96px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: "#9B1B1B" }} />
          <span style={{ fontFamily: "var(--font-lato)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "#9B1B1B" }}>FAQ</span>
        </div>
        <h2 className="reveal" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "#1F1B16", lineHeight: 1.15, marginBottom: 40 }}>
          Perguntas <em style={{ fontStyle: "italic" }}>frequentes</em>
        </h2>

        {faqs.map((faq, i) => (
          <div key={i} className="reveal"
            style={{ borderTop: "1px solid rgba(31,27,22,.12)", padding: "20px 0", ...(i === faqs.length - 1 ? { borderBottom: "1px solid rgba(31,27,22,.12)" } : {}) }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" as const }}
            >
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 500, color: "#1F1B16" }}>
                {faq.q}
              </span>
              <span style={{ color: "#9B1B1B", fontSize: "1.25rem", flexShrink: 0, lineHeight: 1, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .3s" }}>
                +
              </span>
            </button>
            <div style={{
              fontFamily: "var(--font-lato)", fontSize: ".9rem", color: "rgba(31,27,22,.65)", lineHeight: 1.7,
              maxHeight: open === i ? 200 : 0, overflow: "hidden",
              paddingTop: open === i ? 12 : 0,
              transition: "max-height .4s ease, padding-top .3s",
            }}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
