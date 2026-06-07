import React, { useState } from 'react';
import { Section, Container, Button } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

const MembershipApply = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const [formData, setFormData] = useState({ name: '', idNumber: '', email: '', phone: '', type: 'active' });
  const [submitted, setSubmitted] = useState(false);
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Apply for Membership',
      subtitle: 'Fill out the form below to join our general assembly',
      home: 'Home',
      membership: 'Membership',
      name: 'Full Name',
      idNumber: 'National ID Number',
      email: 'Email Address',
      phone: 'Phone Number',
      type: 'Membership Type',
      typeActive: 'Active Member',
      typeAssociate: 'Associate Member',
      submit: 'Submit Application',
      success: 'Application Submitted Successfully! We will review it and contact you soon.',
    },
    ar: {
      title: 'التقديم على العضوية',
      subtitle: 'قم بتعبئة النموذج أدناه للانضمام إلى جمعيتنا العمومية',
      home: 'الرئيسية',
      membership: 'العضوية',
      name: 'الاسم الرباعي',
      idNumber: 'رقم الهوية الوطنية',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      type: 'نوع العضوية المطلوبة',
      typeActive: 'عضو عامل',
      typeAssociate: 'عضو منتسب',
      submit: 'إرسال الطلب',
      success: 'تم إرسال طلبك بنجاح! سنقوم بمراجعته والتواصل معك قريباً.',
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', idNumber: '', email: '', phone: '', type: 'active' });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✓</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.idNumber}</label>
                  <input required type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.type}</label>
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all">
                    <option value="active">{t.typeActive}</option>
                    <option value="associate">{t.typeAssociate}</option>
                  </select>
                </div>
                <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                  {t.submit}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipApply;
