import { Chat, LoveChatAnalysis, GeneralChatAnalysis } from '../types/chat';

// Utility function to check if data is valid and not empty
const isValidData = (data: any): boolean => {
  if (data === null || data === undefined) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === 'object') return Object.keys(data).length > 0;
  return true;
};

// Random sorter function using Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export type StatisticType = 
  | 'days-talked' 
  | 'conversation-starter' 
  | 'response-time' 
  | 'words-per-message'
  | 'top-topics'
  | 'manipulation'
  | 'dominant-person'
  | 'interest-level'
  | 'desire-level'
  | 'effort'
  | 'apologies'
  | 'i-love-you'
  | 'first-love-sentence'
  | 'most-used-love-words'
  | 'romantic-person'
  | 'laugh-together'
  | 'funniest-message'
  | 'favorite-love-emoji'
  | 'relationship-direction'
  | 'message-count'
  | 'emoji-usage'
  | 'most-texted-phrase'
  | 'most-used-censored-word'
  | 'ghost-magnet'
  | 'emoji-usage-by-person'
  | 'peak-hours'
  | 'streak-days'
  | 'fast-replier'
  | 'chat-summary';

const loveStatisticsTypes: StatisticType[] = [
  'days-talked',
  'conversation-starter',
  'response-time',
  'words-per-message',
  'top-topics',
  'manipulation',
  'dominant-person',
  'interest-level',
  'desire-level',
  'effort',
  'apologies',
  'i-love-you',
  'first-love-sentence',
  'most-used-love-words',
  'romantic-person',
  'laugh-together',
  'funniest-message',
  'favorite-love-emoji',
  'relationship-direction'
];

const generalStatisticsTypes: StatisticType[] = [
  'message-count',
  'emoji-usage',
  'most-texted-phrase',
  'most-used-censored-word',
  'ghost-magnet',
  'emoji-usage-by-person',
  'peak-hours',
  'streak-days',
  'fast-replier',
  'chat-summary'
];

export const getStoryTypesByChatType = (chat: Chat): StatisticType[] => {
  const { type, analysis } = chat;
  
  let filteredTypes: StatisticType[] = [];
  
  if (type === 'love') {
    const loveAnalysis = analysis as LoveChatAnalysis;
    filteredTypes = loveStatisticsTypes.filter(storyType => {
      switch (storyType) {
        case 'days-talked':
          return isValidData(loveAnalysis.total_days_talked);
        case 'conversation-starter':
          return isValidData(loveAnalysis.most_conversation_starts);
        case 'response-time':
          return isValidData(loveAnalysis.average_response_time_seconds);
        case 'words-per-message':
          return isValidData(loveAnalysis.average_words_per_message);
        case 'top-topics':
          return isValidData(loveAnalysis.top_3_topics);
        case 'manipulation':
          return isValidData(loveAnalysis.most_manipulative) && isValidData(loveAnalysis.lies_detected);
        case 'dominant-person':
          return isValidData(loveAnalysis.dominant_person);
        case 'interest-level':
          return isValidData(loveAnalysis.interest_level);
        case 'desire-level':
          return isValidData(loveAnalysis.mutual_desire_score);
        case 'effort':
          return isValidData(loveAnalysis.most_effort);
        case 'apologies':
          return isValidData(loveAnalysis.apology_count);
        case 'i-love-you':
          return isValidData(loveAnalysis.i_love_you_count);
        case 'first-love-sentence':
          return isValidData(loveAnalysis.first_love_sentence);
        case 'most-used-love-words':
          return isValidData(loveAnalysis.most_used_love_words);
        case 'romantic-person':
          return isValidData(loveAnalysis.most_romantic);
        case 'laugh-together':
          return isValidData(loveAnalysis.laugh_together_count);
        case 'funniest-message':
          return isValidData(loveAnalysis.funniest_message);
        case 'favorite-love-emoji':
          return isValidData(loveAnalysis.favorite_love_emoji);
        case 'relationship-direction':
          return isValidData(loveAnalysis.relationship_direction);
        default:
          return true;
      }
    });
  } else {
    const generalAnalysis = analysis as GeneralChatAnalysis;
    filteredTypes = generalStatisticsTypes.filter(storyType => {
      switch (storyType) {
        case 'message-count':
          return isValidData(generalAnalysis.message_count);
        case 'emoji-usage':
          return isValidData(generalAnalysis.emoji_leaderboard);
        case 'most-texted-phrase':
          return isValidData(generalAnalysis.most_used_phrase);
        case 'most-used-censored-word':
          return isValidData(generalAnalysis.most_used_censored_word);
        case 'ghost-magnet':
          return isValidData(generalAnalysis.ghost_magnet);
        case 'emoji-usage-by-person':
          return isValidData(generalAnalysis.emoji_usage);
        case 'peak-hours':
          return isValidData(generalAnalysis.peak_hours) && isValidData(generalAnalysis.total_chat_duration_seconds);
        case 'streak-days':
          return isValidData(generalAnalysis.streak_days);
        case 'fast-replier':
          return isValidData(generalAnalysis.fastest_responder);
        case 'chat-summary':
          return isValidData(generalAnalysis.general_summary) && isValidData(generalAnalysis.personal_summary);
        default:
          return true;
      }
    });
  }
  
  // Return shuffled array of filtered story types
  return shuffleArray(filteredTypes);
}; 