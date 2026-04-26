'use client'
"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const images = [
  { src: "/assets/Corredores/2.jpeg", alt: "Corredor da pousada" },
  { src: "/assets/Quarto5/2.jpeg",    alt: "Quarto Conforto" },
  { src: "/assets/Corredores/6.jpeg", alt: "Ãrea comum" },
  { src: "/assets/Quarto6/2.jpeg",    alt: "Quarto Superior" },
  { src: "/assets/Quarto7/2.jpeg",    alt: "Quarto Casal" },
]

function GalleryItem({ src, alt, className, onClick }: { src: string; alt: string; className?: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`gallery-item-hover${className ? " " + className : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} sizes="(max-width: 768px) 50vw, 33vw" />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "rgba(31,27,22,.28)" : "rgba(31,27,22,0)",
        transition: "background .3s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "#fff", fontSize: "1.8rem", opacity: hovered ? 1 : 0, transition: "opacity .3s" }}>âŠ•</span>
      </div>
    </div>
  )
}

export default function GalleryStrip() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="gallery-section-pad" style={{ padding: "0 40px 96px", background: "#FAF7F2" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="gallery-mosaic reveal">
          {images.map((img, i) => (
            <GalleryItem
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={i === 0 ? "gallery-mosaic-first" : undefined}
              onClick={() => setLightbox(img.src)}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", paddingTop: 28 }}>
          <Link href="/galeria" style={{
            fontFamily: "var(--font-lato)", fontSize: ".78rem", fontWeight: 700,
            letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#9B1B1B",
            borderBottom: "1px solid #9B1B1B", paddingBottom: 2, textDecoration: "none",
          }}>
            Ver galeria completa â†’
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(20,16,12,.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn .25s both",
          }}
        >
          <button onClick={() => setLightbox(null)} style={{
            position: "fixed", top: 24, right: 28,
            color: "rgba(250,247,242,.7)", fontSize: "2rem", cursor: "pointer",
            background: "none", border: "none", lineHeight: 1, transition: "color .2s",
          }}>Ã—</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "90vh", position: "relative", minWidth: 300, minHeight: 200 }}>
            <Image src={lightbox} alt="Pousada RomelÃ¢ndia" width={1200} height={800} style={{ objectFit: "contain", maxHeight: "90vh", width: "auto", borderRadius: 2 }} />
          </div>
        </div>
      )}
    </section>
  )
}
