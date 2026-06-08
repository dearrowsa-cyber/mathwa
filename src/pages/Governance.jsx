import React from 'react'
import { Section, Container, Card, Grid, SectionTitle } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaUsers, FaGavel, FaUniversity, FaFileAlt, FaChartBar, FaGlobe, FaDownload } from 'react-icons/fa'

const Governance = () => {
  const lang = localStorage.getItem('language') || 'en'
  const isAr = lang === 'ar'

  const t = {
    en: {
      title: 'Governance and Transparency',
      subtitle: 'Committed to the highest standards of governance and transparency in the management of the association',
      home: 'Home',
      structure: 'Organizational Structure',
      structure_sub: 'The administrative structure of the association',
      general_assembly: 'General Assembly',
      general_assembly_desc: 'Highest authority, 4 meetings annually',
      board: 'Board of Directors',
      board_desc: '4 members, 4-year term',

      executive: 'Executive Body',
      executive_desc: 'Day-to-day management and operations',
      powers: 'Powers of the Board of Directors',
      powers_sub: 'Main tasks and responsibilities',
      policies: 'Policies and Planning',
      governance_oversight: 'Governance and Oversight',
      financial: 'Financial Affairs',

      financial_resources: 'Financial Resources',
      financial_sub: 'Sources of income and financial oversight',
      fiscal_year: 'Fiscal Year',
      oversight: 'Financial Oversight',
      transparency: 'Transparency and Disclosure',
      transparency_sub: 'Our commitment to transparency',
      annual_report: 'Annual Report',
      financial_reports: 'Financial Reports',
      periodic_reports: 'Periodic Reports',
      e_disclosure: 'Electronic Disclosure',
      official_docs: 'Official Documents',
      official_docs_sub: 'Documents and regulations governing the association',
      basic_regulations: 'Basic Regulations',
      internal_regulations: 'Internal Regulations',
      governance_rules: 'Governance Rules',
      board_creation: 'Board Creation Decision',
      registration_decision: 'Registration Decision',
      registration_cert: 'Registration Certificate',
      download: 'Download',
      view_cert: 'View Certificate',
      contact_cta: 'Do you have an inquiry?',
      contact_cta_sub: 'We are here to answer all your questions',
      contact_us: 'Contact Us',
    },
    ar: {
      title: 'الحوكمة والشفافية',
      subtitle: 'الملتزم بأعلى معايير الحوكمة والشفافية في إدارة الجمعية',
      home: 'الرئيسية',
      structure: 'الهيكل التنظيمي',
      structure_sub: 'البنية الإدارية للجمعية',
      general_assembly: 'الجمعية العمومية',
      general_assembly_desc: 'أعلى سلطة، 4 اجتماعات سنوياً',
      board: 'مجلس الإدارة',
      board_desc: '4 أعضاء، فترة 4 سنوات',

      executive: 'الجهاز التنفيذي',
      executive_desc: 'الإدارة والعمليات اليومية',
      powers: 'صلاحيات مجلس الإدارة',
      powers_sub: 'المهام والمسؤوليات الرئيسية',
      policies: 'السياسات والتخطيط',
      governance_oversight: 'الحوكمة والرقابة',
      financial: 'الشؤون المالية',

      financial_resources: 'الموارد المالية',
      financial_sub: 'مصادر الدخل والرقابة المالية',
      fiscal_year: 'السنة المالية',
      oversight: 'الرقابة المالية',
      transparency: 'الشفافية والإفصاح',
      transparency_sub: 'التزامنا بالشفافية في جميع أعمالنا',
      annual_report: 'التقرير السنوي',
      financial_reports: 'التقارير المالية',
      periodic_reports: 'التقارير الدورية',
      e_disclosure: 'الإفصاح الإلكتروني',
      official_docs: 'الوثائق الرسمية',
      official_docs_sub: 'الوثائق واللوائح المنظمة لعمل الجمعية',
      basic_regulations: 'اللائحة الأساسية',
      internal_regulations: 'اللوائح الداخلية',
      governance_rules: 'قواعد الحوكمة',
      board_creation: 'قرار تشكيل مجلس الإدارة',
      registration_decision: 'قرار التسجيل',
      registration_cert: 'شهادة التسجيل',
      download: 'تحميل',
      view_cert: 'عرض الشهادة',
      contact_cta: 'هل لديك استفسار؟',
      contact_cta_sub: 'نحن هنا للإجابة على جميع أسئلتكم واستفساراتكم',
      contact_us: 'تواصل معنا',
    },
  }[lang]

  const officialDocs = [
    { title: t.basic_regulations, file: '/docs/Basic-Standards.pdf', icon: FaGavel },
    { title: t.board_creation, file: '/docs/Board-Creation-Decision.pdf', icon: FaFileAlt },
    { title: t.registration_decision, file: '/docs/Registration-Decision.pdf', icon: FaFileAlt },
    { title: t.registration_cert, file: '/docs/Certificate-1000827300.jpeg', icon: FaFileAlt, isCert: true },
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#0E4B33' }}>{t.structure}</h2>
            <p className="text-gray-600">{t.structure_sub}</p>
            <div className="h-1 w-20 mt-2 rounded-full" style={{ backgroundColor: '#C89B3C' }} />
          </div>
          <Grid cols={3}>
            {[
              { icon: FaUsers, title: t.general_assembly, desc: t.general_assembly_desc },
              { icon: FaUsers, title: t.board, desc: t.board_desc },

              { icon: FaUniversity, title: t.executive, desc: t.executive_desc },
            ].map((item, idx) => (
              <Card key={idx} className="text-center">
                <item.icon size={40} className="mx-auto mb-3" style={{ color: '#C89B3C' }} />
                <h3 className="font-bold mb-2" style={{ color: '#0E4B33' }}>{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </Grid>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0E4B33' }}>{t.powers}</h2>
            <p className="text-gray-600 mb-6">{t.powers_sub}</p>
            <Grid cols={3}>
              {[
                { icon: FaFileAlt, title: t.policies },
                { icon: FaGavel, title: t.governance_oversight },
                { icon: FaChartBar, title: t.financial },
              ].map((item, idx) => (
                <Card key={idx} className="text-center">
                  <item.icon size={36} className="mx-auto mb-2" style={{ color: '#C89B3C' }} />
                  <h3 className="font-bold" style={{ color: '#0E4B33' }}>{item.title}</h3>
                </Card>
              ))}
            </Grid>
          </div>



          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0E4B33' }}>{t.transparency}</h2>
            <p className="text-gray-600 mb-6">{t.transparency_sub}</p>
            <Grid cols={4}>
              {[t.annual_report, t.financial_reports, t.periodic_reports, t.e_disclosure].map((title, idx) => (
                <Card key={idx} className="text-center">
                  <FaFileAlt size={32} className="mx-auto mb-2" style={{ color: '#C89B3C' }} />
                  <h3 className="font-bold text-sm" style={{ color: '#0E4B33' }}>{title}</h3>
                </Card>
              ))}
            </Grid>
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#0E4B33' }}>{t.official_docs}</h2>
            <p className="text-gray-600 mb-6">{t.official_docs_sub}</p>
            <div className="space-y-3">
              {officialDocs.map((doc, idx) => {
                const Icon = doc.icon
                return (
                  <Card key={idx} className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Icon size={28} style={{ color: '#C89B3C' }} />
                      <span className="font-semibold" style={{ color: '#0E4B33' }}>{doc.title}</span>
                    </div>
                    <a href={doc.file} target="_blank" rel="noopener noreferrer" download={!doc.isCert} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: '#C89B3C' }}>
                      <FaDownload size={18} />
                      {doc.isCert ? t.view_cert : t.download}
                    </a>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl text-center text-white" style={{ backgroundColor: '#0E4B33' }}>
            <h3 className="text-xl font-bold mb-2">{t.contact_cta}</h3>
            <p className="mb-6 opacity-90">{t.contact_cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white transition-opacity hover:opacity-90" style={{ color: '#0E4B33' }}>
              {t.contact_us}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Governance
