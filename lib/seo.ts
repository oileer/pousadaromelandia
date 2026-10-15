import { INSTAGRAM, MAPS_URL } from "@/lib/config"

// Endereço público do site. Quando o domínio próprio (pousadaromelandia.com.br) for registrado e apontado,
// basta definir NEXT_PUBLIC_SITE_URL no servidor e refazer o build: canonical, sitemap e schema acompanham.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pousadaromelandia.nexoraos.io").replace(/\/$/, "")

export const NEGOCIO = {
  nome: "Hotel Pousada Romelândia",
  telefone: "+55 49 98400-8534",
  email: "pousadaromelandia@gmail.com",
  endereco: { rua: "R. Doze de Outubro, 798", cidade: "Romelândia", uf: "SC", cep: "89890-000", pais: "BR" },
  geo: { lat: -26.6956, lng: -53.5342 },
  instagram: INSTAGRAM,
  mapa: MAPS_URL,
}

export const abs = (path = "") => SITE_URL + (path.startsWith("/") ? path : "/" + path)
