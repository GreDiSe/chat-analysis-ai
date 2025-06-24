import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Features: undefined;
  Guide: {
    skipWelcomeScreen?: boolean;
  } | undefined;
  Main: undefined;
  Settings: undefined;
  Privacy: undefined;
  Terms: undefined;
  Statistics: {
    chatId: string;
  };
};

export type NavigationProp = StackNavigationProp<RootStackParamList>; 