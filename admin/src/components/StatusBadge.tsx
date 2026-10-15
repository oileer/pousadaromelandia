import { cn } from '@/lib/utils';
import { STATUS_LABEL, statusOf } from '@/lib/constants';
import type { Reservation } from '@/lib/types';

const STYLE: Record<string, string> = {
  pendente: 'bg-amber-100 text-amber-800',
  confirmada: 'bg-emerald-100 text-emerald-800',
  hospedada: 'bg-sky-100 text-sky-800',
  concluida: 'bg-stone-200 text-stone-700',
  cancelada: 'bg-red-100 text-red-800',
};

export default function StatusBadge({ reservation }: { reservation: Pick<Reservation, 'status'> }) {
  const s = statusOf(reservation);
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold', STYLE[s])}>
      {STATUS_LABEL[s]}
    </span>
  );
}
