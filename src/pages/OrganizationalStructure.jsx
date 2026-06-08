import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaUsers, FaSitemap, FaUserTie, FaBuilding, FaProjectDiagram, FaAward, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const OrganizationalStructure = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar')
  const [expandedSection, setExpandedSection] = useState(null)
  const isAr = language === 'ar'

  const t = {
    en: {
      title: 'Organizational Structure',
      subtitle: 'The hierarchical structure of Mathwaa Charitable Association reflecting authorities, committees, and departments.',
      home: 'Home',
      governance: 'Governance & Disclosure',
      structure_title: 'Organizational Structure of Mathwaa Association',
      structure_desc: 'This structure reflects the hierarchical order of authorities, committees, and departments based on the provisions of the bylaws, ensuring separation of powers and achieving good governance principles.',
      license: 'License No. 1000827300 - Dated 6/1447H',
      assembly: 'General Assembly',
      assembly_desc: 'The supreme authority responsible for approving policies, electing the Board of Directors, approving budgets and reports, and amending the bylaws.',
      board: 'Board of Directors',
      board_desc: 'Manages the association and makes major strategic decisions while overseeing operations. Consists of 5 founding members.',
      board_members_list: 'Board Members',
      executive: 'Executive Management',
      executive_desc: 'Led by the Executive Director and responsible for implementing the Board\'s decisions and managing daily operations.',
      committees_title: 'Board Committees',
      committees_desc: 'Specialized committees formed by the Board to support governance and oversight.',
      departments: 'Departments & Divisions',
      departments_desc: 'The operational units that carry out the association\'s programs and services.',
      dept_finance: 'Financial Management',
      dept_hr: 'Human Resources',
      dept_programs: 'Programs & Activities',
      dept_pr: 'Public Relations & Media',
      dept_volunteers: 'Volunteer Management',
      committee_audit: 'Internal Audit Committee',
      committee_nominations: 'Nominations & Remuneration Committee',
      committee_programs: 'Programs & Projects Committee',
      chairman: 'Chairman',
      vice_chairman: 'Vice Chairman',
      member: 'Member',
    },
    ar: {
      title: 'الهيكل التنظيمي',
      subtitle: 'الهيكل التنظيمي لجمعية مثوى الأهلية يعكس التسلسل الهرمي للسلطات واللجان والأقسام.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      structure_title: 'الهيكل التنظيمي لجمعية مثوى الأهلية',
      structure_desc: 'يعكس هذا الهيكل التسلسل الهرمي للسلطات واللجان والأقسام بناءً على المواد المنصوص عليها في اللائحة، ويضمن الفصل بين السلطات وتحقيق مبادئ الحوكمة الرشيدة.',
      license: 'رقم الترخيص 1000827300 - بتاريخ 6-1447هـ',
      assembly: 'الجمعية العمومية',
      assembly_desc: 'أعلى سلطة في الجمعية، مسؤولة عن إقرار السياسات العليا، انتخاب مجلس الإدارة، اعتماد الميزانيات والتقارير، وتعديل اللائحة.',
      board: 'مجلس الإدارة',
      board_desc: 'يدير الجمعية ويتخذ القرارات الاستراتيجية الكبرى ويشرف على أعمالها. يتكون من 5 أعضاء مؤسسين.',
      board_members_list: 'أعضاء المجلس',
      executive: 'الجهاز التنفيذي',
      executive_desc: 'يقوده المدير التنفيذي وهو المسؤول عن تنفيذ قرارات المجلس وإدارة العمليات اليومية.',
      committees_title: 'اللجان المنبثقة',
      committees_desc: 'لجان متخصصة يشكّلها مجلس الإدارة لدعم الحوكمة والرقابة.',
      departments: 'الإدارات والأقسام',
      departments_desc: 'الوحدات التشغيلية التي تنفذ برامج وخدمات الجمعية.',
      dept_finance: 'الإدارة المالية',
      dept_hr: 'الموارد البشرية',
      dept_programs: 'البرامج والأنشطة',
      dept_pr: 'العلاقات العامة والإعلام',
      dept_volunteers: 'إدارة المتطوعين',
      committee_audit: 'لجنة المراجعة الداخلية',
      committee_nominations: 'لجنة الترشيحات والمكافآت',
      committee_programs: 'لجنة البرامج والمشاريع',
      chairman: 'رئيس مجلس الإدارة',
      vice_chairman: 'نائب رئيس مجلس الإدارة',
      member: 'عضو',
    },
  }[language]

  const boardMembers = [
    { name_ar: 'هادي بن ناصر بن هاشم السلمان', name_en: 'Hadi Al-Salman', role: 'chairman' },
    { name_ar: 'عباس بن حمزة بن ناصر البراهيم', name_en: 'Abbas Al-Brahim', role: 'vice_chairman' },
    { name_ar: 'وليد بن علي بن حسين الفايز', name_en: 'Waleed Al-Fayez', role: 'member' },
    { name_ar: 'عبدالله بن حمزة بن ناصر البراهيم', name_en: 'Abdullah Al-Brahim', role: 'member' },
    { name_ar: 'شعاع بنت عبدالله بن أحمد الحربي', name_en: 'Shuaa Al-Harbi', role: 'member' },
  ]

  const orgLevels = [
    {
      id: 'assembly',
      icon: FaUsers,
      title: t.assembly,
      desc: t.assembly_desc,
      color: '#C89B3C',
      level: 1,
    },
    {
      id: 'board',
      icon: FaAward,
      title: t.board,
      desc: t.board_desc,
      color: '#0E4B33',
      level: 2,
      hasMembers: true,
    },
    {
      id: 'committees',
      icon: FaProjectDiagram,
      title: t.committees_title,
      desc: t.committees_desc,
      color: '#2563eb',
      level: 3,
      items: [t.committee_audit, t.committee_nominations, t.committee_programs],
    },
    {
      id: 'executive',
      icon: FaUserTie,
      title: t.executive,
      desc: t.executive_desc,
      color: '#7c3aed',
      level: 3,
    },
    {
      id: 'departments',
      icon: FaBuilding,
      title: t.departments,
      desc: t.departments_desc,
      color: '#059669',
      level: 4,
      items: [t.dept_finance, t.dept_hr, t.dept_programs, t.dept_pr, t.dept_volunteers],
    },
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance, to: '/governance' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />

      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0E4B33] mb-3">{t.structure_title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-2">{t.structure_desc}</p>
            <span className="inline-block mt-2 px-4 py-1 bg-[#C89B3C]/10 text-[#C89B3C] rounded-full text-sm font-bold">{t.license}</span>
          </div>

          {/* Org Chart - Visual Hierarchy */}
          <div className="max-w-4xl mx-auto space-y-4">
            {orgLevels.map((level) => {
              const Icon = level.icon
              const isExpanded = expandedSection === level.id
              return (
                <div key={level.id}>
                  {/* Connector line */}
                  {level.level > 1 && (
                    <div className="flex justify-center">
                      <div className="w-0.5 h-6 bg-gray-300"></div>
                    </div>
                  )}
                  
                  <div
                    className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl cursor-pointer`}
                    style={{ borderColor: level.color, marginLeft: `${(level.level - 1) * 20}px`, marginRight: `${(level.level - 1) * 20}px` }}
                    onClick={() => setExpandedSection(isExpanded ? null : level.id)}
                  >
                    <div className="p-6 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${level.color}15` }}>
                        <Icon size={28} style={{ color: level.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold" style={{ color: level.color }}>{level.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{level.desc}</p>
                      </div>
                      <div className="text-gray-400">
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                        {level.hasMembers && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {boardMembers.map((m, i) => (
                              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                                <FaUserTie size={20} style={{ color: i === 0 ? '#C89B3C' : '#0E4B33' }} />
                                <div>
                                  <p className="font-bold text-sm text-[#0E4B33]">{isAr ? m.name_ar : m.name_en}</p>
                                  <p className="text-xs text-gray-500">{t[m.role]}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {level.items && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {level.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: level.color }}></div>
                                <p className="font-medium text-sm text-gray-700">{item}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>


        </Container>
      </Section>
    </>
  )
}

export default OrganizationalStructure
