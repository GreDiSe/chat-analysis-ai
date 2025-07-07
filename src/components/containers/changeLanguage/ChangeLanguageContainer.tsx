import { LANGUAGES, LanguageType } from '@constants';
import { getLanguage, setLanguage } from '../../../store/slices/appSlice';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { createOrUpdateUser, getCurrentUser } from '../../../firebase/auth';
import i18n from '../../../localization';

interface IChangeLanguageContainer {
  style?: ViewStyle;
}

export const ChangeLanguageContainer = ({
  style,
}: IChangeLanguageContainer) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector(getLanguage);

  const handleSelectLanguage = async (selectedLang: LanguageType) => {
    if (selectedLang !== language) {
      try {
        // Update Redux state
        dispatch(setLanguage(selectedLang));
        
        // Update i18n
        await i18n.changeLanguage(selectedLang);
        
        // Update Firebase
        const currentUser = getCurrentUser();
        if (currentUser) {
          await createOrUpdateUser(currentUser.uid, { language: selectedLang });
        }
        
        console.log(`Language changed to: ${selectedLang}`);
      } catch (error) {
        console.error('Error changing language:', error);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
    <TouchableOpacity
      style={[
        styles.button,
        {
            backgroundColor: language === LANGUAGES.en ? '#000' : 'transparent',
        },
      ]}
        onPress={() => handleSelectLanguage(LANGUAGES.en)}
      >
        <Text style={[
          styles.buttonText,
          { color: language === LANGUAGES.en ? '#fff' : '#000' }
        ]}>
          {t('changeLanguage.english')}
        </Text>
    </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: language === LANGUAGES.es ? '#000' : 'transparent',
          },
        ]}
        onPress={() => handleSelectLanguage(LANGUAGES.es)}
      >
        <Text style={[
          styles.buttonText,
          { color: language === LANGUAGES.es ? '#fff' : '#000' }
        ]}>
          {t('changeLanguage.spanish')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: language === LANGUAGES.tr ? '#000' : 'transparent',
          },
        ]}
        onPress={() => handleSelectLanguage(LANGUAGES.tr)}
      >
        <Text style={[
          styles.buttonText,
          { color: language === LANGUAGES.tr ? '#fff' : '#000' }
        ]}>
          {t('changeLanguage.turkish')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
});
