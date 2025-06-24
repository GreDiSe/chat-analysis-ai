import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { BlurView } from '@react-native-community/blur';

interface ShareOverlayProps {
  onShare: () => void;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

export const ShareOverlay: React.FC<ShareOverlayProps> = ({ onShare, onBack }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.absoluteFill}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={7}
        reducedTransparencyFallbackColor="rgba(0,0,0,0.8)"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.45)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t('statistics.stories.shareOverlay.title')}</Text>
          <Text style={styles.message}>{t('statistics.stories.shareOverlay.message')}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
              <Text style={styles.backButtonText}>{t('statistics.stories.shareOverlay.back')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={onShare}>
              <Text style={styles.shareButtonText}>{t('statistics.common.share')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
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
  content: {
    width: '80%',
    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.9,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  shareButton: {
    backgroundColor: '#FFF',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 