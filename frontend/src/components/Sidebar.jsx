import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, label, icon }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-fast ${
        active
          ? "bg-white text-blue-800 font-semibold"
          : "text-white/90 hover:bg-white/10"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Guest";

  return (
    <aside className="w-[18rem] bg-gradient-to-b from-blue-800 to-blue-900 text-white min-h-screen p-6 hidden md:block">
      <div className="mb-8">
        <div className="text-2xl font-bold">💳 BillingApp</div>
        <div className="text-sm text-white/80 mt-1">Rent & Payments</div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          label="Dashboard"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-4H3v4z" fill="currentColor" />
            </svg>
          }
        />
        {/* Show Users menu only if Admin */}
        {role === "admin" && (
          <NavLink
            to="/users"
            label="Users"
            icon={
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 21a9 9 0 0 1 18 0"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        )}
        <NavLink
          to="/payments"
          label="Payments"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M2 7h20M7 11h10M4 15h5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </nav>

      <div className="mt-auto text-sm text-white/80">
        <div className="border-t border-white/10 pt-4">
          <div>Logged in as</div>
          <div className="font-semibold mt-1">{role}</div>
        </div>
      </div>
    </aside>
  );
}
