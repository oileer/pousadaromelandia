import type { Metadata } from "next"
import ReservarClient from "@/components/ReservarClient"

export const metadata: Metadata = {
  title: "Reservar",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ReservarClient />
}
