"use client"
import { useState } from "react"

type Step = "form" | "loading" | "success" | "error"

const ICON_CALENDAR = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const ICON_USER = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const ICON_PHONE = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.32 6.32l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
  </svg>
)
const ICON_WA = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function BookingWidget() {
  const [step, setStep] = useState<Step>("form")
  const [waLink, setWaLink] = useState("")

  const today    = new Date().toISOString().split("T")[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStep("loading")
    const fd = new FormData(e.currentTarget)
    try {
      const res  = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: fd.get("guestName"),
          phone:     fd.get("phone"),
          checkin:   fd.get("checkin"),
          checkout:  fd.get("checkout"),
          people:    fd.get("people"),
          notes:     fd.get("notes") || "",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setWaLink(data.waLink)
      setStep("success")
      setTimeout(() => window.open(data.waLink, "_blank"), 1400)
    } catch {
      setStep("error")
    }
  }

  /* ── Sucesso ── */
  if (step === "success") return (
    <div style={widgetWrap}>
      <div style={{ textAlign: "center", padding: "1.5rem 2rem" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "#fff", fontSize: "1.4rem" }}>✓</div>
        <p style={{ ...serif, fontSize: "1.5rem", fontWeight: 500, color: "var(--text)", marginBottom: "0.5rem" }}>Solicitação recebida!</p>
        <p style={{ ...sans, fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Abrindo WhatsApp para confirmação...</p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#25D366", color: "#fff", padding: "0.8rem 2rem", borderRadius: "4px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>
          {ICON_WA} Abrir WhatsApp
        </a>
      </div>
    </div>
  )

  /* ── Erro ── */
  if (step === "error") return (
    <div style={widgetWrap}>
      <div style={{ textAlign: "center", padding: "1.5rem 2rem" }}>
        <p style={{ ...sans, color: "var(--text-muted)", marginBottom: "1rem" }}>Algo deu errado. Tente novamente ou entre pelo WhatsApp.</p>
        <button onClick={() => setStep("form")} style={btnPrimary}>Tentar novamente</button>
      </div>
    </div>
  )

  /* ── Formulário ── */
  return (
    <div style={widgetWrap}>
      {/* Header do widget */}
      <div style={{ padding: "1.25rem 2rem 0", borderBottom: "1px solid var(--line)", marginBottom: "1.5rem", paddingBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ ...sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--text-muted)" }}>
          Verificar disponibilidade
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          <span style={{ ...sans, fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>Reserva instantânea</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "0 2rem 1.75rem" }}>
        {/* Linha 1: campos principais */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1px", background: "var(--line)", borderRadius: "6px", overflow: "hidden", marginBottom: "1rem" }}>
          {/* Check-in */}
          <div style={fieldWrap}>
            <label style={labelStyle}>
              <span style={{ color: "var(--accent)", marginRight: "6px" }}>{ICON_CALENDAR}</span>
              Check-in
            </label>
            <input name="checkin" type="date" required min={today} defaultValue={today} style={inputStyle} />
          </div>
          {/* Check-out */}
          <div style={fieldWrap}>
            <label style={labelStyle}>
              <span style={{ color: "var(--accent)", marginRight: "6px" }}>{ICON_CALENDAR}</span>
              Check-out
            </label>
            <input name="checkout" type="date" required min={tomorrow} defaultValue={tomorrow} style={inputStyle} />
          </div>
          {/* Hóspedes */}
          <div style={fieldWrap}>
            <label style={labelStyle}>
              <span style={{ color: "var(--accent)", marginRight: "6px" }}>{ICON_USER}</span>
              Hóspedes
            </label>
            <select name="people" style={inputStyle}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? "hóspede" : "hóspedes"}</option>)}
            </select>
          </div>
          {/* Telefone */}
          <div style={fieldWrap}>
            <label style={labelStyle}>
              <span style={{ color: "var(--accent)", marginRight: "6px" }}>{ICON_PHONE}</span>
              WhatsApp
            </label>
            <input name="phone" type="tel" required placeholder="(49) 9 9999-9999" style={inputStyle} />
          </div>
        </div>

        {/* Linha 2: nome + observações + botão */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr auto", gap: "0.75rem", alignItems: "end" }}>
          <div>
            <label style={{ ...labelStyle, marginLeft: 0 }}>Seu nome</label>
            <input name="guestName" required placeholder="Nome completo" style={{ ...inputStyle, background: "var(--cream-alt)", borderRadius: "4px", border: "1px solid var(--line)", padding: "0.65rem 0.85rem" }} />
          </div>
          <div>
            <label style={{ ...labelStyle, marginLeft: 0 }}>Observações <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span></label>
            <input name="notes" placeholder="Ex: chegamos tarde, preciso de berço..." style={{ ...inputStyle, background: "var(--cream-alt)", borderRadius: "4px", border: "1px solid var(--line)", padding: "0.65rem 0.85rem" }} />
          </div>
          <button type="submit" disabled={step === "loading"} style={{ ...btnPrimary, whiteSpace: "nowrap" as const, paddingLeft: "2rem", paddingRight: "2rem" }}>
            {step === "loading" ? "Enviando..." : "Reservar →"}
          </button>
        </div>

        <p style={{ ...sans, fontSize: "0.7rem", color: "var(--text-light)", marginTop: "0.85rem", textAlign: "center" as const }}>
          Sem cartão de crédito · Confirmação via WhatsApp · Cancele grátis
        </p>
      </form>
    </div>
  )
}

/* ── Estilos compartilhados ── */
const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const sans:  React.CSSProperties = { fontFamily: "Lato, Arial, sans-serif" }

const widgetWrap: React.CSSProperties = {
  background: "rgba(250,247,242,0.97)",
  backdropFilter: "blur(16px)",
  borderRadius: "8px",
  boxShadow: "0 24px 80px rgba(31,27,22,0.25), 0 4px 16px rgba(31,27,22,0.1)",
  width: "100%",
  border: "1px solid rgba(229,222,209,0.6)",
}

const fieldWrap: React.CSSProperties = {
  background: "white",
  padding: "0.85rem 1.1rem 0.75rem",
}

const labelStyle: React.CSSProperties = {
  ...{ fontFamily: "Lato, Arial, sans-serif" },
  display: "flex",
  alignItems: "center",
  fontSize: "0.62rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "0.4rem",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "0.9rem",
  fontFamily: "Lato, Arial, sans-serif",
  color: "var(--text)",
  padding: "0",
  cursor: "pointer",
}

const btnPrimary: React.CSSProperties = {
  background: "var(--accent)",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "0.8rem 1.5rem",
  fontSize: "0.82rem",
  fontFamily: "Lato, Arial, sans-serif",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "background 0.2s",
}
