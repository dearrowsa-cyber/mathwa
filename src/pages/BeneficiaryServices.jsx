import React, { useState, useEffect } from 'react'
import { SectionTitle, Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { FaWater, FaAmbulance, FaMosque, FaHandsHelping, FaDonate, FaChalkboardTeacher } from 'react-icons/fa'

const BeneficiaryServices = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar')

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(localStorage.getItem('language') || 'ar')
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  const t = language === 'en' 
    ? { title: 'Beneficiary Services', subtitle: 'Explore our specialized services to honor the deceased and support their families', sectionTitle: 'Our Services' }
    : { title: 'خدمات المستفيدين', subtitle: 'تعرف على خدماتنا المتخصصة في إكرام الموتى ومساندة ذويهم', sectionTitle: 'خدماتنا' }

  const services = [
    { 
      title_ar: 'تجهيز المتوفى', title_en: 'Deceased Preparation',
      desc_ar: 'غسل الميت وتكفينه وفق السنة النبوية المطهرة بأيدي مؤهلة وأمينة.', desc_en: 'Washing and shrouding the deceased according to the Islamic Sunnah by qualified and trustworthy hands.',
      icon: <FaWater size={36} className="text-[#C89B3C] mx-auto mb-4" />
    },
    { 
      title_ar: 'نقل الجثامين', title_en: 'Transport of Deceased',
      desc_ar: 'نقل جثامين الموتى من وإلى المقابر والمستشفيات بسيارات مجهزة وعناية تامة.', desc_en: 'Transporting deceased to and from cemeteries and hospitals in fully equipped vehicles.',
      icon: <FaAmbulance size={36} className="text-[#0E4B33] mx-auto mb-4" />
    },
    { 
      title_ar: 'خدمات الدفن', title_en: 'Burial Services',
      desc_ar: 'تجهيز القبور وتوفير كافة مستلزمات الدفن بما يحقق إكرام الميت.', desc_en: 'Grave preparation and providing all burial necessities to properly honor the deceased.',
      icon: <FaMosque size={36} className="text-[#C89B3C] mx-auto mb-4" />
    },
    { 
      title_ar: 'الدعم النفسي والإرشاد', title_en: 'Psychological Support',
      desc_ar: 'مساندة أسر المتوفين وتقديم الدعم المعنوي والنفسي لهم لتخفيف المصاب.', desc_en: 'Supporting families of the deceased morally and psychologically to ease their grief.',
      icon: <FaHandsHelping size={36} className="text-[#0E4B33] mx-auto mb-4" />
    },
    { 
      title_ar: 'المساعدات المالية', title_en: 'Financial Assistance',
      desc_ar: 'تقديم المعونات المالية العاجلة للأسر المحتاجة بعد فقدان عائلهم.', desc_en: 'Providing urgent financial aid to families in need after the loss of their provider.',
      icon: <FaDonate size={36} className="text-[#C89B3C] mx-auto mb-4" />
    },
    { 
      title_ar: 'التدريب والتأهيل', title_en: 'Training & Rehabilitation',
      desc_ar: 'إقامة دورات لتدريب المتطوعين على أحكام الجنائز والتغسيل الصحيح.', desc_en: 'Conducting courses to train volunteers on funeral regulations and proper washing.',
      icon: <FaChalkboardTeacher size={36} className="text-[#0E4B33] mx-auto mb-4" />
    },
  ]

  const breadcrumbs = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <SEO 
        title={t.title} 
        titleAr={t.title} 
        description={t.subtitle} 
        descriptionAr={t.subtitle} 
      />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section className="bg-gray-50/50">
        <Container>
          <SectionTitle title={t.sectionTitle} />
          <Grid cols={3}>
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-[#0E4B33]">
                {service.icon}
                <h3 className="text-xl font-bold text-[#0E4B33] mb-3">
                  {language === 'ar' ? service.title_ar : service.title_en}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'ar' ? service.desc_ar : service.desc_en}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default BeneficiaryServices
