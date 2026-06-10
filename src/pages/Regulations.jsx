import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaFileContract, FaMoneyBillWave, FaUsersCog, FaShoppingCart, FaUserTie, FaDownload, FaChevronDown, FaChevronUp, FaCheckCircle, FaGavel, FaSitemap } from 'react-icons/fa'

const Regulations = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar')
  const [expandedReg, setExpandedReg] = useState(null)
  const isAr = language === 'ar'

  const t = {
    en: {
      title: 'Regulations & Bylaws',
      subtitle: 'The regulatory framework governing the operations of Mathwaa Charitable Association.',
      home: 'Home',
      governance: 'Governance & Disclosure',
      intro: 'Mathwaa Charitable Association (License No. 1000827300) operates under a comprehensive set of regulations and bylaws that ensure transparent governance, institutional compliance, and operational excellence in accordance with the regulations of the Ministry of Human Resources and Social Development.',
      download: 'Download PDF',
      articles: 'Key Articles',
    },
    ar: {
      title: 'اللوائح والأنظمة',
      subtitle: 'الإطار التنظيمي الذي يحكم عمليات جمعية مثوى الأهلية.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      intro: 'تعمل جمعية مثوى الأهلية (رقم ترخيص 1000827300) وفق مجموعة شاملة من اللوائح والأنظمة التي تضمن الحوكمة الشفافة والالتزام المؤسسي والتميز التشغيلي وفقاً لأنظمة وزارة الموارد البشرية والتنمية الاجتماعية.',
      download: 'تحميل PDF',
      articles: 'أبرز المواد',
    },
  }[language]

  const regulations = [
    {
      id: 'basic',
      icon: FaGavel,
      color: '#C89B3C',
      title_ar: 'اللائحة الأساسية',
      title_en: 'Basic Regulation (Bylaws)',
      desc_ar: 'اللائحة الأساسية لجمعية مثوى الأهلية المعتمدة من وزارة الموارد البشرية والتنمية الاجتماعية. تحدد أهداف الجمعية وشروط العضوية وهيكلها التنظيمي.',
      desc_en: 'The basic regulation of Mathwaa Charitable Association approved by the Ministry of Human Resources and Social Development. Defines the association\'s objectives, membership conditions, and organizational structure.',
      pdf: '/docs/Basic-Standards.pdf',
      articles_ar: [
        'المادة 1: اسم الجمعية ومقرها ونطاق خدماتها',
        'المادة 2: أهداف الجمعية ووسائل تحقيقها',
        'المادة 3: شروط العضوية وأنواعها (مؤسس، عادي، فخري، داعم)',
        'المادة 4: حقوق الأعضاء وواجباتهم',
        'المادة 5: الجمعية العمومية واختصاصاتها',
        'المادة 6: مجلس الإدارة وصلاحياته',

        'المادة 8: الموارد المالية للجمعية',
        'المادة 9: الحل والدمج والتصفية',
      ],
      articles_en: [
        'Article 1: Name, headquarters, and service scope',
        'Article 2: Objectives and means of achievement',
        'Article 3: Membership conditions and types (Founding, Regular, Honorary)',
        'Article 4: Members\' rights and duties',
        'Article 5: General Assembly and its responsibilities',
        'Article 6: Board of Directors and its powers',

        'Article 8: Financial resources',
        'Article 9: Dissolution, merger, and liquidation',
      ],
    },
    {
      id: 'financial',
      icon: FaMoneyBillWave,
      color: '#0E4B33',
      title_ar: 'اللائحة المالية',
      title_en: 'Financial Regulation',
      desc_ar: 'تنظم الشؤون المالية للجمعية بما يشمل إعداد الميزانيات والمصروفات والإيرادات والرقابة المالية وإجراءات الصرف والتحصيل.',
      desc_en: 'Regulates the financial affairs including budget preparation, expenditures, revenues, financial oversight, and disbursement procedures.',
      pdf: '/docs/Financial-Regulation.pdf',
      articles_ar: [
        'إعداد واعتماد الميزانية السنوية',
        'إجراءات الصرف والتحصيل والتوقيع',
        'الرقابة المالية الداخلية والخارجية',
        'تنظيم التبرعات والهبات والأوقاف',
        'إعداد القوائم المالية والتقارير الدورية',
        'سياسات الاستثمار وتنمية الموارد',
      ],
      articles_en: [
        'Annual budget preparation and approval',
        'Disbursement, collection, and signature procedures',
        'Internal and external financial oversight',
        'Regulation of donations, grants, and endowments',
        'Financial statements and periodic reports',
        'Investment and resource development policies',
      ],
    },
    {
      id: 'hr',
      icon: FaUsersCog,
      color: '#2563eb',
      title_ar: 'لائحة الموارد البشرية',
      title_en: 'Human Resources Regulation',
      desc_ar: 'تنظم شؤون الموظفين والمتطوعين بما يشمل التوظيف والتدريب والتقييم والحقوق والواجبات وفقاً لنظام العمل السعودي.',
      desc_en: 'Regulates employee and volunteer affairs including recruitment, training, evaluation, rights, and duties according to Saudi labor law.',
      pdf: '/docs/HR-Regulation.pdf',
      articles_ar: [
        'إجراءات التوظيف والاختيار',
        'الرواتب والبدلات والمكافآت',
        'التدريب والتطوير المهني',
        'تقييم الأداء الوظيفي',
        'الإجازات والغياب',
        'إدارة المتطوعين وتأهيلهم',
        'إنهاء الخدمة والاستقالة',
      ],
      articles_en: [
        'Recruitment and selection procedures',
        'Salaries, allowances, and bonuses',
        'Training and professional development',
        'Job performance evaluation',
        'Leave and absence management',
        'Volunteer management and qualification',
        'Termination and resignation',
      ],
    },
    {
      id: 'procurement',
      icon: FaShoppingCart,
      color: '#7c3aed',
      title_ar: 'لائحة المشتريات',
      title_en: 'Procurement Regulation',
      desc_ar: 'تنظم عمليات الشراء والتعاقد والمناقصات لضمان الشفافية والكفاءة في استخدام موارد الجمعية.',
      desc_en: 'Regulates purchasing, contracting, and tendering processes to ensure transparency and efficiency in resource utilization.',
      pdf: '/docs/Procurement-Regulation.pdf',
      articles_ar: [
        'صلاحيات الشراء والاعتماد',
        'إجراءات طلب العروض والمناقصات',
        'تقييم واختيار الموردين',
        'العقود والاتفاقيات',
        'استلام وفحص المشتريات',
        'إدارة المخزون والأصول',
      ],
      articles_en: [
        'Purchase authority and approval limits',
        'Request for proposals and tendering procedures',
        'Supplier evaluation and selection',
        'Contracts and agreements',
        'Receiving and inspecting purchases',
        'Inventory and asset management',
      ],
    },
    {
      id: 'executive',
      icon: FaUserTie,
      color: '#059669',
      title_ar: 'لائحة الإدارة التنفيذية',
      title_en: 'Executive Management Regulation',
      desc_ar: 'تحدد صلاحيات ومسؤوليات المدير التنفيذي والجهاز التنفيذي وآليات التنسيق مع مجلس الإدارة.',
      desc_en: 'Defines the powers and responsibilities of the Executive Director and executive team, and coordination mechanisms with the Board.',
      pdf: '/docs/Executive-Management-Regulation.pdf',
      articles_ar: [
        'صلاحيات ومهام المدير التنفيذي',
        'العلاقة بين الجهاز التنفيذي ومجلس الإدارة',
        'آليات رفع التقارير والمتابعة',
        'تفويض الصلاحيات',
        'إدارة المخاطر التشغيلية',
        'معايير الأداء والمؤشرات',
      ],
      articles_en: [
        'Executive Director powers and duties',
        'Relationship between executive team and Board',
        'Reporting and follow-up mechanisms',
        'Delegation of authority',
        'Operational risk management',
        'Performance standards and KPIs',
      ],
    },
    {
      id: 'authorities',
      icon: FaSitemap,
      color: '#1f2937',
      title_ar: 'مصفوفة الصلاحيات',
      title_en: 'Authorities Matrix',
      desc_ar: 'توضح توزيع الصلاحيات الإدارية والمالية والتشغيلية بين الجمعية العمومية، مجلس الإدارة، والمدير التنفيذي لضمان الحوكمة وتجنب تداخل المهام.',
      desc_en: 'Clarifies the distribution of administrative, financial, and operational authorities among the General Assembly, Board of Directors, and Executive Director to ensure governance and prevent task overlap.',
      pdf: '/docs/Authorities-Matrix.pdf',
      articles_ar: [
        'تحديد صلاحيات الاعتماد المالي وفق مستويات متدرجة',
        'فصل السلطات وتجنب مركزية القرار',
        'توضيح المهام التشغيلية للمدير التنفيذي',
        'حصر القرارات الاستراتيجية بمجلس الإدارة',
        'تفويض الصلاحيات بشكل رسمي ومكتوب',
        'تحديث المصفوفة بشكل دوري يتناسب مع حجم الجمعية',
      ],
      articles_en: [
        'Defining financial approval authorities according to graded levels',
        'Separation of powers and avoiding decision centralization',
        'Clarifying operational tasks for the Executive Director',
        'Restricting strategic decisions to the Board of Directors',
        'Formal and written delegation of authorities',
        'Periodically updating the matrix to suit the association\'s size',
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

          <div className="space-y-6 max-w-4xl mx-auto">
            {regulations.map((reg) => {
              const Icon = reg.icon
              const isExpanded = expandedReg === reg.id
              const articles = isAr ? reg.articles_ar : reg.articles_en
              return (
                <div key={reg.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                  <div 
                    className="p-6 flex items-center gap-4 cursor-pointer"
                    onClick={() => setExpandedReg(isExpanded ? null : reg.id)}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${reg.color}15` }}>
                      <Icon size={28} style={{ color: reg.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold" style={{ color: reg.color }}>
                        {isAr ? reg.title_ar : reg.title_en}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {isAr ? reg.desc_ar : reg.desc_en}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-gray-400">
                        {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-[#0E4B33] mb-4 flex items-center gap-2">
                        <FaFileContract size={16} className="text-[#C89B3C]" />
                        {t.articles}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {articles.map((article, i) => (
                          <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                            <FaCheckCircle size={14} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{article}</p>
                          </div>
                        ))}
                      </div>
                      {reg.pdf && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <a href={reg.pdf} target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:shadow-lg" style={{ backgroundColor: reg.color }}>
                            <FaDownload size={18} />
                            {t.download}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Regulations
