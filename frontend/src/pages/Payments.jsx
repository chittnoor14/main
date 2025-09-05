import { useEffect, useState } from "react";
import axios from "axios";

export default function Payments() {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "", proof: "" }); // updated to match backend

  useEffect(() => {
    fetchPayments();
  }, []);

  // Remove fetchUsers if not needed, backend doesn't have /api/users route
  // const fetchUsers = async () => {
  //   const res = await axios.get("http://localhost:5000/api/users");
  //   setUsers(res.data);
  // };

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments/my-payments"); // updated route
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/payments/", form); // create payment
      setForm({ amount: "", method: "", proof: "" });
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">💰 My Payments</h1>

      {/* Add Payment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">Add Payment</h2>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Payment Method"
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Proof (optional)"
          value={form.proof}
          onChange={(e) => setForm({ ...form, proof: e.target.value })}
          className="w-full border p-2 mb-3 rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Payment
        </button>
      </form>

      {/* Payments Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">My Payments</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border p-2">₹{p.amount}</td>
                <td className="border p-2">{p.method}</td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
