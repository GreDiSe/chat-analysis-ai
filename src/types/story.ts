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
  withTimer?: number; // timer in seconds
  imageWidth?: number;
  imageHeight?: number;
  hasTitle?: boolean;
  summaryOverview?: T[];
  isLongVideo?: boolean; // for displaying videos in larger size
}

export interface FeatureStory<T = TranslationKeysType | string> extends BaseStory<T> {
  subtitle: T;
}

export interface GuideStory<T = TranslationKeysType | string> extends BaseStory<T> {
  subtitle?: T;
  isWelcome?: boolean;
}

export type Story<T = TranslationKeysType | string> = FeatureStory<T> | GuideStory<T>;

export type Name = string;
