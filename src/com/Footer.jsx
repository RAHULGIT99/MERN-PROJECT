// import React from 'react';
// import { motion } from 'framer-motion';
// import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   // Contact and Social Media Information
//   const contactInfo = {
//     email: 'contact@mybrand.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Tech Lane, Innovation City, IN 12345',
//     socialLinks: {
//       instagram: 'https://www.instagram.com/yourbrand',
//       twitter: 'https://www.twitter.com/yourbrand',
//       youtube: 'https://www.youtube.com/yourbrand'
//     }
//   };

//   return (
//     <motion.footer
//       className="bg-blue-900 text-white py-12"
//       whileHover={{
//         backgroundColor: 'rgb(30, 58, 138)', // Slightly lighter blue
//         transition: { duration: 0.3 }
//       }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Connect With Us (Left Side) */}
//           <div className="text-center md:text-left">
//             <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
//             <div className="flex justify-center md:justify-start space-x-6">
//               {/* Instagram */}
//               <motion.a
//                 href={contactInfo.socialLinks.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-pink-500"
//                 whileHover={{
//                   scale: 1.2,
//                   rotate: 360,
//                   transition: { duration: 0.3 }
//                 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Instagram size={28} />
//               </motion.a>
              
//               {/* Twitter/X */}
//               <motion.a
//                 href={contactInfo.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-blue-400"
//                 whileHover={{
//                   scale: 1.2,
//                   rotate: 360,
//                   transition: { duration: 0.3 }
//                 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Twitter size={28} />
//               </motion.a>
              
//               {/* YouTube */}
//               <motion.a
//                 href={contactInfo.socialLinks.youtube}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-white hover:text-red-500"
//                 whileHover={{
//                   scale: 1.2,
//                   rotate: 360,
//                   transition: { duration: 0.3 }
//                 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Youtube size={28} />
//               </motion.a>
//             </div>
//           </div>

//           {/* Copyright Section */}
//           <div className="text-center">
//             <motion.p
//               whileHover={{
//                 scale: 1.05,
//                 transition: { duration: 0.2 }
//               }}
//               className="text-lg font-semibold"
//             >
//               © 2024 MyBrand
//             </motion.p>
//             <p className="text-sm opacity-75">All Rights Reserved</p>
//           </div>

//           {/* Contact Us (Right Side) */}
//           <div className="text-center md:text-right">
//             <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//             <div className="space-y-2">
//               <motion.div 
//                 className="flex items-center justify-center md:justify-end gap-2"
//                 whileHover={{
//                   scale: 1.05,
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 <Mail size={20} className="text-white" />
//                 <a 
//                   href={`mailto:${contactInfo.email}`} 
//                   className="hover:text-blue-300 transition-colors"
//                 >
//                   {contactInfo.email}
//                 </a>
//               </motion.div>
//               <motion.div 
//                 className="flex items-center justify-center md:justify-end gap-2"
//                 whileHover={{
//                   scale: 1.05,
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 <Phone size={20} className="text-white" />
//                 <a 
//                   href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
//                   className="hover:text-blue-300 transition-colors"
//                 >
//                   {contactInfo.phone}
//                 </a>
//               </motion.div>
//               <motion.div 
//                 className="flex items-center justify-center md:justify-end gap-2"
//                 whileHover={{
//                   scale: 1.05,
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 <MapPin size={20} className="text-white" />
//                 <span className="text-sm">
//                   {contactInfo.address}
//                 </span>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, X, Mail, Phone, MapPin, Copy } from 'lucide-react';

const Footer = () => {
  const [copied, setCopied] = useState(false);

  // Contact and Social Media Information
  const contactInfo = {
    email: 'kmitengineer1@gmail.com',
    phone: '987654321',
    address: '123 Tech Lane, Innovation City, IN 12345',
    socialLinks: {
      instagram: 'https://www.instagram.com/yourbrand',
      twitter: 'https://www.twitter.com/yourbrand',
      youtube: 'https://www.youtube.com/yourbrand'
    }
  };

  // Function to copy contact information
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-12 shadow-2xl"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Social Media Section (Left) */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {Object.entries(contactInfo.socialLinks).map(([platform, url]) => {
                const iconMap = {
                  instagram: { icon: Instagram, color: 'hover:text-pink-500' },
                  twitter: { icon: X, color: 'hover:text-blue-400' },
                  youtube: { icon: Youtube, color: 'hover:text-red-500' }
                };
                const { icon: Icon, color } = iconMap[platform];
                
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white ${color} transition-all duration-300`}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={32} strokeWidth={1.5} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Copyright Section (Center) */}
          <motion.div 
            className="text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.p
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="text-2xl font-bold text-white"
            >
               MayaBazar © 2024 
            </motion.p>
            <p className="text-sm opacity-75">All Rights Reserved</p>
            
            {/* Clipboard Notification */}
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information (Right) */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              {[
                { 
                  icon: Mail, 
                  text: contactInfo.email, 
                  href: `mailto:${contactInfo.email}`,
                  copyText: contactInfo.email
                },
                { 
                  icon: Phone, 
                  text: contactInfo.phone, 
                  href: `tel:${contactInfo.phone.replace(/\D/g, '')}`,
                  copyText: contactInfo.phone
                },
                { 
                  icon: MapPin, 
                  text: contactInfo.address,
                  copyText: contactInfo.address
                }
              ].map(({ icon: Icon, text, href, copyText }, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center md:justify-end gap-3"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Icon size={24} className="text-white" />
                  {href ? (
                    <a 
                      href={href} 
                      className="hover:text-blue-300 transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                  <motion.button
                    onClick={() => copyToClipboard(copyText)}
                    className="text-white hover:text-blue-300 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;