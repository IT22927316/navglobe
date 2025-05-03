import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import API from "../../api";
import NavBar from "../../components/Navbar2";
import Footer from "../../components/Footer2";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [countries, setCountries] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await API.get("/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };

    fetchFavorites();
  }, [token]);

  useEffect(() => {
    const fetchCountryData = async () => {
      if (favorites.length === 0) return setCountries([]);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${favorites.join(",")}`
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching country data", err);
      }
    };

    fetchCountryData();
  }, [favorites]);

  const toggleFavorite = async (code) => {
    try {
      const res = await API.post(
        "/users/favorites",
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error("Failed to update favorites", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Favorite Countries ❤️
        </h1>

        {countries.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {countries.map((country) => (
              <div
                key={country.cca3}
                className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition transform hover:-translate-y-2 relative"
              >
                {/* Heart Icon for toggle */}
                <button
                  onClick={() => toggleFavorite(country.cca3)}
                  className="absolute top-4 right-4 text-red-600 text-xl z-10 hover:scale-110 transition"
                >
                  <FaHeart />
                </button>

                <Link to={`/country/${country.cca3}`}>
                  <img
                    src={country.flags?.png}
                    alt={country.name.common}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {country.name.common}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Region:</strong> {country.region}
                    </p>
                    <p className="text-gray-600">
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            You haven’t added any countries to favorites yet.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
