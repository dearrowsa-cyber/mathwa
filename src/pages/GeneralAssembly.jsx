import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaUsers, FaUserCircle, FaCrown, FaUserTie, FaClipboardList, FaVoteYea, FaCalendarAlt, FaFileAlt } from 'react-icons/fa'

const GeneralAssembly = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar')
  const isAr = language === 'ar'

  const t = {
    en: {
      title: 'General Assembly',
      subtitle: 'The supreme authority of Mathwaa Charitable Association responsible for major decisions and oversight.',
      home: 'Home',
      governance: 'Governance & Disclosure',
      members_title: 'Members of the General Assembly',
      members_desc: 'The founding members and members of the Board of Directors who constitute the General Assembly of the association.',
      membership_types: 'Types of Assembly Membership',
      type_founding: 'Founding Member',
      type_founding_desc: 'The founders who established the association and hold permanent membership in the General Assembly.',
      type_regular: 'Regular Member',
      type_regular_desc: 'Members who joined after establishment and paid the membership subscription.',
      type_honorary: 'Honorary Member',
      type_honorary_desc: 'Granted by Board decision to individuals who provided distinguished services.',
      responsibilities: 'Responsibilities of the General Assembly',
      resp1: 'Approving the internal regulations and bylaws of the association',
      resp2: 'Electing and dismissing Board of Directors members',
      resp3: 'Approving annual budgets and financial statements',
      resp4: 'Reviewing and approving annual reports',
      resp5: 'Amending the basic regulation of the association',
      resp6: 'Approving the strategic plan and major initiatives',
      resp7: 'Appointing the external auditor',
      resp8: 'Deciding on merging or dissolving the association',
      meetings_title: 'Meeting Minutes',
      meetings_desc: 'The General Assembly meets at least once a year (ordinary meeting). Extraordinary meetings may be called when necessary.',
      voting_title: 'Decisions & Voting Results',
      voting_desc: 'Decisions are made by majority vote of attending members. Each member has one vote.',
      no_meetings: 'Meeting minutes will be published after the first General Assembly meeting.',
      chairman: 'Chairman',
      vice_chairman: 'Vice Chairman',
      member: 'Board Member',
    },
    ar: {
      title: 'الجمعية العمومية',
      subtitle: 'أعلى سلطة في جمعية مثوى الأهلية المسؤولة عن القرارات الكبرى والرقابة.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      members_title: 'أعضاء الجمعية العمومية',
      members_desc: 'المؤسسون وأعضاء مجلس الإدارة الذين يشكّلون الجمعية العمومية للجمعية.',
      membership_types: 'أنواع عضوية الجمعية العمومية',
      type_founding: 'عضو مؤسس',
      type_founding_desc: 'المؤسسون الذين أسسوا الجمعية ويحملون عضوية دائمة في الجمعية العمومية.',
      type_regular: 'عضو عادي',
      type_regular_desc: 'الأعضاء الذين انضموا بعد التأسيس وسددوا اشتراك العضوية.',
      type_honorary: 'عضو فخري',
      type_honorary_desc: 'تُمنح بقرار من مجلس الإدارة لأشخاص قدموا خدمات متميزة.',
      responsibilities: 'اختصاصات الجمعية العمومية',
      resp1: 'إقرار اللوائح الداخلية والأنظمة الأساسية للجمعية',
      resp2: 'انتخاب وعزل أعضاء مجلس الإدارة',
      resp3: 'اعتماد الميزانيات السنوية والقوائم المالية',
      resp4: 'مراجعة واعتماد التقارير السنوية',
      resp5: 'تعديل اللائحة الأساسية للجمعية',
      resp6: 'إقرار الخطة الاستراتيجية والمبادرات الكبرى',
      resp7: 'تعيين المراجع الخارجي',
      resp8: 'البت في دمج الجمعية أو حلها',
      meetings_title: 'محاضر الاجتماعات',
      meetings_desc: 'تجتمع الجمعية العمومية مرة واحدة على الأقل سنوياً (اجتماع عادي). ويمكن عقد اجتماعات استثنائية عند الحاجة.',
      voting_title: 'القرارات ونتائج التصويت',
      voting_desc: 'تُتخذ القرارات بأغلبية أصوات الأعضاء الحاضرين. لكل عضو صوت واحد.',
      no_meetings: 'سيتم نشر محاضر الاجتماعات بعد انعقاد أول اجتماع للجمعية العمومية.',
      chairman: 'رئيس مجلس الإدارة',
      vice_chairman: 'نائب رئيس مجلس الإدارة',
      member: 'عضو مجلس الإدارة',
    },
  }[language]

  const assemblyMembers = [
    { name_ar: 'هادي بن ناصر بن هاشم السلمان', name_en: 'Hadi bin Nasser Al-Salman', role: 'chairman', is_founder: true },
    { name_ar: 'عباس بن حمزة بن ناصر البراهيم', name_en: 'Abbas bin Hamza Al-Brahim', role: 'vice_chairman', is_founder: true },
    { name_ar: 'وليد بن علي بن حسين الفايز', name_en: 'Waleed bin Ali Al-Fayez', role: 'member', is_founder: true },
    { name_ar: 'عبدالله بن حمزة بن ناصر البراهيم', name_en: 'Abdullah bin Hamza Al-Brahim', role: 'member', is_founder: true },
    { name_ar: 'شعاع بنت عبدالله بن أحمد الحربي', name_en: 'Shuaa bint Abdullah Al-Harbi', role: 'member', is_founder: true },
  ]

  const membershipTypes = [
    { title: t.type_founding, desc: t.type_founding_desc, icon: FaCrown, color: '#C89B3C' },
    { title: t.type_regular, desc: t.type_regular_desc, icon: FaUserCircle, color: '#0E4B33' },
    { title: t.type_honorary, desc: t.type_honorary_desc, icon: FaUserTie, color: '#7c3aed' },
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance, to: '/governance' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />

      {/* Membership Types */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-[#0E4B33] text-center mb-10">{t.membership_types}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTypes.map((type, i) => {
              const Icon = type.icon
              return (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 hover:shadow-xl transition-all" style={{ borderColor: type.color }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${type.color}15` }}>
                    <Icon size={32} style={{ color: type.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: type.color }}>{type.title}</h3>
                  <p className="text-gray-600">{type.desc}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Assembly Members */}
      <Section className="bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0E4B33] text-center mb-3">{t.members_title}</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">{t.members_desc}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {assemblyMembers.map((member, i) => (
              <div key={i} className={`bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all ${i === 0 ? 'border-2 border-[#C89B3C] sm:col-span-2 lg:col-span-1' : 'border border-gray-100'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${i === 0 ? 'bg-[#C89B3C]/10' : 'bg-gray-100'}`}>
                  {i === 0 ? <FaCrown size={28} className="text-[#C89B3C]" /> : <FaUserTie size={24} className="text-[#0E4B33]" />}
                </div>
                <h3 className="font-bold text-[#0E4B33] mb-1">{isAr ? member.name_ar : member.name_en}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${i === 0 ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : 'bg-gray-100 text-gray-600'}`}>
                  {t[member.role]}
                </span>
                {member.is_founder && (
                  <p className="text-xs text-[#C89B3C] mt-2 font-medium">{isAr ? '⭐ عضو مؤسس' : '⭐ Founding Member'}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Responsibilities */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold text-[#0E4B33] text-center mb-10">{t.responsibilities}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[t.resp1, t.resp2, t.resp3, t.resp4, t.resp5, t.resp6, t.resp7, t.resp8].map((resp, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium">{resp}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Meetings & Voting */}
      <Section className="bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#0E4B33]">
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt size={24} className="text-[#0E4B33]" />
                <h3 className="text-xl font-bold text-[#0E4B33]">{t.meetings_title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.meetings_desc}</p>
              <div className="bg-[#0E4B33]/5 rounded-xl p-4 text-center">
                <FaFileAlt size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">{t.no_meetings}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#C89B3C]">
              <div className="flex items-center gap-3 mb-4">
                <FaVoteYea size={24} className="text-[#C89B3C]" />
                <h3 className="text-xl font-bold text-[#0E4B33]">{t.voting_title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t.voting_desc}</p>
              <div className="bg-[#C89B3C]/5 rounded-xl p-4 text-center">
                <FaClipboardList size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">{t.no_meetings}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default GeneralAssembly
