import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const partners = [
  { id: 1, logo: "/AlhasaMunic.png", name_ar: "أمانة الأحساء", name_en: "Al-Ahsa Municipality" },
  { id: 2, logo: "/Foras.png", name_ar: "منصة فرص", name_en: "Foras Platform" },
  { id: 3, logo: "/Ministry-Municiplity.png", name_ar: "وزارة الشؤون البلدية", name_en: "Ministry of Municipal Affairs" },
  { id: 4, logo: "/Non-Profit-768x357.png", name_ar: "المركز الوطني لتنمية القطاع غير الربحي", name_en: "National Center for Non-Profit Sector" },
  { id: 5, logo: "/vision2030.png", name_ar: "رؤية 2030", name_en: "Vision 2030" },
];

const PartnersSection = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar');
  const isArabic = language === 'ar';

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(localStorage.getItem('language') || 'ar');
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-16 px-4 sm:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E4B33]" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {isArabic ? 'شركاؤنا في النجاح' : 'Our Trusted Partners'}
        </h2>
        <div className="w-20 h-1 bg-[#C89B3C] mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-500 mt-4 text-lg">
          {isArabic ? 'نفخر بشراكتنا مع هذه الجهات الرائدة' : 'We are proud to partner with these leading organizations'}
        </p>
      </div>

      {/* Logo Slider */}
      <div className="relative w-full overflow-hidden">
        <Marquee 
          gradient={false} 
          speed={35} 
          pauseOnHover={true}
          direction={isArabic ? "right" : "left"}
        >
          {[...partners, ...partners, ...partners, ...partners].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center mx-10 sm:mx-14 group"
            >
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <img
                  src={item.logo}
                  alt={isArabic ? item.name_ar : item.name_en}
                  className="h-[70px] sm:h-[90px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 mt-2 font-medium">
                {isArabic ? item.name_ar : item.name_en}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
