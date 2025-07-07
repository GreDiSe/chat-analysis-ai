import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StoriesCarousel } from '../../components/stories/StoriesCarousel';
import { Story } from 'src/types/story';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../../store/selectors/chatSelectors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../types/navigation';
import { getLanguage } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';

type GuideScreenRouteProp = RouteProp<RootStackParamList, 'Guide'>;

export const GuideScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuideScreenRouteProp>();
  const chats = useSelector(selectAllChats);
  const hasExistingChats = chats.length > 0;
  const skipWelcomeScreen = route.params?.skipWelcomeScreen || false;
  const language = useSelector(getLanguage);

  const handleNavigateToMenu = () => {
    navigation.navigate('Main');
  };

  useEffect(() => {
    safeLogEvent('guide_screen_started');
  }, []);

  // Turkish language guide stories (3 steps: Welcome → Video → Summary)
  const turkishGuideStories: Story[] = [
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
        buttonText: hasExistingChats 
          ? t('screens.guide.stories.welcome.buttonTextExisting')
          : t('screens.guide.stories.welcome.buttonText'),
        disclaimer: t('screens.guide.stories.welcome.disclaimer')
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      })
    },
    {
      id: "guide_long_video",
      title: t('screens.guide.title'),
      gradient: ['#E9791A', '#E25822'],
      video: require('../../../assets/images/guide-videos/turkish-full-guide-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step1.buttonText'),
        disclaimer: t('screens.guide.stories.step1.disclaimer')
      },
      withTimer: !hasExistingChats ? 5 : 0,
      hasTitle: false,
      isLongVideo: true,
    },
    {
      id: "guide_summary",
      title: t('screens.guide.stories.summary.title'),
      gradient: ['#4B0082', '#8A2BE2'],
      summaryOverview: [
        'screens.guide.stories.summary.step1',
        'screens.guide.stories.summary.step2',
        'screens.guide.stories.summary.step3',
        'screens.guide.stories.summary.step4',
        'screens.guide.stories.summary.step5',
        'screens.guide.stories.summary.step6',
        'screens.guide.stories.summary.step7'
      ],
      cta: {
        buttonText: t('screens.guide.stories.summary.buttonText'),
        disclaimer: t('screens.guide.stories.summary.disclaimer')
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      }),
      hasTitle: false,
    },
  ];

  // Default guide stories for other languages (original 7-step flow)
  const defaultGuideStories: Story[] = [
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
        buttonText: hasExistingChats 
          ? t('screens.guide.stories.welcome.buttonTextExisting')
          : t('screens.guide.stories.welcome.buttonText'),
        disclaimer: t('screens.guide.stories.welcome.disclaimer')
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      })
    },
    {
      id: "guide_three_dots_settings",
      title: t('screens.guide.stories.step1.title'),
      gradient: ['#E9791A', '#E25822'],
      video: language === 'es' 
        ? require('../../../assets/images/guide-videos/settings-btn-es.mp4')
        : require('../../../assets/images/guide-videos/settings-btn-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step1.buttonText'),
        disclaimer: t('screens.guide.stories.step1.disclaimer')
      },
      withTimer: !hasExistingChats ? 2 : 0
    },
    {
      id: "guide_more_button",
      title: t('screens.guide.stories.step2.title'),
      gradient: ['#4B0082', '#8A2BE2'],
      video: language === 'es' 
        ? require('../../../assets/images/guide-videos/more-btn-es.mp4')
        : require('../../../assets/images/guide-videos/more-btn-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step2.buttonText'),
        disclaimer: t('screens.guide.stories.step2.disclaimer')
      },
      withTimer: !hasExistingChats ? 2 : 0
    },
    {
      id: "guide_export_chat_button",
      title: t('screens.guide.stories.step3.title'),
      gradient: ['#191970', '#000080'],
      video: language === 'es' 
        ? require('../../../assets/images/guide-videos/export-chat-es.mp4')
        : require('../../../assets/images/guide-videos/export-chat-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step3.buttonText'),
        disclaimer: t('screens.guide.stories.step3.disclaimer')
      },
      withTimer: !hasExistingChats ? 2 : 0
    },
    {
      id: "guide_without_media_button",
      title: t('screens.guide.stories.step4.title'),
      gradient: ["#783657", "#5e2b45"],
      video: language === 'es' 
        ? require('../../../assets/images/guide-videos/without-media-btn-es.mp4')
        : require('../../../assets/images/guide-videos/without-media-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step4.buttonText'),
        disclaimer: t('screens.guide.stories.step4.disclaimer')
      },
      withTimer: !hasExistingChats ? 2 : 0
    },
    {
      id: "guide_my_app_button",
      title: t('screens.guide.stories.step5.title'),
      gradient: ["#3e70b1", "#2f5483"],
      video: language === 'es' 
        ? require('../../../assets/images/guide-videos/app-btn-es.mp4')
        : require('../../../assets/images/guide-videos/click-the-app-es.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step5.buttonText'),
        disclaimer: t('screens.guide.stories.step5.disclaimer')
      },
      withTimer: !hasExistingChats ? 2 : 0,
    },
    {
      id: "guide_summary",
      title: t('screens.guide.stories.summary.title'),
      gradient: ['#4B0082', '#8A2BE2'],
      summaryOverview: [
        'screens.guide.stories.summary.step1',
        'screens.guide.stories.summary.step2',
        'screens.guide.stories.summary.step3',
        'screens.guide.stories.summary.step4',
        'screens.guide.stories.summary.step5',
        'screens.guide.stories.summary.step6',
        'screens.guide.stories.summary.step7'
      ],
      cta: {
        buttonText: t('screens.guide.stories.summary.buttonText'),
        disclaimer: t('screens.guide.stories.summary.disclaimer')
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      }),
      hasTitle: false,
    },
  ];

  // Choose guide stories based on language
  const guideStories = language === 'tr' ? turkishGuideStories : defaultGuideStories;

  return (
    <SafeAreaView style={styles.container}>
      <StoriesCarousel 
        stories={guideStories} 
        mode="story" 
        initialIndex={skipWelcomeScreen ? 1 : 0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  }
}); 