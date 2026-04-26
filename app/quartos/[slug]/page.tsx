"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { WA_URL } from "@/lib/config"

const QUARTOS = [
  {
    id: "q5",
    nome: "Quarto 5",
    capacidade: "Até 4 pessoas",
    desc: "Espaçoso e aconchegante, ideal para famílias. Cama de casal e duas de solteiro com ar-condicionado e todo o conforto para um descanso de qualidade.",
    fotos: ["/assets/Quarto5/1.jpeg", "/assets/Quarto5/2.jpeg", "/assets/Quarto5/3.jpeg"],
    amenidades: ["Cama Casal", "2 Camas Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 5. Poderia verificar a disponibilidade?",
  },
  {
    id: "q6",
    nome: "Quarto 6",
    capacidade: "Até 4 pessoas",
    desc: "Amplo e bem equipado, com decoração acolhedora e espaço para toda a família. Ótima opção para viagens em grupo.",
    fotos: ["/assets/Quarto6/1.jpeg", "/assets/Quarto6/2.jpeg", "/assets/Quarto6/3.jpeg"],
    amenidades: ["Cama Casal", "2 Camas Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 6. Poderia verificar a disponibilidade?",
  },
  {
    id: "q7",
    nome: "Quarto 7",
    capacidade: "Até 3 pessoas",
    desc: "Confortável e intimista, com decoração cuidada e toda a estrutura para um descanso de qualidade. Ideal para casais ou viajantes a negócios.",
    fotos: ["/assets/Quarto7/1.jpeg", "/assets/Quarto7/2.jpeg", "/assets/Quarto7/3.jpeg"],
    amenidades: ["Cama Casal", "Cama Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 7. Poderia verificar a disponibilidade?",
  },
  {
    id: "q8",
    nome: "Quarto 8",
    capacidade: "Até 2 pessoas",
    desc: "Pensado para casais que valorizam privacidade e tranquilidade. Ambiente acolhedor com tudo que você precisa para uma estadia especial.",
    fotos: ["/assets/Quarto8/1.jpeg"],
    amenidades: ["Cama Casal", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 8. Poderia verificar a disponibilidade?",
  },
  {
    id: "q9",
    nome: "Quarto 9",
    capacidade: "Até 3 pessoas",
    desc: "Espaçoso e confortável, com camas de solteiro para acomodar grupos ou famílias com crianças. Wi-Fi e ar-condicionado incluídos.",
    fotos: ["/assets/Quarto9/1.jpeg", "/assets/Quarto9/2.jpeg"],
    amenidades: ["Cama Casal", "Cama Solteiro", "Ar-condicionado", "Wi-Fi", "TV", "Banheiro Privativo"],
    waMsg: "Olá! Tenho interesse no Quarto 9. Poderia verificar a disponibilidade?",
  },
]

const iconCheck = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const iconWA = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function QuartoPage() {
  const params = useParams()
  const slug = params.slug as string
  const quarto = QUARTOS.find(q => q.id === slug)

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])
  const prev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + (quarto?.fotos.length ?? 1)) % (quarto?.fotos.length ?? 1) : null), [quarto])
  const next = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % (quarto?.fotos.length ?? 1) : null), [quarto])

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIdx, closeLightbox, prev, next])

  if (!quarto) return (
    <>
      <Navbar />
      <div style={{ paddingTop: "140px", textAlign: "center", fontFamily: "Lato, Arial, sans-serif", color: "var(--text-muted)" }}>
        Quarto não encontrado. <Link href="/quartos" style={{ color: "var(--accent)" }}>Ver todos os quartos →</Link>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />

      {/* Hero foto */}
      <div style={{ position: "relative", height: "clamp(300px, 55vh, 540px)", marginTop: "72px", overflow: "hidden" }}>
        <Image
          src={quarto.fotos[0]}
          alt={quarto.nome}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(31,27,22,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#fff" }}>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>
            Pousada Romelândia
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1.1 }}>
            {quarto.nome}
          </h1>
          <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", background: "var(--accent)", padding: "0.25rem 0.9rem", borderRadius: "2px", display: "inline-block", marginTop: "0.75rem" }}>
            {quarto.capacidade}
          </span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: "var(--cream-alt)", borderBottom: "1px solid var(--line)", padding: "0.75rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Início</Link>
          <span>›</span>
          <Link href="/quartos" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Quartos</Link>
          <span>›</span>
          <span style={{ color: "var(--text)" }}>{quarto.nome}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <section style={{ background: "var(--cream)", padding: "4rem 0 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "4rem", alignItems: "start" }}>

          {/* Esquerda: galeria + descrição */}
          <div>
            {/* Galeria */}
            {quarto.fotos.length > 1 && (
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  Galeria de fotos
                </p>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(quarto.fotos.length, 3)}, 1fr)`, gap: "0.75rem" }}>
                  {quarto.fotos.map((foto, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIdx(idx)}
                      style={{ borderRadius: "4px", overflow: "hidden", position: "relative", height: "200px", cursor: "zoom-in", boxShadow: "0 2px 12px rgba(31,27,22,0.12)" }}
                      className="img-zoom"
                    >
                      <Image src={foto} alt={`${quarto.nome} — foto ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s" }} />
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", color: "var(--text-light)", marginTop: "0.5rem" }}>
                  Clique nas fotos para ampliar
                </p>
              </div>
            )}

            {/* Descrição */}
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 500, color: "var(--text)", marginBottom: "1rem" }}>
              Sobre o quarto
            </h2>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "2rem" }}>
              {quarto.desc}
            </p>

            {/* Comodidades */}
            <h3 style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
              O que está incluído
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {quarto.amenidades.map(a => (
                <span key={a} className="amenity-tag">
                  {iconCheck} {a}
                </span>
              ))}
            </div>

            {/* Link voltar */}
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
              <Link href="/quartos" style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.82rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                ← Ver todos os quartos
              </Link>
            </div>
          </div>

          {/* Direita: card de reserva */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ background: "white", borderRadius: "8px", border: "1px solid var(--line)", boxShadow: "0 8px 40px rgba(31,27,22,0.1)", overflow: "hidden" }}>
              <div style={{ background: "var(--accent)", padding: "1.5rem 1.75rem", color: "white" }}>
                <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8, marginBottom: "0.4rem" }}>
                  {quarto.nome}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.2 }}>
                  {quarto.capacidade}
                </p>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Reserve diretamente via WhatsApp. Confirmação rápida, sem cartão de crédito.
                </p>
                <a
                  href={WA_URL(quarto.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: "#25D366",
                    color: "white",
                    padding: "0.9rem 1.5rem",
                    borderRadius: "4px",
                    fontFamily: "Lato, Arial, sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {iconWA} Reservar via WhatsApp
                </a>
                <Link
                  href="/reservas"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "0.75rem",
                    fontFamily: "Lato, Arial, sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Ou use o formulário de reserva →
                </Link>
                <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {["Café da manhã incluso", "Wi-Fi gratuito", "Estacionamento gratuito", "Check-in: 14h · Check-out: 12h"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {iconCheck} {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Outros quartos */}
      <section style={{ background: "var(--cream-alt)", padding: "4rem 0", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Outros quartos disponíveis
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {QUARTOS.filter(q => q.id !== quarto.id).map(q => (
              <Link key={q.id} href={`/quartos/${q.id}`} style={{ textDecoration: "none" }}>
                <div style={{ borderRadius: "6px", overflow: "hidden", boxShadow: "0 2px 12px rgba(31,27,22,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }} className="img-zoom">
                  <div style={{ position: "relative", height: "140px" }}>
                    <Image src={q.fotos[0]} alt={q.nome} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ background: "white", padding: "0.85rem 1rem" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 500, color: "var(--text)", marginBottom: "0.2rem" }}>{q.nome}</p>
                    <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>{q.capacidade}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(10,8,6,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Fechar */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", padding: "0.5rem", opacity: 0.8 }}
          >
            ✕
          </button>

          {/* Contador */}
          <span style={{ position: "absolute", top: "1.75rem", left: "50%", transform: "translateX(-50%)", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
            {lightboxIdx + 1} / {quarto.fotos.length}
          </span>

          {/* Prev */}
          {quarto.fotos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              style={{ position: "absolute", left: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", padding: "0.75rem 1rem", borderRadius: "4px" }}
            >
              ‹
            </button>
          )}

          {/* Imagem */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: "relative", width: "min(90vw, 1000px)", height: "min(80vh, 700px)" }}
          >
            <Image
              src={quarto.fotos[lightboxIdx]}
              alt={`${quarto.nome} — foto ${lightboxIdx + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Next */}
          {quarto.fotos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              style={{ position: "absolute", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", padding: "0.75rem 1rem", borderRadius: "4px" }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
