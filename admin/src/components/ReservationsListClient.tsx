'use client';

import { useState } from 'react';
import { useReservations } from '@/contexts/ReservationsContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, PlusCircle, Edit, Trash2, ArrowUpDown, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Reservation } from '@/lib/types';
import ReservationForm from './ReservationForm';
import { toast } from '@/hooks/use-toast';

type SortKey = keyof Reservation;

export default function ReservationsListClient() {
  const { reservations, loading, deleteReservation } = useReservations();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({ key: 'startDate', direction: 'ascending' });
  const [deleteConfirmation, setDeleteConfirmation] = useState<Reservation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (reservation: Reservation) => {
    setDeleteConfirmation(reservation);
  };
  
  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    setIsDeleting(true);
    try {
        await deleteReservation(deleteConfirmation.id);
    } catch(error) {
        toast({ title: "Erro ao excluir", description: "Não foi possível excluir a reserva.", variant: "destructive"});
    } finally {
        setIsDeleting(false);
        setDeleteConfirmation(null);
    }
  }

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  }

  const renderDesktopTable = () => (
    <Card>
      <CardHeader className="flex flex-row items-center">
         <div className="grid gap-2">
           <CardTitle className="font-headline">Reservas</CardTitle>
           <CardDescription className="font-body">
              Gerencie todas as reservas da pousada.
           </CardDescription>
         </div>
         <Button
           onClick={handleAddReservation}
           className="ml-auto gap-1 bg-primary text-primary-foreground hover:bg-[#8B1A10] transition-colors duration-200"
         >
           <PlusCircle className="h-3.5 w-3.5" />
           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
             Adicionar Reserva
           </span>
         </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort('guestName')} className="cursor-pointer">Hóspede {getSortIndicator('guestName')}</TableHead>
              <TableHead onClick={() => requestSort('roomNumber')} className="cursor-pointer hidden md:table-cell">Quarto {getSortIndicator('roomNumber')}</TableHead>
              <TableHead onClick={() => requestSort('startDate')} className="cursor-pointer">Check-in {getSortIndicator('startDate')}</TableHead>
              <TableHead onClick={() => requestSort('endDate')} className="cursor-pointer hidden md:table-cell">Check-out {getSortIndicator('endDate')}</TableHead>
              <TableHead onClick={() => requestSort('value')} className="cursor-pointer text-right">Valor {getSortIndicator('value')}</TableHead>
              <TableHead><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium">{res.guestName}</TableCell>
                <TableCell className="hidden md:table-cell">{String(res.roomNumber).padStart(2, '0')}</TableCell>
                <TableCell>{format(parseISO(res.startDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="hidden md:table-cell">{format(parseISO(res.endDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-right">{res.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditReservation(res)}><Edit className="mr-2 h-4 w-4"/>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteClick(res)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {sortedReservations.length === 0 && !loading && (
          <div className="text-center py-10 text-muted-foreground">Nenhuma reserva encontrada.</div>
        )}
      </CardContent>
    </Card>
  );
  
  const renderMobileList = () => (
     <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Reservas</h2>
                <p className="text-muted-foreground">Gerencie todas as reservas.</p>
            </div>
            <Button onClick={handleAddReservation} size="icon"><PlusCircle className="h-4 w-4"/></Button>
        </div>
        {sortedReservations.map(res => (
            <Card key={res.id}>
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg">{res.guestName}</CardTitle>
                        <CardDescription>Quarto {String(res.roomNumber).padStart(2, '0')}</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="-mt-2 -mr-2"><MoreHorizontal className="h-4 w-4"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem onClick={() => handleEditReservation(res)}><Edit className="mr-2 h-4 w-4"/>Editar</DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleDeleteClick(res)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/>Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {format(parseISO(res.startDate), 'dd/MM/yy', {locale: ptBR})} - {format(parseISO(res.endDate), 'dd/MM/yy', {locale: ptBR})}
                    </p>
                    <p className="text-lg font-semibold mt-2">{res.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </CardContent>
            </Card>
        ))}
         {sortedReservations.length === 0 && !loading && (
          <div className="text-center py-10 text-muted-foreground">Nenhuma reserva encontrada.</div>
        )}
     </div>
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="hidden sm:block">
        {renderDesktopTable()}
      </div>
      <div className="sm:hidden">
        {renderMobileList()}
      </div>

      <ReservationForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        reservation={selectedReservation}
      />
      
      <AlertDialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente a reserva de
                <span className="font-semibold"> {deleteConfirmation?.guestName} </span> 
                para o quarto 
                <span className="font-semibold"> {deleteConfirmation?.roomNumber}</span>.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin"/> : "Sim, excluir"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
