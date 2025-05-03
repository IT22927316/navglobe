import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer2";

const ITEMS_PER_PAGE = 15;

const CurrencyPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredByCode, setFilteredByCode] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCurrencyCode, setSearchCurrencyCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all countries on load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        //All Countries API endpoint
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch countries by currency code
  useEffect(() => {
    const fetchByCurrency = async () => {
      if (searchCurrencyCode.trim() === "") {
        setFilteredByCode([]);
        return;
      }
      try {
        const res = await fetch(
          //Currency API endpoint
          `https://restcountries.com/v3.1/currency/${searchCurrencyCode.toLowerCase()}`
        );
        if (!res.ok) throw new Error("Invalid currency code");
        const data = await res.json();
        setFilteredByCode(data);
        setCurrentPage(1);
      } catch (err) {
        setFilteredByCode([]);
        console.error("Error fetching currency-filtered data:", err);
      }
    };

    fetchByCurrency();
  }, [searchCurrencyCode]);

  // Select data source
  const dataSource = filteredByCode.length > 0 ? filteredByCode : countries;

  // Filter by country name
  const filtered = dataSource.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCountries = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web min-h-screen pt-12 pb-20">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">World Currencies</h2>
        <p className="text-center text-gray-600 mb-8">
          Explore all currencies by country, or search by a specific currency code.
        </p>

        {/* Filter Label + Search Inputs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          {/* Left Label */}
          <div className="text-left md:text-left">
            <label className="block text-md font-semibold text-gray-800">
              Filter Currency By
            </label>
          </div>

          {/* Right Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:justify-end">
            {/* Currency Code Input */}
            <input
              type="text"
              value={searchCurrencyCode}
              onChange={(e) => setSearchCurrencyCode(e.target.value)}
              placeholder="Currency code (e.g. usd)"
              className="w-full sm:w-56 border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Country Search Input */}
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchCountry}
                onChange={(e) => {
                  setSearchCountry(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by country"
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Country-Currency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCountries.map((country) => {
            const name = country.name?.common || "Unknown";
            const currencies = country.currencies
              ? Object.entries(country.currencies)
              : [];

            return (
              <div
                key={name}
                className="border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
                {currencies.length > 0 ? (
                  <ul className="text-sm text-gray-600 space-y-1">
                    {currencies.map(([code, { name: currencyName, symbol }]) => (
                      <li key={code}>
                        {currencyName} ({code}) {symbol && `- ${symbol}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No currency data available</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center flex-wrap gap-2 text-sm mb-24">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default CurrencyPage;
