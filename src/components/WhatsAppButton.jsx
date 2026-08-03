import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  const text = language === 'ar' ? 'تواصل مع مثوى' : 'Contact Mathwaa';

  return (
    <a 
      href="https://wa.me/966539626662" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group flex items-center gap-3 cursor-pointer"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ textDecoration: 'none' }}
    >
      {/* Text Bubble */}
      <div className="bg-white px-5 py-3 rounded-full shadow-lg border border-[#C89B3C]/30 text-[#0E4B33] font-bold text-base transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        {text}
      </div>
      
      {/* Icon Button */}
      <div className="relative flex items-center justify-center w-16 h-16 bg-[#0E4B33] rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 border-2 border-[#C89B3C]">
        {/* Pulsing ring animation */}
        <span className="absolute w-[140%] h-[140%] rounded-full border border-[#C89B3C] animate-ping opacity-30"></span>
        <span className="absolute w-[115%] h-[115%] rounded-full border border-[#0E4B33] animate-ping opacity-20" style={{ animationDelay: '0.2s' }}></span>
        
        <FaWhatsapp size={36} className="text-[#C89B3C]" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
