import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'favorite-love-emoji';

interface FavoriteLoveEmojiStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'favorite_love_emoji' in analysis;
};

export const FavoriteLoveEmojiStory: React.FC<FavoriteLoveEmojiStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const favoriteEmojis = analysis.favorite_love_emoji || [];

  const message = favoriteEmojis.length > 0
    ? `${t('statistics.stories.favoriteLoveEmoji.title')}: ${favoriteEmojis.map(e => `${e.emoji} (${e.count})`).join(', ')}`
    : t('statistics.stories.favoriteLoveEmoji.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.favoriteLoveEmoji.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#F48FB1', '#EC407A']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.favoriteLoveEmoji.title')}</Text>
        
        <View style={styles.contentContainer}>
          {favoriteEmojis.length > 0 ? (
            <View style={styles.emojiContainer}>
              {favoriteEmojis.map((e, index) => (
                <View key={index} style={styles.emojiRow}>
                  <Text style={[styles.emoji, index === 0 && styles.topEmoji]}>{e.emoji}</Text>
                  <Text style={styles.count}>×{e.count} {t('statistics.stories.favoriteLoveEmoji.times')}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noEmojiContainer}>
              <Text style={styles.noEmojiText}>{t('statistics.stories.favoriteLoveEmoji.noData')}</Text>
              <Text style={styles.descriptionText}>{t('statistics.stories.favoriteLoveEmoji.subtitle')}</Text>
              <View style={styles.otherEmojis}>
                <Text style={styles.otherEmojiText}>💝 💘 💌 💞 💟</Text>
              </View>
            </View>
          )}
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.favoriteLoveEmoji.footer')}
        </Text>
      </LinearGradient>
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
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 60,
  },
  topEmoji: {
    fontSize: 80,
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
  shareButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  shareButtonText: {
    color: '#F48FB1',
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