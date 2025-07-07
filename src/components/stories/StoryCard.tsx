import React, { useRef, useEffect } from "react";
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

interface TimerState {
  timeLeft: number;
  canProceed: boolean;
  isTimerActive: boolean;
}

interface StoryCardProps {
  story: Story;
  width: number;
  isActive: boolean;
  onContinue: () => void;
  isLastStory?: boolean;
  buttonPressedRef: React.MutableRefObject<boolean>;
  timerState?: TimerState;
}

const StoryCardComponent: React.FC<StoryCardProps> = ({
  story,
  width,
  buttonPressedRef,
  onContinue,
  isLastStory = false,
  isActive,
  timerState
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const chatLength = useSelector((state: RootState) => state.chatReducer.chats.length);
  const { title, subtitle, gradient, image, cta, ctaSubtitle, isWelcome = false, video, secondaryCta, withTimer, imageWidth, imageHeight, hasTitle = true, summaryOverview, isLongVideo = false } = story;
  
  // Video ref to control playback
  const videoRef = useRef<any>(null);
  
  // Use timer state from props or default values
  const timeLeft = timerState?.timeLeft || 0;
  const canProceed = timerState?.canProceed ?? true;
  const isGuideStory = story.id.startsWith('guide_');

  useEffect(() => {
    if (isActive && video) {
      videoRef.current?.seek(1);
    } 
  }, [isActive, video]);

  // Helper function to parse text with bold markers
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return (
      <Text style={styles.summaryStep}>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return (
              <Text key={index} style={styles.summaryStepBold}>
                {boldText}
              </Text>
            );
          } else {
            return part;
          }
        })}
      </Text>
    );
  };

  const handleContinue = () => {
    if (!canProceed) return;
    buttonPressedRef.current = true;
    if (isGuideStory) {
      if (story.id === 'guide_summary') {

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
        safeLogEvent('feature_story_finished', {
          existing_chats_count: chatLength
        });
        navigation.replace('Guide', { skipWelcomeScreen: true });
      } else {
        onContinue();
      }
    }

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
          style={[
            styles.featureImage,
            ...(imageWidth && imageHeight ? [{ width: imageWidth, height: imageHeight }] : [])
          ]}
          resizeMode="cover"
          onError={handleImageError}
        />
      </View>
    </>
  );

  const renderGuideStoryContent = (isActive: boolean) => {
    return (
      <>
        {hasTitle && <Text style={styles.guideHeader}>{t('screens.guide.title')}</Text>}
        <View>
          {video && !isWelcome ? (
            <View style={[
              styles.videoWrapper,
              ]}>
              <Video
                ref={videoRef}
                source={video}
                style={[
                  styles.guideVideo,
                  isWelcome && styles.welcomeGuideImage,
                  secondaryCta && isLastStory && styles.videoSmaller,
                  isLongVideo && styles.longVideo
                ]}
                resizeMode={isLongVideo ? 'contain' : 'cover'}
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
                isWelcome && secondaryCta && styles.welcomeGuideImageWithSecondary,
                ...(imageWidth && imageHeight ? [{ width: imageWidth, height: imageHeight }] : [])
              ]}
              resizeMode="cover"
              onError={handleImageError}
            />
          )}
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
          <View>
            {renderGuideStoryContent(isActive)}
          </View>

          <View style={styles.ctaContainer}>
            <View style={styles.guideHeader}>
            <Text style={[styles.guideTitle, isWelcome && styles.welcomeGuideTitle]}>{title}</Text>
              {subtitle && <Text style={styles.guideSubtitle}>{subtitle}</Text>}
              {summaryOverview && (
                <View style={styles.summaryContainer}>
                  {summaryOverview.map((step, index) => (
                    <View key={index}>
                      {renderTextWithBold(t(step as any))}
                    </View>
                  ))}
                </View>
              )}
            </View>
            {ctaSubtitle && (
              <Text style={styles.ctaSubtitle}>{ctaSubtitle}</Text>
            )}
            <TouchableOpacity 
              style={[
                styles.button, 
                !canProceed && styles.disabledButton
              ]} 
              onPress={handleContinue}
              disabled={!canProceed}
            >
              <Text style={[
                styles.buttonText,
                !canProceed && styles.disabledButtonText
              ]}>
                {!canProceed && withTimer ? `Skip in ${timeLeft} sec` : cta.buttonText}
              </Text>
            </TouchableOpacity>
            {secondaryCta && (
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton, (isWelcome && isGuideStory) ? styles.welcomeGuideButton : styles.guideLastButton]} 
                onPress={handleSecondaryButton}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText, !(isWelcome && isGuideStory) && styles.buttonTextSecondCta]}>
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

export const StoryCard = React.memo(StoryCardComponent);

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
    justifyContent: 'space-around',
  },
  header: {
    marginTop: 25,
    alignItems: 'center',
  },
  guideHeader: {
    marginTop: 15,
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
    justifyContent: 'space-around',
    flex: 1,
    marginBottom: 10,
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
    marginBottom: 20,
    width: 270,
    alignItems: 'center',
  },
  guideLastButton: {
    borderColor: '#FFF',
    paddingVertical: 3,
    width: 270,
  },
  welcomeGuideButton: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttonTextSecondCta: {
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 10
  },
  secondaryButton: {
    borderWidth: 0,
    backgroundColor: 'transparent',
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
    paddingHorizontal: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  videoSmaller: {
    height: 350,
  },
  videoWrapper: {
    overflow: 'hidden',
  },
  guideVideo: {
    width: '97%',
    height: 350,
    margin: 'auto',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  disabledButtonText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  summaryContainer: {
    margin: 24,
    alignSelf: 'stretch',
  },
  summaryStep: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'left',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  summaryStepBold: {
    fontWeight: 'bold',
  },
  longVideo: {
    height: 470,
    width: '100%',
    margin: 'auto',
  },
});
 