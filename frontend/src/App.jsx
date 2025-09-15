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

  const hideLayout = ["/login", "/signup"];
  const isAuthPage = hideLayout.includes(location.pathname);

  // If it's an authentication page, we render it without the main layout.
  // This is a cleaner way to handle separate layouts.
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  // Otherwise, render the main application layout with Sidebar and Navbar.
  return (
    // IMPROVEMENT: Changed background to the dark theme to match all other components.
    <div className="flex h-full bg-slate-900 text-slate-300">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full">
        <Navbar />
        {/* IMPROVEMENT: Removed padding from the <main> tag.
          The individual pages (like Dashboard.jsx) now control their own padding.
          This prevents "double padding" and gives each page full control.
        */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
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