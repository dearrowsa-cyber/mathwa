import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import { FaShoppingCart } from 'react-icons/fa'
import { FaArrowRight, FaArrowLeft, FaHandHoldingHeart, FaHandHoldingMedical, FaQuran, FaStar, FaHeart, FaKaaba, FaChevronLeft, FaChevronRight, FaChartBar, FaMosque, FaHandsHelping, FaHandshake, FaStarAndCrescent, FaNewspaper, FaPeopleCarry, FaLandmark, FaUsers, FaChartPie, FaClipboardList, FaBullhorn } from 'react-icons/fa'
import { SectionTitle, Container, Card, Button, Grid, Section, Badge, AnimatedSection } from '../components/Common'
import { newsAPI, statisticsAPI, partnersAPI } from '../services/api'
import TestimonialSection from './TestimonialSection'
import PartnersSection from './PartnersSection'
import CharityMarquee from './CharityMarquee'
import JoinTheMovement from './JoinTheMovement'
import LoginModal from '../components/LoginModal'
import SignUpModal from '../components/SignUpModal'
import { getImageUrl } from '../utils/imageUrl'
import { useUserAuth } from '../context/UserAuthContext'
import { useCart } from '../context/CartContext'
import NewsCardsSliders from './NewsCardsSlider'
import MediaCenter from './MediaCenter'

const ACCENT_COLOR = '#C89B3C'
const PRIMARY_COLOR = '#0E4B33'

const SLIDER_INTERVAL_MS = 7000
const SLIDE_COUNT = 4

const placeholderNews = [
  { id: 'p1', title_en: 'Community service and financial sustainability', title_ar: 'الجمع بين خدمة المجتمع والاستدامة المالية', excerpt_en: 'Latest updates from the association.', excerpt_ar: 'آخر تحديثات الجمعية.', date: '2026-02-05', image: null },
  { id: 'p2', title_en: 'Arabic language competition for children', title_ar: 'مسابقة اللغة العربية للأطفال', excerpt_en: 'Enhancing Arabic language skills.', excerpt_ar: 'تعزيز مهارات اللغة العربية.', date: '2026-02-08', image: null },
  { id: 'p3', title_en: 'Thanks to medical complex for saving beneficiary sight', title_ar: 'شكراً للمجمع الطبي لإنقاذ بصر مستفيد', excerpt_en: 'Delicate operation success.', excerpt_ar: 'نجاح عملية دقيقة.', date: '2026-02-08', image: null },
  { id: 'p4', title_en: 'New app for transportation services', title_ar: 'تطبيق جديد لخدمات النقل', excerpt_en: 'For people with disabilities and elderly.', excerpt_ar: 'لذوي الإعاقة وكبار السن.', date: '2026-02-09', image: null },
  { id: 'p5', title_en: 'Community partnership meeting', title_ar: 'اجتماع شراكة مجتمعية', excerpt_en: 'Building stronger community ties.', excerpt_ar: 'بناء روابط مجتمعية أقوى.', date: '2026-02-10', image: null },
]

function NewsCardsSlider({ news, loading, isArabic, t }) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  let list = (Array.isArray(news) && news.length > 0 ? news : []).slice(0, 6).map((n, i) => {
    let imageUrl = null
    const imageField = n.image || n.thumbnail || n.featured_image || n.image_path || null
    if (imageField) {
      // Use getImageUrl utility for consistent image URL handling
      imageUrl = getImageUrl(imageField)
    }
    return {
      id: n.id || i,
      title: n[`title_${isArabic ? 'ar' : 'en'}`] || n.title_en || n.title_ar || n.title || 'News',
      excerpt: n[`excerpt_${isArabic ? 'ar' : 'en'}`] || n.excerpt_en || n.excerpt_ar || n.excerpt || '',
      date: n.publish_date || n.created_at || n.date || '',
      image: imageUrl,
    }
  })

  // Sort by date (most recent first)
  list = list.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
  })

  const formatDate = (d) => {
    if (!d) return ''
    const dt = typeof d === 'string' ? new Date(d) : d
    return isNaN(dt.getTime()) ? d : dt.toLocaleDateString(isArabic ? 'ar-SA' : 'en-GB', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % list.length)
  }

  if (loading) {
    return (
      <div className="w-full py-8 md:py-12 flex justify-center gap-4 px-4 overflow-hidden">
        <div className="hidden sm:block w-[280px] h-[300px] bg-gray-100 rounded-2xl animate-pulse opacity-50"></div>
        <div className="w-[320px] h-[350px] sm:w-[420px] sm:h-[400px] bg-gray-200 rounded-2xl animate-pulse flex flex-col justify-end p-6">
          <div className="w-1/3 h-6 bg-gray-300 rounded-full mb-4"></div>
          <div className="w-3/4 h-8 bg-gray-300 rounded-lg mb-2"></div>
          <div className="w-1/2 h-8 bg-gray-300 rounded-lg mb-6"></div>
          <div className="w-1/4 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="hidden md:block w-[280px] h-[300px] bg-gray-100 rounded-2xl animate-pulse opacity-50"></div>
      </div>
    )
  }

  if (list.length === 0) {
    return <div className="text-center py-12 text-gray-500">{isArabic ? 'لا توجد أخبار حالياً' : 'No news available'}</div>
  }

  // Responsive sizing based on viewport
  const getCardSizes = () => {
    if (typeof window === 'undefined') return { center: { w: 420, h: 400 }, side: { w: 320, h: 280 }, offset: 280 }
    
    const width = window.innerWidth
    
    // Mobile (< 640px)
    if (width < 640) {
      return { 
        center: { w: 280, h: 300 }, 
        side: { w: 200, h: 240 }, 
        offset: 120 
      }
    }
    // Tablet (640px - 1024px)
    if (width < 1024) {
      return { 
        center: { w: 350, h: 350 }, 
        side: { w: 280, h: 280 }, 
        offset: 200 
      }
    }
    // Desktop
    return { 
      center: { w: 420, h: 400 }, 
      side: { w: 320, h: 280 }, 
      offset: 280 
    }
  }

  const [cardSizes, setCardSizes] = useState(getCardSizes())

  useEffect(() => {
    const handleResize = () => {
      setCardSizes(getCardSizes())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full py-4 md:py-8">
      {/* Slider Container - Responsive height */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Cards (blurred, smaller) */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
          {list.map((item, i) => {
            const distance = (i - activeIndex + list.length) % list.length
            const isCenter = distance === 0
            const isAdjacent = distance === 1 || distance === list.length - 1
            
            if (!isCenter && !isAdjacent) return null

            let scale = 0.7
            let opacity = 0.4
            let zIndex = 0
            let xOffset = 0

            if (isCenter) {
              scale = 1
              opacity = 1
              zIndex = 10
              xOffset = 0
            } else if (isAdjacent) {
              scale = 0.75
              opacity = 0.5
              zIndex = 5
              xOffset = distance === 1 ? cardSizes.offset : -cardSizes.offset
            }

            const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640

            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0.7, opacity: 0.3 }}
                animate={{ scale, opacity, zIndex, x: xOffset }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute"
              >
                <Link
                  to={`/news/${item.id}`}
                  className="group relative rounded-lg sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col block"
                  style={{
                    width: isCenter ? `${cardSizes.center.w}px` : `${cardSizes.side.w}px`,
                    height: isCenter ? `${cardSizes.center.h}px` : `${cardSizes.side.h}px`,
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gray-300">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <FaBookOpen size={64} style={{ color: PRIMARY_COLOR, opacity: 0.3 }} />
                      </div>
                    )}
                  </div>

                  {/* Dark Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isCenter 
                      ? 'bg-gradient-to-t from-black/95 via-black/60 to-transparent group-hover:from-black/85' 
                      : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                  }`}></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-2 sm:p-4 text-white">
                    {/* Date Badge */}
                    <div className="mb-2 sm:mb-3 inline-flex items-center bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full w-fit">
                      <span className="text-xs sm:text-sm font-semibold text-white/90">
                        📅 {formatDate(item.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors duration-300 ${
                      isCenter ? 'text-lg sm:text-xl line-clamp-3' : 'text-xs sm:text-sm line-clamp-2'
                    }`}>
                      {item.title}
                    </h3>

                    {/* Excerpt - only show for center card and larger screens */}
                    {isCenter && !isSmallScreen && (
                      <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {item.excerpt}
                      </p>
                    )}

                    {/* Read More Button */}
                    <button
                      className="inline-flex items-center gap-1 sm:gap-2 mt-auto w-fit px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold transition-all duration-300 border-2 border-white/40 hover:border-white hover:bg-white/20 group-hover:gap-3"
                    >
                      {t ? t('common:read_more') : (isArabic ? 'اقرأ المزيد' : 'Read More')}
                      <FaArrowRight size={isSmallScreen ? 12 : 16} className={isArabic ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-3 sm:gap-6 mt-4 sm:mt-8 px-2">
        <button
          onClick={goToPrevious}
          className="p-2 sm:p-3 rounded-full bg-[#0E4B33] text-white hover:bg-[#0a3525] transition-all hover:shadow-lg"
          title="Previous"
        >
          <FaChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        {/* Dots Indicator */}
        <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full flex-shrink-0 ${
                i === activeIndex
                  ? 'bg-[#C89B3C] w-2 sm:w-3 h-2 sm:h-3'
                  : 'bg-gray-300 w-1.5 sm:w-2 h-1.5 sm:h-2 hover:bg-gray-400'
              }`}
              title={`Go to news ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 sm:p-3 rounded-full bg-[#0E4B33] text-white hover:bg-[#0a3525] transition-all hover:shadow-lg"
          title="Next"
        >
          <FaChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  )
}

const Home = () => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const { user, isAuthenticated } = useUserAuth()
  const { addToCart, cartItems } = useCart()

  const [activeSlide, setActiveSlide] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [pendingDonationTitle, setPendingDonationTitle] = useState('')

  const goToSlide = useCallback((index) => {
    setActiveSlide((i) => (typeof index === 'number' ? (index + SLIDE_COUNT) % SLIDE_COUNT : (i + 1) % SLIDE_COUNT))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => goToSlide(activeSlide + 1), SLIDER_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [activeSlide, goToSlide])

  const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => i + 1).map((n) => ({
    title: t(`home:slider_title_${n}`),
    subtitle: t(`home:slider_subtitle_${n}`),
    desc: t(`home:slider_desc_${n}`),
    image: `/sliders/new sliders/Artboard ${n}.jpg.png`,
  }))

  const [stats, setStats] = useState({
    beneficiaries: 1250,
    volunteers: 380,
    projects: 45,
    donations: 2500000
  })
  const [news, setNews] = useState([])
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Use the fresh news endpoint that includes images
        const newsRes = await fetch(`${BACKEND_URL}/api/news_fresh.php?lang=${isArabic ? 'ar' : 'en'}`)
          .then(r => r.json())
          .catch((err) => {
            console.error('News API fetch error:', err)
            return { success: false, data: [] }
          })
        
        if (newsRes.success && Array.isArray(newsRes.data)) {
          console.log('📰 News fetched:', newsRes.data.length, 'items')
          newsRes.data.slice(0, 3).forEach((n) => {
            console.log(`  ID: ${n.id}, Image: ${n.image}`)
          })
          setNews(newsRes.data.slice(0, 8))  // Limit to 8 items
        } else {
          console.warn('News API response error:', newsRes)
          setNews([])
        }

        const statsRes = await statisticsAPI.getStatistics().catch(() => ({ data: {} }))
        const s = statsRes.data?.data
        setStats({
          beneficiaries: s?.beneficiaries?.total_beneficiaries ? Math.max(Number(s.beneficiaries.total_beneficiaries), 125400) : 125400,
          volunteers: s?.volunteers?.total_volunteers ? Math.max(Number(s.volunteers.total_volunteers), 4580) : 4580,
          projects: s?.volunteer_opportunities?.total_opportunities ? Math.max(Number(s.volunteer_opportunities.total_opportunities), 164) : 164,
          donations: s?.donations?.total_raised ?? 2500000
        })

        // Fetch partners - API returns { data: { partners: [], count } }
        const partnersRes = await partnersAPI.getAllPartners({ limit: 6 }).catch(() => ({ data: {} }))
        const partnersData = partnersRes.data?.data?.partners
        setPartners(Array.isArray(partnersData) ? partnersData : [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isArabic, BACKEND_URL])

  const handleDonateClick = (serviceTitle) => {
    if (!isAuthenticated) {
      setPendingDonationTitle(serviceTitle)
      setShowLoginModal(true)
      return
    }

    // Add donation to cart
    const donationItem = {
      id: `donation_${Date.now()}`,
      title: serviceTitle,
      type: 'donation',
      timestamp: new Date().toISOString()
    }
    addToCart(donationItem)
    alert(`✓ Added to cart! Total items: ${cartItems.length + 1}`)
  }

  const services = [
    {
      title: t('common:volunteering'),
      desc: t('home:service_2_desc', 'Join our team'),
      icon: FaHandsHelping,
      link: '/volunteering'
    },
    {
      title: t('common:donations'),
      desc: t('home:service_1_desc', 'Help us serve'),
      icon: FaHandHoldingHeart,
      link: '/'
    },
    {
      title: t('common:membership'),
      desc: t('home:service_3_desc', 'Join our community'),
      icon: FaStarAndCrescent,
      link: '/membership'
    },
    {
      title: t('common:beneficiary_services'),
      desc: t('home:service_4_desc', 'Get support'),
      icon: FaQuran,
      link: '/beneficiary-services'
    }
  ]

  const whyChoose = [
    { title: t('home:transparency', 'Transparency'), desc: 'Full transparency in operations', icon: FaKaaba },
    { title: t('home:impact', 'Real Impact'), desc: 'Measurable results and outcomes', icon: FaHandHoldingHeart },
    { title: t('home:community', 'Community'), desc: 'Built by passionate volunteers', icon: FaPeopleCarry }
  ]

  return (
    <>
      {/* Redesigned Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-black flex flex-col justify-center items-center">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide}
            src={slides[activeSlide].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        </AnimatePresence>
        
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E4B33]/80 via-black/40 to-black/10 z-10 pointer-events-none"></div>

        {/* Static Content Overlay */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 md:px-8 w-full max-w-5xl mt-10">
          {/* Direct Trust Indicator */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C89B3C]/20 backdrop-blur-md border border-[#C89B3C]/40 mb-6"
          >
            <FaHandHoldingHeart className="text-[#C89B3C]" size={20} />
            <span className="text-white text-sm md:text-base font-bold">
              {isArabic ? 'جمعية مرخصة رسمياً من المركز الوطني لتنمية القطاع غير الربحي برقم 1000827300' : 'Officially Licensed by NCNP #1000827300'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
            style={{ fontFamily: 'Alexandria, sans-serif' }}
          >
            {isArabic ? 'جمعية ' : 'Mathwa Association '}<span className="text-[#C89B3C]">{isArabic ? 'مثوى' : 'Mathwa'}</span><br/>
            {isArabic ? 'لإكرام الموتى' : 'for Honoring the Dead'}
          </motion.h1>

          {/* Brief */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-2xl text-white/90 font-medium max-w-3xl mb-10 drop-shadow-lg leading-relaxed"
          >
            {isArabic 
              ? 'نعمل لنرتقي، ونعطي لنُسعد، معاً نحو مجتمع متكافل ومستدام لخدمة وإكرام الموتى وفق أعلى المعايير المؤسسية.' 
              : 'Working together towards a sustainable, cooperative community to serve and honor the deceased.'}
          </motion.p>

          {/* Clear Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/donate" className="w-full sm:w-auto px-8 py-4 bg-[#C89B3C] text-[#0E4B33] rounded-full font-bold text-lg hover:bg-[#b08630] hover:text-white transition-all shadow-[0_10px_30px_rgba(200,155,60,0.4)] hover:shadow-[0_15px_40px_rgba(200,155,60,0.6)] transform hover:-translate-y-1 text-center flex items-center justify-center gap-2">
              <FaHeart /> {isArabic ? 'تبرع الآن' : 'Donate Now'}
            </Link>
            <Link to="/governance" className="w-full sm:w-auto px-8 py-4 bg-[#0E4B33]/80 backdrop-blur-md border border-[#C89B3C]/50 text-[#C89B3C] rounded-full font-bold text-lg hover:bg-[#0E4B33] hover:text-white transition-all transform hover:-translate-y-1 text-center shadow-[0_10px_30px_rgba(14,75,51,0.4)]">
              {isArabic ? 'الحوكمة والإفصاح' : 'Governance & Disclosure'}
            </Link>
            <Link to="/membership" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/25 transition-all transform hover:-translate-y-1 text-center">
              {isArabic ? 'العضوية' : 'Membership'}
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-12 bg-[#C89B3C]' : 'w-4 bg-white/40 hover:bg-white/80'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide((activeSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 hover:bg-[#C89B3C] hover:border-[#C89B3C] text-white flex items-center justify-center transition-all opacity-0 md:opacity-100 hover:scale-110 shadow-lg"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={() => goToSlide(activeSlide + 1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/20 hover:bg-[#C89B3C] hover:border-[#C89B3C] text-white flex items-center justify-center transition-all opacity-0 md:opacity-100 hover:scale-110 shadow-lg"
        >
          <FaChevronRight size={24} />
        </button>
      </section>

      {/* Institutional Trust Strip — Governance Quick Links (Item 11) */}
      <section className="bg-[#0E4B33] py-4 border-b border-[#C89B3C]/20">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {[
              { label: isArabic ? 'الترخيص: 1000827300' : 'License: 1000827300', to: '/about', icon: <FaLandmark className="text-[#C89B3C]" /> },
              { label: isArabic ? 'مجلس الإدارة' : 'Board of Directors', to: '/board-members', icon: <FaUsers className="text-[#C89B3C]" /> },
              { label: isArabic ? 'القوائم المالية' : 'Financial Statements', to: '/annual-reports', icon: <FaChartPie className="text-[#C89B3C]" /> },
              { label: isArabic ? 'التقارير' : 'Reports', to: '/annual-reports', icon: <FaClipboardList className="text-[#C89B3C]" /> },
              { label: isArabic ? 'الشكاوى والبلاغات' : 'Complaints', to: '/complaints', icon: <FaBullhorn className="text-[#C89B3C]" /> },
              { label: isArabic ? 'العضوية' : 'Membership', to: '/membership', icon: <FaHandshake className="text-[#C89B3C]" /> },
            ].map((item, i) => (
              <Link key={i} to={item.to} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#C89B3C]/40 transition-all text-white/80 hover:text-[#C89B3C] text-xs md:text-sm font-medium">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section — Full-Width Dark Gradient */}
      <section className="relative py-20 sm:py-28 md:py-32 px-6 sm:px-10 bg-mesh-dark overflow-hidden">
        {/* Decorative floating circles */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#C89B3C]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C89B3C]/15 text-[#C89B3C] font-bold text-sm mb-6 border border-[#C89B3C]/20"
            >
              <FaChartBar className="inline" /> {isArabic ? 'أرقامنا تتحدث' : 'Our Numbers Speak'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4" style={{ fontFamily: 'Alexandria, sans-serif' }}
            >
              {t('home:statistics_title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl mx-auto"
            >
              {t('home:statistics_subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: t('home:beneficiaries'), value: stats.beneficiaries, isNumber: true, icon: <FaMosque className="mx-auto text-[#C89B3C] drop-shadow-lg" size={42} /> },
              { label: t('home:volunteers'), value: stats.volunteers, isNumber: true, icon: <FaHandsHelping className="mx-auto text-[#C89B3C] drop-shadow-lg" size={42} /> },
              { label: t('home:partnerships'), value: stats.projects, isNumber: true, icon: <FaHandshake className="mx-auto text-[#C89B3C] drop-shadow-lg" size={42} /> },
              { label: isArabic ? 'أعضاء مجلس الإدارة' : 'Board Members', value: 5, isNumber: true, icon: <FaStarAndCrescent className="mx-auto text-[#C89B3C] drop-shadow-lg" size={40} /> }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C89B3C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="mb-4 block">{stat.icon}</span>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-[#C89B3C] drop-shadow-md flex justify-center items-center gap-1" style={{ fontFamily: 'Alexandria, sans-serif' }}>
                    {stat.isNumber ? <CountUp end={stat.value} duration={3} delay={0.3} separator="," enableScrollSpy scrollSpyOnce /> : stat.value}
                    {stat.plus && <span>+</span>}
                  </div>
                  <p className="text-white/80 font-bold text-base sm:text-lg tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 sm:py-28 bg-mesh-light">
        <Container>
          <AnimatedSection direction="up" delay={0.2}>
            <div className="text-center px-2 mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C89B3C]/10 text-[#0E4B33] font-bold text-sm border border-[#C89B3C]/20 mb-6">
                <span className="text-xl"><FaNewspaper className="inline text-[#C89B3C]" /></span> {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: PRIMARY_COLOR, fontFamily: 'Alexandria, sans-serif' }}>
                {t('home:news_title')}
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
                {t('home:news_subtitle')}
              </p>
            </div>

            <NewsCardsSliders news={news} loading={loading} isArabic={isArabic} t={t} />

            <div className="text-center mt-12 sm:mt-16">
              <Link
                to="/news"
                className="btn-secondary inline-flex items-center gap-2"
              >
                {t('home:view_all_news')}
                <FaArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container> 
      </section>
   
      <MediaCenter />

      {/* Welcome Section */}
      

      
     

      {/* Services Section */}
      <section className="py-20 sm:py-28 bg-[#fdfcf9]">
        <Container>
          <div className="text-center mb-14">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0E4B33]/5 text-[#0E4B33] font-bold text-sm border border-[#0E4B33]/10 mb-6"
            >
              <FaKaaba className="inline text-[#0E4B33] text-lg" /> {isArabic ? 'خدماتنا' : 'Our Services'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E4B33] tracking-tight mb-4" style={{ fontFamily: 'Alexandria, sans-serif' }}
            >
              {t('home:services_title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto"
            >
              {t('home:services_subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon
              const isDonation = service.link === '/donate'
              
              return isDonation ? (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <div className="card-hover-tilt h-full flex flex-col items-center text-center p-8 sm:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_20px_40px_rgba(200,155,60,0.12)] transition-all duration-500">
                    <div className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#C89B3C]/15 to-[#C89B3C]/5">
                      <Icon size={36} style={{ color: ACCENT_COLOR }} />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0E4B33] mb-3" style={{ fontFamily: 'Alexandria, sans-serif' }}>{service.title}</h3>
                    <p className="text-gray-500 text-base mb-8 flex-grow leading-relaxed">{service.desc}</p>
                    <button
                      onClick={() => handleDonateClick(service.title)}
                      className="btn-secondary w-full py-3.5 text-base"
                    >
                      {isArabic ? 'تبرع الآن' : 'Donate Now'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  <Link to={service.link} className="block group h-full">
                    <div className="card-hover-tilt h-full flex flex-col items-center text-center p-8 sm:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_20px_40px_rgba(14,75,51,0.1)] transition-all duration-500">
                      <div className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0E4B33]/10 to-[#0E4B33]/5 group-hover:from-[#C89B3C]/15 group-hover:to-[#C89B3C]/5 transition-all duration-500">
                        <Icon size={36} className="text-[#0E4B33] group-hover:text-[#C89B3C] transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0E4B33] mb-3 group-hover:text-[#C89B3C] transition-colors duration-300" style={{ fontFamily: 'Alexandria, sans-serif' }}>{service.title}</h3>
                      <p className="text-gray-500 text-base leading-relaxed">{service.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>


      
          <PartnersSection/>
     
      
      <JoinTheMovement />

     
      {/* Why Choose Section */}
      
       
          <TestimonialSection/>
        
      

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignUp={() => {
          setShowLoginModal(false)
          setShowSignUpModal(true)
        }}
        onLoginSuccess={() => {
          // After login, add the pending donation to cart if exists
          if (pendingDonationTitle) {
            handleDonateClick(pendingDonationTitle)
            setPendingDonationTitle('')
          }
        }}
      />

      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        switchToLogin={() => {
          setShowSignUpModal(false)
          setShowLoginModal(true)
        }}
        onSignUpSuccess={() => {
          // After sign-up success, user can log in
          setShowSignUpModal(false)
          setShowLoginModal(true)
        }}
      />

    </>
  )
}

export default Home
