import { Sidebar } from "../components/MainPage/MP_Sidebar/Sidebar";
import { Dashboard } from "../components/MainPage/MP_Dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoute.tsx";

export default function home() {
  return (
    <ProtectedRoute>
      <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
}
