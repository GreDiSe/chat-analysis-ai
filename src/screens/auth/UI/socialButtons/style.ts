import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomButtonTitle: {
    ...fontStylesCatalog.subtitles2,
    color: COLORS.blue500,
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  bottomTitle: {
    ...fontStylesCatalog.subtitles2,
    color: COLORS.grey600,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 15
  },
  title: {
    ...fontStylesCatalog.body3,
    color: COLORS.grey600,
  },
});
