import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/api/payments");
    setPayments(res.data);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Payment Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.userId}</td>
              <td className="border p-2">₹{p.amount}</td>
              <td className="border p-2">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
