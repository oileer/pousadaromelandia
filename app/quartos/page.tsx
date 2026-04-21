"use client"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import { WA_URL } from "@/lib/config"

const quartos = [
  {
    id: "q5",
    nome: "Quarto 5",
    capacidade: "Até 4 pessoas",
    desc: "Espaçoso e aconchegante, ideal para famílias. Cama de casal e duas de solteiro, ar-condicionado e todo o conforto que você precisa para descansar bem.",
    foto: "/assets/Quarto5/1.jpeg",
    amenidades: ["Cama Casal", "2 Camas Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 5. Poderia verificar a disponibilidade?",
  },
  {
    id: "q6",
    nome: "Quarto 6",
    capacidade: "Até 4 pessoas",
    desc: "Amplo e bem equipado, com decoração acolhedora e espaço para toda a família. Ótima opção para viagens em grupo ou família.",
    foto: "/assets/Quarto6/1.jpeg",
    amenidades: ["Cama Casal", "2 Camas Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 6. Poderia verificar a disponibilidade?",
  },
  {
    id: "q7",
    nome: "Quarto 7",
    capacidade: "Até 3 pessoas",
    desc: "Confortável e intimista, com decoração cuidada e toda a estrutura para um descanso de qualidade. Ideal para casais ou viajantes a negócios.",
    foto: "/assets/Quarto7/1.jpeg",
    amenidades: ["Cama Casal", "Cama Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 7. Poderia verificar a disponibilidade?",
  },
  {
    id: "q8",
    nome: "Quarto 8",
    capacidade: "Até 2 pessoas",
    desc: "Pensado para casais que valorizam privacidade e tranquilidade. Ambiente acolhedor com tudo que você precisa para uma estadia especial.",
    foto: "/assets/Quarto8/1.jpeg",
    amenidades: ["Cama Casal", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 8. Poderia verificar a disponibilidade?",
  },
  {
    id: "q9",
    nome: "Quarto 9",
    capacidade: "Até 3 pessoas",
    desc: "Espaçoso e confortável, com camas de solteiro para acomodar grupos ou famílias com crianças. Wi-Fi e ar-condicionado incluídos.",
    foto: "/assets/Quarto9/1.jpeg",
    amenidades: ["Cama Casal", "Cama Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 9. Poderia verificar a disponibilidade?",
  },
]

const iconCheck = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const waIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function Quartos() {
  return (
    <>
      <Navbar />

      {/* Page hero */}
      <section style={{ paddingTop: "110px", paddingBottom: "3.5rem", background: "var(--cream-alt)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <span className="section-label">Acomodações</span>
          <h1 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Nossas Acomodações
          </h1>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1rem", color: "var(--text-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
            Todos os quartos com ar-condicionado, TV, Wi-Fi e roupa de cama de qualidade. Cada detalhe pensado para o seu descanso.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Quartos list */}
      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column" as const, gap: "5rem" }}>
          {quartos.map((q, i) => (
            <ScrollReveal key={q.id} delay={0}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
                {/* Photo — alternating sides via order */}
                <div style={{ order: i % 2 === 0 ? 0 : 1 }} className="img-zoom">
                  <div style={{ borderRadius: "8px", overflow: "hidden", height: "360px", position: "relative", boxShadow: "var(--shadow-md)" }}>
                    <Image src={q.foto} alt={q.nome} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "var(--wine)", color: "white", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.3rem 0.85rem", borderRadius: "4px" }}>
                      {q.capacidade}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <h2 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--text)", marginBottom: "1rem", lineHeight: 1.2 }}>
                    {q.nome}
                  </h2>
                  <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                    {q.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem", marginBottom: "2rem" }}>
                    {q.amenidades.map(a => (
                      <span key={a} className="amenity-tag">
                        {iconCheck} {a}
                      </span>
                    ))}
                  </div>
                  <a href={WA_URL(q.waMsg)} target="_blank" rel="noopener noreferrer" className="btn-wine"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    {waIcon} Reservar este quarto
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
