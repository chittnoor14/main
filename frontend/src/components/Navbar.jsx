import { Link, useNavigate } from "react-router-dom";
// IMPROVEMENT: Using a consistent icon library for a professional look
import { Search, Bell, UserCircle, Menu, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  // Read user from localStorage (logic is unchanged)
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Guest";
  const name = user?.name || "Guest";

  // Logout handler (logic is unchanged)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // IMPROVEMENT: Switched to a dark theme that matches the sidebar and dashboard, with a bottom border for separation.
    <header className="w-full bg-slate-800 border-b border-slate-700 px-4 sm:px-6 py-3 flex items-center justify-between">
      
      {/* --- Left Side --- */}
      <div className="flex items-center gap-4">
        {/* IMPROVEMENT: Mobile menu button with an icon */}
        <button className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-700">
          <Menu size={20} />
        </button>
        
        {/* IMPROVEMENT: Search bar styled for the dark theme */}
        <div className="hidden md:flex items-center bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-64"
            placeholder="Search users, payments..."
          />
        </div>
      </div>

      {/* --- Right Side --- */}
      <div className="flex items-center gap-4">
        {/* IMPROVEMENT: Notifications button with an icon and a subtle hover effect */}
        <button className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors">
          <Bell size={20} />
        </button>

        {/* If logged in */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* IMPROVEMENT: Refined user profile link with a consistent avatar color */}
            <Link to="/profile" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-200">{name}</p>
                <p className="text-xs text-slate-400 capitalize">{role}</p>
              </div>
            </Link>

            {/* IMPROVEMENT: Subtle logout button that fits the theme */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          // If NOT logged in
          // IMPROVEMENT: Restyled Login/Signup buttons with primary and secondary styles
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold bg-teal-500 text-slate-900 rounded-lg hover:bg-teal-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-semibold bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}