import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, ChatState, LoveChatAnalysis, GeneralChatAnalysis, ChatType } from '../../types/chat';
import { mockData } from '../../data/mockStoryData';
import { RootState } from '../index';
import { ThunkAction } from 'redux-thunk';
import { createOrUpdateUser } from '../../firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState: ChatState = {
  // chats: mockData,
  chats: [],
  selectedChatId: null,
  isLoading: false,
  error: null,
  sharedChats: [],
  isShareFailed: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatsLocal: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsShareFailed: (state, action: PayloadAction<boolean>) => {
      state.isShareFailed = action.payload;
    },
    addSharedChatLocal: (state, action: PayloadAction<string>) => {
      if (!state.sharedChats.includes(action.payload)) {
        state.sharedChats.push(action.payload);
      }
    },
    addAnalysisResultLocal: (state, action: PayloadAction<Chat>) => {
      state.chats.unshift(action.payload); 
    },
  },
});

export const syncSharedChatsToFirestore = () : ThunkAction<void, RootState, undefined, any> => async (dispatch, getState) => {
  const state = getState();
  const userId = state.appReducer.userId;
  const sharedChats = state.chatReducer.sharedChats;
  if (!userId) return;
  try {
    await createOrUpdateUser(userId, { sharedChats });
  } catch (e) {
    console.warn('Failed to sync sharedChats to Firestore', e);
  }
};

export const addSharedChat = (chatId: string): ThunkAction<void, RootState, undefined, any> => async (dispatch) => {
  dispatch(chatActions.addSharedChatLocal(chatId));
  dispatch(syncSharedChatsToFirestore());
};

export const setChats = (chats: Chat[]): ThunkAction<void, RootState, undefined, any> => async (dispatch, getState) => {
  dispatch(chatActions.setChatsLocal(chats));
  const state = getState();
  const userId = state.appReducer.userId;
  if (!userId) return;
  try {
    await createOrUpdateUser(userId, { chats });
  } catch (e) {
    console.warn('Failed to sync chats to Firestore', e);
  }
};

export const saveAnalysisResult = (
  analysis: LoveChatAnalysis | GeneralChatAnalysis,
  chatType: ChatType,
  title: string,
  participants: string[]
): ThunkAction<Promise<string | null>, RootState, undefined, any> => async (dispatch, getState) => {
  const state = getState();
  const userId = state.appReducer.userId;
  
  if (!userId) {
    console.warn('No user ID available for saving analysis result');
    return null;
  }

  try {
    // Create new chat object
    const newChat: Chat = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: chatType,
      title,
      participants: participants as any,
      analysis,
      created_at: new Date(),
    };

    dispatch(chatActions.addAnalysisResultLocal(newChat));

    const userRef = firestore().collection('users').doc(userId);
    await userRef.update({
      chats: firestore.FieldValue.arrayUnion(newChat),
    });

    return newChat.id;

  } catch (error) {
    console.error('Failed to save analysis result:', error);  
    console.log("Analysis", analysis);
    dispatch(chatActions.setError('Failed to save analysis result'));
    return null;
  }
};

export const chatActions = { ...chatSlice.actions, addSharedChat, setChats, saveAnalysisResult };
export const chatReducer = chatSlice.reducer;