import React, { useEffect, useState } from 'react';
import { FaSearch, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar2';
import reviewpic from '../assets/countrycover.jpg';
import NewsLetter from '../components/Newsletter';
import Footer from '../components/Footer2';
import API from '../api';

const MainCountry = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterRegion, setFilterRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const countriesPerPage = 12;

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const url = filterRegion === "All"
          ? 'https://restcountries.com/v3.1/all'
          : `https://restcountries.com/v3.1/region/${filterRegion.toLowerCase()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, [filterRegion]);

  // Fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await API.get("/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to fetch favorites");
      }
    };
    fetchFavorites();
  }, [token]);

  // Filter on search
  useEffect(() => {
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(results);
    setCurrentPage(1);
  }, [searchQuery, countries]);

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const getFlagUrl = (country) =>
    country?.flags?.png || "https://upload.wikimedia.org/wikipedia/commons/a/a4/No_image_available.svg";

  const isFavorite = (code) => favorites.includes(code);

  const toggleFavorite = async (code) => {
    if (!token) return alert("Please login to save favorites");

    try {
      const res = await API.put(`/users/favorites/${code}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(res.data.favorites); // updated list returned from backend
    } catch (err) {
      alert("Failed to update favorites");
    }
  };

  return (
    <>
      <NavBar />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web'>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Languages of the World</h2>
        <p className="text-center text-gray-600 mb-8">Explore the world and get key insights about nations.</p>

        <div className='w-full mt-10 py-12 bg-white px-4 lg:px-24 relative rounded-xl overflow-hidden'>
          <div className='absolute inset-0'>
            <img src={reviewpic} alt="background" className='w-full h-full object-cover' />
          </div>
          <div className='relative z-10 bg-[rgba(0,0,0,0.7)] p-8 md:p-12 lg:p-16 text-white'>
            <h2 className='text-4xl font-bold mb-6 leading-snug'>
              Discover the World in One Place <br /> Powered by REST Countries API
            </h2>
            <p className='md:w-3/4 font-medium'>
              Get key insights about nations — population, region, capital, language, and more!
            </p>
          </div>
        </div>

        <div className="mt-12 mb-12 px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center md:text-left">
            Countries Around The World
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="h-12 px-5 rounded-full border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-gray-700"
            >
              <option value="All">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Antarctic">Antarctic</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {currentCountries.length > 0 ? (
            currentCountries.map((country) => (
              <div key={country.cca3} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-2 transform transition duration-300">
                <div className="relative">
                  <img
                    src={getFlagUrl(country)}
                    alt={country.name.common}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={() => toggleFavorite(country.cca3)}
                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
                  >
                    {isFavorite(country.cca3) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-400" />
                    )}
                  </button>
                </div>
                <Link to={`/country/${country.cca3}`}>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800">{country.name.common}</h4>
                    <p className="text-gray-600 mt-2"><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                    <p className="text-gray-600"><strong>Region:</strong> {country.region}</p>
                    <p className="text-gray-600"><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p className="text-gray-600"><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg col-span-3">No countries found</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >Previous</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded border text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border text-sm bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >Next</button>
          </div>
        )}

        <div className='mt-12'>
          <NewsLetter />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainCountry;
