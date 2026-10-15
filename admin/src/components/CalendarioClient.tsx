'use client';

import { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useReservations } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Reservation } from '@/lib/types';
import { ROOMS, blocksRoom, statusOf } from '@/lib/constants';
import { cn } from '@/lib/utils';
import ReservationForm from './ReservationForm';

export default function CalendarioClient() {
  const { live, loading } = useReservations();
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [prefill, setPrefill] = useState<{ date: string; room: number } | null>(null);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const days = eachDayOfInterval({ start: month, end: endOfMonth(month) });
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // a noite do dia D pertence à reserva se start <= D < end
  const cellReservation = (room: number, dayStr: string) =>
    live.find(r => blocksRoom(r) && r.roomNumber === room && r.startDate <= dayStr && dayStr < r.endDate);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="mr-auto font-headline text-3xl capitalize">{format(month, 'MMMM yyyy', { locale: ptBR })}</h2>
        <Button variant="outline" size="icon" onClick={() => setMonth(m => addMonths(m, -1))}><ChevronLeft className="h-4 w-4" /></Button>
        <Button variant="outline" onClick={() => setMonth(startOfMonth(new Date()))}>Hoje</Button>
        <Button variant="outline" size="icon" onClick={() => setMonth(m => addMonths(m, 1))}><ChevronRight className="h-4 w-4" /></Button>
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-max min-w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-semibold">Quarto</th>
                {days.map(d => {
                  const ds = format(d, 'yyyy-MM-dd');
                  return (
                    <th key={ds} className={cn('min-w-9 px-1 py-2 text-center font-medium', ds === todayStr ? 'text-primary' : 'text-muted-foreground', [0, 6].includes(d.getDay()) && 'bg-muted/40')}>
                      <div>{format(d, 'd')}</div>
                      <div className="text-[10px] uppercase">{format(d, 'EEEEE', { locale: ptBR })}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROOMS.map(room => (
                <tr key={room} className="border-t">
                  <td className="sticky left-0 z-10 bg-card px-3 py-2 font-semibold">{String(room).padStart(2, '0')}</td>
                  {days.map(d => {
                    const ds = format(d, 'yyyy-MM-dd');
                    const r = cellReservation(room, ds);
                    const isStart = r?.startDate === ds || (r && ds === format(month, 'yyyy-MM-dd'));
                    return (
                      <td key={ds} className="h-9 border-l p-0">
                        {r ? (
                          <button
                            title={`${r.guestName} · ${format(parseISO(r.startDate), 'dd/MM')}–${format(parseISO(r.endDate), 'dd/MM')}`}
                            onClick={() => { setSelected(r); setPrefill(null); setFormOpen(true); }}
                            className={cn('flex h-full w-full items-center overflow-hidden px-1 text-left text-[10px] font-semibold text-white',
                              statusOf(r) === 'hospedada' ? 'bg-sky-600' : statusOf(r) === 'concluida' ? 'bg-stone-400' : 'bg-primary')}
                          >
                            {isStart && <span className="truncate">{r.guestName.split(' ')[0]}</span>}
                          </button>
                        ) : (
                          <button
                            aria-label={`Reservar quarto ${room} em ${ds}`}
                            onClick={() => { setSelected(null); setPrefill({ date: ds, room }); setFormOpen(true); }}
                            className="h-9 w-full hover:bg-primary/10"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">Toque num dia livre para criar uma reserva; toque numa barra para editar. A noite do check-out fica livre.</p>
      <ReservationForm isOpen={formOpen} onOpenChange={setFormOpen} reservation={selected} prefilledDate={prefill?.date} prefilledRoom={prefill?.room} />
    </div>
  );
}
