import React from 'react'
import { Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaUser, FaAward, FaCoins, FaFileAlt, FaBalanceScale, FaClipboardList, FaUserFriends, FaExternalLinkAlt } from 'react-icons/fa'

const Membership = () => {
  const lang = localStorage.getItem('language') || 'en'
  
  const t = {
    en: {
      title: 'Membership Subscriptions',
      subtitle: 'Join as a member and support our mission',
      definition: 'Membership Definition',
      definition_text: 'Membership in the association grants you the right to participate in general assembly meetings, vote on decisions, and stay informed about our activities.',
      active_participation: 'Active Participation',
      right_to_vote: 'Right to Vote',
      continuous_communication: 'Continuous Communication',
      types: 'Types of Membership',
      honorary: 'Honorary Membership',
      honorary_by_decision: 'By Board decision',
      supporting: 'Supporting Membership',
      supporting_amount: '500+ Donation',
      regular: 'Regular Membership',
      regular_amount: '500',
      benefit1: 'Benefit 1',
      benefit2: 'Benefit 2',
      how_to_join: 'How to Join',
      step1: 'Go to Portal',
      step2: 'Fill Details',
      step3: 'Pay Online',
      step4: 'Board Review',
      step5: 'Approval',
      join: 'Join',
      home: 'Home',
      contribute: 'Contribute with Us',
      governance_integration: 'Governance & General Assembly',
      rights: 'Member Rights',
      duties: 'Member Duties',
      general_assembly_link: 'View General Assembly Data'
    },
    ar: {
      title: 'اشتراكات العضوية',
      subtitle: 'انضم كعضو وادعم رسالتنا',
      definition: 'تعريف العضوية',
      definition_text: 'تمنحك العضوية في الجمعية الحق في المشاركة في اجتماعات الجمعية العمومية والتصويت على القرارات والاطلاع على أنشطتنا.',
      active_participation: 'المشاركة الفعالة',
      right_to_vote: 'حق التصويت',
      continuous_communication: 'التواصل المستمر',
      types: 'أنواع العضوية',
      honorary: 'العضوية الفخرية',
      honorary_by_decision: 'بقرار مجلس الإدارة',
      supporting: 'العضوية الداعمة',
      supporting_amount: '٥٠٠ + تبرع',
      regular: 'العضوية العادية',
      regular_amount: '٥٠٠',
      benefit1: 'الفائدة ١',
      benefit2: 'الفائدة ٢',
      how_to_join: 'آلية الانضمام للعضوية',
      step1: 'الانتقال للبوابة',
      step2: 'تعبئة البيانات',
      step3: 'الدفع الإلكتروني',
      step4: 'مراجعة الإدارة',
      step5: 'الاعتماد',
      join: 'انضم الآن',
      home: 'الرئيسية',
      contribute: 'ساهم معنا',
      governance_integration: 'الحوكمة والجمعية العمومية',
      rights: 'حقوق العضو',
      duties: 'واجبات العضو',
      general_assembly_link: 'بيانات الجمعية العمومية'
    },
  }[lang]

  const steps = [t.step1, t.step2, t.step3, t.step4, t.step5]
  const benefits = [t.active_participation, t.right_to_vote, t.continuous_communication]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.contribute, to: '/donate' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-4">
              <FaUser size={28} style={{ color: '#C89B3C' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.definition}</h2>
            </div>
            <p className="text-gray-600 mb-6">{t.definition_text}</p>
            <div className="flex flex-wrap gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle size={20} style={{ color: '#C89B3C' }} />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#0E4B33' }}>{t.types}</h2>
          
          {/* Membership Types Cards */}
          <Grid cols={3}>
            {/* Honorary Membership */}
            <Card className="p-8 border-2 border-gray-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="text-center mb-6">
                  <FaAward size={48} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                    {lang === 'ar' ? 'العضوية الفخرية' : 'Honorary Membership'}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-8">
                  <p className="text-sm font-semibold text-gray-600 text-center mb-4">
                    {lang === 'ar' ? 'بقرار مجلس الإدارة' : 'By Board decision'}
                  </p>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                  </div>
                </div>
              </div>
              
              <button 
                disabled
                className="w-full py-2 rounded-lg font-semibold text-white bg-gray-300 cursor-not-allowed mt-auto"
              >
                {lang === 'ar' ? 'بقرار من المجلس' : 'By Board decision'}
              </button>
            </Card>

            {/* Supporting Membership */}
            <Card className="p-8 border-4 hover:shadow-xl transition-all flex flex-col justify-between" style={{ borderColor: '#C89B3C', backgroundColor: 'rgba(200, 155, 60, 0.02)' }}>
              <div>
                <div className="text-center mb-6">
                  <FaCoins size={48} className="mx-auto mb-4" style={{ color: '#C89B3C' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                    {lang === 'ar' ? 'العضوية الداعمة' : 'Supporting Membership'}
                  </h3>
                  <p className="text-lg font-bold" style={{ color: '#C89B3C' }}>
                    {lang === 'ar' ? '٥٠٠ + تبرع' : '500+ Donation'}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://mathwaa.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-auto"
                style={{ backgroundColor: '#C89B3C' }}
              >
                {t.join} <FaExternalLinkAlt size={14} />
              </a>
            </Card>

            {/* Regular Membership */}
            <Card className="p-8 border-2 border-gray-200 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="text-center mb-6">
                  <FaUser size={48} className="mx-auto mb-4" style={{ color: '#0E4B33' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                    {lang === 'ar' ? 'العضوية العادية' : 'Regular Membership'}
                  </h3>
                  <p className="text-lg font-bold" style={{ color: '#2563eb' }}>
                    {lang === 'ar' ? '٥٠٠' : '500'}
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                    <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://mathwaa.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-auto"
                style={{ backgroundColor: '#2563eb' }}
              >
                {t.join} <FaExternalLinkAlt size={14} />
              </a>
            </Card>
          </Grid>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.how_to_join}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold" style={{ backgroundColor: '#C89B3C' }}>{i + 1}</div>
                  <p className="font-semibold text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 mb-12 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#0E4B33' }}>{t.governance_integration}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-[#C89B3C] flex items-center gap-2">
                  <FaBalanceScale /> {t.rights}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'الاطلاع على قرارات الجمعية العمومية.' : 'View General Assembly decisions.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'التصويت في اجتماعات الجمعية (للأعضاء العاديين).' : 'Vote in meetings (for regular members).'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'تلقي التقارير السنوية والمالية.' : 'Receive annual and financial reports.'}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-[#C89B3C] flex items-center gap-2">
                  <FaClipboardList /> {t.duties}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'الالتزام بأحكام اللائحة الأساسية للجمعية.' : 'Commit to the basic regulations.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'دفع الاشتراك السنوي في موعده.' : 'Pay the annual subscription on time.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'المساهمة في تحقيق أهداف الجمعية.' : 'Contribute to achieving the goals.'}</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <Link to="/general-assembly" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0E4B33] text-white rounded-full font-bold hover:bg-[#C89B3C] transition-colors">
                <FaUserFriends /> {t.general_assembly_link}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Membership
