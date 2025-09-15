import { Link, useLocation } from "react-router-dom";
// IMPROVEMENT: Using a consistent and high-quality icon library
import { LayoutDashboard, Users, CreditCard, ReceiptText, LogOut, UserCircle } from "lucide-react";

// IMPROVEMENT: Revamped NavLink for better active/inactive states in a dark theme.
const NavLink = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-slate-700 text-teal-400" // Active state with accent color
          : "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100" // Inactive state
      }`}
    >
      {/* IMPROVEMENT: Icon wrapper for consistent sizing */}
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Guest";

  return (
    // IMPROVEMENT: Switched to a dark slate theme that matches the dashboard. Added a border for separation.
    // Using flexbox to push the footer to the bottom.
    <aside className="w-[18rem] bg-slate-800 text-white min-h-screen p-4 flex flex-col border-r border-slate-700 hidden md:block">
      
      {/* IMPROVEMENT: Modernized logo section with an icon */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
            <ReceiptText className="w-8 h-8 text-teal-400" />
            <span className="text-2xl font-bold text-slate-100">BillingApp</span>
        </div>
        <p className="text-sm text-slate-400 mt-1">Rent & Payments</p>
      </div>

      {/* IMPROVEMENT: flex-1 makes this section grow to push the footer down */}
      <div className="flex-1">
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            label="Dashboard"
            icon={<LayoutDashboard size={20} />}
          />
          {/* Show Users menu only if Admin */}
          {role === "admin" && (
            <NavLink
              to="/users"
              label="Users"
              icon={<Users size={20} />}
            />
          )}
          <NavLink
            to="/payments"
            label="Payments"
            icon={<CreditCard size={20} />}
          />
        </nav>
      </div>

      {/* IMPROVEMENT: Refined footer section with better layout and a logout button example */}
      <div className="px-4">
        <div className="border-t border-slate-700 pt-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <UserCircle className="w-9 h-9 text-slate-400"/>
                <div>
                    <p className="text-xs text-slate-400">Logged in as</p>
                    <p className="font-semibold text-slate-200">{role}</p>
                </div>
            </div>
            <button className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
      </div>
    </aside>
  );
}