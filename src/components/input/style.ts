import { COLORS, fontStylesCatalog } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
    width: '100%',
  },
  errorTitle: {
    ...fontStylesCatalog.body4,
    color: COLORS.red500,
    marginLeft: 6,
  },
  input: {
    borderColor: COLORS.darkBlueBrand50,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.darkBlueBrand950,
    height: 44,
    paddingLeft: 12,
    paddingVertical: 8,
    width: '100%',
    ...fontStylesCatalog.body2,
    backgroundColor: COLORS.white,
  },
  label: {
    ...fontStylesCatalog.uppercase2,
    color: COLORS.grey600,
    marginBottom: 4,
  },
  secureButton: {
    alignItems: 'center',
    bottom: 0,
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 44,
  },
});
