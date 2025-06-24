import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'peak-hours';

interface PeakHoursStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'peak_hours' in analysis;
};

export const PeakHoursStory: React.FC<PeakHoursStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatPeakHours = (hours: number[]) => {
    if (hours.length === 0) return '';
    if (hours.length === 1) return `${hours[0]}:00`;
    return `${hours[0]}:00 - ${hours[1]}:00`;
  };

  const message = analysis.peak_hours.length > 0
    ? `${t('statistics.chatStats.general.peakHours.title')}: ${formatPeakHours(analysis.peak_hours)} | ${t('statistics.chatStats.general.peakHours.totalDuration')}: ${formatDuration(analysis.total_chat_duration_seconds)}`
    : t('statistics.chatStats.general.peakHours.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.peakHours.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#4B0082', '#8A2BE2']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.peakHours.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/peakHours.jpg')}
              style={styles.peakHoursImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {analysis.peak_hours.length > 0 ? (
              <>
                <View style={styles.peakHoursBox}>
                  <Text style={styles.label}>{t('statistics.chatStats.general.peakHours.peakHours')}</Text>
                  <Text style={styles.value}>
                    {formatPeakHours(analysis.peak_hours)}
                  </Text>
                </View>
                <View style={styles.durationBox}>
                  <Text style={styles.label}>{t('statistics.chatStats.general.peakHours.totalDuration')}</Text>
                  <Text style={styles.value}>{formatDuration(analysis.total_chat_duration_seconds)}</Text>
                </View>
              </>
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.chatStats.general.peakHours.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.peakHours.footer')}
        </Text>
      </LinearGradient>
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 40,
    borderRadius: 20,
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
  peakHoursImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    gap: 20,
  },
  peakHoursBox: {
    alignItems: 'center',
    gap: 10,
  },
  durationBox: {
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    color: '#4B0082',
    fontWeight: 'bold',
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 5,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 