import ReservationsListClient from "@/components/ReservationsListClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function AllReservationsPage() {
  return (
     <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin"/></div>}>
      <ReservationsListClient />
    </Suspense>
  );
}
