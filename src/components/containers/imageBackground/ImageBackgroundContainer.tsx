import bg from '@assets/images/bg.png';
import { ReactNode } from 'react';
import { ImageBackground } from 'react-native';

import { styles } from './style';

interface IImageBackgroundContainer {
  children: ReactNode;
}

export const ImageBackgroundContainer = ({
  children,
}: IImageBackgroundContainer) => {
  return (
    <ImageBackground source={bg} resizeMode="cover" style={styles.image} imageStyle={{ opacity: 0.1 }}>
      {children}
    </ImageBackground>
  );
};
