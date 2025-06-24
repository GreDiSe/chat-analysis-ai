import { useDispatch, useSelector } from 'react-redux';
import { analyzeChat } from '../helpers/gemini';
import { ChatType } from '../types/chat';
import { copyContentUriToFile, unzipWhatsAppExport, readChatTxt } from '../utils/fileHandling';
import { RootState, AppDispatch } from '../store';
import { appActions, syncUserStatsToFirestore } from '../store/slices/appSlice';
import { chatActions } from '../store/slices/chatSlice';
import { showError } from '../store/slices/errorSlice';
import { safeLogEvent } from '../utils/analytics';

interface UseGeminiReturn {
  isLoading: boolean;
  error: string | null;
  analyzeWhatsAppExport: (contentUri: string, chatType: ChatType, navigationRef?: any) => Promise<void>;
  numberOfAnalysesLeft: number;
  totalAnalyses: number;
}

export function useGemini(): UseGeminiReturn {
  const dispatch = useDispatch<AppDispatch>();
  
  const { numberOfAnalysesLeft, totalAnalyses, isLoading, error, sharedChats, hasUserInterviewPopupShown } = useSelector((state: RootState) => ({
    numberOfAnalysesLeft: state.appReducer.numberOfAnalysesLeft,
    totalAnalyses: state.appReducer.totalAnalyses,
    isLoading: state.chatReducer.isLoading,
    error: state.chatReducer.error,
    sharedChats: state.chatReducer.sharedChats,
    hasUserInterviewPopupShown: state.appReducer.hasUserInterviewPopupShown,
  }));

  const userId = useSelector((state: RootState) => state.appReducer.userId);
  const chatLimitSymbols = useSelector((state: RootState) => state.appReducer.appConfig?.chat_limit_symbols);
  const chatLength = useSelector((state: RootState) => state.chatReducer.chats.length);

  const checkAndIncrementAnalysis = () => {
    if (numberOfAnalysesLeft <= 0) {
      dispatch(appActions.showLimitReached());
      return false;
    } else {
      dispatch(appActions.incrementAnalyses());
      
      return true;
    }
  };

  const analyzeWhatsAppExport = async (contentUri: string, chatType: ChatType, navigationRef?: any) => {
    try {
      dispatch(chatActions.setLoading(true));
      dispatch(chatActions.setError(null));

      const isIncremented = checkAndIncrementAnalysis();
      if (!isIncremented) {
        dispatch(appActions.showLimitReached());
        dispatch(appActions.hideChatTypeModal());
        return;
      }

      const zipPath = await copyContentUriToFile(contentUri);
      const dir = await unzipWhatsAppExport(zipPath);
      let chatText = await readChatTxt(dir);
      
      if (chatLimitSymbols && chatText.length > chatLimitSymbols) {
        const originalLength = chatText.length;
        chatText = chatText.slice(0, chatLimitSymbols);
        safeLogEvent('chat_text_truncated', {
          user_id: userId,
          truncated_to: chatLimitSymbols,
          original_length: originalLength
        });
      }
      
      const result = await analyzeChat(chatText, chatType, userId || undefined);
      
      if (!result) {
        dispatch(appActions.hideChatTypeModal());
        throw new Error('Failed to analyze chat');
      }

      // Save analysis result to Redux and Firestore
      const participants = result.chat_participants; 
      const title = result.chat_participants.join(' & ');
      
      const chatId = await dispatch(chatActions.saveAnalysisResult(result, chatType, title, participants));
      dispatch(syncUserStatsToFirestore());
      
      safeLogEvent('analysis_completed_successfully', {
        chat_type: chatType,
        participants_count: participants.length,
        user_id: userId,
        existing_chats_count: chatLength,
        is_first_chat: chatLength === 0
      });
      
      // Navigate to Statistics screen with the new chat ID after successful analysis
      if (navigationRef?.current && chatId) {
        navigationRef.current.navigate('Statistics', {
          chatId: chatId
        });
        dispatch(appActions.hideChatTypeModal());

        // Check if the user has the shared chats, and if so, show the user interview popup
        setTimeout(() => {
          // Check if the user has the shared chats, and if so, show the user interview popup
          if(sharedChats.length > 0 && totalAnalyses > 1 && !hasUserInterviewPopupShown) {
            dispatch(appActions.checkAndShowUserInterviewPopup());
          }
        }, 1_000);
      }
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze WhatsApp export. Please try again.';
      dispatch(chatActions.setError(errorMessage));
      dispatch(showError({ 
        message: errorMessage,
        title: 'Analysis Error, try again later'
      }));
      console.error('WhatsApp analysis error:', err);
      
      safeLogEvent('analysis_failed', {
        error_message: errorMessage,
        user_id: userId,
      });
    } finally {
      dispatch(chatActions.setLoading(false));
    }
  };

  return {
    isLoading,
    error,
    analyzeWhatsAppExport,
    numberOfAnalysesLeft,
    totalAnalyses
  };
} 