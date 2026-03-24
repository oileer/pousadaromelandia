'use client';

import Link from 'next/link';
import { Home, CalendarDays, BedDouble } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/* Navegação inferior mobile — substitui o Sheet lateral */
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard',              icon: Home,         label: 'Início'   },
    { href: '/dashboard/schedule',     icon: CalendarDays, label: 'Agenda'   },
    { href: '/dashboard/reservations', icon: BedDouble,    label: 'Reservas' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex sm:hidden border-t border-border bg-card shadow-lg">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (pathname.startsWith(item.href) && item.href !== '/dashboard');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-body transition-colors duration-150',
              isActive
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            )}
          >
            <item.icon
              className={cn('h-5 w-5 transition-transform duration-150', isActive && 'scale-110')}
            />
            <span>{item.label}</span>
            {/* Indicador ativo */}
            {isActive && (
              <span className="absolute top-0 h-0.5 w-10 rounded-full bg-primary" style={{ marginTop: 0 }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
