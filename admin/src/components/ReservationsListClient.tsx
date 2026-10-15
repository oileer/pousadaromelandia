'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { MessageCircle, MoreHorizontal, PlusCircle, Edit, Trash2, Loader2, Search } from 'lucide-react';
import { useReservations } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Reservation, ReservationStatus } from '@/lib/types';
import { STATUS_LABEL, ORIGIN_LABEL, ROOMS, SIGNUP_LINK, brl, statusOf, whatsappLink } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { matchesClient } from '@/lib/clients';
import ReservationForm from './ReservationForm';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

const FILTERS: { key: 'todas' | ReservationStatus; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'confirmada', label: STATUS_LABEL.confirmada },
  { key: 'hospedada', label: STATUS_LABEL.hospedada },
  { key: 'concluida', label: STATUS_LABEL.concluida },
  { key: 'cancelada', label: STATUS_LABEL.cancelada },
];

export const confirmationMessage = (r: Reservation) =>
  `Olá, ${r.guestName}! Sua reserva na Pousada Romelândia está confirmada.\n\n` +
  `Check-in: ${format(parseISO(r.startDate), 'dd/MM/yyyy')}\nCheck-out: ${format(parseISO(r.endDate), 'dd/MM/yyyy')}\n` +
  (r.roomNumber ? `Quarto: ${String(r.roomNumber).padStart(2, '0')}\n` : '') +
  (r.value ? `Valor: ${brl(r.value)}\n` : '') +
  (r.origem === 'link' ? `
Acompanhe sua reserva em ${SIGNUP_LINK}
` : '') +
  `\nQualquer dúvida é só responder aqui. Até breve!`;

export default function ReservationsListClient() {
  const { reservations, loading, deleteReservation } = useReservations();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [toDelete, setToDelete] = useState<Reservation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState<'todas' | ReservationStatus>('todas');
  const [search, setSearch] = useState('');
  const [origin, setOrigin] = useState('todas');
  const [room, setRoom] = useState('todos');
  const [payment, setPayment] = useState('todos');
  const [quick, setQuick] = useState('nenhum');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sort, setSort] = useState('checkin-desc');

  const rows = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const byText = (r: Reservation) => matchesClient({ key: '', name: r.guestName, phone: r.phone ?? '', stays: [], total: 0, count: 0 }, search);
    const sorters: Record<string, (a: Reservation, b: Reservation) => number> = {
      'checkin-desc': (a, b) => b.startDate.localeCompare(a.startDate),
      'checkin-asc': (a, b) => a.startDate.localeCompare(b.startDate),
      nome: (a, b) => a.guestName.localeCompare(b.guestName, 'pt-BR'),
      valor: (a, b) => (b.value || 0) - (a.value || 0),
      quarto: (a, b) => (a.roomNumber ?? 99) - (b.roomNumber ?? 99) || a.startDate.localeCompare(b.startDate),
    };
    return reservations
      .filter(r => statusOf(r) !== 'pendente')
      .filter(r => filter === 'todas' || statusOf(r) === filter)
      .filter(r => origin === 'todas' || (r.origem ?? 'balcao') === origin)
      .filter(r => room === 'todos' || String(r.roomNumber) === room)
      .filter(r => payment === 'todos' || (payment === 'pago' ? r.value > 0 && (r.paid ?? 0) >= r.value : (r.paid ?? 0) < r.value))
      .filter(r => quick === 'nenhum' || (quick === 'hospedados' && r.startDate <= today && today < r.endDate) || (quick === 'chegam' && r.startDate === today) || (quick === 'saem' && r.endDate === today))
      .filter(r => (!from || r.startDate >= from) && (!to || r.startDate <= to))
      .filter(byText)
      .sort(sorters[sort]);
  }, [reservations, filter, search, origin, room, payment, quick, from, to, sort]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setIsDeleting(true);
    try { await deleteReservation(toDelete.id); } catch { /* aviso já exibido */ }
    setIsDeleting(false);
    setToDelete(null);
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const actions = (r: Reservation) => {
    const wa = whatsappLink(r.phone, confirmationMessage(r));
    return (
      <div className="flex items-center justify-end gap-1">
        {wa && (
          <Button asChild size="icon" variant="ghost" title="Chamar no WhatsApp">
            <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4 text-emerald-600" /></a>
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelected(r); setIsFormOpen(true); }}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setToDelete(r)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h2 className="font-headline text-3xl">Reservas</h2>
          <p className="text-sm text-muted-foreground">{rows.length} {rows.length === 1 ? 'reserva' : 'reservas'}</p>
        </div>
        <Button onClick={() => { setSelected(null); setIsFormOpen(true); }} className="gap-2"><PlusCircle className="h-4 w-4" />Nova reserva</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={cn('rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              filter === f.key ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground')}>
            {f.label}
          </button>
        ))}
        <div className="relative w-full sm:ml-auto sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar hóspede ou telefone" className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        <Select value={quick} onValueChange={setQuick}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
          <SelectItem value="nenhum">Qualquer dia</SelectItem><SelectItem value="hospedados">Hospedados agora</SelectItem>
          <SelectItem value="chegam">Chegam hoje</SelectItem><SelectItem value="saem">Saem hoje</SelectItem></SelectContent></Select>
        <Select value={origin} onValueChange={setOrigin}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
          <SelectItem value="todas">Toda origem</SelectItem>{Object.entries(ORIGIN_LABEL).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select>
        <Select value={room} onValueChange={setRoom}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
          <SelectItem value="todos">Todos os quartos</SelectItem>{ROOMS.map(n => <SelectItem key={n} value={String(n)}>Quarto {String(n).padStart(2, '0')}</SelectItem>)}</SelectContent></Select>
        <Select value={payment} onValueChange={setPayment}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
          <SelectItem value="todos">Pagamento: todos</SelectItem><SelectItem value="pago">Pago</SelectItem><SelectItem value="aberto">Com saldo em aberto</SelectItem></SelectContent></Select>
        <Input type="date" value={from} onChange={e => setFrom(e.target.value)} title="Check-in a partir de" />
        <Input type="date" value={to} onChange={e => setTo(e.target.value)} title="Check-in até" />
        <Select value={sort} onValueChange={setSort}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
          <SelectItem value="checkin-desc">Check-in: recentes</SelectItem><SelectItem value="checkin-asc">Check-in: antigos</SelectItem>
          <SelectItem value="nome">Nome (A–Z)</SelectItem><SelectItem value="valor">Maior valor</SelectItem><SelectItem value="quarto">Por quarto</SelectItem></SelectContent></Select>
      </div>

      {/* celular: cartões */}
      <div className="space-y-3 sm:hidden">
        {rows.map(r => (
          <Card key={r.id}>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{r.guestName}</p>
                  <p className="text-sm text-muted-foreground">
                    {r.roomNumber ? `Quarto ${String(r.roomNumber).padStart(2, '0')}` : 'Sem quarto'} · {r.people} {r.people === 1 ? 'pessoa' : 'pessoas'}
                  </p>
                </div>
                <StatusBadge reservation={r} />
              </div>
              <p className="text-sm">{format(parseISO(r.startDate), 'dd/MM/yy')} → {format(parseISO(r.endDate), 'dd/MM/yy')}</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{brl(r.value)} {r.paid ? <span className="text-xs font-normal text-muted-foreground">(pago {brl(r.paid)})</span> : null}</p>
                {actions(r)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* desktop: tabela */}
      <Card className="hidden sm:block">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Hóspede</th><th className="px-4 py-3">Quarto</th><th className="px-4 py-3">Período</th>
                <th className="px-4 py-3">Origem</th><th className="px-4 py-3">Situação</th><th className="px-4 py-3 text-right">Valor</th><th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3"><p className="font-medium">{r.guestName}</p><p className="text-xs text-muted-foreground">{r.phone}</p></td>
                  <td className="px-4 py-3">{r.roomNumber ? String(r.roomNumber).padStart(2, '0') : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{format(parseISO(r.startDate), 'dd/MM/yy')} → {format(parseISO(r.endDate), 'dd/MM/yy')}</td>
                  <td className="px-4 py-3">{ORIGIN_LABEL[r.origem ?? 'balcao']}</td>
                  <td className="px-4 py-3"><StatusBadge reservation={r} /></td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-medium">{brl(r.value)}</p>
                    {r.value > 0 && <p className={cn('text-xs', (r.paid ?? 0) >= r.value ? 'text-emerald-700' : 'text-amber-700')}>
                      {(r.paid ?? 0) >= r.value ? 'Pago' : `Falta ${brl(r.value - (r.paid ?? 0))}`}
                    </p>}
                  </td>
                  <td className="px-4 py-3">{actions(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {rows.length === 0 && <div className="py-10 text-center text-muted-foreground">Nenhuma reserva encontrada.</div>}

      <ReservationForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} reservation={selected} />

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir esta reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              A reserva de <span className="font-semibold">{toDelete?.guestName}</span> será removida e as datas voltam a ficar livres. Para manter o histórico, prefira marcar como "Cancelada".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sim, excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
