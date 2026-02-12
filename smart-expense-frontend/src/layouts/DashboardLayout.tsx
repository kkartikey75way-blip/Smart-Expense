import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
