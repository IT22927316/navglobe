import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Users,
  Globe2,
  Heart,
  ShieldUser,
  ArrowUpRight,
  Download,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [countryViews, setCountryViews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyUsers = [
      { _id: "1", fullName: "Alice Perera", email: "alice@example.com", role: "user", favorites: ["LK"], createdAt: "2024-12-01" },
      { _id: "2", fullName: "Bob Silva", email: "bob@example.com", role: "admin", favorites: ["US", "IN"], createdAt: "2024-12-03" },
      { _id: "3", fullName: "Charlie Fernando", email: "charlie@example.com", role: "user", favorites: [], createdAt: "2025-01-02" },
      { _id: "4", fullName: "Diana Wickramasinghe", email: "diana@example.com", role: "user", favorites: ["FR"], createdAt: "2025-02-01" },
    ];

    const dummyViews = {
      LK: 12,
      US: 20,
      IN: 15,
      FR: 8,
    };

    setTimeout(() => {
      setUsers(dummyUsers);
      setCountryViews(dummyViews);
      setLoading(false);
    }, 800);
  }, []);

  const totalFavorites = users.reduce((acc, u) => acc + (u.favorites?.length || 0), 0);
  const totalCountriesViewed = Object.values(countryViews).reduce((a, b) => a + b, 0);
  const admins = users.filter((u) => u.role === "admin");

  const barData = {
    labels: Object.keys(countryViews),
    datasets: [
      {
        label: "Most Viewed Countries",
        data: Object.values(countryViews),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-blue-100 dark:bg-blue-900"><Users className="text-blue-500 dark:text-blue-300" /></div>,
      color: "text-blue-500 dark:text-blue-300",
    },
    {
      label: "Total Favorites Saved",
      value: totalFavorites,
      icon: <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-pink-100 dark:bg-pink-900"><Heart className="text-pink-500 dark:text-pink-300" /></div>,
      color: "text-pink-500 dark:text-pink-300",
    },
    {
      label: "Total Country Views",
      value: totalCountriesViewed,
      icon: <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-green-100 dark:bg-green-900"><Globe2 className="text-green-500 dark:text-green-300" /></div>,
      color: "text-green-500 dark:text-green-300",
    },
    {
      label: "Total Admins",
      value: admins.length,
      icon: <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-red-100 dark:bg-red-900"><ShieldUser className="text-red-500 dark:text-red-300" /></div>,
      color: "text-red-500 dark:text-red-300",
    },
  ];

  const latestUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("NavGlobe Analytics Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Total Users: ${users.length}`, 14, 35);
    doc.text(`Total Country Views: ${totalCountriesViewed}`, 14, 42);
    doc.text(`Total Favorites Saved: ${totalFavorites}`, 14, 49);
    doc.text(`Admins: ${admins.length}`, 14, 56);

    const tableData = users.map((u, i) => [
      i + 1,
      u.fullName,
      u.email,
      u.role,
      u.favorites?.length || 0,
    ]);

    doc.autoTable({
      head: [["#", "Name", "Email", "Role", "Favorites"]],
      body: tableData,
      startY: 65,
    });

    doc.save("analytics-report.pdf");
  };

  return (
    <AdminLayout>
      <div className="p-6 font-inter text-gray-800 dark:text-gray-100 bg-white dark:bg-neutral-900 transition-all">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">NavGlobe Admin Dashboard</h1>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
          >
            <Download size={16} /> Download Report
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md text-center border border-neutral-200 dark:border-neutral-700"
                >
                  <div className={`mx-auto mb-2 ${item.color}`}>{item.icon}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-neutral-700" style={{ maxHeight: "300px" }}>
                <h2 className="text-lg font-semibold mb-4">Most Viewed Countries</h2>
                <div className="w-full h-[250px]">
                  <Bar
                    data={barData}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-semibold mb-4">Latest Registered Users</h2>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {latestUsers.map((user, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <div>
                        <h3 className="text-sm font-medium">{user.fullName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <ArrowUpRight className="text-blue-500 dark:text-blue-300" size={18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
