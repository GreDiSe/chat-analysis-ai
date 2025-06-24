import i18n from 'i18next';
import { Alert, AlertButton } from 'react-native';

export const showAlert = (
  title: string,
  message: string,
  buttons: AlertButton[] = [
    {
      text: i18n.t('buttons.okay'),
    },
  ],
) => Alert.alert(title, message, buttons);
