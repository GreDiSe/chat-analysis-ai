import analytics from '@react-native-firebase/analytics';
import env from '../../env.json';
import { AppEventsLogger } from 'react-native-fbsdk-next';

export const safeLogEvent = async (
  eventName: string,
  params: Record<string, any> = {}
): Promise<void> => {
  const finalParams = Object.entries(params).reduce((acc, [key, value]) => ({
    ...acc,
    [`CUSTOM_${key}`]: String(value)
  }), {
    ts: Date.now(),
  });

  try {
    if(env.NAME_ENV === 'dev') {
      console.log('DEV MODE -> Sending event:', eventName, finalParams);
    }
    
    if(env.NAME_ENV !== 'dev') {
      console.log('PROD MODE -> Sending event:', eventName, finalParams);
      await analytics().logEvent(eventName, finalParams);

      try {
        AppEventsLogger.logEvent(eventName, params);
      } catch (error) {
        console.log('Error logging event to Facebook', error);
      }
    }
  } catch (e) {
    console.warn('❌ Failed to send event:', eventName, e);
  }
    
  
}; 