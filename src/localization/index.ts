import { LANGUAGES } from '@constants';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getDeviceLanguage } from '../helpers/deviceLanguage';

import { es as esVocabulary } from './es';
import { en as enVocabulary } from './en';
import { tr as trVocabulary } from './tr';

const { en, es, tr } = LANGUAGES;

const resources = {
  [en]: {
    translation: enVocabulary,
  },
  [es]: {
    translation: esVocabulary,
  },
  [tr]: {
    translation: trVocabulary,
  },
};

i18next.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v4',
  lng: getDeviceLanguage(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
