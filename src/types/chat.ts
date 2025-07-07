import { Name } from './story';

// Love chat specific analysis
export interface LoveChatAnalysis {
  chat_participants: Name[];
  total_days_talked: number;
  most_conversation_starts: Name | null;
  average_response_time_seconds: Record<Name, number | null>;
  average_words_per_message: Record<Name, number>;
  top_3_topics: string[];
  most_manipulative: Name | null;
  lies_detected: Record<Name, number>;
  dominant_person: Name | null;
  interest_level: Record<Name, number>;
  mutual_desire_score: Record<Name, number>;
  most_effort: Name | null;
  apology_count: Record<Name, number>;
  i_love_you_count: Record<Name, number>;
  first_love_sentence: string | null;
  most_used_love_words: { phrase: string, count: number }[];
  most_romantic: Name | null;
  laugh_together_count: number;
  funniest_message: string[] | null;
  favorite_love_emoji: { emoji: string, count: number }[];
  relationship_direction: string;
}

// General chat analysis
export interface GeneralChatAnalysis {
  chat_participants: Name[];
  top_3_topics: string[];
  funniest_message: string[] | null;
  message_count: Record<Name, number>;                       // Who sent how many messages
  emoji_usage: Record<Name, string>;                        // Who used which emoji the most
  most_used_phrase: Record<Name, string>;                   // Most texted phrase per person
  ghost_magnet: Name | null;                                // The person most often ghosted
  most_used_censored_word: Record<Name, number>;            // Most used *** word
  total_messages: number;                                   // Total number of messages
  emoji_leaderboard: Record<string, number>;                // Top emojis used in the chat
  peak_hours: number[];                                     // Hours with most activity (0–23) TWO NUBMERS
  total_chat_duration_seconds: number;                      // Time spent chatting (sum of all response gaps)
  streak_days: number;                                      // Max streak of consecutive days chatted
  fastest_responder: Name | null;                           // Who replies the fastest
  general_summary: string;                                  // Plaintext overview of chat
  personal_summary: Record<Name, string>;                   // Summary for each individual
}

// Chat type discriminator
export type ChatType = 'love' | 'general';

// Combined chat interface with type discriminator
export interface Chat {
  id: string;
  type: ChatType;
  title: string;
  participants: Name[];
  analysis: LoveChatAnalysis | GeneralChatAnalysis;
  created_at: Date;
}

export interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  isLoading: boolean;
  isShareFailed: boolean;
  error: string | null;
  sharedChats: string[]; // IDs of chats where user has shared
  sharedStatisticTypeFromSharePopup: string | null;
  showShareOverlay: boolean;
} 