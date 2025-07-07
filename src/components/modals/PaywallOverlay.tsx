import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { appActions } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';
import { useRevenueCat } from '../../hooks/useRevenueCat';

const { width, height } = Dimensions.get('window');

interface PaywallOverlayProps {
  onClose: () => void;
  chatType?: string;
  chatsLength?: number;
  activeIndex?: number;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({ 
  onClose, 
  chatType, 
  chatsLength, 
  activeIndex 
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showPaywall } = useRevenueCat();
  const visible = useSelector((state: RootState) => state.appReducer.showPaywallOverlay);
  const paywallType = useSelector((state: RootState) => state.appReducer.paywallType);
  
  const displayButtonText = t('paywall.defaultButtonText');

  const handleClose = () => {
    onClose();
  };

  const handleUnlock = async () => {
    safeLogEvent('paywall_unlock_pressed', {
      chatType,
      chatsLength,
      activeIndex: activeIndex !== undefined ? activeIndex + 1 : undefined,
      paywallType
    });
    
    const result = await showPaywall({ type: paywallType });
    
    if (result.success) {
      dispatch(appActions.hidePaywallOverlay());
      // User successfully purchased or already has access
    } else {
      // User cancelled or error occurred
    }

    
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.absoluteFill}>
        <BlurView
          style={styles.blur}
          blurType="dark"
          blurAmount={6}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.8)"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.45)']}
          style={styles.gradient}
        >
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          
          <View style={styles.content}>
            <View style={styles.lockContainer}>
              <View style={styles.lockIcon}>
                {paywallType === 'love' ? <Image 
                  source={require('../../../assets/icons/heart-lock.png')} 
                  style={styles.lockImage}
                  resizeMode="contain"
                /> : <Image 
                  source={require('../../../assets/icons/laught-lock.png')} 
                  style={styles.lockImage}
                  resizeMode="contain"
                />}
              </View>
            </View>
            
          <View style={styles.titleContainer}>
            <Text style={styles.titleLine}>{t(`paywall.${paywallType}.titleLines.line1` as any)}</Text>
            <Text style={styles.titleLine}>{t(`paywall.${paywallType}.titleLines.line2` as any)}</Text>
            <Text style={styles.titleLine}>{t(`paywall.${paywallType}.titleLines.line3` as any)}</Text>
            <Text style={styles.titleLine}>{t(`paywall.${paywallType}.titleLines.line4` as any)}</Text>
          </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
                <Text style={styles.unlockButtonText}>{displayButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  content: {
    width: '80%',
    alignItems: 'center',
    zIndex: 3,
  },
  lockContainer: {
    marginBottom: 40,
  },
  lockIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockImage: {
    width: 96,
    height: 96,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 80,
    textAlign: 'left',
  },
  titleLine: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    lineHeight: 32,
    opacity: 0.95,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unlockButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
}); 