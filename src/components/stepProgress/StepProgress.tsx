import { COLORS } from '@styles';
import { View } from 'react-native';

import { styles } from './style.ts';

interface IStepProgress {
  steps: number;
  currentStep: number;
}

export const StepProgress = ({ steps, currentStep }: IStepProgress) => {
  const renderSteps = (_: any, index: number) => (
    <View
      key={index}
      style={[
        styles.stepContainer,
        {
          backgroundColor:
            index + 1 <= currentStep
              ? COLORS.darkBlueBrand600
              : COLORS.darkBlueBrand100,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map(renderSteps)}
    </View>
  );
};
