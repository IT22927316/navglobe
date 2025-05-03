import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer2";
import { TiLocationArrow } from "react-icons/ti";
import { BiUndo } from "react-icons/bi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "../components/Button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        setCountry(data[0]);

        // Fetch border countries
        if (data[0].borders?.length > 0) {
          const borderCodes = data[0].borders.join(",");
          const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
          const borderData = await borderRes.json();
          setBorderCountries(borderData);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) {
    return <div className="p-8 text-center">Loading country details...</div>;
  }

  const nativeName = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol || "—"})`).join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const timezones = country.timezones?.join(", ") || "N/A";
  const googleMapLink = country.maps?.googleMaps || "#";
  const coatOfArms = country.coatOfArms?.png;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-6 py-0 font-circular-web">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Details About: {country.name.common} country
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore the world and get key insights about nations.
        </p>

        <div className="max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-10 mb-12">
          <div className="md:w-1/2 flex flex-col items-center gap-6">
            <img
              src={country.flags?.png}
              alt={`${country.name.common} Flag`}
              className="w-full max-w-xs rounded-md shadow"
            />
            {coatOfArms && (
              <div className="text-center">
                <h4 className="text-sm font-medium mb-1">Coat of Arms</h4>
                <img
                  src={coatOfArms}
                  alt={`${country.name.common} Coat of Arms`}
                  className="w-32 h-32 object-contain mx-auto"
                />
              </div>
            )}
          </div>

          <div className="md:w-1/2 space-y-4 text-gray-800">
            <h2 className="text-2xl font-bold">{country.name.common}</h2>
            <p><strong>Official Name:</strong> {country.name.official}</p>
            <p><strong>Native Name:</strong> {nativeName}</p>
            <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {languages}</p>
            <p><strong>Currencies:</strong> {currencies}</p>
            <p><strong>Timezones:</strong> {timezones}</p>
            <p><strong>Country Code:</strong> {country.cca3}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <strong>Border Countries:</strong>
              {borderCountries.length > 0 ? (
                borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/country/${b.cca3}`}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                  >
                    {b.name.common}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-gray-600 ml-2">None</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate(-1)}
              >
                 <Button
              id="Back"
              title="Back"
              leftIcon={<BiUndo />}
              containerClass="bg-orange-300 flex-center gap-1"
                />
              </button>
              <a
                href={googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <Button
              id="View on Google Maps"
              title="View on Google Maps"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-green-600 flex-center gap-1"
                />
                
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CountryDetails;
