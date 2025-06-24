import { ReactNode } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import { styles } from './style.ts';

interface IKeyboardContainer {
  children: ReactNode;
  keyboardVerticalOffset?: number;
}

export const KeyboardContainer = ({
  children,
  keyboardVerticalOffset = 0,
}: IKeyboardContainer) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.contentScrollContainer}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
