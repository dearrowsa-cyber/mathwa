import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaHandHoldingHeart, FaHandsHelping, FaHeart, FaStarAndCrescent } from 'react-icons/fa'
import { Container, Section, SectionTitle } from '../components/Common'

const ACCENT_COLOR = '#C89B3C'
const PRIMARY_COLOR = '#0E4B33'

const JoinTheMovement = () => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const movements = [
    {
      id: 1,
      titleKey: 'join_movement.donate_title',
      descKey: 'join_movement.donate_desc',
      default_title: 'Make a Donation',
      default_desc: 'Support our charitable causes with your generous donation',
      image: '/join/donation.png',
      icon: FaHandHoldingHeart,
      link: '/donate',
      color: '#C89B3C'
    },
    {
      id: 2,
      titleKey: 'join_movement.volunteer_title',
      descKey: 'join_movement.volunteer_desc',
      default_title: 'Become a Volunteer',
      default_desc: 'Join our team and make a direct impact in the community',
      image: '/join/volunteer.png',
      icon: FaHandsHelping,
      link: '/volunteer-register',
      color: '#C89B3C'
    },
    {
      id: 3,
      titleKey: 'join_movement.sponsor_title',
      descKey: 'join_movement.sponsor_desc',
      default_title: 'Sponsor a Beneficiary',
      default_desc: 'Directly support a person or family in need',
      image: '/join/beneficial.png',
      icon: FaHeart,
      link: '/sponsor-register',
      color: '#C89B3C'
    },
    {
      id: 4,
      titleKey: 'join_movement.member_title',
      descKey: 'join_movement.member_desc',
      default_title: 'Join as Member',
      default_desc: 'Become part of our organization and contribute to governance',
      image: '/join/member.png',
      icon: FaStarAndCrescent,
      backgroundSize: 'cover',
      link: '/membership',
      color: '#C89B3C'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: {
      y: -10,
      shadow: '0 20px 40px rgba(0,0,0,0.2)',
      transition: { duration: 0.3 }
    }
  }

  return (
    <Section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <SectionTitle 
          title={t('join_movement.title', 'Join The Movement')}
          subtitle={t('join_movement.subtitle', 'Be Part of Change - Choose Your Way to Help')}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {movements.map((movement) => {
            const Icon = movement.icon
            return (
              <motion.div
                key={movement.id}
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Link to={movement.link}>
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${movement.image}')` }}
                    >
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between p-6 text-white">
                      {/* Icon at top */}
                      <div className="flex justify-between items-start">
                        <div
                          className="p-3 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors"
                          style={{ borderColor: movement.color, borderWidth: '2px' }}
                        >
                          <Icon size={28} style={{ color: movement.color }} />
                        </div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-4 duration-300"
                          style={{ backgroundColor: movement.color }}
                        >
                          <FaArrowRight size={20} className="text-white" />
                        </div>
                      </div>

                      {/* Text at bottom */}
                      <div>
                        <h3 className="text-2xl font-bold mb-2 leading-tight">
                          {t(movement.titleKey, movement.default_title)}
                        </h3>
                        <p className="text-sm text-gray-100 line-clamp-2">
                          {t(movement.descKey, movement.default_desc)}
                        </p>
                      </div>
                    </div>

                    {/* Accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ backgroundColor: movement.color }}
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-6">
            {t('join_movement.question', 'Not sure where to start?')}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            {t('join_movement.learn_more', 'Learn More About Us')}
            <FaArrowRight size={20} />
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export default JoinTheMovement
