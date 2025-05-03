import React from 'react';
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import regionsImg from '../assets/regions.jpg';
import languageImg from '../assets/language.jpeg';
import currencyImg from '../assets/language.jpg';

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {src.endsWith(".mp4") ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={title}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-white">
    <div className="container mx-auto px-3 md:px-10 pt-24 pb-0 mb-24">
    <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Explore the World of Data With Us</h2>
        <p className="text-gray-600 mb-10">Hover over a country to view its name in real-time.</p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/countries.mp4"
          title="Countries"
          description="Explore information on 250+ countries including population, capital, and flags. Powered by REST Countries API."
          isComingSoon={false}
        />
      </BentoTilt>

      <div className="grid h-[96vh] w-full grid-cols-2 grid-rows-2 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src={regionsImg}
            title="Regions"
            description="Dive into continents and regions to learn how countries are grouped geographically."
            isComingSoon={false}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src={languageImg}
            title="Languages"
            description="Discover the languages spoken across the world — from English and Mandarin to Swahili and beyond."
            isComingSoon={false}
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src={currencyImg}
            title="Currencies"
            description="Understand each country’s official currency, from Dollars to Dinars, Yen to Euros."
            isComingSoon={false}
          />
        </BentoTilt>
      </div>
    </div>
    <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Explore the World in 3D</h2>
        <p className="text-gray-600 mb-10">Hover over a country to view its name in real-time.</p>
    </div>
  </section>
);

export default Features;
