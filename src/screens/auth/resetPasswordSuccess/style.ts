import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  containerIOS: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    ...fontStylesCatalog.body3,
    color: COLORS.darkBlueBrand950,
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    color: COLORS.darkBlueBrand950,
    ...fontStylesCatalog.title3,
    marginTop: 40,
  },
});
