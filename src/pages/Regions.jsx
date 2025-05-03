import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import * as topojson from "topojson-client";
import "react-tooltip/dist/react-tooltip.css";
import NavBar from '../components/Navbar2';
import Footer from "../components/Footer2";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const RegionsPage = () => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    const fetchGeoData = async () => {
      const res = await fetch(geoUrl);
      const worldData = await res.json();
      const geoFeatures = topojson.feature(worldData, worldData.objects.countries).features;
      setGeographies(geoFeatures);
    };
    fetchGeoData();
  }, []);

  return (
    <>
      <NavBar />
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Interactive World Map</h2>
      <p className="text-center text-gray-600 mb-10">Hover over a country to see its name.</p>

      <div className="max-w-6xl mx-auto rounded-lg shadow-lg border border-gray-200 bg-white p-4">
        <ComposableMap projectionConfig={{ scale: 160 }} className="w-full mx-auto">
          <Geographies geography={{ features: geographies }}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name || "Unknown";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id="map-tooltip"
                    data-tooltip-content={countryName}
                    style={{
                      default: {
                        fill: "#d1d5db",
                        stroke: "#ffffff",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#111827",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#000",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        <Tooltip
          id="map-tooltip"
          className="!rounded-lg !px-4 !py-2 !text-sm !bg-black !text-white"
          place="top"
          float="true"
        />
      </div>

      <p className="text-center text-sm mt-8 text-gray-500 mb-16">
        Data provided by World Atlas.
      </p>

      <Footer />
    </div>
    </>
  );
};

export default RegionsPage;
