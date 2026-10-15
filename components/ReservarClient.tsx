"use client"
import { useEffect, useMemo, useState } from "react"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth"
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { TOTAL_ROOMS, WA_URL } from "@/lib/config"
import InstallPrompt from "@/components/InstallPrompt"

type Status = "pendente" | "confirmada" | "hospedada" | "concluida" | "cancelada"
interface Mine {
  id: string; startDate: string; endDate: string; people: number; roomNumber: number | null
  status: Status; value?: number; createdAt?: { seconds: number }
}
interface Profile { name: string; phone: string; document?: string; city?: string }

const serif: React.CSSProperties = { fontFamily: "var(--font-cormorant), Georgia, serif" }
const sans: React.CSSProperties = { fontFamily: "Lato, Arial, sans-serif" }
const card: React.CSSProperties = { background: "#fff", border: "1px solid var(--line)", borderRadius: 8, padding: "1.5rem", boxShadow: "var(--shadow-sm)" }
const label: React.CSSProperties = { ...sans, display: "block", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".35rem" }
const input: React.CSSProperties = { ...sans, width: "100%", padding: ".7rem .85rem", background: "var(--cream-alt)", border: "1px solid var(--line)", borderRadius: 4, fontSize: ".95rem", color: "var(--text)" }
const btn: React.CSSProperties = { ...sans, background: "var(--accent)", color: "#fff", border: 0, borderRadius: 4, padding: ".85rem 1.6rem", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", cursor: "pointer" }

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
const maskCpf = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11)
  return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
}
const errText = (e: unknown, fallback: string) => {
  const code = (e as { code?: string })?.code ?? ""
  if (code.includes("permission-denied")) return "Sem permissão para salvar. Avise a pousada pelo WhatsApp (o cadastro ainda está sendo configurado)."
  if (code.includes("unavailable") || code.includes("network")) return "Sem conexão. Verifique a internet e tente de novo."
  return fallback
}
const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR")
const STATUS_TXT: Record<Status, { t: string; c: string; d: string }> = {
  pendente: { t: "Aguardando confirmação", c: "#8a6a00", d: "Recebemos seu pedido. Assim que confirmarmos a disponibilidade você é avisado aqui e no WhatsApp." },
  confirmada: { t: "Reserva confirmada", c: "#1f7a3d", d: "Tudo certo! Sua reserva está confirmada. Check-in a partir das 14h, check-out até 12h." },
  hospedada: { t: "Hospedagem em andamento", c: "#1b5fa8", d: "Boa estadia!" },
  concluida: { t: "Estadia concluída", c: "#566178", d: "Obrigado por se hospedar com a gente. Volte sempre!" },
  cancelada: { t: "Não foi possível confirmar", c: "#0B1F3A", d: "Infelizmente não conseguimos atender esse pedido. Fale com a gente pelo WhatsApp para outras datas." },
}

export default function ReservarClient() {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined)
  const [mine, setMine] = useState<Mine[]>([])
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), [])

  useEffect(() => {
    if (!user) { setProfile(undefined); setMine([]); return }
    getDoc(doc(db, "guests", user.uid)).then(s => setProfile(s.exists() ? (s.data() as Profile) : null)).catch(() => setProfile(null))
    return onSnapshot(query(collection(db, "reservations"), where("uid", "==", user.uid)), snap => {
      const list = snap.docs.map(d => ({ ...(d.data() as Mine), id: d.id }))
      list.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
      setMine(list)
    }, () => {})
  }, [user])

  async function login() {
    setErr("")
    try { await signInWithPopup(auth, new GoogleAuthProvider()) }
    catch (e) {
      console.error("login google:", e)
      const code = (e as { code?: string })?.code ?? ""
      setErr(/popup-closed|cancelled-popup/.test(code) ? "" : code.includes("popup-blocked") ? "O navegador bloqueou a janela do Google. Libere pop-ups para este site e tente de novo." : "Não foi possível entrar com o Google. Tente de novo ou fale pelo WhatsApp.")
    }
  }

  async function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return
    const fd = new FormData(e.currentTarget)
    const p: Profile = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      document: String(fd.get("document") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
    }
    if (p.name.length < 2 || p.phone.replace(/\D/g, "").length < 10) { setErr("Confira o nome e o WhatsApp com DDD."); return }
    if (p.document && p.document.replace(/\D/g, "").length !== 11) { setErr("O CPF precisa ter 11 números (ou deixe em branco)."); return }
    setBusy(true); setErr("")
    try { await setDoc(doc(db, "guests", user.uid), { ...p, email: user.email ?? "", updatedAt: serverTimestamp() }); setProfile(p); setShowForm(true) }
    catch (e) { console.error("salvar perfil:", e); setErr(errText(e, "Não foi possível salvar. Tente novamente.")) }
    setBusy(false)
  }

  async function submitStay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user || !profile) return
    const fd = new FormData(e.currentTarget)
    const checkin = String(fd.get("checkin")), checkout = String(fd.get("checkout"))
    const people = Number(fd.get("people")), pref = fd.get("room") ? Number(fd.get("room")) : null
    const today = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" })
    const nights = Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86400000)
    if (checkin < today) return setErr("O check-in não pode ser no passado.")
    if (!(nights >= 1)) return setErr("O check-out precisa ser depois do check-in.")
    if (nights > 60) return setErr("Para estadias longas, fale direto pelo WhatsApp.")
    setBusy(true); setErr("")
    try {
      const snap = await getDocs(query(collection(db, "roomDays"), where("date", ">=", checkin), where("date", "<", checkout)))
      const byNight = new Map<string, Set<number>>()
      snap.forEach(d => { const { date, room } = d.data() as { date: string; room: number }; (byNight.get(date) ?? byNight.set(date, new Set()).get(date)!).add(room) })
      const full = [...byNight.values()].some(s => s.size >= TOTAL_ROOMS)
      if (full) { setErr("Não temos quartos livres nessas datas. Tente outras datas ou fale pelo WhatsApp."); setBusy(false); return }
      if (pref && [...byNight.values()].some(s => s.has(pref))) { setErr("Esse quarto já está ocupado nessas datas. Escolha outro ou deixe sem preferência."); setBusy(false); return }
      await addDoc(collection(db, "reservations"), {
        uid: user.uid, email: user.email ?? "", guestName: profile.name, phone: profile.phone,
        ...(profile.document ? { document: profile.document } : {}), ...(profile.city ? { city: profile.city } : {}),
        startDate: checkin, endDate: checkout, people, roomNumber: pref, value: 0,
        arrivalTime: String(fd.get("arrival") ?? "").slice(0, 5),
        ...(String(fd.get("plate") ?? "").trim() ? { vehiclePlate: String(fd.get("plate")).trim().toUpperCase().slice(0, 10) } : {}),
        notes: String(fd.get("notes") ?? "").trim().slice(0, 500) || "Reserva pelo link de cadastro",
        status: "pendente", origem: "link", createdAt: serverTimestamp(),
      })
      setShowForm(false); setSent(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (e) { console.error("enviar pedido:", e); setErr(errText(e, "Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.")) }
    setBusy(false)
  }

  const today = useMemo(() => new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" }), [])
  const open = mine.filter(m => m.status === "pendente" || m.status === "confirmada" || m.status === "hospedada")

  return (
    <section style={{ padding: "7.5rem 1.25rem 4rem", maxWidth: 640, margin: "0 auto" }}>
      <p style={{ ...sans, textAlign: "center", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: ".5rem" }}>Reserva</p>
      <h1 style={{ ...serif, textAlign: "center", fontSize: "2.4rem", fontWeight: 500, marginBottom: ".5rem" }}>Faça seu cadastro e reserve</h1>
      <p style={{ ...sans, textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem", fontSize: ".95rem" }}>
        Entre com sua conta Google, conte um pouco sobre você e sobre a estadia. Retornamos pelo WhatsApp para confirmar.
      </p>

      {user === undefined && <p style={{ ...sans, textAlign: "center", color: "var(--text-muted)" }}>Carregando…</p>}

      {user === null && (
        <div style={{ ...card, textAlign: "center" }}>
          <button onClick={login} style={{ ...btn, display: "inline-flex", alignItems: "center", gap: ".6rem" }}>
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#fff" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.8 1.1 8 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></svg>
            Entrar com o Google
          </button>
          <p style={{ ...sans, fontSize: ".78rem", color: "var(--text-light)", marginTop: "1rem" }}>Usamos seu login só para identificar sua reserva. Não publicamos nada na sua conta.</p>
          {err && <p style={{ ...sans, color: "var(--accent)", marginTop: ".75rem", fontSize: ".85rem" }}>{err}</p>}
        </div>
      )}

      {user && (
        <>
          <p style={{ ...sans, fontSize: ".8rem", color: "var(--text-muted)", textAlign: "right", marginBottom: ".75rem" }}>
            {user.email} · <button onClick={() => signOut(auth)} style={{ background: "none", border: 0, color: "var(--accent)", cursor: "pointer", textDecoration: "underline", fontSize: ".8rem" }}>sair</button>
          </p>

          {sent && <p style={{ ...sans, background: "#e8f5ec", color: "#1f7a3d", padding: ".8rem 1rem", borderRadius: 6, marginBottom: "1rem", fontSize: ".9rem" }}>Pedido enviado! Acompanhe a confirmação logo abaixo.</p>}

          {open.map(m => {
            const s = STATUS_TXT[m.status]
            return (
              <div key={m.id} style={{ ...card, marginBottom: "1rem", borderLeft: `4px solid ${s.c}` }}>
                <p style={{ ...sans, fontWeight: 700, color: s.c }}>{s.t}</p>
                <p style={{ ...serif, fontSize: "1.4rem", margin: ".25rem 0" }}>{fmt(m.startDate)} → {fmt(m.endDate)}</p>
                <p style={{ ...sans, fontSize: ".85rem", color: "var(--text-muted)" }}>
                  {m.people} {m.people === 1 ? "hóspede" : "hóspedes"}{m.status !== "pendente" && m.roomNumber ? ` · Quarto ${String(m.roomNumber).padStart(2, "0")}` : ""}
                </p>
                <p style={{ ...sans, fontSize: ".88rem", marginTop: ".6rem" }}>{s.d}</p>
                <a href={WA_URL(`Olá! Sobre minha reserva de ${fmt(m.startDate)} a ${fmt(m.endDate)}.`)} target="_blank" rel="noopener noreferrer" style={{ ...sans, display: "inline-block", marginTop: ".75rem", fontSize: ".8rem", color: "var(--accent)" }}>Falar no WhatsApp</a>
              </div>
            )
          })}

          {profile === undefined && <p style={{ ...sans, textAlign: "center", color: "var(--text-muted)" }}>Carregando seus dados…</p>}

          {profile === null && (
            <form onSubmit={saveProfile} style={{ ...card, display: "grid", gap: "1rem" }}>
              <h2 style={{ ...serif, fontSize: "1.6rem", fontWeight: 500 }}>Seus dados</h2>
              <div><label style={label}>Nome completo</label><input name="name" required defaultValue={user.displayName ?? ""} style={input} /></div>
              <div><label style={label}>WhatsApp (com DDD)</label><input name="phone" type="tel" required placeholder="(49) 99999-9999" autoComplete="tel" onChange={e => { e.target.value = maskPhone(e.target.value) }} style={input} /></div>
              <div><label style={label}>CPF <span style={{ fontWeight: 400, opacity: .6 }}>(opcional, agiliza o check-in)</span></label><input name="document" inputMode="numeric" maxLength={14} placeholder="000.000.000-00" onChange={e => { e.target.value = maskCpf(e.target.value) }} style={input} /></div>
              <div><label style={label}>Cidade <span style={{ fontWeight: 400, opacity: .6 }}>(opcional)</span></label><input name="city" style={input} /></div>
              {err && <p style={{ ...sans, color: "var(--accent)", fontSize: ".85rem" }}>{err}</p>}
              <button disabled={busy} style={btn}>{busy ? "Salvando…" : "Continuar"}</button>
            </form>
          )}

          {profile && !showForm && (
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setShowForm(true)} style={btn}>{open.length ? "Fazer outra reserva" : "Solicitar reserva"}</button>
            </div>
          )}

          {profile && showForm && (
            <form onSubmit={submitStay} style={{ ...card, display: "grid", gap: "1rem" }}>
              <h2 style={{ ...serif, fontSize: "1.6rem", fontWeight: 500 }}>Sobre a estadia</h2>
              <p style={{ ...sans, fontSize: ".85rem", color: "var(--text-muted)" }}>Olá, {profile.name.split(" ")[0]}! Preencha os dados abaixo.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                <div><label style={label}>Check-in</label><input name="checkin" type="date" min={today} required style={input} /></div>
                <div><label style={label}>Check-out</label><input name="checkout" type="date" min={today} required style={input} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                <div><label style={label}>Hóspedes</label><select name="people" style={input}>{Array.from({ length: 8 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></div>
                <div><label style={label}>Horário previsto de chegada</label><input name="arrival" type="time" style={input} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                <div><label style={label}>Quarto preferido</label><select name="room" style={input}><option value="">Sem preferência</option>{Array.from({ length: TOTAL_ROOMS }, (_, i) => <option key={i + 1} value={i + 1}>Quarto {String(i + 1).padStart(2, "0")}</option>)}</select></div>
                <div><label style={label}>Placa do veículo <span style={{ fontWeight: 400, opacity: .6 }}>(opcional)</span></label><input name="plate" maxLength={10} style={input} /></div>
              </div>
              <div><label style={label}>Observações <span style={{ fontWeight: 400, opacity: .6 }}>(opcional)</span></label><textarea name="notes" rows={3} maxLength={500} placeholder="Berço, pet, café antecipado…" style={input} /></div>
              {err && <p style={{ ...sans, color: "var(--accent)", fontSize: ".85rem" }}>{err}</p>}
              <button disabled={busy} style={btn}>{busy ? "Enviando…" : "Enviar solicitação"}</button>
            </form>
          )}
        </>
      )}
      <InstallPrompt name="Pousada Romelândia" />
    </section>
  )
}
