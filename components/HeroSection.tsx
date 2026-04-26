"use client"
import Image from "next/image"
import { useState } from "react"

const WA_BASE = "https://wa.me/5549984008534?text="

export default function HeroSection() {
  const [checkin, setCheckin]   = useState("")
  const [checkout, setCheckout] = useState("")
  const [guests, setGuests]     = useState("1 hóspede")
  const [name, setName]         = useState("")

  const handleReserve = () => {
    const msg = encodeURIComponent(
      `Olá! Gostaria de fazer uma reserva.\nNome: ${name || "—"}\nCheck-in: ${checkin || "—"}\nCheck-out: ${checkout || "—"}\nHóspedes: ${guests}`
    )
    window.open(WA_BASE + msg, "_blank")
  }

  const overlay: React.CSSProperties = {
    position: "absolute", inset: 0, zIndex: 1,
    background: `
      linear-gradient(to top, rgba(20,16,12,.9) 0%, rgba(20,16,12,.45) 36%, transparent 62%),
      linear-gradient(to right, rgba(20,16,12,.28) 0%, transparent 56%)
    `,
  }

  const badge: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(250,247,242,.1)", border: "1px solid rgba(250,247,242,.22)",
    backdropFilter: "blur(8px)", padding: "5px 14px", borderRadius: 40, marginBottom: 20,
  }

  const h1: React.CSSProperties = {
    fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1.08,
    fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", color: "#FAF7F2",
    letterSpacing: "-.01em", margin: "16px 0 18px",
  }

  const sub: React.CSSProperties = {
    fontFamily: "var(--font-lato)", fontSize: ".98rem", fontWeight: 300,
    color: "rgba(250,247,242,.72)", lineHeight: 1.65, maxWidth: 480, marginBottom: 32,
  }

  const label: React.CSSProperties = {
    display: "block", fontFamily: "var(--font-lato)", fontSize: ".66rem", fontWeight: 700,
    letterSpacing: ".1em", textTransform: "uppercase" as const,
    color: "rgba(31,27,22,.45)", marginBottom: 5,
  }

  const input: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    border: "1px solid rgba(31,27,22,.15)", borderRadius: 2,
    fontFamily: "var(--font-lato)", fontSize: ".9rem", color: "#1F1B16",
    background: "#fff", outline: "none", marginBottom: 12, boxSizing: "border-box" as const,
  }

  return (
    <section style={{ position: "relative", height: "100svh", minHeight: 640, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      {/* Background */}
      <div className="hero-bg-anim" style={{ position: "absolute", inset: 0 }}>
        <Image src="/assets/Corredores/1.jpeg" alt="Pousada Romelândia" fill priority style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" />
      </div>

      <div style={overlay} />

      {/* Content */}
      <div className="hero-content-grid">
        {/* Left — text */}
        <div>
          <div className="hero-badge-anim" style={badge}>
            <span style={{ color: "#C8A97A", fontSize: ".88rem", letterSpacing: ".04em" }}>★★★★½</span>
            <span style={{ fontFamily: "var(--font-lato)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.8)" }}>
              4,5 · 60+ avaliações no Google
            </span>
          </div>

          <div className="hero-tag-anim" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="hero-line-anim" style={{ width: 36, height: 1, background: "#C8A97A" }} />
            <span style={{ fontFamily: "var(--font-lato)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#C8A97A" }}>
              Romelândia — Santa Catarina
            </span>
          </div>

          <h1 className="hero-h1-anim" style={h1}>
            Conforto e acolhimento<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#e8d5b0" }}>no coração do<br />Oeste Catarinense</em>
          </h1>

          <p className="hero-sub-anim" style={sub}>
            A melhor hospedagem de Romelândia SC — 9 quartos, café da manhã, Wi-Fi e estacionamento gratuito.
          </p>

          {/* Trust strip */}
          <div className="hero-trust-anim" style={{ display: "flex", gap: 0, alignItems: "center", flexWrap: "wrap" as const }}>
            {([["9", "Quartos"], ["4,5★", "Google"], ["60+", "Avaliações"], ["2018", "Em atividade"]] as [string,string][]).map(([num, lbl], i) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ width: 1, height: 32, background: "rgba(250,247,242,.15)", margin: "0 16px" }} />}
                <div className="stats-band-item" style={{ textAlign: "center" as const, padding: "0 8px" }}>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "#FAF7F2", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "var(--font-lato)", fontSize: ".66rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.45)", marginTop: 3 }}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Booking widget */}
        <div className="hero-widget-anim" style={{ background: "#FAF7F2", padding: "28px 24px", borderRadius: 4, boxShadow: "0 24px 64px rgba(20,16,12,.38)" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 500, color: "#1F1B16", marginBottom: 4 }}>
            Verificar disponibilidade
          </div>
          <div style={{ fontFamily: "var(--font-lato)", fontSize: ".75rem", color: "rgba(31,27,22,.45)", marginBottom: 20 }}>
            Confirmação imediata via WhatsApp
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={label}>Check-in</label>
              <input style={input} type="date" value={checkin} onChange={e => setCheckin(e.target.value)} />
            </div>
            <div>
              <label style={label}>Check-out</label>
              <input style={input} type="date" value={checkout} onChange={e => setCheckout(e.target.value)} />
            </div>
          </div>

          <div>
            <label style={label}>Hóspedes</label>
            <select style={{ ...input, cursor: "pointer" }} value={guests} onChange={e => setGuests(e.target.value)}>
              {["1 hóspede", "2 hóspedes", "3 hóspedes", "4 hóspedes"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label style={label}>Seu nome</label>
            <input style={input} type="text" placeholder="Como devemos te chamar?" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <button onClick={handleReserve}
            style={{
              width: "100%", background: "#9B1B1B", color: "#FAF7F2",
              border: "none", cursor: "pointer",
              fontFamily: "var(--font-lato)", fontSize: ".78rem", fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase" as const,
              padding: "14px", borderRadius: 2,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginTop: 4, transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#7a1414")}
            onMouseLeave={e => (e.currentTarget.style.background = "#9B1B1B")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Reservar pelo WhatsApp
          </button>
          <p style={{ textAlign: "center" as const, marginTop: 10, fontFamily: "var(--font-lato)", fontSize: ".68rem", color: "rgba(31,27,22,.38)" }}>
            Sem cartão de crédito · Cancele grátis
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-anim scroll-pulse hero-scroll-hint" style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, zIndex: 2,
      }}>
        <span style={{ fontFamily: "var(--font-lato)", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.38)" }}>Rolar</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(250,247,242,.38), transparent)" }} />
      </div>
    </section>
  )
}
