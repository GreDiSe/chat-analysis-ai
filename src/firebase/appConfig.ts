import firestore from '@react-native-firebase/firestore';
import { AppConfig } from '../types';

export const fetchAppConfig = async (): Promise<AppConfig> => {
  const doc = await firestore().collection('app_config').doc('DEFAULT').get();

  if (!doc.exists) throw new Error('App config not found');
  return doc.data() as AppConfig;
}; 