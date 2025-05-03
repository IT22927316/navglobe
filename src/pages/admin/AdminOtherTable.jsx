import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

const AdminOtherTable = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="p-6 font-inter text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Languages & Currencies</h1>

        {countries.length === 0 ? (
          <p>Loading data...</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-700 shadow-md">
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-4 text-left">#</th>
                    <th className="p-4 text-left">Country</th>
                    <th className="p-4 text-left">Languages</th>
                    <th className="p-4 text-left">Currencies</th>
                    <th className="p-4 text-left">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCountries.map((country, index) => {
                    const languages = Object.values(country.languages || {}).join(', ');
                    const currencies = country.currencies
                      ? Object.values(country.currencies)
                          .map((c) => `${c.name} (${c.symbol || ''})`)
                          .join(', ')
                      : 'N/A';

                    return (
                      <tr key={country.cca3} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                        <td className="p-4">{indexOfFirst + index + 1}</td>
                        <td className="p-4">{country.name.common}</td>
                        <td className="p-4">{languages || 'N/A'}</td>
                        <td className="p-4">{currencies}</td>
                        <td className="p-4">{country.region}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border text-sm bg-white dark:bg-neutral-700 text-gray-800 dark:text-white disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-white dark:bg-neutral-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border text-sm bg-white dark:bg-neutral-700 text-gray-800 dark:text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOtherTable;
