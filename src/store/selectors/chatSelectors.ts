import { RootState } from '../index';
import { Chat } from '../../types/chat';

export const selectAllChats = (state: RootState) => state.chatReducer.chats;

export const selectChatById = (state: RootState, chatId: string): Chat | undefined => {
  return state.chatReducer.chats.find((_, index) => String(index + 1) === chatId);
};

export const selectSharedChats = (state: RootState) => state.chatReducer.sharedChats;