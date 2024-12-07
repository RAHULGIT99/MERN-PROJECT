// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const Carousel = () => {
//   // Sample image URLs (replace with your actual image paths)
//   const images = [
//     '/img/caro1.jpg',
//     '/img/procomp.jpg', 
//     '/api/placeholder/800/600?text=Image+3',
//     '/api/placeholder/800/600?text=Image+4'
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-rotate effect
//   useEffect(() => {
//     const rotateTimer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         (prevIndex + 1) % images.length
//       );
//     }, 6000); // Rotate every 3 seconds

//     // Cleanup interval on component unmount
//     return () => clearInterval(rotateTimer);
//   }, [images.length]);

//   // Manual navigation handlers
//   const goToPrevious = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = () => {
//     const isLastSlide = currentIndex === images.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   // Dot navigation
//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };

//   return (
//     <div className="relative w-full max-w-7xl mx-auto h-[550px] overflow-hidden">
//       {/* Main image container */}
//       <div className="relative w-full h-full">
//         {/* Navigation buttons */}
//         <button 
//           onClick={goToPrevious} 
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
//         >
//           <ChevronLeft size={30} />
//         </button>
//         <button 
//           onClick={goToNext} 
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
//         >
//           <ChevronRight size={30} />
//         </button>

//         {/* Sliding images */}
//         <div 
//           className="flex transition-transform duration-500 ease-in-out h-full"
//           style={{ 
//             transform: `translateX(-${currentIndex * 100}%)`,
//             width: `${images.length * 100}%`
//           }}
//         >
//           {images.map((image, index) => (
//             <div 
//               key={index} 
//               className="w-full h-full object-cover"
//             >
//               <img 
//                 src={image} 
//                 alt={`Slide ${index + 1}`} 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Dot indicators */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {images.map((_, slideIndex) => (
//             <div 
//               key={slideIndex}
//               onClick={() => goToSlide(slideIndex)}
//               className={`h-3 w-3 rounded-full cursor-pointer 
//                 ${currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400'}
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = () => {
  // Sample image URLs
  const images = [
    '/img/caro1.jpg',
    '/img/procomp.jpg',
    '/img/caro2.jpeg',
    '/img/caro3.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate effect
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Rotate every 3 seconds

    return () => clearInterval(rotateTimer); // Cleanup on unmount
  }, [images.length]);

  // Navigation handlers
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  // Dot navigation
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto h-[500px] overflow-hidden">
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight size={30} />
      </button>

            <div className="relative w-full max-w-8xl mx-auto h-[500px] overflow-hidden bg-gray-900">
        {/* Sliding images */}
        <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 25}%`,//for the length.see
            }}
        >
            {images.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
                <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                />
            </div>
            ))}
        </div>
        </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              currentIndex === slideIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
