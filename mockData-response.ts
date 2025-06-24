import { LoveChatAnalysis } from "./src/types/chat";

const chatAnalysis: LoveChatAnalysis = {
    total_days_talked: 218,
    most_conversation_starts: 'Маман',
    average_response_time_seconds: {
      Дмитро: 1252,
      Маман: 3216
    },
    average_words_per_message: {
      Дмитро: 3,
      Маман: 5
    },
    top_3_topics: ['продаж авто', 'питання справи', 'турбота Маман'],
    most_manipulative: 'Маман',
    lies_detected: {
      Дмитро: 1,
      Маман: 0
    },
    dominant_person: 'Маман',
    interest_level: {
      Дмитро: 0.6,
      Маман: 0.9
    },
    mutual_desire_score: {
      Дмитро: 0.5,
      Маман: 0.8
    },
    most_effort: 'Маман',
    apology_count: {
      Дмитро: 0,
      Маман: 0
    },
    i_love_you_count: {
      Дмитро: 0,
      Маман: 0
    },
    first_love_sentence: null,
    most_used_love_words: [],
    most_romantic: null,
    laugh_together_count: 0,
    funniest_message: ['В малійки😁', 'Нове смішне', 'Гола боса'],
    favorite_love_emoji: [
      { emoji: "❤️", count: 15 }, 
      { emoji: "🥰", count: 10 }, 
      { emoji: "😘", count: 7 }
    ],
    relationship_direction: 'Мати та син. Турбота матері та стриманість сина.'
  };

  export default chatAnalysis;