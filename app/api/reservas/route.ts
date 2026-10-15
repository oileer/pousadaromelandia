import { NextRequest, NextResponse } from "next/server"
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { TOTAL_ROOMS, WHATSAPP } from "@/lib/config"

const ISO = /^\d{4}-\d{2}-\d{2}$/
const MAX_NIGHTS = 60

/** Quartos já bloqueados (por noite) entre check-in e a véspera do check-out. */
async function occupiedByNight(checkin: string, checkout: string): Promise<Map<string, Set<number>> | null> {
  try {
    const snap = await getDocs(query(collection(db, "roomDays"), where("date", ">=", checkin), where("date", "<", checkout)))
    const map = new Map<string, Set<number>>()
    snap.forEach(d => {
      const { date, room } = d.data() as { date: string; room: number }
      if (!map.has(date)) map.set(date, new Set())
      map.get(date)!.add(room)
    })
    return map
  } catch {
    return null // sem a leitura dos bloqueios o pedido segue e o admin confere ao confirmar
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const guestName = String(body.guestName ?? "").trim()
    const phone = String(body.phone ?? "").trim()
    const checkin = String(body.checkin ?? "")
    const checkout = String(body.checkout ?? "")
    const people = Number(body.people)
    const roomPreference = body.roomPreference ? Number(body.roomPreference) : null
    const notes = String(body.notes ?? "").trim().slice(0, 500)

    if (body.website) return NextResponse.json({ success: true }) // honeypot: robôs preenchem

    if (!guestName || !phone || !checkin || !checkout || !people) {
      return NextResponse.json({ error: "Preencha nome, telefone, datas e número de hóspedes." }, { status: 400 })
    }
    if (guestName.length < 2 || guestName.length > 80 || phone.replace(/\D/g, "").length < 10 || phone.length > 30) {
      return NextResponse.json({ error: "Confira o nome e o telefone com DDD." }, { status: 400 })
    }
    if (!ISO.test(checkin) || !ISO.test(checkout) || !(people >= 1 && people <= 20)) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
    }
    const today = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" })
    const nights = Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86400000)
    if (checkin < today) return NextResponse.json({ error: "O check-in não pode ser no passado." }, { status: 400 })
    if (nights < 1) return NextResponse.json({ error: "O check-out precisa ser depois do check-in." }, { status: 400 })
    if (nights > MAX_NIGHTS) return NextResponse.json({ error: "Para estadias longas, fale direto pelo WhatsApp." }, { status: 400 })

    // disponibilidade (bloqueios criados pelo painel)
    const occupied = await occupiedByNight(checkin, checkout)
    if (occupied) {
      const full = [...occupied.values()].some(rooms => rooms.size >= TOTAL_ROOMS)
      const preferredTaken = roomPreference != null && [...occupied.values()].some(rooms => rooms.has(roomPreference))
      if (full || preferredTaken) {
        return NextResponse.json({
          error: full ? "Não temos quartos livres nessas datas. Tente outras datas ou fale pelo WhatsApp." : "Esse quarto já está ocupado nessas datas.",
        }, { status: 409 })
      }
    }

    const docRef = await addDoc(collection(db, "reservations"), {
      guestName,
      phone,
      startDate: checkin,
      endDate: checkout,
      people,
      roomNumber: roomPreference,
      value: 0,
      notes: notes || "Reserva feita pelo site",
      status: "pendente",
      origem: "site",
      createdAt: serverTimestamp(),
    })

    const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("pt-BR")
    const waMsg = encodeURIComponent(
      `Olá, ${guestName}! 🏨\n\n` +
      `Recebemos sua solicitação de reserva na Pousada Romelândia:\n\n` +
      `📅 Check-in: ${fmt(checkin)}\n` +
      `📅 Check-out: ${fmt(checkout)}\n` +
      `👥 Hóspedes: ${people}\n\n` +
      `Em breve confirmaremos a disponibilidade e enviaremos mais detalhes. ` +
      `Qualquer dúvida, é só responder aqui!\n\n` +
      `Equipe Pousada Romelândia`
    )
    const waLink = `https://wa.me/55${phone.replace(/\D/g, "").replace(/^55/, "")}?text=${waMsg}`

    return NextResponse.json({
      success: true,
      id: docRef.id,
      waLink,
      adminWaLink: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Nova reserva pelo site!\nHóspede: ${guestName}\nTel: ${phone}\nCheck-in: ${fmt(checkin)}\nCheck-out: ${fmt(checkout)}\nPessoas: ${people}`
      )}`,
    })
  } catch (err) {
    console.error("Erro ao criar reserva:", err)
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente pelo WhatsApp." }, { status: 500 })
  }
}
