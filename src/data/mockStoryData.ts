import { Chat } from '../types/chat';

// Mock data with the new structure
export const mockData: Chat[] = [
  {
    id: '1',
    type: 'love',
    title: 'Dmytro & Petti',
    participants: ['Dmytro', 'Petti'],
    analysis: {
      chat_participants: ['Dmytro', 'Petti'],
      total_days_talked: 218,
      most_conversation_starts: 'Petti',
      average_response_time_seconds: {
        Dmytro: 1252,
        Petti: 3216
      },
      average_words_per_message: {
        Dmytro: 3,
        Petti: 5
      },
      top_3_topics: ['продаж авто субєкт ндв відділеня номер 43', 'питання справи', 'турбота Маман'],
      most_manipulative: 'Petti',
      lies_detected: {
        Dmytro: 1,
        Petti: 0
      },
      dominant_person: 'Petti',
      interest_level: {
        Дмитро: 0.6,
        Petti: 0.9
      },
      mutual_desire_score: {
        Dmytro: 0.5,
        Petti: 0.8
      },
      most_effort: 'Petti',
      apology_count: {
        Dmytro: 9,
        Petti: 3
      },
      i_love_you_count: {
        Dmytro: 6,
        Petti: 4
      },
      first_love_sentence: "Привіт підстрежися",
      most_used_love_words: [
        { phrase: "Я тебе люблю", count: 10 }, 
        { phrase: "Я тебе кохаю", count: 5 }, 
        { phrase: "Я тебе бажаю", count: 3 }
      ],
      most_romantic: "Dmytro",
      laugh_together_count: 6,
      funniest_message: ['В малійки😁', 'Нове смішне', 'Гола боса'],
      favorite_love_emoji: [
        { emoji: "❤️", count: 15 }, 
        { emoji: "🥰", count: 10 }, 
        { emoji: "😘", count: 7 }
      ],
      relationship_direction: 'Мати та син. Турбота матері та стриманість сина.'
    },
    created_at: new Date()
  },
  {
    id: '2',
    type: 'general',
    title: 'Дмитро & Маман',
    participants: ['Дмитро', 'Маман'],
    analysis: {
      chat_participants: ['Дмитро', 'Маман'],
      top_3_topics: ["weekend plans", "work complaints", "funny memes"],
      funniest_message: ["I swear my fridge just growled at me 😳"],
      message_count: {
        Alice: 182,
        Bob: 210,
      },
      emoji_usage: {
        Alice: "😂",
        Bob: "👍",
      },
      most_used_phrase: {
        Alice: "no way that's",
        Bob: "did you see",
      },
      ghost_magnet: "Alice",
      most_used_censored_word: {
        Alice: 3,
        Bob: 7,
      },
      total_messages: 392,
      emoji_leaderboard: {
        "😂": 45,
        "👍": 31,
        "🔥": 22,
        "😅": 19,
        "❤️": 17,
      },
      peak_hours: [20, 21],
      total_chat_duration_seconds: 92480,
      streak_days: 14,
      fastest_responder: "Bob",
      general_summary: "Mostly casual chat with lots of memes and emojis.",
      personal_summary: {
        Alice: "Sarcastic and expressive with emojis",
        Bob: "Quick replies, shares many memes",
      }
    },
    created_at: new Date()
  },
  {
    id: '3',
    type: 'love',
    title: 'Sarah & Mike',
    participants: ['Sarah', 'Mike'],
    analysis: {
      chat_participants: ['Sarah', 'Mike'],
      total_days_talked: 365,
      most_conversation_starts: 'Mike',
      average_response_time_seconds: {
        Sarah: 1800,
        Mike: 900
      },
      average_words_per_message: {
        Sarah: 8,
        Mike: 6
      },
      top_3_topics: ['future plans', 'daily life', 'shared memories'],
      most_manipulative: 'Sarah',
      lies_detected: {
        Sarah: 2,
        Mike: 1
      },
      dominant_person: 'Sarah',
      interest_level: {
        Sarah: 0.85,
        Mike: 0.95
      },
      mutual_desire_score: {
        Sarah: 0.9,
        Mike: 0.95
      },
      most_effort: 'Mike',
      apology_count: {
        Sarah: 5,
        Mike: 8
      },
      i_love_you_count: {
        Sarah: 12,
        Mike: 15
      },
      first_love_sentence: "I've been thinking about you all day",
      most_used_love_words: [
        { phrase: "I love you", count: 27 }, 
        { phrase: "miss you", count: 15 }, 
        { phrase: "thinking of you", count: 10 }
      ],
      most_romantic: "Mike",
      laugh_together_count: 12,
      funniest_message: ['Remember that time at the beach? 😂', 'Your dance moves are legendary!', 'That cat video was everything!'],
      favorite_love_emoji: [
        { emoji: "❤️", count: 25 }, 
        { emoji: "😍", count: 18 }, 
        { emoji: "🥰", count: 12 }
      ],
      relationship_direction: 'Strong emotional connection with balanced communication and mutual respect.'
    },
    created_at: new Date()
  },
  {
    id: '4',
    type: 'love',
    title: 'Emma & James',
    participants: ['Emma', 'James'],
    analysis: {
      chat_participants: ['Emma', 'James'],
      total_days_talked: 180,
      most_conversation_starts: 'Emma',
      average_response_time_seconds: {
        Emma: 600,
        James: 1200
      },
      average_words_per_message: {
        Emma: 10,
        James: 7
      },
      top_3_topics: ['work life', 'travel dreams', 'family updates'],
      most_manipulative: 'James',
      lies_detected: {
        Emma: 0,
        James: 3
      },
      dominant_person: 'Emma',
      interest_level: {
        Emma: 0.7,
        James: 0.2
      },
      mutual_desire_score: {
        Emma: 0.75,
        James: 0.65
      },
      most_effort: 'Emma',
      apology_count: {
        Emma: 4,
        James: 6
      },
      i_love_you_count: {
        Emma: 8,
        James: 5
      },
      first_love_sentence: "You make me smile every day",
      most_used_love_words: [
        { phrase: "love you", count: 13 }, 
        { phrase: "miss you", count: 8 }, 
        { phrase: "can't wait to see you", count: 5 }
      ],
      most_romantic: "Emma",
      laugh_together_count: 8,
      funniest_message: ['That restaurant story was hilarious!', 'Your impression of the boss 😂', 'The dog video you sent!'],
      favorite_love_emoji: [
        { emoji: "❤️", count: 20 }, 
        { emoji: "😊", count: 15 }, 
        { emoji: "😘", count: 10 }
      ],
      relationship_direction: 'Aquí hay amor, pero alguien se está guardando algo — y el chat lo sabe!'
    },
    created_at: new Date()
  },
  {
    id: '5',
    type: 'general',
    title: 'John & Lisa & Mark & Anna',
    participants: ['John', 'Lisa', 'Mark', 'Anna'],
    analysis: {
      chat_participants: ['John', 'Lisa', 'Mark', 'Anna'],
      top_3_topics: ["project updates", "meeting schedules", "team events"],
      funniest_message: ["Mark's coffee machine impression during the meeting 😂"],
      message_count: {
        John: 813,
        Lisa: 189,
        Mark: 156,
        Anna: 7
      },
      emoji_usage: {
        John: "👍",
        Lisa: "🎉",
        Mark: "😂",
        Anna: "✨"
      },
      most_used_phrase: {
        John: "Ya cállate, porfa, con amor",
        Lisa: "Te lo juro por Snoopy",
        Mark: "No entendí, pero te apoyo",
        Anna: "Estoy, pero no estoy"
      },
      ghost_magnet: "Mark",
      most_used_censored_word: {
        John: 2,
        Lisa: 1,
        Mark: 5,
        Anna: 1
      },
      total_messages: 800,
      emoji_leaderboard: {
        "👍": 78,
        "🎉": 45,
        "😂": 42,
        "✨": 35,
        "🔥": 28
      },
      peak_hours: [10, 11, 15],
      total_chat_duration_seconds: 172800,
      streak_days: 30,
      fastest_responder: "Anna",
      general_summary: "Professional team chat with a good balance of work and casual conversation.",
      personal_summary: {
        John: "Organized and task-focused",
        Lisa: "Encouraging and supportive",
        Mark: "Humorous and casual",
        Anna: "Efficient and responsive"
      }
    },
    created_at: new Date()
  },
  {
    id: '6',
    type: 'general',
    title: 'Rachel & Tom & Sophie & David & Emma',
    participants: ['Rachel', 'Tom', 'Sophie', 'David', 'Emma'],
    analysis: {
      chat_participants: ['Rachel', 'Tom', 'Sophie', 'David', 'Emma'],
      top_3_topics: ["book discussions", "reading recommendations", "meeting plans"],
      funniest_message: ["That plot twist had me falling off my chair! 📚"],
      message_count: {
        Rachel: 167,
        Tom: 145,
        Sophie: 189,
        David: 123,
        Emma: 156
      },
      emoji_usage: {
        Rachel: "📚",
        Tom: "🤔",
        Sophie: "💭",
        David: "👍",
        Emma: "✨"
      },
      most_used_phrase: {
        Rachel: "what did you think",
        Tom: "interesting perspective",
        Sophie: "I recommend",
        David: "good point",
        Emma: "let's discuss"
      },
      ghost_magnet: "David",
      most_used_censored_word: {
        Rachel: 0,
        Tom: 1,
        Sophie: 0,
        David: 2,
        Emma: 0
      },
      total_messages: 780,
      emoji_leaderboard: {
        "📚": 89,
        "💭": 67,
        "✨": 45,
        "🤔": 42,
        "👍": 38
      },
      peak_hours: [19, 20, 21],
      total_chat_duration_seconds: 259200,
      streak_days: 45,
      fastest_responder: "Sophie",
      general_summary: "Engaged book discussion group with diverse reading preferences.",
      personal_summary: {
        Rachel: "Thoughtful and analytical",
        Tom: "Philosophical and deep",
        Sophie: "Enthusiastic and knowledgeable",
        David: "Concise and practical",
        Emma: "Creative and insightful"
      }
    },
    created_at: new Date()
  },
  // New minimal love chat
  {
    id: '7',
    type: 'love',
    title: 'Alex & Sam',
    participants: ['Alex', 'Sam'],
    analysis: {
      chat_participants: ['Alex', 'Sam'],
      total_days_talked: 30,
      most_conversation_starts: 'Alex',
      average_response_time_seconds: {},
      average_words_per_message: {},
      top_3_topics: [],
      most_manipulative: null as any,
      lies_detected: {
        Alex: 0,
        Sam: 1
      },
      dominant_person: null as any,
      interest_level: {
        Alex: 0.8,
        Sam: 0.7
      },
      mutual_desire_score: {},
      most_effort: 'Alex',
      apology_count: {},
      i_love_you_count: {},
      first_love_sentence: "Hey, I've been thinking about you",
      most_used_love_words: [
        { phrase: "miss you", count: 5 }, 
        { phrase: "thinking of you", count: 3 }
      ],
      most_romantic: "Alex",
      laugh_together_count: 2,
      funniest_message: ['That was funny!', 'Remember that time?'],
      favorite_love_emoji: [
        { emoji: "❤️", count: 8 }, 
        { emoji: "😊", count: 5 }
      ],
      relationship_direction: 'New relationship with growing connection.'
    },
    created_at: new Date()
  },
  // New minimal general chat
  {
    id: '8',
    type: 'general',
    title: 'Max & Lily & Chris',
    participants: ['Max', 'Lily', 'Chris'],
    analysis: {
      chat_participants: ['Max', 'Lily', 'Chris'],
      top_3_topics: ["plans", "updates", "jokes"],
      funniest_message: ["That was hilarious! 😂"],
      message_count: {
        Max: 45,
        Lily: 38,
        Chris: 42
      },
      emoji_usage: {
        Max: "👍",
        Lily: "😂",
        Chris: "🎉"
      },
      most_used_phrase: {
        Max: "let's meet",
        Lily: "sounds good",
        Chris: "anyone free"
      },
      ghost_magnet: "Chris",
      most_used_censored_word: {
        Max: 1,
        Lily: 0,
        Chris: 2
      },
      total_messages: undefined as any,
      emoji_leaderboard: {},
      peak_hours: [18, 19],
      total_chat_duration_seconds: undefined as any,
      streak_days: undefined as any,
      fastest_responder: undefined as any,
      general_summary: "New group chat with casual conversation.",
      personal_summary: {
        Max: "Organizer",
        Lily: "Quick responder",
        Chris: "Occasional participant"
      }
    },
    created_at: new Date()
  },
  {
    id: '9',
    type: 'love',
    title: 'Elif & Can Tr',
    participants: ['Elif', 'Can'],
    analysis: {
      chat_participants: ['Elif', 'Can'],
      total_days_talked: 147,
      most_conversation_starts: 'Elif',
      average_response_time_seconds: {
        Elif: 1120,
        Can: 2840
      },
      average_words_per_message: {
        Elif: 9,
        Can: 4
      },
      top_3_topics: ['ilişki sorunları', 'gelecek planları', 'özlem'],
      most_manipulative: 'Can',
      lies_detected: {
        Elif: 0,
        Can: 2
      },
      dominant_person: 'Elif',
      interest_level: {
        Elif: 0.9,
        Can: 0.4
      },
      mutual_desire_score: {
        Elif: 0.75,
        Can: 0.3
      },
      most_effort: 'Elif',
      apology_count: {
        Elif: 7,
        Can: 1
      },
      i_love_you_count: {
        Elif: 10,
        Can: 2
      },
      first_love_sentence: "Seni düşündükçe içim acıyor",
      most_used_love_words: [
        { phrase: "seni seviyorum", count: 12 },
        { phrase: "özledim", count: 8 },
        { phrase: "hep yanındayım", count: 4 }
      ],
      most_romantic: "Elif",
      laugh_together_count: 3,
      funniest_message: ['Senin horlamanı bile özledim 😂', 'Evde yalnız kalınca bile tartışıyoruz 😅'],
      favorite_love_emoji: [
        { emoji: "💔", count: 9 },
        { emoji: "🥺", count: 7 },
        { emoji: "❤️", count: 6 }
      ],
      relationship_direction: 'Elif seviyor, Can uzaklaşıyor... ama hâlâ bir umut var mı?'
    },
    created_at: new Date()
  }
]; 