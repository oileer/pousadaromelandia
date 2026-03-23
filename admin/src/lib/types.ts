import type { Timestamp } from "firebase/firestore";

export interface Reservation {
  id: string;
  guestName: string;
  roomNumber: number;
  people: number;
  value: number;
  startDate: string; // ISO String YYYY-MM-DD
  endDate: string; // ISO String YYYY-MM-DD
  notes?: string;
  createdAt: Timestamp;
}
