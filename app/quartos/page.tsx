"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { WA_URL } from "@/lib/config"

const quartos = [
  {
    id: "q5",
    nome: "Quarto 5",
    sub: "Espaço e conforto para toda a família",
    capacidade: "Até 4 pessoas",
    camas: "1 casal + 2 solteiro",
    foto: "/assets/Quarto5/1.jpeg",
    amenidades: ["Cama Casal", "2 Solteiros", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 5. Poderia verificar a disponibilidade?",
    destaque: true,
  },
  {
    id: "q6",
    nome: "Quarto 6",
    sub: "Amplidão e decoração acolhedora",
    capacidade: "Até 4 pessoas",
    camas: "1 casal + 2 solteiro",
    foto: "/assets/Quarto6/1.jpeg",
    amenidades: ["Cama Casal", "2 Solteiros", "Frigobar", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 6. Poderia verificar a disponibilidade?",
    destaque: false,
  },
  {
    id: "q7",
    nome: "Quarto 7",
    sub: "Intimidade e requinte para casais",
    capacidade: "Até 3 pessoas",
    camas: "1 casal + 1 solteiro",
    foto: "/assets/Quarto7/1.jpeg",
    amenidades: ["Cama Casal", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 7. Poderia verificar a disponibilidade?",
    destaque: false,
  },
  {
    id: "q8",
    nome: "Quarto 8",
    sub: "Privacidade e tranquilidade a dois",
    capacidade: "Até 2 pessoas",
    camas: "1 cama casal",
    foto: "/assets/Quarto8/1.jpeg",
    amenidades: ["Cama Casal", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 8. Poderia verificar a disponibilidade?",
    destaque: false,
  },
  {
    id: "q9",
    nome: "Quarto 9",
    sub: "Espaço ideal para grupos e famílias",
    capacidade: "Até 3 pessoas",
    camas: "1 casal + 1 solteiro",
    foto: "/assets/Quarto9/1.jpeg",
    amenidades: ["Cama Casal", "Cama Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 9. Poderia verificar a disponibilidade?",
    destaque: false,
  },
]

const ICON_WA = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

function QuartoCard({ q, index }: { q: typeof quartos[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="reveal">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: "white", borderRadius: "6px", overflow: "hidden", boxShadow: hovered ? "0 20px 60px rgba(31,27,22,0.18)" : "0 4px 20px rgba(31,27,22,0.08)", transition: "box-shadow 0.35s ease", display: "flex", flexDirection: "column" }}
      >
        {/* Foto */}
        <Link href={`/quartos/${q.id}`} style={{ display: "block", position: "relative", height: "280px", overflow: "hidden", flexShrink: 0 }}>
          <Image
            src={q.foto}
            alt={q.nome}
            fill
            style={{ objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }}
          />
          {/* Overlay hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: hovered ? "rgba(31,27,22,0.38)" : "rgba(31,27,22,0)",
            transition: "background 0.35s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "white", border: "1.5px solid rgba(255,255,255,0.8)",
              padding: "0.6rem 1.5rem", borderRadius: "2px",
              opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              backdropFilter: "blur(4px)",
            }}>
              Ver quarto
            </span>
          </div>

          {/* Badge capacidade */}
          <div style={{
            position: "absolute", top: "1rem", left: "1rem",
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)",
            borderRadius: "100px", padding: "0.25rem 0.8rem",
            fontFamily: "Lato, Arial, sans-serif", fontSize: "0.68rem",
            fontWeight: 700, letterSpacing: "0.08em", color: "white",
          }}>
            {q.capacidade}
          </div>
        </Link>

        {/* Info */}
        <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Nome + sub */}
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: "var(--text)", lineHeight: 1.15, marginBottom: "0.3rem" }}>
              {q.nome}
            </h2>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              {q.sub}
            </p>
          </div>

          {/* Camas */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--line)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
              <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 12h20M7 8v4"/>
            </svg>
            <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }}>{q.camas}</span>
          </div>

          {/* Amenidades */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem", flex: 1 }}>
            {q.amenidades.map(a => (
              <span key={a} style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", background: "var(--cream)", padding: "0.25rem 0.65rem", borderRadius: "100px", border: "1px solid var(--line)" }}>
                {a}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href={WA_URL(q.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                flex: 1, background: "#25D366", color: "white",
                fontFamily: "Lato, Arial, sans-serif", fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
                padding: "0.7rem 1rem", borderRadius: "3px",
              }}
            >
              {ICON_WA} Reservar
            </a>
            <Link
              href={`/quartos/${q.id}`}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flex: 1, background: "transparent", color: "var(--accent)",
                fontFamily: "Lato, Arial, sans-serif", fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
                padding: "0.7rem 1rem", borderRadius: "3px",
                border: "1.5px solid var(--accent)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "white" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--accent)" }}
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Quartos() {
  return (
    <>

      {/* Hero editorial */}
      <section style={{ paddingTop: "0", background: "var(--cream)" }}>
        {/* Faixa de foto full-width */}
        <div style={{ position: "relative", height: "340px", overflow: "hidden", marginTop: "72px" }}>
          <Image src="/assets/Corredores/1.jpeg" alt="Acomodações Pousada Romelândia" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(31,27,22,0.3) 0%, rgba(31,27,22,0.7) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "white", padding: "0 2rem" }}>
            <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.75rem", display: "block" }}>
              Pousada Romelândia · Romelândia SC
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
              Nossas Acomodações
            </h1>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.95rem", fontWeight: 300, opacity: 0.85, maxWidth: "480px", lineHeight: 1.7, marginTop: "0.75rem" }}>
              9 quartos com ar-condicionado, TV, Wi-Fi e roupa de cama de qualidade — cada detalhe pensado para o seu descanso.
            </p>
          </div>
        </div>

        {/* Barra de resumo */}
        <div style={{ background: "var(--accent)", color: "white", padding: "1rem 2rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            {[
              { label: "Quartos disponíveis", val: "9" },
              { label: "Capacidade máxima", val: "Até 4 pessoas" },
              { label: "Café da manhã", val: "Incluso" },
              { label: "Estacionamento", val: "Gratuito" },
            ].map(item => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500 }}>{item.val}</div>
                <div style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75, marginTop: "0.15rem" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de quartos */}
      <section style={{ background: "var(--cream-alt)", padding: "5rem 0 7rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Intro */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "0.6rem" }}>
              Escolha sua acomodação
            </span>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: "420px", margin: "0 auto", lineHeight: 1.75 }}>
              Todos os quartos com banheiro privativo, roupa de cama e toalhas incluídas.
            </p>
          </div>

          {/* Grid 2 colunas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.75rem" }}>
            {quartos.map((q, i) => (
              <QuartoCard key={q.id} q={q} index={i} />
            ))}
          </div>

          {/* Nota inferior */}
          <div style={{ textAlign: "center", marginTop: "4rem", padding: "2.5rem", background: "white", borderRadius: "6px", border: "1px solid var(--line)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--text)", marginBottom: "0.5rem" }}>
              Dúvidas ou preferências especiais?
            </p>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Entre em contato pelo WhatsApp — respondemos rapidamente e ajudamos a escolher o melhor quarto para você.
            </p>
            <a
              href={WA_URL("Olá! Gostaria de saber mais sobre os quartos da Pousada Romelândia.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wine"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              {ICON_WA} Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  )
}
