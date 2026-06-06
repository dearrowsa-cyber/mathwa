import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './en.json'
import arTranslations from './ar.json'

// Create namespaces from JSON sections
const createNamespaces = (translations) => {
  const namespaces = {}
  Object.keys(translations).forEach(key => {
    namespaces[key] = translations[key]
  })
  return namespaces
}

const enNamespaces = createNamespaces(enTranslations)
const arNamespaces = createNamespaces(arTranslations)

// Build resources with multiple namespaces
const resources = {
  en: enNamespaces,
  ar: arNamespaces
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (typeof localStorage !== 'undefined' ? localStorage.getItem('language') : null) || 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: Object.keys(enNamespaces),
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })

export default i18n
