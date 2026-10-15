'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { collection, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation, ReservationStatus } from '@/lib/types';
import { blocksRoom, lockId, nightsOf, statusOf } from '@/lib/constants';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import { addDays, eachDayOfInterval, format, isWithinInterval, startOfDay, parseISO, endOfMonth, startOfMonth } from 'date-fns';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type RevenueFilterOption = 'next7days' | 'next30days' | 'thisMonth';

type ReservationInput = Omit<Reservation, 'id' | 'createdAt'>;

interface ReservationsContextType {
  reservations: Reservation[];
  /** Reservas que contam para ocupação e receita (sem pendentes nem canceladas). */
  live: Reservation[];
  pending: Reservation[];
  loading: boolean;
  createReservation: (data: ReservationInput) => Promise<void>;
  updateReservation: (id: string, data: Partial<ReservationInput>) => Promise<void>;
  setStatus: (id: string, status: ReservationStatus) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
  reservationsByDay: Record<string, Reservation[]>;
  todayOccupancy: number;
  next7DaysOccupancy: { reservations: number; people: number };
  calculateRevenueForPeriod: (filter: RevenueFilterOption) => number;
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined);

/** Firestore rejeita `undefined`. */
const clean = <T extends object>(o: T): T =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;

const isLive = (r: Reservation) => !['pendente', 'cancelada'].includes(statusOf(r));

export const ReservationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [locks, setLocks] = useState<Set<string> | null>(null);
  const [loading, setLoading] = useState(true);
  const syncedRef = useRef('');

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setLocks(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'reservations'), orderBy('startDate', 'asc'));
    const unsubRes = onSnapshot(q, (snap) => {
      setReservations(snap.docs.map(d => ({ ...d.data(), id: d.id } as Reservation)));
      setLoading(false);
    }, (error) => {
      console.error('Error fetching reservations: ', error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        operation: 'list',
        path: 'reservations',
      }));
      toast({
        title: 'Erro ao buscar reservas',
        description: 'Não foi possível carregar os dados. Tente novamente mais tarde.',
        variant: 'destructive',
      });
      setLoading(false);
    });
    const unsubLocks = onSnapshot(collection(db, 'roomDays'), (snap) => {
      setLocks(new Set(snap.docs.map(d => d.id)));
    }, (error) => console.warn('roomDays indisponível (regras do banco ainda não publicadas?)', error));

    return () => { unsubRes(); unsubLocks(); };
  }, [user]);

  /**
   * Cada noite ocupada vira um documento `roomDays/{quarto}_{data}` criado junto com a reserva.
   * As regras do banco só permitem CRIAR esse documento, então duas reservas simultâneas
   * para o mesmo quarto/noite não passam: a segunda falha no commit.
   * Reservas antigas (sem bloqueio) são sincronizadas uma vez aqui.
   */
  useEffect(() => {
    if (!user || locks === null || reservations.length === 0) return;
    const missing = reservations.filter(r => blocksRoom(r) &&
      nightsOf(r.startDate, r.endDate).some(n => !locks.has(lockId(r.roomNumber!, n))));
    const signature = missing.map(r => r.id).join(',');
    if (!signature || syncedRef.current === signature) return;
    syncedRef.current = signature;
    (async () => {
      for (const r of missing) {
        try {
          const batch = writeBatch(db);
          for (const n of nightsOf(r.startDate, r.endDate)) {
            if (locks.has(lockId(r.roomNumber!, n))) continue;
            batch.set(doc(db, 'roomDays', lockId(r.roomNumber!, n)), { room: r.roomNumber, date: n, reservationId: r.id });
          }
          await batch.commit();
        } catch (e) {
          console.warn('Bloqueio não sincronizado (possível sobreposição antiga):', r.id, e);
        }
      }
    })();
  }, [user, locks, reservations]);

  const findOverlap = (candidate: { roomNumber: number | null; startDate: string; endDate: string; status?: ReservationStatus }, excludeId?: string) => {
    if (!blocksRoom(candidate)) return undefined;
    return reservations.find(r => r.id !== excludeId && blocksRoom(r) && r.roomNumber === candidate.roomNumber &&
      parseISO(candidate.startDate) < parseISO(r.endDate) && parseISO(candidate.endDate) > parseISO(r.startDate));
  };

  const conflictToast = (room: number | null) => toast({
    title: 'Conflito de datas',
    description: `O quarto ${room} já está ocupado em parte desse período.`,
    variant: 'destructive',
  });

  /** Grava a reserva e ajusta os bloqueios de datas numa única operação atômica. */
  const persist = async (id: string, previous: Reservation | null, next: Omit<Reservation, 'createdAt'> & { createdAt?: unknown }) => {
    const batch = writeBatch(db);
    const oldIds = new Set(previous && blocksRoom(previous) ? nightsOf(previous.startDate, previous.endDate).map(n => lockId(previous.roomNumber!, n)) : []);
    const newIds = new Set(blocksRoom(next as Reservation) ? nightsOf(next.startDate, next.endDate).map(n => lockId(next.roomNumber!, n)) : []);
    oldIds.forEach(l => { if (!newIds.has(l)) batch.delete(doc(db, 'roomDays', l)); });
    newIds.forEach(l => {
      if (oldIds.has(l) && locks?.has(l)) return;
      const [room, date] = l.split('_');
      batch.set(doc(db, 'roomDays', l), { room: Number(room), date, reservationId: id });
    });
    batch.set(doc(db, 'reservations', id), clean(next));
    try {
      await batch.commit();
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
      if (newIds.size > 0) conflictToast(next.roomNumber);
      else {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: `reservations/${id}`, operation: 'write', requestResourceData: next }));
        toast({ title: 'Erro ao salvar', description: 'Não foi possível salvar. Verifique as permissões.', variant: 'destructive' });
      }
      throw error;
    }
  };

  const createReservation = async (data: ReservationInput) => {
    if (!user) {
      toast({ title: 'Erro de Autenticação', description: 'Você precisa estar logado.', variant: 'destructive' });
      throw new Error('User not authenticated');
    }
    if (findOverlap(data)) { conflictToast(data.roomNumber); throw new Error('Overlapping reservation'); }
    const id = doc(collection(db, 'reservations')).id;
    await persist(id, null, {
      ...data,
      id,
      status: data.status ?? 'confirmada',
      origem: data.origem ?? 'balcao',
      createdAt: serverTimestamp(),
    });
    toast({ title: 'Reserva criada', description: 'A reserva foi adicionada.' });
  };

  const updateReservation = async (id: string, data: Partial<ReservationInput>) => {
    const original = reservations.find(r => r.id === id);
    if (!original) throw new Error('Reservation not found');
    const merged = { ...original, ...data, id };
    if (findOverlap(merged, id)) { conflictToast(merged.roomNumber); throw new Error('Overlapping reservation'); }
    await persist(id, original, merged);
    toast({ title: 'Reserva atualizada', description: 'As alterações foram salvas.' });
  };

  const setStatus = async (id: string, status: ReservationStatus) => {
    await updateReservation(id, { status });
  };

  const deleteReservation = async (id: string) => {
    const original = reservations.find(r => r.id === id);
    try {
      const batch = writeBatch(db);
      if (original && blocksRoom(original)) {
        nightsOf(original.startDate, original.endDate).forEach(n => batch.delete(doc(db, 'roomDays', lockId(original.roomNumber!, n))));
      }
      batch.delete(doc(db, 'reservations', id));
      await batch.commit();
      toast({ title: 'Reserva excluída', description: 'A reserva foi removida.' });
    } catch (error) {
      console.error('Error deleting reservation: ', error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: `reservations/${id}`, operation: 'delete' }));
      toast({ title: 'Erro ao excluir', description: 'Não foi possível excluir a reserva.', variant: 'destructive' });
      throw error;
    }
  };

  const live = useMemo(() => reservations.filter(isLive), [reservations]);
  const pending = useMemo(() => reservations.filter(r => statusOf(r) === 'pendente'), [reservations]);

  const calculateRevenueForPeriod = useCallback((filter: RevenueFilterOption): number => {
    const today = startOfDay(new Date());
    let interval: { start: Date; end: Date };
    switch (filter) {
      case 'next7days': interval = { start: today, end: addDays(today, 6) }; break;
      case 'next30days': interval = { start: today, end: addDays(today, 29) }; break;
      case 'thisMonth': interval = { start: startOfMonth(today), end: endOfMonth(today) }; break;
    }
    return live.reduce((sum, r) => isWithinInterval(parseISO(r.startDate), interval) ? sum + (r.value || 0) : sum, 0);
  }, [live]);

  const derivedData = useMemo(() => {
    const today = startOfDay(new Date());
    const todayStr = format(today, 'yyyy-MM-dd');
    const next7DaysInterval = { start: today, end: addDays(today, 6) };

    const reservationsByDay: Record<string, Reservation[]> = {};
    eachDayOfInterval(next7DaysInterval).forEach(day => { reservationsByDay[format(day, 'yyyy-MM-dd')] = []; });

    let todayOccupancy = 0;
    const next7Ids = new Set<string>();
    let next7People = 0;

    for (const res of live) {
      const resStart = parseISO(res.startDate);
      const resEnd = parseISO(res.endDate);

      // hoje conta se estiver entre check-in e a véspera do check-out
      if (res.startDate <= todayStr && todayStr < res.endDate) todayOccupancy++;

      if (resStart < resEnd) {
        eachDayOfInterval({ start: resStart, end: addDays(resEnd, -1) }).forEach(day => {
          const dayStr = format(day, 'yyyy-MM-dd');
          if (reservationsByDay[dayStr]) reservationsByDay[dayStr].push(res);
        });
      }

      if (isWithinInterval(resStart, next7DaysInterval) || isWithinInterval(today, { start: resStart, end: resEnd })) {
        if (!next7Ids.has(res.id)) { next7Ids.add(res.id); next7People += res.people; }
      }
    }

    return {
      reservationsByDay,
      todayOccupancy,
      next7DaysOccupancy: { reservations: next7Ids.size, people: next7People },
    };
  }, [live]);

  return (
    <ReservationsContext.Provider value={{
      reservations, live, pending, loading,
      createReservation, updateReservation, setStatus, deleteReservation,
      calculateRevenueForPeriod, ...derivedData,
    }}>
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (context === undefined) throw new Error('useReservations must be used within a ReservationsProvider');
  return context;
};
