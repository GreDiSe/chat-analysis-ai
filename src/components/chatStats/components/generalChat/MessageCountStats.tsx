import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'message-count';

interface MessageCountStatsProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'message_count' in analysis;
};

export const MessageCountStats: React.FC<MessageCountStatsProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const messageCounts = Object.entries(analysis.message_count)
    .map(([name, count]) => ({
      name,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...messageCounts.map(p => p.count));

  const message = messageCounts.length > 0
    ? `${t('statistics.chatStats.general.messageCount.title')}: ${messageCounts.map(p => `${p.name}: ${p.count} ${t('statistics.chatStats.general.messageCount.messages')}`).join(', ')} 📱`
    : t('statistics.stories.emojiUsage.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.messageCount.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#4CAF50', '#388E3C']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.messageCount.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/messageCount.jpg')}
              style={[styles.messageImage, messageCounts.length > 3 && styles.messageImageCompact]}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {messageCounts.map((participant) => (
              <View key={participant.name} style={styles.statBox}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{participant.name}</Text>
                  <Text style={styles.countText}>
                    {participant.count} {t('statistics.chatStats.general.messageCount.messages')}
                  </Text>
                </View>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { width: `${(participant.count / maxCount) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.emojiUsage.footer')}
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
  messageImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  messageImageCompact: {
    width: 220,
    borderRadius: 20,
    height: 220,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    gap: 15,
  },
  statBox: {
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  countText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 