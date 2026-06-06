import React, { useState } from 'react';
import { Container, Section } from '../components/Common';
import PageHeader from '../components/PageHeader';
import { FaTools } from 'react-icons/fa';

const ComingSoon = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Coming Soon',
      subtitle: 'We are currently working on this page. Please check back later.',
      home: 'Home'
    },
    ar: {
      title: 'قريباً',
      subtitle: 'نعمل حالياً على تطوير هذه الصفحة. يرجى العودة لاحقاً.',
      home: 'الرئيسية'
    }
  }[language];

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.title }]} />
      <Section className="bg-gray-50">
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FaTools size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-[#0E4B33] mb-2">{t.title}</h2>
            <p className="text-gray-500">{t.subtitle}</p>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ComingSoon;
