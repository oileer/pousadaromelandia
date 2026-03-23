'use client';

import {
  Home,
  LogOut,
  Menu,
  Users,
  BedDouble,
  CalendarDays
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Erro ao sair',
        description: 'Houve um problema ao tentar se desconectar.',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/schedule', icon: CalendarDays, label: 'Agenda Semanal' },
    { href: '/dashboard/reservations', icon: BedDouble, label: 'Todas as Reservas' },
  ];

  const getPageTitle = () => {
    const currentItem = navItems.find(item => pathname === item.href);
    return currentItem?.label || 'Dashboard';
  }

  return (
    /* Header com backdrop-filter blur ao scrollar (sticky no mobile) */
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:backdrop-blur-none">

      {/* Menu hambúrguer — mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            {/* Logo no menu mobile */}
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 md:text-base"
            >
              <Image src="/logo400x200.png" alt="Pousada Romelândia" width={32} height={32} className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Pousada Romelândia</span>
            </Link>

            {/* Nome da pousada no menu mobile */}
            <span className="font-headline text-base font-semibold text-foreground -mt-3">
              Pousada Romelândia
            </span>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-2.5 transition-colors duration-150',
                  pathname === item.href
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Título da página — usa Playfair Display */}
      <div className="relative ml-auto flex-1 md:grow-0">
        <h1 className="font-headline text-lg font-semibold md:text-xl">
          {getPageTitle()}
        </h1>
      </div>

      {/* Menu do usuário */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full border-primary/30 hover:border-primary transition-colors duration-200"
            title={user?.email || 'Minha Conta'}
          >
            <Users className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-body text-sm">
            {user?.email || 'Minha Conta'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-primary hover:text-primary focus:text-primary">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
