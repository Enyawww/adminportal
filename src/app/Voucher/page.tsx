import React from "react";
import { Sidebar } from "../components/Voucher/V_Sidebar/Sidebar";
import { Dashboard } from "../components/Voucher/V_Dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoute.tsx";

const Voucher = () => {
  return (
    <ProtectedRoute>
      <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
};

export default Voucher;
