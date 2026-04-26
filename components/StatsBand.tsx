'use client'
const stats = [
  { num: "9",    label: "Quartos" },
  { num: "4,5â˜…", label: "Google Reviews" },
  { num: "60+",  label: "AvaliaÃ§Ãµes" },
  { num: "2018", label: "Em atividade desde" },
]

export default function StatsBand() {
  return (
    <div className="stats-band">
      {stats.map((s, i) => (
        <div key={s.label} className="stats-band-item" style={{
          flex: 1, maxWidth: 220, textAlign: "center" as const, padding: "0 24px",
          borderLeft: i > 0 ? "1px solid rgba(250,247,242,.12)" : "none",
        }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.6rem", fontWeight: 300, color: "#FAF7F2", lineHeight: 1 }}>
            {s.num}
          </div>
          <div style={{ fontFamily: "var(--font-lato)", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.4)", marginTop: 6 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
