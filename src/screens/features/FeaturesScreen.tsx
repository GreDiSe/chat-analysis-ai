import React, { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation';
import { StoriesCarousel } from "../../components/stories/StoriesCarousel";
import { updateUserFeatureScreenShowed } from "../../firebase/auth";
import { FeatureStory, Story } from "../../types/story";
import { TranslationKeysType } from "../../types/translation";
import { selectAllChats } from '../../store/selectors/chatSelectors';
import { safeLogEvent } from "../../utils/analytics";

type Props = StackScreenProps<RootStackParamList, "Features">;

export const FeaturesScreen: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const chats = useSelector(selectAllChats);
  
  const hasExistingChats = chats.length > 0;

  const handleNavigateToMenu = () => {
    navigation.replace('Main');
  };

  useEffect(() => {
    safeLogEvent('feature_screen_started');
  }, []);

  const featureStories: FeatureStory[] = [
    {
      id: "guide_welcome",
      isWelcome: true,
      hasTitle: false,
      title: hasExistingChats 
        ? t('screens.guide.stories.welcome.titleExisting')
        : t('screens.guide.stories.welcome.title'),
      subtitle: hasExistingChats 
        ? t('screens.guide.stories.welcome.subtitleExisting')
        : t('screens.guide.stories.welcome.subtitle'),
      image: require('../../../assets/images/guide-images/Welcome.jpg'),
      gradient: ['#4B0082', '#8A2BE2'],
      cta: {
        buttonText: 'screens.features.stories.common.continue',
        disclaimer: 'screens.features.stories.common.disclaimer',
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      })
    },
    {
      id: 'relationship_insights',
      title: 'screens.features.stories.relationshipInsights.title',
      subtitle: 'screens.features.stories.relationshipInsights.subtitle',
      gradient: ['#FF6B35', '#F7931E'],
      hasTitle: false,
      imageWidth: 350,
      imageHeight: 350,
      image: require('../../../assets/images/feature-images/relationship-insights-es.png'),
      cta: {
        buttonText: 'screens.features.stories.common.continue',
        disclaimer: 'screens.features.stories.common.disclaimer',
      },
      ctaSubtitle: 'screens.features.stories.common.stats_discover',
    },
    {
      id: 'unexpected_insights',
      title: 'screens.features.stories.unexpectedInsights.title',
      subtitle: 'screens.features.stories.unexpectedInsights.subtitle',
      gradient: ['#667eea', '#764ba2'],
      image: require('../../../assets/images/feature-images/unexpectable-insights-es.png'),
      imageWidth: 350,
      imageHeight: 350,
      hasTitle: false,
      cta: {
        buttonText: 'screens.features.stories.common.continue',
        disclaimer: 'screens.features.stories.common.disclaimer',
      },
      ctaSubtitle: 'screens.features.stories.common.stats_discover',
    },
    {
      id: 'fun_insights',
      title: 'screens.features.stories.funInsights.title',
      subtitle: 'screens.features.stories.funInsights.subtitle',
      gradient: ['#11998e', '#38ef7d'],
      image: require('../../../assets/images/feature-images/fun-insight-es.png'),
      imageWidth: 350,
      imageHeight: 350,
      hasTitle: false,
      cta: {
        buttonText: 'screens.features.stories.common.continue',
        disclaimer: 'screens.features.stories.common.disclaimer',
      },
      ctaSubtitle: 'screens.features.stories.common.stats_discover',
    },
    {
      id: 'data_safety',
      title: 'screens.features.stories.dataSafety.title',
      subtitle: 'screens.features.stories.dataSafety.subtitle',
      gradient: ['#0F4C75', '#3282B8'],
      image: require('../../../assets/images/feature-images/shield.png'),
      imageWidth: 250,
      imageHeight: 250,
      hasTitle: false,
      cta: {
        buttonText: 'screens.guide.stories.welcome.buttonText',
        disclaimer: 'screens.features.stories.common.disclaimer',
      },
      ctaSubtitle: 'screens.features.stories.common.stats_discover',
    },
  ];

  useEffect(() => {
    const markFeatureAsShown = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          await updateUserFeatureScreenShowed(currentUser.uid);
        }
      } catch (error) {
        console.error('Error updating feature screen status:', error);
      }
    };

    markFeatureAsShown();
  }, []); // Empty dependency array means this runs once on mount

  const translateFeatureStory = (story: FeatureStory): Story => {
    return {
      ...story,
      title: t(story.title as TranslationKeysType),
      subtitle: t(story.subtitle as TranslationKeysType),
      cta: {
        buttonText: t(story.cta.buttonText as TranslationKeysType),
        disclaimer: t(story.cta.disclaimer as TranslationKeysType),
      },
      ctaSubtitle: story.ctaSubtitle ? t(story.ctaSubtitle as TranslationKeysType) : undefined,
    };
  };

  const translatedStories: Story[] = featureStories.map(translateFeatureStory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <StoriesCarousel stories={translatedStories} mode="features" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  content: {
    flex: 1,
  },
}); 