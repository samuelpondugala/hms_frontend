import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/userApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (email) => {
    await deleteUser(email);
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Users
        </h2>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{u._id}</td>
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        u.role === "admin"
                          ? "bg-purple-600"
                          : u.role === "doctor"
                          ? "bg-blue-600"
                          : u.role === "receptionist"
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="text-center text-gray-600 mt-5">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
