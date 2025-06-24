import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    ...fontStylesCatalog.title1,
    color: COLORS.richBlack,
    textAlign: 'center'
  },
  subtitle: {
    ...fontStylesCatalog.subtitles1,
    color: COLORS.richBlack,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },
  subscribeText: {
    ...fontStylesCatalog.body2,
    color: COLORS.richBlack,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  subscribeButton: {
    marginVertical: 20,
    textAlign: 'center',
  },
  subscribeContainer: {
    marginTop: 'auto',
    textAlign: 'center',
    alignItems: 'center',
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: COLORS.richBlack,
  },
  tickContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -35,
  },
  tick: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
}); 