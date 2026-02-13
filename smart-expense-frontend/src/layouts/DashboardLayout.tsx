import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import BackgroundEffects from "../components/layout/BackgroundEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      <BackgroundEffects />

      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 z-10">
        <Header />

        <main className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
