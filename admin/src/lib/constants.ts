import { addDays, format, parseISO } from 'date-fns';
import type { Reservation, ReservationOrigin, ReservationStatus } from './types';

export const TOTAL_ROOMS = 11;
export const MAX_PEOPLE_PER_ROOM = 4;
export const ROOMS = Array.from({ length: TOTAL_ROOMS }, (_, i) => i + 1);

export const STATUS_LABEL: Record<ReservationStatus, string> = {
  pendente: 'Pendente',
  confirmada: 'Confirmada',
  hospedada: 'Hospedada',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

export const ORIGIN_LABEL: Record<ReservationOrigin, string> = {
  site: 'Site',
  link: 'Link de cadastro',
  whatsapp: 'WhatsApp',
  balcao: 'Balcão',
};

export const PAYMENT_METHODS = ['Pix', 'Dinheiro', 'Cartão', 'Transferência'];

export const statusOf = (r: Pick<Reservation, 'status'>): ReservationStatus => r.status ?? 'confirmada';

/** Reservas que ocupam um quarto (e portanto geram bloqueio de datas). */
export const blocksRoom = (r: Pick<Reservation, 'status' | 'roomNumber'>): boolean =>
  r.roomNumber != null && ['confirmada', 'hospedada', 'concluida'].includes(statusOf(r));

/** Noites da estadia: check-in até o dia anterior ao check-out. */
export function nightsOf(startDate: string, endDate: string): string[] {
  const out: string[] = [];
  let d = parseISO(startDate);
  const end = parseISO(endDate);
  while (d < end) {
    out.push(format(d, 'yyyy-MM-dd'));
    d = addDays(d, 1);
  }
  return out;
}

export const lockId = (room: number, date: string) => `${room}_${date}`;

export const brl = (v: number) => (v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Link do WhatsApp do hóspede (aceita telefone com ou sem DDI). */
export function whatsappLink(phone: string | undefined, message: string): string | null {
  if (!phone) return null;
  let digits = phone.replace(/\D/g, '');
  if (digits.length < 10) return null;
  if (!digits.startsWith('55')) digits = '55' + digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const SITE_URL = 'https://pousadaromelandia.nexoraos.io';
export const SIGNUP_LINK = `${SITE_URL}/reservar`;
export const SIGNUP_MESSAGE = `Olá! Para agilizar sua reserva na Pousada Romelândia, faça seu cadastro rápido por este link (entre com o Google e preencha os dados da estadia):
${SIGNUP_LINK}

Assim que meu pai confirmar a disponibilidade, a confirmação aparece lá e eu te aviso por aqui.`;
