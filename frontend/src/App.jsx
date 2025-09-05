import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";
import "./App.css";

export default function App() {
  const location = useLocation();

  // routes where we don't want sidebar & navbar
  const hideLayout = ["/login", "/signup"];
  const isAuthPage = hideLayout.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {!isAuthPage && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!isAuthPage && <Navbar />}
        <main className="p-6 md:p-8 flex-1 overflow-auto">
          <Routes>
            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
