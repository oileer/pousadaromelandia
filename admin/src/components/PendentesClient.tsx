'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Check, Inbox, Link2, Loader2, MessageCircle, X } from 'lucide-react';
import { useReservations } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Reservation } from '@/lib/types';
import { ROOMS, SIGNUP_LINK, SIGNUP_MESSAGE, ORIGIN_LABEL, blocksRoom, brl, whatsappLink } from '@/lib/constants';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { confirmationMessage } from './ReservationsListClient';

function DoneCard({ done }: { done: Reservation }) {
  const wa = whatsappLink(done.phone, confirmationMessage(done));
  return (
    <Card className="border-emerald-300 bg-emerald-50">
      <CardContent className="flex flex-wrap items-center gap-3 p-4">
        <Check className="h-5 w-5 text-emerald-700" />
        <p className="mr-auto text-sm"><b>{done.guestName}</b> confirmada no quarto {String(done.roomNumber).padStart(2, '0')}.</p>
        {wa && <Button asChild size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />Avisar no WhatsApp</a></Button>}
      </CardContent>
    </Card>
  );
}

function PendingCard({ r, onDone }: { r: Reservation; onDone: (r: Reservation) => void }) {
  const { live, updateReservation, setStatus } = useReservations();
  const [room, setRoom] = useState<number | null>(r.roomNumber);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  const freeRooms = ROOMS.filter(n => !live.some(o => blocksRoom(o) && o.roomNumber === n &&
    parseISO(r.startDate) < parseISO(o.endDate) && parseISO(r.endDate) > parseISO(o.startDate)));

  const confirm = async () => {
    if (!room) return;
    setBusy(true);
    try {
      await updateReservation(r.id, { status: 'confirmada', roomNumber: room, value: Number(value) || 0 });
      onDone({ ...r, status: 'confirmada', roomNumber: room, value: Number(value) || 0 });
    } catch { /* aviso já exibido */ }
    setBusy(false);
  };

  const reject = async () => {
    setBusy(true);
    try { await setStatus(r.id, 'cancelada'); } catch { /* aviso já exibido */ }
    setBusy(false);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold">{r.guestName}</p>
            <p className="text-sm text-muted-foreground">{r.phone} · {r.people} {r.people === 1 ? 'pessoa' : 'pessoas'}</p>
          </div>
          <p className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
            {format(parseISO(r.startDate), 'dd/MM')} → {format(parseISO(r.endDate), 'dd/MM/yyyy')}
          </p>
        </div>
        {r.notes && r.notes !== 'Reserva feita pelo site' && <p className="rounded-md bg-muted/60 p-3 text-sm">{r.notes}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="rounded-full bg-[#C9A24B]/25 px-2 py-0.5 font-bold text-[#0B1F3A]">{ORIGIN_LABEL[r.origem ?? 'site']}</span>
          {r.email && <span>{r.email}</span>}
          {r.document && <span>CPF {r.document}</span>}
          {r.city && <span>{r.city}</span>}
          {r.arrivalTime && <span>Chegada ~{r.arrivalTime}</span>}
          {r.vehiclePlate && <span>Placa {r.vehiclePlate}</span>}
        </div>
        {r.roomNumber && <p className="text-sm text-muted-foreground">Preferência do hóspede: quarto {String(r.roomNumber).padStart(2, '0')}</p>}

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quartos livres nessas datas ({freeRooms.length})
          </p>
          {freeRooms.length === 0 ? (
            <p className="text-sm text-red-700">Nenhum quarto livre neste período.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {freeRooms.map(n => (
                <button key={n} onClick={() => setRoom(n)}
                  className={cn('h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-colors',
                    room === n ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:border-primary')}>
                  {String(n).padStart(2, '0')}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-44">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Valor total (R$)</label>
            <Input type="number" min={0} step="0.01" value={value} onChange={e => setValue(e.target.value)} placeholder={brl(0)} />
          </div>
          <Button onClick={confirm} disabled={busy || !room} className="gap-2">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Confirmar reserva
          </Button>
          <Button onClick={reject} disabled={busy} variant="outline" className="gap-2 text-red-700"><X className="h-4 w-4" />Recusar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PendentesClient() {
  const { pending, loading } = useReservations();
  const [kept, setKept] = useState<Reservation[]>([]);
  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const sorted = [...pending].filter(r => !kept.some(k => k.id === r.id)).sort((a, b) => a.startDate.localeCompare(b.startDate));
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="mr-auto">
        <h2 className="font-headline text-3xl">Solicitações do site</h2>
        <p className="text-sm text-muted-foreground">Pedidos feitos pelo site e pelo link de cadastro aguardando confirmação.</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={async () => { await navigator.clipboard.writeText(SIGNUP_MESSAGE); toast({ title: 'Link copiado', description: 'Cole a mensagem na conversa do WhatsApp do cliente.' }); }}>
          <Link2 className="h-4 w-4" />Copiar link de cadastro
        </Button>
      </div>
      {kept.map(k => <DoneCard key={k.id} done={k} />)}
      {sorted.length === 0 && kept.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <Inbox className="h-10 w-10" />
          <p>Nenhuma solicitação pendente.</p>
        </div>
      ) : sorted.map(r => <PendingCard key={r.id} r={r} onDone={d => setKept(k => [d, ...k])} />)}
    </div>
  );
}
