import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    ...fontStylesCatalog.body3,
    color: COLORS.darkBlueBrand950,
    flexShrink: 1,
  },
});
