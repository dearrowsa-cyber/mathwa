import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { testimonialsAPI } from '../services/api';
import { getImageUrl } from '../utils/imageUrl';
import { useTranslation } from 'react-i18next';

const TestimonialSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await testimonialsAPI.getAllTestimonials({ limit: 20 });

        let data = [];
        if (response.data && response.data.success && response.data.data && response.data.data.length > 0) {
          // Filter out user "Youssef/Yusuf" as requested, and ignore items without any message content
          data = response.data.data.filter(item => {
            const nameAr = item.name_ar || item.name || '';
            const nameEn = item.name_en || item.name || '';
            const searchStr = `${nameAr} ${nameEn}`.toLowerCase();
            const hasYoussef = searchStr.includes('يوسف') || searchStr.includes('youssef') || searchStr.includes('yusuf');
            
            const msgAr = item.testimonial_text_ar || item.message_ar || item.message || '';
            const msgEn = item.testimonial_text_en || item.message_en || item.message || '';
            const hasMessage = msgAr.trim().length > 0 || msgEn.trim().length > 0;

            return !hasYoussef && hasMessage;
          });
        }
        
        const mockData = [          
            { id: 101, name_ar: 'أحمد الغامدي', name_en: 'Ahmed Al-Ghamdi', position_ar: 'متطوع', position_en: 'Volunteer', message_ar: 'تجربة رائعة، منظومة عمل احترافية وتأثير حقيقي على أرض الواقع. فخور بكوني جزءاً من هذا العمل الخيري العظيم.', message_en: 'Great experience, professional organization with real impact. Proud to be part of this charity.', image: '/images/testimonials/arab_man_1_v2.png' },
            { id: 102, name_ar: 'سارة الدوسري', name_en: 'Sarah Al-Dossari', position_ar: 'متبرعة', position_en: 'Donor', message_ar: 'شفافية ومصداقية عالية في التعامل وتميز في تنفيذ المبادرات. بارك الله في جهودهم، أنصح بدعم هذه الجمعية المميزة.', message_en: 'High transparency and excellent execution of initiatives. Highly recommend supporting this association.', image: '/images/testimonials/arab_woman_1_v2.png' },
            { id: 103, name_ar: 'محمد العتيبي', name_en: 'Mohammed Al-Otaibi', position_ar: 'مستفيد', position_en: 'Beneficiary', message_ar: 'شكراً جزيلاً لجمعية مثوى على وقفتهم ودعمهم الدائم. الخدمات ممتازة جداً ويقدمونها بكل كرامة واحترام لنا.', message_en: 'Thank you Mathwaa for your continuous support. The services are excellent and provided with dignity.', image: '/images/testimonials/arab_man_2_v2.png' },
            { id: 104, name_ar: 'فاطمة الزهراني', name_en: 'Fatima Al-Zahrani', position_ar: 'شريكة نجاح', position_en: 'Partner', message_ar: 'رأينا أثراً ملموساً من خلال شراكتنا. إدارة واعية تسعى للتميز ودعم المجتمع بكفاءة واحترافية.', message_en: 'We saw tangible impact through our partnership. Conscious management striving for excellence.', image: '/images/testimonials/arab_woman_2_v2.png' },
            { id: 105, name_ar: 'سالم الشمري', name_en: 'Salem Al-Shammari', position_ar: 'متبرع', position_en: 'Donor', message_ar: 'جهود جبارة تُبذل من قبل الإدارة وفريق العمل، من أفضل الجمعيات التي تعاملت معها على الإطلاق. وفقكم الله للخير.', message_en: 'Immense efforts from the team. One of the best associations I have dealt with.', image: '/images/testimonials/arab_man_3_v2.png' },
            { id: 106, name_ar: 'نورة السبيعي', name_en: 'Noura Al-Subaie', position_ar: 'متطوعة', position_en: 'Volunteer', message_ar: 'تنظيم ممتاز للفرص التطوعية، وبرامجهم مثرية جداً للشباب والمجتمع. أشعر بسعادة غامرة عندما أشارك في مبادراتهم.', message_en: 'Excellent volunteering programs, very enriching for youth. Happy to participate.', image: '/images/testimonials/arab_woman_1_v2.png' },
            { id: 107, name_ar: 'خالد العنزي', name_en: 'Khalid Al-Enezi', position_ar: 'مستفيد', position_en: 'Beneficiary', message_ar: 'لمست فيهم الاهتمام الصادق والرعاية المستمرة. بارك الله في جهود المتبرعين والعاملين، فهذا العمل يثلج الصدر.', message_en: 'Sincere care and continuous support. May God bless their efforts.', image: '/images/testimonials/arab_man_1_v2.png' },
            { id: 108, name_ar: 'ريم القحطاني', name_en: 'Reem Al-Qahtani', position_ar: 'داعمة', position_en: 'Supporter', message_ar: 'جمعية رائدة تتلمس حاجات الناس بدقة وتقدم مشاريع حقيقية ومؤثرة. التحديثات والتقارير المستمرة تجعلنا مطمئنين.', message_en: 'Leading association with real impactful projects. Continuous reports give us peace of mind.', image: '/images/testimonials/arab_woman_2_v2.png' },
            { id: 109, name_ar: 'عبدالله السالم', name_en: 'Abdullah Al-Salem', position_ar: 'متطوع', position_en: 'Volunteer', message_ar: 'بيئة عمل محفزة وإدارة منفتحة على الأفكار الشابة. عملهم الدؤوب يصنع فرقاً واضحاً وملموساً.', message_en: 'Motivating environment and open management. Their hard work makes a real difference.', image: '/images/testimonials/arab_man_2_v2.png' },
            { id: 110, name_ar: 'منى الحربي', name_en: 'Muna Al-Harbi', position_ar: 'فاعلة خير', position_en: 'Philanthropist', message_ar: 'مبادراتهم مبتكرة وتمس صميم احتياجات المجتمع. سهولة استخدام الموقع ووضوح المشاريع يشجعنا دائماً على التبرع.', message_en: 'Innovative initiatives. Website is easy to use and encourages continuous support.', image: '/images/testimonials/arab_woman_1_v2.png' }
        ];

        // Ensure we always have a full marquee slider even if API is empty or small
        if (data.length < 10) {
          data = [...data, ...mockData];
        }

        let mappedData = data.map((item, idx) => {
          const fallbackImages = [
            '/images/testimonials/arab_man_1_v2.png',
            '/images/testimonials/arab_woman_1_v2.png',
            '/images/testimonials/arab_man_2_v2.png',
            '/images/testimonials/arab_woman_2_v2.png',
            '/images/testimonials/arab_man_3_v2.png'
          ];
          const fallbackImg = fallbackImages[idx % fallbackImages.length];
          return {
            id: item.id,
            name: isArabic 
              ? (item.name_ar || item.name_en || item.name || 'مجهول') 
              : (item.name_en || item.name_ar || item.name || 'Anonymous'),
            role: isArabic 
              ? (item.position_ar || item.position_en || item.position || '') 
              : (item.position_en || item.position_ar || item.position || ''),
            content: isArabic 
              ? (item.testimonial_text_ar || item.message_ar || item.testimonial_text_en || item.message_en || item.message || '') 
              : (item.testimonial_text_en || item.message_en || item.testimonial_text_ar || item.message_ar || item.message || ''),
            image: item.photo || item.image || fallbackImg,
            rating: item.rating || 5
          }
        });

        // No manual duplication needed, Marquee handles it
        setTestimonials(mappedData);

      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-emerald-50 py-16 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900">
          {t("common:testimonials_title")}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {loading && (
        <div className="text-center py-10">
          <p>{t("loading_testimonials")}</p>
        </div>
      )}

      {!loading && testimonials.length > 0 && (
        <>
          <div className="overflow-hidden">
            <Marquee 
              gradient={false} 
              speed={40} 
              pauseOnHover={true}
              direction={isArabic ? "right" : "left"}
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="mx-4 min-w-[320px] max-w-[320px] bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-[#C89B3C]/30 hover:-translate-y-2 group transition-all duration-300 flex-shrink-0 border border-transparent hover:border-[#C89B3C]/50"
                >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full border-4 border-[#0E4B33] overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name || ''}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'U')}&background=0E4B33&color=C89B3C&size=150&bold=true`;
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-emerald-600 uppercase">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-2">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      className="fill-[#C89B3C] text-[#C89B3C] group-hover:drop-shadow-md transition-all duration-300"
                    />
                  ))}
                </div>

                <FaQuoteLeft size={18} className="text-[#0E4B33]/30 mb-2 group-hover:text-[#C89B3C] transition-colors duration-300" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
            </Marquee>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/write-review"
              className="inline-block px-6 py-3 bg-emerald-700 text-white text-sm font-semibold rounded-full hover:bg-emerald-800 transition"
            >
              {t("common:write_review")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialSection;