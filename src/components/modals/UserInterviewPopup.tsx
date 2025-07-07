import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { appActions } from '../../store/slices/appSlice';
import { useTranslation } from 'react-i18next';
import { createOrUpdateUser, getUserData } from '../../firebase/auth';
import { safeLogEvent } from '../../utils/analytics';

const { width } = Dimensions.get('window');

export const UserInterviewPopup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isVisible = useSelector((state: RootState) => state.appReducer.isUserInterviewPopupOpen);
  const { t } = useTranslation();
  const userId = useSelector((state: RootState) => state.appReducer.userId);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [isShowen, setIsShowen] = useState(false);

  useEffect(() => {
    const checkIsShowen = async () => {
      if (!userId) return;
      const userData = await getUserData(userId);
      setIsShowen(userData?.userInterviewPopup?.isShown || false);
    };
    checkIsShowen();
  }, [userId]);

  useEffect(() => {
    if (isVisible && !isShowen) {
      safeLogEvent('user_interview_popup_shown', {
        user_id: userId
      });
    }
  }, [isVisible, isShowen, userId]);

  if (isShowen) {
    return null;
  }

  const handleClose = async () => {
    try {
      if (!userId) {
        throw new Error('User ID is not available');
      }
      await createOrUpdateUser(userId, { userInterviewPopup: { isShowen: true } });
      safeLogEvent('user_interview_popup_closed', {
        user_id: userId,
        has_submitted: false
      });
    } catch (e) {
      console.log("e", e);
    }
    dispatch(appActions.hideUserInterviewPopup());
    dispatch(appActions.setUserInterviewPopupShown(true));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      if (!userId) {
        throw new Error('User ID is not available');
      }
      await createOrUpdateUser(userId, { userInterviewPopup: { isShowen: true, name, email, phone } });
      setStatus('success');
      safeLogEvent('user_interview_popup_submitted', {
        user_id: userId,
        has_name: Boolean(name),
        has_email: Boolean(email),
        has_phone: Boolean(phone)
      });
      setTimeout(() => {
        dispatch(appActions.hideUserInterviewPopup());
        dispatch(appActions.setUserInterviewPopupShown(true));
      }, 100);
    } catch (e) {
      console.log("e", e);
      setStatus('error');
      dispatch(appActions.hideUserInterviewPopup());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible && Boolean(userId)}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{t('userInterview.title')}</Text>
          <Text style={styles.subtitle}>{t('userInterview.subtitle')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('userInterview.name')}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder={t('userInterview.phone')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Text style={styles.or}>{t('userInterview.or')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('userInterview.email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.closeButtonText}>{loading ? t('userInterview.sending') : t('userInterview.submit')}</Text>
          </TouchableOpacity>
          {status === 'success' && <Text style={{ color: 'green', marginTop: 8 }}>{t('userInterview.success')}</Text>}
          {status === 'error' && <Text style={{ color: 'red', marginTop: 8 }}>{t('userInterview.error')}</Text>}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1000,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: width * 0.9,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  messageInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  or: {
    color: '#aaa',
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
  closeIconText: {
    fontSize: 20,
    color: '#000',
  },
}); 