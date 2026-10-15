import type { Metadata } from "next"
import { QUARTOS_SEO } from "@/lib/quartos-seo"
import { NEGOCIO, abs } from "@/lib/seo"

const find = (slug: string) => QUARTOS_SEO.find(q => q.id === slug)

export function generateStaticParams() {
  return QUARTOS_SEO.map(q => ({ slug: q.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const q = find((await params).slug)
  if (!q) return { title: "Quarto não encontrado", robots: { index: false } }
  const title = `${q.nome}: quarto com ar-condicionado em Romelândia SC`
  const description = `${q.nome} da Pousada Romelândia (${q.capacidade.toLowerCase()}). ${q.desc} ${q.amenidades.slice(0, 4).join(", ")}. Reserve pelo WhatsApp.`.slice(0, 300)
  const url = `/quartos/${q.id}`
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title: `${q.nome} | Pousada Romelândia`, description, url, type: "website", locale: "pt_BR", images: [{ url: q.fotos[0], alt: q.nome }] },
  }
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const q = find((await params).slug)
  const ld = q ? [
    {
      "@context": "https://schema.org", "@type": "HotelRoom", name: q.nome, description: q.desc, url: abs(`/quartos/${q.id}`),
      image: q.fotos.map(f => abs(f)),
      occupancy: { "@type": "QuantitativeValue", maxValue: Number(q.capacidade.replace(/\D/g, "")) || undefined },
      amenityFeature: q.amenidades.map(a => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
      containedInPlace: { "@type": "LodgingBusiness", name: NEGOCIO.nome, url: abs("/") },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: abs("/") },
        { "@type": "ListItem", position: 2, name: "Quartos", item: abs("/quartos") },
        { "@type": "ListItem", position: 3, name: q.nome, item: abs(`/quartos/${q.id}`) },
      ],
    },
  ] : []
  return (
    <>
      {ld.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      {children}
    </>
  )
}
