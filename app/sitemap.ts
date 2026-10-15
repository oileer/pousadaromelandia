import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { QUARTOS_SEO } from "@/lib/quartos-seo"

// Datas fixas (não "agora"): o Google só reprocessa quando a página realmente muda. Atualize ao editar o conteúdo.
const ATUALIZADO = new Date("2026-10-15")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: ATUALIZADO, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/quartos`, lastModified: ATUALIZADO, changeFrequency: "monthly", priority: 0.9 },
    ...QUARTOS_SEO.map(q => ({ url: `${SITE_URL}/quartos/${q.id}`, lastModified: ATUALIZADO, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/galeria`, lastModified: ATUALIZADO, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/reservas`, lastModified: ATUALIZADO, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contato`, lastModified: ATUALIZADO, changeFrequency: "yearly", priority: 0.6 },
  ]
}
