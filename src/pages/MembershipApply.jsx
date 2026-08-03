import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { 
  FaUser, FaIdCard, FaPhone, FaEnvelope, FaBriefcase, FaGraduationCap, 
  FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaPaperPlane, FaPrint, 
  FaFileContract, FaInfoCircle, FaShieldAlt, FaHandHoldingHeart
} from 'react-icons/fa';

const MembershipApply = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'ar');
  const isAr = language === 'ar';
  const location = useLocation();

  // Extract query parameter ?type=regular or ?type=supporting
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') || location.state?.type || 'regular';

  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    date_of_birth: '',
    place_of_birth: '',
    national_id: '',
    id_issue_place: '',
    id_issue_date: '',
    phone: '',
    email: '',
    po_box: '',
    postal_code: '',
    qualification: '',
    job_title: '',
    work_address: '',
    work_phone: '',
    membership_type: initialType,
    start_date: new Date().toISOString().split('T')[0],
    agreement: false
  });

  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialType && (initialType === 'regular' || initialType === 'supporting')) {
      setFormData(prev => ({ ...prev, membership_type: initialType }));
    }
  }, [initialType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.name_ar.trim()) {
      setErrorMsg(isAr ? 'الرجاء إدخال الاسم الرباعي' : 'Please enter full name');
      return;
    }
    if (!formData.national_id.trim()) {
      setErrorMsg(isAr ? 'الرجاء إدخال رقم الهوية الوطنية أو الإقامة' : 'Please enter National ID or Iqama');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg(isAr ? 'الرجاء إدخال رقم الجوال' : 'Please enter mobile number');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg(isAr ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter email address');
      return;
    }
    if (!formData.agreement) {
      setErrorMsg(isAr ? 'يجب الموافقة والإقرار على الضوابط واللوائح قبل تقديم الطلب' : 'You must agree to the terms & regulations');
      return;
    }

    setLoading(true);

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
      const response = await fetch(`${BACKEND_URL}/api/submit-membership-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult(data);
      } else {
        setErrorMsg(data.message || (isAr ? 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً' : 'Error submitting application'));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(isAr ? 'تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت' : 'Connection error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const t = {
    ar: {
      title: 'استمارة طلب عضوية',
      subtitle: 'تعبئة استمارة طلب الانضمام لعضوية الجمعية العمومية لجمعية مثوى الأهلية',
      home: 'الرئيسية',
      membership: 'العضوية',
      apply_title: 'استمارة طلب عضوية الجمعية العمومية',
      personal_sec: 'البيانات الشخصية ومعلومات الاتصال',
      membership_sec: 'نوع العضوية المطلوبة',
      declaration_sec: 'الإقرار والتعهد',
      for_admin_use: 'خاص باستراحات واستخدام الجمعية فقط',
      full_name: 'الاسم (رباعي) *',
      dob: 'تاريخ الميلاد *',
      pob: 'مكان الميلاد *',
      national_id: 'رقم الهوية / الإقامة *',
      id_issue_place: 'مكان الإصدار',
      id_issue_date: 'تاريخ الإصدار',
      phone: 'رقم الجوال *',
      email: 'البريد الإلكتروني *',
      po_box: 'صندوق البريد',
      postal_code: 'الرمز البريدي',
      qualification: 'المؤهل العلمي',
      job_title: 'الوظيفة',
      work_address: 'عنوان العمل',
      work_phone: 'تلفون العمل',
      membership_type_label: 'أرغب في الانضمام لعضوية الجمعية بصفتي:',
      regular_opt: 'عضو عادي (٥٠٠ ريال)',
      supporting_opt: 'عضو داعم (٥٠٠ + تبرع)',
      effective_date: 'اعتباراً من تاريخ *',
      declaration_text: 'لقد اطلعت على ضوابط ولوائح الانضمام لعضوية الجمعية العمومية وتعبئة الاستمارة (استمارة طلب عضوية) هي تأكيد باطلاعي وموافقتي على الشروط واللوائح.',
      agree_check: 'أقر باطلاعي وموافقتي التامة على جميع الشروط واللوائح الموضحة أعلاه *',
      submit_btn: 'إرسال طلب العضوية',
      submitting: 'جاري إرسال الطلب...',
      success_title: 'تم تقديم طلب العضوية بنجاح!',
      success_desc: 'شكراً لك، تم استقبال طلب العضوية الخاص بك وسيتم إرسال نسخة منه إلى البريد الرسمي للجمعية وتدقيق البيانات من قبل مجلس الإدارة.',
      ref_number: 'رقم الطلب المرجعي:',
      print_btn: 'طباعة الاستمارة',
      back_to_membership: 'العودة لصفحة العضوية'
    },
    en: {
      title: 'Membership Application Form',
      subtitle: 'Complete your application form to join the General Assembly of Mathwaa Association',
      home: 'Home',
      membership: 'Membership',
      apply_title: 'General Assembly Membership Application Form',
      personal_sec: 'Personal & Contact Information',
      membership_sec: 'Membership Type',
      declaration_sec: 'Declaration & Acknowledgment',
      for_admin_use: 'For Association Use Only',
      full_name: 'Full Name (Quadruple) *',
      dob: 'Date of Birth *',
      pob: 'Place of Birth *',
      national_id: 'ID / Iqama Number *',
      id_issue_place: 'Place of Issue',
      id_issue_date: 'Date of Issue',
      phone: 'Mobile Number *',
      email: 'Email Address *',
      po_box: 'P.O. Box',
      postal_code: 'Postal Code',
      qualification: 'Educational Qualification',
      job_title: 'Occupation / Job Title',
      work_address: 'Work Address',
      work_phone: 'Work Phone',
      membership_type_label: 'I wish to join the General Assembly membership as:',
      regular_opt: 'Regular Member (500 SAR)',
      supporting_opt: 'Supporting Member (500+ Donation)',
      effective_date: 'Effective Date *',
      declaration_text: 'I have read and reviewed the rules and regulations for joining the General Assembly membership, and filling out this form confirms my agreement to the terms and bylaws.',
      agree_check: 'I acknowledge and agree to all terms and regulations stated above *',
      submit_btn: 'Submit Membership Application',
      submitting: 'Submitting Application...',
      success_title: 'Application Submitted Successfully!',
      success_desc: 'Thank you. Your membership application has been received and emailed to the official administration for Board review.',
      ref_number: 'Application Reference #:',
      print_btn: 'Print Application',
      back_to_membership: 'Back to Membership Page'
    }
  }[language];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader 
        title={t.title} 
        description={t.subtitle} 
        breadcrumbs={[
          { label: t.home, to: '/' }, 
          { label: t.membership, to: '/membership' }, 
          { label: t.title }
        ]} 
      />

      <Section className="bg-gray-50/70 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {submitResult ? (
              /* Success Confirmation Card */
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#0E4B33] flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <FaCheckCircle size={48} className="text-[#0E4B33]" />
                </div>
                
                <h2 className="text-3xl font-bold text-[#0E4B33] mb-4">{t.success_title}</h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  {t.success_desc}
                </p>

                <div className="bg-[#0E4B33]/5 border-2 border-[#C89B3C]/40 p-6 rounded-2xl max-w-md mx-auto mb-8 text-center">
                  <span className="text-sm font-semibold text-gray-500 block mb-1">{t.ref_number}</span>
                  <span className="text-3xl font-extrabold text-[#C89B3C] tracking-wider">#{submitResult.submission_id}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E4B33] text-white rounded-xl font-bold hover:bg-[#093524] transition-all shadow-md"
                  >
                    <FaPrint /> {t.print_btn}
                  </button>
                  <Link 
                    to="/membership" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  >
                    {t.back_to_membership}
                  </Link>
                </div>
              </div>
            ) : (
              /* Membership Form */
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                
                {/* Official Header Banner */}
                <div className="bg-[#0E4B33] p-6 md:p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute -left-10 -bottom-10 opacity-10 pointer-events-none">
                    <FaFileContract size={200} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#C89B3C] mb-2">{t.apply_title}</h2>
                  <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto">
                    جمعية مثوى الأهلية | رقم الترخيص: 1000827300
                  </p>
                </div>

                <div className="p-6 md:p-10 space-y-10">
                  
                  {errorMsg && (
                    <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded-xl text-sm font-semibold flex items-center gap-3">
                      <FaInfoCircle size={20} className="shrink-0 text-red-500" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Section 1: Personal Data */}
                  <div>
                    <h3 className="text-xl font-bold text-[#0E4B33] pb-3 border-b-2 border-[#C89B3C]/30 mb-6 flex items-center gap-2">
                      <FaUser className="text-[#C89B3C]" />
                      {t.personal_sec}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name AR */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.full_name}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            name="name_ar"
                            value={formData.name_ar}
                            onChange={handleChange}
                            placeholder="الاسم الرباعي كما هو في الهوية"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaUser className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.dob}</label>
                        <div className="relative">
                          <input 
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaCalendarAlt className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Place of Birth */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.pob}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            name="place_of_birth"
                            value={formData.place_of_birth}
                            onChange={handleChange}
                            placeholder="مكان الميلاد"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaMapMarkerAlt className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* National ID */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.national_id}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            name="national_id"
                            value={formData.national_id}
                            onChange={handleChange}
                            placeholder="رقم الهوية الوطنية أو الإقامة (10 أرقام)"
                            maxLength={10}
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaIdCard className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* ID Issue Place */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.id_issue_place}</label>
                        <input 
                          type="text"
                          name="id_issue_place"
                          value={formData.id_issue_place}
                          onChange={handleChange}
                          placeholder="مكان إصدار الهوية"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                      {/* ID Issue Date */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.id_issue_date}</label>
                        <input 
                          type="date"
                          name="id_issue_date"
                          value={formData.id_issue_date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.phone}</label>
                        <div className="relative">
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="05xxxxxxxx"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaPhone className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.email}</label>
                        <div className="relative">
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                            required
                          />
                          <FaEnvelope className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* PO Box */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.po_box}</label>
                        <input 
                          type="text"
                          name="po_box"
                          value={formData.po_box}
                          onChange={handleChange}
                          placeholder="صندوق البريد"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                      {/* Postal Code */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.postal_code}</label>
                        <input 
                          type="text"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleChange}
                          placeholder="الرمز البريدي"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                      {/* Qualification */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.qualification}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            placeholder="المؤهل العلمي (بكالوريوس، ماجستير، ...)"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                          />
                          <FaGraduationCap className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Job Title */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.job_title}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                            placeholder="الوظيفة أو التخصص"
                            className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                          />
                          <FaBriefcase className="absolute right-4 top-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Work Address */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.work_address}</label>
                        <input 
                          type="text"
                          name="work_address"
                          value={formData.work_address}
                          onChange={handleChange}
                          placeholder="جهة العمل والعنوان"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                      {/* Work Phone */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.work_phone}</label>
                        <input 
                          type="text"
                          name="work_phone"
                          value={formData.work_phone}
                          onChange={handleChange}
                          placeholder="تلفون العمل"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Section 2: Membership Type Selection */}
                  <div>
                    <h3 className="text-xl font-bold text-[#0E4B33] pb-3 border-b-2 border-[#C89B3C]/30 mb-6 flex items-center gap-2">
                      <FaHandHoldingHeart className="text-[#C89B3C]" />
                      {t.membership_sec}
                    </h3>

                    <label className="block text-sm font-bold text-gray-700 mb-4">{t.membership_type_label}</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <label 
                        className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${
                          formData.membership_type === 'regular' 
                            ? 'border-[#0E4B33] bg-[#0E4B33]/5 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio"
                          name="membership_type"
                          value="regular"
                          checked={formData.membership_type === 'regular'}
                          onChange={handleChange}
                          className="w-5 h-5 text-[#0E4B33] focus:ring-[#0E4B33]"
                        />
                        <div>
                          <p className="font-bold text-[#0E4B33]">{t.regular_opt}</p>
                          <p className="text-xs text-gray-500 mt-1">الاشتراك السنوي لجمعية العمومية</p>
                        </div>
                      </label>

                      <label 
                        className={`p-5 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all ${
                          formData.membership_type === 'supporting' 
                            ? 'border-[#C89B3C] bg-[#C89B3C]/10 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio"
                          name="membership_type"
                          value="supporting"
                          checked={formData.membership_type === 'supporting'}
                          onChange={handleChange}
                          className="w-5 h-5 text-[#C89B3C] focus:ring-[#C89B3C]"
                        />
                        <div>
                          <p className="font-bold text-[#C89B3C]">{t.supporting_opt}</p>
                          <p className="text-xs text-gray-500 mt-1">اشتراك إضافي مع دعم وتبرع لبرامج الجمعية</p>
                        </div>
                      </label>
                    </div>

                    <div className="max-w-xs">
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.effective_date}</label>
                      <input 
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0E4B33] focus:bg-white transition-all text-gray-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Section 3: Declaration & Terms */}
                  <div className="bg-amber-50/60 border border-amber-200/80 p-6 md:p-8 rounded-2xl">
                    <h3 className="text-lg font-bold text-[#0E4B33] mb-3 flex items-center gap-2">
                      <FaShieldAlt className="text-[#C89B3C]" />
                      {t.declaration_sec}
                    </h3>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-6 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                      "{t.declaration_text}"
                    </p>

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="w-5 h-5 mt-1 text-[#0E4B33] rounded focus:ring-[#0E4B33]"
                        required
                      />
                      <span className="text-sm font-bold text-gray-800 leading-snug">
                        {t.agree_check}
                      </span>
                    </label>
                  </div>

                  {/* Association Internal Use Only Footer Badge */}
                  <div className="border-t border-dashed border-gray-300 pt-6 text-center text-xs text-gray-400">
                    <span className="inline-block bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full font-semibold mb-2">
                      {t.for_admin_use}
                    </span>
                    <p>قرار مجلس الإدارة بجلسته رقم ( ..... ) وتاريخ ..../..../....هـ - قبول / عدم قبول العضوية</p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-[#0E4B33] hover:bg-[#093524] text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <span>{t.submitting}</span>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>{t.submit_btn}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipApply;
