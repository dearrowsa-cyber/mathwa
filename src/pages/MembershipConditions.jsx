import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaCheckCircle } from 'react-icons/fa';

const MembershipConditions = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Membership Conditions',
      subtitle: 'Requirements and conditions to join our general assembly',
      home: 'Home',
      membership: 'Membership',
    },
    ar: {
      title: 'شروط العضوية',
      subtitle: 'المتطلبات والشروط للانضمام إلى جمعيتنا العمومية',
      home: 'الرئيسية',
      membership: 'العضوية',
    }
  }[language];

  const conditions = [
    isAr ? 'أن يكون سعودي الجنسية.' : 'Must be a Saudi citizen.',
    isAr ? 'ألا يقل عمره عن ثمانية عشر عاماً.' : 'Must be at least 18 years old.',
    isAr ? 'أن يكون كامل الأهلية.' : 'Must be of full legal capacity.',
    isAr ? 'أن يكون حسن السيرة والسلوك.' : 'Must be of good conduct and behavior.',
    isAr ? 'ألا يكون قد صدر بحقه حكم نهائي بإدانته في جريمة مخلة بالشرف أو الأمانة.' : 'Must not have been convicted of a crime involving breach of honor or trust.',
    isAr ? 'أن يلتزم بقرارات الجمعية العمومية.' : 'Must commit to the decisions of the General Assembly.',
    isAr ? 'سداد رسوم العضوية المقررة.' : 'Payment of the required membership fees.'
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.title}</h2>
            <ul className="space-y-4">
              {conditions.map((condition, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <FaCheckCircle className="mt-1 flex-shrink-0 text-xl" style={{ color: '#C89B3C' }} />
                  <span className="text-gray-700 text-lg">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipConditions;
