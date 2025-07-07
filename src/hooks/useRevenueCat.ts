import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import Purchases from 'react-native-purchases';
import { AppDispatch, RootState } from '../store';
import { appActions } from '../store/slices/appSlice';
import { safeLogEvent } from '../utils/analytics';
import { createOrUpdateUser } from '../firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const useRevenueCat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.appReducer.userId);
  const currentProAccessStatus = useSelector((state: RootState) => state.appReducer.hasProAccess);

  const storeProAccessToFirestore = useCallback(async (accessType: 'purchased' | 'restored') => {
    if (!userId) {
      console.warn('No user ID available to store pro access');
      return;
    }

    try {
      await createOrUpdateUser(userId, {
        hasProAccess: true,
        proAccessPurchasedAt: firestore.FieldValue.serverTimestamp(),
        proAccessType: accessType,
      });
      
      safeLogEvent('pro_access_stored_firestore', {
        userId,
        accessType,
        timestamp: new Date().toISOString(),
      });
      
      console.log('Pro access stored to Firestore successfully');
    } catch (error) {
      console.error('Error storing pro access to Firestore:', error);
      safeLogEvent('pro_access_store_error', {
        userId,
        accessType,
        error: error as any,
      });
    }
  }, [userId]);

  const storeNoProAccessToFirestore = useCallback(async () => {
    if (!userId) {
      console.warn('No user ID available to store no pro access');
      return;
    }

    try {
      await createOrUpdateUser(userId, {
        hasProAccess: false,
        proAccessPurchasedAt: null,
        proAccessType: null,
      });
      
      safeLogEvent('no_pro_access_stored_firestore', {
        userId,
        timestamp: new Date().toISOString(),
      });
      
      console.log('No pro access status stored to Firestore successfully');
    } catch (error) {
      console.error('Error storing no pro access to Firestore:', error);
      safeLogEvent('no_pro_access_store_error', {
        userId,
        error: error as any,
      });
    }
  }, [userId]);

  const checkProAccess = useCallback(async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const hasProAccess = customerInfo.entitlements.active['pro_access'] !== undefined;
      
      // Only update Redux and Firestore if the status has changed
      if (currentProAccessStatus !== hasProAccess) {
        dispatch(appActions.setProAccess(hasProAccess));
        
        if (hasProAccess) {
          await storeProAccessToFirestore('restored');
          console.log('Pro access status changed - stored to Firestore:', hasProAccess);
        } else {
          await storeNoProAccessToFirestore();
          console.log('Pro access status changed - stored to Firestore:', hasProAccess);
        }
        
        safeLogEvent('pro_access_status_changed', {
          fromTo: `${currentProAccessStatus} -> ${hasProAccess}`,
          activeEntitlements: Object.keys(customerInfo.entitlements.active),
        });
      }
      
      console.log('Pro access check completed:', hasProAccess);
    } catch (error) {
      console.log('[RevenueCat] Error checking Pro access:', error);
      dispatch(appActions.setProAccess(false));
      
      safeLogEvent('pro_access_check_error', {
        error: error as any,
      });
    }
  }, [dispatch, storeProAccessToFirestore, storeNoProAccessToFirestore, currentProAccessStatus]);

  const showPaywall = useCallback(async (options?: { type?: 'love' | 'general' }) => {
    try {
      safeLogEvent('paywall_initiated', { type: options?.type || 'settings_popup' });
      
      const result = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: 'Pro access',
      });

      switch (result) {
        case PAYWALL_RESULT.PURCHASED:
          safeLogEvent('paywall_purchased');
          dispatch(appActions.setProAccess(true));
          await storeProAccessToFirestore('purchased');
          console.log('User purchased subscription!');
          return { success: true, action: 'purchased' };
          
        case PAYWALL_RESULT.RESTORED:
          safeLogEvent('paywall_restored');
          dispatch(appActions.setProAccess(true));
          await storeProAccessToFirestore('restored');
          console.log('User restored subscription!');
          return { success: true, action: 'restored' };
          
        case PAYWALL_RESULT.CANCELLED:
          safeLogEvent('paywall_cancelled');
          console.log('User cancelled paywall');
          return { success: false, action: 'cancelled' };
          
        case PAYWALL_RESULT.ERROR:
          safeLogEvent('paywall_error');
          console.log('Paywall error occurred');
          return { success: false, action: 'error' };
          
        case PAYWALL_RESULT.NOT_PRESENTED:
          safeLogEvent('paywall_not_presented');
          console.log('Paywall not presented (user already has access)');
          dispatch(appActions.setProAccess(true));
          await storeProAccessToFirestore('restored');
          return { success: true, action: 'already_subscribed' };
          
        default:
          safeLogEvent('paywall_unknown_result');
          console.log('Unknown paywall result');
          return { success: false, action: 'unknown' };
      }
    } catch (error) {
      safeLogEvent('paywall_exception', { error: error as any });
      console.error('Error showing paywall:', error);
      return { success: false, action: 'exception', error };
    }
  }, [dispatch, storeProAccessToFirestore]);

  const restorePurchases = useCallback(async () => {
    try {
      safeLogEvent('restore_purchases_initiated');
      
      const result = await Purchases.restorePurchases();
      
      if (result.entitlements.active['Pro access']) {
        safeLogEvent('restore_purchases_success');
        dispatch(appActions.setProAccess(true));
        await storeProAccessToFirestore('restored');
        console.log('Purchases restored successfully!');
        return { success: true, message: 'Purchases restored successfully!' };
      } else {
        safeLogEvent('restore_purchases_no_active');
        dispatch(appActions.setProAccess(false));
        await storeNoProAccessToFirestore();
        console.log('No active purchases found to restore');
        return { success: false, message: 'No active purchases found to restore' };
      }
    } catch (error) {
      safeLogEvent('restore_purchases_error', { error: error as any });
      console.error('Error restoring purchases:', error);
      return { success: false, message: 'Error restoring purchases', error };
    }
  }, [dispatch, storeProAccessToFirestore, storeNoProAccessToFirestore]);

  return {
    checkProAccess,
    showPaywall,
    restorePurchases,
  };
}; 