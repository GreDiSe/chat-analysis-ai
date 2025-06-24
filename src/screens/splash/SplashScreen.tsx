import { ImageBackgroundContainer, Logo } from '@components';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './style';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { requestAppInit } from '@actions';
import auth from '@react-native-firebase/auth';
import { createOrUpdateUser, getUserData, signInAnonymously } from '../../firebase/auth';
import { setLanguage, fetchAppConfigThunk, initializeFromUserData } from '../../store/slices/appSlice';
import i18n from '../../localization';
import { LANGUAGES } from '@constants';

type Props = StackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Wait for Firebase Auth to initialize
        await new Promise<void>((resolve) => {
          const unsubscribe = auth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve();
          });
        });

        // Check if we need to sign in anonymously
        let currentUser = auth().currentUser;
        if (!currentUser) {
          currentUser = await signInAnonymously();
          await createOrUpdateUser(currentUser.uid, {});
        }

        // Get user data and set language
        const userData = await getUserData(currentUser.uid);
        console.log("userData", userData);
        if (userData?.language) {
          dispatch(setLanguage(userData.language));
          i18n.changeLanguage(userData.language);
        } else {
          // Set default language if not set
          dispatch(setLanguage(LANGUAGES.en));
          i18n.changeLanguage(LANGUAGES.en);
        }
        
        // Initialize store with user data
        if (userData) {
          dispatch(initializeFromUserData(userData));
        }
        
        dispatch(requestAppInit({ hasUser: true }));
        dispatch(fetchAppConfigThunk());

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Navigate based on whether Features screen was shown before
        if (userData?.isFeatureScreenShowed) {
          navigation.replace('Guide');
          // navigation.replace('Features');
          // navigation.replace('Main');
        } else {
          navigation.replace('Guide');
        }
      } catch (error) {
        console.error('Auth Error:', error);
        // Still navigate to Features after delay, even if auth fails
        await new Promise(resolve => setTimeout(resolve, 500));
        navigation.replace('Features');
      }
    };

    initializeApp();
  }, [dispatch, navigation]);

  return (
    <ImageBackgroundContainer>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo size="splash" />
            <Text style={{ marginTop: 24, fontSize: 24, fontWeight: 'bold', color: '#222', textAlign: 'center' }}>
              Chat Analysis AI
            </Text>
            <Text style={{ fontSize: 18, color: '#555', textAlign: 'center', marginTop: 6 }}>
              Emotion Insight
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackgroundContainer>
  );
};
