"use client"
import { useEffect, useRef } from "react"

// Efeitos leves do site: barra de progresso, contagem dos números, brilho que segue o mouse,
// botões "magnéticos" e leve parallax da imagem do topo. Com "reduzir movimento" nada disso roda.
export default function SiteFx() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const h = document.documentElement.scrollHeight - window.innerHeight
        if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`
        if (!reduce) document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(el => {
          if (window.scrollY < window.innerHeight * 1.2) el.style.transform = `translate3d(0, ${window.scrollY * 0.16}px, 0)`
        })
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    // contagem dos números (data-count="60" data-suffix="+")
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"))
    let io: IntersectionObserver | null = null
    if (!reduce && counters.length && "IntersectionObserver" in window) {
      io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          io?.unobserve(el)
          const to = Number(el.dataset.count), suffix = el.dataset.suffix ?? ""
          const t0 = performance.now(), dur = 1400
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.round(to * eased) + suffix
            if (p < 1) requestAnimationFrame(tick)
          }
          el.textContent = "0" + suffix
          requestAnimationFrame(tick)
        }
      }, { threshold: 0.4 })
      counters.forEach(c => io!.observe(c))
    }

    // brilho que segue o mouse + botões magnéticos (só com mouse)
    const move = (ev: PointerEvent) => {
      const t = ev.target as HTMLElement
      const card = t.closest<HTMLElement>(".fx-card")
      if (card) {
        const r = card.getBoundingClientRect()
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`)
        card.style.setProperty("--my", `${ev.clientY - r.top}px`)
      }
      const mag = t.closest<HTMLElement>(".fx-magnetic")
      if (mag) {
        const r = mag.getBoundingClientRect()
        mag.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.06}px, ${(ev.clientY - r.top - r.height / 2) * 0.18}px)`
      }
    }
    const leave = (ev: PointerEvent) => {
      const mag = (ev.target as HTMLElement).closest<HTMLElement>(".fx-magnetic")
      if (mag) mag.style.transform = ""
    }
    if (!reduce && fine) {
      document.addEventListener("pointermove", move, { passive: true })
      document.addEventListener("pointerout", leave, { passive: true })
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("pointermove", move)
      document.removeEventListener("pointerout", leave)
      io?.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={bar} className="fx-progress" aria-hidden="true" />
}
