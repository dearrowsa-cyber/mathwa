import React, { useState, useEffect } from "react";

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
    <section className="w-full overflow-hidden bg-white py-16 px-4 sm:px-10">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E4B33]" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {isArabic ? 'شركاؤنا في النجاح' : 'Our Trusted Partners'}
        </h2>
        <div className="w-20 h-1 bg-[#C89B3C] mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-500 mt-4 text-lg">
          {isArabic ? 'نفخر بشراكتنا مع هذه الجهات الرائدة' : 'We are proud to partner with these leading organizations'}
        </p>
      </div>

      {/* Grid instead of Marquee to ensure rendering on all devices and SSR */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        {partners.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center group w-[140px] sm:w-[180px]"
          >
            <div className="w-full bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-[#C89B3C]/30 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 flex items-center justify-center aspect-[4/3]">
              <img
                src={item.logo}
                alt={isArabic ? item.name_ar : item.name_en}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 filter grayscale hover:grayscale-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="text-xs sm:text-sm text-gray-500 mt-3 font-medium text-center">
              {isArabic ? item.name_ar : item.name_en}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
