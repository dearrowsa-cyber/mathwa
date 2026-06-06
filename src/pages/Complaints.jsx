import React, { useState } from 'react';
import { Container, Section } from '../components/Common';
import PageHeader from '../components/PageHeader';
import { FaPaperPlane, FaLock, FaPaperclip, FaCheckCircle, FaTimes } from 'react-icons/fa';

const Complaints = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'complaint',
    subject: '',
    details: '',
    confidentiality: 'normal',
    attachment: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const t = {
    en: {
      title: 'Complaints & Reports',
      subtitle: 'We value your voice. Submit complaints, suggestions, or report violations safely and confidentially.',
      home: 'Home',
      governance: 'Governance',
      form_title: 'Submit a Report',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      type: 'Report Type',
      types: {
        complaint: 'Complaint',
        suggestion: 'Suggestion',
        whistleblowing: 'Whistleblowing (Violation Report)'
      },
      confidentiality: 'Confidentiality Level',
      confidentialityLevels: {
        normal: 'Normal',
        high: 'High (Strictly Confidential)'
      },
      subject: 'Subject',
      details: 'Details',
      attachment: 'Attachments (Optional)',
      submit: 'Send Report',
      success: 'Your report has been submitted successfully.',
      tracking_msg: 'Please save your tracking number to follow up on your report:',
      confidentiality_notice: 'All information is treated with strict confidentiality according to our Whistleblowing Policy.',
      close: 'Close'
    },
    ar: {
      title: 'الشكاوى والبلاغات',
      subtitle: 'صوتك مسموع. قدم شكواك، مقترحك، أو أبلغ عن أي مخالفات بسرية تامة وأمان.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      form_title: 'نموذج تقديم بلاغ',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الجوال',
      type: 'نوع البلاغ',
      types: {
        complaint: 'شكوى',
        suggestion: 'اقتراح',
        whistleblowing: 'إبلاغ عن مخالفة (حماية المُبلّغ)'
      },
      confidentiality: 'مستوى السرية',
      confidentialityLevels: {
        normal: 'عادي',
        high: 'عالي (سري للغاية)'
      },
      subject: 'الموضوع',
      details: 'التفاصيل',
      attachment: 'المرفقات (اختياري)',
      submit: 'إرسال البلاغ',
      success: 'تم إرسال بلاغك بنجاح.',
      tracking_msg: 'يرجى الاحتفاظ برقم المتابعة التالي لمتابعة حالة بلاغك:',
      confidentiality_notice: 'يتم التعامل مع كافة المعلومات بسرية تامة وفقاً لسياسة الإبلاغ عن المخالفات.',
      close: 'إغلاق'
    }
  }[language];

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance, to: '/governance' },
    { label: t.title }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate tracking number generation
    const generatedTracking = 'MTW-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingNumber(generatedTracking);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData(prev => ({ ...prev, attachment: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    setFormData({
      name: '', email: '', phone: '', type: 'complaint', subject: '', details: '', confidentiality: 'normal', attachment: null
    });
  };

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section className="bg-gray-50 relative">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#0E4B33] to-[#0a3525] text-white">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.form_title}</h2>
                  <p className="text-white/80 flex items-center gap-2 text-sm">
                    <FaLock /> {t.confidentiality_notice}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.name}</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.phone}</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.email}</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.type}</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white">
                        <option value="complaint">{t.types.complaint}</option>
                        <option value="suggestion">{t.types.suggestion}</option>
                        <option value="whistleblowing">{t.types.whistleblowing}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.subject}</label>
                      <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.confidentiality}</label>
                      <select name="confidentiality" value={formData.confidentiality} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white text-[#0E4B33] font-semibold">
                        <option value="normal">{t.confidentialityLevels.normal}</option>
                        <option value="high">{t.confidentialityLevels.high}</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.details}</label>
                    <textarea name="details" required rows="5" value={formData.details} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-shadow bg-gray-50 focus:bg-white resize-none"></textarea>
                  </div>

                  {/* Row 5 - Attachments */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.attachment}</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 text-center hover:border-[#C89B3C] transition-colors bg-gray-50">
                      <input type="file" name="attachment" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                        <FaPaperclip size={24} className="text-[#C89B3C]" />
                        <span className="text-sm font-semibold">
                          {formData.attachment ? formData.attachment.name : (isAr ? 'اسحب وأفلت الملف هنا أو انقر للاستعراض' : 'Drag and drop file here or click to browse')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 bg-[#0E4B33] text-white font-bold rounded-xl hover:bg-[#C89B3C] hover:text-[#0E4B33] transition-colors flex items-center justify-center gap-2 text-lg shadow-lg">
                    <FaPaperPlane /> {t.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl relative animate-fadeInUp">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors p-2">
              <FaTimes size={24} />
            </button>
            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
            <h3 className="text-2xl font-bold text-[#0E4B33] mb-2">{t.success}</h3>
            <p className="text-gray-600 mb-6">{t.tracking_msg}</p>
            <div className="bg-gray-100 py-4 px-6 rounded-2xl mb-8 border border-gray-200">
              <span className="text-3xl font-black tracking-widest text-[#C89B3C]">{trackingNumber}</span>
            </div>
            <button onClick={handleCloseModal} className="w-full py-3 bg-[#0E4B33] text-white rounded-xl font-bold hover:bg-[#C89B3C] hover:text-[#0E4B33] transition-colors">
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Complaints;
