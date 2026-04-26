import type { MetadataRoute } from "next"

const BASE = "https://www.pousadaromelandia.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${BASE}/quartos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/galeria`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contato`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/reservas`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]
}
