import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkClass = ({ isActive }: any) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow">

      <div className="p-6 font-bold text-xl">
        Expense Tracker
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          Transactions
        </NavLink>
      </nav>

    </aside>
  );
}
