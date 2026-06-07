import React from 'react'
import { Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrganizationMembers = () => {
  const lang = localStorage.getItem('language') || 'en'
  const isAr = lang === 'ar'

  const t = {
    en: {
      title: 'Organization Members',
      subtitle: 'General Assembly Members',
      section_title: 'Board Members',
      section_subtitle: 'General Assembly Members of Mathwaa Association',
      home: 'Home',
      about: 'About Us',
      board_member: 'Board Member',
      assembly_member: 'Assembly Member',
    },
    ar: {
      title: 'أعضاء الجمعية',
      subtitle: 'أعضاء الجمعية العمومية',
      section_title: 'أعضاء المجلس',
      section_subtitle: 'أعضاء الجمعية العمومية لجمعية مثوى الأهلية',
      home: 'الرئيسية',
      about: 'عن الجمعية',
      board_member: 'عضو مجلس إدارة',
      assembly_member: 'عضو جمعية عمومية',
    },
  }[lang]

  const members = [
    { nameEn: 'Hadi Nasser bin Hashim Al-Salman', nameAr: 'هادي ناصر بن هاشم السلمان', role: 'board' },
    { nameEn: 'Abbas Hamza bin Nasser Al-Ibrahim', nameAr: 'عباس حمزة بن ناصر الإبراهيم', role: 'board' },
    { nameEn: 'Waleed Ali bin Hussein Al-Faiz', nameAr: 'وليد علي بن حسين الفائز', role: 'board' },
    { nameEn: 'Shuaa Abdullah bin Ahmed Al-Harbi', nameAr: 'شعاع عبدالله بن أحمد الحربي', role: 'board' },
    { nameEn: 'Batoul Adnan Al-Hashim', nameAr: 'بتول عدنان الحاشم', role: 'assembly' },
    { nameEn: 'Hamad Ali bin Hussein Al-Ahmad', nameAr: 'حمد علي بن حسين الأحمد', role: 'assembly' },
    { nameEn: 'Abdulaziz Ahmed Al-Shaalan', nameAr: 'عبدالعزيز أحمد الشعلان', role: 'assembly' },
    { nameEn: 'Mohammed Ahmed Al-Khamis', nameAr: 'محمد أحمد الخميس', role: 'assembly' },
    { nameEn: 'Abdullah Abbas Al-Ibrahim', nameAr: 'عبدالله عباس الإبراهيم', role: 'assembly' },
  ]

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.about, to: '/about' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#0E4B33' }}>{t.section_title}</h2>
            <p className="text-gray-600">{t.section_subtitle}</p>
            <div className="h-1 w-20 mt-2 rounded-full" style={{ backgroundColor: '#C89B3C' }} />
          </div>
          <Grid cols={3}>
            {members.map((m, idx) => (
              <Card key={idx} className="text-center border border-gray-200 overflow-hidden">
                <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14,75,51,0.08)' }}>
                  <FaUser size={48} style={{ color: '#0E4B33' }} />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0E4B33' }}>{isAr ? m.nameAr : m.nameEn}</h3>
                <p className="text-sm font-semibold text-gray-600">{m.role === 'board' ? t.board_member : t.assembly_member}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default OrganizationMembers
