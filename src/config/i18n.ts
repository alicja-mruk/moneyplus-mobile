import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next, useTranslation } from 'react-i18next';

import translationEN from 'assets/locale/en.json';

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(err => {
    console.warn('Failed to initialize i18next', err);
  });

export const useTranslationPrefix = (prefix: string) => {
  const { t } = useTranslation();
  return (key: string) => t(`${prefix}.${key}`);
};

export default i18n;