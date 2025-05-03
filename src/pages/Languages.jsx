import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer2";
import Navbar from "../components/Navbar2";

const ITEMS_PER_PAGE = 15;

const LanguagePage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredByLang, setFilteredByLang] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchLanguageCode, setSearchLanguageCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        //All Countries EndPoint
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch countries by language code
  useEffect(() => {
    const fetchByLanguage = async () => {
      if (searchLanguageCode.trim() === "") {
        setFilteredByLang([]);
        return;
      }
      try {
        const res = await fetch(
          //Language code endpoint
          `https://restcountries.com/v3.1/lang/${searchLanguageCode.toLowerCase()}`
        );
        if (!res.ok) throw new Error("Invalid language code");
        const data = await res.json();
        setFilteredByLang(data);
        setCurrentPage(1);
      } catch (err) {
        setFilteredByLang([]);
        console.error("Error fetching language-filtered data:", err);
      }
    };

    fetchByLanguage();
  }, [searchLanguageCode]);

  // Choose data source
  const dataSource = filteredByLang.length > 0 ? filteredByLang : countries;

  // Filter by country name
  const filteredCountries = dataSource.filter((country) =>
    country.name?.common?.toLowerCase().includes(searchCountry.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web min-h-screen pt-12 pb-20">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Languages of the World
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
          Explore the primary languages spoken in each country.
        </p>

        {/* Filter Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          {/* Left Label */}
          <div className="text-left md:text-left">
            <label className="block text-md font-semibold text-gray-800">
              Filter Language By
            </label>
          </div>

          {/* Right Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:justify-end">
            {/* Language Code Input */}
            <input
              type="text"
              value={searchLanguageCode}
              onChange={(e) => setSearchLanguageCode(e.target.value)}
              placeholder="Language code (e.g. english)"
              className="w-full sm:w-56 border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Country Name Search */}
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

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentCountries.map((country) => {
            const name = country.name?.common || "Unknown";
            const languages = country.languages
              ? Object.values(country.languages)
              : [];

            return (
              <div
                key={name}
                className="border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {name}
                </h3>
                {languages.length > 0 ? (
                  <ul className="text-sm text-gray-600 space-y-1">
                    {languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No language data available
                  </p>
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

export default LanguagePage;
