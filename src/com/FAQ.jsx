import React, { useState, useRef } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    {
      question: "Explore Our Diverse Vehicle Fleet",
      answer: "Discover an exceptional range of vehicles tailored to every journey. From sleek electric cars and luxurious sedans to powerful SUVs, our meticulously maintained fleet ensures comfort, style, and performance for every adventure."
    },
    {
      question: "Seamless Booking Experience",
      answer: "Our state-of-the-art booking platform offers intuitive, hassle-free reservations. With real-time availability, transparent pricing, and instant confirmations, renting your dream vehicle is just a few clicks away."
    },
    {
      question: "Flexible Rental Policies",
      answer: "We prioritize your convenience with adaptable rental terms. Enjoy free cancellations, multiple driver options, and comprehensive insurance packages designed to provide peace of mind and maximum flexibility."
    },
    {
      question: "Advanced Vehicle Protection",
      answer: "Every vehicle undergoes rigorous safety inspections and maintenance. Our comprehensive protection plans and 24/7 roadside assistance ensure a secure and worry-free rental experience from start to finish."
    },
    {
      question: "Personalized Rental Solutions",
      answer: "Beyond standard rentals, we offer customized solutions for corporate accounts, long-term leases, and special event transportation. Our team is dedicated to meeting your unique mobility needs."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto p-8 bg-white rounded-3xl shadow-2xl w-[90vw]">
  <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
    Rental Insights & Information
  </h2>
  
  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <div 
        key={index} 
        className="border-b border-gray-200 last:border-b-0"
      >
        <button 
          onClick={() => toggleAccordion(index)}
          className={`
            w-full text-left p-5 flex justify-between items-center 
            ${activeIndex === index 
              ? 'bg-gray-50 text-gray-900' 
              : 'text-gray-800 hover:bg-gray-50'}
            transition-all duration-300 rounded-lg
          `}
        >
          <span className="text-lg font-semibold">
            {faq.question}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`
              h-6 w-6 transform transition-transform duration-300 
              ${activeIndex === index ? 'rotate-180' : 'rotate-0'}
            `}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
        
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${activeIndex === index 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'}
          `}
        >
          <div className="p-5 text-gray-600 bg-white">
            <p className="leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default FAQ;