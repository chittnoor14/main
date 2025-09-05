import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Read user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Guest";
  const name = user?.name || "Guest";

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you're storing token separately
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded bg-gray-100">☰</button>
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="hidden md:flex items-center bg-gray-50 border rounded-lg px-3 py-1 gap-2 ml-4">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="bg-transparent outline-none text-sm"
            placeholder="Search users, payments..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600">Notifications</button>

        {/* If logged in */}
        {user ? (
          <>
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 text-white flex items-center justify-center font-semibold">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-sm">{role}</div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          // If NOT logged in
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
