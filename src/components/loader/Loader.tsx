import LoaderDark from '@assets/images/loader-dark.png';
import LoaderWhite from '@assets/images/loader-white.png';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { LoaderType } from './types';

interface ILoader {
  type?: LoaderType;
  size?: number;
}

export const Loader = ({ type = 'dark', size = 20 }: ILoader) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={type === 'dark' ? LoaderDark : LoaderWhite}
      resizeMode="contain"
      style={{
        width: size,
        height: size,
        transform: [{ rotate }],
      }}
    />
  );
};
