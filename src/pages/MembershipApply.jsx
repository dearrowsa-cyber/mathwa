import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaExternalLinkAlt, FaHandshake } from 'react-icons/fa';

const MembershipApply = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Apply for Membership',
      subtitle: 'Join our general assembly and support our mission',
      home: 'Home',
      membership: 'Membership',
      proceed: 'Proceed to Membership Portal',
      description: 'You can now apply for membership securely through our dedicated portal. The portal allows you to select your membership type, fill out your details, and pay the subscription fees online in a few simple steps.',
    },
    ar: {
      title: 'التقديم على العضوية',
      subtitle: 'انضم إلى جمعيتنا العمومية وادعم رسالتنا',
      home: 'الرئيسية',
      membership: 'العضوية',
      proceed: 'الانتقال لبوابة العضوية والدفع',
      description: 'يمكنك الآن التقديم على العضوية بشكل آمن عبر بوابتنا المخصصة. تتيح لك البوابة اختيار نوع العضوية، تعبئة بياناتك، وسداد رسوم الاشتراك إلكترونياً بخطوات بسيطة.',
    }
  }[language];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-md border border-gray-100 text-center">
            <FaHandshake size={64} className="mx-auto mb-6" style={{ color: '#C89B3C' }} />
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.title}</h3>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {t.description}
            </p>
            
            <a 
              href="https://mathwaa.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 text-lg font-bold text-white rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: '#0E4B33' }}
            >
              {t.proceed}
              <FaExternalLinkAlt size={18} className={isAr ? 'mr-2' : 'ml-2'} />
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipApply;
