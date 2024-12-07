import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {Globe, FileText,BarChart2,Database,ArrowRight} from 'lucide-react';
import Carousel from './Carousel';
import Points from './Points';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import FAQ from './FAQ';
import Chatbot from './Chatbot';


{/*interative card funtion */}
const InteractiveCard = ({ section, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleCardClick = (route) => {
    console.log("Navigating to:", route);
    navigate(route);
  };

  return (
    <motion.div 
      className={`w-full h-[400px] ${section.bgColor} rounded-lg flex items-center p-8 shadow-md overflow-hidden relative`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(section.route)}
    >
      <div className="w-1/2 pr-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.5 }
          }}
        >
          <section.icon className={`${section.textColor} mb-6`} size={72} />
          <h2 className={`text-4xl font-bold ${section.textColor} mb-6`}>
            {section.title}
          </h2>
          <p className={`${section.textColor} opacity-80 text-xl mb-8`}>
            {section.description}
          </p>
          <motion.button
            className={`mt-6 px-8 py-3 bg-white ${section.textColor} rounded-full hover:shadow-lg transition-all font-semibold text-lg flex items-center group`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click handler
              handleCardClick(section.route); // Navigate to the route
            }}
          >
            Learn More
            <ArrowRight
              className={`ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`}
              size={20}
            />
          </motion.button>

        </motion.div>
      </div>
      <div className="w-1/2 h-full bg-white rounded-lg shadow-md flex items-center justify-center p-6 relative overflow-hidden">
        <motion.img 
          src={section.imageSrc} 
          alt={`${section.title} Showcase`} 
          className="max-w-full max-h-full object-contain z-10 absolute"
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: 1,
            rotate: 1,
            transition: { duration: 0.3 }
          }}
        />
        {/* Animated background effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br opacity-20"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, ${isHovered ? section.bgColor.replace('bg-', 'from-') : 'transparent'}, transparent)` 
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            transition: { duration: 0.3 }
          }}
        />
      </div>
    </motion.div>
  );
};
{/*finished card function */}


const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  // Refs for scrolling
  const homeRef = useRef(null);
  const summarizerRef = useRef(null);
  const productComparatorRef = useRef(null);
  const visualAnalyticsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
 
  

 
 

 

  const handleVideoClick = () => {
    setIsPlaying(prevState => !prevState); // Toggle play state
  }

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sections data for dynamic rendering
  const sections = [
    {
      icon: FileText,
      title: 'Summarizer',
      description: 'Intelligent text summarization tool that extracts key insights quickly.',
      ref: summarizerRef,
      bgColor: 'bg-green-100',
      textColor: 'text-green-900',
      imageSrc: '/img/procomp.jpg',
      route: '/summarize'
    },
    {
      icon: Database,
      title: 'Product Comparator',
      description: 'Advanced comparison tool for analyzing product features and specifications.',
      ref: productComparatorRef,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-900',
      imageSrc: '/img/caro1.jpg',
      route: '/compare', 
    },
    {
      icon: BarChart2,
      title: 'Visual Analytics',
      description: 'Powerful data visualization platform for complex insights and trends.',
      ref: visualAnalyticsRef,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-900',
      imageSrc: '/img/procomp.jpg',
      route: '/visual'
    }
  ];

  // const handleCardClick = (route) => {
  //   // Navigate to the route passed in
  //   navigate(route);
  // };

  return (
    <div ref={homeRef} className="relative min-h-screen bg-gray-800 text-gray-100">
    {/* Scroll Progress Bar */}
    <motion.div
      className="fixed top-0 left-0 z-[100] h-1 bg-blue-600"
      style={{ width: `${scrollProgress}%` }}
    />
      {/* Navbar - with interactive hover effects */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md shadow-md"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold text-white-600"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            MayaBazar
          </motion.div>
          <div className="space-x-6">
            {[
              { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              { name: 'Summarizer', action: () => scrollToSection(summarizerRef) },
              { name: 'Product Comparator', action: () => scrollToSection(productComparatorRef) },
              { name: 'Visual Analytics', action: () => scrollToSection(visualAnalyticsRef) }
            ].map((item) => (
              <motion.button 
                key={item.name}
                onClick={item.action}
                className="px-3 py-2 rounded-lg hover:bg-blue-400 text-white-800"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* carousel for images */}
        <Carousel className="mb-20" />

    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={scrollVariants}
      className="container mx-auto px-4 mt-20 mb-16"
    >
      {/* About and Video Section */}
      <div className="bg-yellow-50  {/*rounded-2xl*/}  p-7 shadow-lg flex flex-row items-center   h-[400px]" > {/*space-x-10*/}
        {/* Left Side: About Us Content */}
        <div className="flex-1">
          <div className="flex items-center mb-6">
            <Globe className="text-yellow-600 mr-4" size={48} />
            <div>
              <h2 className="text-3xl font-bold text-yellow-900">
                About Our Company
              </h2>
              <p className="text-yellow-800 text-lg">
                Innovative solutions driving digital transformation
              </p>
            </div>
          </div>
          <p className="text-yellow-800">
            We specialize in creating cutting-edge technology to empower
            businesses and individuals. Our solutions are tailored to meet
            modern challenges and drive growth.
          </p>
        </div>
        {/* Right Side: Video Container */}
        <div className="flex-1 rounded-2xl overflow-hidden h-full bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/wTgrZE9RWNY?autoplay=${
              isPlaying ? 1 : 0
            }&start_radio=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </motion.section>
        {/*for the points of the service */}
      <div>
        <Points/>

      </div>

          {/*cards interactive */}
    <div className="pt-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
      {sections.map((section) => (
        <motion.section
          key={section.title}
          ref={section.ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
          className="mb-8 last:mb-0"
        >
          <InteractiveCard
            section={section}
          />
        </motion.section>
      ))}
<br/>
      </div>
    </div>
    <div>
      <FAQ/>
    </div>
    <Chatbot/>
<br/>
      {/* footer */}
      <Footer  />
    </div>
  </div>
  );
};

export default Home;