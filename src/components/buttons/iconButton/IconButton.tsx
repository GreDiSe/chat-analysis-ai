import { TouchableOpacity, ViewStyle } from 'react-native';

import { Icon, IIcon } from '../../icon';

interface IIconButton {
  onPress: () => void;
  disabled?: boolean;
  iconStyle?: ViewStyle;
  style?: ViewStyle;
}

export const IconButton = ({
  width,
  height,
  onPress,
  color,
  disabled = false,
  Svg,
  style,
  iconStyle,
}: IIconButton & IIcon) => {
  return (
    <TouchableOpacity
      style={[{ width, height }, style]}
      onPress={onPress}
      disabled={disabled}>
      <Icon
        Svg={Svg}
        width={width}
        height={height}
        color={color}
        style={iconStyle}
      />
    </TouchableOpacity>
  );
};
