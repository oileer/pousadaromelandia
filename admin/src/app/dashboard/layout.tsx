import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
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
          <Sidebar />
          <div className="flex flex-col sm:pl-14">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:px-6 sm:py-4 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </ReservationsProvider>
    </AuthGuard>
  );
}
