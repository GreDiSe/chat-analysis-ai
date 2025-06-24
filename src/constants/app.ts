export const LANGUAGES = {
  en: 'en',
  es: 'es',
} as const;

export type LanguageType = keyof typeof LANGUAGES;
