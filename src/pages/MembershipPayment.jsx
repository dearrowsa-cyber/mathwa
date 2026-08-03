import React, { useState } from 'react';
import { Section, Container } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaUser, FaHandHoldingHeart, FaExternalLinkAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const MembershipPayment = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const location = useLocation();
  const initialType = location.state?.type || 'regular';
  const [membershipType, setMembershipType] = useState(initialType);
  const isAr = language === 'ar';

  const membershipOptions = {
    regular: { price: 300, label_ar: 'العضوية العادية', label_en: 'Regular Membership', fee_ar: '300 ريال سعودي', fee_en: '300 SAR' },
    supporting: { price: 500, label_ar: 'العضوية الداعمة', label_en: 'Supporting Membership', fee_ar: '500 ريال سعودي', fee_en: '500 SAR' },
  };

  const selected = membershipOptions[membershipType];

  const t = {
    en: {
      title: 'Membership Payment',
      subtitle: 'Pay your annual membership fees securely',
      home: 'Home',
      membership: 'Membership',
      selectType: 'Select Membership Type',
      amount: 'Amount to Pay',
      proceedToPayment: 'Proceed to Payment Portal',
    },
    ar: {
      title: 'سداد الاشتراك',
      subtitle: 'قم بسداد رسوم العضوية السنوية بأمان',
      home: 'الرئيسية',
      membership: 'العضوية',
      selectType: 'اختر نوع العضوية',
      amount: 'المبلغ المطلوب سداده',
      proceedToPayment: 'الانتقال لبوابة الدفع',
    }
  }[language];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">

            {/* Membership Type Selector */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800 text-center">{t.selectType}</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMembershipType('regular')}
                  className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${membershipType === 'regular' ? 'border-[#0E4B33] bg-[#0E4B33]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <FaUser size={28} className={membershipType === 'regular' ? 'text-[#0E4B33]' : 'text-gray-400'} />
                  <span className={`font-bold text-sm ${membershipType === 'regular' ? 'text-[#0E4B33]' : 'text-gray-600'}`}>
                    {isAr ? 'عضو عادي' : 'Regular Member'}
                  </span>
                  <span className={`text-lg font-bold ${membershipType === 'regular' ? 'text-[#C89B3C]' : 'text-gray-400'}`}>
                    {isAr ? '300 ر.س' : '300 SAR'}
                  </span>
                </button>
                <button
                  onClick={() => setMembershipType('supporting')}
                  className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${membershipType === 'supporting' ? 'border-[#C89B3C] bg-[#C89B3C]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <FaHandHoldingHeart size={28} className={membershipType === 'supporting' ? 'text-[#C89B3C]' : 'text-gray-400'} />
                  <span className={`font-bold text-sm ${membershipType === 'supporting' ? 'text-[#C89B3C]' : 'text-gray-600'}`}>
                    {isAr ? 'عضو داعم' : 'Supporting Member'}
                  </span>
                  <span className={`text-lg font-bold ${membershipType === 'supporting' ? 'text-[#C89B3C]' : 'text-gray-400'}`}>
                    {isAr ? '500 ر.س' : '500 SAR'}
                  </span>
                </button>
              </div>
            </div>

            {/* Amount Display */}
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <p className="text-gray-500 mb-2">{t.amount}</p>
              <h2 className="text-4xl font-bold" style={{ color: '#0E4B33' }}>{isAr ? selected.fee_ar : selected.fee_en}</h2>
              <p className="text-sm mt-2" style={{ color: '#C89B3C' }}>{isAr ? selected.label_ar : selected.label_en}</p>
            </div>

            <div className="text-center">
              <Link 
                to={`/membership-apply?type=${membershipType}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 text-lg font-bold text-white rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#0E4B33' }}
              >
                {isAr ? 'الانتقال لاستمارة طلب العضوية' : 'Proceed to Application Form'}
              </Link>
            </div>
            
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipPayment;
