import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Sparkles, 
  BarChart, 
  MessageSquareText, 
  TrendingUp 
} from 'lucide-react';

const Points = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);

  // 3D Hover Variants
  const iconVariants = {
    initial: { 
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    },
    hover: (params) => ({
      rotateX: params.rotateX,
      rotateY: params.rotateY,
      scale: 1.1,
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    })
  };

  // Points data with enhanced details
  const points = [
    { 
      Icon: Clock, 
      color: 'bg-blue-100 text-blue-600', 
      title: 'Last Minute Shopping',
      description: 'Instant deals and rapid purchase options',
      details: 'Find and buy products in seconds with our intelligent last-minute shopping feature.',
      gradient: 'from-blue-200 to-blue-400'
    },
    { 
      Icon: Sparkles, 
      color: 'bg-purple-100 text-purple-600', 
      title: 'AI Comparison',
      description: 'Smart product insights',
      details: 'Advanced AI algorithms compare products across multiple dimensions for optimal choice.',
      gradient: 'from-purple-200 to-purple-400'
    },
    { 
      Icon: BarChart, 
      color: 'bg-green-100 text-green-600', 
      title: 'Visual Analytics',
      description: 'Data-driven visualizations',
      details: 'Transform complex data into intuitive, easy-to-understand visual representations.',
      gradient: 'from-green-200 to-green-400'
    },
    { 
      Icon: MessageSquareText, 
      color: 'bg-yellow-100 text-yellow-600', 
      title: 'Summarized Feedbacks',
      description: 'Concise customer insights',
      details: 'AI-powered summaries of customer reviews, highlighting key sentiments and trends.',
      gradient: 'from-yellow-200 to-yellow-400'
    },
    { 
      Icon: TrendingUp, 
      color: 'bg-red-100 text-red-600', 
      title: 'Price Comparator',
      description: 'Best deals instantly',
      details: 'Real-time price tracking across multiple platforms to ensure you get the best value.',
      gradient: 'from-red-200 to-red-400'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto px-4 mb-16 perspective-1000"
    >
      <div 
        className="w-full h-[500px] bg-transparent flex items-center"
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => {
          setIsContainerHovered(false);
          setHoveredPoint(null);
        }}
      >
        <div className={`
          w-full h-full 
          bg-gradient-to-br from-blue-50 to-blue-100 
          rounded-3xl 
          flex items-center 
          p-8 
          shadow-2xl
          transition-all 
          duration-300 
          ${isContainerHovered ? 'scale-[1.01]' : ''}
        `}>
          {/* Left side with interactive points */}
          <div className="flex flex-col space-y-6 mr-8 w-1/3">
            {points.map((point, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredPoint(index)}
                onHoverEnd={() => setHoveredPoint(null)}
                className={`
                  flex items-center
                  p-4 
                  bg-white 
                  rounded-2xl 
                  shadow-lg
                  cursor-pointer 
                  transition-all 
                  duration-300 
                  relative
                  overflow-hidden
                  ${hoveredPoint === index ? 'ring-2 ring-blue-400' : ''}
                `}
              >
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  variants={iconVariants}
                  custom={{
                    rotateX: (Math.random() - 0.5) * 15,
                    rotateY: (Math.random() - 0.5) * 15
                  }}
                  className={`
                    ${point.color}
                    rounded-full 
                    p-4 
                    mr-4 
                    flex 
                    items-center 
                    justify-center
                    bg-gradient-to-br 
                    ${point.gradient}
                    transform
                    transition-transform
                    duration-300
                  `}
                >
                  <point.Icon size={32} className="text-white" />
                </motion.div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-gray-800">{point.title}</h4>
                  <p className="text-xs text-gray-600">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow pl-8">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Smart Shopping Companion</h3>
            <p className="text-blue-800 text-lg mb-6">
              Revolutionize your shopping experience with AI-powered insights, 
              comprehensive analytics, and instant comparisons.
            </p>
            
            {/*Animated details*/}
            <AnimatePresence>
              {hoveredPoint !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                >
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">
                    {points[hoveredPoint].title}
                  </h4>
                  <p className="text-gray-700">
                    {points[hoveredPoint].details}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Image on the right */}
          <motion.div 
            className="ml-auto w-1/3"
            whileHover={{ 
              scale: 1.05,
              rotate: [(Math.random() - 0.5) * 2, 0],
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 10
              }
            }}
          >
            <img 
              src="image.png" 
              alt="Shopping Companion" 
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Points;