import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, titleAr, descriptionAr, keywords }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const baseTitle = isArabic ? 'جمعية مثوى لإكرام الموتى' : 'Mathwa Association';
  const pageTitle = isArabic 
    ? (titleAr ? `${titleAr} | ${baseTitle}` : baseTitle)
    : (title ? `${title} | ${baseTitle}` : baseTitle);

  const defaultDescAr = 'جمعية مرخصة رسمياً من المركز الوطني لتنمية القطاع غير الربحي برقم 1000827300، نعمل لنرتقي، ونعطي لنُسعد، معاً نحو مجتمع متكافل ومستدام لخدمة وإكرام الموتى.';
  const defaultDescEn = 'Mathwa Association for honoring the dead. Officially Licensed by NCNP #1000827300. Working together towards a sustainable community.';
  
  const pageDescription = isArabic
    ? (descriptionAr || defaultDescAr)
    : (description || defaultDescEn);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  );
};

export default SEO;
