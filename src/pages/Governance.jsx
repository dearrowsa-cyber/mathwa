import React, { useState, useMemo } from 'react'
import { Section, Container } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { 
  FaFileAlt, 
  FaDownload, 
  FaSearch, 
  FaFilter, 
  FaGavel, 
  FaShieldAlt, 
  FaMoneyBillWave, 
  FaUserShield, 
  FaHandsHelping, 
  FaCheckCircle,
  FaEye,
  FaFilePdf
} from 'react-icons/fa'

const Governance = () => {
  const lang = localStorage.getItem('language') || 'ar'
  const isAr = lang === 'ar'

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const t = {
    en: {
      title: 'Governance, Regulations & Policies',
      subtitle: 'Committed to full transparency, compliance, and regulatory governance under Saudi Ministry regulations',
      home: 'Home',
      governance: 'Governance',
      search_placeholder: 'Search for regulation or policy name...',
      all_categories: 'All Documents',
      cat_basic: 'Basic Regulations',
      cat_financial: 'Financial & HR',
      cat_policies: 'Policies & Disclosure',
      cat_compliance: 'Compliance & AML',
      cat_services: 'Services & Beneficiaries',
      col_num: '#',
      col_title: 'Document Title',
      col_category: 'Category',
      col_version: 'Status / License',
      col_action: 'Download / View',
      download: 'Download PDF',
      view: 'View',
      no_results: 'No matching regulations or policies found.',
      official_badge: 'License No: 1000827300',
      total_docs: 'Total Approved Documents'
    },
    ar: {
      title: 'الحوكمة واللوائح والسياسات',
      subtitle: 'الإطار التنظيمي الشامل واللوائح المعتمدة لجمعية مثوى الأهلية لضمان الشفافية والامتثال المؤسسي',
      home: 'الرئيسية',
      governance: 'الحوكمة',
      search_placeholder: 'ابحث عن اسم اللائحة أو السياسة...',
      all_categories: 'جميع الوثائق والسياسات',
      cat_basic: 'اللوائح الأساسية والترخيص',
      cat_financial: 'اللوائح المالية والإدارية',
      cat_policies: 'سياسات الحوكمة والإفصاح',
      cat_compliance: 'الامتثال ومكافحة غسل الأموال',
      cat_services: 'خدمات المستفيدين والتطوع',
      col_num: 'م',
      col_title: 'اسم اللائحة / السياسة المنظمة',
      col_category: 'التصنيف',
      col_version: 'حالة الاعتماد والترخيص',
      col_action: 'تحميل الوثيقة المعتمدة',
      download: 'تحميل PDF',
      view: 'معاينة',
      no_results: 'لم يتم العثور على لوائح أو سياسات تطابق بحثك.',
      official_badge: 'ترخيص رقم: 1000827300',
      total_docs: 'إجمالي الوثائق واللوائح المعتمدة'
    }
  }[lang]

  // Master list of all updated regulations and policies
  const documentsData = [
    // 1. اللوائح الأساسية والترخيص
    {
      id: 1,
      title_ar: 'اللائحة الأساسية الحالية لجمعية مثوى الأهلية',
      title_en: 'Current Basic Regulations of Mathwaa Association',
      category: 'basic',
      category_label_ar: 'اللوائح الأساسية والترخيص',
      category_label_en: 'Basic Regulations',
      file: '/docs/Basic-Standards-Current.pdf',
      version_ar: 'معتمدة - 1446هـ / 2026م',
      version_en: 'Approved 2026',
      badge_color: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 2,
      title_ar: 'معلومات شهادة الترخيص الرسمية (رقم 1000827300)',
      title_en: 'Official Registration Certificate Info (License 1000827300)',
      category: 'basic',
      category_label_ar: 'اللوائح الأساسية والترخيص',
      category_label_en: 'Basic Regulations',
      file: '/docs/Registration-Certificate-Info.pdf',
      version_ar: 'ترخيص رقم 1000827300',
      version_en: 'License #1000827300',
      badge_color: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 3,
      title_ar: 'قرار تسجيل وتأسيس الجمعية',
      title_en: 'Association Registration & Establishment Decision',
      category: 'basic',
      category_label_ar: 'اللوائح الأساسية والترخيص',
      category_label_en: 'Basic Regulations',
      file: '/docs/Registration-Decision.pdf',
      version_ar: 'قرار رسمي معتمد',
      version_en: 'Official Decision',
      badge_color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      title_ar: 'قرار تشكيل مجلس الإدارة الدورة الحالية',
      title_en: 'Board of Directors Establishment Decision',
      category: 'basic',
      category_label_ar: 'اللوائح الأساسية والترخيص',
      category_label_en: 'Basic Regulations',
      file: '/docs/Board-Creation-Decision.pdf',
      version_ar: 'قرار معتمد',
      version_en: 'Approved Decision',
      badge_color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 5,
      title_ar: 'قواعد ومعايير الحوكمة والشفافية',
      title_en: 'Governance & Transparency Rules',
      category: 'basic',
      category_label_ar: 'اللوائح الأساسية والترخيص',
      category_label_en: 'Basic Regulations',
      file: '/docs/Governance-Rules.pdf',
      version_ar: 'معتمدة - 2025/2026',
      version_en: 'Approved Rules',
      badge_color: 'bg-emerald-100 text-emerald-800'
    },

    // 2. اللوائح المالية والإدارية
    {
      id: 6,
      title_ar: 'اللائحة المالية ودليل الإجراءات المحاسبية',
      title_en: 'Financial Regulation & Accounting Manual',
      category: 'financial',
      category_label_ar: 'اللوائح المالية والإدارية',
      category_label_en: 'Financial & HR',
      file: '/docs/Financial-Regulation.pdf',
      version_ar: 'اصدار معتمد',
      version_en: 'Approved Manual',
      badge_color: 'bg-[#C89B3C]/20 text-[#0E4B33]'
    },
    {
      id: 7,
      title_ar: 'لائحة الموارد البشرية وإدارة رأس المال البشري',
      title_en: 'Human Resources Regulation',
      category: 'financial',
      category_label_ar: 'اللوائح المالية والإدارية',
      category_label_en: 'Financial & HR',
      file: '/docs/HR-Regulation.pdf',
      version_ar: 'اصدار معتمد',
      version_en: 'Approved HR Regulation',
      badge_color: 'bg-[#C89B3C]/20 text-[#0E4B33]'
    },
    {
      id: 8,
      title_ar: 'لائحة المشتريات والتعاقدات والسلسلة التوريدية',
      title_en: 'Procurement & Contracting Regulation',
      category: 'financial',
      category_label_ar: 'اللوائح المالية والإدارية',
      category_label_en: 'Financial & HR',
      file: '/docs/Procurement-Regulation.pdf',
      version_ar: 'اصدار معتمد',
      version_en: 'Approved Regulation',
      badge_color: 'bg-[#C89B3C]/20 text-[#0E4B33]'
    },
    {
      id: 9,
      title_ar: 'لائحة الإدارة التنفيذية ومصفوفة الصلاحيات',
      title_en: 'Executive Management & Authorities Matrix',
      category: 'financial',
      category_label_ar: 'اللوائح المالية والإدارية',
      category_label_en: 'Financial & HR',
      file: '/docs/Executive-Management-Regulation.pdf',
      version_ar: 'مصفوفة معتمدة',
      version_en: 'Approved Matrix',
      badge_color: 'bg-[#C89B3C]/20 text-[#0E4B33]'
    },
    {
      id: 10,
      title_ar: 'آلية تحديد سلم رواتب المدير التنفيذي والموظفين القياديين',
      title_en: 'Executive Salary Scale Determination Mechanism',
      category: 'financial',
      category_label_ar: 'اللوائح المالية والإدارية',
      category_label_en: 'Financial & HR',
      file: '/docs/Executive-Salary-Scale-Mechanism.pdf',
      version_ar: 'آلية معتمدة',
      version_en: 'Approved Mechanism',
      badge_color: 'bg-purple-100 text-purple-800'
    },

    // 3. سياسات الحوكمة والإفصاح
    {
      id: 11,
      title_ar: 'سياسة تعارض المصالح وأخلاقيات العمل',
      title_en: 'Conflict of Interest Policy',
      category: 'policies',
      category_label_ar: 'سياسات الحوكمة والإفصاح',
      category_label_en: 'Policies & Disclosure',
      file: '/docs/Conflict-of-Interest-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 12,
      title_ar: 'سياسة الإفصاح والشفافية والنشر',
      title_en: 'Disclosure & Transparency Policy',
      category: 'policies',
      category_label_ar: 'سياسات الحوكمة والإفصاح',
      category_label_en: 'Policies & Disclosure',
      file: '/docs/Disclosure-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 13,
      title_ar: 'سياسة خصوصية وحماية بيانات المتبرعين والمستفيدين',
      title_en: 'Data Privacy & Protection Policy',
      category: 'policies',
      category_label_ar: 'سياسات الحوكمة والإفصاح',
      category_label_en: 'Policies & Disclosure',
      file: '/docs/Privacy-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 14,
      title_ar: 'سياسة الإبلاغ عن المخالفات وحماية مقدمي البلاغات (Whistleblowing)',
      title_en: 'Whistleblowing & Reporting Protection Policy',
      category: 'policies',
      category_label_ar: 'سياسات الحوكمة والإفصاح',
      category_label_en: 'Policies & Disclosure',
      file: '/docs/Whistleblowing-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 15,
      title_ar: 'سياسة الاحتفاظ بالوثائق السجلات وإتلافها',
      title_en: 'Document Retention & Destruction Policy',
      category: 'policies',
      category_label_ar: 'سياسات الحوكمة والإفصاح',
      category_label_en: 'Policies & Disclosure',
      file: '/docs/Document-Retention-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-indigo-100 text-indigo-800'
    },

    // 4. الامتثال ومكافحة غسل الأموال
    {
      id: 16,
      title_ar: 'سياسة ومكافحة غسل الأموال وجرائم تمويل الإرهاب',
      title_en: 'Anti-Money Laundering & Counter-Terrorism Financing Policy (AML/CFT)',
      category: 'compliance',
      category_label_ar: 'الامتثال ومكافحة غسل الأموال',
      category_label_en: 'Compliance & AML',
      file: '/docs/AML-CFT-Policy.pdf',
      version_ar: 'معتمدة حسب الأنظمة',
      version_en: 'Approved Regulation',
      badge_color: 'bg-red-100 text-red-800'
    },
    {
      id: 17,
      title_ar: 'دليل مؤشرات الاشتباه في عمليات غسل الأموال وتمويل الإرهاب',
      title_en: 'Suspicion Indicators Guide for AML/CFT',
      category: 'compliance',
      category_label_ar: 'الامتثال ومكافحة غسل الأموال',
      category_label_en: 'Compliance & AML',
      file: '/docs/AML-CFT-Suspicion-Indicators-Guide.pdf',
      version_ar: 'دليل إجرائي معتمد',
      version_en: 'Approved Guide',
      badge_color: 'bg-red-100 text-red-800'
    },
    {
      id: 18,
      title_ar: 'سياسة تقييم وإدارة المخاطر والحد منها',
      title_en: 'Risk Assessment & Management Policy',
      category: 'compliance',
      category_label_ar: 'الامتثال ومكافحة غسل الأموال',
      category_label_en: 'Compliance & AML',
      file: '/docs/Risk-Management-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-amber-100 text-amber-800'
    },
    {
      id: 19,
      title_ar: 'سياسة الاستثمار وتنمية الموارد المالية للجمعية',
      title_en: 'Investment & Financial Development Policy',
      category: 'compliance',
      category_label_ar: 'الامتثال ومكافحة غسل الأموال',
      category_label_en: 'Compliance & AML',
      file: '/docs/Investment-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-amber-100 text-amber-800'
    },

    // 5. خدمات المستفيدين والتطوع
    {
      id: 20,
      title_ar: 'سياسة جمع التبرعات وإدارة المقبوضات المالية',
      title_en: 'Fundraising & Receipt Management Policy',
      category: 'services',
      category_label_ar: 'خدمات المستفيدين والتطوع',
      category_label_en: 'Services & Beneficiaries',
      file: '/docs/Fundraising-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-teal-100 text-teal-800'
    },
    {
      id: 21,
      title_ar: 'سياسة الاستبدال والاسترجاع الخاصة بالتبرعات',
      title_en: 'Donation Refund & Exchange Policy',
      category: 'services',
      category_label_ar: 'خدمات المستفيدين والتطوع',
      category_label_en: 'Services & Beneficiaries',
      file: '/docs/Donation-Refund-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-teal-100 text-teal-800'
    },
    {
      id: 22,
      title_ar: 'سياسة توجيه التبرعات وصرف البرامج والأنشطة',
      title_en: 'Redirecting Donations & Program Spending Policy',
      category: 'services',
      category_label_ar: 'خدمات المستفيدين والتطوع',
      category_label_en: 'Services & Beneficiaries',
      file: '/docs/Redirecting-Donations-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-teal-100 text-teal-800'
    },
    {
      id: 23,
      title_ar: 'آلية التأكد من استحقاق المستفيدين للخدمات',
      title_en: 'Beneficiary Eligibility Verification Mechanism',
      category: 'services',
      category_label_ar: 'خدمات المستفيدين والتطوع',
      category_label_en: 'Services & Beneficiaries',
      file: '/docs/Beneficiary-Eligibility-Verification.pdf',
      version_ar: 'آلية معتمدة',
      version_en: 'Approved Mechanism',
      badge_color: 'bg-teal-100 text-teal-800'
    },
    {
      id: 24,
      title_ar: 'سياسة التطوع وإدارة العمل التطوعي',
      title_en: 'Volunteering & Volunteer Management Policy',
      category: 'services',
      category_label_ar: 'خدمات المستفيدين والتطوع',
      category_label_en: 'Services & Beneficiaries',
      file: '/docs/Volunteering-Policy.pdf',
      version_ar: 'سياسة معتمدة',
      version_en: 'Approved Policy',
      badge_color: 'bg-teal-100 text-teal-800'
    }
  ]

  // Filtered documents based on category and search query
  const filteredDocuments = useMemo(() => {
    return documentsData.filter(doc => {
      const matchCat = selectedCategory === 'all' || doc.category === selectedCategory
      const title = isAr ? doc.title_ar : doc.title_en
      const matchSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchTerm, isAr])

  const categories = [
    { id: 'all', label: t.all_categories, icon: FaFileAlt, count: documentsData.length },
    { id: 'basic', label: t.cat_basic, icon: FaGavel, count: documentsData.filter(d => d.category === 'basic').length },
    { id: 'financial', label: t.cat_financial, icon: FaMoneyBillWave, count: documentsData.filter(d => d.category === 'financial').length },
    { id: 'policies', label: t.cat_policies, icon: FaShieldAlt, count: documentsData.filter(d => d.category === 'policies').length },
    { id: 'compliance', label: t.cat_compliance, icon: FaUserShield, count: documentsData.filter(d => d.category === 'compliance').length },
    { id: 'services', label: t.cat_services, icon: FaHandsHelping, count: documentsData.filter(d => d.category === 'services').length }
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      
      <Section className="bg-gray-50/50 py-12">
        <Container>

          {/* Top Info Banner */}
          <div className="bg-gradient-to-r from-[#0E4B33] to-[#166948] rounded-3xl p-6 md:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#C89B3C] text-xs font-bold">
                  <FaCheckCircle className="text-[#C89B3C]" />
                  <span>{t.official_badge}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold">{t.title}</h2>
                <p className="text-gray-200 text-sm md:text-base max-w-2xl">
                  تلتزم جمعية مثوى الأهلية بأعلى معايير الشفافية والحوكمة والامتثال للأنظمة واللوائح الصادرة عن وزارة الموارد البشرية والتنمية الاجتماعية.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[200px]">
                <div className="p-3 bg-[#C89B3C] rounded-xl text-white">
                  <FaFilePdf size={28} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#C89B3C]">{documentsData.length}</div>
                  <div className="text-xs text-gray-200">{t.total_docs}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <FaSearch className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isAr ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  placeholder={t.search_placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#0E4B33] focus:bg-white transition-all ${
                    isAr ? 'pr-11 pl-4' : 'pl-11 pr-4'
                  }`}
                />
              </div>

              {/* Filter Count Indicator */}
              <div className="text-sm font-semibold text-gray-500">
                عرض <span className="text-[#0E4B33] font-bold">{filteredDocuments.length}</span> من أصل <span className="font-bold">{documentsData.length}</span> وثيقة
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0E4B33] text-white shadow-md shadow-[#0E4B33]/20'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    <Icon className={isActive ? 'text-[#C89B3C]' : 'text-gray-400'} />
                    <span>{cat.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Master Regulations & Policies Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredDocuments.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FaFileAlt size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="font-bold text-lg">{t.no_results}</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-[#0E4B33] text-white rounded-xl text-xs font-bold hover:opacity-90 transition"
                >
                  إعادة ضبط البحث والتصفية
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-[#0E4B33] text-white text-xs md:text-sm font-bold">
                      <th className="py-4 px-4 text-center w-12">{t.col_num}</th>
                      <th className="py-4 px-6">{t.col_title}</th>
                      <th className="py-4 px-6">{t.col_category}</th>
                      <th className="py-4 px-6">{t.col_version}</th>
                      <th className="py-4 px-6 text-center w-48">{t.col_action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredDocuments.map((doc, idx) => (
                      <tr 
                        key={doc.id} 
                        className="hover:bg-gray-50/80 transition-colors duration-150 group"
                      >
                        {/* Number */}
                        <td className="py-4 px-4 text-center font-bold text-gray-400 group-hover:text-[#0E4B33]">
                          {idx + 1}
                        </td>

                        {/* Title */}
                        <td className="py-4 px-6 font-extrabold text-[#0E4B33]">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-red-50 text-red-600 flex-shrink-0">
                              <FaFilePdf size={18} />
                            </div>
                            <span className="leading-snug">
                              {isAr ? doc.title_ar : doc.title_en}
                            </span>
                          </div>
                        </td>

                        {/* Category Label */}
                        <td className="py-4 px-6 text-gray-600 font-semibold text-xs whitespace-nowrap">
                          <span className="inline-block px-3 py-1 rounded-xl bg-gray-100 border border-gray-200">
                            {isAr ? doc.category_label_ar : doc.category_label_en}
                          </span>
                        </td>

                        {/* Status / License Badge */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${doc.badge_color}`}>
                            <FaCheckCircle size={12} />
                            <span>{isAr ? doc.version_ar : doc.version_en}</span>
                          </span>
                        </td>

                        {/* Action Buttons (View / Download PDF) */}
                        <td className="py-4 px-6 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={doc.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-[#0E4B33] text-gray-700 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all duration-200 shadow-sm"
                              title={t.view}
                            >
                              <FaEye size={14} />
                              <span>{t.view}</span>
                            </a>
                            
                            <a
                              href={doc.file}
                              download
                              className="px-4 py-2 rounded-xl bg-[#C89B3C] hover:bg-[#b08732] text-white font-bold text-xs flex items-center gap-1.5 transition-all duration-200 shadow-sm shadow-[#C89B3C]/20 hover:scale-105"
                              title={t.download}
                            >
                              <FaDownload size={13} />
                              <span>{t.download}</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 rounded-3xl text-center text-white bg-gradient-to-r from-[#0E4B33] to-[#166948] shadow-lg">
            <h3 className="text-xl font-bold mb-2">هل لديك استفسار حول اللوائح والسياسات؟</h3>
            <p className="mb-6 opacity-90 text-sm max-w-xl mx-auto">
              فريق الحوكمة والامتثال في جمعية مثوى الأهلية يسعد بتقديم الإيضاحات والإجابة على كافة تساؤلاتكم.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#C89B3C] hover:bg-[#b08732] text-white transition-all shadow-md">
              تواصل مع فريق الحوكمة والامتثال
            </Link>
          </div>

        </Container>
      </Section>
    </>
  )
}

export default Governance
