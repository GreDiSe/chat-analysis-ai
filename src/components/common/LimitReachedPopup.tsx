import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AppDispatch } from '@store';
import { appActions } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';

export const LimitReachedPopup: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLimitReached = useSelector((state: RootState) => state.appReducer.isLimitReached);
  const userId = useSelector((state: RootState) => state.appReducer.userId);

  React.useEffect(() => {
    if (isLimitReached) {
      safeLogEvent('limit_reached_popup_shown', {
        user_id: userId
      });
    }
  }, [isLimitReached, userId]);

  const handleClose = () => {
    safeLogEvent('limit_reached_popup_closed', {
      user_id: userId
    });
    dispatch(appActions.hideLimitReached());
  };

  return (
    <Modal
      visible={isLimitReached}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('limitReached.title')}</Text>
          <Text style={styles.message}>{t('limitReached.message')}</Text>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>{t('limitReached.ok')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 