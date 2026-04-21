import Link from "next/link"
import Image from "next/image"
import { WA_URL, INSTAGRAM, MAPS_URL } from "@/lib/config"

export default function Footer() {
  const wa = WA_URL("Olá! Gostaria de mais informações sobre a Pousada Romelândia.")
  return (
    <footer style={{ background: "#1a1a1a", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Image src="/assets/logo.png" alt="Logo" width={36} height={36} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "1rem", color: "white", letterSpacing: "0.04em" }}>Pousada Romelândia</span>
            </div>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
              Conforto e acolhimento no coração de Romelândia SC desde 2018.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--wine)", marginBottom: "1rem" }}>Navegação</p>
            {[["/","Início"],["/quartos","Quartos"],["/reservas","Reservas"],["/contato","Contato"]].map(([href,label]) => (
              <Link key={href} href={href} style={{ display: "block", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                {label}
              </Link>
            ))}
          </div>

          {/* Contato */}
          <div>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--wine)", marginBottom: "1rem" }}>Contato</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: "0.5rem" }}>+55 49 9840-8534</a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: "0.5rem", lineHeight: 1.6 }}>R. Doze de Outubro, 798<br />Romelândia SC</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>@pousadaromelandia_</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "0.5rem" }}>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} Pousada Romelândia · Todos os direitos reservados</p>
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.2)" }}>Site por <span style={{ color: "rgba(155,27,27,0.6)" }}>Host Pro</span></p>
        </div>
      </div>
    </footer>
  )
}
