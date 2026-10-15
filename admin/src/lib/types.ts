import type { Timestamp } from "firebase/firestore";

export type ReservationStatus = 'pendente' | 'confirmada' | 'hospedada' | 'concluida' | 'cancelada';
export type ReservationOrigin = 'site' | 'link' | 'whatsapp' | 'balcao';

export interface Reservation {
  id: string;
  guestName: string;
  phone?: string;
  uid?: string; // hóspede que fez o cadastro pelo link
  email?: string;
  document?: string;
  city?: string;
  arrivalTime?: string;
  vehiclePlate?: string;
  roomNumber: number | null; // null = solicitação do site ainda sem quarto
  people: number;
  value: number;
  paid?: number; // sinal / valor já recebido
  paymentMethod?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (check-out, dia livre)
  notes?: string;
  status?: ReservationStatus; // ausente nos registros antigos = confirmada
  origem?: ReservationOrigin;
  createdAt: Timestamp;
}

export interface RoomLock {
  id: string; // `${quarto}_${YYYY-MM-DD}`
  room: number;
  date: string;
  reservationId: string;
}
