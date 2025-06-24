import { Logo } from '@components';
import { View } from 'react-native';

import { styles } from './style.ts';

export const HeaderLogoContainer = () => {
  return (
    <View style={styles.logoContainer}>
      <Logo size="signInStep" />
    </View>
  );
};
