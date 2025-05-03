import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import AdminLayout from './AdminLayout';
import { Download } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminAnalytics = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 1280,
    totalAdmins: 4,
    totalFavorites: 560,
    regionMostActive: 'Asia',
  });

  const [countryStats, setCountryStats] = useState({
    totalCountries: 250,
    mostViewed: 'Japan',
    averagePopulation: '35M',
    regionMostCountries: 'Africa',
  });

  const downloadReport = async () => {
    try {
      const link = document.createElement('a');
      link.href = '/Country_Admin_Analytics_Report.pdf'; // Replace if you use backend generation
      link.download = 'Country_Admin_Analytics_Report.pdf';
      link.click();
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  const countryRegionChart = {
    labels: ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'],
    datasets: [
      {
        label: 'Countries by Region',
        data: [65, 48, 70, 42, 25],
        backgroundColor: ['#4f46e5', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4'],
        borderRadius: 6,
      },
    ],
  };

  const userRoleChart = {
    labels: ['Users', 'Admins'],
    datasets: [
      {
        label: 'User Roles',
        data: [1276, 4],
        backgroundColor: ['#6366f1', '#f43f5e'],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6 font-inter text-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <Download size={18} /> Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-4">Countries by Region</h2>
            <Bar data={countryRegionChart} height={150} />
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-4">User Role Distribution</h2>
            <Doughnut data={userRoleChart} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-4">User Stats</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Total Users:</strong> {userStats.totalUsers}</li>
              <li><strong>Total Admins:</strong> {userStats.totalAdmins}</li>
              <li><strong>Total Favorites:</strong> {userStats.totalFavorites}</li>
              <li><strong>Most Active Region:</strong> {userStats.regionMostActive}</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow border dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-4">Country Stats</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Total Countries:</strong> {countryStats.totalCountries}</li>
              <li><strong>Most Viewed:</strong> {countryStats.mostViewed}</li>
              <li><strong>Average Population:</strong> {countryStats.averagePopulation}</li>
              <li><strong>Region with Most Countries:</strong> {countryStats.regionMostCountries}</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
