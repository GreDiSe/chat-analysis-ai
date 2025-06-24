import { Logo, StepProgress } from '@components';
import { Text, View } from 'react-native';

import { styles } from './style.ts';

interface IStepProgressContainer {
  title: string;
  currentStep: number;
}

export const StepProgressContainer = ({
  title,
  currentStep,
}: IStepProgressContainer) => {
  return (
    <View>
      <StepProgress steps={3} currentStep={currentStep} />
      <Logo size="signUpStep" style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
