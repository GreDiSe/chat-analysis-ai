import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from '../../types/navigation';
import { Story } from "../../types/story";
import { useTranslation } from "react-i18next";
import { safeLogEvent } from "../../utils/analytics";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Video from "react-native-video";

const { ShareReceiver } = NativeModules;

interface StoryCardProps {
  story: Story;
  width: number;
  isActive: boolean;
  onContinue: () => void;
  isLastStory?: boolean;
  buttonPressedRef: React.MutableRefObject<boolean>;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  width,
  buttonPressedRef,
  onContinue,
  isLastStory = false,
  isActive
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const chatLength = useSelector((state: RootState) => state.chatReducer.chats.length);
  const { title, subtitle, gradient, image, data, cta, ctaSubtitle, isWelcome = false, video, secondaryCta } = story;
  const isGuideStory = story.id.startsWith('guide_');

  const handleContinue = () => {
    buttonPressedRef.current = true;
    if (isGuideStory) {
      if (story.id === 'guide_my_app_button') {

        if (chatLength > 0) {
          safeLogEvent('onboarding_finished_again', {
            existing_chats_count: chatLength
          });
        } else {
          safeLogEvent('onboarding_finished_first_time', {
            existing_chats_count: chatLength
          });
        }

        ShareReceiver.openWhatsAppMenu();
      } else {
        onContinue();
      }
    } else {
      // For feature stories
      if (isLastStory) {
        navigation.navigate('Guide');
      } else {
        onContinue();
      }
    }

    // auto-reset
    setTimeout(() => { buttonPressedRef.current = false })
  };

  const handleSecondaryButton = () => {
    if (secondaryCta?.onPress) {
      secondaryCta.onPress();
    }
  };

  // Add error handling for image loading
  const handleImageError = (error: any) => {
    console.error('Image loading error:', error.nativeEvent.error);
  };

  const renderFeatureStoryContent = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Image
          source={image}
          style={styles.featureImage}
          resizeMode="cover"
          onError={handleImageError}
        />
      </View>

      {data && (
        <View style={styles.dataContainer}>
          <View style={styles.personContainer}>
            <Text style={styles.personName}>{data.person1.name}</Text>
            <View style={styles.percentageBar}>
              <View
                style={[
                  styles.percentageFill,
                  { width: `${data.person1.percentage}%` },
                ]}
              />
            </View>
            <Text style={styles.percentageText}>{data.person1.percentage}%</Text>
          </View>

          <View style={styles.personContainer}>
            <Text style={styles.personName}>{data.person2.name}</Text>
            <View style={styles.percentageBar}>
              <View
                style={[
                  styles.percentageFill,
                  { width: `${data.person2.percentage}%` },
                ]}
              />
            </View>
            <Text style={styles.percentageText}>{data.person2.percentage}%</Text>
          </View>
        </View>
      )}
    </>
  );

  const renderGuideStoryContent = (isActive: boolean) => {
    return (
      <>
        {!isWelcome && <Text style={styles.guideHeader}>{t('screens.guide.title')}</Text>}
        <View>
          {video && !isWelcome ? (
            <View style={[
              styles.videoWrapper,
              ]}>
              <Video
                source={video}
                style={[
                  styles.guideVideo,
                  isWelcome && styles.welcomeGuideImage,
                  story.id === 'guide_three_dots_settings' && styles.videoFirstSlide,
                  story.id === 'guide_more_button' && styles.videoSecondSlide,
                  secondaryCta && isLastStory && styles.videoSmaller
                ]}
                resizeMode="cover"
                repeat
                controls={false}
                muted
                paused={!isActive}
                playInBackground={false}
                playWhenInactive={false}
              />
            </View>
          ) : image && (
            <Image
              source={image}
              style={[
                styles.guideImage, 
                isWelcome && styles.welcomeGuideImage,
                isWelcome && secondaryCta && styles.welcomeGuideImageWithSecondary
              ]}
              resizeMode="cover"
              onError={handleImageError}
            />
          )}
        </View>
        <View style={styles.guideHeader}>
          <Text style={[styles.guideTitle, isWelcome && styles.welcomeGuideTitle]}>{title}</Text>
          {subtitle && <Text style={styles.guideSubtitle}>{subtitle}</Text>}
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, { width }]}>
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {isGuideStory ? renderGuideStoryContent(isActive) : renderFeatureStoryContent()}

          <View style={styles.ctaContainer}>
            {ctaSubtitle && (
              <Text style={styles.ctaSubtitle}>{ctaSubtitle}</Text>
            )}
            <TouchableOpacity 
              style={[styles.button, isGuideStory && styles.guideButton]} 
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>
                {cta.buttonText}
              </Text>
            </TouchableOpacity>
            {secondaryCta && (
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton, isGuideStory && styles.guideButton]} 
                onPress={handleSecondaryButton}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  {secondaryCta.buttonText}
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.disclaimer}>{cta.disclaimer}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 25,
    alignItems: 'center',
  },
  guideHeader: {
    marginTop: 25,
    marginBottom: 25,
    color: '#FFF',
    fontSize: 28,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcomeGuideTitle: {
    fontSize: 35,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  guideSubtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featureImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  guideImage: {
    width: '90%',
    height: 400,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 'auto',
    borderRadius: 15,
  },
  welcomeGuideImage: {
    width: '80%',
    height: 350,
  },
  welcomeGuideImageWithSecondary: {
    width: '80%',
    height: 280,
  },
  dataContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  personContainer: {
    marginBottom: 20,
  },
  personName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  percentageBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  percentageFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ctaContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: 270,
    alignItems: 'center',
  },
  guideButton: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 10
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: 270,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    paddingHorizontal: 10
  },
  disclaimer: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  videoFirstSlide: {
  },
  videoSecondSlide: {
  },
  videoSmaller: {
    height: 330,
  },
  videoWrapper: {
    overflow: 'hidden'
  },
  guideVideo: {
    width: '85%',
    height: 400,
    margin: 'auto',
  },
});
 