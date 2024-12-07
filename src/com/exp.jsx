// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Play, Globe, Layers, FileText, BarChart2, Database } from "lucide-react";

// const Home = () => {
//   const [activeSection, setActiveSection] = useState("home");
//   const homeRef = useRef(null);
//   const summarizerRef = useRef(null);
//   const productComparatorRef = useRef(null);
//   const visualAnalyticsRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const scrollPosition = window.scrollY;
//       setScrollProgress((scrollPosition / totalHeight) * 100);

//       const sectionOffsets = [
//         { section: "home", ref: homeRef },
//         { section: "summarizer", ref: summarizerRef },
//         { section: "productComparator", ref: productComparatorRef },
//         { section: "visualAnalytics", ref: visualAnalyticsRef },
//       ];

//       const currentSection = sectionOffsets.find(
//         ({ ref }) =>
//           ref.current &&
//           window.scrollY >= ref.current.offsetTop - 100 &&
//           window.scrollY < ref.current.offsetTop + ref.current.offsetHeight - 100
//       );
//       setActiveSection(currentSection?.section || "home");
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sections = [
//     {
//       icon: FileText,
//       title: "Summarizer",
//       description: "Intelligent text summarization tool that extracts key insights quickly.",
//       ref: summarizerRef,
//       bgColor: "bg-green-900/20",
//       textColor: "text-green-300",
//       iconColor: "text-green-400"
//     },
//     {
//       icon: Database,
//       title: "Product Comparator",
//       description: "Advanced comparison tool for analyzing product features and specifications.",
//       ref: productComparatorRef,
//       bgColor: "bg-blue-900/20",
//       textColor: "text-blue-300",
//       iconColor: "text-blue-400"
//     },
//     {
//       icon: BarChart2,
//       title: "Visual Analytics",
//       description: "Powerful data visualization platform for complex insights and trends.",
//       ref: visualAnalyticsRef,
//       bgColor: "bg-purple-900/20",
//       textColor: "text-purple-300",
//       iconColor: "text-purple-400"
//     },
//   ];

//   return (
//     <div ref={homeRef} className="relative min-h-screen bg-gray-900 text-gray-100">
//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 z-[100] h-1 bg-blue-600"
//         style={{ width: `${scrollProgress}%` }}
//       />

//       {/* Navbar */}
//       <motion.nav
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md shadow-md"
//       >
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="text-2xl font-bold text-blue-400">MyBrand</div>
//           <div className="space-x-6">
//             {[
//               { name: "Home", section: "home", ref: homeRef },
//               { name: "Summarizer", section: "summarizer", ref: summarizerRef },
//               { name: "Product Comparator", section: "productComparator", ref: productComparatorRef },
//               { name: "Visual Analytics", section: "visualAnalytics", ref: visualAnalyticsRef },
//             ].map((item) => (
//               <button
//                 key={item.name}
//                 onClick={() => scrollToSection(item.ref)}
//                 className={`px-3 py-2 rounded-lg ${
//                   activeSection === item.section 
//                     ? "bg-blue-600 text-white" 
//                     : "hover:bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </motion.nav>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 pt-20 pb-10">
//         {/* Hero Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full h-[400px] bg-gray-800 rounded-2xl mb-16 relative overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
//             <button
//               className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-all"
//               onClick={() => setIsPlaying((prev) => !prev)}
//             >
//               <Play className="text-blue-400" size={48} />
//             </button>
//           </div>
//           <iframe
//             className="w-full h-full"
//             src={`https://www.youtube.com/embed/wTgrZE9RWNY?autoplay=${isPlaying ? 1 : 0}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </motion.section>

//         {/* Section Cards */}
//         {sections.map((section) => (
//           <motion.section
//             key={section.title}
//             ref={section.ref}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="w-full mb-24"
//           >
//             <div
//               className={`flex flex-col md:flex-row items-center ${section.bgColor} rounded-lg p-6 shadow-md hover:shadow-xl transition`}
//             >
//               <div className="flex-1 text-center md:text-left">
//                 <section.icon className={`${section.iconColor || section.textColor} mb-4`} size={48} />
//                 <h2 className={`text-2xl font-bold ${section.textColor}`}>{section.title}</h2>
//                 <p className={`text-lg ${section.textColor} opacity-80`}>{section.description}</p>
//               </div>
//               <div className="flex-1 mt-6 md:mt-0">
//                 <img
//                   src="/api/placeholder/500/300"
//                   alt={`${section.title} Showcase`}
//                   className="rounded-lg shadow-lg w-full"
//                 />
//               </div>
//             </div>
//           </motion.section>
//         ))}
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-300 py-10">
//         <div className="container mx-auto text-center">
//           <p>© 2024 MyBrand. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


// 

{/* About Us Container
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
          className="container mx-auto px-4 mt-20 mb-16"
        >
          <div className="bg-yellow-100 h-[00px] w-full flex items-center px-4">
            <div className="flex items-center">
              <Globe className="text-yellow-600 mr-6" size={48} />
              <div>
                <h2 className="text-2xl font-bold text-yellow-900">About Our Company</h2>
                <p className="text-yellow-800">Innovative solutions driving digital transformation</p>
              </div>
            </div>
          </div>
        </motion.section>

         Video Container 
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
          className="container mx-auto px-4 w-full h-[400px] mb-16"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/wTgrZE9RWNY?autoplay=${isPlaying ? 1 : 0}&start_radio=1`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.section> 

       <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={scrollVariants}
      className="container mx-auto px-4 mt-20 mb-16 h-[200]"
    >
      {/* About and Video Section 
      <div className="bg-yellow-100 rounded-2xl p-8 shadow-lg flex flex-row items-center space-x-8 h-[200]">
        {/* Left Side: About Us Content 
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

        {/* Right Side: Video Container 
        <div className="flex-1 rounded-2xl overflow-hidden h-64 bg-black">
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
    </motion.section> */}

     {/* Rectangle Image Container
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollVariants}
          className="container mx-auto px-4 mb-16"
        >
          <div class="container mx-auto px-4 mb-16">
          <div class="w-full h-[400px] bg-transparent flex items-center">
            <div class="w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Layers class="text-blue-600 mr-6" size={48} />
              <div>
                <h3 class="text-xl font-bold text-blue-900">Visual Showcase</h3>
                <p class="text-blue-800">Explore our creative visual portfolio</p>
              </div>
              <div class="ml-auto mr-4">
                <img src="/api/placeholder/200/80" alt="Portfolio" class="h-full object-cover rounded-md" />
              </div>
            </div>
          </div>
        </div>
        </motion.section> */}