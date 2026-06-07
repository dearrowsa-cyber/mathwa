import React from 'react'
import { Section, Container, Card, Grid } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaLandmark, FaTruck, FaMedkit, FaHeart, FaGraduationCap, FaWallet, FaUser, FaFileAlt } from 'react-icons/fa'

const AvailableServices = () => {
  const lang = localStorage.getItem('language') || 'en'

  const t = {
    en: {
      title: 'Available Services',
      subtitle: 'We offer a comprehensive range of services to help those in need',
      section_title: 'Our Services for Beneficiaries',
      section_desc: 'We are committed to providing quality services to our beneficiaries with care and respect.',
      request_service: 'Request this service',
      deceased_prep: 'Deceased Preparation',
      deceased_prep_desc: 'Full preparation and shrouding services in accordance with Islamic tradition.',
      transport: 'Deceased Transport',
      transport_desc: 'Dignified transport of the deceased to the place of burial.',
      burial: 'Burial',
      burial_desc: 'Burial services and grave preparation.',
      psychological: 'Psychological Support and Guidance',
      psychological_desc: 'Counseling and support for families in their time of need.',
      training: 'Training and Rehabilitation',
      training_desc: 'Programs to support skills and rehabilitation.',
      financial_aid: 'Financial Aid',
      financial_aid_desc: 'Financial assistance for eligible beneficiaries.',
      need_help: 'Do you need help?',
      need_help_sub: 'Register as a beneficiary now and get the support you need.',
      request_service_btn: 'Request Service',
      register_beneficiary: 'Register as Beneficiary',
      how_to_get: 'How to get the service?',
      step1: 'Register as a beneficiary in the system',
      step2: 'Submit a request for the service you need',
      step3: 'Your request will be reviewed by our team',
      step4: 'We will contact you to provide the service',
      registration: 'Registration',
      request: 'Request Service',
      review: 'Review',
      get_service: 'Get the Service',
      home: 'Home',
      beneficiary_services: 'Beneficiary Services',
    },
    ar: {
      title: 'الخدمات المتاحة',
      subtitle: 'نقدم مجموعة شاملة من الخدمات لمساعدة المحتاجين',
      section_title: 'خدماتنا للمستفيدين',
      section_desc: 'نلتزم بتقديم خدمات ذات جودة لمستفيدينا برعاية واحترام.',
      request_service: 'طلب هذه الخدمة',
      deceased_prep: 'تجهيز المتوفى',
      deceased_prep_desc: 'خدمات التجهيز والكفن وفق السنة الإسلامية.',
      transport: 'نقل المتوفى',
      transport_desc: 'نقل كريم للمتوفى إلى مكان الدفن.',
      burial: 'الدفن',
      burial_desc: 'خدمات الدفن وإعداد القبر.',
      psychological: 'الدعم النفسي والإرشاد',
      psychological_desc: 'استشارات ودعم للأسر في وقت الحاجة.',
      training: 'التدريب والتأهيل',
      training_desc: 'برامج دعم المهارات والتأهيل.',
      financial_aid: 'المساعدات المالية',
      financial_aid_desc: 'مساعدات مالية للمستفيدين المؤهلين.',
      need_help: 'هل تحتاج إلى مساعدة؟',
      need_help_sub: 'سجل كمستفيد الآن واحصل على الدعم الذي تحتاجه.',
      request_service_btn: 'طلب خدمة',
      register_beneficiary: 'سجل كمستفيد',
      how_to_get: 'كيف تحصل على الخدمة؟',
      step1: 'سجل كمستفيد في النظام',
      step2: 'قدم طلباً للخدمة التي تحتاجها',
      step3: 'سيتم مراجعة طلبك من قبل فريقنا',
      step4: 'سنتواصل معك لتقديم الخدمة',
      registration: 'التسجيل',
      request: 'طلب الخدمة',
      review: 'المراجعة',
      get_service: 'الحصول على الخدمة',
      home: 'الرئيسية',
      beneficiary_services: 'خدمات المستفيدين',
    },
  }[lang]

  const services = [
    { icon: Landmark, title: t.deceased_prep, desc: t.deceased_prep_desc },
    { icon: Truck, title: t.transport, desc: t.transport_desc },
    { icon: Cross, title: t.burial, desc: t.burial_desc },
    { icon: Heart, title: t.psychological, desc: t.psychological_desc },
    { icon: GraduationCap, title: t.training, desc: t.training_desc },
    { icon: Wallet, title: t.financial_aid, desc: t.financial_aid_desc },
  ]

  const steps = [
    { num: 1, title: t.registration, desc: t.step1 },
    { num: 2, title: t.request, desc: t.step2 },
    { num: 3, title: t.review, desc: t.step3 },
    { num: 4, title: t.get_service, desc: t.step4 },
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
              <Link to="/service-request" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-colors" style={{ borderColor: '#0E4B33', color: '#0E4B33' }}>
                <FaFileAlt size={20} />
                {t.request_service_btn}
              </Link>
              <Link to="/beneficiary-register" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#0E4B33' }}>
                <FaUser size={20} />
                {t.register_beneficiary}
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
