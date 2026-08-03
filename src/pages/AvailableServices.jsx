import React from 'react'
import { Section, Container, Card, Grid } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaWater, FaAmbulance, FaMosque, FaHandsHelping, FaChalkboardTeacher, FaDonate, FaUser, FaFileAlt } from 'react-icons/fa'

const AvailableServices = () => {
  const lang = localStorage.getItem('language') || 'en'

  const t = {
    en: {
      title: 'Available Services',
      subtitle: 'We offer a comprehensive range of services to help those in need',
      section_title: 'Our Services',
      section_desc: 'We are committed to providing quality services with care and respect.',
      request_service: 'Request this service',
      deceased_prep: 'Deceased Preparation',
      deceased_prep_desc: 'Full preparation and shrouding services in accordance with Islamic tradition.',
      transport: 'Transport of Deceased',
      transport_desc: 'Transporting deceased to and from cemeteries and hospitals in fully equipped vehicles.',
      burial: 'Burial',
      burial_desc: 'Burial services and grave preparation.',
      psychological: 'Psychological Support and Guidance',
      psychological_desc: 'Counseling and support for families in their time of need.',
      training: 'Training and Rehabilitation',
      training_desc: 'Programs to support skills and rehabilitation.',
      financial_aid: 'Financial Aid',
      financial_aid_desc: 'Financial assistance for those in need.',
      need_help: 'Do you need help?',
      need_help_sub: 'Submit a request now and get the support you need.',
      request_service_btn: 'Request Service',
      how_to_get: 'How to get the service?',
      step1: 'Submit a request for the service you need',
      step2: 'Your request will be reviewed by our team',
      step3: 'We will contact you to provide the service',
      request: 'Request',
      review: 'Review',
      get_service: 'Provide Service',
      home: 'Home',
      beneficiary_services: 'Services',
    },
    ar: {
      title: 'الخدمات المتاحة',
      subtitle: 'نقدم مجموعة شاملة من الخدمات لمساعدة المحتاجين',
      section_title: 'خدماتنا',
      section_desc: 'نلتزم بتقديم خدمات ذات جودة برعاية واحترام.',
      request_service: 'طلب هذه الخدمة',
      deceased_prep: 'تجهيز المتوفى',
      deceased_prep_desc: 'خدمات التجهيز والكفن وفق السنة الإسلامية.',
      transport: 'نقل الجثامين',
      transport_desc: 'نقل جثامين الموتى من وإلى المقابر والمستشفيات بسيارات مجهزة وعناية تامة.',
      burial: 'الدفن',
      burial_desc: 'خدمات الدفن وإعداد القبر.',
      psychological: 'الدعم النفسي والإرشاد',
      psychological_desc: 'استشارات ودعم للأسر في وقت الحاجة.',
      training: 'التدريب والتأهيل',
      training_desc: 'برامج دعم المهارات والتأهيل.',
      financial_aid: 'المساعدات المالية',
      financial_aid_desc: 'مساعدات مالية لمن هم في حاجة.',
      need_help: 'هل تحتاج إلى مساعدة؟',
      need_help_sub: 'قدم طلباً الآن واحصل على الدعم الذي تحتاجه.',
      request_service_btn: 'طلب خدمة',
      how_to_get: 'كيف تحصل على الخدمة؟',
      step1: 'قدم طلباً للخدمة التي تحتاجها',
      step2: 'سيتم مراجعة طلبك من قبل فريقنا',
      step3: 'سنتواصل معك لتقديم الخدمة',
      request: 'الطلب',
      review: 'المراجعة',
      get_service: 'الخدمة',
      home: 'الرئيسية',
      beneficiary_services: 'الخدمات',
    },
  }[lang]

  const services = [
    { icon: FaMosque, title: t.burial, desc: t.burial_desc },
    { icon: FaHandsHelping, title: t.psychological, desc: t.psychological_desc },
    { icon: FaChalkboardTeacher, title: t.training, desc: t.training_desc },
    { icon: FaDonate, title: t.financial_aid, desc: t.financial_aid_desc },
  ]

  const steps = [
    { num: 1, title: t.request, desc: t.step1 },
    { num: 2, title: t.review, desc: t.step2 },
    { num: 3, title: t.get_service, desc: t.step3 },
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.beneficiary_services, to: '/beneficiary-services' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.section_title}</h2>
            <p className="text-gray-600 max-w-2xl">{t.section_desc}</p>
            <div className="h-1 w-20 mt-2 rounded-full" style={{ backgroundColor: '#C89B3C' }} />
          </div>
          <Grid cols={3}>
            {services.map((s, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14,75,51,0.1)' }}>
                  <s.icon size={28} style={{ color: '#0E4B33' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0E4B33' }}>{s.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
                <Link to="/service-request" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#1d4ed8' }}>
                  <FaUser size={16} />
                  {t.request_service}
                </Link>
              </Card>
            ))}
          </Grid>

          <div className="mt-16 py-12 px-6 rounded-2xl" style={{ backgroundColor: '#E3B14D' }}>
            <h3 className="text-2xl font-bold text-center mb-2" style={{ color: '#0E4B33' }}>{t.need_help}</h3>
            <p className="text-center text-gray-800 mb-6">{t.need_help_sub}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/service-request" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-colors hover:bg-[#0E4B33] hover:text-white" style={{ borderColor: '#0E4B33', color: '#0E4B33' }}>
                <FaFileAlt size={20} />
                {t.request_service_btn}
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#0E4B33' }}>{t.how_to_get}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-white" style={{ backgroundColor: '#0E4B33' }}>
                    {step.num}
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#0E4B33' }}>{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default AvailableServices
