import { NavLink, useNavigate } from "react-router-dom";
import { Icons } from "../ui/Icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducer/authReducer";
import { motion } from "framer-motion";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: Icons.LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Icons.ArrowUpRight },
    { name: "Analytics", path: "/analytics", icon: Icons.BarChart3 },
    { name: "Settings", path: "/settings", icon: Icons.Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-72 h-screen border-r border-muted flex flex-col glass lg:sticky lg:top-0"
    >
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Icons.Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-main">
          Smart<span className="text-brand-primary">Pay</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 pt-4">
        {navItems.map((item, index) => (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            key={item.path}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                  ? "bg-brand-primary/10 text-brand-primary font-medium"
                  : "text-muted hover:text-main hover:bg-white/5"}
              `}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-muted">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-300 group"
        >
          <Icons.LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
