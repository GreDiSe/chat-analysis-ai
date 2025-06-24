import { Icon } from '@components';
import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { styles } from './style';

interface ISocialButton {
  title: string;
  onPress: () => void;
  SvgIcon: FC<SvgProps>;
}

export const SocialButton = ({ onPress, title, SvgIcon }: ISocialButton) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon Svg={SvgIcon} style={styles.icon} height={16} width={16} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
