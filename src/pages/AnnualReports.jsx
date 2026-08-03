import React, { useState } from 'react';
import { Container, Section } from '../components/Common';
import PageHeader from '../components/PageHeader';
import { FaFilePdf, FaDownload, FaEye, FaFilter } from 'react-icons/fa';

const AnnualReports = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Reports & Financials',
      subtitle: 'Browse and download the association\'s official reports and financial statements.',
      home: 'Home',
      governance: 'Governance',
      file_name: 'Document Name',
      year: 'Year',
      type: 'Type',
      publish_date: 'Publish Date',
      size: 'Size',
      actions: 'Actions',
      view: 'View',
      download: 'Download',
      filters: {
        all: 'All Documents',
        annual: 'Annual Reports',
        financial: 'Financial Statements',
        board: 'Board Reports',
        auditor: 'External Auditor Reports'
      }
    },
    ar: {
      title: 'التقارير والقوائم المالية',
      subtitle: 'تصفح وتحميل التقارير الرسمية والقوائم المالية الخاصة بالجمعية.',
      home: 'الرئيسية',
      governance: 'الحوكمة والإفصاح',
      file_name: 'اسم الملف',
      year: 'السنة',
      type: 'النوع',
      publish_date: 'تاريخ النشر',
      size: 'حجم الملف',
      actions: 'الإجراء',
      view: 'عرض',
      download: 'تحميل',
      filters: {
        all: 'جميع الوثائق',
        annual: 'تقارير سنوية',
        financial: 'قوائم مالية',
        board: 'تقارير مجلس الإدارة',
        auditor: 'تقارير المراجع الخارجي'
      }
    }
  }[language];

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.governance, to: '/governance' },
    { label: t.title }
  ];

  const documents = [];


  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDocs = activeFilter === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === activeFilter);

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      
      <Section className="bg-gray-50">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 px-4 font-bold">
              <FaFilter /> {isAr ? 'تصفية:' : 'Filter:'}
            </div>
            {Object.entries(t.filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === key 
                    ? 'bg-[#0E4B33] text-white shadow-md' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#0E4B33] text-white">
                    <th className="py-4 px-6 font-bold w-1/3">{t.file_name}</th>
                    <th className="py-4 px-6 font-bold">{t.year}</th>
                    <th className="py-4 px-6 font-bold">{t.type}</th>
                    <th className="py-4 px-6 font-bold">{t.publish_date}</th>
                    <th className="py-4 px-6 font-bold">{t.size}</th>
                    <th className="py-4 px-6 font-bold text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <FaFilePdf size={24} className="text-red-500 flex-shrink-0" />
                          <span className="font-bold text-[#0E4B33]">
                            {isAr ? doc.name_ar : doc.name_en}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-gray-700">{doc.year}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                          {t.filters[doc.type]}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{doc.date}</td>
                      <td className="py-4 px-6 text-gray-600">{doc.size}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <a href={doc.url} className="p-2 text-gray-500 hover:text-[#0E4B33] hover:bg-gray-100 rounded-lg transition" title={t.view}>
                            <FaEye size={18} />
                          </a>
                          <a href={doc.url} className="p-2 text-[#C89B3C] hover:text-white hover:bg-[#C89B3C] rounded-lg transition" title={t.download}>
                            <FaDownload size={18} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDocs.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-gray-500">
                        {isAr ? 'لا توجد وثائق متاحة.' : 'No documents available.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AnnualReports;
