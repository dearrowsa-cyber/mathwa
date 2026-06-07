import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaUserPlus, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';

const HowToBenefit = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'How to Benefit',
      subtitle: 'A step-by-step guide to applying for our services',
      home: 'Home',
      services: 'Services',
      step1Title: 'Register as Beneficiary',
      step1Desc: 'Create an account on our platform and provide the necessary personal and family details.',
      step2Title: 'Submit Request',
      step2Desc: 'Choose the appropriate service and submit a request with supporting documents.',
      step3Title: 'Review & Approval',
      step3Desc: 'Our committee will review your request and you will be notified of the decision.',
    },
    ar: {
      title: 'آلية الاستفادة',
      subtitle: 'دليل خطوة بخطوة للتقديم على خدماتنا',
      home: 'الرئيسية',
      services: 'الخدمات',
      step1Title: 'التسجيل كمستفيد',
      step1Desc: 'قم بإنشاء حساب على منصتنا وقدم التفاصيل الشخصية والعائلية اللازمة.',
      step2Title: 'تقديم الطلب',
      step2Desc: 'اختر الخدمة المناسبة وقدم طلباً مع إرفاق المستندات الداعمة.',
      step3Title: 'المراجعة والاعتماد',
      step3Desc: 'ستقوم لجنتنا بمراجعة طلبك وسيتم إشعارك بالقرار.',
    }
  }[language];

  const steps = [
    { num: 1, icon: FaUserPlus, title: t.step1Title, desc: t.step1Desc },
    { num: 2, icon: FaClipboardCheck, title: t.step2Title, desc: t.step2Desc },
    { num: 3, icon: FaCheckCircle, title: t.step3Title, desc: t.step3Desc },
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.services, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl relative" style={{ backgroundColor: '#0E4B33', color: '#fff' }}>
                  <step.icon size={32} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm border-4 border-white" style={{ backgroundColor: '#C89B3C' }}>
                    {step.num}
                  </span>
                </div>
                <div className={`text-center ${isAr ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HowToBenefit;
