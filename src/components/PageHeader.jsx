import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PageHeader = ({ title, description, breadcrumbs }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  return (
    <div className="bg-[#0E4B33] text-white py-12 md:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-[#C89B3C] blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 rounded-full bg-[#C89B3C] blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Alexandria, sans-serif' }}>
            {title}
          </h1>
          
          {description && (
            <p className="text-white/80 max-w-2xl text-base md:text-lg mb-8">
              {description}
            </p>
          )}
          
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center text-sm font-medium bg-white/10 backdrop-blur-md py-2 px-4 rounded-full border border-white/20">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className="mx-2 text-white/50">
                      {isArabic ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
                    </span>
                  )}
                  {crumb.to ? (
                    <Link to={crumb.to} className="text-white/80 hover:text-[#C89B3C] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#C89B3C] font-bold">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
