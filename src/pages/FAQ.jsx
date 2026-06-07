import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const [openIndex, setOpenIndex] = useState(null);
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      home: 'Home',
      services: 'Services',
    },
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'اعثر على إجابات للأسئلة المتداولة حول خدماتنا',
      home: 'الرئيسية',
      services: 'الخدمات',
    }
  }[language];

  const faqs = [
    {
      q: isAr ? 'كيف يمكنني التسجيل كمستفيد؟' : 'How can I register as a beneficiary?',
      a: isAr ? 'يمكنك التسجيل من خلال صفحة "خدمات المستفيدين" واختيار "تسجيل مستفيد جديد".' : 'You can register through the "Beneficiary Services" page and selecting "Register New Beneficiary".'
    },
    {
      q: isAr ? 'ما هي المستندات المطلوبة للتسجيل؟' : 'What documents are required for registration?',
      a: isAr ? 'الهوية الوطنية، إثبات السكن، وكشف حساب بنكي لآخر 3 أشهر.' : 'National ID, proof of residence, and bank statement for the last 3 months.'
    },
    {
      q: isAr ? 'هل التبرع آمن؟' : 'Is donating secure?',
      a: isAr ? 'نعم، جميع عمليات التبرع تتم عبر بوابات دفع آمنة ومعتمدة رسمياً.' : 'Yes, all donations are processed through secure and officially approved payment gateways.'
    }
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.services, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-lg hover:bg-gray-50 transition-colors"
                  style={{ color: '#0E4B33' }}
                >
                  <span>{faq.q}</span>
                  {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === idx && (
                  <div className="p-5 border-t border-gray-100 bg-gray-50 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default FAQ;
