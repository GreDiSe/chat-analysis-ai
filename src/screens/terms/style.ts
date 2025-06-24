import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    ...fontStylesCatalog.title1,
    color: COLORS.richBlack,
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    ...fontStylesCatalog.subtitles1,
    color: COLORS.richBlack,
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    ...fontStylesCatalog.body2,
    color: COLORS.richBlack,
    marginBottom: 12,
  },
  backButton: {
    marginTop: 16,
  },
}); 