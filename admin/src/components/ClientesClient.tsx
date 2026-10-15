'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ChevronDown, Loader2, MessageCircle, PlusCircle, Search } from 'lucide-react';
import { useReservations } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Client, buildClients, matchesClient } from '@/lib/clients';
import { brl, whatsappLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import ReservationForm from './ReservationForm';

type SortKey = 'recentes' | 'nome' | 'mais-estadias' | 'mais-gastou';
type Show = 'todos' | 'recorrentes' | 'com-proxima' | 'sem-telefone';

export default function ClientesClient() {
  const { reservations, loading } = useReservations();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recentes');
  const [show, setShow] = useState<Show>('todos');
  const [open, setOpen] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [prefill, setPrefill] = useState<Client | null>(null);

  const clients = useMemo(() => buildClients(reservations), [reservations]);
  const rows = useMemo(() => {
    const f = clients
      .filter(c => matchesClient(c, search))
      .filter(c => show === 'todos' || (show === 'recorrentes' && c.count >= 2) || (show === 'com-proxima' && !!c.next) || (show === 'sem-telefone' && !c.phone));
    const by: Record<SortKey, (a: Client, b: Client) => number> = {
      recentes: (a, b) => b.stays[0].startDate.localeCompare(a.stays[0].startDate),
      nome: (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
      'mais-estadias': (a, b) => b.count - a.count || b.total - a.total,
      'mais-gastou': (a, b) => b.total - a.total,
    };
    return f.sort(by[sort]);
  }, [clients, search, sort, show]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-headline text-3xl">Clientes</h2>
        <p className="text-sm text-muted-foreground">{rows.length} de {clients.length} hóspedes · agrupados por telefone</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nome ou telefone" className="pl-9" />
        </div>
        <Select value={show} onValueChange={v => setShow(v as Show)}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="recorrentes">Voltaram (2+ estadias)</SelectItem>
            <SelectItem value="com-proxima">Com próxima reserva</SelectItem>
            <SelectItem value="sem-telefone">Sem telefone</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={v => setSort(v as SortKey)}>
          <SelectTrigger className="w-full sm:w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recentes">Mais recentes</SelectItem>
            <SelectItem value="nome">Nome (A–Z)</SelectItem>
            <SelectItem value="mais-estadias">Mais estadias</SelectItem>
            <SelectItem value="mais-gastou">Maior valor gasto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {rows.map(c => {
          const wa = whatsappLink(c.phone, `Olá, ${c.name.split(' ')[0]}! Tudo bem? Aqui é da Pousada Romelândia.`);
          const isOpen = open === c.key;
          return (
            <Card key={c.key}>
              <CardContent className="p-0">
                <button onClick={() => setOpen(isOpen ? null : c.key)} className="flex w-full items-center gap-3 p-4 text-left">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{c.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {c.phone || 'sem telefone'} · {c.count} {c.count === 1 ? 'estadia' : 'estadias'} · {brl(c.total)}
                    </p>
                  </div>
                  <div className="hidden text-right text-xs text-muted-foreground sm:block">
                    {c.next ? <p className="font-medium text-primary">Próxima: {format(parseISO(c.next), 'dd/MM/yy')}</p> : c.last && <p>Última: {format(parseISO(c.last), 'dd/MM/yy')}</p>}
                  </div>
                  <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
                </button>
                {isOpen && (
                  <div className="space-y-3 border-t bg-muted/30 p-4">
                    <div className="flex flex-wrap gap-2">
                      {wa && <Button asChild size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>}
                      <Button size="sm" variant="outline" className="gap-2" onClick={() => { setPrefill(c); setFormOpen(true); }}><PlusCircle className="h-4 w-4" />Nova reserva</Button>
                    </div>
                    <div className="space-y-1.5">
                      {c.stays.map(r => (
                        <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-card px-3 py-2 text-sm">
                          <span>{format(parseISO(r.startDate), 'dd/MM/yy')} → {format(parseISO(r.endDate), 'dd/MM/yy')} · {r.roomNumber ? `quarto ${String(r.roomNumber).padStart(2, '0')}` : 'sem quarto'}</span>
                          <span className="flex items-center gap-3"><StatusBadge reservation={r} /><b>{brl(r.value)}</b></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
        {rows.length === 0 && <div className="py-10 text-center text-muted-foreground">Nenhum cliente encontrado.</div>}
      </div>

      <ReservationForm isOpen={formOpen} onOpenChange={setFormOpen} prefilledGuest={prefill ? { name: prefill.name, phone: prefill.phone } : undefined} />
    </div>
  );
}
