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
  Legend,
} from "recharts";
import { Users, CreditCard, IndianRupee, Bell, History } from "lucide-react";

// --- REUSABLE COMPONENTS (No changes here) ---
function StatCard({ title, value, subtitle, Icon }) {
  return (
    <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex items-center gap-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
      <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="text-2xl font-semibold text-slate-100 mt-1">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
    const baseClasses = "text-xs font-semibold inline-flex items-center py-1 px-3 rounded-full";
    switch (status?.toLowerCase()) {
        case "confirmed":
            return <span className={`${baseClasses} bg-green-500/10 text-green-400`}>Confirmed</span>;
        case "pending":
            return <span className={`${baseClasses} bg-amber-500/10 text-amber-400`}>Pending</span>;
        default:
            return <span className={`${baseClasses} bg-slate-500/10 text-slate-400`}>Unknown</span>;
    }
}


// -------------------- ADMIN DASHBOARD (IMPROVED LAYOUT) --------------------
function AdminDashboard({ stats, chartData, recentPayments }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Welcome back, Admin 👋</h1>
        <p className="text-slate-400 mt-1">
          Here’s a complete overview of your rent collection and payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.users} subtitle="Tenants and admins" Icon={Users} />
        <StatCard title="Total Payments" value={stats.payments} subtitle="All payments recorded" Icon={CreditCard} />
        <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} subtitle="All-time" Icon={IndianRupee} />
      </div>

      {/* --- LAYOUT CORRECTION STARTS HERE --- */}
      {/* IMPROVEMENT: A multi-column grid for the main content area. It's a single column on small screens and a 3-column grid on large screens. */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* IMPROVEMENT: The chart card now spans 3 of the 5 columns on large screens. */}
        <div className="lg:col-span-3 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-100 mb-5">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.75rem' }}
                labelStyle={{ color: '#cbd5e1', fontWeight: 'bold' }}
                itemStyle={{ color: '#94a3b8' }}
                formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: '#2dd4bf' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* IMPROVEMENT: The recent payments card now spans the remaining 2 columns and is scrollable. */}
        <div className="lg:col-span-2 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-100 mb-5">Recent Payments</h2>
          {/* IMPROVEMENT: Added fixed height and overflow-y-auto to make this list scrollable, aligning it visually with the chart. */}
          <div className="space-y-4 overflow-y-auto h-[300px] pr-2">
            {recentPayments.length > 0 ? (
              recentPayments.map((p) => (
                <div key={p._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="bg-slate-700 p-2 rounded-full"><IndianRupee className="text-slate-400 w-5 h-5" /></div>
                     <div>
                        <p className="font-medium text-slate-200">{p.tenant?.name || "Unknown"}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{new Date(p.createdAt).toLocaleDateString()}</p>
                     </div>
                  </div>
                  <p className="font-bold text-slate-100">₹{p.amount.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-center text-slate-500 pt-10">No recent payments to show.</p>
            )}
          </div>
        </div>
      </div>
      {/* --- LAYOUT CORRECTION ENDS HERE --- */}

    </div>
  );
}

// -------------------- USER DASHBOARD (No changes here) --------------------
function UserDashboard({ userPayments, nextDue }) {
  // This component's layout was already good, so no changes were needed.
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Welcome 👋</h1>
        <p className="text-slate-400 mt-1">Here’s your payment history and upcoming rent.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-5">
              <History className="text-slate-300" />
              <h2 className="text-xl font-semibold text-slate-100">Your Payment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-slate-400 uppercase">
                <tr>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Method</th>
                </tr>
              </thead>
              <tbody>
                {userPayments.length > 0 ? (
                  userPayments.map((p) => (
                    <tr key={p._id} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors duration-150">
                      <td className="p-3 text-slate-300">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 font-medium text-slate-100">₹{p.amount.toLocaleString()}</td>
                      <td className="p-3"><StatusBadge status={p.status} /></td>
                      <td className="p-3 text-slate-300">{p.method || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-slate-500 py-8">You haven't made any payments yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-teal-500/30 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3">
              <Bell className="text-teal-400" />
              <h2 className="text-xl font-semibold text-teal-400">Next Rent Due</h2>
          </div>
          {nextDue ? (
            <div>
              <p className="text-4xl font-bold text-slate-100">₹{nextDue.amount.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">Due on {new Date(nextDue.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-slate-400">All your payments are up to date! 🎉</p>
          )}
           <button className="w-full bg-teal-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800">
             Pay Now
           </button>
        </div>
      </div>
    </div>
  );
}

// -------------------- MAIN DASHBOARD WRAPPER (No changes here) --------------------
export default function Dashboard() {
  const [role, setRole] = useState("admin");
  const [stats, setStats] = useState({ users: 0, payments: 0, revenue: 0 });
  const [recentPayments, setRecentPayments] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userPayments, setUserPayments] = useState([]);
  const [nextDue, setNextDue] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Your existing data fetching logic
  }, [role, token]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6 lg:p-8">
      {role === "admin" ? (
        <AdminDashboard stats={stats} chartData={chartData} recentPayments={recentPayments} />
      ) : (
        <UserDashboard userPayments={userPayments} nextDue={nextDue} />
      )}
    </div>
  );
}