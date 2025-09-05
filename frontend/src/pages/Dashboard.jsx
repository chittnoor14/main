import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Small card component
function StatCard({ title, value, subtitle }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </div>
  );
}

// -------------------- ADMIN DASHBOARD --------------------
function AdminDashboard({ stats, chartData, recentPayments }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Admin 👋</h1>
        <p className="text-gray-600 mt-1">Overview of rent collection and payments</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.users} subtitle="Tenants and admins" />
        <StatCard title="Payments" value={stats.payments} subtitle="Total payments recorded" />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          subtitle="All-time"
        />
      </div>

      {/* Chart */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent payments */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Recent payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Tenant</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.length > 0 ? (
                recentPayments.map((p) => (
                  <tr key={p._id} className="border-b last:border-none">
                    <td className="py-2 px-3">{p.tenant?.name || "Unknown"}</td>
                    <td className="py-2 px-3">₹{p.amount}</td>
                    <td className="py-2 px-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-gray-500 py-3 text-center">
                    No recent payments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------- USER DASHBOARD --------------------
function UserDashboard({ userPayments, nextDue }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-gray-600 mt-1">Here’s your payment history and upcoming rent</p>
      </div>

      {/* Payment history */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Your Payments</h2>
        {userPayments.length > 0 ? (
          <ul className="space-y-3">
            {userPayments.map((p) => (
              <li key={p._id} className="flex justify-between border-b pb-2">
                <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">₹{p.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No payments found</p>
        )}
      </div>

      {/* Next due */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-blue-700">Next Rent Due</h2>
        {nextDue ? (
          <p className="text-blue-600 mt-2">
            ₹{nextDue.amount} on {new Date(nextDue.createdAt).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-blue-600 mt-2">No upcoming due found</p>
        )}
      </div>
    </div>
  );
}

// -------------------- MAIN DASHBOARD WRAPPER --------------------
export default function Dashboard() {
  const [role, setRole] = useState("user"); // change to "admin" for testing
  const [stats, setStats] = useState({ users: 0, payments: 0, revenue: 0 });
  const [recentPayments, setRecentPayments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userPayments, setUserPayments] = useState([]);
  const [nextDue, setNextDue] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (role === "admin") {
      axios
        .get("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStats(res.data));

      axios
        .get("http://localhost:5000/api/stats/recent-payments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRecentPayments(res.data));

      setChartData([
        { month: "Jan", revenue: 5000 },
        { month: "Feb", revenue: 7200 },
        { month: "Mar", revenue: 6800 },
        { month: "Apr", revenue: 9000 },
      ]);
    } else {
      axios
        .get("http://localhost:5000/api/payments/my-payments", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserPayments(res.data);
          // calculate next due if you want
          const upcoming = res.data.find((p) => p.status !== "confirmed"); // example logic
          setNextDue(upcoming || null);
        })
        .catch((err) => console.error(err));
    }
  }, [role, token]);

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboard stats={stats} chartData={chartData} recentPayments={recentPayments} />
      ) : (
        <UserDashboard userPayments={userPayments} nextDue={nextDue} />
      )}
    </div>
  );
}
