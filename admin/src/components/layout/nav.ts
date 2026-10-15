import { Home, BedDouble, CalendarDays, CalendarRange, Inbox, BarChart3, Users } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Início' },
  { href: '/dashboard/pendentes', icon: Inbox, label: 'Solicitações do site', badge: true },
  { href: '/dashboard/schedule', icon: CalendarDays, label: 'Próximos 7 dias' },
  { href: '/dashboard/calendario', icon: CalendarRange, label: 'Calendário por quarto' },
  { href: '/dashboard/reservations', icon: BedDouble, label: 'Todas as reservas' },
  { href: '/dashboard/clientes', icon: Users, label: 'Clientes' },
  { href: '/dashboard/relatorio', icon: BarChart3, label: 'Relatório mensal' },
] as const;

export const isActive = (pathname: string, href: string) =>
  href === '/dashboard' ? pathname === href : pathname.startsWith(href);
