import { getLocales } from 'react-native-localize';

/**
 * Gets the device's primary language code
 * Returns 'en' as fallback if detection fails or language is not supported
 */
export const getDeviceLanguage = (): string => {
  try {
    const locales = getLocales();
    if (locales && locales.length > 0) {
      const primaryLocale = locales[0];
      const languageCode = primaryLocale.languageCode.toLowerCase();
      
      // List of supported languages in the app
      const supportedLanguages = ['en', 'es']; // Add more as needed
      
      // Return the language if supported, otherwise fallback to 'en'
      return supportedLanguages.includes(languageCode) ? languageCode : 'en';
    }
  } catch (error) {
    console.error('Failed to detect device language:', error);
  }
  
  // Fallback to English
  return 'en';
}; 