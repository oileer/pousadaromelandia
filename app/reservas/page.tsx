"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import { WA_URL } from "@/lib/config"

const opcoes = [
  { nome: "Quarto 5", capacidade: "Até 4 pessoas", msg: "Olá! Gostaria de reservar o Quarto 5. Poderia verificar a disponibilidade?" },
  { nome: "Quarto 6", capacidade: "Até 4 pessoas", msg: "Olá! Gostaria de reservar o Quarto 6. Poderia verificar a disponibilidade?" },
  { nome: "Quarto 7", capacidade: "Até 3 pessoas", msg: "Olá! Gostaria de reservar o Quarto 7. Poderia verificar a disponibilidade?" },
  { nome: "Quarto 8", capacidade: "Até 2 pessoas", msg: "Olá! Gostaria de reservar o Quarto 8. Poderia verificar a disponibilidade?" },
  { nome: "Quarto 9", capacidade: "Até 3 pessoas", msg: "Olá! Gostaria de reservar o Quarto 9. Poderia verificar a disponibilidade?" },
]

const waIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Reservas() {
  return (
    <>
      <Navbar />

      <section style={{ paddingTop: "110px", paddingBottom: "3.5rem", background: "var(--cream-alt)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <span className="section-label">Reservas</span>
          <h1 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Reserve seu quarto
          </h1>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
            Sem formulários complicados. Escolha o quarto, clique e fale direto com a gente pelo WhatsApp. Respondemos em minutos.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem", marginBottom: "4rem" }}>
            {opcoes.map((o, i) => (
              <ScrollReveal key={o.nome} delay={i * 60}>
                <a href={WA_URL(o.msg)} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1.5rem 2rem", borderRadius: "8px", background: "white", border: "1px solid rgba(155,27,27,0.1)", textDecoration: "none", transition: "all 0.25s", flexWrap: "wrap" as const, boxShadow: "var(--shadow-sm)", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,27,27,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,27,27,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)" }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--text)", marginBottom: "0.2rem" }}>{o.nome}</p>
                    <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.82rem", color: "var(--text-muted)" }}>{o.capacidade}</p>
                  </div>
                  <span className="btn-wine" style={{ fontSize: "0.78rem", padding: "0.55rem 1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    {waIcon} Reservar
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ background: "var(--wine-soft)", border: "1px solid rgba(155,27,27,0.15)", borderRadius: "8px", padding: "2.5rem", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--text)", marginBottom: "0.75rem" }}>Dúvidas antes de reservar?</h3>
              <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                Fale com a gente antes de decidir. Estamos sempre disponíveis para te ajudar a escolher o quarto certo.
              </p>
              <a href={WA_URL("Olá! Tenho uma dúvida sobre hospedagem na Pousada Romelândia.")} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--wine)", textDecoration: "none", letterSpacing: "0.05em" }}>
                Falar com a equipe →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
