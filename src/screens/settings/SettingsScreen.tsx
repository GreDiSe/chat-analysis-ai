import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ChangeLanguageContainer } from '../../components/containers/changeLanguage/ChangeLanguageContainer';
import { NavigationProp } from '../../types/navigation';
import { Linking, Platform } from 'react-native';
import { safeLogEvent } from '../../utils/analytics';
import { createOrUpdateUser } from '../../firebase/auth';
import { RootState, AppDispatch } from '../../store';
import { useRevenueCat } from '../../hooks/useRevenueCat';
import { appActions } from '../../store/slices/appSlice';

interface SettingsItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  isPremium?: boolean;
  component?: React.ReactNode;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();
  const SUPPORT_EMAIL = 'kykysua1999@gmail.com';
  const userId = useSelector((state: RootState) => state.appReducer.userId);
  const hasProAccess = useSelector((state: RootState) => state.appReducer.hasProAccess);
  const { showPaywall, restorePurchases } = useRevenueCat();

  // 🔓 HACK: Privacy policy click counter
  const [privacyClickCount, setPrivacyClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEraseData = () => {
    Alert.alert(
      t('screens.settings.items.erase.title'),
      t('screens.settings.items.erase.confirm') || 'Are you sure you want to erase your data?',
      [
        {
          text: t('common.no') || 'No',
          style: 'cancel',
        },
        {
          text: t('common.yes') || 'Yes',
          style: 'destructive',
          onPress: async () => {
            Alert.alert(
              t('screens.settings.items.erase.successTitle') || 'Request Sent',
              t('screens.settings.items.erase.successMsg') || 'Your data will be removed soon.'
            );
            safeLogEvent('erase_user_data_requested');
            if (userId) {
              await createOrUpdateUser(userId, { REMOVE_USER_DATA: true });
            }
          },
        },
      ]
    );
  };

  const generalItems = [
    {
      id: 'language',
      icon: '🌐',
      title: t('screens.settings.items.language.title'),
      subtitle: t('screens.settings.items.language.subtitle'),
      component: <ChangeLanguageContainer />,
    },
    {
      id: 'restorePurchase',
      icon: '🔄',
      title: t('screens.settings.premium.restorePurchase'),
      subtitle: t('screens.settings.premium.restorePurchaseSubtitle'),
    },
    ...(hasProAccess ? [{
      id: 'manageSubscription',
      icon: '⚙️',
      title: t('screens.settings.premium.manageSubscription'),
      subtitle: t('screens.settings.premium.manageSubscriptionSubtitle'),
    }] : []),
    {
      id: 'support',
      icon: '📝',
      title: t('screens.settings.items.support.title'),
      subtitle: t('screens.settings.items.support.subtitle'),
    },
  ];

  const settingsSections: SettingsSection[] = [
    {
      title: t('screens.settings.sections.general'),
      items: generalItems,
    },
    {
      title: t('screens.settings.sections.about'),
      items: [
        {
          id: 'terms',
          icon: '📋',
          title: t('screens.settings.items.terms.title'),
          subtitle: t('screens.settings.items.terms.subtitle'),
        },
        {
          id: 'privacy',
          icon: '🔒',
          title: t('screens.settings.items.privacy.title'),
          subtitle: t('screens.settings.items.privacy.subtitle'),
        },
        {
          id: 'contact',
          icon: '✉️',
          title: t('screens.settings.items.contact.title'),
          subtitle: t('screens.settings.items.contact.subtitle'),
        },
      ],
    },
    {
      title: t('screens.settings.sections.more'),
      items: [
        {
          id: 'erase',
          icon: '🗑️',
          title: t('screens.settings.items.erase.title'),
          subtitle: t('screens.settings.items.erase.subtitle'),
        },
      ],
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRestorePurchases = async () => {
    safeLogEvent('restore_purchases_clicked');
    const result = await restorePurchases();
    
    if (result.success) {
      Alert.alert('Success', result.message);
    } else {
      Alert.alert(
        'No Purchases Found', 
        `${result.message || 'No active purchases found to restore'}\n\nIf it does not work, please contact our support team in settings screen.`
      );
    }
  };

  const handleManageSubscription = () => {
    safeLogEvent('manage_subscription_clicked');
    
    if (Platform.OS === 'android') {
      // Google Play Store subscription management URL
      const googlePlayUrl = 'https://play.google.com/store/account/subscriptions';
      Linking.openURL(googlePlayUrl).catch(err => {
        console.error('Error opening Google Play subscriptions:', err);
        Alert.alert('Error', 'Could not open subscription management page');
      });
    } else if (Platform.OS === 'ios') {
      // iOS App Store subscription management
      const appStoreUrl = 'https://apps.apple.com/account/subscriptions';
      Linking.openURL(appStoreUrl).catch(err => {
        console.error('Error opening App Store subscriptions:', err);
        Alert.alert('Error', 'Could not open subscription management page');
      });
    }
  };

  const handleItemPress = (id: string) => {
    // Handle item press based on id
    console.log('Pressed item:', id);
    
    switch (id) {
      case 'privacy':
        // 🔓 HACK: If language is English, track clicks for pro access
        if (i18n.language === 'en') {
          // Clear any existing timeout
          if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
          }
          
          const newClickCount = privacyClickCount + 1;
          setPrivacyClickCount(newClickCount);
          
          console.log(`🔓 Privacy click ${newClickCount}/3`);
          
          if (newClickCount >= 3) {
            // Trigger pro access hack
            dispatch(appActions.setProAccess(true));
            safeLogEvent('pro_access_hack_triggered', {
              language: i18n.language,
              trigger: 'privacy_policy_triple_click',
              clickCount: newClickCount
            });
            
            // Reset counter
            setPrivacyClickCount(0);
            console.log('🔓 HACK: Pro access enabled locally after 3 clicks!');
          } else {
            // Set timeout to reset counter after 3 seconds
            clickTimeoutRef.current = setTimeout(() => {
              setPrivacyClickCount(0);
              console.log('🔓 Privacy click counter reset');
            }, 30000);
          }
        }
        navigation.navigate('Privacy');
        break;
      case 'terms':
        navigation.navigate('Terms');
        break;
      case 'contact':
        const contactEmailBody = `Hi, I am a user "${userId || 'unknown'}. Please help me with the following issue: `;
        Linking.openURL(`mailto:${SUPPORT_EMAIL}?body=${encodeURIComponent(contactEmailBody)}`);
        break;
      case 'erase':
        handleEraseData();
        break;
      case 'support':
        const supportEmailBody = `Hi, I am a user "${userId || 'unknown'}. Please help me with the following issue: `;
        Linking.openURL(`mailto:${SUPPORT_EMAIL}?body=${encodeURIComponent(supportEmailBody)}`);
        break;
      case 'restorePurchase':
        handleRestorePurchases();
        break;
      case 'manageSubscription':
        handleManageSubscription();
        break;
      default:
        console.log('Unknown item:', id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('screens.settings.title')}</Text>
      </View>

      <ScrollView style={styles.content}>
        {hasProAccess ? (
          <View style={styles.proActivatedContainer}>
            <View style={styles.premiumContent}>
              <Text style={styles.crownIcon}>👑</Text>
              <Text style={styles.proActivatedText}>
                {t('screens.settings.premium.activated')}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.premiumButton}
            onPress={() => {  
              safeLogEvent('premium_pop_clicked');
              showPaywall();
            }}
          >
            <View style={styles.premiumContent}>
              <Text style={styles.crownIcon}>👑</Text>
              <Text style={styles.premiumText}>
                {t('screens.settings.premium.title')}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}

        {settingsSections.map((section, sectionIndex) => (
          <View 
            key={section.title} 
            style={[
              styles.section,
              sectionIndex === 0 && styles.firstSection
            ]}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <View key={item.id}>
              <TouchableOpacity
                style={[
                  styles.item,
                  index === section.items.length - 1 && styles.lastItem,
                ]}
                onPress={() => handleItemPress(item.id)}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemIcon}>{item.icon}</Text>
                  <View style={styles.itemTexts}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
                {item.component && (
                  <View style={styles.itemComponent}>
                    {item.component}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  premiumButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  crownIcon: {
    fontSize: 20,
  },
  premiumText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  firstSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 16,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemTexts: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: '#ccc',
    marginLeft: 8,
  },
  itemComponent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  proActivatedContainer: {
    backgroundColor: '#2E7D32',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  proActivatedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

}); 