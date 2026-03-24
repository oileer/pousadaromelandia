import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import { ReservationsProvider } from "@/contexts/ReservationsContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ReservationsProvider>
        <div className="flex min-h-screen w-full flex-col bg-background">
          {/* Sidebar fixa — visível apenas em telas sm+ */}
          <Sidebar />

          <div className="flex flex-col sm:pl-14">
            <Header />
            {/* pb-20 no mobile garante que o conteúdo não fique atrás da BottomNav */}
            <main className="flex-1 overflow-y-auto p-4 pb-20 sm:px-6 sm:py-4 sm:pb-4 md:gap-8">
              {children}
            </main>
          </div>

          {/* Navegação inferior — visível apenas no mobile */}
          <BottomNav />
        </div>
      </ReservationsProvider>
    </AuthGuard>
  );
}
