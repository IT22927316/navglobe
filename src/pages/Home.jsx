import React from 'react'
import Hero from "../components/Hero";
import Features from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer2";
import NavBar from '../components/Navbar2';
import Globe from '../components/Globe';
import NewsLetter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Features />
      <Globe />
      <Contact />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home