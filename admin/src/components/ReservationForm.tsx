'use client';

import { useEffect, useMemo, useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { buildClients } from '@/lib/clients';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useReservations } from '@/contexts/ReservationsContext';
import { Reservation } from '@/lib/types';
import { ROOMS, MAX_PEOPLE_PER_ROOM, STATUS_LABEL, ORIGIN_LABEL, PAYMENT_METHODS, blocksRoom, brl, nightsOf, statusOf } from '@/lib/constants';

interface ReservationFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reservation?: Reservation | null;
  prefilledDate?: string;
  prefilledRoom?: number;
  prefilledGuest?: { name: string; phone: string };
}

const STATUSES = ['pendente', 'confirmada', 'hospedada', 'concluida', 'cancelada'] as const;
const ORIGINS = ['site', 'link', 'whatsapp', 'balcao'] as const;

const formSchema = z.object({
  guestName: z.string().min(1, { message: 'Nome do hóspede é obrigatório.' }),
  phone: z.string().optional(),
  roomNumber: z.coerce.number().optional(),
  people: z.coerce.number().min(1, 'Informe o número de pessoas.'),
  value: z.coerce.number().min(0, 'O valor deve ser positivo.'),
  paid: z.coerce.number().min(0).optional(),
  paymentMethod: z.string().optional(),
  startDate: z.string().min(1, 'Data de check-in é obrigatória.'),
  endDate: z.string().min(1, 'Data de check-out é obrigatória.'),
  status: z.enum(STATUSES),
  origem: z.enum(ORIGINS),
  notes: z.string().optional(),
}).refine(d => d.endDate > d.startDate, {
  message: 'O check-out deve ser depois do check-in.',
  path: ['endDate'],
}).refine(d => d.status === 'pendente' || d.status === 'cancelada' || !!d.roomNumber, {
  message: 'Escolha o quarto para reservas confirmadas.',
  path: ['roomNumber'],
});

type FormValues = z.infer<typeof formSchema>;

const EMPTY: FormValues = {
  guestName: '', phone: '', roomNumber: undefined, people: 1, value: 0, paid: 0, paymentMethod: '',
  startDate: '', endDate: '', status: 'confirmada', origem: 'balcao', notes: '',
};

export default function ReservationForm({ isOpen, onOpenChange, reservation, prefilledDate, prefilledRoom, prefilledGuest }: ReservationFormProps) {
  const { createReservation, updateReservation, live, reservations } = useReservations();
  const clients = useMemo(() => buildClients(reservations), [reservations]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) as never, defaultValues: EMPTY });

  useEffect(() => {
    if (!isOpen) return;
    setIsSubmitting(false);
    if (reservation) {
      form.reset({
        ...EMPTY,
        guestName: reservation.guestName,
        phone: reservation.phone ?? '',
        roomNumber: reservation.roomNumber ?? undefined,
        people: reservation.people,
        value: reservation.value,
        paid: reservation.paid ?? 0,
        paymentMethod: reservation.paymentMethod ?? '',
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        status: statusOf(reservation),
        origem: reservation.origem ?? 'balcao',
        notes: reservation.notes ?? '',
      });
    } else {
      form.reset({
        ...EMPTY,
        startDate: prefilledDate || '',
        endDate: prefilledDate ? format(addDays(parseISO(prefilledDate), 1), 'yyyy-MM-dd') : '',
        roomNumber: prefilledRoom,
        guestName: prefilledGuest?.name ?? '',
        phone: prefilledGuest?.phone ?? '',
      });
    }
  }, [isOpen, reservation, form, prefilledDate, prefilledRoom, prefilledGuest]);

  const [startDate, endDate, value, roomNumber, guestName] = form.watch(['startDate', 'endDate', 'value', 'roomNumber', 'guestName']);

  // ao escolher o check-in, sugere check-out no dia seguinte (ou ajusta se ficou antes)
  useEffect(() => {
    if (!startDate) return;
    if (!endDate || endDate <= startDate) form.setValue('endDate', format(addDays(parseISO(startDate), 1), 'yyyy-MM-dd'));
  }, [startDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const nights = startDate && endDate && endDate > startDate ? nightsOf(startDate, endDate).length : 0;
  const perNight = nights && Number(value) ? Number(value) / nights : 0;

  // quartos já ocupados no período escolhido (ignora a própria reserva ao editar)
  const taken = useMemo(() => {
    const set = new Set<number>();
    if (!nights) return set;
    live.forEach(o => {
      if (o.id !== reservation?.id && blocksRoom(o) && startDate < o.endDate && endDate > o.startDate) set.add(o.roomNumber!);
    });
    return set;
  }, [live, nights, startDate, endDate, reservation?.id]);

  // reconhece cliente antigo pelo nome e já traz o telefone
  const onPickGuest = (name: string) => {
    const c = clients.find(x => x.name.toLowerCase() === name.trim().toLowerCase());
    if (c && c.phone && !form.getValues('phone')) form.setValue('phone', c.phone);
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = { ...values, roomNumber: values.roomNumber ?? null };
      if (reservation) await updateReservation(reservation.id, payload);
      else await createReservation(payload);
      onOpenChange(false);
    } catch {
      // o contexto já avisa o motivo (conflito, permissão); o formulário fica aberto
    } finally {
      setIsSubmitting(false);
    }
  };

  const people = form.watch('people');
  const capacityWarning = Number(people) > MAX_PEOPLE_PER_ROOM;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] flex flex-col sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{reservation ? 'Editar reserva' : 'Nova reserva'}</DialogTitle>
          <DialogDescription>
            {reservation ? 'Atualize os dados da reserva.' : 'Preencha os dados da nova reserva.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto -mr-6 pr-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-2">
              <FormField control={form.control} name="guestName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do hóspede</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Maria Silva" list="clientes-conhecidos" autoComplete="off" {...field}
                      onChange={e => { field.onChange(e); onPickGuest(e.target.value); }} />
                  </FormControl>
                  <datalist id="clientes-conhecidos">
                    {clients.filter(c => !guestName || c.name.toLowerCase().includes(guestName.toLowerCase())).slice(0, 8).map(c => <option key={c.key} value={c.name}>{c.phone}</option>)}
                  </datalist>
                  {guestName && clients.some(c => c.name.toLowerCase() === guestName.trim().toLowerCase() && c.count > 0) && (
                    <p className="text-xs text-emerald-700">Cliente conhecido · {clients.find(c => c.name.toLowerCase() === guestName.trim().toLowerCase())!.count} estadia(s) anterior(es)</p>
                  )}
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp / telefone</FormLabel>
                  <FormControl><Input inputMode="tel" placeholder="(49) 99999-9999" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="startDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-in</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="endDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-out</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="roomNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quarto</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Sem quarto definido" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {ROOMS.map(n => (
                          <SelectItem key={n} value={String(n)} disabled={taken.has(n)}>
                            Quarto {String(n).padStart(2, '0')}{taken.has(n) ? ' · ocupado' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {roomNumber && taken.has(Number(roomNumber)) && <p className="text-xs text-red-700">Quarto ocupado nesse período.</p>}
                    {!!nights && taken.size >= ROOMS.length && <p className="text-xs text-red-700">Nenhum quarto livre nesse período.</p>}
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="people" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pessoas</FormLabel>
                    <FormControl><Input type="number" min={1} {...field} value={field.value ?? ''} /></FormControl>
                    {capacityWarning && <p className="text-xs text-amber-700">Acima de {MAX_PEOPLE_PER_ROOM} pessoas por quarto.</p>}
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situação</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="origem" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {ORIGINS.map(o => <SelectItem key={o} value={o}>{ORIGIN_LABEL[o]}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField control={form.control} name="value" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor total (R$)</FormLabel>
                    <FormControl><Input type="number" step="0.01" min={0} {...field} value={field.value ?? ''} /></FormControl>
                    {!!nights && <p className="text-xs text-muted-foreground">{nights} {nights === 1 ? 'noite' : 'noites'}{perNight ? ` · ${brl(perNight)}/noite` : ''}</p>}
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="paid" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Já pago (R$)</FormLabel>
                    <FormControl><Input type="number" step="0.01" min={0} {...field} value={field.value ?? ''} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pagamento</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl><SelectTrigger><SelectValue placeholder="—" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Chegada tarde, pet, café antecipado…" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : reservation ? 'Salvar alterações' : 'Criar reserva'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
