import { requestSetLanguage } from '@actions';
import { LANGUAGES, LanguageType } from '@constants';
import { getLanguage } from '../../../store/slices/appSlice';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';

interface IChangeLanguageContainer {
  style?: ViewStyle;
}

export const ChangeLanguageContainer = ({
  style,
}: IChangeLanguageContainer) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector(getLanguage);

  const handleSelectLanguage = (selectedLang: LanguageType) => {
    if (selectedLang !== language) {
    dispatch(requestSetLanguage());
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
