'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta.',
      });
      // O useEffect cuida do redirecionamento
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro de Autenticação',
        description: 'Credenciais inválidas. Verifique seu e-mail e senha.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    /*
      Tela de login — paleta da Pousada Romelândia
      Fundo bipartido: metade vermelho primário, metade off-white
    */
    <div className="flex min-h-screen">

      {/* Painel esquerdo — cor primária com imagem de fundo */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-primary px-12 text-primary-foreground relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, #C0392B 0%, #8B1A10 100%)",
        }}
      >
        {/* Círculo decorativo de fundo */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />

        <div className="relative z-10 text-center">
          <Image
            src="/logo.ico"
            alt="Pousada Romelândia"
            width={256}
            height={256}
            className="mx-auto mb-6 opacity-90"
          />
          <h1 className="font-headline text-4xl font-bold mb-3">
            Pousada Romelândia
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Painel de Gestão de Reservas
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
            <span>★★★★½</span>
            <span>4,5 · 60 avaliações Google</span>
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm animate-fade-in-up">

          {/* Logo visível só no mobile */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/logo400x200.png"
              alt="Pousada Romelândia"
              width={120}
              height={60}
              className="mx-auto mb-3"
            />
            <h1 className="font-headline text-2xl font-bold text-foreground">
              Pousada Romelândia
            </h1>
          </div>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-2xl font-bold text-foreground">
                Entrar
              </CardTitle>
              <CardDescription className="font-body text-muted-foreground">
                Acesse o painel de controle de reservas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body font-semibold text-sm">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@pousadaromelandia.com.br"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="font-body focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-body font-semibold text-sm">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="font-body focus-visible:ring-primary"
                  />
                </div>

                {/* Botão usa a cor primária da pousada */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-body font-semibold transition-colors duration-200 hover:bg-[#8B1A10]"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Entrar'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground font-body">
            R. Doze de Outubro, 798 — Centro, Romelândia SC
          </p>
        </div>
      </div>

    </div>
  );
}
