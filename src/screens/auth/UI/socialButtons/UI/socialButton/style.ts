import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkBlueBrand600,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    width: '100%',
  },
  icon: {
    marginHorizontal: 8,
  },
  title: {
    color: COLORS.darkBlueBrand950,
    ...fontStylesCatalog.subtitles12,
    flexShrink: 1,
  },
});
