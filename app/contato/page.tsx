"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import { WA_URL, INSTAGRAM, MAPS_URL } from "@/lib/config"

const infos = [
  {
    label: "WhatsApp",
    value: "+55 49 9840-8534",
    href: WA_URL("Olá! Gostaria de mais informações sobre a Pousada Romelândia."),
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Endereço",
    value: "R. Doze de Outubro, 798\nRomelândia SC",
    href: MAPS_URL,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@pousadaromelandia_",
    href: INSTAGRAM,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "Atendimento",
    value: "Todos os dias\n24 horas",
    href: undefined,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

export default function Contato() {
  return (
    <>
      <Navbar />

      <section style={{ paddingTop: "110px", paddingBottom: "3.5rem", background: "var(--cream-alt)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <span className="section-label">Contato</span>
          <h1 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Fale Conosco
          </h1>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
            Estamos sempre disponíveis para atendê-lo. Fale pelo WhatsApp ou nos encontre no centro de Romelândia.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
            {infos.map((info, i) => (
              <ScrollReveal key={info.label} delay={i * 80}>
                {info.href ? (
                  <a href={info.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", flexDirection: "column" as const, gap: "1rem", padding: "1.75rem", borderRadius: "8px", background: "white", border: "1px solid rgba(155,27,27,0.1)", textDecoration: "none", transition: "all 0.25s", boxShadow: "var(--shadow-sm)", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,27,27,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,27,27,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)" }}>
                    <div style={{ color: "var(--wine)" }}>{info.icon}</div>
                    <div>
                      <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "0.35rem" }}>{info.label}</p>
                      <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-line" as const }}>{info.value}</p>
                    </div>
                  </a>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem", padding: "1.75rem", borderRadius: "8px", background: "white", border: "1px solid rgba(155,27,27,0.1)", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ color: "var(--wine)" }}>{info.icon}</div>
                    <div>
                      <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-muted)", marginBottom: "0.35rem" }}>{info.label}</p>
                      <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-line" as const }}>{info.value}</p>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>

          {/* Map */}
          <ScrollReveal>
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(155,27,27,0.12)", boxShadow: "var(--shadow-sm)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.5!2d-53.355!3d-26.698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUi4gRG96ZSBkZSBPdXR1YnJvLCA3OTgsIFJvbWVsw6JuZGlhIFND!5e0!3m2!1spt!2sbr!4v1"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Pousada Romelândia"
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", fontWeight: 700, color: "var(--wine)", textDecoration: "none", letterSpacing: "0.05em" }}>
                Abrir no Google Maps →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
