import React, { useState, useEffect } from 'react'
import { SectionTitle, Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'

const BeneficiaryServices = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar')

  useEffect(() => {
    const handleLanguageChange = () => setLanguage(localStorage.getItem('language') || 'ar')
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  const t = language === 'en' 
    ? { title: 'Services', subtitle: 'Explore our specialized services to honor the deceased and support their families', sectionTitle: 'Our Services' }
    : { title: 'الخدمات', subtitle: 'تعرف على خدماتنا المتخصصة في إكرام الموتى ومساندة ذويهم', sectionTitle: 'خدماتنا' }

  const services = [
    { id: '1', title_ar: 'كفالة أيتام', title_en: 'Orphan Sponsorship' },
    { id: '2', title_ar: 'أكفان', title_en: 'Shrouds' },
    { id: '3', title_ar: 'تبرعات بناء وتطوير المقبرة', title_en: 'Cemetery Development' },
    { id: '4', title_ar: 'صدقات', title_en: 'Charities' },
    { id: '5', title_ar: 'أدوات حفر القبور', title_en: 'Grave Digging Tools' },
    { id: '6', title_ar: 'أدوات تغسيل المتوفى', title_en: 'Deceased Washing Tools' },
    { id: '7', title_ar: 'تبرع لعمليات نقل الجنازات', title_en: 'Funeral Transportation' },
    { id: '8', title_ar: 'تبرع لشراء إسعاف نقل', title_en: 'Transport Ambulance' },
    { id: '9', title_ar: 'تبرع لماء الشرب بالمقابر', title_en: 'Drinking Water in Cemeteries' },
    { id: '10', title_ar: 'دعم لموظفين الجمعية', title_en: 'Association Employee Support' },
    { id: '11', title_ar: 'كفارة حلف', title_en: 'Oath Expiation' }
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
      
      <Section className="bg-gray-50/50 py-16">
        <Container>
          <SectionTitle title={t.sectionTitle} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] bg-white flex flex-col border-t-4 border-[#0E4B33]">
                
                <div className="relative h-64 overflow-hidden bg-[#0E4B33]/10">
                  <img 
                    src={`/services/service_${service.id}.png`} 
                    alt={language === 'ar' ? service.title_ar : service.title_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow items-center justify-between bg-white relative z-20">
                  <h3 className="text-xl font-bold text-[#0E4B33] mb-3 text-center">
                    {language === 'ar' ? service.title_ar : service.title_en}
                  </h3>
                  <div className="w-12 h-1 bg-[#C89B3C] rounded-full mx-auto transition-all duration-300 group-hover:w-24"></div>
                </div>

              </div>
            ))}
          </div>

        </Container>
      </Section>
    </>
  )
}

export default BeneficiaryServices
