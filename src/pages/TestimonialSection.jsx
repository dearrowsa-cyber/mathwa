import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TestimonialSection = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar');
  const isArabic = language === 'ar';
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(localStorage.getItem('language') || 'ar');
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  // Static testimonials that always show - proper Arabic content for Mathwaa
  const testimonials = [
    { id: 1, name: 'أحمد الغامدي', role: 'متطوع', content: 'تجربة رائعة مع جمعية مثوى، منظومة عمل احترافية وتأثير حقيقي في إكرام الموتى. فخور بكوني جزءاً من هذا العمل الخيري العظيم.', rating: 5 },
    { id: 2, name: 'سارة الدوسري', role: 'متبرعة', content: 'شفافية ومصداقية عالية في التعامل وتميز في تنفيذ المبادرات. بارك الله في جهودهم، أنصح بدعم هذه الجمعية المميزة.', rating: 5 },
    { id: 3, name: 'محمد العتيبي', role: 'مستفيد', content: 'شكراً جزيلاً لجمعية مثوى على وقفتهم ودعمهم الدائم. الخدمات ممتازة جداً ويقدمونها بكل كرامة واحترام لنا.', rating: 5 },
    { id: 4, name: 'فاطمة الزهراني', role: 'شريكة نجاح', content: 'رأينا أثراً ملموساً من خلال شراكتنا مع مثوى. إدارة واعية تسعى للتميز ودعم المجتمع بكفاءة واحترافية عالية.', rating: 5 },
    { id: 5, name: 'سالم الشمري', role: 'متبرع', content: 'جهود جبارة تُبذل من قبل الإدارة وفريق العمل، من أفضل الجمعيات التي تعاملت معها على الإطلاق. وفقكم الله للخير.', rating: 5 },
    { id: 6, name: 'نورة السبيعي', role: 'متطوعة', content: 'تنظيم ممتاز للفرص التطوعية في خدمة الموتى وأسرهم. أشعر بسعادة غامرة عندما أشارك في مبادراتهم النبيلة.', rating: 5 },
    { id: 7, name: 'خالد العنزي', role: 'مستفيد', content: 'لمست فيهم الاهتمام الصادق والرعاية المستمرة. بارك الله في جهود المتبرعين والعاملين، فهذا العمل يثلج الصدر.', rating: 5 },
    { id: 8, name: 'ريم القحطاني', role: 'داعمة', content: 'جمعية رائدة تتلمس حاجات الناس بدقة وتقدم خدمات حقيقية ومؤثرة في مجال إكرام الموتى. نفخر بدعمها.', rating: 5 },
    { id: 9, name: 'عبدالله السالم', role: 'متطوع', content: 'بيئة عمل محفزة وإدارة منفتحة على الأفكار. عملهم الدؤوب في خدمة المجتمع يصنع فرقاً واضحاً وملموساً.', rating: 5 },
    { id: 10, name: 'منى الحربي', role: 'فاعلة خير', content: 'مبادراتهم مبتكرة وتمس صميم احتياجات المجتمع. سهولة التعامل ووضوح الأهداف يشجعنا دائماً على التبرع والمساهمة.', rating: 5 },
  ];

  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0E4B33&color=C89B3C&size=150&bold=true&font-size=0.4`;
  };

  return (
    <div className="bg-gradient-to-b from-white to-emerald-50 py-16 overflow-hidden relative">

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0E4B33]" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {isArabic ? 'آراء الزوار' : 'Visitor Reviews'}
        </h2>
        <div className="w-20 h-1 bg-[#C89B3C] mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-500 mt-4 text-lg">
          {isArabic ? 'ما يقوله المستفيدون والمتطوعون عن جمعية مثوى' : 'What beneficiaries and volunteers say about Mathwaa'}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-10">
        {/* Navigation Buttons */}
        <button 
          onClick={isArabic ? scrollRight : scrollLeft}
          className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0E4B33] hover:bg-[#0E4B33] hover:text-white transition-colors"
        >
          {isArabic ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        
        <button 
          onClick={isArabic ? scrollLeft : scrollRight}
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0E4B33] hover:bg-[#0E4B33] hover:text-white transition-colors"
        >
          {isArabic ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide Webkit Scrollbar */}
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

          {testimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="snap-center min-w-[300px] max-w-[300px] sm:min-w-[340px] sm:max-w-[340px] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-2 group transition-all duration-300 flex-shrink-0 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full border-3 border-[#0E4B33] overflow-hidden bg-[#0E4B33] flex-shrink-0">
                  <img
                    src={getAvatarUrl(item.name)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#C89B3C] font-semibold">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className="fill-[#C89B3C] text-[#C89B3C] group-hover:drop-shadow-sm transition-all duration-300"
                  />
                ))}
              </div>

              <FaQuoteLeft size={16} className="text-[#0E4B33]/20 mb-2 group-hover:text-[#C89B3C] transition-colors duration-300" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/write-review"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#0E4B33] text-white text-sm font-bold rounded-full hover:bg-[#0a3d29] hover:shadow-lg transition-all duration-300"
        >
          {isArabic ? '✍️ شاركنا رأيك' : '✍️ Share Your Review'}
        </Link>
      </div>
    </div>
  );
};

export default TestimonialSection;