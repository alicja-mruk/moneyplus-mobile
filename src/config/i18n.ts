import translationEN from '../locale/en.json';
import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: translationEN,
  },
};

// TODO: implement system language detection - probably not for MVP
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});
