import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaSearch, FaAward, FaClipboardCheck, FaProjectDiagram, FaUserTie, FaUsers, FaCheckCircle, FaBullseye } from 'react-icons/fa'

const Committees = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar')
  const isAr = language === 'ar'

  const t = {
    en: {
      title: 'Board Committees',
      subtitle: 'Specialized committees formed by the Board of Directors to support governance, oversight, and program management.',
      home: 'Home',
      governance: 'Governance & Disclosure',
      intro: 'In accordance with governance best practices, Mathwaa Charitable Association\'s Board of Directors (License No. 1000827300) has established specialized committees to ensure effective oversight and management across all operational areas.',
      chair: 'Committee Chair',
      members_label: 'Members',
      responsibilities: 'Responsibilities',
    },
    ar: {
      title: 'اللجان المنبثقة',
      subtitle: 'لجان متخصصة شكّلها مجلس الإدارة لدعم الحوكمة والرقابة وإدارة البرامج.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      intro: 'وفقاً لأفضل ممارسات الحوكمة، قام مجلس إدارة جمعية مثوى الأهلية (رقم ترخيص 1000827300) بتشكيل لجان متخصصة لضمان الرقابة والإدارة الفعّالة في جميع المجالات التشغيلية.',
      chair: 'رئيس اللجنة',
      members_label: 'الأعضاء',
      responsibilities: 'المهام والمسؤوليات',
    },
  }[language]

  const committees = [
    {
      id: 'audit',
      icon: FaSearch,
      color: '#C89B3C',
      title_ar: 'لجنة المراجعة الداخلية',
      title_en: 'Internal Audit Committee',
      desc_ar: 'تتولى مراجعة الأنظمة المالية والإدارية والتأكد من الالتزام باللوائح والسياسات المعتمدة.',
      desc_en: 'Reviews financial and administrative systems and ensures compliance with approved regulations and policies.',
      chair_ar: 'عباس بن حمزة البراهيم',
      chair_en: 'Abbas bin Hamza Al-Brahim',
      members_ar: ['عضو مجلس إدارة', 'مستشار مالي خارجي'],
      members_en: ['Board Member', 'External Financial Advisor'],
      responsibilities_ar: [
        'مراجعة القوائم المالية والتقارير الدورية',
        'تقييم نظام الرقابة الداخلية وكفاءته',
        'التأكد من الالتزام بالأنظمة واللوائح المعمول بها',
        'مراجعة عقود الجمعية والتزاماتها المالية',
        'التنسيق مع المراجع الخارجي',
        'رفع تقارير دورية لمجلس الإدارة',
        'التحقيق في أي شبهات مالية أو إدارية',
      ],
      responsibilities_en: [
        'Review financial statements and periodic reports',
        'Assess the internal control system and its efficiency',
        'Ensure compliance with applicable laws and regulations',
        'Review the association\'s contracts and financial obligations',
        'Coordinate with the external auditor',
        'Submit periodic reports to the Board',
        'Investigate any financial or administrative suspicions',
      ],
    },
    {
      id: 'nominations',
      icon: FaAward,
      color: '#0E4B33',
      title_ar: 'لجنة الترشيحات والمكافآت',
      title_en: 'Nominations & Remuneration Committee',
      desc_ar: 'تتولى ترشيح أعضاء مجلس الإدارة والمناصب القيادية وتحديد سياسات المكافآت والتعويضات.',
      desc_en: 'Handles Board member nominations and leadership positions, and determines remuneration and compensation policies.',
      chair_ar: 'وليد بن علي الفايز',
      chair_en: 'Waleed bin Ali Al-Fayez',
      members_ar: ['عضو مجلس إدارة', 'مستشار موارد بشرية'],
      members_en: ['Board Member', 'HR Advisor'],
      responsibilities_ar: [
        'اقتراح معايير اختيار أعضاء مجلس الإدارة',
        'ترشيح المرشحين للمناصب القيادية',
        'وضع سياسة المكافآت والتعويضات',
        'تقييم أداء أعضاء مجلس الإدارة',
        'مراجعة هيكل الرواتب والبدلات',
        'ضمان استقلالية أعضاء المجلس',
        'إعداد خطط التعاقب الوظيفي',
      ],
      responsibilities_en: [
        'Propose criteria for Board member selection',
        'Nominate candidates for leadership positions',
        'Develop remuneration and compensation policy',
        'Evaluate Board member performance',
        'Review salary and allowance structure',
        'Ensure Board member independence',
        'Prepare succession planning',
      ],
    },
    {
      id: 'programs',
      icon: FaProjectDiagram,
      color: '#7c3aed',
      title_ar: 'لجنة البرامج والمشاريع',
      title_en: 'Programs & Projects Committee',
      desc_ar: 'تشرف على تصميم وتنفيذ ومتابعة برامج ومشاريع الجمعية لضمان تحقيق الأهداف الاستراتيجية.',
      desc_en: 'Oversees the design, implementation, and monitoring of the association\'s programs and projects to achieve strategic goals.',
      chair_ar: 'شعاع بنت عبدالله الحربي',
      chair_en: 'Shuaa bint Abdullah Al-Harbi',
      members_ar: ['عضو مجلس إدارة', 'مدير البرامج'],
      members_en: ['Board Member', 'Programs Director'],
      responsibilities_ar: [
        'تصميم البرامج والمبادرات الجديدة',
        'متابعة تنفيذ المشاريع ومؤشرات الأداء',
        'تقييم أثر البرامج على المستفيدين',
        'اقتراح شراكات مع الجهات ذات العلاقة',
        'إعداد تقارير الإنجاز الدورية',
        'مراجعة الخطة التشغيلية السنوية',
        'تطوير آليات قياس الأثر الاجتماعي',
      ],
      responsibilities_en: [
        'Design new programs and initiatives',
        'Monitor project implementation and KPIs',
        'Evaluate program impact on beneficiaries',
        'Propose partnerships with relevant entities',
        'Prepare periodic achievement reports',
        'Review annual operational plan',
        'Develop social impact measurement mechanisms',
      ],
    },
    {
      id: 'financial',
      icon: FaClipboardCheck,
      color: '#059669',
      title_ar: 'اللجنة المالية',
      title_en: 'Financial Committee',
      desc_ar: 'تشرف على الشؤون المالية للجمعية بما يشمل الميزانيات وتنمية الموارد المالية والاستثمار.',
      desc_en: 'Oversees the financial affairs including budgets, financial resource development, and investment.',
      chair_ar: 'عبدالله بن حمزة البراهيم',
      chair_en: 'Abdullah bin Hamza Al-Brahim',
      members_ar: ['عضو مجلس إدارة', 'المدير المالي'],
      members_en: ['Board Member', 'Financial Manager'],
      responsibilities_ar: [
        'إعداد ومراجعة الميزانية السنوية',
        'وضع خطة تنمية الموارد المالية',
        'مراقبة التدفقات المالية والمصروفات',
        'تقييم فرص الاستثمار والأوقاف',
        'إعداد التقارير المالية الدورية',
        'ضمان الامتثال للمعايير المحاسبية',
        'إدارة العلاقة مع الجهات المانحة',
      ],
      responsibilities_en: [
        'Prepare and review annual budget',
        'Develop financial resource development plan',
        'Monitor cash flows and expenditures',
        'Evaluate investment and endowment opportunities',
        'Prepare periodic financial reports',
        'Ensure compliance with accounting standards',
        'Manage relationships with donors and grantors',
      ],
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
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 text-lg leading-relaxed">{t.intro}</p>

          <div className="space-y-10 max-w-5xl mx-auto">
            {committees.map((committee) => {
              const Icon = committee.icon
              const responsibilities = isAr ? committee.responsibilities_ar : committee.responsibilities_en
              const members = isAr ? committee.members_ar : committee.members_en
              return (
                <div key={committee.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 flex items-center gap-4" style={{ borderBottom: `3px solid ${committee.color}` }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${committee.color}15` }}>
                      <Icon size={32} style={{ color: committee.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: committee.color }}>
                        {isAr ? committee.title_ar : committee.title_en}
                      </h3>
                      <p className="text-gray-600 mt-1">{isAr ? committee.desc_ar : committee.desc_en}</p>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chair & Members */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs font-bold text-gray-500 mb-2">{t.chair}</p>
                        <div className="flex items-center gap-3">
                          <FaAward size={20} style={{ color: committee.color }} />
                          <p className="font-bold text-[#0E4B33]">{isAr ? committee.chair_ar : committee.chair_en}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs font-bold text-gray-500 mb-2">{t.members_label}</p>
                        {members.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 mt-2">
                            <FaUserTie size={14} className="text-gray-400" />
                            <p className="text-sm text-gray-700">{m}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="lg:col-span-2">
                      <p className="text-sm font-bold text-[#0E4B33] mb-3 flex items-center gap-2">
                        <FaBullseye size={14} className="text-[#C89B3C]" />
                        {t.responsibilities}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {responsibilities.map((r, i) => (
                          <div key={i} className="flex items-start gap-2 p-2">
                            <FaCheckCircle size={12} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{r}</p>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Committees
