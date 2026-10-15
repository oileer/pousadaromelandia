import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Imagem de compartilhamento (WhatsApp, Facebook, Google): 1200x630, marca nova.
export const alt = "Pousada Romelândia — hospedagem em Romelândia SC"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const marca = await readFile(join(process.cwd(), "public", "marca.png"))
  const src = `data:image/png;base64,${marca.toString("base64")}`
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0B1F3A 0%, #102c52 60%, #0B1F3A 100%)", color: "#F4EFE6", fontFamily: "serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={420} height={207} alt="" style={{ filter: "brightness(0) saturate(100%) invert(68%) sepia(40%) saturate(560%) hue-rotate(3deg) brightness(92%)" }} />
        <div style={{ marginTop: 36, fontSize: 76, letterSpacing: 6, fontWeight: 700, display: "flex" }}>POUSADA ROMELÂNDIA</div>
        <div style={{ marginTop: 18, width: 160, height: 3, background: "#C9A24B" }} />
        <div style={{ marginTop: 22, fontSize: 34, color: "#E3CE9A", display: "flex" }}>Natureza, conforto e hospitalidade</div>
        <div style={{ marginTop: 14, fontSize: 26, opacity: 0.8, display: "flex" }}>Quartos com ar-condicionado · Café da manhã · Romelândia SC</div>
      </div>
    ),
    size,
  )
}
