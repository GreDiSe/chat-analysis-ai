import { COLORS } from '@styles';
import { FC } from 'react';
import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface IIcon {
  color?: string;
  Svg: FC<SvgProps>;
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export const Icon = ({
  width,
  height,
  color = COLORS.white,
  Svg,
  style,
}: IIcon) => {
  return <Svg width={width} height={height} color={color} style={style} />;
};
