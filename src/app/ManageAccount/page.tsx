import React from "react";
import { Sidebar } from "../components/ManageAccount/MA_Sidebar/Sidebar";
import { Dashboard } from "../components/ManageAccount/MA_Dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoute.tsx";

const ManageAccount = () => {
  return (
    <ProtectedRoute>
      <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
        <Sidebar />
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
};

export default ManageAccount;
