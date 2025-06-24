import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { appActions } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';

export const ChatTypeModal: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const visible = useSelector((state: RootState) => state.appReducer.showChatTypeModal);
  const isLoading = useSelector((state: RootState) => state.chatReducer.isLoading);

  useEffect(() => {
    if (visible) {
      safeLogEvent('select_chat_type_showed', {});
    }
  }, [visible]);

  const handleSelect = (type: 'love' | 'general') => {
    safeLogEvent('select_chat_type_selected', {
      selected_type: type,
    });
    dispatch(appActions.setSelectedChatType(type));
  };

  const handleClose = () => {
    safeLogEvent('select_chat_type_closed', {});
    dispatch(appActions.hideChatTypeModal());
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Analyzing your chat...</Text>
          <Text style={styles.loadingSubtext}>This may take a few moments</Text>
        </View>
      );
    }

    return (
      <>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{t('screens.chatTypeModal.title')}</Text>
        <Text style={styles.subtitle}>{t('screens.chatTypeModal.subtitle')}</Text>
        <Text style={styles.pleaseChoose}>{t('screens.chatTypeModal.pleaseChoose')}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={() => handleSelect('love')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#FFB6C1' }]}>
              <Text style={styles.optionIconText}>❤️</Text>
            </View>
            <Text style={styles.optionText}>{t('screens.chatTypeModal.partner')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={() => handleSelect('general')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#78fd53' }]}>
              <Text style={styles.optionIconText}>💬</Text>
            </View>
            <Text style={styles.optionText}>{t('screens.chatTypeModal.friend')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={isLoading ? undefined : handleClose}
      >
        <TouchableOpacity 
          style={styles.container}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {renderContent()}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    position: 'relative',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  pleaseChoose: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIconText: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default ChatTypeModal; 