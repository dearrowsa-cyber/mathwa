import React, { useState, useEffect } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaUser, FaSpinner, FaCheckCircle, FaTimesCircle, FaUserCircle, FaCrown, FaUserTie } from 'react-icons/fa'

// Real board members data from the Mathwaa Foundation Document
const BOARD_MEMBERS_DATA = [
  {
    id: 1,
    name_ar: 'هادي بن ناصر بن هاشم السلمان',
    name_en: 'Hadi bin Nasser bin Hashem Al-Salman',
    role_ar: 'رئيس مجلس الإدارة',
    role_en: 'Chairman of the Board',
    title_ar: 'السيد',
    title_en: 'Mr.',
    is_chairman: true,
    committees_ar: 'اللجنة التنفيذية',
    committees_en: 'Executive Committee',
  },
  {
    id: 2,
    name_ar: 'عباس بن حمزة بن ناصر البراهيم',
    name_en: 'Abbas bin Hamza bin Nasser Al-Brahim',
    role_ar: 'نائب رئيس مجلس الإدارة',
    role_en: 'Vice Chairman of the Board',
    title_ar: 'الأستاذ',
    title_en: 'Mr.',
    is_vice: true,
    committees_ar: 'لجنة المراجعة الداخلية',
    committees_en: 'Internal Audit Committee',
  },
  {
    id: 3,
    name_ar: 'وليد بن علي بن حسين الفايز',
    name_en: 'Waleed bin Ali bin Hussein Al-Fayez',
    role_ar: 'عضو مجلس الإدارة',
    role_en: 'Board Member',
    title_ar: 'الأستاذ',
    title_en: 'Mr.',
    committees_ar: 'لجنة الترشيحات والمكافآت',
    committees_en: 'Nominations & Remuneration Committee',
  },
  {
    id: 4,
    name_ar: 'عبدالله بن حمزة بن ناصر البراهيم',
    name_en: 'Abdullah bin Hamza bin Nasser Al-Brahim',
    role_ar: 'عضو مجلس الإدارة',
    role_en: 'Board Member',
    title_ar: 'الأستاذ',
    title_en: 'Mr.',
    committees_ar: 'اللجنة المالية',
    committees_en: 'Financial Committee',
  },
  {
    id: 5,
    name_ar: 'شعاع بنت عبدالله بن أحمد الحربي',
    name_en: 'Shuaa bint Abdullah bin Ahmed Al-Harbi',
    role_ar: 'عضو مجلس الإدارة',
    role_en: 'Board Member',
    title_ar: 'الأستاذة',
    title_en: 'Ms.',
    committees_ar: 'لجنة البرامج والمشاريع',
    committees_en: 'Programs & Projects Committee',
  },
]

const BoardMembers = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'ar')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useLocalData, setUseLocalData] = useState(false)
  const isAr = language === 'ar'

  useEffect(() => {
    fetchBoardMembers()
  }, [language])

  const fetchBoardMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      // Force using local data to ensure real board members are displayed
      // The backend currently contains test data, so we use the official foundation document data
      setUseLocalData(true)
      setMembers(BOARD_MEMBERS_DATA)
    } finally {
      setLoading(false)
    }
  }

  const t = {
    en: {
      title: 'Board of Directors',
      subtitle: 'Meet the founders and board members of Mathwaa Charitable Association. Licensed under No. 1000827300.',
      home: 'Home',
      about: 'About Us',
      governance: 'Governance & Disclosure',
      loading: 'Loading board members...',
      no_members: 'No board members found',
      error: 'Error loading board members',
      name: 'Name',
      position: 'Position',
      term: 'Term',
      committees: 'Committees',
      meetings: 'Meetings',
      attendance: 'Attendance',
      founders_title: 'Founders & Board Members',
      founders_desc: 'The founding members and members of the General Assembly who established Mathwaa Charitable Association.',
    },
    ar: {
      title: 'مجلس الإدارة',
      subtitle: 'تعرف على مؤسسي وأعضاء مجلس إدارة جمعية مثوى الأهلية. رقم الترخيص: 1000827300.',
      home: 'الرئيسية',
      about: 'عن الجمعية',
      governance: 'الحوكمة والإفصاح',
      loading: 'جاري تحميل أعضاء المجلس...',
      no_members: 'لم يتم العثور على أعضاء مجلس',
      error: 'خطأ في تحميل أعضاء المجلس',
      name: 'الاسم',
      position: 'المنصب',
      term: 'الدورة',
      committees: 'اللجان',
      meetings: 'الاجتماعات',
      attendance: 'الحضور',
      founders_title: 'المؤسسون وأعضاء مجلس الإدارة',
      founders_desc: 'المؤسسون وأعضاء مجلس الإدارة وأعضاء الجمعية العمومية الذين أسسوا جمعية مثوى الأهلية.',
    },
  }[language]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance, to: '/governance' },
    { label: t.title }
  ]

  const renderMemberCard = (member, idx) => {
    const name = isAr ? member.name_ar : (member.name_en || member.name)
    const role = isAr ? (member.role_ar || member.role) : (member.role_en || member.role)
    const title = isAr ? member.title_ar : member.title_en
    const committees = isAr ? member.committees_ar : member.committees_en
    const isChairman = member.is_chairman
    const isVice = member.is_vice

    return (
      <div 
        key={member.id || idx} 
        className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
          isChairman ? 'border-2 border-[#C89B3C] ring-2 ring-[#C89B3C]/20' : 'border border-gray-100'
        }`}
      >
        {/* Top accent bar */}
        <div className="h-2" style={{ backgroundColor: isChairman ? '#C89B3C' : isVice ? '#0E4B33' : '#e5e7eb' }}></div>
        
        <div className="p-8 text-center">
          {/* Avatar */}
          <div className={`w-24 h-24 mx-auto mb-5 rounded-full flex items-center justify-center ${
            isChairman ? 'bg-[#C89B3C]/10 ring-4 ring-[#C89B3C]/30' : isVice ? 'bg-[#0E4B33]/10 ring-4 ring-[#0E4B33]/20' : 'bg-gray-100'
          }`}>
            {isChairman ? (
              <FaCrown size={40} className="text-[#C89B3C]" />
            ) : (
              <FaUserTie size={36} className={isVice ? 'text-[#0E4B33]' : 'text-gray-400'} />
            )}
          </div>

          {/* Title prefix */}
          {title && (
            <p className="text-sm text-[#C89B3C] font-medium mb-1">{title}</p>
          )}

          {/* Name */}
          <h3 className={`text-lg font-bold mb-2 ${isChairman ? 'text-[#C89B3C]' : 'text-[#0E4B33]'}`}>
            {name}
          </h3>

          {/* Role badge */}
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${
            isChairman ? 'bg-[#C89B3C]/10 text-[#C89B3C]' : isVice ? 'bg-[#0E4B33]/10 text-[#0E4B33]' : 'bg-gray-100 text-gray-700'
          }`}>
            {role}
          </span>

          {/* Committees */}
          {committees && (
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium text-gray-600">{t.committees}: </span>
              {committees}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      
      {/* Members Cards Section */}
      <Section className="bg-gray-50">
        <Container>
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0E4B33] mb-3">{t.founders_title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.founders_desc}</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="animate-spin mb-3" style={{ color: '#0E4B33' }} size={40} />
              <p className="text-gray-600">{t.loading}</p>
            </div>
          )}

          {/* No Data State */}
          {!loading && members.length === 0 && (
            <div className="text-center py-12">
              <FaUser size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">{t.no_members}</p>
            </div>
          )}

          {/* Members Cards */}
          {!loading && members.length > 0 && useLocalData && (
            <>
              {/* Chairman - full width prominent card */}
              <div className="max-w-md mx-auto mb-8">
                {renderMemberCard(members[0], 0)}
              </div>

              {/* Vice + Other members grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.slice(1).map((member, idx) => renderMemberCard(member, idx + 1))}
              </div>
            </>
          )}

          {/* API-based table (when data comes from backend) */}
          {!loading && !error && members.length > 0 && !useLocalData && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#0E4B33] text-white">
                      <th className="py-4 px-6 font-bold">{t.name}</th>
                      <th className="py-4 px-6 font-bold">{t.position}</th>
                      <th className="py-4 px-6 font-bold">{t.term}</th>
                      <th className="py-4 px-6 font-bold">{t.committees}</th>
                      <th className="py-4 px-6 font-bold text-center">{t.meetings}</th>
                      <th className="py-4 px-6 font-bold text-center">{t.attendance}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {members.map((member, idx) => (
                      <tr key={member.id || idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                              {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <FaUser className="text-gray-400" />
                              )}
                            </div>
                            <span className="font-bold text-[#0E4B33]">
                              {member.name_en || member.name || 'Board Member'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700 font-medium">
                          {isAr ? (member.role_ar || member.role) : (member.role_en || member.role)}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          <span className="inline-block bg-gray-100 rounded px-2 py-1">{member.term_start}</span>
                          <span className="mx-2">-</span>
                          <span className="inline-block bg-gray-100 rounded px-2 py-1">{member.term_end}</span>
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {member.committees}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-[#C89B3C]">
                          {member.meetings_count}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
                            {member.attendance} <FaCheckCircle />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default BoardMembers
