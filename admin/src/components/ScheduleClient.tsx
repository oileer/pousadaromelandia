'use client';

import { useReservations } from '@/contexts/ReservationsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, User, Bed, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ScheduleClient() {
  const { reservationsByDay, loading } = useReservations();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sortedDays = Object.keys(reservationsByDay).sort();

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Agenda Semanal</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Próximos 7 Dias</CardTitle>
          <CardDescription className="font-body">Veja as reservas agendadas para cada dia da semana.</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedDays.length > 0 ? (
            <Accordion type="single" collapsible defaultValue={sortedDays[0]}>
              {sortedDays.map((day) => (
                <AccordionItem value={day} key={day}>
                  <AccordionTrigger className="text-lg font-semibold capitalize">
                    {format(parseISO(day), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                     <span className="ml-auto mr-4 text-sm font-normal text-muted-foreground">
                        {reservationsByDay[day].length} {reservationsByDay[day].length === 1 ? 'reserva' : 'reservas'}
                     </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {reservationsByDay[day].length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {reservationsByDay[day].map((reservation) => (
                          <Card key={reservation.id} className="flex flex-col">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-xl">
                                <User className="h-5 w-5 text-primary" />
                                {reservation.guestName}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Bed className="h-4 w-4" />
                                <span>Quarto {String(reservation.roomNumber).padStart(2, '0')}</span>
                              </div>
                              <div className="flex items-center gap-2 font-semibold">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="text-green-600">
                                  {reservation.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="py-4 text-center text-muted-foreground">Nenhuma reserva para este dia.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Não foi possível carregar a agenda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
