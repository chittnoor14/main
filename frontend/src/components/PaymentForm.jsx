import { useState } from "react";
import axios from "axios";

export default function PaymentForm() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/payments", { userId, amount });
    alert("✅ Payment added!");
    setUserId("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-4">Add Payment</h2>
      <input
        type="text"
        placeholder="User ID"
        className="w-full border p-2 mb-3 rounded"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 mb-3 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Payment
      </button>
    </form>
  );
}
