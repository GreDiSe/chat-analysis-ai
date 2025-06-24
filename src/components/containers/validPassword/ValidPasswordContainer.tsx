import Check from '@assets/icons/check.svg';
import { Icon } from '@components';
import {
  hasLowerCase,
  hasNumbers,
  hasSpecialCharacter,
  hasUpperCase,
} from '@helpers';
import { COLORS } from '@styles';
import { TranslationKeysType } from '@types';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TITLES } from './constants';
import { styles } from './style';

interface IValidPassword {
  password: string;
}

export const ValidPasswordContainer = ({ password }: IValidPassword) => {
  const { t } = useTranslation();

  const passValidation = {
    isMin: password.length >= 8,
    isMax: !!password.length && password.length <= 16,
    hasNumbers: hasNumbers(password),
    hasSpecial: hasSpecialCharacter(password),
    hasUpperCase: hasUpperCase(password),
    hasLowerCase: hasLowerCase(password),
  };

  const validationArray = Object.keys(passValidation).map((key, index) => ({
    title: TITLES[key as keyof typeof TITLES],
    value: passValidation[key as keyof typeof passValidation],
    id: index,
  }));

  const renderPasswordItem = ({
    title,
    value,
    id,
  }: {
    title: TranslationKeysType;
    value: boolean;
    id: number;
  }) => (
    <View style={styles.itemContainer} key={id}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: value
              ? COLORS.darkBlueBrand600
              : COLORS.darkBlueBrand100,
          },
        ]}>
        <Icon Svg={Check} width={11.2} height={11.2} color={COLORS.white} />
      </View>
      <Text style={styles.title}>{t(title)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('validation.password.makeSure')}</Text>
      {validationArray.map(renderPasswordItem)}
    </View>
  );
};
