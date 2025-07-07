import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserResponse } from 'src/types/user';

export const signInAnonymously = async () => {
  const { user } = await auth().signInAnonymously();
  return user;
};

export const createOrUpdateUser = async (userId: string, data: Record<string, any>) => {
  const userRef = firestore().collection('users').doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    await userRef.set({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
      lastLogin: firestore.FieldValue.serverTimestamp(),
      isAnonymous: true,
      isFeatureScreenShowed: false,
    }, { merge: true });
  } else {
    await userRef.set({
      ...data,
      lastLogin: firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  }
};

export const getCurrentUser = () => auth().currentUser;

export const getUserData = async (userId: string): Promise<UserResponse | null> => {
  const userDoc = await firestore().collection('users').doc(userId).get();
  return userDoc.data() as UserResponse | null;
};

export const updateUserFeatureScreenShowed = async (userId: string) => {
  await firestore().collection('users').doc(userId).update({
    isFeatureScreenShowed: true,
  });
}; 