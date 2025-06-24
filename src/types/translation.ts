import { en as enVocabulary } from '../localization/en';

type NestedKeyOf<T, Prefix extends string = ''> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? `${Prefix}${K}.${NestedKeyOf<T[K]>}`
      : `${Prefix}${K}`
    : never;
}[keyof T];

export type TranslationKeysType = NestedKeyOf<typeof enVocabulary>;
