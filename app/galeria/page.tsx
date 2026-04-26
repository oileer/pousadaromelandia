"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

type Categoria = "Todos" | "Quartos" | "Áreas Comuns"

interface Foto {
  src: string
  alt: string
  categoria: Categoria
  quarto?: string
}

const FOTOS: Foto[] = [
  // Áreas Comuns
  { src: "/assets/Corredores/0.jpeg",   alt: "Entrada da Pousada",    categoria: "Áreas Comuns" },
  { src: "/assets/Corredores/1.jpeg",   alt: "Corredor principal",    categoria: "Áreas Comuns" },
  { src: "/assets/Corredores/2.jpeg",   alt: "Área de circulação",    categoria: "Áreas Comuns" },
  { src: "/assets/Corredores/6.jpeg",   alt: "Área interna",          categoria: "Áreas Comuns" },
  { src: "/assets/Corredores/6-2.jpeg", alt: "Vista interna",         categoria: "Áreas Comuns" },
  // Quarto 5
  { src: "/assets/Quarto5/1.jpeg", alt: "Quarto 5 — visão geral", categoria: "Quartos", quarto: "Quarto 5" },
  { src: "/assets/Quarto5/2.jpeg", alt: "Quarto 5 — detalhe",     categoria: "Quartos", quarto: "Quarto 5" },
  { src: "/assets/Quarto5/3.jpeg", alt: "Quarto 5 — banheiro",    categoria: "Quartos", quarto: "Quarto 5" },
  // Quarto 6
  { src: "/assets/Quarto6/1.jpeg", alt: "Quarto 6 — visão geral", categoria: "Quartos", quarto: "Quarto 6" },
  { src: "/assets/Quarto6/2.jpeg", alt: "Quarto 6 — detalhe",     categoria: "Quartos", quarto: "Quarto 6" },
  { src: "/assets/Quarto6/3.jpeg", alt: "Quarto 6 — banheiro",    categoria: "Quartos", quarto: "Quarto 6" },
  // Quarto 7
  { src: "/assets/Quarto7/1.jpeg", alt: "Quarto 7 — visão geral", categoria: "Quartos", quarto: "Quarto 7" },
  { src: "/assets/Quarto7/2.jpeg", alt: "Quarto 7 — detalhe",     categoria: "Quartos", quarto: "Quarto 7" },
  { src: "/assets/Quarto7/3.jpeg", alt: "Quarto 7 — banheiro",    categoria: "Quartos", quarto: "Quarto 7" },
  // Quarto 8
  { src: "/assets/Quarto8/1.jpeg", alt: "Quarto 8 — visão geral", categoria: "Quartos", quarto: "Quarto 8" },
  // Quarto 9
  { src: "/assets/Quarto9/1.jpeg", alt: "Quarto 9 — visão geral", categoria: "Quartos", quarto: "Quarto 9" },
  { src: "/assets/Quarto9/2.jpeg", alt: "Quarto 9 — detalhe",     categoria: "Quartos", quarto: "Quarto 9" },
]

const CATEGORIAS: Categoria[] = ["Todos", "Quartos", "Áreas Comuns"]

export default function Galeria() {
  const [filtro, setFiltro] = useState<Categoria>("Todos")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const fotos = filtro === "Todos" ? FOTOS : FOTOS.filter(f => f.categoria === filtro)

  const close = useCallback(() => setLightbox(null), [])
  const prev  = useCallback(() => setLightbox(i => i !== null ? (i - 1 + fotos.length) % fotos.length : null), [fotos.length])
  const next  = useCallback(() => setLightbox(i => i !== null ? (i + 1) % fotos.length : null), [fotos.length])

  useEffect(() => {
    if (lightbox === null) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close()
      if (e.key === "ArrowLeft")   prev()
      if (e.key === "ArrowRight")  next()
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [lightbox, close, prev, next])

  // Travar scroll do body quando lightbox aberto
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightbox])

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: "110px", paddingBottom: "3rem", background: "var(--cream-alt)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Início</Link>
            <span>›</span>
            <span style={{ color: "var(--text)" }}>Galeria</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "0.5rem" }}>
                Pousada Romelândia
              </span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, color: "var(--text)", lineHeight: 1.1 }}>
                Galeria de Fotos
              </h1>
              <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                {FOTOS.length} fotos · Quartos e áreas comuns
              </p>
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {CATEGORIAS.map(c => (
                <button
                  key={c}
                  onClick={() => setFiltro(c)}
                  style={{
                    fontFamily: "Lato, Arial, sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.55rem 1.25rem",
                    borderRadius: "2px",
                    border: "1.5px solid",
                    cursor: "pointer",
                    transition: "all 0.18s",
                    background: filtro === c ? "var(--accent)" : "transparent",
                    borderColor: filtro === c ? "var(--accent)" : "var(--line)",
                    color: filtro === c ? "white" : "var(--text-muted)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid masonry-style */}
      <section style={{ background: "var(--cream)", padding: "3rem 0 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>

          {/* Contador */}
          <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            {fotos.length} {fotos.length === 1 ? "foto" : "fotos"}{filtro !== "Todos" ? ` em ${filtro}` : ""}
          </p>

          {/* Grid */}
          <div style={{
            columns: "3 320px",
            columnGap: "1rem",
            lineHeight: 0,
          }}>
            {fotos.map((foto, idx) => (
              <div
                key={foto.src}
                onClick={() => setLightbox(idx)}
                style={{
                  display: "inline-block",
                  width: "100%",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "zoom-in",
                  position: "relative",
                  lineHeight: 0,
                  boxShadow: "0 2px 12px rgba(31,27,22,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(31,27,22,0.2)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(31,27,22,0.1)"
                }}
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                />
                {/* Hover overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(31,27,22,0)",
                  transition: "background 0.2s",
                  display: "flex", alignItems: "flex-end",
                  padding: "1rem",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(31,27,22,0.4)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(31,27,22,0)"}
                >
                  {foto.quarto && (
                    <span style={{
                      fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      background: "var(--accent)", color: "white",
                      padding: "0.2rem 0.65rem", borderRadius: "2px",
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                      className="foto-label"
                    >
                      {foto.quarto}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA quartos */}
          <div style={{ textAlign: "center", marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid var(--line)" }}>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Gostou? Conheça as acomodações disponíveis.
            </p>
            <Link href="/quartos" className="btn-wine" style={{ display: "inline-block" }}>
              Ver todos os quartos →
            </Link>
          </div>
        </div>
      </section>



      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(8,6,4,0.96)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Fechar */}
          <button
            onClick={close}
            style={{ position: "absolute", top: "1.25rem", right: "1.5rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "1rem", cursor: "pointer", padding: "0.5rem 0.85rem", borderRadius: "4px", fontFamily: "Lato, Arial, sans-serif", letterSpacing: "0.08em" }}
          >
            ESC ✕
          </button>

          {/* Info topo */}
          <div style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
              {lightbox + 1} / {fotos.length}
            </p>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", marginTop: "0.2rem" }}>
              {fotos[lightbox].alt}
            </p>
          </div>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{ position: "absolute", left: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "2rem", cursor: "pointer", padding: "0.5rem 0.9rem", borderRadius: "4px", lineHeight: 1 }}
          >
            ‹
          </button>

          {/* Imagem */}
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "min(92vw, 1100px)", maxHeight: "82vh" }}>
            <Image
              src={fotos[lightbox].src}
              alt={fotos[lightbox].alt}
              width={1100}
              height={800}
              style={{ maxWidth: "min(92vw, 1100px)", maxHeight: "82vh", width: "auto", height: "auto", objectFit: "contain", borderRadius: "4px" }}
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{ position: "absolute", right: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "2rem", cursor: "pointer", padding: "0.5rem 0.9rem", borderRadius: "4px", lineHeight: 1 }}
          >
            ›
          </button>

          {/* Miniaturas */}
          <div style={{ position: "absolute", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.4rem", maxWidth: "90vw", overflowX: "auto", padding: "0.25rem" }}>
            {fotos.map((f, i) => (
              <div
                key={f.src}
                onClick={e => { e.stopPropagation(); setLightbox(i) }}
                style={{
                  width: "52px", height: "38px", borderRadius: "3px", overflow: "hidden", position: "relative", flexShrink: 0,
                  cursor: "pointer", opacity: i === lightbox ? 1 : 0.4,
                  border: i === lightbox ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "opacity 0.15s",
                }}
              >
                <Image src={f.src} alt="" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
