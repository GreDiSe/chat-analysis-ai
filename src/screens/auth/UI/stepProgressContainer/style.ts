import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logo: {
    marginVertical: 26,
  },
  title: {
    ...fontStylesCatalog.title3,
    color: COLORS.darkBlueBrand950,
    marginBottom: 8,
  },
});
