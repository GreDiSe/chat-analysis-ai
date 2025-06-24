import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AppDispatch } from '@store';

export const GlobalUpdatePopup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isVisible = useSelector((state: RootState) => state.appReducer.isUpdatePopupVisible);
  const appConfig = useSelector((state: RootState) => state.appReducer.appConfig);

  if (!isVisible || !appConfig) return null;

  const handleRedirect = () => {
    if (appConfig.update_popup_redirect_link) {
      Linking.openURL(appConfig.update_popup_redirect_link);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{appConfig.update_popup_title}</Text>
          {appConfig.update_popup_subtitle ? (
            <Text style={styles.subtitle}>{appConfig.update_popup_subtitle}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleRedirect}>
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 8,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
}); 