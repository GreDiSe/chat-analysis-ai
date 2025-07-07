import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat } from '../../../../types/chat';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';
import { ViewShotContainer } from '../../../common/ViewShotContainer';

export const STATISTIC_TYPE: StatisticType = 'response-time';

interface ResponseTimeStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

export const ResponseTimeStory: React.FC<ResponseTimeStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  // Calculate average response time for each participant
  const responseTimesInMinutes = 'average_response_time_seconds' in analysis
    ? Object.entries(analysis.average_response_time_seconds || {})
        .map(([name, seconds]) => ({
          name,
          minutes: seconds ? Math.round(seconds as number / 60) : 0
        }))
        .sort((a, b) => a.minutes - b.minutes)
    : [];

  const fastestResponder = responseTimesInMinutes[0];

  const renderContent = () => (
    <LinearGradient
      colors={['#bd0f9d', '#a80d8c']}
      style={styles.gradient}
    >
      <Text style={styles.title}>{t('statistics.stories.responseTime.title')}</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../../../assets/images/statistics/waitingTime.jpg')}
            style={styles.responseImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.statsContainer}>
          {responseTimesInMinutes.map((participant, index) => (
            <View key={participant.name} style={styles.statBox}>
              <Text style={styles.nameText}>{participant.name}</Text>
              <Text style={styles.timeText}>{participant.minutes} {t('statistics.stories.responseTime.minutes')}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.footer}>
        {t('statistics.stories.responseTime.footer')}
      </Text>
    </LinearGradient>
  );

  const message = fastestResponder
    ? `${fastestResponder.name} ${t('statistics.stories.responseTime.quickestResponder')}, ${t('statistics.stories.responseTime.averageTime')} ${fastestResponder.minutes} ${t('statistics.stories.responseTime.minutes')}! ⚡`
    : t('statistics.stories.responseTime.noData');

  return (
    <ViewShotContainer
      chat={chat}
      handleShareCallback={handleShareCallback}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.responseTime.title')}
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
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    gap: 15,
  },
  statBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a80d8c',
  },
  timeText: {
    fontSize: 18,
    color: '#a80d8c',
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
    color: '#a80d8c',
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