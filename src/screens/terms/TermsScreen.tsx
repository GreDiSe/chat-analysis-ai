import { ExtendedButton } from '@components';
import { useNavigation } from '@react-navigation/native';
import { Text, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '../../types/navigation';
import { styles } from './style';

const APP_NAME = 'Chat Analysis AI';
const SUPPORT_EMAIL = 'kykysua1999@gmail.com';

export const TermsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {t('screens.settings.items.terms.title') || 'Terms & Conditions'}
        </Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By accessing and using the {APP_NAME} app, you agree to be bound by these Terms and Conditions.
          If you do not agree with any part of these terms, please do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Privacy Policy</Text>
        <Text style={styles.text}>
          Your use of {APP_NAME} is also governed by our Privacy Policy, which explains how we collect,
          use, and protect your personal information.
        </Text>

        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.text}>
          To access certain features, you may need to create an account. You are responsible for maintaining
          the confidentiality of your account credentials and for any activity that occurs under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Acceptable Use</Text>
        <Text style={styles.text}>
          You agree to use the app only for lawful purposes and not in a way that violates the rights or limits
          the use and enjoyment of others.
        </Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.text}>
          All content in the {APP_NAME} app, including text, graphics, logos, and software, is the property of
          {APP_NAME} and protected under intellectual property laws. Unauthorized use is prohibited.
        </Text>

        <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
        <Text style={styles.text}>
          The app is provided “as is” without warranties of any kind. We are not responsible for any direct or
          indirect damages resulting from the use or inability to use the app.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
        <Text style={styles.text}>
          We may revise these Terms and Conditions at any time. Continued use of the app after such changes
          implies acceptance of the revised terms.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact for Data Removal</Text>
        <Text style={styles.text}>
          If you would like your personal information removed from our systems, contact us at{' '}
          <Text style={{ fontWeight: 'bold', color: 'blue' }} onPress={handleEmailPress}>
            {SUPPORT_EMAIL}
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
