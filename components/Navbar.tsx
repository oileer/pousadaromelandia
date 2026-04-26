"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

const WA_URL = "https://wa.me/5549984008534?text=Ol%C3%A1!%20Gostaria%20de%20verificar%20disponibilidade%20e%20fazer%20uma%20reserva."

const links = [
  ["Início", "/"],
  ["Quartos", "/quartos"],
  ["Galeria", "/galeria"],
  ["Reservas", "/reservas"],
  ["Contato", "/contato"],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 40px", height: "72px",
    background: scrolled ? "rgba(250,247,242,.97)" : "rgba(250,247,242,.9)",
    backdropFilter: "blur(14px)",
    borderBottom: scrolled ? "1px solid rgba(31,27,22,.1)" : "1px solid rgba(31,27,22,.06)",
    transition: "background .3s, border-color .3s, box-shadow .3s",
    boxShadow: scrolled ? "0 2px 20px rgba(31,27,22,.08)" : "none",
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-lato)", fontSize: ".78rem", fontWeight: 700,
    letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#1F1B16",
    opacity: .65, textDecoration: "none", transition: "opacity .2s",
  }

  return (
    <>
      <nav style={navStyle}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/assets/logo.png" alt="Pousada Romelândia" width={36} height={36} style={{ objectFit: "contain" }} />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 500, color: "#1F1B16", letterSpacing: ".03em" }}>
            Pousada <span style={{ color: "#9B1B1B" }}>Romelândia</span>
          </span>
        </Link>

        <ul className="nav-links-desktop" style={{ gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = ".65")}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="nav-cta-desktop"
          style={{
            background: "#9B1B1B", color: "#FAF7F2",
            fontFamily: "var(--font-lato)", fontSize: ".72rem", fontWeight: 700,
            letterSpacing: ".1em", textTransform: "uppercase" as const,
            padding: "10px 22px", borderRadius: "2px", textDecoration: "none",
            transition: "background .2s", alignItems: "center",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#7a1414")}
          onMouseLeave={e => (e.currentTarget.style.background = "#9B1B1B")}>
          Reservar
        </Link>

        <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
            </svg>
          )}
        </button>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-lato)", fontSize: ".9rem", fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase" as const,
              color: "#1F1B16", textDecoration: "none",
              padding: "14px 0", borderBottom: "1px solid rgba(31,27,22,.07)",
            }}>
            {label}
          </Link>
        ))}
        <Link href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
          style={{
            display: "block", marginTop: 12,
            background: "#9B1B1B", color: "#FAF7F2",
            fontFamily: "var(--font-lato)", fontSize: ".78rem", fontWeight: 700,
            letterSpacing: ".1em", textTransform: "uppercase" as const,
            padding: "14px", borderRadius: "2px", textDecoration: "none",
            textAlign: "center" as const,
          }}>
          Reservar via WhatsApp
        </Link>
      </div>
    </>
  )
}
