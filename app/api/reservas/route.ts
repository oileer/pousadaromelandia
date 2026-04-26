import { NextRequest, NextResponse } from "next/server"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { WHATSAPP } from "@/lib/config"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { guestName, phone, checkin, checkout, people, roomPreference, notes } = body

    if (!guestName || !phone || !checkin || !checkout || !people) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 })
    }

    // Grava no Firestore do admin como reserva pendente
    const docRef = await addDoc(collection(db, "reservations"), {
      guestName,
      phone,
      startDate:  checkin,
      endDate:    checkout,
      people:     Number(people),
      roomNumber: roomPreference ? Number(roomPreference) : null,
      value:      0,           // admin define o valor depois
      notes:      notes || "Reserva feita pelo site",
      status:     "pendente",  // admin confirma no painel
      origem:     "site",
      createdAt:  serverTimestamp(),
    })

    // Monta mensagem WA automática para o hóspede
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
    const waLink = `https://wa.me/55${phone.replace(/\D/g, "")}?text=${waMsg}`

    return NextResponse.json({
      success: true,
      id: docRef.id,
      waLink,        // frontend abre este link automaticamente
      adminWaLink: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Nova reserva pelo site!\nHóspede: ${guestName}\nTel: ${phone}\nCheck-in: ${fmt(checkin)}\nCheck-out: ${fmt(checkout)}\nPessoas: ${people}`
      )}`
    })
  } catch (err) {
    console.error("Erro ao criar reserva:", err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}
