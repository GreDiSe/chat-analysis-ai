// import Apple from '@assets/icons/apple.svg';
import Google from '@assets/icons/google.svg';
import { useTranslation } from 'react-i18next';
import { View } from "react-native";

import { styles } from './style';
import { SocialButton } from './UI';

interface ISocialButtonsContainer {
  handleGoogleSignIn: () => void;
}

export const SocialButtonsContainer = ({
                                         handleGoogleSignIn
}: ISocialButtonsContainer) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/*<SocialButton*/}
      {/*  SvgIcon={Apple}*/}
      {/*  onPress={() => {}}*/}
      {/*  title={t('socialButtons.continueWithApple')}*/}
      {/*/>*/}

      <SocialButton
        SvgIcon={Google}
        onPress={handleGoogleSignIn}
        title={t('socialButtons.continueWithGoogle')}
      />
    </View>
  );
};
