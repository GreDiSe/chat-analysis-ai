import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  languageContainer: {
    marginTop: 'auto',
    width: 160,
  },
  title: {
    ...fontStylesCatalog.title1,
    color: COLORS.richBlack,
    textAlign: 'center'
  },
  subtitle: {
    ...fontStylesCatalog.body2,
    color: COLORS.richBlack,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },
  titleContainer: {
    alignItems: 'flex-end',
    marginTop: -8,
    width: '100%',
  },
  privacyText: {
    ...fontStylesCatalog.body4,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: COLORS.richBlack,
    textAlign: 'center',
    padding: 0,
  },
});
