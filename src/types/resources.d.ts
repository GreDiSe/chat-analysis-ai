import 'i18next';

import { en as enVocabulary } from '../localization/en';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enVocabulary;
    };
  }
}
