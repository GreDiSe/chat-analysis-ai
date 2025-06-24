import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { appActions } from '../../store/slices/appSlice';
import { AppDispatch } from '@store';

export const PremiumPopup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isVisible = useSelector((state: RootState) => state.appReducer.isPremiumPopupVisible);

  const handleClose = () => {
    dispatch(appActions.hidePremiumPopup());
  };

  const handleContinue = () => {
    // TODO: Implement purchase logic
    dispatch(appActions.hidePremiumPopup());
  };

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <View style={styles.drips} />
            <View style={styles.icons}>
              <View style={styles.circle} />
              <Text style={styles.heart}>❤️</Text>
              <View style={styles.square} />
            </View>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Limited Time Offer</Text>
          </View>

          <Text style={styles.title}>50% Off Premium</Text>
          <Text style={styles.subtitle}>
            For a limited time enjoy a month of WhatWrapped
          </Text>

          <View style={styles.features}>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>Unlock your Relationship Wrapped</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>Create unlimited Chat & Relationship Wrappeds!</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>Start uncovering the truths behind the messages</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.priceText}>
            Renews $7.99/month. Cancel anytime.
          </Text>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Restore</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>•</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.25,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  drips: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.1,
    backgroundColor: '#FFB6C1',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: height * 0.1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  heart: {
    fontSize: 40,
  },
  square: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badge: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  features: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    marginTop: height * 0.05,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkmark: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#000',
    width: width * 0.85,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: height * 0.05,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,
    gap: 8,
    position: 'absolute',
    bottom: 20,
  },
  footerLink: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
  footerDot: {
    fontSize: 14,
    color: '#666',
  },
}); 