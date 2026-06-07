import React, { useState } from 'react';
import { Section, Container, Button } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const MembershipPayment = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Membership Payment',
      subtitle: 'Pay your annual membership fees securely',
      home: 'Home',
      membership: 'Membership',
      amount: 'Amount to Pay',
      fee: '300 SAR',
      paymentMethod: 'Select Payment Method',
      creditCard: 'Credit / Mada Card',
      bankTransfer: 'Bank Transfer',
      cardNumber: 'Card Number',
      expiry: 'Expiry Date',
      cvv: 'CVV',
      nameOnCard: 'Name on Card',
      payNow: 'Pay Now',
      secure: 'Secure Payment',
    },
    ar: {
      title: 'سداد الاشتراك',
      subtitle: 'قم بسداد رسوم العضوية السنوية بأمان',
      home: 'الرئيسية',
      membership: 'العضوية',
      amount: 'المبلغ المطلوب سداده',
      fee: '300 ريال سعودي',
      paymentMethod: 'اختر طريقة الدفع',
      creditCard: 'بطاقة ائتمانية / مدى',
      bankTransfer: 'تحويل بنكي',
      cardNumber: 'رقم البطاقة',
      expiry: 'تاريخ الانتهاء',
      cvv: 'رمز الأمان (CVV)',
      nameOnCard: 'الاسم على البطاقة',
      payNow: 'ادفع الآن',
      secure: 'دفع آمن وموثوق',
    }
  }[language];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.membership, to: '/membership' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <p className="text-gray-500 mb-2">{t.amount}</p>
              <h2 className="text-4xl font-bold" style={{ color: '#0E4B33' }}>{t.fee}</h2>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800">{t.paymentMethod}</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-[#C89B3C] bg-[#C89B3C]/5' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <FaCreditCard size={24} className={paymentMethod === 'card' ? 'text-[#C89B3C]' : 'text-gray-400'} />
                  <span className="font-semibold text-sm">{t.creditCard}</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bank' ? 'border-[#C89B3C] bg-[#C89B3C]/5' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <FaLock size={24} className={paymentMethod === 'bank' ? 'text-[#C89B3C]' : 'text-gray-400'} />
                  <span className="font-semibold text-sm">{t.bankTransfer}</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.cardNumber}</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.expiry}</label>
                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.cvv}</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.nameOnCard}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all" />
                </div>

                <Button type="button" variant="primary" className="w-full py-4 text-lg mt-6 flex items-center justify-center gap-2">
                  <FaLock /> {t.payNow}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <FaLock className="text-green-500" /> {t.secure}
                </p>
              </form>
            )}

            {paymentMethod === 'bank' && (
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-600">
                  {isAr ? 'سيتم توفير تفاصيل الحساب البنكي قريباً.' : 'Bank account details will be provided soon.'}
                </p>
              </div>
            )}
            
          </div>
        </Container>
      </Section>
    </>
  );
};

export default MembershipPayment;
