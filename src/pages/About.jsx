import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Globe, Compass } from "lucide-react"
import aboutimg from '../assets/about.jpg';
import NewsLetter from '../components/Newsletter';
import Title from '../components/Title';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer2';

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const About = () => {
  const values = [
    {
      title: "Accuracy",
      description: "We prioritize reliable, up-to-date information on all countries using trusted APIs.",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: "Inclusivity",
      description: "Our platform is designed for users of all backgrounds, making learning accessible to everyone.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Global Insight",
      description: "We go beyond borders to bring you meaningful data on languages, currencies, and cultures.",
      icon: <Globe className="h-8 w-8 text-primary" />,
    },
    {
      title: "Exploration",
      description: "Encouraging curiosity through interactive maps, search filters, and visual statistics.",
      icon: <Compass className="h-8 w-8 text-primary" />,
    },
  ]

  const timeline = [
    {
      year: "2022",
      title: "Conceptualization",
      description: "The idea for a global info platform emerged during a university project brainstorming session.",
    },
    {
      year: "2023",
      title: "Development Phase",
      description: "We started building the foundation with REST Countries API, React, and Node.js.",
    },
    {
      year: "2024",
      title: "Feature Expansion",
      description: "Integrated region filters, detailed pages, currency/language-specific endpoints, and graph visuals.",
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "Our app is now live, providing country-based knowledge and global connectivity to all users.",
    },
  ];

  return (
    <>
    <Navbar />
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-circular-web'>
      <motion.div className='text-2xl pt-8' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
        <h2 className='text-4xl font-bold'>Welcome to WorldView – Your Gateway to Global Insights</h2>
      </motion.div>

      <motion.div className='my-10 flex flex-col md:flex-row gap-16' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
        <img className='w-[420px] h-[600px]' src={aboutimg} alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to WorldView, your one-stop platform for exploring countries, cultures, and facts. We’re committed to delivering accurate, easy-to-understand data sourced from reliable APIs. Our mission is to make geography and global awareness accessible to everyone—from students and educators to travelers and curious minds.</p>

          <p>With interactive maps, filterable search, and beautifully designed interfaces, we turn raw data into meaningful exploration. From capital cities and languages to population stats and currency codes, our app provides a complete snapshot of every nation.</p>

          <b className='text-gray-800'>Our Mission</b>

          <p>At WorldView, our mission is to educate, inspire, and connect. We believe knowledge of the world fosters empathy, awareness, and unity. That’s why we’ve built a platform that showcases the diversity of our planet while maintaining accuracy, speed, and user-friendliness.</p>

          <p>WorldView isn’t just a database—it's a journey. Whether you're a learner, a traveler, or simply curious, we help you explore the world in a smarter, more engaging way.</p>
        </div>
      </motion.div>

      <motion.div className='text-2xl py-4' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
        <Title text1={'THE'} text2={' WORLDVIEW PROMISE '} />
      </motion.div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        {values.map((item, index) => (
          <motion.div key={index} className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
            <b className='text-2xl'>{item.title}</b>
            <p className='text-gray-600'>{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <motion.div className='' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Journey</h2>
              <p className="text-lg text-neutral-600">
                From an idea to an information-rich experience, here’s how WorldView came to life.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-200"></div>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className="flex-1"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm mx-4 md:mx-8 relative">
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                      <p className="text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div className='' initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInVariant}>
        <NewsLetter />
      </motion.div>

      <Footer />
    </div>
    </>
  );
};

export default About;
