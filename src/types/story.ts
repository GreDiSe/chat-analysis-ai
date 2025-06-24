import { TranslationKeysType } from './translation';

export interface BaseStory<T = TranslationKeysType | string> {
  id: string;
  title: T;
  gradient: string[];
  cta: {
    buttonText: T;
    disclaimer: T;
  };
  secondaryCta?: {
    buttonText: T;
    onPress: () => void;
  };
  ctaSubtitle?: T;
  isWelcome?: boolean;
  video?: any;
  image?: number;
}

export interface FeatureStory<T = TranslationKeysType | string> extends BaseStory<T> {
  subtitle: T;  
  data: {
    person1: {
      name: T;
      percentage: number;
    };
    person2: {
      name: T;
      percentage: number;
    };
  };
}

export interface GuideStory<T = TranslationKeysType | string> extends BaseStory<T> {
  subtitle?: T;
  data?: never;
  isWelcome?: boolean;
}

export type Story<T = TranslationKeysType | string> = FeatureStory<T> | GuideStory<T>;

export type Name = string;
