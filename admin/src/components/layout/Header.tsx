'use client';

import { LogOut, Users } from 'lucide-react';
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
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logout realizado', description: 'Você foi desconectado com sucesso.' });
      router.push('/login');
    } catch {
      toast({ title: 'Erro ao sair', description: 'Houve um problema ao tentar se desconectar.', variant: 'destructive' });
    }
  };

  const pageTitles: Record<string, string> = {
    '/dashboard':                    'Dashboard',
    '/dashboard/schedule':           'Agenda Semanal',
    '/dashboard/reservations':       'Todas as Reservas',
  };
  const pageTitle = pageTitles[pathname] || 'Dashboard';

  return (
    /* Header — no mobile mostra só título + botão de usuário */
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/90 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:backdrop-blur-none">

      {/* Título da página */}
      <div className="flex-1">
        <h1 className="font-headline text-lg font-semibold md:text-xl">{pageTitle}</h1>
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
