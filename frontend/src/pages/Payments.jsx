import { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee, CreditCard, FileText, PlusCircle } from "lucide-react";

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

function FormInput({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
}

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "", proof: "" });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments/my-payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "http://localhost:5000/api/payments/",
        { ...form, amount: Number(form.amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ amount: "", method: "", proof: "" });
      fetchPayments();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred while adding the payment.";
      setError(errorMessage);
      console.error("Error adding payment:", errorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">My Payments</h1>
        <p className="text-slate-400 mt-1">Add a new payment or view your history.</p>
      </div>

      {/* Stack layout: form first, then history */}
      <div className="flex flex-col gap-8">
        
        {/* --- Add Payment Form --- */}
        
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-5">
            <PlusCircle className="text-teal-400" />
            <h2 className="text-xl font-semibold text-slate-100">Add a New Payment</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">Amount</label>
              <FormInput
                type="number"
                placeholder="e.g., 15000"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                icon={<IndianRupee className="w-4 h-4 text-slate-400" />}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">Payment Method</label>
              <FormInput
                type="text"
                placeholder="e.g., UPI, Bank Transfer"
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                icon={<CreditCard className="w-4 h-4 text-slate-400" />}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">Proof</label>
              <FormInput
                type="text"
                placeholder="e.g., Transaction ID (optional)"
                value={form.proof}
                onChange={(e) => setForm({ ...form, proof: e.target.value })}
                icon={<FileText className="w-4 h-4 text-slate-400" />}
              />
            </div>
            <button className="w-full bg-teal-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800">
              Submit Payment
            </button>
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
          </form>
        </div>

        {/* --- Payments Table --- */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 mb-5">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase">
                <tr>
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Amount</th>
                  <th className="p-3 font-semibold">Method</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <tr key={p._id} className="border-t border-slate-700 hover:bg-slate-700/50">
                      <td className="p-3 text-slate-300">{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 font-medium text-slate-100">₹{p.amount.toLocaleString()}</td>
                      <td className="p-3 text-slate-300">{p.method}</td>
                      <td className="p-3"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-slate-500 py-12">No payments found in your history.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
