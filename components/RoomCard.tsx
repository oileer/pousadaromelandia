'use client'
"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface RoomCardProps {
  name: string
  slug: string
  imageSrc: string
  capacity: string
  tags: string[]
  waMessage: string
}

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
)

export default function RoomCard({ name, slug, imageSrc, capacity, tags, waMessage }: RoomCardProps) {
  const [hovered, setHovered] = useState(false)
  const waUrl = `https://wa.me/5549984008534?text=${encodeURIComponent(waMessage)}`

  return (
    <article
      className="room-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 2, overflow: "hidden",
        boxShadow: hovered ? "0 16px 48px rgba(31,27,22,.16)" : "0 2px 12px rgba(31,27,22,.07)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "transform .3s ease, box-shadow .3s ease",
      }}
    >
      {/* Image */}
      <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
        <div className="room-img-inner" style={{
          position: "absolute", inset: 0,
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform .5s ease",
        }}>
          <Image src={imageSrc} alt={name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(31,27,22,.48) 0%, transparent 50%)" }} />
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(250,247,242,.92)", backdropFilter: "blur(6px)",
          padding: "4px 10px", borderRadius: 40,
          fontFamily: "var(--font-lato)", fontSize: ".66rem", fontWeight: 700,
          letterSpacing: ".08em", textTransform: "uppercase" as const, color: "#1F1B16",
        }}>
          {capacity}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 16px" }}>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.42rem", fontWeight: 500, color: "#1F1B16", marginBottom: 10, lineHeight: 1.2 }}>
          {name}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "var(--font-lato)", fontSize: ".68rem", fontWeight: 400,
              color: "rgba(31,27,22,.52)", background: "#F0EAE0",
              padding: "3px 10px", borderRadius: 2,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: 10, padding: "14px 24px", borderTop: "1px solid rgba(31,27,22,.07)" }}>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
          flex: 1, background: "#9B1B1B", color: "#FAF7F2",
          fontFamily: "var(--font-lato)", fontSize: ".7rem", fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase" as const,
          padding: "11px 14px", borderRadius: 2, textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "background .2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#7a1414")}
          onMouseLeave={e => (e.currentTarget.style.background = "#9B1B1B")}>
          {WA_ICON} Reservar
        </a>
        <Link href={`/quartos/${slug}`} style={{
          padding: "11px 14px", borderRadius: 2,
          border: "1px solid rgba(31,27,22,.15)",
          fontFamily: "var(--font-lato)", fontSize: ".7rem", fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(31,27,22,.55)",
          textDecoration: "none", transition: "border-color .2s, color .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#1F1B16"; e.currentTarget.style.color = "#1F1B16" }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(31,27,22,.15)"; e.currentTarget.style.color = "rgba(31,27,22,.55)" }}>
          Detalhes
        </Link>
      </div>
    </article>
  )
}
