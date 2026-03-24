'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/lib/types';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import { addDays, eachDayOfInterval, format, isWithinInterval, startOfDay, parseISO, endOfMonth, startOfMonth } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type RevenueFilterOption = 'next7days' | 'next30days' | 'thisMonth';

interface ReservationsContextType {
  reservations: Reservation[];
  loading: boolean;
  createReservation: (data: Omit<Reservation, 'id' | 'createdAt'>) => Promise<void>;
  updateReservation: (id: string, data: Partial<Omit<Reservation, 'id' | 'createdAt'>>) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
  reservationsByDay: Record<string, Reservation[]>;
  todayOccupancy: number;
  next7DaysOccupancy: { reservations: number; people: number };
  calculateRevenueForPeriod: (filter: RevenueFilterOption) => number;
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined);

export const ReservationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'reservations'), orderBy('startDate', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Reservation));
      setReservations(reservationsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reservations: ", error);
      const contextualError = new FirestorePermissionError({
          operation: 'list',
          path: (q as any)._query.path.canonicalString(),
      });
      errorEmitter.emit('permission-error', contextualError);
      toast({
        title: "Erro ao buscar reservas",
        description: "Não foi possível carregar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const isOverlap = (newRes: Omit<Reservation, 'id' | 'createdAt' | 'createdAt'>, existingReservations: Reservation[], excludeId?: string): boolean => {
    for (const existingRes of existingReservations) {
      if (excludeId && existingRes.id === excludeId) continue;
      if (newRes.roomNumber === existingRes.roomNumber) {
        const newStart = parseISO(newRes.startDate);
        const newEnd = parseISO(newRes.endDate);
        const existingStart = parseISO(existingRes.startDate);
        const existingEnd = parseISO(existingRes.endDate);

        if (newStart < existingEnd && newEnd > existingStart) {
          return true;
        }
      }
    }
    return false;
  };

  const createReservation = async (data: Omit<Reservation, 'id' | 'createdAt'>) => {
    if (!user) {
      toast({
        title: "Erro de Autenticação",
        description: "Você precisa estar logado para criar uma reserva.",
        variant: "destructive",
      });
      throw new Error("User not authenticated");
    }
  
    const newDocRef = doc(collection(db, 'reservations'));
    const reservationData = { ...data, id: newDocRef.id };

    if (isOverlap(reservationData, reservations)) {
      toast({
        title: "Erro de Conflito",
        description: `Já existe uma reserva para o quarto ${data.roomNumber} neste período.`,
        variant: "destructive",
      });
      throw new Error("Overlapping reservation");
    }
    
    const finalData = { ...reservationData, createdAt: serverTimestamp() };

    try {
      await setDoc(newDocRef, finalData);
      toast({
        title: "Reserva Criada!",
        description: "A nova reserva foi adicionada com sucesso.",
      });
    } catch (error) {
      console.error("Error creating reservation: ", error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: newDocRef.path,
        operation: 'create',
        requestResourceData: finalData,
      }));
      toast({
        title: "Erro ao Criar Reserva",
        description: "Não foi possível criar a reserva. Verifique as permissões.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateReservation = async (id: string, data: Partial<Omit<Reservation, 'id' | 'createdAt'>>) => {
    const originalRes = reservations.find(r => r.id === id);
    if (!originalRes) throw new Error("Reservation not found");

    const updatedData = { ...originalRes, ...data };
    if (isOverlap(updatedData, reservations, id)) {
       toast({
        title: "Erro de Conflito",
        description: `Já existe uma reserva para o quarto ${updatedData.roomNumber} neste período.`,
        variant: "destructive",
      });
      throw new Error("Overlapping reservation");
    }

    const resDoc = doc(db, 'reservations', id);
    const updatePayload = { ...data, id };

    try {
      await updateDoc(resDoc, updatePayload);
      toast({
        title: "Reserva Atualizada!",
        description: "A reserva foi atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Error updating reservation: ", error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: resDoc.path,
        operation: 'update',
        requestResourceData: updatePayload,
      }));
      toast({
        title: "Erro ao Atualizar Reserva",
        description: "Não foi possível atualizar a reserva.",
        variant: "destructive",
      });
      throw error;
    }
  };


  const deleteReservation = async (id: string) => {
    const resDoc = doc(db, 'reservations', id);

    try {
      await deleteDoc(resDoc);
      toast({
        title: "Reserva Excluída",
        description: "A reserva foi removida com sucesso.",
      });
    } catch (error) {
      console.error("Error deleting reservation: ", error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: resDoc.path,
        operation: 'delete',
      }));
      toast({
        title: "Erro ao Excluir Reserva",
        description: "Não foi possível excluir a reserva.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const calculateRevenueForPeriod = useCallback((filter: RevenueFilterOption): number => {
    const today = startOfDay(new Date());
    let interval: { start: Date; end: Date };

    switch (filter) {
      case 'next7days':
        interval = { start: today, end: addDays(today, 6) };
        break;
      case 'next30days':
        interval = { start: today, end: addDays(today, 29) };
        break;
      case 'thisMonth':
        interval = { start: startOfMonth(today), end: endOfMonth(today) };
        break;
    }

    let totalRevenue = 0;
    const includedIds = new Set<string>();

    for (const res of reservations) {
      if (includedIds.has(res.id)) continue;
      const resStart = parseISO(res.startDate);
      if (isWithinInterval(resStart, interval)) {
        totalRevenue += res.value;
        includedIds.add(res.id);
      }
    }
    return totalRevenue;
  }, [reservations]);
  
  const derivedData = useMemo(() => {
    const today = startOfDay(new Date());
    const next7DaysInterval = { start: today, end: addDays(today, 6) };

    const reservationsByDay: Record<string, Reservation[]> = {};
     eachDayOfInterval({start: today, end: addDays(today, 6)}).forEach(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        reservationsByDay[dayStr] = [];
    });

    let todayOccupancy = 0;
    
    const next7DaysResIds = new Set<string>();
    let next7DaysPeople = 0;

    for (const res of reservations) {
      const resStart = parseISO(res.startDate);
      const resEnd = parseISO(res.endDate);

       if (isWithinInterval(today, { start: resStart, end: resEnd })) {
          // Check if today is strictly before the end date, as check-out day is free
          if (format(today, 'yyyy-MM-dd') !== format(resEnd, 'yyyy-MM-dd')) {
            todayOccupancy++;
          }
       }
      
      // Corrected logic for populating reservationsByDay
      if (resStart < resEnd) {
        eachDayOfInterval({ start: resStart, end: addDays(resEnd, -1) }).forEach(day => {
          const dayStr = format(day, 'yyyy-MM-dd');
          if (reservationsByDay[dayStr]) { 
              reservationsByDay[dayStr].push(res);
          }
        });
      }
      
       const reservationInterval = { start: resStart, end: resEnd };
       if (isWithinInterval(resStart, next7DaysInterval) || isWithinInterval(next7DaysInterval.start, reservationInterval)) {
          if (!next7DaysResIds.has(res.id)) {
            next7DaysResIds.add(res.id);
            next7DaysPeople += res.people;
          }
      }
    }
    
    return {
      reservationsByDay,
      todayOccupancy,
      next7DaysOccupancy: {
          reservations: next7DaysResIds.size,
          people: next7DaysPeople
      },
    }
  }, [reservations]);


  return (
    <ReservationsContext.Provider value={{ reservations, loading, createReservation, updateReservation, deleteReservation, calculateRevenueForPeriod, ...derivedData }}>
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationsProvider');
  }
  return context;
};
