import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder token for future auth
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Future API call example
    // axios
    //   .get("http://localhost:5000/api/users", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => setUsers(res.data))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));

    // Temporary placeholder
    setTimeout(() => {
      setUsers([
        { _id: "1", name: "Alice", email: "alice@example.com", role: "user" },
        { _id: "2", name: "Bob", email: "bob@example.com", role: "admin" },
      ]);
      setLoading(false);
    }, 1000);
  }, [token]);

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-gray-500 mt-4">
        Manage tenants and admins. Real API integration coming soon.
      </p>
    </div>
  );
}
