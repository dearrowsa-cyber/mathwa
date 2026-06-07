import React, { useState } from 'react';
import { Section, Container, Card, Grid } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaBoxOpen, FaHandHoldingHeart, FaUsers } from 'react-icons/fa';

const Programs = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Programs & Initiatives',
      subtitle: 'Discover our ongoing programs and initiatives',
      home: 'Home',
      services: 'Services',
      program1Title: 'Food Basket Program',
      program1Desc: 'Distributing food baskets to families in need on a monthly basis.',
      program2Title: 'Orphan Sponsorship',
      program2Desc: 'Providing comprehensive care and financial support for orphans.',
      program3Title: 'Medical Assistance',
      program3Desc: 'Covering medical expenses and treatments for those who cannot afford them.',
    },
    ar: {
      title: 'البرامج والمبادرات',
      subtitle: 'اكتشف برامجنا ومبادراتنا المستمرة',
      home: 'الرئيسية',
      services: 'الخدمات',
      program1Title: 'برنامج السلة الغذائية',
      program1Desc: 'توزيع سلال غذائية على الأسر المحتاجة بشكل شهري.',
      program2Title: 'كفالة الأيتام',
      program2Desc: 'تقديم الرعاية الشاملة والدعم المالي للأيتام.',
      program3Title: 'المساعدات الطبية',
      program3Desc: 'تغطية النفقات الطبية والعلاجات لمن لا يستطيعون تحمل تكلفتها.',
    }
  }[language];

  const programs = [
    { icon: FaBoxOpen, title: t.program1Title, desc: t.program1Desc },
    { icon: FaUsers, title: t.program2Title, desc: t.program2Desc },
    { icon: FaHandHoldingHeart, title: t.program3Title, desc: t.program3Desc },
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.services, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <Grid cols={3}>
            {programs.map((p, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(200,155,60,0.1)' }}>
                  <p.icon size={32} style={{ color: '#C89B3C' }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0E4B33' }}>{p.title}</h3>
                <p className="text-gray-600">{p.desc}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default Programs;
