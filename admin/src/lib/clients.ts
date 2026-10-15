import { format } from 'date-fns';
import type { Reservation } from './types';
import { statusOf } from './constants';

export interface Client {
  key: string;
  name: string;
  phone: string;
  stays: Reservation[]; // mais recente primeiro
  total: number; // soma das reservas que contam (sem pendentes/canceladas)
  count: number;
  last?: string; // último check-in já passado ou em andamento
  next?: string; // próximo check-in
}

const digits = (s?: string) => (s ?? '').replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/** Agrupa reservas por telefone (ou por nome, quando não há telefone). */
export function buildClients(reservations: Reservation[]): Client[] {
  const today = format(new Date(), 'yyyy-MM-dd');
  const map = new Map<string, Client>();
  for (const r of reservations) {
    const key = digits(r.phone).length >= 10 ? digits(r.phone) : 'n:' + norm(r.guestName);
    const c = map.get(key) ?? { key, name: r.guestName, phone: r.phone ?? '', stays: [], total: 0, count: 0 };
    c.stays.push(r);
    if (!c.phone && r.phone) c.phone = r.phone;
    map.set(key, c);
  }
  const clients = [...map.values()];
  for (const c of clients) {
    c.stays.sort((a, b) => b.startDate.localeCompare(a.startDate));
    c.name = c.stays[0].guestName;
    const counted = c.stays.filter(r => !['pendente', 'cancelada'].includes(statusOf(r)));
    c.count = counted.length;
    c.total = counted.reduce((s, r) => s + (r.value || 0), 0);
    c.last = counted.find(r => r.startDate <= today)?.startDate;
    c.next = [...counted].reverse().find(r => r.startDate > today)?.startDate;
  }
  return clients;
}

export const matchesClient = (c: Client, q: string) => {
  const s = norm(q);
  if (!s) return true;
  const d = q.replace(/\D/g, '');
  return norm(c.name).includes(s) || (d.length >= 3 && digits(c.phone).includes(d));
};
