'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useReservations } from '@/contexts/ReservationsContext';
import { NAV_ITEMS, isActive } from './nav';

export default function Sidebar() {
  const pathname = usePathname();
  const { pending } = useReservations();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-card sm:flex">
      <Link href="/dashboard" className="flex items-center gap-3 border-b px-5 py-5">
        <Image src="/logo-pousada.png" alt="Pousada Romelândia" width={44} height={44} className="h-11 w-11 object-contain" />
        <div className="leading-tight">
          <p className="font-headline text-lg text-foreground">Pousada <span className="text-primary">Romelândia</span></p>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Painel</p>
        </div>
      </Link>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive(pathname, item.href)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span className="flex-1">{item.label}</span>
            {'badge' in item && pending.length > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">{pending.length}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
