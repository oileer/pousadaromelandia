"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import Image from "next/image"
import Link from "next/link"
import { WA_URL } from "@/lib/config"

const stats = [
  { num: "9", label: "Quartos" },
  { num: "4,5★", label: "Google" },
  { num: "60+", label: "Avaliações" },
  { num: "2018", label: "Em atividade desde" },
]

const amenidades = [
  { label: "Wi-Fi gratuito", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg> },
  { label: "Ar-condicionado", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { label: "Estacionamento", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { label: "Atendimento 24h", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: "TV em todos os quartos", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
  { label: "Localização central", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
]

const quartos = [
  { nome: "Quarto Conforto", cap: "Até 4 pessoas", img: "/assets/Quarto5/1.jpeg", tags: ["Cama Casal", "2 Solteiros", "Ar-cond.", "Wi-Fi"], msg: "Olá! Tenho interesse no Quarto Conforto. Pode verificar disponibilidade?" },
  { nome: "Quarto Superior", cap: "Até 4 pessoas", img: "/assets/Quarto6/1.jpeg", tags: ["Cama Casal", "2 Solteiros", "Frigobar", "Wi-Fi"], msg: "Olá! Tenho interesse no Quarto Superior. Pode verificar disponibilidade?" },
  { nome: "Quarto Casal", cap: "Até 3 pessoas", img: "/assets/Quarto7/1.jpeg", tags: ["Cama Casal", "Ar-cond.", "Wi-Fi", "Privativo"], msg: "Olá! Tenho interesse no Quarto Casal. Pode verificar disponibilidade?" },
]

const depoimentos = [
  { texto: "Ótima pousada! Quarto limpo, wi-fi funcionando bem e atendimento excelente. Recomendo para quem precisa ficar em Romelândia.", nome: "Rodrigo M.", local: "Google Reviews" },
  { texto: "Muito aconchegante e bem localizado. O pessoal é super atencioso. Com certeza voltarei!", nome: "Mariana S.", local: "Google Reviews" },
  { texto: "Melhor custo-benefício da região. Limpo, silencioso e com tudo que precisava para uma boa noite de descanso.", nome: "Carlos A.", local: "Google Reviews" },
]

export default function Home() {
  const wa = WA_URL("Olá! Gostaria de fazer uma reserva na Pousada Romelândia.")
  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Background image with zoom */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/assets/Corredores/1.jpeg" alt="Pousada Romelândia" fill priority style={{ objectFit: "cover", objectPosition: "center" }} className="animate-hero-zoom" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)" }} />
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "70px 2rem 100px", position: "relative", zIndex: 1, width: "100%" }}>
          {/* Rating */}
          <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0, marginBottom: "1.75rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "0.4rem 1rem" }}>
              <span style={{ color: "#F5C842", fontSize: "0.85rem" }}>★★★★½</span>
              <span style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>4,5 · 60+ avaliações no Google</span>
            </span>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.22s", opacity: 0 }}>
            <h1 style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 400, lineHeight: 1.08, color: "white", maxWidth: "720px", marginBottom: "1.25rem", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
              Bem-vindo à<br />Pousada Romelândia
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.36s", opacity: 0 }}>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.85)", maxWidth: "480px", marginBottom: "2.5rem" }}>
              Conforto, acolhimento e localização privilegiada no coração de Romelândia SC.
            </p>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.48s", opacity: 0, display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wine">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Reservar Agora
            </a>
            <Link href="/quartos" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "white" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)" }}>
              Ver Quartos
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "flex", justifyContent: "space-around", flexWrap: "wrap" as const }}>
            {stats.map(s => (
              <div key={s.label} style={{ padding: "0.85rem 1rem", textAlign: "center" }}>
                <div className="stat-num" style={{ color: "white", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>{s.num}</div>
                <div style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: "0.15rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────── */}
      <section style={{ background: "var(--white)", padding: "7rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
          <ScrollReveal className="from-left">
            <div style={{ position: "relative" }}>
              <div className="img-zoom" style={{ borderRadius: "10px", height: "460px", overflow: "hidden" }}>
                <Image src="/assets/Corredores/0.jpeg" alt="Entrada Pousada Romelândia" fill style={{ objectFit: "cover" }} />
              </div>
              {/* Badge */}
              <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1rem", background: "var(--wine)", color: "white", borderRadius: "10px", padding: "1.25rem 1.75rem", boxShadow: "0 8px 30px rgba(155,27,27,0.35)" }}>
                <div style={{ fontFamily: "'Playfair Display SC', Georgia, serif", fontSize: "1.8rem", lineHeight: 1 }}>4,5 ★</div>
                <div style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginTop: "0.3rem" }}>Google Reviews</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <span className="section-label">Nossa História</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", marginBottom: "1.5rem" }}>
              Uma pousada que<br />sente como lar
            </h2>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              Desde 2018 no centro de Romelândia SC, oferecemos acomodações confortáveis e atendimento personalizado para viajantes a negócios ou lazer.
            </p>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "2.5rem" }}>
              São 9 quartos cuidadosamente equipados — com ar-condicionado, Wi-Fi de alta velocidade, TV e roupa de cama de qualidade — para que sua estadia seja a mais agradável possível.
            </p>
            <Link href="/quartos" className="btn-wine">Ver Nossas Acomodações</Link>
          </ScrollReveal>
        </div>
      </section>

      <div className="divider" />

      {/* ── COMODIDADES ──────────────────────────── */}
      <section style={{ background: "var(--cream)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span className="section-label" style={{ display: "block", textAlign: "center" }}>Estrutura</span>
              <h2 className="display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--text)" }}>Tudo que você precisa</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {amenidades.map((a, i) => (
              <ScrollReveal key={a.label} delay={i * 70}>
                <div style={{ background: "var(--white)", borderRadius: "10px", padding: "1.75rem 1.25rem", display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.75rem", textAlign: "center" as const, boxShadow: "var(--shadow-sm)", transition: "transform 0.25s, box-shadow 0.25s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--wine-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--wine)" }}>{a.icon}</div>
                  <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{a.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUARTOS ──────────────────────────────── */}
      <section style={{ background: "var(--white)", padding: "7rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <ScrollReveal>
            <div style={{ marginBottom: "3.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: "1rem" }}>
              <div>
                <span className="section-label">Acomodações</span>
                <h2 className="display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--text)" }}>Nossas Acomodações</h2>
              </div>
              <Link href="/quartos" style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--wine)", textDecoration: "none", borderBottom: "2px solid var(--wine)", paddingBottom: "2px" }}>Ver todos →</Link>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {quartos.map((q, i) => (
              <ScrollReveal key={q.nome} delay={i * 120}>
                <div className="card" style={{ cursor: "default" }}>
                  {/* Image */}
                  <div className="img-zoom" style={{ height: "240px", position: "relative" }}>
                    <Image src={q.img} alt={q.nome} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: "100px", padding: "0.25rem 0.75rem", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "white" }}>{q.cap}</div>
                  </div>
                  {/* Info */}
                  <div style={{ padding: "1.5rem" }}>
                    <h3 className="display" style={{ fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.75rem" }}>{q.nome}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.4rem", marginBottom: "1.5rem" }}>
                      {q.tags.map(t => <span key={t} className="amenity-tag">{t}</span>)}
                    </div>
                    <a href={WA_URL(q.msg)} target="_blank" rel="noopener noreferrer" className="btn-wine" style={{ fontSize: "0.75rem", padding: "0.65rem 1.5rem", width: "100%", justifyContent: "center" }}>
                      Consultar Disponibilidade
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA STRIP ────────────────────────── */}
      <section style={{ background: "var(--cream-alt)", padding: "0", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", height: "220px" }}>
          {["/assets/Corredores/2.jpeg", "/assets/Quarto5/2.jpeg", "/assets/Corredores/6.jpeg", "/assets/Quarto6/2.jpeg", "/assets/Quarto7/2.jpeg"].map((src, i) => (
            <div key={i} className="img-zoom" style={{ position: "relative", height: "220px" }}>
              <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────── */}
      <section style={{ background: "var(--wine)", padding: "7rem 0", position: "relative", overflow: "hidden" }}>
        {/* Decorative quote */}
        <div style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: "Georgia, serif", fontSize: "20rem", lineHeight: 1, color: "rgba(255,255,255,0.04)", pointerEvents: "none", userSelect: "none" }}>&ldquo;</div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ display: "block", fontFamily: "Lato, Arial, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "1rem" }}>Depoimentos</span>
              <h2 className="display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "white" }}>O que nossos hóspedes dizem</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {depoimentos.map((d, i) => (
              <ScrollReveal key={d.nome} delay={i * 120}>
                <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "2rem" }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                    {[...Array(5)].map((_,k) => <svg key={k} width="14" height="14" viewBox="0 0 24 24" fill="#F5C842" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                  <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", fontStyle: "italic", marginBottom: "1.5rem" }}>&ldquo;{d.texto}&rdquo;</p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1rem" }}>
                    <p style={{ fontFamily: "Lato, Arial, sans-serif", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{d.nome}</p>
                    <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "0.15rem" }}>{d.local}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────── */}
      <section style={{ background: "var(--cream)", padding: "7rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <ScrollReveal>
            <span className="section-label" style={{ display: "block", textAlign: "center" }}>Reserve agora</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)", marginBottom: "1.25rem" }}>
              Sua próxima estadia<br />começa aqui
            </h2>
            <p style={{ fontFamily: "Lato, Arial, sans-serif", fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 2.5rem" }}>
              Reserve pelo WhatsApp em minutos — sem formulários, sem espera. Atendimento rápido e pessoal.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wine" style={{ fontSize: "0.9rem", padding: "1rem 2.75rem" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Falar no WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
