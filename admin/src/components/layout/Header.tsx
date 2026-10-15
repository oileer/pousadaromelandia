'use client';

import { LogOut, Menu, Users } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useReservations } from '@/contexts/ReservationsContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { NAV_ITEMS, isActive } from './nav';

export default function Header() {
  const { user } = useAuth();
  const { pending } = useReservations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch {
      toast({ title: 'Erro ao sair', description: 'Houve um problema ao tentar se desconectar.', variant: 'destructive' });
    }
  };

  const title = NAV_ITEMS.find(i => isActive(pathname, i.href) && (i.href !== '/dashboard' || pathname === '/dashboard'))?.label ?? 'Painel';

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle><BrandLogo height={32} /></SheetTitle>
          </SheetHeader>
          <nav className="mt-6 grid gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium',
                  isActive(pathname, item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {'badge' in item && pending.length > 0 && (
                  <span className="rounded-full bg-[#C9A24B] px-2 py-0.5 text-xs font-bold text-[#0B1F3A]">{pending.length}</span>
                )}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <h1 className="font-headline text-xl text-foreground">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        {pending.length > 0 && (
          <Link href="/dashboard/pendentes" className="rounded-full bg-[#C9A24B]/25 px-3 py-1 text-xs font-bold text-[#0B1F3A]">
            {pending.length} {pending.length === 1 ? 'solicitação nova' : 'solicitações novas'}
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full"><Users className="h-5 w-5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.email || 'Minha conta'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
