import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiHeart } from "react-icons/fi";
import logoicon1 from "../assets/logo.png";

const navLinks = [
  { to: "/", text: "HOME" },
  { to: "/countries", text: "COUNTRIES" },
  { to: "/regions", text: "MAP" },
  { to: "/currency", text: "CURRENCY" },
  { to: "/languages", text: "LANGUAGES" },
  { to: "/about", text: "ABOUT" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.img
            src={logoicon1}
            className="w-28 cursor-pointer"
            alt="Logo"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-8 text-sm font-medium font-general items-center">
          {navLinks.map(({ to, text }, index) => (
            <motion.li key={index} whileHover={{ scale: 1.05, y: -2 }}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center hover:text-blue-500 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                <p>{text}</p>
              </NavLink>
            </motion.li>
          ))}

          {/* Icons - right side */} 
          {isLoggedIn && (
            <li>
              <Link to="/favorites">
                <FiHeart size={20} className="text-gray-700 hover:text-blue-500" />
              </Link>
            </li>
          )}
          <li>
            <Link to="/profile">
              <FiUser size={20} className="text-gray-700 hover:text-blue-500" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <motion.button
          onClick={toggleMobileMenu}
          className="sm:hidden"
          whileHover={{ scale: 1.2 }}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6 text-gray-700" />
          ) : (
            <FaBars className="w-6 h-6 text-gray-700" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu Items */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden mt-4 bg-white px-4 py-4 rounded-lg shadow-md flex flex-col gap-4"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {navLinks.map(({ to, text }, index) => (
              <Link
                key={index}
                to={to}
                className="text-sm text-gray-800 hover:text-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text}
              </Link>
            ))}

            {/* Mobile Icons */}
            <div className="flex gap-6 mt-2">
              {isLoggedIn && (
                <Link to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                  <FiHeart size={20} className="text-gray-800 hover:text-blue-500" />
                </Link>
              )}
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <FiUser size={20} className="text-gray-800 hover:text-blue-500" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
