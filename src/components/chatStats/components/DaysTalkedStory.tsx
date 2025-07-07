import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../types/chat';
import ViewShot from 'react-native-view-shot';
import { shareStory } from '../../../helpers/shareStory';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../../store/slices/chatSlice';
import { StatisticType } from '../../../utils/storyTypes';
import { AppDispatch } from '@store';

interface DaysTalkedStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const STATISTIC_TYPE: StatisticType = 'days-talked';

export const DaysTalkedStory: React.FC<DaysTalkedStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const viewShotRef = useRef<ViewShot & { capture: () => Promise<string> }>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const totalDaysTalked = 'total_days_talked' in analysis ? analysis.total_days_talked : undefined;

  const handleShare = async () => {
    handleShareCallback();
    const message = `${t('statistics.stories.daysTalked.daysText')}: ${totalDaysTalked ?? '-'}`;
    const result = await shareStory(viewShotRef, {
      title: t('statistics.stories.daysTalked.title'),
      message,
      storyKey: STATISTIC_TYPE
    });
    if (result?.success) {
      dispatch(chatActions.addSharedChat(chat.id));
    } else {
      dispatch(chatActions.setIsShareFailed(true));
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot style={styles.container} ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <LinearGradient
          colors={['#4B0082', '#8A2BE2']}
          style={styles.gradient}
        >
          <Text style={styles.title}>{t('statistics.stories.daysTalked.title')}</Text>
          
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../../../../assets/images/statistics/daysTalked.jpg')}
                style={styles.calendarImage}
                resizeMode="cover"
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.daysNumber}>{totalDaysTalked ?? '-'}</Text>
                <Text style={styles.daysText}>{t('statistics.stories.daysTalked.daysText')}</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.footer}>
            {t('statistics.stories.daysTalked.footer')}
          </Text>
        </LinearGradient>
      </ViewShot>

      <View style={styles.shareButtonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>{t('statistics.common.share')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 30,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSide: {
    flex: 1,
    height: '100%',
  },
  leftSide: {
    backgroundColor: '#FF69B4', // Pink
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightSide: {
    backgroundColor: '#87CEEB', // Light blue
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  calendarImage: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  statsContainer: {
    alignItems: 'center',
  },
  statBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  daysNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  daysText: {
    fontSize: 18,
    color: '#4B0082',
    marginTop: 5,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
  shareButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  shareButtonText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareButtonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 