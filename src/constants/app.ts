export const LANGUAGES = {
  en: 'en',
  es: 'es',
  tr: 'tr',
} as const;

export type LanguageType = keyof typeof LANGUAGES;
