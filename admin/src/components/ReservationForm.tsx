'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useReservations } from '@/contexts/ReservationsContext';
import { Reservation } from '@/lib/types';
import { TOTAL_ROOMS, MAX_PEOPLE_PER_ROOM } from '@/lib/constants';

interface ReservationFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  reservation?: Reservation | null;
  prefilledDate?: string;
}

const formSchema = z.object({
  guestName: z.string().min(1, { message: 'Nome do hóspede é obrigatório.' }),
  roomNumber: z.coerce.number().min(1, 'Número do quarto é obrigatório.'),
  people: z.coerce.number().min(1, 'Número de pessoas é obrigatório.'),
  value: z.coerce.number().min(0, 'O valor da reserva deve ser positivo.'),
  startDate: z.string().min(1, 'Data de check-in é obrigatória.'),
  endDate: z.string().min(1, 'Data de check-out é obrigatória.'),
  notes: z.string().optional(),
}).refine(data => data.endDate >= data.startDate, {
  message: 'A data de check-out não pode ser anterior à data de check-in.',
  path: ['endDate'],
});

export default function ReservationForm({
  isOpen,
  onOpenChange,
  reservation,
  prefilledDate
}: ReservationFormProps) {
  const { createReservation, updateReservation } = useReservations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: '',
      roomNumber: undefined,
      people: undefined,
      value: 0,
      startDate: '',
      endDate: '',
      notes: '',
    },
  });
  
  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
      if (reservation) {
        form.reset({
          ...reservation,
          value: reservation.value,
        });
      } else {
        form.reset({
          guestName: '',
          roomNumber: undefined,
          people: undefined,
          value: 0,
          startDate: prefilledDate || '',
          endDate: '',
          notes: '',
        });
      }
    }
  }, [isOpen, reservation, form, prefilledDate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (reservation) {
        // Ensure ID is part of the update payload for the context method
        const updatePayload = { ...values, id: reservation.id };
        await updateReservation(reservation.id, updatePayload);
      } else {
        await createReservation(values);
      }
      onOpenChange(false);
    } catch (error) {
      // Errors are now handled and toasted within the context, 
      // but we can log them here for debugging if needed.
      console.error("Failed to submit reservation form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{reservation ? 'Editar Reserva' : 'Adicionar Reserva'}</DialogTitle>
          <DialogDescription>
            {reservation ? 'Atualize os detalhes da reserva.' : 'Preencha os detalhes para uma nova reserva.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto -mr-6 pr-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="guestName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Hóspede</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Maria Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quarto</FormLabel>
                       <Select onValueChange={field.onChange} value={String(field.value ?? '')}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um quarto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(TOTAL_ROOMS)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Quarto {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="people"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nº de Pessoas</FormLabel>
                       <Select onValueChange={field.onChange} value={String(field.value ?? '')}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nº de pessoas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {[...Array(MAX_PEOPLE_PER_ROOM)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1} {i + 1 > 1 ? 'pessoas' : 'pessoa'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da Reserva (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 450.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Pediu berço no quarto." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-0 -mx-6 px-6 border-t">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {reservation ? 'Salvar Alterações' : 'Criar Reserva'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
