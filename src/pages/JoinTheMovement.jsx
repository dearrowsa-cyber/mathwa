import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaHandHoldingHeart, FaHandsHelping, FaHeart, FaUserPlus } from 'react-icons/fa'
import { Container, Section, SectionTitle } from '../components/Common'

const ACCENT_COLOR = '#C89B3C'
const PRIMARY_COLOR = '#0E4B33'

const JoinTheMovement = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar')
  const isArabic = language === 'ar'

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(localStorage.getItem('language') || 'ar')
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  const movements = [
    {
      id: 1,
      title_ar: 'كن عضوًا',
      title_en: 'Join as Member',
      desc_ar: 'انضم إلى جمعية مثوى وساهم في حوكمتها ودعم رسالتها في إكرام الموتى',
      desc_en: 'Join Mathwaa Association and contribute to governance and supporting our mission',
      icon: FaUserPlus,
      link: '/membership',
      gradient: 'from-[#0E4B33] to-[#1a6b4a]'
    },
    {
      id: 2,
      title_ar: 'اكفل مستفيدًا',
      title_en: 'Sponsor a Beneficiary',
      desc_ar: 'ادعم أسرة محتاجة فقدت عائلها بشكل مباشر وامنحها يد العون',
      desc_en: 'Directly support a family in need who lost their provider',
      icon: FaHeart,
      link: '/sponsor-register',
      gradient: 'from-[#C89B3C] to-[#a67c2e]'
    },
    {
      id: 3,
      title_ar: 'كن متطوعًا',
      title_en: 'Become a Volunteer',
      desc_ar: 'انضم لفريقنا التطوعي وأحدث تأثيرًا حقيقيًا في خدمة المجتمع وإكرام الموتى',
      desc_en: 'Join our volunteer team and make a real impact serving the community',
      icon: FaHandsHelping,
      link: '/volunteer-register',
      gradient: 'from-[#0E4B33] to-[#1a6b4a]'
    },
    {
      id: 4,
      title_ar: 'تبرّع الآن',
      title_en: 'Make a Donation',
      desc_ar: 'ساهم بتبرعك في دعم مشاريع إكرام الموتى ومساندة أسرهم المحتاجة',
      desc_en: 'Contribute to projects honoring the deceased and supporting their families',
      icon: FaHandHoldingHeart,
      link: '/donate',
      gradient: 'from-[#C89B3C] to-[#a67c2e]'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <Section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <Container>
        <SectionTitle 
          title={isArabic ? 'شارك في رسالتنا' : 'Be Part of Our Mission'}
          subtitle={isArabic ? 'اختر طريقتك في إكرام الموتى وخدمة أسرهم' : 'Choose Your Way to Honor the Deceased and Support Their Families'}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {movements.map((movement) => {
            const Icon = movement.icon
            return (
              <motion.div
                key={movement.id}
                variants={cardVariants}
                className="group"
              >
                <Link to={movement.link} className="block">
                  <div className={`relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gradient-to-br ${movement.gradient}`}>
                    
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white/30 rounded-full" />
                      <div className="absolute bottom-8 left-4 w-16 h-16 border-2 border-white/20 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6 text-white">
                      {/* Icon at top */}
                      <div className="flex justify-between items-start">
                        <div
                          className="p-4 rounded-xl bg-white/15 backdrop-blur-sm group-hover:bg-white/25 transition-all duration-300 group-hover:scale-110"
                        >
                          <Icon size={30} className="text-white" />
                        </div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm group-hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4 duration-300"
                        >
                          {isArabic ? <FaArrowLeft size={16} className="text-white" /> : <FaArrowRight size={16} className="text-white" />}
                        </div>
                      </div>

                      {/* Text at bottom */}
                      <div>
                        <h3 className="text-2xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Alexandria, sans-serif' }}>
                          {isArabic ? movement.title_ar : movement.title_en}
                        </h3>
                        <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                          {isArabic ? movement.desc_ar : movement.desc_en}
                        </p>
                      </div>
                    </div>

                    {/* Accent line at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg mb-6">
            {isArabic ? '؟ لا تعرف من أين تبدأ' : 'Not sure where to start?'}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            {isArabic ? <FaArrowLeft size={18} /> : null}
            {isArabic ? 'تعرف على المزيد عنا' : 'Learn More About Us'}
            {!isArabic ? <FaArrowRight size={18} /> : null}
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export default JoinTheMovement
