import { Image, ImageStyle, Text, View, StyleSheet } from "react-native";

import { SIZE_MAP } from './constants';
import { SizeType } from './types';

interface ILogo {
  size: SizeType;
  style?: ImageStyle;
}

export const Logo = ({ size, style }: ILogo) => {
  const { width, height } = SIZE_MAP[size];

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/icons/Logo.png')}
        style={[{ width, height }, style]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
});
