import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  { id: 1, logo: "/AlhasaMunic.png" },
  { id: 2, logo: "/Foras.png" },
  { id: 3, logo: "/Ministry-Municiplity.png" },
  { id: 4, logo: "/Non-Profit-768x357.png" },
  { id: 5, logo: "/vision2030.png" },
];

const PartnersSection = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-20 pb-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-900">
          Our Trusted Partners
        </h2>
        <div className="w-16 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Logo Slider */}
      <div className="relative w-full overflow-hidden">
        <Marquee 
          gradient={false} 
          speed={40} 
          pauseOnHover={true}
          direction="right"
        >
          {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((item, index) => (
            <div
              key={`${item.id}-${index}`}

              className="flex-shrink-0 flex items-center justify-center mx-12"
            >
              <img
                src={item.logo}
                alt="partner-logo"
                className="h-[90px] w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersSection;
