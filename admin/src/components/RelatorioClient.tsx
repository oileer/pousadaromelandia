'use client';

import { useMemo, useState } from 'react';
import { addMonths, endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { useReservations } from '@/contexts/ReservationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ORIGIN_LABEL, TOTAL_ROOMS, brl, nightsOf, statusOf } from '@/lib/constants';

export default function RelatorioClient() {
  const { live, reservations, loading } = useReservations();
  const [month, setMonth] = useState(() => startOfMonth(new Date()));

  const data = useMemo(() => {
    const first = format(month, 'yyyy-MM-dd');
    const last = format(endOfMonth(month), 'yyyy-MM-dd');
    const inMonth = live.filter(r => r.startDate >= first && r.startDate <= last);
    const revenue = inMonth.reduce((s, r) => s + (r.value || 0), 0);
    const received = inMonth.reduce((s, r) => s + (r.paid || 0), 0);
    const nights = live.reduce((s, r) => s + nightsOf(r.startDate, r.endDate).filter(n => n >= first && n <= last).length, 0);
    const daysInMonth = endOfMonth(month).getDate();
    const occupancy = nights / (TOTAL_ROOMS * daysInMonth);
    const byOrigin: Record<string, { n: number; v: number }> = {};
    inMonth.forEach(r => {
      const k = ORIGIN_LABEL[r.origem ?? 'balcao'];
      byOrigin[k] = byOrigin[k] ?? { n: 0, v: 0 };
      byOrigin[k].n++;
      byOrigin[k].v += r.value || 0;
    });
    const canceled = reservations.filter(r => statusOf(r) === 'cancelada' && r.startDate >= first && r.startDate <= last).length;
    return { inMonth, revenue, received, nights, occupancy, byOrigin, canceled, daysInMonth };
  }, [live, reservations, month]);

  const exportCsv = () => {
    const rows = [['Hóspede', 'Telefone', 'Quarto', 'Check-in', 'Check-out', 'Pessoas', 'Origem', 'Situação', 'Valor', 'Pago', 'Forma de pagamento']];
    data.inMonth.forEach(r => rows.push([
      r.guestName, r.phone ?? '', String(r.roomNumber ?? ''), r.startDate, r.endDate, String(r.people),
      ORIGIN_LABEL[r.origem ?? 'balcao'], statusOf(r), String(r.value), String(r.paid ?? 0), r.paymentMethod ?? '',
    ]));
    const csv = rows.map(row => row.map(c => `"${c.replace(/"/g, '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservas-${format(month, 'yyyy-MM')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const kpis = [
    { label: 'Receita prevista', value: brl(data.revenue) },
    { label: 'Já recebido', value: brl(data.received) },
    { label: 'A receber', value: brl(Math.max(0, data.revenue - data.received)) },
    { label: 'Reservas', value: String(data.inMonth.length) },
    { label: 'Diárias vendidas', value: String(data.nights) },
    { label: 'Ocupação', value: `${(data.occupancy * 100).toFixed(0)}%` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="mr-auto font-headline text-3xl capitalize">{format(month, 'MMMM yyyy', { locale: ptBR })}</h2>
        <Button variant="outline" size="icon" onClick={() => setMonth(m => addMonths(m, -1))}><ChevronLeft className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" onClick={() => setMonth(m => addMonths(m, 1))}><ChevronRight className="h-4 w-4" /></Button>
        <Button onClick={exportCsv} className="gap-2" disabled={data.inMonth.length === 0}><Download className="h-4 w-4" />Exportar CSV</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {kpis.map(k => (
          <Card key={k.label}>
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-2xl font-semibold">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="font-headline text-xl">Origem das reservas</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Object.keys(data.byOrigin).length === 0 && <p className="text-sm text-muted-foreground">Sem reservas neste mês.</p>}
            {Object.entries(data.byOrigin).map(([k, v]) => (
              <div key={k}>
                <div className="mb-1 flex justify-between text-sm"><span>{k}</span><span className="text-muted-foreground">{v.n} · {brl(v.v)}</span></div>
                <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${(v.n / data.inMonth.length) * 100}%` }} /></div>
              </div>
            ))}
            {data.canceled > 0 && <p className="pt-2 text-xs text-muted-foreground">{data.canceled} cancelada(s) no mês, fora dos números acima.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="font-headline text-xl">Reservas do mês</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.inMonth.map(r => (
              <div key={r.id} className="flex items-center justify-between border-b pb-2 text-sm last:border-0">
                <span>{r.guestName} <span className="text-muted-foreground">· {format(parseISO(r.startDate), 'dd/MM')}</span></span>
                <span className="font-medium">{brl(r.value)}</span>
              </div>
            ))}
            {data.inMonth.length === 0 && <p className="text-sm text-muted-foreground">Nada por aqui ainda.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
