import './localization';
import 'react-native-gesture-handler';

import { persist, store } from '@store';
import { COLORS } from '@styles';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootStack } from './navigation/RootStack.tsx';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '440585427260-6l9r24e4mfnno5p2ecd26lv4leksefs5.apps.googleusercontent.com',
});

const Root = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate persistor={persist} loading={null}>
          <SafeAreaProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={COLORS.white}
            />
            <RootStack />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Root;
