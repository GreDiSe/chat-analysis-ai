import { ExtendedButton } from '@components';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { replace, StackScreens } from '@navigation';

import { HeaderLogoContainer, SaveAreaAuthContainer } from '../auth/UI';
import { styles } from './style';

const TickIcon = () => (
  <View style={styles.tickContainer}>
    <Text style={styles.tick}>✓</Text>
  </View>
);

export const ComingSoonScreen = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const currentUser = auth().currentUser;
      
      if (!currentUser) {
        console.error('No user is signed in');
        setIsLoading(false);
        return;
      }

      const userDoc = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get();

      if (userDoc.exists) {
        setIsSubscribed(userDoc.data()?.isSubscribed || false);
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        console.error('No user is signed in');
        return;
      }

      const userRef = firestore().collection('users').doc(currentUser.uid);

      await userRef.set({
        email: currentUser.email,
        isSubscribed: true,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  // const handleSignOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     await auth().signOut();
  //     replace(StackScreens.AuthStack);
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };

  if (isLoading) {
    return (
      <SaveAreaAuthContainer style={styles.container}>
        <Text>Loading...</Text>
      </SaveAreaAuthContainer>
    );
  }

  return (
    <SaveAreaAuthContainer style={styles.container}>
      <HeaderLogoContainer />
      <Text style={styles.title}>Sorry!</Text>
      <Text style={styles.subtitle}>
        The app is not available in your region. We are working on the launching.
      </Text>
      <View style={styles.subscribeContainer}>
        <Text style={styles.subscribeText}>
          {isSubscribed 
            ? "Thank you for subscribing! We'll keep you updated."
            : "Please subscribe and we will inform you on your email soon."
          }
        </Text>
        <View style={styles.buttonContainer}>
          {isSubscribed && <TickIcon />}
          <ExtendedButton
            title={isSubscribed ? "Subscribed" : "Subscribe for Updates"}
            onPress={handleSubscribe}
            style={styles.subscribeButton}
            disabled={isSubscribed}
          />
        </View>
      </View>
      {/*<ExtendedButton*/}
      {/*  title="Sign Out"*/}
      {/*  onPress={handleSignOut}*/}
      {/*  style={styles.signOutButton}*/}
      {/*/>*/}
    </SaveAreaAuthContainer>
  );
}; 