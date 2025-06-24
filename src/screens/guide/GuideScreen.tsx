import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StoriesCarousel } from '../../components/stories/StoriesCarousel';
import { Story } from 'src/types/story';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAllChats } from '../../store/selectors/chatSelectors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../types/navigation';

type GuideScreenRouteProp = RouteProp<RootStackParamList, 'Guide'>;

export const GuideScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuideScreenRouteProp>();
  const chats = useSelector(selectAllChats);
  const hasExistingChats = chats.length > 0;
  const skipWelcomeScreen = route.params?.skipWelcomeScreen || false;

  const handleNavigateToMenu = () => {
    navigation.navigate('Main');
  };

  const guideStories: Story[] = [
    {
      id: "guide_welcome",
      isWelcome: true,
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
      video: require('../../../assets/images/guide-videos/settings-btn-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step1.buttonText'),
        disclaimer: t('screens.guide.stories.step1.disclaimer')
      }
    },
    {
      id: "guide_more_button",
      title: t('screens.guide.stories.step2.title'),
      gradient: ['#4B0082', '#8A2BE2'],
      video: require('../../../assets/images/guide-videos/more-btn-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step2.buttonText'),
        disclaimer: t('screens.guide.stories.step2.disclaimer')
      }
    },
    {
      id: "guide_export_chat_button",
      title: t('screens.guide.stories.step3.title'),
      gradient: ['#191970', '#000080'],
      video: require('../../../assets/images/guide-videos/export-chat-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step3.buttonText'),
        disclaimer: t('screens.guide.stories.step3.disclaimer')
      }
    },
    {
      id: "guide_without_media_button",
      title: t('screens.guide.stories.step4.title'),
      gradient: ["#783657", "#5e2b45"],
      video: require('../../../assets/images/guide-videos/without-media-video.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step4.buttonText'),
        disclaimer: t('screens.guide.stories.step4.disclaimer')
      }
    },
    {
      id: "guide_my_app_button",
      title: t('screens.guide.stories.step5.title'),
      gradient: ["#3e70b1", "#2f5483"],
      video: require('../../../assets/images/guide-videos/click-the-app-es.mp4'),
      cta: {
        buttonText: t('screens.guide.stories.step5.buttonText'),
        disclaimer: t('screens.guide.stories.step5.disclaimer')
      },
      ...(hasExistingChats && {
        secondaryCta: {
          buttonText: t('screens.guide.stories.welcome.secondaryButtonText'),
          onPress: handleNavigateToMenu
        }
      })
    }
  ];

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