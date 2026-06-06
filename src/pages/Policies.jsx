import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaBalanceScale, FaBullhorn, FaUserShield, FaHandHoldingHeart, FaExclamationTriangle, FaArchive, FaUsers, FaChevronDown, FaChevronUp, FaCheckCircle, FaShieldAlt } from 'react-icons/fa'

const Policies = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar')
  const [expandedPolicy, setExpandedPolicy] = useState(null)
  const isAr = language === 'ar'

  const t = {
    en: {
      title: 'Policies',
      subtitle: 'Organizational policies governing the operations and ethics of Mathwaa Charitable Association.',
      home: 'Home',
      governance: 'Governance & Disclosure',
      intro: 'Mathwaa Charitable Association (License No. 1000827300) has developed and approved a comprehensive set of organizational policies during the founding phase, ensuring institutional integrity, transparency, and compliance with the regulations of the Ministry of Human Resources and Social Development.',
      key_provisions: 'Key Provisions',
      approved: 'Approved & Active',
    },
    ar: {
      title: 'السياسات',
      subtitle: 'السياسات التنظيمية التي تحكم عمليات وأخلاقيات جمعية مثوى الأهلية.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      intro: 'قامت جمعية مثوى الأهلية (رقم ترخيص 1000827300) بإعداد واعتماد مجموعة شاملة من السياسات التنظيمية خلال مرحلة التأسيس، لضمان النزاهة المؤسسية والشفافية والامتثال لأنظمة وزارة الموارد البشرية والتنمية الاجتماعية.',
      key_provisions: 'أبرز الأحكام',
      approved: 'معتمدة وفعّالة',
    },
  }[language]

  const policies = [
    {
      id: 'conflict',
      icon: FaBalanceScale,
      color: '#C89B3C',
      title_ar: 'سياسة تعارض المصالح',
      title_en: 'Conflict of Interest Policy',
      desc_ar: 'تهدف إلى منع أي تعارض بين المصالح الشخصية لأعضاء مجلس الإدارة والعاملين وبين مصالح الجمعية، وضمان اتخاذ القرارات بنزاهة وشفافية.',
      desc_en: 'Aims to prevent any conflict between personal interests of board members and employees and the interests of the association, ensuring decisions are made with integrity and transparency.',
      provisions_ar: [
        'الإفصاح عن أي مصلحة شخصية مباشرة أو غير مباشرة',
        'الامتناع عن التصويت في حالة وجود تعارض',
        'حظر استغلال المنصب لتحقيق مكاسب شخصية',
        'تسجيل حالات التعارض في سجل خاص',
        'إبلاغ لجنة المراجعة الداخلية عن أي حالات تعارض',
        'المراجعة الدورية لسجلات تعارض المصالح',
      ],
      provisions_en: [
        'Disclosure of any direct or indirect personal interest',
        'Abstaining from voting in cases of conflict',
        'Prohibition of using position for personal gain',
        'Recording conflict cases in a dedicated register',
        'Reporting any conflict cases to the Internal Audit Committee',
        'Periodic review of conflict of interest records',
      ],
    },
    {
      id: 'whistleblowing',
      icon: FaBullhorn,
      color: '#dc2626',
      title_ar: 'سياسة الإبلاغ عن المخالفات',
      title_en: 'Whistleblowing Policy',
      desc_ar: 'توفر آلية آمنة وسرية للإبلاغ عن أي مخالفات أو سلوكيات غير أخلاقية داخل الجمعية، مع حماية المبلغين من أي انتقام.',
      desc_en: 'Provides a safe and confidential mechanism for reporting violations or unethical behavior within the association, with protection for whistleblowers from retaliation.',
      provisions_ar: [
        'قنوات إبلاغ سرية ومتعددة',
        'حماية المُبلّغ من أي شكل من أشكال الانتقام',
        'التحقيق في جميع البلاغات بسرية تامة',
        'إجراءات تأديبية صارمة ضد المخالفين',
        'متابعة وتوثيق جميع حالات البلاغ',
        'تقارير دورية لمجلس الإدارة عن حالات المخالفات',
      ],
      provisions_en: [
        'Multiple confidential reporting channels',
        'Protection of whistleblowers from any form of retaliation',
        'Confidential investigation of all reports',
        'Strict disciplinary actions against violators',
        'Follow-up and documentation of all reported cases',
        'Periodic reports to the Board about violation cases',
      ],
    },
    {
      id: 'privacy',
      icon: FaUserShield,
      color: '#0E4B33',
      title_ar: 'سياسة الخصوصية وحماية البيانات',
      title_en: 'Privacy & Data Protection Policy',
      desc_ar: 'تحمي خصوصية البيانات الشخصية للمستفيدين والمتبرعين والعاملين والمتطوعين وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.',
      desc_en: 'Protects the privacy of personal data of beneficiaries, donors, employees, and volunteers in accordance with the Saudi Personal Data Protection Law.',
      provisions_ar: [
        'جمع البيانات الشخصية بموافقة صريحة من أصحابها',
        'تخزين البيانات بشكل آمن ومشفّر',
        'عدم مشاركة البيانات مع أطراف ثالثة دون إذن',
        'حق الأفراد في الوصول لبياناتهم وتعديلها وحذفها',
        'تعيين مسؤول حماية البيانات',
        'إجراءات الاستجابة لانتهاكات البيانات',
      ],
      provisions_en: [
        'Collection of personal data with explicit consent',
        'Secure and encrypted data storage',
        'No sharing of data with third parties without permission',
        'Right of individuals to access, modify, and delete their data',
        'Appointment of a Data Protection Officer',
        'Data breach response procedures',
      ],
    },
    {
      id: 'fundraising',
      icon: FaHandHoldingHeart,
      color: '#7c3aed',
      title_ar: 'سياسة جمع التبرعات',
      title_en: 'Fundraising Policy',
      desc_ar: 'تنظم عمليات جمع التبرعات والهبات والأوقاف لضمان الشفافية والامتثال للأنظمة واللوائح المعمول بها.',
      desc_en: 'Regulates donation collection, grants, and endowments to ensure transparency and compliance with applicable laws and regulations.',
      provisions_ar: [
        'الحصول على التراخيص اللازمة لجمع التبرعات',
        'الشفافية في عرض أوجه الصرف للمتبرعين',
        'إصدار إيصالات لجميع التبرعات',
        'فصل حسابات التبرعات عن الحسابات التشغيلية',
        'احترام رغبات المتبرعين في تخصيص تبرعاتهم',
        'تقارير دورية للمتبرعين عن أثر تبرعاتهم',
      ],
      provisions_en: [
        'Obtaining necessary licenses for fundraising',
        'Transparency in presenting donation expenditure to donors',
        'Issuing receipts for all donations',
        'Separating donation accounts from operational accounts',
        'Respecting donors\' wishes in allocating their donations',
        'Periodic reports to donors about the impact of their donations',
      ],
    },
    {
      id: 'risk',
      icon: FaExclamationTriangle,
      color: '#ea580c',
      title_ar: 'سياسة إدارة المخاطر',
      title_en: 'Risk Management Policy',
      desc_ar: 'تحدد إطار العمل لتحديد وتقييم وإدارة المخاطر التي قد تواجه الجمعية لضمان استمرارية العمل وحماية الأصول.',
      desc_en: 'Defines the framework for identifying, assessing, and managing risks that may face the association to ensure business continuity and asset protection.',
      provisions_ar: [
        'تصنيف المخاطر (مالية، تشغيلية، قانونية، سمعة)',
        'تقييم المخاطر حسب الاحتمالية والأثر',
        'خطط الاستجابة والتخفيف لكل فئة مخاطر',
        'المراجعة الدورية لسجل المخاطر',
        'تدريب العاملين على إدارة المخاطر',
        'تقارير المخاطر الدورية لمجلس الإدارة',
      ],
      provisions_en: [
        'Risk classification (financial, operational, legal, reputational)',
        'Risk assessment by probability and impact',
        'Response and mitigation plans for each risk category',
        'Periodic review of the risk register',
        'Employee training on risk management',
        'Periodic risk reports to the Board',
      ],
    },
    {
      id: 'retention',
      icon: FaArchive,
      color: '#0284c7',
      title_ar: 'سياسة الاحتفاظ بالوثائق',
      title_en: 'Document Retention Policy',
      desc_ar: 'تنظم آليات حفظ وأرشفة وإتلاف الوثائق والسجلات الرسمية للجمعية وفقاً للمتطلبات النظامية.',
      desc_en: 'Regulates mechanisms for preserving, archiving, and disposing of official documents and records according to regulatory requirements.',
      provisions_ar: [
        'تصنيف الوثائق حسب مستوى السرية والأهمية',
        'فترات الاحتفاظ المحددة لكل نوع من الوثائق',
        'إجراءات الأرشفة الإلكترونية والورقية',
        'صلاحيات الوصول للوثائق السرية',
        'إجراءات الإتلاف الآمن للوثائق المنتهية',
        'خطط النسخ الاحتياطي والاستعادة',
      ],
      provisions_en: [
        'Document classification by confidentiality and importance level',
        'Defined retention periods for each document type',
        'Electronic and paper archiving procedures',
        'Access permissions for confidential documents',
        'Secure disposal procedures for expired documents',
        'Backup and recovery plans',
      ],
    },
    {
      id: 'beneficiaries',
      icon: FaUsers,
      color: '#059669',
      title_ar: 'سياسة العلاقة مع المستفيدين',
      title_en: 'Beneficiary Relations Policy',
      desc_ar: 'تحدد إطار التعامل مع المستفيدين من خدمات الجمعية بما يضمن الكرامة والعدالة والشمولية في تقديم الخدمات.',
      desc_en: 'Defines the framework for dealing with beneficiaries ensuring dignity, fairness, and inclusivity in service delivery.',
      provisions_ar: [
        'معايير واضحة وعادلة لأهلية الاستفادة',
        'احترام كرامة المستفيدين وخصوصيتهم',
        'آلية تلقي الشكاوى والاقتراحات من المستفيدين',
        'قياس رضا المستفيدين بشكل دوري',
        'التحسين المستمر للخدمات بناءً على التغذية الراجعة',
        'ضمان عدم التمييز في تقديم الخدمات',
      ],
      provisions_en: [
        'Clear and fair eligibility criteria for services',
        'Respect for beneficiary dignity and privacy',
        'Mechanism for receiving complaints and suggestions',
        'Periodic beneficiary satisfaction measurement',
        'Continuous service improvement based on feedback',
        'Ensuring non-discrimination in service delivery',
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
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-4 text-lg leading-relaxed">{t.intro}</p>
          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-200">
              <FaShieldAlt /> {t.approved} — {policies.length} {isAr ? 'سياسات' : 'policies'}
            </span>
          </div>

          <div className="space-y-5 max-w-4xl mx-auto">
            {policies.map((policy) => {
              const Icon = policy.icon
              const isExpanded = expandedPolicy === policy.id
              const provisions = isAr ? policy.provisions_ar : policy.provisions_en
              return (
                <div key={policy.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                  <div
                    className="p-6 flex items-center gap-4 cursor-pointer"
                    onClick={() => setExpandedPolicy(isExpanded ? null : policy.id)}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${policy.color}15` }}>
                      <Icon size={26} style={{ color: policy.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ color: policy.color }}>
                        {isAr ? policy.title_ar : policy.title_en}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {isAr ? policy.desc_ar : policy.desc_en}
                      </p>
                    </div>
                    <span className="text-gray-400 flex-shrink-0">
                      {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      <h4 className="font-bold text-[#0E4B33] mb-4 text-sm">{t.key_provisions}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {provisions.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                            <FaCheckCircle size={14} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
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

export default Policies
