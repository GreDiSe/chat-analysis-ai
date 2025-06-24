import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonBorder: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkBlueBrand600,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: COLORS.darkBlueBrand600,
  },
  buttonPrimaryDisabled: {
    backgroundColor: COLORS.darkBlueBrand100,
  },
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  title: {
    ...fontStylesCatalog.subtitles2,
    flexShrink: 1,
    textAlign: 'center',
  },
  titleBorder: {
    color: COLORS.darkBlueBrand950,
  },
  titlePrimary: {
    color: COLORS.white,
  },
});
