import { Chat } from './chat';

export type ChatResponse = Chat & {
  id: string;
  created_at: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface UserResponse {
  AIResponses?: string[];
  chats?: ChatResponse[];
  sharedChats?: string[];
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  isAnonymous?: boolean;
  isFeatureScreenShowed?: boolean;
  language?: string;
  lastLogin?: {
    _seconds: number;
    _nanoseconds: number;
  };
  numberOfAnalysesLeft?: number;
  totalAnalyses?: number;
  userInterviewPopup?: {
    email?: string;
    name?: string;
    isShown: boolean;
    phone?: string;
  };
  hasProAccess?: boolean;
  proAccessPurchasedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  proAccessType?: 'purchased' | 'restored';
} 