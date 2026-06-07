import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaBalanceScale, FaUserShield } from 'react-icons/fa';

const MembershipRights = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Rights & Duties',
      subtitle: 'The rights and duties of the association members',
      home: 'Home',
      membership: 'Membership',
      rights: 'Member Rights',
      duties: 'Member Duties',
    },
    ar: {
      title: 'حقوق وواجبات العضو',
      subtitle: 'حقوق وواجبات أعضاء الجمعية',
      home: 'الرئيسية',
      membership: 'العضوية',
      rights: 'حقوق العضو',
      duties: 'واجبات العضو',
    }
  }[language];

  const rightsList = [
    isAr ? 'حضور اجتماعات الجمعية العمومية والمشاركة في مناقشاتها.' : 'Attend General Assembly meetings and participate in discussions.',
    isAr ? 'التصويت على قرارات الجمعية العمومية (للأعضاء العاملين فقط).' : 'Vote on General Assembly decisions (for active members only).',
    isAr ? 'الترشح لعضوية مجلس الإدارة (للأعضاء العاملين فقط).' : 'Run for the Board of Directors (for active members only).',
    isAr ? 'الاطلاع على محاضر اجتماعات الجمعية العمومية.' : 'View the minutes of General Assembly meetings.',
    isAr ? 'الاستفادة من خدمات الجمعية وأنشطتها.' : 'Benefit from the association\'s services and activities.'
  ];

  const dutiesList = [
    isAr ? 'الالتزام بأحكام اللائحة الأساسية واللوائح الداخلية.' : 'Adhere to the provisions of the basic regulations and bylaws.',
    isAr ? 'العمل على تحقيق أهداف الجمعية.' : 'Work towards achieving the association\'s goals.',
    isAr ? 'دفع الاشتراكات المقررة في مواعيدها.' : 'Pay the required subscriptions on time.',
    isAr ? 'التعاون مع مجلس الإدارة لتنفيذ قرارات الجمعية.' : 'Cooperate with the Board of Directors to implement assembly decisions.',
    isAr ? 'عدم الإساءة إلى الجمعية أو التحدث باسمها دون تفويض.' : 'Do not defame the association or speak on its behalf without authorization.'
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaBalanceScale size={28} style={{ color: '#C89B3C' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.rights}</h2>
              </div>
              <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
                {rightsList.map((item, idx) => (
                  <li key={idx} className="pl-2">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaUserShield size={28} style={{ color: '#C89B3C' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.duties}</h2>
              </div>
              <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
                {dutiesList.map((item, idx) => (
                  <li key={idx} className="pl-2">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipRights;
