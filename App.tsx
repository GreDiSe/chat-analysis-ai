import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import analytics from '@react-native-firebase/analytics';
import { safeLogEvent } from './src/utils/analytics';
import { RootState } from './src/store';
import crashlytics from '@react-native-firebase/crashlytics';

import { store, persist } from './src/store';
import { FeaturesScreen } from './src/screens/features/FeaturesScreen';
import { GuideScreen } from './src/screens/guide/GuideScreen';
import { MainScreen } from './src/screens/main/MainScreen';
import { SettingsScreen } from './src/screens/settings/SettingsScreen';
import { StatisticsScreen } from './src/screens/statistics/StatisticsScreen';
import { SplashScreen } from './src/screens/splash/SplashScreen';
import { PrivacyScreen } from './src/screens/privacy/PrivacyScreen';
import { RootStackParamList } from './src/types/navigation';
import { useGemini } from './src/hooks/useGemini';
import { UserInterviewPopup } from './src/components/modals/UserInterviewPopup';
import { LimitReachedPopup } from './src/components/common/LimitReachedPopup';
import { ErrorScreen } from './src/components/common/ErrorScreen';
import { GlobalUpdatePopup } from './src/components/modals/GlobalUpdatePopup';
import { showUpdatePopup, appActions } from './src/store/slices/appSlice';
import { getAppVersion, isVersionLessThan } from './src/helpers/version';
import { AppDispatch } from '@store';
import { ChatTypeModal } from './src/components/modals/ChatTypeModal';
import { TermsScreen } from './src/screens/terms/TermsScreen';

const { ShareReceiver } = NativeModules;
const shareEmitter = new NativeEventEmitter(ShareReceiver);
const Stack = createStackNavigator<RootStackParamList>();

// Chat Analysis AI – Emotion Insight
// cd %LOCALAPPDATA%\Android\Sdk\emulator
// emulator -avd Pixel_7

const defaultHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error, isFatal) => {
  crashlytics().recordError(error);

  if (__DEV__) {
    console.error(error); // So you still see it in dev
  }

  if (defaultHandler) {
    defaultHandler(error, isFatal);
  }
});

const Navigation = () => {
  const { analyzeWhatsAppExport } = useGemini();
  const routeNameRef = useRef<string>();
  const navigationRef = useRef<any>();
  const chatLength = useSelector((state: RootState) => state.chatReducer.chats.length);
  const dispatch = useDispatch<AppDispatch>();
  const appConfig = useSelector((state: RootState) => state.appReducer.appConfig);
  const selectedChatType = useSelector((state: RootState) => state.appReducer.selectedChatType);
  const pendingAnalysisUri = useRef<string | null>(null);

  useEffect(() => {
    if (selectedChatType && pendingAnalysisUri.current) {
      const uri = pendingAnalysisUri.current;
      pendingAnalysisUri.current = null;
      
      safeLogEvent('chat_exported', {
        platform: Platform.OS,
        uri_type: uri.split('.').pop(),
        existing_chats_count: chatLength,
        is_first_chat: chatLength === 0,
        selected_chat_type: selectedChatType
      });
      
      analyzeWhatsAppExport(uri, selectedChatType as any, navigationRef);
      dispatch(appActions.setSelectedChatType(null));
    }
  }, [selectedChatType, analyzeWhatsAppExport, chatLength]);
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      const sub = shareEmitter.addListener(
        'ShareReceived',
        (event: { urls: string[] }) => {
          event.urls.forEach(uri => {
            // Store the URI and show the chat type modal
            console.log("uri", uri);
            pendingAnalysisUri.current = uri;
            dispatch(appActions.showChatTypeModal());
          });
        }
      );
      return () => {
        sub.remove();
      };
    }
  }, [dispatch]);

  useEffect(() => {
    if (appConfig) {
      const version = getAppVersion();
      const shouldShow = appConfig.show_update_popup && appConfig.update_popup_title && appConfig.force_update_version && isVersionLessThan(version, appConfig.force_update_version);
      if (shouldShow) {
        dispatch(showUpdatePopup());
      }
    }
  }, [appConfig, dispatch]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
          safeLogEvent('screen_changed', {
            from_screen: previousRouteName,
            to_screen: currentRouteName
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen 
          name="Guide" 
          component={GuideScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
        />
        <Stack.Screen 
          name="Privacy" 
          component={PrivacyScreen}
        />
        <Stack.Screen 
          name="Statistics" 
          component={StatisticsScreen}
          options={{
            gestureEnabled: true,
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Terms" 
          component={TermsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
          <Navigation />
          <UserInterviewPopup />
          <LimitReachedPopup />
          <ErrorScreen />
          <GlobalUpdatePopup />
          <ChatTypeModal />
      </PersistGate>
    </Provider>
  );
};

export default App;
