import { ImageBackgroundContainer, Logo } from '@components';
import { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './style';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { requestAppInit } from '@actions';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { createOrUpdateUser, getUserData, signInAnonymously } from '../../firebase/auth';
import { setLanguage, fetchAppConfigThunk, initializeFromUserData, appActions } from '../../store/slices/appSlice';
import i18n from '../../localization';
import { getDeviceLanguage } from '../../helpers/deviceLanguage';
import { useRevenueCat } from '../../hooks/useRevenueCat';

type Props = StackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkProAccess } = useRevenueCat();

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
        }

        // Get device language
        const deviceLanguage = getDeviceLanguage();
        
        // Get user data first
        const userData = await getUserData(currentUser.uid);
        console.log("userData", userData);
        
        // Determine which language to use
        let languageToUse = deviceLanguage;
        if (userData?.language) {
          languageToUse = userData.language;
          // languageToUse = 'tr';
        }
        
        dispatch(setLanguage(languageToUse));
        i18n.changeLanguage(languageToUse);
        
        await createOrUpdateUser(currentUser.uid, {
          language: languageToUse
        });
        
        if (userData) {
          dispatch(initializeFromUserData(userData));
          
          // Set pro access status from Firestore
          if (userData.hasProAccess) {
            dispatch(appActions.setProAccess(true));
          }
        }
        
        // Check pro access status from RevenueCat
        await checkProAccess();
        
        dispatch(requestAppInit({ hasUser: true }));
        dispatch(fetchAppConfigThunk());

        await new Promise(resolve => setTimeout(resolve, 1));
        
        // Navigate based on whether Features screen was shown before
        if (userData?.isFeatureScreenShowed) {
          navigation.replace('Guide');
          // navigation.replace('Features');
          // navigation.replace('Main');
        } else {
          navigation.replace('Guide');
          // navigation.replace('Features');
        }
      } catch (error: any) {
        console.error('Auth Error:', error);
        crashlytics().recordError(error);
        Alert.alert('Error', error.message);
      }
    };

    initializeApp();
  }, [dispatch, navigation, checkProAccess]);

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
