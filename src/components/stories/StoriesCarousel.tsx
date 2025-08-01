import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
  GestureResponderEvent,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../types/chat';
import { StatisticCard } from '../chatStats/StatisticCard';
import { Story } from '../../types/story';
import { StoryCard } from './StoryCard';
import { ShareOverlay } from './ShareOverlay';
import { useSelector, useDispatch } from 'react-redux';
import { getStoryTypesByChatType, StatisticType } from '../../utils/storyTypes';
import { chatActions } from '../../store/slices/chatSlice';
import { appActions } from '../../store/slices/appSlice';
import { safeLogEvent } from '../../utils/analytics';
import { RootState, AppDispatch } from '../../store';
import { useGuideTimer } from '../../hooks/useGuideTimer';
import { useIsFocused } from '@react-navigation/native';
import { PaywallOverlay } from '../modals/PaywallOverlay';

interface StoriesCarouselProps {
  mode: 'story' | 'statistics' | 'features';
  chat?: Chat;
  stories?: Story[];
  onClose?: () => void;
  initialIndex?: number;
}

const PROGRESS_BAR_TIME = 5000;
const SWIPE_THRESHOLD = 20;

const StoriesCarouselComponent: React.FC<StoriesCarouselProps> = ({
  mode,
  chat,
  stories: initialStories = [],
  onClose,
  initialIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isSwiping = useRef(false);
  const buttonPressedRef = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const showShareOverlay = useSelector((state: RootState) => state.chatReducer.showShareOverlay);
  const sharedChats = useSelector((state: any) => state.chatReducer.sharedChats);
  const hasProAccess = useSelector((state: RootState) => state.appReducer.hasProAccess);
  const showPaywallOverlay = useSelector((state: RootState) => state.appReducer.showPaywallOverlay);
  const scrollViewRef = useRef<ScrollView>(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const startTouchX = useRef(0);
  const windowWidth = Dimensions.get('window').width;
  const isStatisticAvaliable = sharedChats.includes(chat?.id);
  const chatLength = useSelector((state: RootState) => state.chatReducer.chats.length);
  const isFocused = useIsFocused();

  const startTimeRef = useRef<number>(Date.now());
  const hasSeenShareOverlayRef = useRef<boolean>(false);
  
  const chatItems = useMemo(() => (chat ? getStoryTypesByChatType(chat) : []), [chat]);
  const stories = initialIndex > 0 ? initialStories.slice(initialIndex) : initialStories
  const items = mode === 'statistics' ? chatItems : stories;
  const isFocusedRef = useRef(isFocused);

  // Timer tracking for current story
  const currentStory = mode === 'story' ? stories[activeIndex] : null;
  
  // Use the guide timer hook
  const { timeLeft, canProceed, isTimerActive } = useGuideTimer({
    currentStory,
    isActive: true
  });

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useEffect(() => {
    if (!isFocusedRef.current) {
      progressAnimation.stopAnimation();
      return;
    }

    if (!isPaused) {
      startProgressAnimation();
    }
    return () => {
      progressAnimation.stopAnimation();
    };
  }, [activeIndex, isPaused]);



  useEffect(() => {
    if (mode === 'statistics' && chat) {
      safeLogEvent(`story_impression`, {
        story_key: items[activeIndex],
        active_index: activeIndex + 1,
        chat_type: chat.type,
        existing_chats_count: chatLength,
        is_first_chat: chatLength === 0
      });
    } else if (mode === 'story') {
      safeLogEvent(`guide_impression`, {
        guide_id: stories[activeIndex]?.id,
        active_index: activeIndex + 1,
        existing_chats_count: chatLength,
        is_first_chat: chatLength === 0
      });
    } else if (mode === 'features') {
      safeLogEvent(`features_impression`, {
        feature_id: stories[activeIndex]?.id,
        existing_chats_count: chatLength,
        active_index: activeIndex + 1,
        is_first_chat: chatLength === 0
      });
    }
  }, [activeIndex, mode]);

  useEffect(() => {
    const backAction = () => {
      handleBackButtonPress();
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const startProgressAnimation = () => {
    progressAnimation.setValue(0);
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: PROGRESS_BAR_TIME,
      useNativeDriver: false,
    }).start(({ finished }) => {
      // if (finished && !showShareOverlay && isFocusedRef.current) {
      //   handleNext();
      // }

      if (finished && !showPaywallOverlay) {
        // Check if current story is a long video
        const currentStory = mode === 'story' ? stories[activeIndex] : mode === 'features' ? stories[activeIndex] : null;
        const isCurrentVideoLong = currentStory?.isLongVideo === true;
        
        // Don't auto-advance if current video is long
        if (!isCurrentVideoLong) {
          handleNext();
        }
      }
    });
  };

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      const nextIndex = activeIndex + 1;

      if (nextIndex >= 3 && mode === 'statistics' && !hasProAccess && !showPaywallOverlay) {
        showPaywall({ type: chat?.type === 'love' ? 'love' : 'general' });
      }

      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * windowWidth,
        animated: true
      });

      if (mode === 'statistics' && chat) {
        safeLogEvent(chat.type === 'love' ? 'next_love_story' : 'next_general_story', {
          next_story_key: items[nextIndex],
          prev_story_key: items[activeIndex],
          chat_type: chat.type,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0,
          active_index: activeIndex + 1,
          next_index: nextIndex + 1,
        });
      } else if (mode === 'story') {
        safeLogEvent('next_guide_story', {
          prev_story_key: stories[activeIndex].id,
          next_story_key: stories[nextIndex].id,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0,
          active_index: activeIndex + 1,
          next_index: nextIndex + 1,
        });
      } else if (mode === 'features') {
        safeLogEvent('next_features_story', {
          prev_feature_key: stories[activeIndex].id,
          next_feature_key: stories[nextIndex].id,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0,
          active_index: activeIndex + 1,
          next_index: nextIndex + 1,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      const prevIndex = activeIndex - 1;
      setActiveIndex(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * windowWidth,
        animated: true
      });
      
      if (mode === 'statistics' && chat) {
        safeLogEvent(chat.type === 'love' ? 'prev_love_story' : 'prev_general_story', {
          prev_story_key: items[prevIndex],
          next_story_key: items[activeIndex],
          chat_type: chat.type,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0
        })
      } else if (mode === 'story') {
        safeLogEvent('prev_guide_story', {
          prev_story_key: stories[prevIndex].id,
          next_story_key: stories[activeIndex].id,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0
        });
      } else if (mode === 'features') {
        safeLogEvent('prev_features_story', {
          prev_feature_key: stories[prevIndex].id,
          next_feature_key: stories[activeIndex].id,
          existing_chats_count: chatLength,
          is_first_chat: chatLength === 0
        });
      }
    }
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    startTouchX.current = event.nativeEvent.locationX;
    isSwiping.current = false;
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    const deltaX = event.nativeEvent.locationX - startTouchX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (buttonPressedRef.current) {
      return;
    }
    
    // Block touch actions if timer is still active
    if (isTimerActive) {
      return;
    }
    
    if (isSwiping.current) {
      const deltaX = event.nativeEvent.locationX - startTouchX.current;
      if (deltaX > SWIPE_THRESHOLD) {
        handlePrevious();
      } else if (deltaX < -SWIPE_THRESHOLD) {
        handleNext();
      }
    } else {
      const touchX = event.nativeEvent.locationX;
      if (touchX < windowWidth * 0.3) {
        handlePrevious();
      } else if (touchX > windowWidth * 0.7) {
        handleNext();
      }
    }
  };

  const shareOverlayonShareHandle = () => {
    safeLogEvent('share_overlay_share', {
      story_key: items[activeIndex],
      chat_type: chat?.type,
      existing_chats_count: chatLength,
      is_first_chat: chatLength === 0
    });
  };

  
  const paywallOverlayonBackHandle = () => {
    safeLogEvent('paywall_overlay_back', {
      story_key: items[activeIndex],
      chat_type: chat?.type,
      existing_chats_count: chatLength,
      is_first_chat: chatLength === 0,
    });
    handlePrevious();

    setTimeout(() => {
      dispatch(appActions.hidePaywallOverlay());
    }, 10);
  };
  
  const shareOverlayonBackHandle = () => {
    safeLogEvent('share_overlay_back', {
      story_key: items[activeIndex],
      chat_type: chat?.type,
      existing_chats_count: chatLength,
      is_first_chat: chatLength === 0,
    });
    handlePrevious();

    setTimeout(() => {
      dispatch(chatActions.hideShareOverlay());
    }, 10);
  };

  const triggerShareOverlay = () => {
    dispatch(chatActions.showShareOverlay());
    hasSeenShareOverlayRef.current = true;
    safeLogEvent('setShowShareOverlay', {
      story_key: items[activeIndex],
      chat_type: chat?.type,
      existing_chats_count: chatLength,
      is_first_chat: chatLength === 0,
      active_index: activeIndex + 1,
    });
  };

  const showPaywall = (options?: { type: 'love' | 'general' }) => {
    const finalOptions = options?.type ? { type: options.type } : undefined;
    dispatch(appActions.showPaywallOverlay(finalOptions));
    safeLogEvent('show_paywall', {
      story_key: items[activeIndex],
      chat_type: chat?.type,
      existing_chats_count: chatLength,
      is_first_chat: chatLength === 0,
      active_index: activeIndex + 1,
    });
  };

  const renderProgressBars = () => (
      <View style={styles.progressContainer}>
      {items.map((_, index) => (
        <View key={index} style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: index === activeIndex
                  ? progressAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    })
                  : index < activeIndex
                  ? '100%'
                  : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>
  );

  const renderContent = () => {
    if (mode === 'statistics' && chat) {
      return (items as StatisticType[]).map((type) => (
        <View key={type} style={[styles.slide, { width: windowWidth }]}>
            <StatisticCard
              chat={chat}
              type={type}
              buttonPressedRef={buttonPressedRef}
            />
        </View>
      ));
    }

    return stories.map((story, index) => (
      <View key={story.id} style={[styles.slide, { width: windowWidth }]}>
        <LinearGradient
          colors={story.gradient || ['#1E1E1E', '#2A2A2A']}
          style={styles.gradientContainer}
        >
          <StoryCard
            story={story}
            width={windowWidth}
            isActive={index === activeIndex}
            onContinue={handleNext}
            isLastStory={index === stories.length - 1}
            buttonPressedRef={buttonPressedRef}
            timerState={mode === 'story' && index === activeIndex ? { timeLeft, canProceed, isTimerActive } : undefined}
          />
        </LinearGradient>
      </View>
    ));
  };

  const logCloseEvent = () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTimeRef.current) / 1000); // in seconds
    const percentageViewed = Math.round(((activeIndex + 1) / items.length) * 100);
    
    if (mode === 'statistics' && chat) {
      safeLogEvent('close_statistics', {
        story_key: items[activeIndex],
        chat_type: chat.type,
        active_index: activeIndex + 1,
        chat_id: chat.id,
        existing_chats_count: chatLength,
        stories_viewed: activeIndex + 1,
        total_stories: items.length,
        percentage_viewed: percentageViewed,
        time_spent_seconds: timeSpent,
        time_spent_minutes: Math.round(timeSpent / 60 * 100) / 100,
        has_seen_share_overlay: hasSeenShareOverlayRef.current
      });
    } else if (mode === 'story') {
      safeLogEvent('close_guide', {
        guide_id: stories[activeIndex]?.id,
        existing_chats_count: chatLength,
        stories_viewed: activeIndex + 1,
        total_stories: stories.length,
        percentage_viewed: percentageViewed,
        active_index: activeIndex + 1,
        time_spent_seconds: timeSpent,
        time_spent_minutes: Math.round(timeSpent / 60 * 100) / 100,
        has_seen_share_overlay: hasSeenShareOverlayRef.current
      });
    } else if (mode === 'features') {
      safeLogEvent('close_features', {
        feature_id: stories[activeIndex]?.id,
        existing_chats_count: chatLength,
        stories_viewed: activeIndex + 1,
        total_stories: stories.length,
        active_index: activeIndex + 1,
        percentage_viewed: percentageViewed,
        time_spent_seconds: timeSpent,
        time_spent_minutes: Math.round(timeSpent / 60 * 100) / 100,
        has_seen_share_overlay: hasSeenShareOverlayRef.current
      });
    }
  };

  const handleBackButtonPress = () => {
    logCloseEvent();
    onClose?.();
  };

  const handleClose = () => {
    logCloseEvent();
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <PaywallOverlay 
        onClose={paywallOverlayonBackHandle} 
        chatType={chat?.type}
        chatsLength={chatLength}
        activeIndex={activeIndex}
      />

      <View style={styles.header}>
        {renderProgressBars()}
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={styles.touchableContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {renderContent()}
      </ScrollView>
      </View>
      {showShareOverlay && (
        <ShareOverlay
          onShare={shareOverlayonShareHandle}
          onBack={shareOverlayonBackHandle}
          statisticType={items[activeIndex] as string}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  touchableContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    height: '100%',
  },
  gradientContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
 
export const StoriesCarousel = React.memo(StoriesCarouselComponent);