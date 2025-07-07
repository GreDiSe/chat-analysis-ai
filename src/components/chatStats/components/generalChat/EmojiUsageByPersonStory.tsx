import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'emoji-usage-by-person';

interface EmojiUsageByPersonStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'emoji_usage' in analysis;
};

export const EmojiUsageByPersonStory: React.FC<EmojiUsageByPersonStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const emojiUsage = Object.entries(analysis.emoji_usage)
    .map(([name, emoji]) => ({
      name,
      emoji: emoji as string
    }));

  const message = emojiUsage.length > 0
    ? `${t('statistics.chatStats.general.emojiUsageByPerson.title')}: ${emojiUsage.map(person => 
        `${person.name}: ${person.emoji}`
      ).join(' | ')}`
    : t('statistics.chatStats.general.emojiUsageByPerson.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.emojiUsageByPerson.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#4B0082', '#8A2BE2']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.emojiUsageByPerson.title')}</Text>
        
        <View style={styles.contentContainer}>
          {emojiUsage.length > 0 ? (
            <View style={styles.emojiContainer}>
              {emojiUsage.map((person) => (
                <View key={person.name} style={styles.emojiRow}>
                  <Text style={styles.name}>{person.name}:</Text>
                  <Text style={styles.emoji}>{person.emoji}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noEmojiContainer}>
              <Text style={styles.noEmojiText}>{t('statistics.chatStats.general.emojiUsageByPerson.noData')}</Text>
              <Text style={styles.descriptionText}>{t('statistics.chatStats.general.emojiUsageByPerson.subtitle')}</Text>
              <View style={styles.otherEmojis}>
                <Text style={styles.otherEmojiText}>😊 😂 ❤️ 👍 🎉</Text>
              </View>
            </View>
          )}
        </View>
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.emojiUsageByPerson.footer')}
        </Text>
      </LinearGradient>
    </ViewShotContainer>
  );
};

const styles = StyleSheet.create({
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
  emojiContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    gap: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 60,
  },
  name: {
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
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