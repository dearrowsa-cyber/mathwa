import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle, Container, Card, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaHandHoldingHeart, FaCheckCircle, FaMoneyBillWave, FaExternalLinkAlt } from 'react-icons/fa'

const Donation = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  
  const translations = {
    en: {
      title: 'Make an Impact',
      subtitle: 'Be the reason someone smiles today... Your generous contribution changes lives.',
      ways_title: 'Ways to Give',
      ways_desc: 'Easily and securely donate through our dedicated portal.',
      donate_link: 'Go to Donation Portal',
      home: 'Home',
      donate_now_section: 'Give Hope Now',
      donate_now_sub: 'Every riyal you give directly contributes to the sustainability of our most needed community services',
      donation_impact: 'The Impact of Your Gift',
      impact_meal: 'Provides warm meals for a family',
      impact_family: 'Supports a family in need for a month',
      impact_program: 'Funds a vital community program',
      impact_equipment: 'Provides essential medical equipment',
    },
    ar: {
      title: 'اصنع الأثر',
      subtitle: 'كن سبباً في سعادتهم اليوم... عطاؤك السخي يغيّر الواقع ويبني مستقبلاً أفضل.',
      ways_title: 'كيف تصنع الفرق؟',
      ways_desc: 'يمكنك التبرع بكل يسر وأمان عبر البوابة المخصصة للتبرعات.',
      donate_link: 'الانتقال لبوابة التبرع',
      home: 'الرئيسية',
      donation_impact: 'أثر عطائك',
      impact_meal: 'يؤمن وجبات دافئة لأسرة محتاجة',
      impact_family: 'يكفل الرعاية الأساسية لأسرة لمدة شهر',
      impact_program: 'يدعم التكاليف التشغيلية لبرنامج مجتمعي',
      impact_equipment: 'يوفر أجهزة طبية ومعدات أساسية',
      donate_now_section: 'تصدق الآن',
      donate_now_sub: 'كل ريال تجود به هو بذرة لخير عظيم ينمو ويستمر أثره في مجتمعنا',
    }
  }

  const t = translations[language]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />

      <Section>
        <Container>
          <SectionTitle title={t.donate_now_section} subtitle={t.donate_now_sub} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Donation Portal Link */}
            <div>
              <Card className="text-center p-12 h-full flex flex-col justify-center items-center">
                <FaMoneyBillWave size={64} className="mx-auto mb-6" style={{ color: '#C89B3C' }} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0E4B33' }}>{t.ways_title}</h3>
                <p className="text-gray-600 mb-8 text-lg">{t.ways_desc}</p>
                <a
                  href="https://mathwaa.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  <FaHandHoldingHeart size={24} />
                  {t.donate_link}
                  <FaExternalLinkAlt size={16} className={language === 'ar' ? 'mr-2' : 'ml-2'} />
                </a>
              </Card>
            </div>

            {/* Impact Sidebar */}
            <div>
              <Card className="h-full !p-8">
                <h3 className="text-xl font-bold text-primary mb-6">{t.donation_impact}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[#C89B3C]/10">
                      <FaCheckCircle size={24} className="text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">50 SAR</p>
                      <p className="text-gray-600">{t.impact_meal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[#C89B3C]/10">
                      <FaCheckCircle size={24} className="text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">250 SAR</p>
                      <p className="text-gray-600">{t.impact_family}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[#C89B3C]/10">
                      <FaCheckCircle size={24} className="text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">500 SAR</p>
                      <p className="text-gray-600">{t.impact_program}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-[#C89B3C]/10">
                      <FaCheckCircle size={24} className="text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">1000 SAR</p>
                      <p className="text-gray-600">{t.impact_equipment}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Donation
