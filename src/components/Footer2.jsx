import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";
import React from 'react';

import logoicon from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="text-gray-700">
      <hr />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logoicon} className="mb-5 w-32" alt="NavGlobe Logo" />
            </Link>
            <p className="mb-6">
              Explore the world one country at a time. Discover facts, cultures, languages, and more with NavGlobe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-black transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/countries" className="hover:text-black transition-colors">
                  Explore Countries
                </Link>
              </li>
              <li>
                <Link to="/regions" className="hover:text-black transition-colors">
                  Regional Highlights
                </Link>
              </li>
              <li>
                <Link to="/currency" className="hover:text-black transition-colors">
                  Currency Insights
                </Link>
              </li>
              <li>
                <Link to="/languages" className="hover:text-black transition-colors">
                  Languages Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-black transition-colors">
                  About NavGlobe
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-black transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="hover:text-black transition-colors">
                  Newsletter Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-black">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 flex-shrink-0 mt-0.5 text-gray-500" />
                <span>123 Global Lane, World City, Earth 10100</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-gray-500" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-gray-500" />
                <span>hello@navglobe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NavGlobe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <FaCcVisa size={32} className="text-gray-700 hover:text-black transition-colors" />
            <FaCcMastercard size={32} className="text-gray-700 hover:text-black transition-colors" />
            <FaCcPaypal size={32} className="text-gray-700 hover:text-black transition-colors" />
            <FaApplePay size={32} className="text-gray-700 hover:text-black transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;