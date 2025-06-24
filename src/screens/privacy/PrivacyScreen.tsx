import { ExtendedButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '../../types/navigation';
import { styles } from './style';

export const PrivacyScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:kykysua1999@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('screens.settings.items.privacy.title') || 'Privacy Policy'}</Text>

        <Text style={styles.text}>Last updated: June 23, 2025</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and other personal data.
        </Text>

        <Text style={styles.sectionTitle}>1.1 Chat Data</Text>
        <Text style={styles.text}>
          With your permission, we analyze selected chat data to generate summaries, statistics, or insights. This data may be processed locally on your device or sent to secure servers and third-party AI services depending on your actions.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the information to operate and improve the app, personalize your experience, and communicate with you regarding updates or support.
        </Text>

        <Text style={styles.sectionTitle}>3. Information Sharing</Text>
        <Text style={styles.text}>
          We do not sell or rent your personal information. We may share your data only in limited cases such as legal compliance, technical service providers, or with your explicit consent.
        </Text>

        <Text style={styles.sectionTitle}>3.1 Third-Party Services</Text>
        <Text style={styles.text}>
          We use third-party services such as Firebase and Google AI APIs to enable secure chat analysis, authentication, and analytics. These services may process minimal data under strict agreements.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.text}>
          We implement security measures to protect your personal data from unauthorized access, alteration, or disclosure.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You may access, modify, or delete your personal information. You may also object to certain types of processing at any time.
        </Text>

        <Text style={styles.sectionTitle}>6. Data Retention</Text>
        <Text style={styles.text}>
          We retain personal data only as long as necessary to fulfill the purposes described in this policy or as required by law.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this policy periodically. Material changes will be communicated through the app or via email.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact Us</Text>
        <Text style={styles.text}>
          To request data deletion or ask privacy-related questions, contact us at{' '}
          <Text style={{ fontWeight: 'bold', color: 'blue' }} onPress={handleEmailPress}>
            kykysua1999@gmail.com
          </Text>
          .
        </Text>
      </ScrollView>

      <ExtendedButton
        title="Back"
        onPress={handleBack}
        style={styles.backButton}
      />
    </SafeAreaView>
  );
};
