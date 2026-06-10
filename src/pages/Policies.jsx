import React, { useState } from 'react'
import { Container, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaBalanceScale, FaBullhorn, FaUserShield, FaHandHoldingHeart, FaExclamationTriangle, FaArchive, FaUsers, FaChevronDown, FaChevronUp, FaCheckCircle, FaShieldAlt, FaMoneyBillWave, FaIdCard, FaHandsHelping, FaUndo, FaExchangeAlt, FaChartLine, FaSitemap, FaSearchDollar } from 'react-icons/fa'

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
      pdf: '/docs/Conflict-of-Interest-Policy.pdf',
      provisions_ar: [
        'الإفصاح عن أي مصلحة شخصية مباشرة أو غير مباشرة',
        'الامتناع عن التصويت في حالة وجود تعارض',
        'حظر استغلال المنصب لتحقيق مكاسب شخصية',
        'تسجيل حالات التعارض في سجل خاص',
        'الإبلاغ عن أي حالات تعارض',
        'المراجعة الدورية لسجلات تعارض المصالح',
      ],
      provisions_en: [
        'Disclosure of any direct or indirect personal interest',
        'Abstaining from voting in cases of conflict',
        'Prohibition of using position for personal gain',
        'Recording conflict cases in a dedicated register',
        'Reporting any conflict situations',
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
      pdf: '/docs/Whistleblowing-Policy.pdf',
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
      desc_ar: 'تحمي خصوصية البيانات الشخصية لطالبي الخدمة والمتبرعين والعاملين والمتطوعين وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.',
      desc_en: 'Protects the privacy of personal data of beneficiaries, donors, employees, and volunteers in accordance with the Saudi Personal Data Protection Law.',
      pdf: '/docs/Privacy-Policy.pdf',
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
      pdf: '/docs/Fundraising-Policy.pdf',
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
      pdf: '/docs/Risk-Management-Policy.pdf',
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
      pdf: '/docs/Document-Retention-Policy.pdf',
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
      title_ar: 'سياسة العلاقة مع طالبي الخدمة',
      title_en: 'Service Seekers Relations Policy',
      desc_ar: 'تحدد إطار التعامل مع طالبي خدمات الجمعية بما يضمن الكرامة والعدالة والشمولية في تقديم الخدمات.',
      desc_en: 'Defines the framework for dealing with beneficiaries ensuring dignity, fairness, and inclusivity in service delivery.',
      pdf: '/docs/Beneficiary-Relations-Policy.pdf',
      provisions_ar: [
        'معايير واضحة وعادلة لأهلية الاستفادة',
        'احترام كرامة طالبي الخدمة وخصوصيتهم',
        'آلية تلقي الشكاوى والاقتراحات من طالبي الخدمة',
        'قياس رضا طالبي الخدمة بشكل دوري',
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
    {
      id: 'aml',
      icon: FaSearchDollar,
      color: '#b91c1c',
      title_ar: 'سياسة مكافحة غسل الأموال وتمويل الإرهاب',
      title_en: 'AML/CFT Policy',
      desc_ar: 'تهدف إلى حماية الجمعية من الاستغلال في عمليات غسل الأموال أو تمويل الإرهاب، وضمان الالتزام بالأنظمة المحلية والدولية.',
      desc_en: 'Aims to protect the association from being exploited in money laundering or terrorist financing, ensuring compliance with local and international regulations.',
      pdf: '/docs/AML-CFT-Policy.pdf',
      provisions_ar: [
        'التحقق من هوية المتبرعين والمستفيدين والجهات المانحة',
        'الإبلاغ الفوري عن العمليات المشتبه بها',
        'تطبيق إجراءات العناية الواجبة والرقابة المستمرة',
        'تدريب العاملين على رصد ومكافحة غسل الأموال',
        'الاحتفاظ بسجلات العمليات المالية لمدة لا تقل عن 10 سنوات',
        'تعيين مسؤول التزام للإشراف على تطبيق السياسة',
      ],
      provisions_en: [
        'Verifying the identity of donors, beneficiaries, and granting entities',
        'Immediate reporting of suspicious transactions',
        'Implementing due diligence and continuous monitoring procedures',
        'Training employees on detecting and combating money laundering',
        'Retaining financial transaction records for at least 10 years',
        'Appointing a Compliance Officer to oversee policy implementation',
      ],
    },
    {
      id: 'financial',
      icon: FaMoneyBillWave,
      color: '#059669',
      title_ar: 'اللائحة المالية',
      title_en: 'Financial Regulations',
      desc_ar: 'تحدد القواعد والأسس التي تحكم العمليات المالية والمحاسبية في الجمعية لضمان كفاءة الإنفاق والشفافية التامة.',
      desc_en: 'Defines the rules and principles governing financial and accounting operations in the association to ensure spending efficiency and absolute transparency.',
      pdf: '/docs/Financial-Regulations.pdf',
      provisions_ar: [
        'إعداد الموازنات التقديرية السنوية واعتمادها',
        'تحديد إجراءات الصرف المالي ومستويات الاعتماد',
        'ضوابط المشتريات وإدارة العقود والمنافسات',
        'إجراءات القبض وإيداع الإيرادات والتبرعات',
        'سياسات الرقابة الداخلية وإدارة الأصول',
        'إصدار التقارير المالية الدورية والقوائم المدققة',
      ],
      provisions_en: [
        'Preparing and approving annual estimated budgets',
        'Defining financial disbursement procedures and approval levels',
        'Procurement controls, contract, and bidding management',
        'Collection and deposit procedures for revenues and donations',
        'Internal control policies and asset management',
        'Issuing periodic financial reports and audited statements',
      ],
    },
    {
      id: 'hr',
      icon: FaIdCard,
      color: '#2563eb',
      title_ar: 'لائحة الموارد البشرية',
      title_en: 'Human Resources Regulations',
      desc_ar: 'تنظم العلاقة التعاقدية والوظيفية بين الجمعية وموظفيها لضمان بيئة عمل عادلة ومحفزة تتوافق مع نظام العمل السعودي.',
      desc_en: 'Regulates the contractual and employment relationship between the association and its employees to ensure a fair and motivating work environment compliant with the Saudi Labor Law.',
      pdf: '/docs/HR-Regulations.pdf',
      provisions_ar: [
        'إجراءات التوظيف والاختيار والمفاضلة بعدالة',
        'سلم الرواتب والمكافآت والبدلات',
        'ضوابط تقييم الأداء والترقيات والتدريب',
        'تحديد الإجازات وساعات العمل والراحة',
        'الجزاءات التأديبية وآلية التظلم',
        'إنهاء الخدمة وحقوق ما بعد الانتهاء',
      ],
      provisions_en: [
        'Fair recruitment, selection, and preference procedures',
        'Salary scale, bonuses, and allowances',
        'Performance evaluation, promotion, and training controls',
        'Determining leaves, working hours, and rest periods',
        'Disciplinary actions and grievance mechanism',
        'Termination of service and post-employment rights',
      ],
    },
    {
      id: 'volunteering',
      icon: FaHandsHelping,
      color: '#d97706',
      title_ar: 'سياسة التطوع وإدارة المتطوعين',
      title_en: 'Volunteering Policy',
      desc_ar: 'تؤطر العمل التطوعي في الجمعية وتحمي حقوق المتطوعين وتنظم مهامهم ومسؤولياتهم وفق المعيار الوطني للتطوع.',
      desc_en: 'Frames volunteer work in the association, protects volunteers\' rights, and organizes their tasks and responsibilities according to the National Volunteer Standard.',
      pdf: '/docs/Volunteering-Policy.pdf',
      provisions_ar: [
        'تحديد مجالات التطوع وتصميم الفرص التطوعية',
        'إجراءات استقطاب واختيار المتطوعين',
        'توضيح حقوق وواجبات المتطوع تجاه الجمعية',
        'التأهيل والتدريب لضمان جودة الأداء',
        'ميثاق شرف العمل التطوعي وإقرارات الالتزام',
        'توثيق الساعات التطوعية وتقديم خطابات الشكر',
      ],
      provisions_en: [
        'Identifying volunteer areas and designing volunteer opportunities',
        'Procedures for attracting and selecting volunteers',
        'Clarifying volunteers\' rights and duties towards the association',
        'Qualification and training to ensure performance quality',
        'Volunteer code of conduct and commitment declarations',
        'Documenting volunteer hours and providing letters of appreciation',
      ],
    },
    {
      id: 'refund',
      icon: FaUndo,
      color: '#4f46e5',
      title_ar: 'سياسة استرداد التبرعات',
      title_en: 'Donation Refund Policy',
      desc_ar: 'تحدد الحالات والشروط التي يحق فيها للمتبرع استرداد مبلغ التبرع، لضمان حماية المتبرعين والشفافية.',
      desc_en: 'Determines the conditions and cases under which a donor is entitled to a donation refund, ensuring donor protection and transparency.',
      pdf: '/docs/Donation-Refund-Policy.pdf',
      provisions_ar: [
        'استرداد التبرع في حال التحويل بالخطأ المبرر',
        'تحديد المدة الزمنية المسموحة لطلب الاسترداد',
        'عدم جواز الاسترداد للتبرعات العينية المستخدمة',
        'إجراءات تقديم الطلب ومراجعته من الإدارة المالية',
        'عدم استرداد التبرعات بعد صرفها على المستفيدين',
        'إرجاع المبالغ بنفس طريقة الدفع الأصلية إن أمكن',
      ],
      provisions_en: [
        'Refund for justified accidental transfers',
        'Determining the allowed timeframe for refund requests',
        'No refunds for used in-kind donations',
        'Procedures for submitting the request and financial review',
        'No refunds after funds are disbursed to beneficiaries',
        'Refunding amounts using the original payment method when possible',
      ],
    },
    {
      id: 'redirect',
      icon: FaExchangeAlt,
      color: '#0891b2',
      title_ar: 'سياسة توجيه التبرع لمشروع آخر',
      title_en: 'Redirecting Donations Policy',
      desc_ar: 'تنظم آلية تحويل ونقل التبرعات من مشروع إلى آخر في حال اكتمال تمويل المشروع الأول أو تعثره، بما يحفظ حق المتبرع.',
      desc_en: 'Regulates the mechanism for transferring donations from one project to another if the first project is fully funded or stalls, protecting the donor\'s rights.',
      pdf: '/docs/Redirecting-Donations-Policy.pdf',
      provisions_ar: [
        'جواز نقل فائض التبرعات لمشروع مشابه بنفس النطاق',
        'أخذ موافقة المتبرع في حال التبرع المشروط أو المقيد',
        'توجيه التبرعات العامة وغير المقيدة حسب احتياج الجمعية',
        'الإعلان بشفافية عن اكتمال التمويل للمشاريع المحددة',
        'قرار نقل التبرعات يمر عبر موافقة مجلس الإدارة',
        'إعلام المتبرعين بمسار توجيه تبرعاتهم إن لزم الأمر',
      ],
      provisions_en: [
        'Permissibility of transferring surplus donations to a similar project',
        'Obtaining donor consent for conditional or restricted donations',
        'Directing general, unrestricted donations based on association needs',
        'Transparently announcing the completion of specific project funding',
        'Donation transfer decisions require Board approval',
        'Informing donors about the redirection path of their donations if necessary',
      ],
    },
    {
      id: 'investment',
      icon: FaChartLine,
      color: '#7e22ce',
      title_ar: 'سياسة الاستثمار',
      title_en: 'Investment Policy',
      desc_ar: 'تحدد المعايير والضوابط الخاصة باستثمار أموال وفائض إيرادات الجمعية بما يحقق الاستدامة المالية وتنمية الموارد بأمان.',
      desc_en: 'Defines the criteria and controls for investing the association\'s funds and surplus revenues to achieve financial sustainability and secure resource development.',
      pdf: '/docs/Investment-Policy.pdf',
      provisions_ar: [
        'الالتزام بأحكام الشريعة الإسلامية في كافة الاستثمارات',
        'تجنب الاستثمارات عالية المخاطر أو المضاربة',
        'تنويع المحفظة الاستثمارية لتقليل المخاطر',
        'اعتماد خطط الاستثمار من مجلس الإدارة والجمعية العمومية',
        'تعيين جهات مرخصة ومعتمدة لإدارة الاستثمارات',
        'المراجعة الدورية وتقييم أداء المحفظة الاستثمارية',
      ],
      provisions_en: [
        'Compliance with Islamic Sharia principles in all investments',
        'Avoiding high-risk investments or speculations',
        'Diversifying the investment portfolio to minimize risks',
        'Approval of investment plans by the Board and General Assembly',
        'Appointing licensed and accredited entities for investment management',
        'Periodic review and performance evaluation of the investment portfolio',
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
      provisions_ar: [
        'تحديد صلاحيات الاعتماد المالي وفق مستويات متدرجة',
        'فصل السلطات وتجنب مركزية القرار',
        'توضيح المهام التشغيلية للمدير التنفيذي',
        'حصر القرارات الاستراتيجية بمجلس الإدارة',
        'تفويض الصلاحيات بشكل رسمي ومكتوب',
        'تحديث المصفوفة بشكل دوري يتناسب مع حجم الجمعية',
      ],
      provisions_en: [
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
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-[#0E4B33] text-sm">{t.key_provisions}</h4>
                        {policy.pdf && (
                          <a 
                            href={policy.pdf} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E4B33] text-white text-sm font-semibold rounded-lg hover:bg-[#0a3826] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            {isAr ? 'تحميل الوثيقة الرسمية' : 'Download Official Document'}
                          </a>
                        )}
                      </div>
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
