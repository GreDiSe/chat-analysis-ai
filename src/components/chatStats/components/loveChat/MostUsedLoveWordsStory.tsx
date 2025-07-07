import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, LoveChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

const STATISTIC_TYPE: StatisticType = 'most-used-love-words';

interface MostUsedLoveWordsStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isLoveAnalysis = (analysis: any): analysis is LoveChatAnalysis => {
  return 'most_used_love_words' in analysis;
};

export const MostUsedLoveWordsStory: React.FC<MostUsedLoveWordsStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isLoveAnalysis(analysis)) {
    return null;
  }

  const loveWords = analysis.most_used_love_words;

  const message = loveWords.length > 0
    ? `${t('statistics.stories.mostUsedLove.title')}: ${loveWords.map(lw => `"${lw.phrase}" (${lw.count})`).join(', ')} 💝`
    : t('statistics.stories.mostUsedLove.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.stories.mostUsedLove.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#F48FB1', '#F06292']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.stories.mostUsedLove.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/mostUserLoveWord.jpg')}
              style={styles.loveImage}
              resizeMode="cover"
            />
          </View>
          
          {loveWords.length > 0 ? (
            <View style={styles.wordsContainer}>
              {loveWords.map((lw, index) => (
                <View key={index} style={styles.wordRow}>
                  <Text style={[styles.word, index === 0 && styles.topWord]}>{`"${lw.phrase}"`}</Text>
                  <Text style={styles.count}>{lw.count}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{t('statistics.stories.mostUsedLove.noData')}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.stories.mostUsedLove.footer')}
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
    paddingVertical: 20,
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
  wordsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    gap: 10,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 98, 146, 0.1)',
  },
  word: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  topWord: {
    fontSize: 24,
    color: '#F06292',
  },
  count: {
    fontSize: 24,
    color: '#F06292',
    fontWeight: 'bold',
  },
  noDataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
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
    color: '#F06292',
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
  imageContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
}); 