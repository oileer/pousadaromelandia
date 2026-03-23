'use client';

import Link from 'next/link';
import { Home, BedDouble, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/schedule', icon: CalendarDays, label: 'Agenda Semanal' },
    { href: '/dashboard/reservations', icon: BedDouble, label: 'Todas as Reservas' },
  ];

  return (
    /* Sidebar com fundo branco e borda sutil — segue a paleta do front-end */
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border bg-card sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {/* Logo — círculo com cor primária da pousada */}
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 md:h-8 md:w-8 md:text-base"
          title="Pousada Romelândia"
        >
          <Image src="/logo400x200.png" alt="Pousada Romelândia" width={24} height={24} className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Pousada Romelândia</span>
        </Link>

        <TooltipProvider>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 md:h-8 md:w-8',
                      isActive
                        /* Item ativo: vermelho da pousada */
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-body text-sm">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
