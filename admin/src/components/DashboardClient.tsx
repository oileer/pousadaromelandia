'use client';

import { useState } from 'react';
import { useReservations, RevenueFilterOption } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, Bed, Calendar, Loader2, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TOTAL_ROOMS } from '@/lib/constants';
import { Reservation } from '@/lib/types';
import ReservationForm from './ReservationForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DashboardClient() {
  const {
    loading,
    reservations, 
    todayOccupancy,
    next7DaysOccupancy,
    calculateRevenueForPeriod,
  } = useReservations();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [revenueFilter, setRevenueFilter] = useState<RevenueFilterOption>('next7days');

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };
  
  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  }

  // Get recent unique clients
  const recentClients = Array.from(new Set(reservations.map(r => r.guestName)))
    .map(name => reservations.find(r => r.guestName === name)!)
    .sort((a, b) => parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime())
    .slice(0, 10);

  const revenueForPeriod = calculateRevenueForPeriod(revenueFilter);

  const revenueFilterLabels: Record<RevenueFilterOption, string> = {
    next7days: 'Próximos 7 dias',
    next30days: 'Próximos 30 dias',
    thisMonth: 'Este Mês',
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        {/* Título usa Playfair Display — igual ao front-end */}
        <h2 className="font-headline text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => handleAddReservation()}
            className="bg-primary text-primary-foreground hover:bg-[#8B1A10] transition-colors duration-200"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Reserva
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i}><CardHeader className="h-[128px] animate-pulse bg-muted rounded-lg"></CardHeader></Card>
            ))}
        </div>
      ) : (
      /* Cards de métricas — com card-lift (hover elevação, igual ao front-end) */
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-body text-sm font-medium">Ocupação Hoje</CardTitle>
            <Bed className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-headline text-2xl font-bold">{todayOccupancy} / {TOTAL_ROOMS}</div>
            <p className="font-body text-xs text-muted-foreground">quartos ocupados</p>
          </CardContent>
        </Card>
        <Card className="card-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-body text-sm font-medium">Reservas (Próx. 7 dias)</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-headline text-2xl font-bold">{next7DaysOccupancy.reservations}</div>
            <p className="font-body text-xs text-muted-foreground">{next7DaysOccupancy.people} hóspedes esperados</p>
          </CardContent>
        </Card>
        <Card className="card-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-body text-sm font-medium">Receita</CardTitle>
            <Select
              value={revenueFilter}
              onValueChange={(value) => setRevenueFilter(value as RevenueFilterOption)}
            >
              <SelectTrigger className="w-auto h-7 text-xs border-none bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next7days">Próximos 7 dias</SelectItem>
                <SelectItem value="next30days">Próximos 30 dias</SelectItem>
                <SelectItem value="thisMonth">Este Mês</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="font-headline text-2xl font-bold">
              {revenueForPeriod.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="font-body text-xs text-muted-foreground">
              receita prevista para {revenueFilterLabels[revenueFilter].toLowerCase()}
            </p>
          </CardContent>
        </Card>
      </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Clientes Recentes</CardTitle>
          <CardDescription className="font-body">
            Uma lista dos seus clientes mais recentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
             </div>
          ) : recentClients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">Check-in</TableHead>
                  <TableHead className="hidden sm:table-cell">Quarto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentClients.map((res) => (
                  <TableRow key={res.id} onClick={() => handleEditReservation(res)} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 hidden sm:flex">
                          <AvatarFallback>{res.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{res.guestName}</div>
                          <div className="text-sm text-muted-foreground sm:hidden">
                            {format(parseISO(res.startDate), 'dd/MM/yyyy')}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {format(parseISO(res.startDate), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      Quarto {String(res.roomNumber).padStart(2, '0')}
                    </TableCell>
                    <TableCell className="text-right">
                      {res.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Nenhum cliente com reserva encontrado.
            </div>
          )}
        </CardContent>
      </Card>


      <ReservationForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        reservation={selectedReservation}
      />
    </div>
  );
}
