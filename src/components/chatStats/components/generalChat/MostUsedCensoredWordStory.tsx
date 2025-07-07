import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Chat, GeneralChatAnalysis } from '../../../../types/chat';
import { ViewShotContainer } from '../../../common/ViewShotContainer';
import { useTranslation } from 'react-i18next';
import { StatisticType } from '../../../../utils/storyTypes';

export const STATISTIC_TYPE: StatisticType = 'most-used-censored-word';

interface MostUsedCensoredWordStoryProps {
  chat: Chat;
  handleShareCallback: () => void;
}

const isGeneralAnalysis = (analysis: any): analysis is GeneralChatAnalysis => {
  return 'most_used_censored_word' in analysis;
};

export const MostUsedCensoredWordStory: React.FC<MostUsedCensoredWordStoryProps> = ({ chat, handleShareCallback }) => {
  const { analysis } = chat;
  const { t } = useTranslation();

  if (!isGeneralAnalysis(analysis)) {
    return null;
  }

  const censoredWords = Object.entries(analysis.most_used_censored_word)
    .map(([name, count]) => ({
      name,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...censoredWords.map(p => p.count));

  const message = censoredWords.length > 0
    ? `${t('statistics.chatStats.general.censoredWord.title')}: ${censoredWords.map(p => `${p.name}: ${p.count} ${t('statistics.chatStats.general.censoredWord.times')}`).join(', ')} 🤬`
    : t('statistics.chatStats.general.censoredWord.noData');

  return (
    <ViewShotContainer
      chat={chat}
      statisticType={STATISTIC_TYPE}
      title={t('statistics.chatStats.general.censoredWord.title')}
      message={message}
      handleShareCallback={handleShareCallback}
    >
      <LinearGradient
        colors={['#F44336', '#D32F2F']}
        style={styles.gradient}
      >
        <Text style={styles.title}>{t('statistics.chatStats.general.censoredWord.title')}</Text>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../../../assets/images/statistics/badWords.jpg')}
              style={[styles.badWordsImage, censoredWords.length > 3 && styles.badWordsImageCompact]}
              resizeMode="cover"
            />
          </View>

          <View style={styles.statsContainer}>
            {censoredWords.length > 0 ? (
              censoredWords.map((participant) => (
                <View key={participant.name} style={styles.statBox}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{participant.name}</Text>
                    <Text style={styles.countText}>
                      {participant.count} {t('statistics.chatStats.general.censoredWord.times')}
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
              ))
            ) : (
              <View style={styles.noDataBox}>
                <Text style={styles.noDataText}>
                  {t('statistics.chatStats.general.censoredWord.noData')}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.footer}>
          {t('statistics.chatStats.general.censoredWord.footer')}
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
  badWordsImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  badWordsImageCompact: {
    width: 220,
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
    color: '#F44336',
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
    backgroundColor: '#F44336',
    borderRadius: 4,
  },
  noDataBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F44336',
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