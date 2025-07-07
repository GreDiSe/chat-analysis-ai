import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '../../types';
import { fetchAppConfig } from '../../firebase/appConfig';
import { RootState, AppDispatch } from '../index';
import { ThunkAction } from 'redux-thunk';
import { createOrUpdateUser } from '../../firebase/auth';
import { UserResponse } from '../../types/user';
import { chatActions } from './chatSlice';
import { getDeviceLanguage } from '../../helpers/deviceLanguage';

export interface IAppState {
  language: string;
  isLoading: boolean;
  error: string | null;
  isPremiumPopupVisible: boolean;
  isUserInterviewPopupOpen: boolean;
  userId: string | null;
  isLimitReached: boolean;
  numberOfAnalysesLeft: number;
  totalAnalyses: number;
  hasUserInterviewPopupShown: boolean;
  appConfig: AppConfig | null;
  appConfigLoading: boolean;
  appConfigError: string | null;
  isUpdatePopupVisible: boolean;
  showChatTypeModal: boolean;
  selectedChatType: string | null;
  hasProAccess: boolean;
  showPaywallOverlay: boolean;
  paywallType: 'love' | 'general';
}

const initialState: IAppState = {
  language: getDeviceLanguage(),
  isLoading: false,
  error: null,
  isPremiumPopupVisible: false,
  isUserInterviewPopupOpen: false,
  userId: null,
  isLimitReached: false,
  numberOfAnalysesLeft: 5,
  totalAnalyses: 0,
  hasUserInterviewPopupShown: false,
  appConfig: null,
  appConfigLoading: false,
  appConfigError: null,
  isUpdatePopupVisible: false,
  showChatTypeModal: false,
  selectedChatType: null,
  hasProAccess: false,
  showPaywallOverlay: false,
  paywallType: 'love',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    showPremiumPopup: (state) => {
      state.isPremiumPopupVisible = true;
    },
    hidePremiumPopup: (state) => {
      state.isPremiumPopupVisible = false;
    },
    showUserInterviewPopup: (state) => {
      state.isUserInterviewPopupOpen = true;
    },
    hideUserInterviewPopup: (state) => {
      state.isUserInterviewPopupOpen = false;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    showLimitReached: (state) => {
      state.isLimitReached = true;
    },
    hideLimitReached: (state) => {
      state.isLimitReached = false;
    },
    incrementAnalyses: (state) => {
      state.totalAnalyses += 1;
      state.numberOfAnalysesLeft -= 1;
    },
    checkAndShowUserInterviewPopup: (state) => {
        state.isUserInterviewPopupOpen = true;
        state.hasUserInterviewPopupShown = true;
    },
    setUserInterviewPopupShown: (state, action: PayloadAction<boolean>) => {
      state.hasUserInterviewPopupShown = action.payload;
    },
    setAppConfig: (state, action: PayloadAction<AppConfig>) => {
      state.appConfig = action.payload;
      state.appConfigLoading = false;
      state.appConfigError = null;
    },
    setAppConfigLoading: (state, action: PayloadAction<boolean>) => {
      state.appConfigLoading = action.payload;
    },
    setAppConfigError: (state, action: PayloadAction<string | null>) => {
      state.appConfigError = action.payload;
      state.appConfigLoading = false;
    },
    showUpdatePopup: (state) => {
      state.isUpdatePopupVisible = true;
    },
    hideUpdatePopup: (state) => {
      state.isUpdatePopupVisible = false;
    },
    showChatTypeModal: (state) => {
      state.showChatTypeModal = true;
    },
    hideChatTypeModal: (state) => {
      state.showChatTypeModal = false;
    },
    setSelectedChatType: (state, action: PayloadAction<string | null>) => {
      state.selectedChatType = action.payload;
    },
    setNumberOfAnalysesLeft: (state, action: PayloadAction<number>) => {
      state.numberOfAnalysesLeft = action.payload;
    },
    setTotalAnalyses: (state, action: PayloadAction<number>) => {
      state.totalAnalyses = action.payload;
    },
    setProAccess: (state, action: PayloadAction<boolean>) => {
      state.hasProAccess = action.payload;
    },
    showPaywallOverlay: (state, action: PayloadAction<{ type: 'love' | 'general' } | undefined>) => {
      state.showPaywallOverlay = true;
      if (action.payload?.type) {
        state.paywallType = action.payload.type;
      }
    },
    hidePaywallOverlay: (state) => {
      state.showPaywallOverlay = false;
    },
  },
});

export const { 
  setLanguage, 
  setLoading, 
  setError, 
  showPremiumPopup, 
  hidePremiumPopup, 
  showUserInterviewPopup, 
  hideUserInterviewPopup,
  showLimitReached,
  hideLimitReached,
  incrementAnalyses,
  checkAndShowUserInterviewPopup,
  setUserInterviewPopupShown,
  setAppConfig,
  setAppConfigLoading,
  setAppConfigError,
  showUpdatePopup,
  hideUpdatePopup,
  showChatTypeModal,
  hideChatTypeModal,
  setSelectedChatType,
  setNumberOfAnalysesLeft,
  setTotalAnalyses,
  setProAccess,
  showPaywallOverlay,
  hidePaywallOverlay,
} = appSlice.actions;

export const getLanguage = (state: { appReducer: IAppState }) => state.appReducer.language;
export const getLoading = (state: { appReducer: IAppState }) => state.appReducer.isLoading;
export const getError = (state: { appReducer: IAppState }) => state.appReducer.error;
export const getProAccess = (state: { appReducer: IAppState }) => state.appReducer.hasProAccess;

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions; 

export const fetchAppConfigThunk = () : ThunkAction<void, RootState, undefined, any> => async (dispatch: AppDispatch) => {
  try {
    dispatch(setAppConfigLoading(true));
    const config = await fetchAppConfig();
    dispatch(setAppConfig(config));
  } catch (error: any) {
    console.log("error", error);
    dispatch(setAppConfigError(error.message || 'Failed to fetch app config'));
  }
};

export const syncUserStatsToFirestore = () : ThunkAction<void, RootState, undefined, any> => async (dispatch, getState) => {
  const state = getState().appReducer;
  const { userId, totalAnalyses, numberOfAnalysesLeft } = state;
  if (!userId) return;
  try {
    await createOrUpdateUser(userId, {
      totalAnalyses,
      numberOfAnalysesLeft,
    });
  } catch (e) {
    // Optionally handle error (e.g., dispatch(setError(...)))
    console.error('Failed to sync user stats to Firestore', e);
  }
};

export const initializeFromUserData = (userData: UserResponse): ThunkAction<void, RootState, undefined, any> => async (dispatch) => {
  try {
  dispatch(appActions.setNumberOfAnalysesLeft(userData.numberOfAnalysesLeft ?? initialState.numberOfAnalysesLeft));
  dispatch(appActions.setTotalAnalyses(userData.totalAnalyses ?? initialState.totalAnalyses));
  dispatch(appActions.setUserInterviewPopupShown(userData.userInterviewPopup?.isShown ?? initialState.hasUserInterviewPopupShown));
  
  if(userData.chats) {
    dispatch(chatActions.setChatsLocal(userData.chats.map(chat => ({
      ...chat,
      created_at: new Date(chat.created_at._seconds * 1000)
    })) ?? []));
  }
  if(userData.sharedChats) {
    userData.sharedChats.forEach(chatId => {
      dispatch(chatActions.addSharedChatLocal(chatId));
    });
  }
  } catch (error: any) {
    console.error('Failed to initialize from user data', error);
  }
};
