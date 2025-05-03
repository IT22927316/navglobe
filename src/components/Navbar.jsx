import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoicon1 from "../assets/logo2.png";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const navContainerRef = useRef(null);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isNavVisible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between p-4">
          {/* Left Section: Logo */}
          <div className="flex items-center gap-7">
            <Link to="/">
              <motion.img
                src={logoicon1}
                className="w-28 cursor-pointer"
                alt="Logo"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
          </div>

          {/* Right Section: Desktop Menu & Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                Home
              </Link>
              <Link to="/countries" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                Countries
              </Link>
              <Link to="/regions" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                Map
              </Link>
              <Link to="/currency" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                Currency
              </Link>
              <Link to="/languages" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                Languages
              </Link>
              <Link to="/about" className="nav-hover-btn text-gray-800 hover:text-indigo-600 transition duration-300">
                About
              </Link>

              {isLoggedIn && (
                <Link to="/favorites">
                  <FiHeart size={22} className="text-white hover:text-indigo-600 cursor-pointer" />
                </Link>
              )}
              <Link to="/profile">
                <FiUser size={22} className="text-white hover:text-indigo-600 cursor-pointer" />
              </Link>
            </div>

            {/* Hamburger Icon for Mobile */}
            <button onClick={toggleMobileMenu} className="md:hidden text-white">
              {isMobileMenuOpen ? (
                <FaTimes size={30} className="text-white transition-transform duration-300" />
              ) : (
                <FaBars size={30} className="text-white transition-transform duration-300" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden absolute top-0 left-0 right-0 bg-black p-4 transition-all duration-500 ease-in-out",
            {
              "translate-y-0 opacity-100": isMobileMenuOpen,
              "-translate-y-full opacity-0": !isMobileMenuOpen,
            }
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              Home
            </Link>
            <Link to="/countries" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              Countries
            </Link>
            <Link to="/regions" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              Map
            </Link>
            <Link to="/currency" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              Currency
            </Link>
            <Link to="/languages" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              Languages
            </Link>
            <Link to="/about" className="text-white text-lg py-2 hover:text-indigo-300 transition duration-300">
              About
            </Link>

            {/* Icons */}
            <div className="flex gap-6 mt-4">
              {isLoggedIn && (
                <Link to="/favorites">
                  <FiHeart size={22} className="text-white hover:text-indigo-300" />
                </Link>
              )}
              <Link to="/profile">
                <FiUser size={22} className="text-white hover:text-indigo-300" />
              </Link>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="mt-4 text-white text-lg hover:text-indigo-300"
            >
              Close Menu
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
