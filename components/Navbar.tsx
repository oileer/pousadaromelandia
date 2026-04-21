"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { WA_URL } from "@/lib/config"

const links = [
  { href: "/", label: "Início" },
  { href: "/quartos", label: "Quartos" },
  { href: "/reservas", label: "Reservas" },
  { href: "/contato", label: "Contato" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const wa = WA_URL("Olá! Gostaria de verificar disponibilidade e fazer uma reserva.")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const isHome = path === "/"

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || !isHome ? "rgba(247,243,238,0.95)" : "transparent",
        backdropFilter: scrolled || !isHome ? "blur(14px)" : "none",
        borderBottom: scrolled || !isHome ? "1px solid rgba(155,27,27,0.1)" : "1px solid transparent",
        transition: "all 0.4s ease",
        boxShadow: scrolled || !isHome ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image src="/assets/logo.png" alt="Pousada Romelândia" width={38} height={38} style={{ objectFit: "contain" }} />
            <span style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "1.05rem", fontWeight: 400, color: scrolled || !isHome ? "var(--text)" : "white", letterSpacing: "0.04em", transition: "color 0.3s", lineHeight: 1.2 }}>
              Pousada<br /><span style={{ color: "var(--wine)", fontSize: "0.8rem" }}>Romelândia</span>
            </span>
          </Link>

          {/* Links desktop */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="nav-desktop">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "Lato, Arial, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                color: path === l.href ? "var(--wine)" : (scrolled || !isHome ? "var(--text)" : "rgba(255,255,255,0.9)"),
                transition: "color 0.2s",
                borderBottom: path === l.href ? "2px solid var(--wine)" : "2px solid transparent",
                paddingBottom: "2px",
              }}>{l.label}</Link>
            ))}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wine" style={{ fontSize: "0.75rem", padding: "0.65rem 1.5rem" }}>
              Reservar
            </a>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="hamburger-btn" style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "none", flexDirection: "column" as const, gap: "5px" }}>
            {[0,1,2].map(i => <span key={i} style={{ display: "block", width: "24px", height: "2px", background: scrolled || !isHome ? "var(--text)" : "white", transition: "background 0.3s" }} />)}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(247,243,238,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "2.5rem" }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "var(--text-muted)" }}>✕</button>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "2.2rem", fontWeight: 400, color: path === l.href ? "var(--wine)" : "var(--text)", textDecoration: "none", letterSpacing: "0.04em" }}>
              {l.label}
            </Link>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-wine">
            Reservar Agora
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
