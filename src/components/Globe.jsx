import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { feature } from "topojson-client";

const GlobePage = () => {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
      .then((res) => res.json())
      .then((topology) => {
        const geoFeatures = feature(topology, topology.objects.countries).features;
        setCountries(geoFeatures);
      });
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.2;

      setTimeout(() => {
        globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.2 }, 1000);
        globeRef.current.controls().update();
      }, 300);
    }
  }, []);

  return (
    <div className="bg-white font-inter px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Explore the World in 3D</h2>
        <p className="text-gray-600 mb-10">Hover over a country to view its name in real-time.</p>
      </div>

      <div className="relative w-full max-w-full min-h-[300px] h-[65vh] mx-auto rounded-xl shadow-lg border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe
            ref={globeRef}
            width={undefined} // allow auto-resize
            height={undefined}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="#ffffff"
            polygonsData={countries}
            polygonAltitude={0.01}
            polygonCapColor={() => "rgba(30, 144, 255, 0.6)"}
            polygonSideColor={() => "rgba(0, 100, 200, 0.2)"}
            polygonStrokeColor={() => "#111"}
            onPolygonHover={(d) => {
              globeRef.current.controls().autoRotate = !d;
            }}
            polygonLabel={(d) => `<b>${d.properties.name || "Unknown Country"}</b>`}
          />
        </div>
      </div>

      <p className="text-sm text-center text-gray-500 mt-8">
        Powered by react-globe.gl, Three.js, and World Atlas TopoJSON.
      </p>
    </div>
  );
};

export default GlobePage;
