import { ImageBackgroundContainer, KeyboardContainer } from '@components';
import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { styles } from './style.ts';

interface ISaveAreaAuthContainer {
  children: ReactNode;
  style?: ViewStyle;
}

export const SaveAreaAuthContainer = ({
  children,
  style,
}: ISaveAreaAuthContainer) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ImageBackgroundContainer>
      <SafeAreaView style={styles.containerIOS} edges={['top']}>
        <KeyboardContainer keyboardVerticalOffset={-bottom}>
          <View
            style={[styles.container, { paddingBottom: bottom + 16 }, style]}>
            {children}
          </View>
        </KeyboardContainer>
      </SafeAreaView>
    </ImageBackgroundContainer>
  );
};
