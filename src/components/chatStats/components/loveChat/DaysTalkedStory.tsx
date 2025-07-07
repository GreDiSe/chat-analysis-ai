import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'days-talked';

interface DaysTalkedStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const DaysTalkedStory: React.FC<DaysTalkedStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  const totalDaysTalked = 'total_days_talked' in analysis ? analysis.total_days_talked : undefined;

  const renderContent = () => (
    <LinearGradient
      colors={['#4B0082', '#8A2BE2']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.daysTalked.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/daysTalked.jpg')}
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
  );

  const message = `${t('statistics.stories.daysTalked.daysText')}: ${totalDaysTalked ?? '-'}`;

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.daysTalked.title')}
      message={message}
    >
      {renderContent()}
    </ViewShotContainer>
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