import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { FaUser, FaEnvelope, FaKey, FaSignOutAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar2";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data;
        setUser(userData);
        setForm({
          fullName: userData?.fullName || "",
          email: userData?.email || "",
        });
        setLoading(false);
      } catch (err) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate, token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    try {
      await API.put("/users/change-password", passwords, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Password changed!");
      setPasswords({ current: "", new: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <>
    <Navbar />
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web mb-32">
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
        <FaUser className="text-xl" />
        My Profile
      </h2>

      {/* Update Profile */}
      <form onSubmit={handleUpdateProfile} className="space-y-5 mb-10">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={form.fullName || ""}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Role
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={user?.role || ""}
              disabled
              className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700"
        >
          Update Profile
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handleChangePassword} className="space-y-5 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaKey /> Change Password
        </h3>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Current Password
          </label>
          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Current password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            New Password
          </label>
          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="New password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-full bg-gray-50"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>

      {/* Logout */}
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline text-sm flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default Profile;
