import { Loader, LoaderType } from '@components';
import { useMemo } from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { styles } from './style';
import { ButtonType } from './types';

export interface IExtendedButton {
  title: string;
  type?: ButtonType;
  onPress: () => void;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
}

export const ExtendedButton = ({
  title,
  type = 'primary',
  onPress,
  loading = false,
  disabled = false,
  style,
}: IExtendedButton) => {
  const { titleStyle, buttonStyle, loaderType } = useMemo(() => {
    const payload: {
      button?: ViewStyle;
      title?: TextStyle;
      loaderType?: LoaderType;
    } = {};

    switch (type) {
      case 'primary':
        payload.button = disabled
          ? styles.buttonPrimaryDisabled
          : styles.buttonPrimary;
        payload.title = styles.titlePrimary;
        payload.loaderType = disabled ? 'dark' : 'white';
        break;
      case 'border':
        payload.button = styles.buttonBorder;
        payload.title = styles.titleBorder;
        payload.loaderType = 'dark';
        break;
    }

    return {
      buttonStyle: payload.button,
      titleStyle: payload.title,
      loaderType: payload.loaderType,
    };
  }, [type, disabled]);

  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle, style]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && <Loader type={loaderType} />}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
