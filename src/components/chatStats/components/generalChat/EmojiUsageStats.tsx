import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'emoji-usage';

interface EmojiUsageStatsProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'emoji_leaderboard' in analysis;
};

export const EmojiUsageStats: React.FC<EmojiUsageStatsProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const sortedEmojis = Object.entries(analysis.emoji_leaderboard)
    .sort(([, countA], [, countB]) => countB - countA);

  const message = sortedEmojis.length > 0
    ? `${t('statistics.stories.emojiUsage.title')}: ${sortedEmojis.map(([emoji, count]) => `${emoji} (${count})`).join(', ')}`
    : t('statistics.stories.emojiUsage.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.emojiUsage.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#26C6DA', '#00ACC1']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.emojiUsage.title')}</Text>
        
        <View style={styles.contentContainer}>
          {sortedEmojis.length > 0 ? (
            <View style={styles.emojiContainer}>
              {sortedEmojis.map(([emoji, count], index) => (
                <View key={index} style={styles.emojiRow}>
                  <Text style={[styles.emoji, index === 0 && styles.topEmoji]}>{emoji}</Text>
                  <Text style={styles.count}>×{count} {t('statistics.stories.emojiUsage.times')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noEmojiContainer}>
              <Text style={styles.noEmojiText}>{t('statistics.stories.emojiUsage.noData')}</Text>
              <Text style={styles.descriptionText}>{t('statistics.stories.emojiUsage.subtitle')}</Text>
              <View style={styles.otherEmojis}>
                <Text style={styles.otherEmojiText}>😊 😂 ❤️ 👍 🎉</Text>
              </View>
            </View>
          )}
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
  emojiContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  emojiRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 50,
  },
  topEmoji: {
    fontSize: 70,
  },
  count: {
    fontSize: 24,
    color: '#EC407A',
    fontWeight: 'bold',
  },
  noEmojiContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: '100%',
  },
  noEmojiText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F48FB1',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  otherEmojis: {
    marginTop: 20,
  },
  otherEmojiText: {
    fontSize: 32,
    letterSpacing: 8,
  },
  footer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 70,
  },
}); 