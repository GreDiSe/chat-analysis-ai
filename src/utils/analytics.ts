import analytics from '@react-native-firebase/analytics';
import env from '../../env.json';

export const safeLogEvent = async (
  eventName: string,
  params: Record<string, any> = {}
): Promise<void> => {
  const finalParams = Object.entries(params).reduce((acc, [key, value]) => ({
    ...acc,
    [`CUSTOM_${key}`]: value
  }), {
    ts: Date.now(),
  });

  try {
    if(env.NAME_ENV === 'dev') {
      console.log('DEV MODE -> Sending event:', eventName, finalParams);
    }
    
    if(env.NAME_ENV !== 'dev') {
      await analytics().logEvent(eventName, finalParams);
    }
  } catch (e) {
    console.warn('❌ Failed to send event:', eventName, e);
  }
}; 