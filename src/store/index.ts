import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import { appReducer, IAppState } from './slices/appSlice';
import { chatReducer } from './slices/chatSlice';
import { ChatState } from '../types/chat';
import { rootSaga } from './saga';
import errorReducer from './slices/errorSlice';

const sagaMiddleware = createSagaMiddleware();

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['language', 'userId'],
  stateReconciler: autoMergeLevel2,
};

const chatPersistConfig = {
  key: 'chat',
  storage: AsyncStorage,
  whitelist: ['sharedChats'],
  stateReconciler: autoMergeLevel2,
};

const persistedAppReducer = persistReducer<IAppState>(appPersistConfig, appReducer);
const persistedChatReducer = persistReducer<ChatState>(chatPersistConfig, chatReducer);

const store = configureStore({
  reducer: {
    appReducer: persistedAppReducer,
    chatReducer: persistedChatReducer,
    error: errorReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

const persist = persistStore(store);

// A nice way to clear AsyncStorage while
// persist.purge();

export { persist, store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
