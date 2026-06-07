import React, { useState } from 'react';
import { Section, Container, Button } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaSmile } from 'react-icons/fa';

const SatisfactionBeneficiaries = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const [submitted, setSubmitted] = useState(false);
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Beneficiaries Satisfaction Survey',
      subtitle: 'Your opinion matters to improve our services',
      home: 'Home',
      satisfaction: 'Satisfaction',
      q1: 'How satisfied are you with the speed of service delivery?',
      q2: 'How satisfied are you with the behavior of our staff?',
      q3: 'Any additional comments?',
      submit: 'Submit Survey',
      success: 'Thank you for your feedback!',
    },
    ar: {
      title: 'قياس رضا المستفيدين',
      subtitle: 'رأيك يهمنا لتحسين خدماتنا',
      home: 'الرئيسية',
      satisfaction: 'قياس الرضا',
      q1: 'ما مدى رضاك عن سرعة تقديم الخدمة؟',
      q2: 'ما مدى رضاك عن تعامل موظفي الجمعية؟',
      q3: 'أي ملاحظات إضافية؟',
      submit: 'إرسال التقييم',
      success: 'شكراً لك على تقييمك ومساهمتك في التطوير!',
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.satisfaction, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-10 text-green-600">
                <FaSmile size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q1}</label>
                  <div className="flex gap-4">
                    {['1', '2', '3', '4', '5'].map(val => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="q1" value={val} required className="text-[#C89B3C]" /> {val}
                      </label>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">1 = {isAr ? 'سيء جداً' : 'Very Poor'}, 5 = {isAr ? 'ممتاز' : 'Excellent'}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q2}</label>
                  <div className="flex gap-4">
                    {['1', '2', '3', '4', '5'].map(val => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="q2" value={val} required className="text-[#C89B3C]" /> {val}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q3}</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all"></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full py-3">{t.submit}</Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default SatisfactionBeneficiaries;
