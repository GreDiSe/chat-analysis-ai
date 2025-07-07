import axios from 'axios';
import { LoveChatAnalysis, GeneralChatAnalysis, ChatType } from '../types/chat';
import firestore from '@react-native-firebase/firestore';
// import { chatEmulation } from '../../mockData-chat_emulation';
// import { chatEmulationGirls } from '../../mockData-chat_emulation_girls';
// import { chatEmulationLove } from '../../mockData-love';
import { safeLogEvent } from '../utils/analytics';

const GEMINI_API_KEY = 'AIzaSyBDhlJL6hiUoWsAVnFyUgRr-AlB9TNV3gc';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

const getLovePrompt = `Analyze the following personal chat conversation and return the results in this exact TypeScript interface structure (below). Include realistic estimations based on tone, timing, message patterns, and relationship dynamics.
Use these units:
Time in seconds or days
Percentages as values between 0.0 and 1.0
Counts as whole numbers
For all name-related fields, use exact participant names
Output only a single valid JSON object matching this interface:
Answer in original language of the conversation.
Plese in percentages per person do not show same percentages, show different 20-80 (not 50-50).
Try to be as accurate as possible, but not too specific.
Try to be as romantic as possible, but not too romantic.
Try to answer all questions in the response object, return null only if you can't answer.
Never return 'null' as a string for any field. If you can't answer, return null.

type Name = string;
interface ChatAnalysis {
  chat_participants: Name[];
  total_days_talked: number; // total days (days)
  most_conversation_starts: Name | null; // who starts most (name)
  average_response_time_seconds: Record<Name, number | null>; // avg reply time (seconds)
  average_words_per_message: Record<Name, number>; // avg words per message (count)
  top_3_topics: string[]; // most discussed 3 topics 2-4 words (keywords) (EXACTLY array 3 items) (EXACTLY in language that is used in the conversation)
  most_manipulative: Name | null; // perceived manipulator (name)
  lies_detected: Record<Name, number>; // lies detected (count)
  dominant_person: Name | null; // conversational leader (name)
  interest_level: Record<Name, number>; // engagement level (0.0–1.0)
  mutual_desire_score: Record<Name, number>; // desire to connect (0.0–1.0)
  most_effort: Name | null; // highest contribution (name)
  apology_count: Record<Name, number>; // apology frequency (count)
  i_love_you_count: Record<Name, number>; // "I love you" count (count)
  first_love_sentence: string | null; // first love phrase (text)
  most_used_love_words: { phrase: string, count: number }[]; // love words used (word + count) (EXACTLY array 3 items) (EXACTLY  in language that is used in the conversation) (No duplicates, no empty strings, no emojis here)
  most_romantic: Name | null; // most romantic speaker (name)
  laugh_together_count: number; // shared laughs (count)
  funniest_message: string[] | null; // most funny message (text) HAVE TO BE TOP 3 messages (array 3 items) (EXACTLY  in language that is used in the conversation)
  favorite_love_emoji: { emoji: string, count: number }[] | null; // most used emoji (character) MAX TOP 5 (array 3-5 items) (EXACTLY  in language that is used in the conversation)
  relationship_direction: string; // interesting relationship status/trajectory (text EXACTLY 10-12 words only) (EXACTLY in language that is used in the conversation)
}

Analyze the following chat and return the result as a raw JSON object (not code block, no markdown, no triple backticks, no explanation).
Only return a valid JSON object that matches this TypeScript interface exactly:`;

const getGeneralPrompt = `Analyze the following chat conversation and return the results in this exact TypeScript interface structure (below). Include realistic estimations based on tone, timing, message patterns, and conversation dynamics.
Use these units:
Time in seconds or days
Percentages as values between 0.0 and 1.0
Counts as whole numbers
For all name-related fields, use exact participant names
Output only a single valid JSON object matching this interface:
Answer in original language of the conversation.
Plese in percentages per person do not show same percentages, show different 20-80 (not 50-50).
Try to be as accurate as possible, but not too specific.
Try to be as funny as possible, but not too funny.
Try to answer all questions in the response object, return null only if you can't answer.
Never return 'null' as a string for any field. If you can't answer, return null.

type Name = string;
export interface GeneralChatAnalysis {
  chat_participants: Name[];
  top_3_topics: string[];                                  // TOP 3 topics discussed (array 3 items) (EXACTLY in language that is used in the conversation)
  funniest_message: string[] | null;                        // TOP 3 funniest messages (array 3 items) (EXACTLY in language that is used in the conversation)
  message_count: Record<Name, number>;                      // Who sent how many messages
  emoji_usage: Record<Name, string>;                        // Who used which emoji the most (1 emoji in string by person)
  most_used_phrase: Record<Name, string>;                   // Most texted phrase per person (text 3-4 words) (EXACTLY in language that is used in the conversation)
  ghost_magnet: Name | null;                                // The person most often ghosted
  most_used_censored_word: Record<Name, number>;            // Most used bad word by person
  total_messages: number;                                   // Total number of messages
  emoji_leaderboard: Record<string, number>;                // Top emojis used in the chat (1 emoji in string, but leaderboard is top 5)
  peak_hours: number[];                                     // Hours with most activity (0–23) TWO NUBMERS
  total_chat_duration_seconds: number;                      // Time spent chatting (sum of all response gaps)
  streak_days: number;                                      // Max streak of consecutive days chatted (days)
  fastest_responder: Name | null;                           // Who replies the fastest
  general_summary: string;                                  // Plaintext overview of chat (text EXACTLY 10-12 words only) (EXACTLY in language that is used in the conversation)
  personal_summary: Record<Name, string>;                   // Summary for each individual (text EXACTLY 5-7 words only) (EXACTLY in language that is used in the conversation)
}


Analyze the following chat and return the result as a raw JSON object (not code block, no markdown, no triple backticks, no explanation).
Only return a valid JSON object that matches this TypeScript interface exactly:`;

export function sanitizeJsonString(input: string): string {
  return input
    // Removes comments: // line comments or /* block comments */
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')

    // Removes trailing commas before closing brackets or braces
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')

    // Removes markdown formatting like ```json or ```
    .replace(/```json/g, '')
    .replace(/```/g, '')

    // Removes invisible characters (non-breaking spaces, zero-width spaces, etc.)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')

    // Replaces invalid values like NaN, undefined, Infinity, -Infinity with null
    .replace(/\b(NaN|undefined|Infinity|-Infinity)\b/g, 'null')

    // Trims leading and trailing whitespace
    .trim();
}


export async function analyzeChat(
  discussion: string,
  chatType: ChatType,
  userId?: string
): Promise<LoveChatAnalysis | GeneralChatAnalysis | null> {
  let textResponse = "";
  try {
    const prompt = chatType === 'love' ? getLovePrompt : getGeneralPrompt;

    const response = await axios.post(
      `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt + " " + discussion }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    textResponse = text;
    
    if (!text) {
      console.error('No text in Gemini response');
      return null;
    }

    let parsed: any = null;
    try {
      const cleanedText = sanitizeJsonString(text);
      parsed = JSON.parse(cleanedText);
    } catch {
      const jsonMatch = text.match(/```json\s*({[\s\S]*?})\s*```/) || text.match(/({[\s\S]*})/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1]);
      }
    }

    if (parsed && userId) {
      try {
        const userRef = firestore().collection('users').doc(userId);
        await userRef.update({
          AIResponses: firestore.FieldValue.arrayUnion(text)
        });
      } catch (e) {
        console.error('Failed to append AI response to Firestore', e);
      }
    }

    console.log("parsed", parsed);

    if (parsed) return parsed;
    console.error('Could not parse Gemini response as JSON');
    return null;
  } catch (error: any) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    console.log("AiResponseError", textResponse);
    
    // Handle 503 error specifically
    if (error?.response?.status === 503) {
      safeLogEvent('model_unavailable', {
        status_code: 503,
        error_message: error?.response?.data?.error?.message || 'Service Unavailable',
        user_id: userId,
        chat_type: chatType
      });
      
      console.error('AIResponsesErrors: model unavailable - status code:', 503, 'error:', error?.response?.data || error.message);
    }
    
    try {
      const userRef = firestore().collection('users').doc(userId);
      await userRef.update({
        AIResponsesErrors: firestore.FieldValue.arrayUnion({
          error: textResponse,
          status_code: error?.response?.status || 'unknown',
          error_details: error?.response?.data || error.message,
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) {
      console.error('Failed to append AI response to Firestore', e);
    }
    return null;
  }
}
