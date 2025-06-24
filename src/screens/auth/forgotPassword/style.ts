import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonBottomContainer: {
    marginTop: 'auto',
  },
  container: {
    gap: 16,
  },
  title: {
    color: COLORS.darkBlueBrand950,
    paddingBottom: 8,
    ...fontStylesCatalog.title2,
  },
});
