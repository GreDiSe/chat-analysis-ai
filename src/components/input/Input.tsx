import { formatSpaces } from '@helpers';
import { COLORS } from '@styles';
import { useRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { TextInput as TextInputType } from 'react-native-gesture-handler';

import Attention from '../../../assets/icons/attention-circle.svg';
import Hide from '../../../assets/icons/eye.svg';
import Show from '../../../assets/icons/eye-off.svg';
import { Icon, IconButton } from '../index';
import { styles } from './style';

export interface IInput extends TextInputProps {
  errorMessage?: any;
  OptionalComponent?: any;
  isSpaces?: boolean;
  label: string;
  isSecureText?: boolean;
}

export const Input = ({
  onChangeText,
  errorMessage,
  isSpaces = true,
  label,
  value,
  isSecureText,
  ...props
}: IInput) => {
  const inputRef = useRef<TextInputType>(null);

  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const isErrorMessage = !!errorMessage && errorMessage !== true;

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(curValue => !curValue);
  };

  const handleOnChange = (curValue: string) => {
    const validText = formatSpaces({ curValue, isSpaces });

    if (onChangeText) {
      onChangeText(validText);
    }
  };

  const inputStyle = {
    paddingRight: isSecureText ? 44 : 12,
    borderColor: isErrorMessage ? COLORS.red500 : COLORS.darkBlueBrand50,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          {...props}
          ref={inputRef}
          secureTextEntry={isSecureText && isSecureTextEntry}
          value={value}
          style={[styles.input, inputStyle]}
          onChangeText={handleOnChange}
          cursorColor={COLORS.darkBlueBrand950}
          selectionHandleColor={COLORS.darkBlueBrand950}
          selectionColor={COLORS.darkBlueBrand950}
          placeholderTextColor={COLORS.grey600}
        />
        {!!isSecureText && (
          <IconButton
            onPress={toggleSecureTextEntry}
            Svg={isSecureTextEntry ? Hide : Show}
            color={COLORS.darkBlueBrand500}
            width={20}
            style={styles.secureButton}
            height={20}
          />
        )}
      </View>
      {isErrorMessage && (
        <View style={styles.errorContainer}>
          <Icon Svg={Attention} color={COLORS.red500} width={16} height={16} />
          <Text style={styles.errorTitle}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};
