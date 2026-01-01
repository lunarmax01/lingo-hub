import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data || []);
    };
    fetchUsers();
  }, []);

  const handleAddStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/users/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setUsers((prev) => prev.map(u => u._id === id ? { ...u, learningStatus: status } : u));
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Admin Panel</h1>
      {users.length > 0 ? (
        <table className="table-auto bg-white rounded-lg shadow w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Ism</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="border px-4 py-2">{u.firstName} {u.lastName}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.learningStatus}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAddStatus(u._id, "1 haftalik o‘quvchi")}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    1 haftalik
                  </button>
                  <button
                    onClick={() => handleAddStatus(u._id, "1 oylik o‘quvchi")}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    1 oylik
                  </button>
                  <button
                    onClick={() => handleAddStatus(u._id, "1 yillik o‘quvchi")}
                    className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                  >
                    1 yillik
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Hozircha foydalanuvchilar yo‘q</p>
      )}
    </div>
  );
};

export default AdminPanel;
