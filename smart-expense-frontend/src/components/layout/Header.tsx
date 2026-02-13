import { Icons } from "../ui/Icons";
import { useTheme } from "../../store/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/reducer/uiReducer";
import type { RootState } from "../../store/store";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.ui.searchTerm);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 border-b border-muted flex items-center justify-between px-8 glass sticky top-0 z-40 backdrop-blur-md"
    >
      <div className="flex items-center gap-4 bg-white/5 border border-muted px-4 py-2 rounded-xl w-96 group focus-within:border-brand-primary/50 transition-all">
        <Icons.Search className="w-5 h-5 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search transactions..."
          className="bg-transparent border-none outline-none text-sm text-main placeholder:text-muted w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-muted transition-all relative overflow-hidden group"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "light" ? (
                <Icons.Moon className="w-5 h-5 text-brand-primary" />
              ) : (
                <Icons.Sun className="w-5 h-5 text-yellow-400" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>

        <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
          <Icons.Bell className="w-6 h-6 text-muted group-hover:text-main transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-secondary rounded-full ring-2 ring-bg-main" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-muted">
          <div className="text-right">
            <p className="text-sm font-medium text-main">Account</p>
            <p className="text-xs text-muted">Free Tier</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-muted flex items-center justify-center">
            <Icons.User className="w-6 h-6 text-muted" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
