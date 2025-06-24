import { LANGUAGES } from '@constants';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { es as esVocabulary } from './es';
import { en as enVocabulary } from './en';

const { en, es } = LANGUAGES;

const resources = {
  [en]: {
    translation: enVocabulary,
  },
  [es]: {
    translation: esVocabulary,
  },
};

i18next.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v4',
  lng: en,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
