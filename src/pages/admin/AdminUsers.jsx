import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { Pencil, Trash2 } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState({ fullName: '', email: '', role: 'user' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setEditData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/users/${editUser._id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 font-inter text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">All Users</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-700 shadow-md">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Full Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Joined</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{user.fullName}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 capitalize">{user.role}</td>
                    <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-4 items-center">
                      <button onClick={() => openEditModal(user)} title="Edit" className="text-blue-500 hover:text-blue-700">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(user._id)} title="Delete" className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded border dark:bg-neutral-700"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded border dark:bg-neutral-700"
                />
                <select
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded border dark:bg-neutral-700"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditUser(null)}
                    className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
