'use client';

import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useReservations } from '@/contexts/ReservationsContext';
import { NAV_ITEMS, isActive } from './nav';

export default function Sidebar() {
  const pathname = usePathname();
  const { pending } = useReservations();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-card sm:flex">
      <Link href="/dashboard" className="flex items-center border-b px-5 py-5">
        <BrandLogo height={34} />
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
              <span className="rounded-full bg-[#C9A24B] px-2 py-0.5 text-[11px] font-bold text-[#0B1F3A]">{pending.length}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
